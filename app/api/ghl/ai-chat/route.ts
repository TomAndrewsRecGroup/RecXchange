import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

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
    body: JSON.stringify({ 
      locationId: LOCATION_ID, 
      contactId,
    }),
  });
  const createData = await create.json();
  
  if (!createData?.conversation?.id) {
    throw new Error(`Failed to create conversation: ${JSON.stringify(createData)}`);
  }
  
  const newConvId = createData.conversation.id;
  console.log('[GHL AI Chat] Created new conversation:', newConvId);
  return newConvId;
}

// ─── Send Message and Wait for AI Response ───────────────────────────────────
async function sendMessageAndWaitForAI(
  conversationId: string,
  contactId: string,
  message: string
): Promise<string> {
  console.log('[GHL AI Chat] === Sending message to trigger AI bot ===');
  console.log('[GHL AI Chat] ConversationId:', conversationId);
  console.log('[GHL AI Chat] ContactId:', contactId);
  console.log('[GHL AI Chat] Message:', message);
  
  // Get message count before posting
  const beforeMessages = await fetch(
    `${GHL_BASE}/conversations/${conversationId}/messages?limit=5`,
    { headers: ghlHeaders }
  );
  const beforeData = await beforeMessages.json();
  const messageCountBefore = beforeData.messages?.length || 0;
  console.log('[GHL AI Chat] Messages before:', messageCountBefore);
  
  // Post user message as inbound message (this triggers the AI bot automatically)
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
  console.log('[GHL AI Chat] Inbound message posted successfully');
  console.log('[GHL AI Chat] Message ID:', inboundData.messageId || inboundData.id);
  
  // Wait for AI bot to respond (GHL AI bots respond automatically to inbound messages)
  // We need to poll for new messages
  console.log('[GHL AI Chat] Waiting for AI bot response...');
  
  let attempts = 0;
  const maxAttempts = 10; // 10 attempts over 5 seconds
  let aiMessage = null;
  
  while (attempts < maxAttempts && !aiMessage) {
    attempts++;
    
    // Wait 500ms between checks
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`[GHL AI Chat] Polling attempt ${attempts}/${maxAttempts}`);
    
    const messagesResponse = await fetch(
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=10`,
      { headers: ghlHeaders }
    );
    
    if (messagesResponse.ok) {
      const messagesData = await messagesResponse.json();
      const messages = messagesData.messages || [];
      
      console.log(`[GHL AI Chat] Found ${messages.length} total messages`);
      
      // Look for newest outbound message (AI response)
      const outboundMessages = messages.filter((msg: { 
        direction?: string; 
        type?: string; 
        body?: string;
        dateAdded?: string;
      }) => 
        msg.direction === 'outbound' && 
        msg.type === 'Live_Chat' && 
        msg.body
      );
      
      // Check if we have more messages than before
      if (messages.length > messageCountBefore) {
        // Get the most recent outbound message
        if (outboundMessages.length > 0) {
          // Sort by dateAdded to get newest
          const sorted = outboundMessages.sort((a, b) => {
            const dateA = new Date(a.dateAdded).getTime();
            const dateB = new Date(b.dateAdded).getTime();
            return dateB - dateA;
          });
          
          aiMessage = sorted[0].body;
          console.log('[GHL AI Chat] ✓ Found AI response:', aiMessage);
        }
      }
    }
  }
  
  if (!aiMessage) {
    console.warn('[GHL AI Chat] AI bot did not respond within timeout');
    console.warn('[GHL AI Chat] This could mean:');
    console.warn('[GHL AI Chat] 1. AI bot is not configured for Live_Chat channel');
    console.warn('[GHL AI Chat] 2. AI bot is in "suggestive" mode (not autopilot)');
    console.warn('[GHL AI Chat] 3. AI bot response is taking longer than expected');
    
    // Return a helpful fallback message
    return "Thank you for your message! Our AI assistant is processing your request. If you don't receive a response shortly, a team member will assist you.";
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

  // Post handover notification as outbound message
  await fetch(`${GHL_BASE}/conversations/messages`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      type: 'Live_Chat',
      conversationId,
      contactId,
      message: '🔔 [Handover Requested] Connecting you with a team member...',
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
        message: "I'm connecting you with a team member now. They'll respond in your conversation shortly!",
        handover: true,
      });
    }

    // Otherwise, post message and wait for AI bot to respond automatically
    console.log('[GHL AI Chat] Posting message to trigger AI bot');
    const aiMessage = await sendMessageAndWaitForAI(conversationId, contactId, message);

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
        message: 'I apologize for the technical issue. A team member will assist you shortly. You can also contact support@recxchange.io',
      },
      { status: 500 }
    );
  }
}
