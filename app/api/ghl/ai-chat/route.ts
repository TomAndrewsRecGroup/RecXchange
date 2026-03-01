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

interface GHLMessage {
  direction?: string;
  type?: string;
  body?: string;
  dateAdded?: string;
  id?: string;
  messageType?: string;
  status?: string;
}

// ─── Upsert Contact ─────────────────────────────────────────────────────────
async function upsertContact(
  name: string,
  email: string,
  persona: 'recruiter' | 'hiring-manager',
  companyName?: string,
  pageContext?: string
): Promise<string> {
  const firstName = name.split(' ')[0] || name;
  const lastName = name.split(' ').slice(1).join(' ') || '';

  console.log('[GHL AI Chat] Upserting contact:', { email, firstName, lastName });

  const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
  const search = await fetch(searchUrl, { headers: ghlHeaders });
  const searchData = await search.json();
  
  if (searchData?.contact?.id) {
    const contactId = searchData.contact.id;
    console.log('[GHL AI Chat] Found existing contact:', contactId);
    visitorContactIds.add(contactId);
    return contactId;
  }

  const tags = [
    'ai-chat',
    persona === 'hiring-manager' ? 'hiring-manager' : 'recruiter',
    'recxchange-website',
  ];

  if (pageContext) {
    tags.push(`page-${pageContext.toLowerCase().replace(/\s+/g, '-')}`);
  }

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
  
  console.log('[GHL AI Chat] New contact created:', contactId);
  return contactId;
}

// ─── Get or Create Conversation WITH AI AGENT ───────────────────────────────
async function getOrCreateConversation(
  contactId: string
): Promise<string> {
  console.log('[GHL AI Chat] Getting/creating conversation for contact:', contactId);
  console.log('[GHL AI Chat] AI Agent ID:', AI_AGENT_ID);
  
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

  // Create new conversation WITH AI agent assigned
  const conversationPayload: Record<string, unknown> = {
    locationId: LOCATION_ID,
    contactId,
  };
  
  // ⚠️ CRITICAL: Link to AI Agent so bot processes messages
  if (AI_AGENT_ID) {
    conversationPayload.assignedTo = AI_AGENT_ID;
    console.log('[GHL AI Chat] Assigning conversation to AI Agent:', AI_AGENT_ID);
  }
  
  const create = await fetch(`${GHL_BASE}/conversations/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(conversationPayload),
  });
  const createData = await create.json();
  
  if (!createData?.conversation?.id) {
    throw new Error(`Failed to create conversation: ${JSON.stringify(createData)}`);
  }
  
  const newConvId = createData.conversation.id;
  console.log('[GHL AI Chat] Created new conversation with AI agent:', newConvId);
  
  return newConvId;
}

// ─── Poll for AI Response ───────────────────────────────────────────────────
async function pollForAIResponse(
  conversationId: string,
  messageCountBefore: number,
  maxAttempts: number = 25
): Promise<string | null> {
  console.log('[GHL AI Chat] Polling for AI response...');
  
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    attempts++;
    
    // Longer delays for AI processing
    const delay = attempts <= 2 ? 500 : attempts <= 5 ? 1000 : attempts <= 15 ? 1500 : 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`[GHL AI Chat] Poll attempt ${attempts}/${maxAttempts}`);
    
    try {
      const messagesResponse = await fetch(
        `${GHL_BASE}/conversations/${conversationId}/messages?limit=20`,
        { headers: ghlHeaders }
      );
      
      if (!messagesResponse.ok) {
        console.warn(`[GHL AI Chat] Messages API returned ${messagesResponse.status}`);
        continue;
      }
      
      const messagesData = await messagesResponse.json();
      const messages: GHLMessage[] = messagesData.messages?.messages || [];
      
      if (!Array.isArray(messages)) {
        console.warn('[GHL AI Chat] Invalid messages format');
        continue;
      }
      
      console.log(`[GHL AI Chat] Found ${messages.length} messages (baseline: ${messageCountBefore})`);
      
      if (messages.length > messageCountBefore) {
        const outboundMessages = messages.filter((msg: GHLMessage) => 
          msg.direction === 'outbound' && 
          msg.body && 
          msg.body.trim().length > 0 &&
          msg.status !== 'failed'
        );
        
        if (outboundMessages.length > 0) {
          const sorted = outboundMessages.sort((a: GHLMessage, b: GHLMessage) => {
            const dateA = new Date(a.dateAdded || 0).getTime();
            const dateB = new Date(b.dateAdded || 0).getTime();
            return dateB - dateA;
          });
          
          const aiMessage = sorted[0].body?.trim();
          if (aiMessage) {
            console.log('[GHL AI Chat] ✓ AI response received:', aiMessage.substring(0, 100));
            return aiMessage;
          }
        }
      }
      
    } catch (pollError) {
      console.error('[GHL AI Chat] Polling error:', pollError);
    }
  }
  
  console.warn('[GHL AI Chat] ⚠️ AI bot did not respond after', maxAttempts, 'attempts');
  return null;
}

// ─── Send Message to GHL ─────────────────────────────────────────────────────
async function sendMessageToGHL(
  conversationId: string,
  contactId: string,
  message: string
): Promise<void> {
  console.log('[GHL AI Chat] Sending message to GHL conversation');
  
  const payload = {
    type: 'Live_Chat',
    conversationId,
    contactId,
    message: message,
  };
  
  // Try inbound endpoint (should trigger AI bot)
  try {
    const response = await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('[GHL AI Chat] ✓ Message posted via inbound endpoint, ID:', data.messageId || data.id);
      return;
    } else {
      const errorText = await response.text();
      console.warn('[GHL AI Chat] Inbound endpoint returned', response.status, ':', errorText);
    }
  } catch (error) {
    console.warn('[GHL AI Chat] Inbound endpoint error:', error);
  }
  
  // Fallback to regular message endpoint
  try {
    const response = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('[GHL AI Chat] ✓ Message posted via regular endpoint');
      return;
    } else {
      const errorText = await response.text();
      console.error('[GHL AI Chat] Regular endpoint also failed:', response.status, errorText);
    }
  } catch (error) {
    console.error('[GHL AI Chat] Regular endpoint error:', error);
  }
  
  throw new Error('Failed to post message to GHL');
}

// ─── Main AI Chat Flow ───────────────────────────────────────────────────────
async function processAIChat(
  conversationId: string,
  contactId: string,
  message: string
): Promise<string> {
  console.log('[GHL AI Chat] === Processing chat request ===');
  console.log('[GHL AI Chat] Conversation:', conversationId);
  console.log('[GHL AI Chat] Contact:', contactId);
  console.log('[GHL AI Chat] AI Agent:', AI_AGENT_ID);
  console.log('[GHL AI Chat] Message:', message);
  
  let messageCountBefore = 0;
  try {
    const beforeResponse = await fetch(
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=10`,
      { headers: ghlHeaders }
    );
    
    if (beforeResponse.ok) {
      const beforeData = await beforeResponse.json();
      const messagesBefore: GHLMessage[] = beforeData.messages?.messages || [];
      messageCountBefore = messagesBefore.length;
      console.log('[GHL AI Chat] Current message count:', messageCountBefore);
    }
  } catch (error) {
    console.warn('[GHL AI Chat] Could not get baseline count:', error);
  }
  
  await sendMessageToGHL(conversationId, contactId, message);
  
  // Wait a moment for AI to start processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const aiResponse = await pollForAIResponse(conversationId, messageCountBefore, 25);
  
  if (aiResponse) {
    return aiResponse;
  }
  
  console.warn('[GHL AI Chat] ⚠️ AI bot failed to respond - marking for review');
  
  try {
    await fetch(`${GHL_BASE}/conversations/${conversationId}`, {
      method: 'PUT',
      headers: ghlHeaders,
      body: JSON.stringify({
        unread: true,
        starred: true,
      }),
    });
    console.log('[GHL AI Chat] Conversation marked for human review');
  } catch (error) {
    console.error('[GHL AI Chat] Failed to mark conversation:', error);
  }
  
  return "Thank you for your message! Our team has been notified and will respond shortly. For immediate assistance, email support@recxchange.io";
}

// ─── Main Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('[GHL AI Chat] ═══ NEW REQUEST ═══');
  console.log('[GHL AI Chat] Timestamp:', new Date().toISOString());
  console.log('[GHL AI Chat] Location ID:', LOCATION_ID);
  console.log('[GHL AI Chat] AI Agent ID:', AI_AGENT_ID || '⚠️ NOT SET');
  
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
      pageContext,
    } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log('[GHL AI Chat] Page:', pageContext || 'unknown');
    console.log('[GHL AI Chat] Message preview:', message.substring(0, 50));

    let contactId = existingContactId;
    let conversationId = existingConvId;

    if (!contactId) {
      if (!name || !email || !persona) {
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' },
          { status: 400 }
        );
      }
      contactId = await upsertContact(name, email, persona, companyName, pageContext);
    } else {
      visitorContactIds.add(contactId);
    }

    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId);
    }

    console.log('[GHL AI Chat] → Sending to GHL AI bot');
    const aiMessage = await processAIChat(conversationId, contactId, message);

    const elapsed = Date.now() - startTime;
    console.log(`[GHL AI Chat] ✓ Completed in ${elapsed}ms`);

    return NextResponse.json({
      success: true,
      contactId,
      conversationId,
      message: aiMessage,
    });
    
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error('[GHL AI Chat] ✗ Error after', elapsed, 'ms:', err);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Technical issue. Please email support@recxchange.io or try again.',
      },
      { status: 500 }
    );
  }
}
