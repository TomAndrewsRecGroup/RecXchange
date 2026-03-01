import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;
const AI_AGENT_ID = process.env.GHL_CONVERSATION_AI_AGENT_ID;

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

interface GHLMessage {
  direction?: string;
  type?: string;
  body?: string;
  dateAdded?: string;
  id?: string;
  messageType?: string;
  status?: string;
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
    'speak with someone',
    'talk with someone',
  ];
  
  const lowerMessage = message.toLowerCase().trim();
  return triggers.some(trigger => lowerMessage.includes(trigger));
}

// ─── Upsert Contact with Rich Data ──────────────────────────────────────────
async function upsertContact(
  name: string,
  email: string,
  persona: 'recruiter' | 'hiring-manager',
  companyName?: string,
  pageContext?: string,
  userIntent?: string
): Promise<string> {
  const firstName = name.split(' ')[0] || name;
  const lastName = name.split(' ').slice(1).join(' ') || '';

  console.log('[GHL AI Chat] Upserting contact:', { email, firstName, lastName, persona, pageContext });

  const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
  const search = await fetch(searchUrl, { headers: ghlHeaders });
  const searchData = await search.json();
  
  if (searchData?.contact?.id) {
    const contactId = searchData.contact.id;
    console.log('[GHL AI Chat] Found existing contact:', contactId);
    visitorContactIds.add(contactId);
    
    // Update existing contact with new context
    try {
      const updatePayload: Record<string, unknown> = {};
      
      if (pageContext) {
        updatePayload.customField = {
          lastVisitedPage: pageContext,
          lastInteractionDate: new Date().toISOString(),
        };
      }
      
      if (userIntent) {
        updatePayload.customField = {
          ...updatePayload.customField,
          userIntent,
        };
      }
      
      if (Object.keys(updatePayload).length > 0) {
        await fetch(`${GHL_BASE}/contacts/${contactId}`, {
          method: 'PUT',
          headers: ghlHeaders,
          body: JSON.stringify(updatePayload),
        });
        console.log('[GHL AI Chat] Contact updated with context');
      }
    } catch (updateError) {
      console.warn('[GHL AI Chat] Could not update contact context:', updateError);
    }
    
    return contactId;
  }

  // Create new contact with rich data
  const tags =
    persona === 'hiring-manager'
      ? ['ai-chat', 'hiring-manager', 'recxchange-website']
      : ['ai-chat', 'recruiter', 'recxchange-website'];

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
    customField: {
      persona,
      firstContactPage: pageContext || 'unknown',
      firstContactDate: new Date().toISOString(),
      userIntent: userIntent || 'general-inquiry',
    },
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
  
  console.log('[GHL AI Chat] New contact created with rich context');
  return contactId;
}

// ─── Get or Create Conversation with Context ────────────────────────────────
async function getOrCreateConversation(
  contactId: string,
  initialMessage?: string,
  pageContext?: string
): Promise<string> {
  console.log('[GHL AI Chat] Getting/creating conversation for contact:', contactId);
  
  const search = await fetch(
    `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();
  
  if (searchData?.conversations?.length > 0) {
    const existingConvId = searchData.conversations[0].id;
    console.log('[GHL AI Chat] Found existing conversation:', existingConvId);
    
    // Optionally add context note to existing conversation
    if (pageContext && initialMessage) {
      try {
        await fetch(`${GHL_BASE}/conversations/messages`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            type: 'Live_Chat',
            conversationId: existingConvId,
            contactId,
            message: `📍 Context: User on "${pageContext}" page | Question: ${initialMessage}`,
            internal: true,
          }),
        });
      } catch (error) {
        console.warn('[GHL AI Chat] Could not add context note:', error);
      }
    }
    
    return existingConvId;
  }

  // Create new conversation
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
  
  // Add initial context note
  if (pageContext || initialMessage) {
    try {
      const contextMessage = [
        pageContext ? `📍 Started from: ${pageContext}` : null,
        initialMessage ? `❓ First question: ${initialMessage}` : null,
      ].filter(Boolean).join(' | ');
      
      await fetch(`${GHL_BASE}/conversations/messages`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          type: 'Live_Chat',
          conversationId: newConvId,
          contactId: LOCATION_ID, // System message
          message: `[System Context] ${contextMessage}`,
        }),
      });
    } catch (error) {
      console.warn('[GHL AI Chat] Could not add initial context:', error);
    }
  }
  
  return newConvId;
}

// ─── Robust AI Response Polling ──────────────────────────────────────────────
async function pollForAIResponse(
  conversationId: string,
  messageCountBefore: number,
  maxAttempts: number = 20
): Promise<string | null> {
  console.log('[GHL AI Chat] Starting AI response polling...');
  
  let attempts = 0;
  let lastMessageCount = messageCountBefore;
  
  while (attempts < maxAttempts) {
    attempts++;
    
    // Exponential backoff: 300ms, 500ms, 500ms, 700ms, 1000ms, 1000ms...
    const delay = attempts <= 2 ? 300 : attempts <= 4 ? 500 : attempts <= 10 ? 700 : 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`[GHL AI Chat] Poll attempt ${attempts}/${maxAttempts} (delay: ${delay}ms)`);
    
    try {
      const messagesResponse = await fetch(
        `${GHL_BASE}/conversations/${conversationId}/messages?limit=15`,
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
      
      console.log(`[GHL AI Chat] Found ${messages.length} messages (was ${lastMessageCount})`);
      
      // Check for new messages
      if (messages.length > messageCountBefore) {
        // Look for outbound messages (AI responses)
        const outboundMessages = messages.filter((msg: GHLMessage) => 
          msg.direction === 'outbound' && 
          msg.body && 
          msg.body.trim().length > 0 &&
          msg.status !== 'failed' &&
          !msg.body.includes('[System Context]') // Skip system messages
        );
        
        if (outboundMessages.length > 0) {
          // Sort by date to get most recent
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
        
        // Messages increased but no outbound yet - keep waiting
        lastMessageCount = messages.length;
      }
      
    } catch (pollError) {
      console.error('[GHL AI Chat] Polling error:', pollError);
      // Continue polling despite errors
    }
  }
  
  console.warn('[GHL AI Chat] ⚠️ AI response not received after', maxAttempts, 'attempts');
  return null;
}

// ─── Trigger AI Bot with Context ─────────────────────────────────────────────
async function triggerAIBot(
  conversationId: string,
  contactId: string,
  message: string,
  pageContext?: string
): Promise<void> {
  console.log('[GHL AI Chat] Triggering AI bot for conversation');
  
  // Enrich message with context for better AI responses
  let enrichedMessage = message;
  if (pageContext && !message.toLowerCase().includes(pageContext.toLowerCase())) {
    // Only add context if not already in message
    enrichedMessage = `[User is viewing: ${pageContext}] ${message}`;
  }
  
  // Method 1: Standard inbound message (primary method)
  try {
    const inboundPayload = {
      type: 'Live_Chat',
      conversationId,
      contactId,
      locationId: LOCATION_ID,
      message: enrichedMessage,
    };
    
    const inboundResponse = await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(inboundPayload),
    });

    if (inboundResponse.ok) {
      const inboundData = await inboundResponse.json();
      console.log('[GHL AI Chat] ✓ Inbound message posted, ID:', inboundData.messageId || inboundData.id);
      return; // Success
    } else {
      const errorText = await inboundResponse.text();
      console.warn('[GHL AI Chat] Inbound message failed:', errorText);
    }
  } catch (error) {
    console.error('[GHL AI Chat] Inbound message error:', error);
  }
  
  // Method 2: Fallback - regular message endpoint
  try {
    console.log('[GHL AI Chat] Trying fallback message endpoint');
    const fallbackPayload = {
      type: 'Live_Chat',
      conversationId,
      contactId,
      locationId: LOCATION_ID,
      message: enrichedMessage,
      html: enrichedMessage,
    };
    
    const fallbackResponse = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(fallbackPayload),
    });

    if (fallbackResponse.ok) {
      console.log('[GHL AI Chat] ✓ Fallback message posted');
      return;
    }
  } catch (error) {
    console.error('[GHL AI Chat] Fallback message error:', error);
  }
  
  throw new Error('All message posting methods failed');
}

// ─── Main AI Chat Logic ──────────────────────────────────────────────────────
async function sendMessageAndWaitForAI(
  conversationId: string,
  contactId: string,
  message: string,
  pageContext?: string
): Promise<string> {
  console.log('[GHL AI Chat] === Processing AI chat request ===');
  console.log('[GHL AI Chat] Conversation:', conversationId);
  console.log('[GHL AI Chat] Contact:', contactId);
  console.log('[GHL AI Chat] Page Context:', pageContext || 'none');
  console.log('[GHL AI Chat] Message:', message);
  console.log('[GHL AI Chat] AI Agent ID:', AI_AGENT_ID || 'NOT SET');
  
  // Get baseline message count
  let messageCountBefore = 0;
  try {
    const beforeResponse = await fetch(
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=5`,
      { headers: ghlHeaders }
    );
    
    if (beforeResponse.ok) {
      const beforeData = await beforeResponse.json();
      const messagesBefore: GHLMessage[] = beforeData.messages?.messages || [];
      messageCountBefore = messagesBefore.length;
      console.log('[GHL AI Chat] Baseline message count:', messageCountBefore);
    }
  } catch (error) {
    console.warn('[GHL AI Chat] Could not get baseline count:', error);
  }
  
  // Post message to trigger AI with context
  await triggerAIBot(conversationId, contactId, message, pageContext);
  
  // Poll for AI response with robust retry logic
  const aiResponse = await pollForAIResponse(conversationId, messageCountBefore, 20);
  
  if (aiResponse) {
    return aiResponse;
  }
  
  // AI didn't respond - return fallback and trigger handover
  console.warn('[GHL AI Chat] ⚠️ AI bot did not respond - triggering automatic handover');
  
  // Mark conversation for human attention
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
  
  // Return helpful message
  return "Thank you for reaching out! I'm currently experiencing connectivity issues. A team member has been notified and will respond to you shortly. You can also email us at support@recxchange.io for immediate assistance.";
}

// ─── Handover to Live Agent ──────────────────────────────────────────────────
async function handoverToLiveAgent(
  conversationId: string,
  contactId: string
): Promise<void> {
  console.log('[GHL AI Chat] ⚡ Manual handover to live agent requested');
  
  try {
    // Mark conversation as urgent
    await fetch(`${GHL_BASE}/conversations/${conversationId}`, {
      method: 'PUT',
      headers: ghlHeaders,
      body: JSON.stringify({
        unread: true,
        starred: true,
      }),
    });

    // Post system notification
    await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify({
        type: 'Live_Chat',
        conversationId,
        contactId,
        message: '🔔 [HANDOVER REQUESTED] User requested to speak with a human agent. Please respond ASAP.',
      }),
    });

    console.log('[GHL AI Chat] ✓ Handover complete - conversation flagged');
  } catch (error) {
    console.error('[GHL AI Chat] Handover error:', error);
  }
}

// ─── Main Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('[GHL AI Chat] ═══ NEW REQUEST ═══');
  console.log('[GHL AI Chat] Timestamp:', new Date().toISOString());
  console.log('[GHL AI Chat] API Key:', API_KEY ? '✓ Present' : '✗ Missing');
  console.log('[GHL AI Chat] Location ID:', LOCATION_ID || '✗ Missing');
  console.log('[GHL AI Chat] AI Agent ID:', AI_AGENT_ID || '⚠️ Not configured');
  
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
      pageContext, // NEW: current page user is on
      userIntent, // NEW: detected user intent
    } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log('[GHL AI Chat] Page Context:', pageContext || 'not provided');
    console.log('[GHL AI Chat] User Intent:', userIntent || 'not provided');

    // Check for handover trigger FIRST
    const shouldHandover = detectHandoverTrigger(message);
    
    if (shouldHandover) {
      console.log('[GHL AI Chat] 🔔 Handover trigger detected in message');
    }

    let contactId = existingContactId;
    let conversationId = existingConvId;

    // Create/get contact with rich context
    if (!contactId) {
      if (!name || !email || !persona) {
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' },
          { status: 400 }
        );
      }
      contactId = await upsertContact(name, email, persona, companyName, pageContext, userIntent);
    } else {
      visitorContactIds.add(contactId);
    }

    // Create/get conversation with context
    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId, message, pageContext);
    }

    // Handle manual handover request
    if (shouldHandover) {
      await handoverToLiveAgent(conversationId, contactId);
      
      const elapsed = Date.now() - startTime;
      console.log(`[GHL AI Chat] ✓ Request completed in ${elapsed}ms (handover)`);
      
      return NextResponse.json({
        success: true,
        contactId,
        conversationId,
        message: "Perfect! I'm connecting you with a team member now. They'll respond to you shortly via this conversation or email.",
        handover: true,
      });
    }

    // Route to AI bot with context
    console.log('[GHL AI Chat] → Routing to AI bot with context');
    const aiMessage = await sendMessageAndWaitForAI(conversationId, contactId, message, pageContext);

    const elapsed = Date.now() - startTime;
    console.log(`[GHL AI Chat] ✓ Request completed in ${elapsed}ms`);

    return NextResponse.json({
      success: true,
      contactId,
      conversationId,
      message: aiMessage,
      handover: false,
    });
    
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error('[GHL AI Chat] ✗ Fatal error after', elapsed, 'ms');
    console.error('[GHL AI Chat] Error:', err);
    console.error('[GHL AI Chat] Stack:', err instanceof Error ? err.stack : 'No stack');
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: err instanceof Error ? err.message : String(err),
        message: 'I apologize for the technical difficulty. Please email us at support@recxchange.io or try again in a moment.',
      },
      { status: 500 }
    );
  }
}
