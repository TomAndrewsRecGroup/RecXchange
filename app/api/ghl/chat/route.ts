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

  console.log('[GHL Chat] Upserting contact:', { email, firstName, lastName, persona });

  // Search for existing contact by email
  const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
  console.log('[GHL Chat] Searching for duplicate contact:', searchUrl);
  
  const search = await fetch(searchUrl, { headers: ghlHeaders });
  const searchData = await search.json();
  
  console.log('[GHL Chat] Duplicate search response:', JSON.stringify(searchData));
  
  if (searchData?.contact?.id) {
    console.log('[GHL Chat] Found existing contact:', searchData.contact.id);
    return searchData.contact.id;
  }

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

  if (persona === 'hiring-manager' && companyName) {
    contactPayload.companyName = companyName;
  }

  console.log('[GHL Chat] Creating contact with payload:', JSON.stringify(contactPayload));

  const create = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(contactPayload),
  });
  
  const createData = await create.json();
  console.log('[GHL Chat] Create contact response:', JSON.stringify(createData));
  
  if (!createData?.contact?.id) {
    throw new Error(`Failed to create contact: ${JSON.stringify(createData)}`);
  }
  
  return createData.contact.id;
}

// ─── Upsert Company (Hiring Managers only) ────────────────────────────────────
async function upsertCompany(companyName: string, contactId: string): Promise<void> {
  try {
    console.log('[GHL Chat] Upserting company:', companyName);
    
    const search = await fetch(
      `${GHL_BASE}/companies/search?locationId=${LOCATION_ID}&name=${encodeURIComponent(companyName)}`,
      { headers: ghlHeaders }
    );
    const searchData = await search.json();

    let companyId: string | null = null;

    if (searchData?.companies?.length > 0) {
      companyId = searchData.companies[0].id;
      console.log('[GHL Chat] Found existing company:', companyId);
    } else {
      console.log('[GHL Chat] Creating new company');
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
      console.log('[GHL Chat] Company created:', companyId);
    }

    if (companyId) {
      console.log('[GHL Chat] Linking contact to company');
      await fetch(`${GHL_BASE}/contacts/${contactId}`, {
        method: 'PUT',
        headers: ghlHeaders,
        body: JSON.stringify({ companyId }),
      });
    }
  } catch (err) {
    console.error('[GHL Chat] Company upsert failed:', err);
  }
}

// ─── Get or Create Conversation ───────────────────────────────────────────────
async function getOrCreateConversation(contactId: string): Promise<string> {
  console.log('[GHL Chat] Getting/creating conversation for contact:', contactId);
  
  const search = await fetch(
    `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
    { headers: ghlHeaders }
  );
  const searchData = await search.json();
  
  console.log('[GHL Chat] Conversation search response:', JSON.stringify(searchData));
  
  if (searchData?.conversations?.length > 0) {
    console.log('[GHL Chat] Found existing conversation:', searchData.conversations[0].id);
    return searchData.conversations[0].id;
  }

  console.log('[GHL Chat] Creating new conversation');
  const create = await fetch(`${GHL_BASE}/conversations/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({ locationId: LOCATION_ID, contactId }),
  });
  const createData = await create.json();
  
  console.log('[GHL Chat] Create conversation response:', JSON.stringify(createData));
  
  if (!createData?.conversation?.id) {
    throw new Error(`Failed to create conversation: ${JSON.stringify(createData)}`);
  }
  
  return createData.conversation.id;
}

// ─── Post Inbound Message ─────────────────────────────────────────────────────
async function postInboundMessage(
  conversationId: string,
  contactId: string,
  message: string
): Promise<void> {
  console.log('[GHL Chat] Posting inbound message to conversation:', conversationId);
  
  const payload = {
    type: 'TYPE_LIVE_CHAT',
    conversationId,
    contactId,
    locationId: LOCATION_ID,
    message,
  };
  
  console.log('[GHL Chat] Message payload:', JSON.stringify(payload));
  
  const response = await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  console.log('[GHL Chat] Post message response:', JSON.stringify(data));
  
  if (!response.ok) {
    throw new Error(`Failed to post message: ${response.status} ${JSON.stringify(data)}`);
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  console.log('[GHL Chat] === New chat request ===');
  console.log('[GHL Chat] Env check - API_KEY exists:', !!API_KEY);
  console.log('[GHL Chat] Env check - LOCATION_ID:', LOCATION_ID);
  
  try {
    const body = await req.json();
    console.log('[GHL Chat] Request body:', JSON.stringify(body));
    
    const {
      name,
      email,
      message,
      persona,
      companyName,
      conversationId: existingConvId,
      contactId: existingContactId,
    } = body;

    if (!message?.trim()) {
      console.log('[GHL Chat] Error: No message provided');
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let contactId = existingContactId;
    let conversationId = existingConvId;

    // First message — create contact + optionally company
    if (!contactId) {
      if (!name || !email || !persona) {
        console.log('[GHL Chat] Error: Missing required fields for first message');
        return NextResponse.json(
          { error: 'Name, email and persona required for first message' },
          { status: 400 }
        );
      }
      contactId = await upsertContact(name, email, persona, companyName);
      console.log('[GHL Chat] Contact upserted:', contactId);

      // Hiring managers: also create/link company record
      if (persona === 'hiring-manager' && companyName && contactId) {
        await upsertCompany(companyName, contactId);
      }
    }

    if (!conversationId) {
      conversationId = await getOrCreateConversation(contactId);
      console.log('[GHL Chat] Conversation ready:', conversationId);
    }

    await postInboundMessage(conversationId, contactId, message);
    console.log('[GHL Chat] Message posted successfully');

    return NextResponse.json({ success: true, contactId, conversationId });
  } catch (err) {
    console.error('[GHL Chat] Fatal error:', err);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
}
