import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';
import Groq from 'groq-sdk';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

const groq = new Groq({ apiKey: GROQ_API_KEY });

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// System prompt based on your GHL configuration
const SYSTEM_PROMPT = `You are the RecXchange Revenue Assistant.

Your role is to guide recruiters and hiring managers toward the most relevant next action based on their specific question.

You do not act as a general support bot.
You do not provide long explanations.
You move conversations forward efficiently.

If the user expresses a clear intent, respond only to that intent. Do not introduce additional options unless the conversation requires it.

Recruiter logic:
• If asking for live roles → guide to 3 live roles form only.
• If asking about RecX Direct → explain briefly and offer the explainer video.
• If asking about Lite or Pro pricing → provide clear pricing and short positioning. Only escalate if they express intent to subscribe or upgrade.
• If asking how to join → guide to sign-up.
If a recruiter asks about Lite pricing, provide the price and guide them directly toward sign-up as the primary next step. Mention live roles only as part of the sign-up benefit, not as a separate option.

Hiring manager logic:
• If asking how it works → briefly explain and guide to strategy call.
• If hesitant → offer explainer video.
• If expressing urgency → escalate to human.
Do not describe the process as the hiring manager posting a job. Instead, explain that RecX Direct distributes live roles to the recruiter network on their behalf.
Do not mention fees or pricing unless specifically asked.
Do not describe RecX Direct as a separate entity from RecXchange. It is part of RecXchange.
Do not use em-dashes or long punctuation separators in responses.
Use simple sentence structure.

CAPABILITIES YOU CAN TRIGGER:

For Recruiters:
1. Send 3 Matched Roles - When they ask for roles
2. Explain RecX Direct - When they ask about premium tiers or higher splits

For Hiring Managers:
1. Schedule Discovery Call - When they want to book a meeting or consultation

CONVERSATION PATTERNS:

When recruiter asks about roles:
- Ask their industries first
- Then mention you can send 3 matched roles to their email
- Confirm email was sent

When recruiter asks about RecX Direct:
- Explain the 70% split benefit
- Highlight premium advantages
- Keep it brief

When hiring manager wants to talk:
- Send booking link: https://recxchange.io/book-meeting
- Set expectations for the call

Do not cross-sell in the same reply.
Do not stack multiple calls-to-action.
Keep responses under 100 words.
Avoid jargon.
Use clear recruiter language.

Escalate only when:
• The user explicitly requests a human.
• The user confirms buying or upgrading intent.

Conversation Guidelines:
• Keep responses concise and controlled.
• Move toward a clear action within 3 replies.
• Avoid long educational explanations.
• Do not answer unrelated questions.
• Escalate high-intent users immediately.
• Do not discuss detailed pricing.

Core Positioning:
RecXchange is a recruiter collaboration platform.
Recruiters collaborate with other recruiters through structured split-fee partnerships.
RecX Direct is the in-house business development arm that signs live clients and distributes their roles to the RecXchange network.

Do not describe RecXchange as a job board.`;

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

  console.log('[Groq AI Chat] Upserting contact:', { email, firstName, lastName });

  const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
  const search = await fetch(searchUrl, { headers: ghlHeaders });
  const searchData = await search.json();
  
  if (searchData?.contact?.id) {
    const contactId = searchData.contact.id;
    console.log('[Groq AI Chat] Found existing contact:', contactId);
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
  
  console.log('[Groq AI Chat] New contact created:', contactId);
  return contactId;
}

// ─── Get or Create Conversation ─────────────────────────────────────────────
async function getOrCreateConversation(
  contactId: string
): Promise<string> {
  console.log('[Groq AI Chat] Getting/creating conversation for contact:', contactId);
  
  const search = await fetch(
    `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();
  
  if (searchData?.conversations?.length > 0) {
    const existingConvId = searchData.conversations[0].id;
    console.log('[Groq AI Chat] Found existing conversation:', existingConvId);
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
  console.log('[Groq AI Chat] Created new conversation:', newConvId);
  
  return newConvId;
}

// ─── Log Message to GHL ─────────────────────────────────────────────────────
async function logMessageToGHL(
  conversationId: string,
  message: string,
  direction: 'inbound' | 'outbound'
): Promise<void> {
  console.log(`[Groq AI Chat] Logging ${direction} message to GHL`);
  
  const payload = {
    type: 'Live_Chat',
    conversationId,
    message,
  };
  
  try {
    const endpoint = direction === 'inbound' 
      ? `${GHL_BASE}/conversations/messages/inbound`
      : `${GHL_BASE}/conversations/messages`;
      
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[Groq AI Chat] ✓ ${direction} message logged`);
    } else {
      console.warn(`[Groq AI Chat] Failed to log ${direction} message:`, response.status);
    }
  } catch (error) {
    console.error(`[Groq AI Chat] Error logging ${direction} message:`, error);
  }
}

// ─── Get Conversation History from GHL ──────────────────────────────────────
async function getConversationHistory(
  conversationId: string
): Promise<ConversationMessage[]> {
  console.log('[Groq AI Chat] Fetching conversation history');
  
  try {
    const response = await fetch(
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=20`,
      { headers: ghlHeaders }
    );
    
    if (!response.ok) {
      console.warn('[Groq AI Chat] Could not fetch history:', response.status);
      return [];
    }
    
    const data = await response.json();
    const messages = data.messages?.messages || [];
    
    // Convert GHL messages to Groq format
    const history: ConversationMessage[] = messages
      .filter((msg: any) => msg.body && msg.body.trim())
      .sort((a: any, b: any) => {
        const dateA = new Date(a.dateAdded || 0).getTime();
        const dateB = new Date(b.dateAdded || 0).getTime();
        return dateA - dateB; // Oldest first
      })
      .map((msg: any) => ({
        role: msg.direction === 'inbound' ? 'user' : 'assistant',
        content: msg.body.trim(),
      }));
    
    console.log(`[Groq AI Chat] Found ${history.length} previous messages`);
    return history;
    
  } catch (error) {
    console.error('[Groq AI Chat] Error fetching history:', error);
    return [];
  }
}

// ─── Call Groq AI ───────────────────────────────────────────────────────────
async function callGroqAI(
  message: string,
  persona: 'recruiter' | 'hiring-manager',
  pageContext: string,
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  console.log('[Groq AI Chat] Calling Groq API');
  console.log('[Groq AI Chat] User persona:', persona);
  console.log('[Groq AI Chat] Page context:', pageContext);
  
  // Build context-aware system message
  const contextPrompt = `${SYSTEM_PROMPT}\n\nCurrent context:\n- User type: ${persona}\n- Page: ${pageContext}\n- Conversation has ${conversationHistory.length} previous messages`;
  
  // Build messages array
  const messages: ConversationMessage[] = [
    { role: 'system', content: contextPrompt },
    ...conversationHistory.slice(-6), // Last 6 messages for context
    { role: 'user', content: message },
  ];
  
  try {
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 300, // Keep responses concise
      top_p: 1,
    });
    
    const response = completion.choices[0]?.message?.content || '';
    console.log('[Groq AI Chat] ✓ Groq responded:', response.substring(0, 100));
    
    return response.trim();
    
  } catch (error) {
    console.error('[Groq AI Chat] Groq API error:', error);
    throw new Error('AI service temporarily unavailable');
  }
}

// ─── Main Handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('[Groq AI Chat] ═══ NEW REQUEST ═══');
  console.log('[Groq AI Chat] Timestamp:', new Date().toISOString());
  
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

    console.log('[Groq AI Chat] Page:', pageContext || 'unknown');
    console.log('[Groq AI Chat] Persona:', persona);
    console.log('[Groq AI Chat] Message preview:', message.substring(0, 50));

    let contactId = existingContactId;
    let conversationId = existingConvId;

    // Create/get contact
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

    // Create/get conversation
    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId);
    }

    // Get conversation history for context
    const history = await getConversationHistory(conversationId);

    // Call Groq AI
    console.log('[Groq AI Chat] → Calling Groq AI');
    const aiResponse = await callGroqAI(message, persona, pageContext || 'Homepage', history);

    // Log both messages to GHL for CRM tracking
    await Promise.all([
      logMessageToGHL(conversationId, message, 'inbound'),
      logMessageToGHL(conversationId, aiResponse, 'outbound'),
    ]);

    const elapsed = Date.now() - startTime;
    console.log(`[Groq AI Chat] ✓ Completed in ${elapsed}ms`);

    return NextResponse.json({
      success: true,
      contactId,
      conversationId,
      message: aiResponse,
    });
    
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error('[Groq AI Chat] ✗ Error after', elapsed, 'ms:', err);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Technical issue. Please email support@recxchange.io or try again.',
      },
      { status: 500 }
    );
  }
}
