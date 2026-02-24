import { NextRequest, NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

// ─── Upsert Contact ───────────────────────────────────────────────────────────
async function upsertContact(
  name: string,
  email: string,
  persona: 'recruiter' | 'hiring-manager',
  companyName?: string
): Promise<string> {
  const firstName = name.split(' ')[0] || name;
  const lastName = name.split(' ').slice(1).join(' ') || '';

  // Search for existing contact by email
  const search = await fetch(
    `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();
  if (searchData?.contact?.id) return searchData.contact.id;

  // Build contact payload based on persona
  const tags =
    persona === 'hiring-manager'
      ? ['live-chat', 'hiring-manager', 'recxchange-website']
      : ['live-chat', 'recruiter', 'recxchange-website'];

  const contactPayload: Record<string, unknown> = {
    locationId: LOCATION_ID,
    firstName,
    lastName,
    email,
    source: 'RecXchange Live Chat',
    tags,
  };

  // Hiring managers get company name attached
  if (persona === 'hiring-manager' && companyName) {
    contactPayload.companyName = companyName;
  }

  const create = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(contactPayload),
  });
  const createData = await create.json();
  return createData?.contact?.id;
}

// ─── Upsert Company (Hiring Managers only) ────────────────────────────────────
async function upsertCompany(companyName: string, contactId: string): Promise<void> {
  try {
    // Search for existing company
    const search = await fetch(
      `${GHL_BASE}/companies/search?locationId=${LOCATION_ID}&name=${encodeURIComponent(companyName)}`,
      { headers: ghlHeaders }
    );
    const searchData = await search.json();

    let companyId: string | null = null;

    if (searchData?.companies?.length > 0) {
      companyId = searchData.companies[0].id;
    } else {
      // Create company
      const create = await fetch(`${GHL_BASE}/companies/`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          locationId: LOCATION_ID,
          name: companyName,
        }),
      });
      const createData = await create.json();
      companyId = createData?.company?.id ?? null;
    }

    // Associate contact with company
    if (companyId) {
      await fetch(`${GHL_BASE}/contacts/${contactId}`, {
        method: 'PUT',
        headers: ghlHeaders,
        body: JSON.stringify({ companyId }),
      });
    }
  } catch (err) {
    // Non-fatal — log but don't block message delivery
    console.error('[GHL Chat] Company upsert failed:', err);
  }
}

// ─── Get or Create Conversation ───────────────────────────────────────────────
async function getOrCreateConversation(contactId: string): Promise<string> {
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
  return createData?.conversation?.id;
}

// ─── Post Inbound Message ─────────────────────────────────────────────────────
async function postInboundMessage(
  conversationId: string,
  contactId: string,
  message: string
): Promise<void> {
  await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      type: 'TYPE_LIVE_CHAT',
      conversationId,
      contactId,
      locationId: LOCATION_ID,
      message,
    }),
  });
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      message,
      persona,
      companyName,
      conversationId: existingConvId,
      contactId: existingContactId,
    } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let contactId = existingContactId;
    let conversationId = existingConvId;

    // First message — create contact + optionally company
    if (!contactId) {
      if (!name || !email || !persona) {
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' },
          { status: 400 }
        );
      }
      contactId = await upsertContact(name, email, persona, companyName);

      // Hiring managers: also create/link company record
      if (persona === 'hiring-manager' && companyName && contactId) {
        await upsertCompany(companyName, contactId);
      }
    }

    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId);
    }

    await postInboundMessage(conversationId, contactId, message);

    return NextResponse.json({ success: true, contactId, conversationId });
  } catch (err) {
    console.error('[GHL Chat] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
