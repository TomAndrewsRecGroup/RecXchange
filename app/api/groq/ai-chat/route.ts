import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';
import Groq from 'groq-sdk';

// Import secure configuration and utilities
import { GROQ_CONFIG, buildContextPrompt, type AssistantName } from '@/lib/groq/config';
import { validateChatInputs } from '@/lib/groq/validation';
import { performSecurityCheck, sanitizeAIResponse, logSecurityEvent } from '@/lib/groq/security';
import { sendTelegramHandover, forwardUserMessageToTelegram } from '@/lib/groq/telegram';
import type { 
  ConversationMessage, 
  SmartLinkData, 
  ChatSuccessResponse,
  ChatErrorResponse,
  GHLContactPayload,
  MessageDirection 
} from '@/lib/groq/types';

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

// ─── Upsert Contact ─────────────────────────────────────────────────────────
/**
 * Creates or retrieves a GHL contact.
 * Returns null if GHL is unavailable — the caller must handle this gracefully
 * so the Groq call can still proceed even when CRM is down.
 */
async function upsertContact(
  name: string,
  email: string,
  persona: 'recruiter' | 'hiring-manager',
  companyName?: string,
  pageContext?: string
): Promise<string | null> {
  const firstName = name.split(' ')[0] || name;
  const lastName = name.split(' ').slice(1).join(' ') || '';

  console.log('[Groq AI Chat] Upserting contact:', { email, firstName, lastName });

  try {
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

    const contactPayload: GHLContactPayload = {
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
      console.warn('[Groq AI Chat] GHL contact creation returned unexpected response:', JSON.stringify(createData));
      return null;
    }

    const contactId = createData.contact.id;
    visitorContactIds.add(contactId);

    console.log('[Groq AI Chat] New contact created:', contactId);
    return contactId;
  } catch (err) {
    console.error('[Groq AI Chat] GHL upsertContact failed (non-fatal):', err);
    return null;
  }
}

// ─── Get or Create Conversation ─────────────────────────────────────────────
/**
 * Finds or creates a GHL conversation for a contact.
 * Returns null if GHL is unavailable — callers skip CRM logging but
 * still call Groq so the user always gets a response.
 */
async function getOrCreateConversation(
  contactId: string
): Promise<string | null> {
  console.log('[Groq AI Chat] Getting/creating conversation for contact:', contactId);

  try {
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
      body: JSON.stringify({ locationId: LOCATION_ID, contactId }),
    });
    const createData = await create.json();

    if (!createData?.conversation?.id) {
      console.warn('[Groq AI Chat] GHL conversation creation returned unexpected response:', JSON.stringify(createData));
      return null;
    }

    const newConvId = createData.conversation.id;
    console.log('[Groq AI Chat] Created new conversation:', newConvId);
    return newConvId;
  } catch (err) {
    console.error('[Groq AI Chat] GHL getOrCreateConversation failed (non-fatal):', err);
    return null;
  }
}

// ─── Log Message to GHL ─────────────────────────────────────────────────────
async function logMessageToGHL(
  conversationId: string,
  message: string,
  direction: MessageDirection
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
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=${GROQ_CONFIG.maxHistoryToFetch}`,
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

// ─── Handover Detection ──────────────────────────────────────────────────────
/**
 * Detects whether a conversation should be handed over to a live agent.
 *
 * Escalation is only triggered in these specific scenarios:
 * 1. Recruiter explicitly wants to upgrade to Lite or Entry tier.
 * 2. Hiring Manager explicitly prefers speaking to someone over booking a meeting.
 * 3. AI model signals escalation via [handover] tag (safety net).
 */
function detectHandover(
  userMessage: string,
  aiResponse: string,
  persona: 'recruiter' | 'hiring-manager',
): boolean {
  const lower = userMessage.toLowerCase();

  // AI model explicitly signalled escalation
  if (aiResponse.toLowerCase().includes('[handover]')) return true;

  // Recruiter: explicit upgrade intent for Lite tier
  const wantsLite =
    lower.includes('upgrade to lite') ||
    lower.includes('sign up for lite') ||
    lower.includes('join lite') ||
    lower.includes('get lite') ||
    lower.includes('lite plan') ||
    lower.includes('lite membership') ||
    lower.includes('buy lite') ||
    (lower.includes('lite') && (lower.includes('upgrade') || lower.includes('sign up') || lower.includes('join') || lower.includes('ready') || lower.includes('start')));

  // Recruiter: explicit upgrade intent for Entry tier
  const wantsEntry =
    lower.includes('upgrade to entry') ||
    lower.includes('sign up for entry') ||
    lower.includes('join entry') ||
    lower.includes('get entry') ||
    lower.includes('entry plan') ||
    lower.includes('entry membership') ||
    lower.includes('buy entry') ||
    (lower.includes('entry') && (lower.includes('upgrade') || lower.includes('sign up') || lower.includes('join') || lower.includes('ready') || lower.includes('start')));

  if (wantsLite || wantsEntry) return true;

  // Hiring Manager: explicitly prefers speaking to someone over booking a meeting
  if (persona === 'hiring-manager') {
    const prefersHuman =
      lower.includes('rather speak') ||
      lower.includes('prefer to speak') ||
      lower.includes('speak to someone') ||
      lower.includes('speak to a human') ||
      lower.includes('speak to human') ||
      lower.includes('talk to someone') ||
      lower.includes('talk to a human') ||
      lower.includes('talk to human') ||
      lower.includes('rather than booking') ||
      lower.includes('rather than a meeting') ||
      lower.includes('instead of booking') ||
      lower.includes('rather not book') ||
      lower.includes('prefer not to book');
    if (prefersHuman) return true;
  }

  return false;
}

// ─── Parse Smart Links from AI Response ────────────────────────────────────
function parseSmartLinks(
  response: string, 
  userName: string, 
  userEmail: string,
  userCompany: string = ''
): { cleanResponse: string; smartLinks: SmartLinkData[] } {
  const smartLinks: SmartLinkData[] = [];
  
  // Match [button:action]text[/button] format
  const buttonRegex = /\[button:(send-3-roles|book-meeting|recx-direct-info|how-it-works|how-it-works-no-meeting)\](.+?)\[\/button\]/g;
  
  let cleanResponse = response;
  let match;
  
  while ((match = buttonRegex.exec(response)) !== null) {
    const action = match[1] as SmartLinkData['action'];
    const buttonText = match[2];
    
    let url = '';
    let prefillData: SmartLinkData['prefillData'] = undefined;
    
    switch (action) {
      case 'send-3-roles':
        url = `/?action=send-3-roles&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;
        prefillData = { name: userName, email: userEmail };
        break;
      
      case 'recx-direct-info':
        url = `/?action=recx-direct-info&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;
        prefillData = { name: userName, email: userEmail };
        break;
      
      case 'how-it-works':
        url = `/?action=how-it-works&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&company=${encodeURIComponent(userCompany)}&bookedMeeting=true`;
        prefillData = { name: userName, email: userEmail, company: userCompany, bookedMeeting: true };
        break;
      
      case 'how-it-works-no-meeting':
        url = `/?action=how-it-works&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&company=${encodeURIComponent(userCompany)}&bookedMeeting=false`;
        prefillData = { name: userName, email: userEmail, company: userCompany, bookedMeeting: false };
        break;
      
      case 'book-meeting':
        url = 'https://link.gohighlevel.com/widget/booking/xp9zWAV1rz40w5WdPSTi';
        break;
    }
    
    smartLinks.push({ action, prefillData, url });
    
    cleanResponse = cleanResponse.replace(
      match[0], 
      `[smartlink:${smartLinks.length - 1}]${buttonText}[/smartlink]`
    );
  }
  
  return { cleanResponse, smartLinks };
}

// ─── Call Groq AI ───────────────────────────────────────────────────────────
async function callGroqAI(
  message: string,
  persona: 'recruiter' | 'hiring-manager',
  pageContext: string,
  conversationHistory: ConversationMessage[] = [],
  assistantName?: AssistantName
): Promise<string> {
  console.log('[Groq AI Chat] Calling Groq API');
  console.log('[Groq AI Chat] Model:', GROQ_CONFIG.model);
  console.log('[Groq AI Chat] User persona:', persona);
  console.log('[Groq AI Chat] Page context:', pageContext);
  console.log('[Groq AI Chat] Assistant name:', assistantName);
  
  // Build context-aware system message with grounded knowledge injected
  const contextPrompt = buildContextPrompt(persona, pageContext, conversationHistory.length, assistantName, message);
  
  // Build messages array with limited history
  const messages: ConversationMessage[] = [
    { role: 'system', content: contextPrompt },
    ...conversationHistory.slice(-GROQ_CONFIG.maxHistoryMessages),
    { role: 'user', content: message },
  ];
  
  try {
    const completion = await groq.chat.completions.create({
      messages,
      model: GROQ_CONFIG.model,
      temperature: GROQ_CONFIG.temperature,
      max_tokens: GROQ_CONFIG.maxTokens,
      top_p: GROQ_CONFIG.topP,
    });
    
    const response = completion.choices[0]?.message?.content || '';
    console.log('[Groq AI Chat] ✓ Groq responded:', response.substring(0, 100));
    
    return response.trim();
    
  } catch (error) {
    console.error('[Groq AI Chat] Groq API error:', error);
    throw new Error('AI service temporarily unavailable');
  }
}

// ─── Main Handler ────────────────────────────────────────────────────────────
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
      assistantName,
      isHandover,
      telegramHandoverMessageId,
    } = body;

    const isFirstMessage = !existingContactId;

    // Validate all inputs with security checks
    const validation = validateChatInputs(
      { name, email, message, persona, companyName, pageContext },
      isFirstMessage
    );

    if (!validation.valid || !validation.data) {
      console.warn('[Groq AI Chat] Validation failed:', validation.error);
      return NextResponse.json(
        { error: validation.error } as ChatErrorResponse,
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    console.log('[Groq AI Chat] Page:', validatedData.pageContext);
    console.log('[Groq AI Chat] Persona:', validatedData.persona);
    console.log('[Groq AI Chat] Message preview:', validatedData.message.substring(0, 50));

    let contactId: string | null = existingContactId ?? null;
    let conversationId: string | null = existingConvId ?? null;

    // Create/get contact — non-fatal if GHL is unavailable
    if (!contactId) {
      if (!validatedData.name || !validatedData.email || !validatedData.persona) {
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' } as ChatErrorResponse,
          { status: 400 }
        );
      }
      contactId = await upsertContact(
        validatedData.name,
        validatedData.email,
        validatedData.persona,
        validatedData.companyName,
        validatedData.pageContext
      );
      // contactId may be null if GHL is down — Groq can still respond
      if (!contactId) {
        console.warn('[Groq AI Chat] Proceeding without GHL contactId (GHL unavailable)');
      }
    } else {
      visitorContactIds.add(contactId);
    }

    // Perform security checks (rate limiting, injection detection)
    // Use a session key if GHL couldn't provide a real contactId
    const securityKey = contactId ?? `anon-${validatedData.email ?? 'unknown'}`;
    const securityCheck = performSecurityCheck(validatedData.message, securityKey);
    if (!securityCheck.passed) {
      console.warn('[Groq AI Chat] Security check failed:', securityCheck.reason);
      if (contactId) logSecurityEvent('suspicious_activity', contactId, { reason: securityCheck.reason });

      return NextResponse.json(
        {
          error: 'Request blocked',
          message: securityCheck.reason || 'Your request could not be processed.',
        } as ChatErrorResponse,
        { status: 429 }
      );
    }

    // Create/get conversation — non-fatal if GHL is unavailable
    if (!conversationId && contactId) {
      conversationId = await getOrCreateConversation(contactId);
      if (!conversationId) {
        console.warn('[Groq AI Chat] Proceeding without GHL conversationId (GHL unavailable)');
      }
    }

    // Resolve persona — validation passes it through when provided; fall back to
    // 'recruiter' so callGroqAI always has a valid value for prompt building.
    const resolvedPersona: 'recruiter' | 'hiring-manager' = validatedData.persona ?? 'recruiter';

    // ── Post-handover message: skip Groq, log to GHL, forward to Telegram thread ─
    if (isHandover && conversationId) {
      console.log('[Groq AI Chat] Post-handover message — forwarding to Telegram thread');
      await logMessageToGHL(conversationId, validatedData.message, 'inbound');
      if (telegramHandoverMessageId && typeof telegramHandoverMessageId === 'number') {
        await forwardUserMessageToTelegram(
          conversationId,
          validatedData.name || 'Visitor',
          validatedData.message,
          telegramHandoverMessageId,
        );
      }
      const elapsed = Date.now() - startTime;
      console.log(`[Groq AI Chat] ✓ Post-handover message forwarded in ${elapsed}ms`);
      return NextResponse.json({
        success: true,
        contactId: contactId ?? '',
        conversationId: conversationId ?? '',
        message: '',
      } as ChatSuccessResponse);
    }

    // Get conversation history — already handles failures internally (returns [])
    const history = conversationId ? await getConversationHistory(conversationId) : [];

    // Call Groq AI — pass through the session assistant name
    console.log('[Groq AI Chat] → Calling Groq AI');
    const aiResponse = await callGroqAI(
      validatedData.message,
      resolvedPersona,
      validatedData.pageContext,
      history,
      assistantName as AssistantName | undefined
    );

    // Sanitize AI response to prevent data leakage
    const sanitizedResponse = sanitizeAIResponse(aiResponse);

    // Detect handover before parsing smart links
    const handover = detectHandover(validatedData.message, sanitizedResponse, resolvedPersona);
    let telegramMsgId: number | null = null;
    if (handover) {
      console.log('[Groq AI Chat] Handover triggered — notifying via Telegram');
      // Await so we capture the message_id for reply threading
      try {
        telegramMsgId = await sendTelegramHandover({
          name: validatedData.name,
          email: validatedData.email,
          persona: resolvedPersona,
          companyName: validatedData.companyName,
          pageContext: validatedData.pageContext,
          userMessage: validatedData.message,
          aiResponse: sanitizedResponse,
          history,
          conversationId: conversationId ?? undefined,
        });
      } catch (err) {
        console.error('[Groq AI Chat] Telegram handover notification failed:', err);
      }
    }

    // Parse smart links from response
    const { cleanResponse, smartLinks } = parseSmartLinks(
      sanitizedResponse,
      validatedData.name || '',
      validatedData.email || '',
      validatedData.companyName || ''
    );

    console.log('[Groq AI Chat] Found', smartLinks.length, 'smart links');

    // Log to GHL only when we have a real conversation ID
    if (conversationId) {
      await Promise.all([
        logMessageToGHL(conversationId, validatedData.message, 'inbound'),
        logMessageToGHL(conversationId, sanitizedResponse, 'outbound'),
      ]);
    } else {
      console.warn('[Groq AI Chat] Skipping GHL message logging (no conversationId)');
    }

    const elapsed = Date.now() - startTime;
    console.log(`[Groq AI Chat] ✓ Completed in ${elapsed}ms`);

    return NextResponse.json({
      success: true,
      contactId: contactId ?? '',
      conversationId: conversationId ?? '',
      message: cleanResponse,
      smartLinks: smartLinks.length > 0 ? smartLinks : undefined,
      handover: handover || undefined,
      telegramHandoverMessageId: telegramMsgId ?? undefined,
    } as ChatSuccessResponse);
    
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error('[Groq AI Chat] ✗ Error after', elapsed, 'ms:', err);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Technical issue. Please email support@recxchange.io or try again.',
      } as ChatErrorResponse,
      { status: 500 }
    );
  }
}
