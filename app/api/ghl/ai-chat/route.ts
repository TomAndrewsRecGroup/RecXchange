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
    const existingConvId = searchData.conversations[0].id;
    console.log('[GHL AI Chat] Found existing conversation:', existingConvId);
    return existingConvId;
  }

  const create = await fetch(`${GHL_BASE}/conversations/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({ locationId: LOCATION_ID, contactId }),
  });
  const createData = await create.json();
  
  if (!createData?.conversation?.id) {
    throw new Error(`Failed to create conversation: ${JSON.stringify(createData)}`);
  }
  
  const newConvId = createData.conversation.id;
  console.log('[GHL AI Chat] Created new conversation:', newConvId);
  return newConvId;
}

// ─── Send Message and Trigger AI Response ─────────────────────────────────────
async function sendToAIAgent(
  conversationId: string,
  contactId: string,
  message: string
): Promise<string> {
  console.log('[GHL AI Chat] Sending message to AI Agent');
  console.log('[GHL AI Chat] ConversationId:', conversationId);
  console.log('[GHL AI Chat] ContactId:', contactId);
  console.log('[GHL AI Chat] Message:', message);
  console.log('[GHL AI Chat] AI Agent ID:', AI_AGENT_ID);
  
  // Step 1: Post user message as inbound message
  const inboundPayload = {
    type: 'Live_Chat',
    conversationId,
    contactId,
    locationId: LOCATION_ID,
    message,
  };
  
  console.log('[GHL AI Chat] Posting inbound message:', JSON.stringify(inboundPayload));
  
  const inboundResponse = await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(inboundPayload),
  });

  if (!inboundResponse.ok) {
    const errorText = await inboundResponse.text();
    console.error('[GHL AI Chat] Failed to post inbound message:', errorText);
    throw new Error(`Failed to post inbound message: ${errorText}`);
  }

  const inboundData = await inboundResponse.json();
  console.log('[GHL AI Chat] Inbound message posted successfully:', JSON.stringify(inboundData));

  // Step 2: Wait a moment for message to be processed
  await new Promise(resolve => setTimeout(resolve, 500));

  // Step 3: Trigger AI Agent to generate response
  const aiPayload = {
    conversationId,
    agentId: AI_AGENT_ID,
    locationId: LOCATION_ID,
    message,
  };

  console.log('[GHL AI Chat] Triggering AI Agent with payload:', JSON.stringify(aiPayload));

  const aiResponse = await fetch(`${GHL_BASE}/conversations/ai/generate`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(aiPayload),
  });

  const aiResponseText = await aiResponse.text();
  console.log('[GHL AI Chat] AI Response status:', aiResponse.status);
  console.log('[GHL AI Chat] AI Response body:', aiResponseText);

  if (!aiResponse.ok) {
    console.error('[GHL AI Chat] AI generation failed:', aiResponseText);
    
    // If AI generation fails, try to fetch the latest message from conversation
    console.log('[GHL AI Chat] Attempting to fetch latest conversation messages as fallback');
    
    try {
      const messagesResponse = await fetch(
        `${GHL_BASE}/conversations/${conversationId}/messages?limit=5`,
        { headers: ghlHeaders }
      );
      
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        console.log('[GHL AI Chat] Fetched messages:', JSON.stringify(messagesData));
        
        // Find the most recent AI/assistant response
        const messages = messagesData.messages || [];
        const aiMessage = messages.find((msg: { direction?: string; type?: string; body?: string }) => 
          msg.direction === 'outbound' && msg.type === 'Live_Chat' && msg.body
        );
        
        if (aiMessage?.body) {
          console.log('[GHL AI Chat] Found AI message from conversation history:', aiMessage.body);
          return aiMessage.body;
        }
      }
    } catch (fetchError) {
      console.error('[GHL AI Chat] Failed to fetch conversation messages:', fetchError);
    }
    
    throw new Error(`AI Agent failed to generate response: ${aiResponseText}`);
  }

  let aiData;
  try {
    aiData = JSON.parse(aiResponseText);
  } catch (parseError) {
    console.error('[GHL AI Chat] Failed to parse AI response:', parseError);
    throw new Error('Invalid JSON response from AI Agent');
  }

  console.log('[GHL AI Chat] Parsed AI response:', JSON.stringify(aiData));

  // Extract AI message from various possible response formats
  let aiMessage = 
    aiData?.message?.body || 
    aiData?.generatedMessage || 
    aiData?.response?.message ||
    aiData?.text ||
    aiData?.content;
  
  if (!aiMessage) {
    console.warn('[GHL AI Chat] No message found in AI response, checking conversation messages');
    
    // Fallback: fetch the conversation messages to get the AI response
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for message to be saved
      
      const messagesResponse = await fetch(
        `${GHL_BASE}/conversations/${conversationId}/messages?limit=5`,
        { headers: ghlHeaders }
      );
      
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        console.log('[GHL AI Chat] Fetched messages for fallback:', JSON.stringify(messagesData));
        
        const messages = messagesData.messages || [];
        const latestAiMessage = messages.find((msg: { direction?: string; type?: string; body?: string }) => 
          msg.direction === 'outbound' && msg.type === 'Live_Chat' && msg.body
        );
        
        if (latestAiMessage?.body) {
          aiMessage = latestAiMessage.body;
          console.log('[GHL AI Chat] Retrieved AI message from conversation:', aiMessage);
        }
      }
    } catch (fetchError) {
      console.error('[GHL AI Chat] Fallback message fetch failed:', fetchError);
    }
  }
  
  if (!aiMessage) {
    console.error('[GHL AI Chat] Could not extract AI message from response or conversation');
    aiMessage = 'Thank you for your message! Our AI assistant is processing your request. A team member will respond shortly if needed.';
  }
  
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
  console.log('[GHL AI Chat] Environment check:');
  console.log('[GHL AI Chat] - API_KEY present:', !!API_KEY);
  console.log('[GHL AI Chat] - LOCATION_ID:', LOCATION_ID);
  console.log('[GHL AI Chat] - AI_AGENT_ID:', AI_AGENT_ID);
  
  try {
    const body = await req.json();
    console.log('[GHL AI Chat] Request body:', JSON.stringify(body));
    
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

    // Detect handover trigger FIRST
    const shouldHandover = detectHandoverTrigger(message);
    console.log('[GHL AI Chat] Handover trigger detected:', shouldHandover);

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
        message: "I'm connecting you with a team member now. They'll respond in your GHL inbox shortly!",
        handover: true,
      });
    }

    // Otherwise, get AI response from Conversational AI Agent
    console.log('[GHL AI Chat] Routing to Conversational AI Agent');
    const aiMessage = await sendToAIAgent(conversationId, contactId, message);

    return NextResponse.json({
      success: true,
      contactId,
      conversationId,
      message: aiMessage,
      handover: false,
    });
  } catch (err) {
    console.error('[GHL AI Chat] Fatal error:', err);
    console.error('[GHL AI Chat] Error stack:', err instanceof Error ? err.stack : 'No stack trace');
    
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
