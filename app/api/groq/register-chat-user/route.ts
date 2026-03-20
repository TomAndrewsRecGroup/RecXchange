import { NextRequest, NextResponse } from 'next/server';
import { visitorContactIds } from '../webhook/route';
import { sendTelegramHandover } from '@/lib/groq/telegram';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

/**
 * POST /api/groq/register-chat-user
 *
 * Called when a visitor submits the chat gate form.
 * Creates or finds the GHL contact with live-chat tag, creates a conversation,
 * sends a Telegram notification to the team, and returns all three IDs so the
 * frontend can open the SSE stream and thread all messages under the same notification.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, persona, companyName, pageContext, isLive } = await req.json();

    if (!name || !email || !persona) {
      return NextResponse.json({ error: 'name, email and persona are required' }, { status: 400 });
    }

    const firstName = name.split(' ')[0] || name;
    const lastName  = name.split(' ').slice(1).join(' ') || '';

    console.log('[Register Chat User] Upserting contact:', { email, firstName, lastName, persona });

    // ── Find or create GHL contact ───────────────────────────────────────────
    let contactId: string | null = null;

    const searchUrl  = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
    const search     = await fetch(searchUrl, { headers: ghlHeaders });
    const searchData = await search.json();

    if (searchData?.contact?.id) {
      contactId = searchData.contact.id;
      console.log('[Register Chat User] Existing contact found:', contactId);
      visitorContactIds.add(contactId!);

      await fetch(`${GHL_BASE}/contacts/${contactId}`, {
        method: 'PUT',
        headers: ghlHeaders,
        body: JSON.stringify({ tags: buildTags(persona, pageContext, companyName) }),
      });
    } else {
      const payload: Record<string, unknown> = {
        locationId: LOCATION_ID,
        firstName,
        lastName,
        email,
        source: 'RecXchange Live Chat',
        tags: buildTags(persona, pageContext, companyName),
      };
      if (persona === 'hiring-manager' && companyName) {
        payload.companyName = companyName;
      }

      const create     = await fetch(`${GHL_BASE}/contacts/`, { method: 'POST', headers: ghlHeaders, body: JSON.stringify(payload) });
      const createData = await create.json();

      if (!createData?.contact?.id) {
        console.error('[Register Chat User] Failed to create contact:', createData);
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
      }

      contactId = createData.contact.id;
      visitorContactIds.add(contactId!);
      console.log('[Register Chat User] New contact created:', contactId);
    }

    // Outside live hours: contact captured, nothing else needed
    if (!isLive) {
      console.log('[Register Chat User] Outside live hours — contact captured, skipping conversation and Telegram');
      return NextResponse.json({ success: true, contactId, conversationId: null, telegramMsgId: null });
    }

    // ── Find or create GHL conversation ──────────────────────────────────────
    let conversationId: string | null = null;
    try {
      const convSearch     = await fetch(`${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`, { headers: ghlHeaders });
      const convSearchData = await convSearch.json();

      if (convSearchData?.conversations?.length > 0) {
        conversationId = convSearchData.conversations[0].id;
      } else {
        const convCreate     = await fetch(`${GHL_BASE}/conversations/`, { method: 'POST', headers: ghlHeaders, body: JSON.stringify({ locationId: LOCATION_ID, contactId }) });
        const convCreateData = await convCreate.json();
        conversationId       = convCreateData?.conversation?.id ?? null;
      }
      console.log('[Register Chat User] Conversation:', conversationId);
    } catch (err) {
      console.warn('[Register Chat User] Could not create GHL conversation (non-fatal):', err);
    }

    // ── Notify team in Telegram ───────────────────────────────────────────────
    // This message starts the thread. All visitor messages will reply to it.
    // The ref:conversationId embedded in the message is used by the telegram-webhook
    // to route team replies back to the correct visitor without shared in-memory state.
    let telegramMsgId: number | null = null;
    try {
      telegramMsgId = await sendTelegramHandover({
        name,
        email,
        persona: persona as 'recruiter' | 'hiring-manager',
        companyName,
        pageContext,
        userMessage: '(visitor entered the live chat)',
        aiResponse:  'A team member will be with them shortly.',
        conversationId: conversationId ?? undefined,
      });
    } catch (err) {
      console.warn('[Register Chat User] Telegram notification failed (non-fatal):', err);
    }

    return NextResponse.json({ success: true, contactId, conversationId, telegramMsgId });

  } catch (err) {
    console.error('[Register Chat User] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function buildTags(persona: string, pageContext?: string, companyName?: string): string[] {
  const tags = ['live-chat', 'chat-form-submitted', 'recxchange-website'];

  if (persona === 'hiring-manager') {
    tags.push('hiring-manager', 'chat-hiring-manager');
    if (companyName) tags.push('has-company');
  } else {
    tags.push('recruiter', 'chat-recruiter');
  }

  if (pageContext) {
    tags.push(`page-${pageContext.toLowerCase().replace(/\s+/g, '-')}`);
  }

  return tags;
}
