import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;
const AI_AGENT_ID = process.env.GHL_CONVERSATION_AI_AGENT_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isHandover?: boolean;
}

// ─── Handover Detection ──────────────────────────────────────────────────────
function detectHandoverTrigger(message: string): boolean {
  const triggers = [
    'speak to human',
    'talk to human',
    'human agent',
    'live agent',
    'speak to someone',
    'talk to someone',
    'transfer to agent',
    'connect me to agent',
    'real person',
    'actual person',
  ];
  
  const lowerMessage = message.toLowerCase().trim();
  return triggers.some(trigger => lowerMessage.includes(trigger));
}

// ─── Upsert Contact ───────────────────────────────────────────────────────────
async function upsertContact(
  name: string,
  email: string,
  persona: 'recruiter' | 'hiring-manager',
  companyName?: string
): Promise<string> {
  const firstName = name.split(' ')[0] || name;
  const lastName = name.split(' ').slice(1).join(' ') || '';

  console.log('[GHL AI Chat] Upserting contact:', { email, firstName, lastName, persona });

  const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
  const search = await fetch(searchUrl, { headers: ghlHeaders });
  const searchData = await search.json();
  
  if (searchData?.contact?.id) {
    console.log('[GHL AI Chat] Found existing contact:', searchData.contact.id);
    visitorContactIds.add(searchData.contact.id);
    return searchData.contact.id;
  }

  const tags =
    persona === 'hiring-manager'
      ? ['ai-chat', 'hiring-manager', 'recxchange-website']
      : ['ai-chat', 'recruiter', 'recxchange-website'];

  const contactPayload: Record<string, unknown> = {
    locationId: LOCATION_ID,
    firstName,
    lastName,
    email,
    source: 'RecXchange AI Chat',
    tags,
  };

  if (persona === 'hiring-manager' && companyName) {
    contactPayload.companyName = companyName;
  }

  const create = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(contactPayload),
  });
  
  const createData = await create.json();
  
  if (!createData?.contact?.id) {
    throw new Error(`Failed to create contact: ${JSON.stringify(createData)}`);
  }
  
  const contactId = createData.contact.id;
  visitorContactIds.add(contactId);
  
  return contactId;
}

// ─── Get or Create Conversation ───────────────────────────────────────────────
async function getOrCreateConversation(contactId: string): Promise<string> {
  console.log('[GHL AI Chat] Getting/creating conversation for contact:', contactId);
  
  const search = await fetch(
    `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();
  
  if (searchData?.conversations?.length > 0) {
    return searchData.conversations[0].id;
  }

  const create = await fetch(`${GHL_BASE}/conversations/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({ locationId: LOCATION_ID, contactId }),
  });
  const createData = await create.json();
  
  if (!createData?.conversation?.id) {
    throw new Error(`Failed to create conversation`);
  }
  
  return createData.conversation.id;
}

// ─── Send to Conversational AI Agent ──────────────────────────────────────────
async function sendToAIAgent(
  conversationId: string,
  contactId: string,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  console.log('[GHL AI Chat] Sending message to AI Agent:', AI_AGENT_ID);
  
  // Post user message as inbound
  await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      type: 'Live_Chat',
      conversationId,
      contactId,
      locationId: LOCATION_ID,
      message,
    }),
  });

  // Trigger AI Agent response
  const aiPayload = {
    conversationId,
    agentId: AI_AGENT_ID,
    locationId: LOCATION_ID,
    message,
  };

  console.log('[GHL AI Chat] AI Agent payload:', aiPayload);

  const aiResponse = await fetch(`${GHL_BASE}/conversations/ai/generate`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(aiPayload),
  });

  if (!aiResponse.ok) {
    const errorData = await aiResponse.json().catch(() => null);
    console.error('[GHL AI Chat] AI generation failed:', errorData);
    throw new Error('AI Agent failed to generate response');
  }

  const aiData = await aiResponse.json();
  console.log('[GHL AI Chat] AI response:', aiData);

  // Extract AI message from response
  const aiMessage = aiData?.message?.body || aiData?.generatedMessage || 'I apologize, but I encountered an issue. A team member will assist you shortly.';
  
  return aiMessage;
}

// ─── Handover to Live Agent ───────────────────────────────────────────────────
async function handoverToLiveAgent(
  conversationId: string,
  contactId: string
): Promise<void> {
  console.log('[GHL AI Chat] Initiating handover to live agent');
  
  // Update conversation to mark for human agent
  await fetch(`${GHL_BASE}/conversations/${conversationId}`, {
    method: 'PUT',
    headers: ghlHeaders,
    body: JSON.stringify({
      unread: true,
      starred: true,
    }),
  });

  // Add internal note for live agent context
  await fetch(`${GHL_BASE}/conversations/messages`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      type: 'Live_Chat',
      conversationId,
      message: '🔔 [AI Handover] User requested human assistance. Previous conversation context available above.',
      contactId: LOCATION_ID, // System message
    }),
  });

  console.log('[GHL AI Chat] Handover complete - conversation flagged for agent');
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  console.log('[GHL AI Chat] === New AI chat request ===');
  
  try {
    const body = await req.json();
    const {
      name,
      email,
      message,
      persona,
      companyName,
      conversationId: existingConvId,
      contactId: existingContactId,
      history = [],
    } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Detect handover trigger
    const shouldHandover = detectHandoverTrigger(message);

    let contactId = existingContactId;
    let conversationId = existingConvId;

    // First message — create contact
    if (!contactId) {
      if (!name || !email || !persona) {
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' },
          { status: 400 }
        );
      }
      contactId = await upsertContact(name, email, persona, companyName);
    } else {
      visitorContactIds.add(contactId);
    }

    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId);
    }

    // If handover requested, transfer to live agent
    if (shouldHandover) {
      await handoverToLiveAgent(conversationId, contactId);
      return NextResponse.json({
        success: true,
        contactId,
        conversationId,
        message: "I'm connecting you with a team member now. They'll be with you shortly!",
        handover: true,
      });
    }

    // Otherwise, get AI response
    const aiMessage = await sendToAIAgent(conversationId, contactId, message, history);

    return NextResponse.json({
      success: true,
      contactId,
      conversationId,
      message: aiMessage,
      handover: false,
    });
  } catch (err) {
    console.error('[GHL AI Chat] Fatal error:', err);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: err instanceof Error ? err.message : String(err),
        message: 'I apologize for the technical issue. Please try again or contact support@recxchange.io',
      },
      { status: 500 }
    );
  }
}
