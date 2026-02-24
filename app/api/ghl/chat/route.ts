import { NextRequest, NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

// ─── Step 1: Upsert contact ───────────────────────────────────────────────────
async function upsertContact(name: string, email: string): Promise<string> {
  // Try to find existing contact by email first
  const search = await fetch(
    `${GHL_BASE}/contacts/?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();

  if (searchData?.contacts?.length > 0) {
    return searchData.contacts[0].id;
  }

  // Create new contact
  const create = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      locationId: LOCATION_ID,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      email,
      source: 'RecXchange Live Chat',
      tags: ['live-chat', 'recxchange-website'],
    }),
  });
  const createData = await create.json();
  return createData?.contact?.id;
}

// ─── Step 2: Get or create conversation ──────────────────────────────────────
async function getOrCreateConversation(contactId: string): Promise<string> {
  // Search for existing conversation
  const search = await fetch(
    `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();

  if (searchData?.conversations?.length > 0) {
    return searchData.conversations[0].id;
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
  return createData?.conversation?.id;
}

// ─── Step 3: Post inbound message ────────────────────────────────────────────
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

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { name, email, message, conversationId: existingConvId, contactId: existingContactId } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // If we already have IDs from a previous message in the same session, reuse them
    let contactId = existingContactId;
    let conversationId = existingConvId;

    if (!contactId) {
      if (!name || !email) {
        return NextResponse.json({ error: 'Name and email required for first message' }, { status: 400 });
      }
      contactId = await upsertContact(name, email);
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
