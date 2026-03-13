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

/**
 * POST /api/groq/register-chat-user
 *
 * Called immediately when a visitor submits the chat intro form.
 * Creates or updates the contact in GHL and applies persona-specific tags
 * BEFORE any AI message is exchanged — ensuring no lead is lost.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, persona, companyName, pageContext } = await req.json();

    if (!name || !email || !persona) {
      return NextResponse.json({ error: 'name, email and persona are required' }, { status: 400 });
    }

    const firstName = name.split(' ')[0] || name;
    const lastName = name.split(' ').slice(1).join(' ') || '';

    console.log('[Register Chat User] Upserting contact:', { email, firstName, lastName, persona });

    // Check for existing contact first
    const searchUrl = `${GHL_BASE}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;
    const search = await fetch(searchUrl, { headers: ghlHeaders });
    const searchData = await search.json();

    if (searchData?.contact?.id) {
      const contactId = searchData.contact.id;
      console.log('[Register Chat User] Existing contact found:', contactId);
      visitorContactIds.add(contactId);

      // Patch additional tags onto the existing contact
      const additionalTags = buildTags(persona, pageContext, companyName);
      await fetch(`${GHL_BASE}/contacts/${contactId}`, {
        method: 'PUT',
        headers: ghlHeaders,
        body: JSON.stringify({ tags: additionalTags }),
      });

      return NextResponse.json({ success: true, contactId, existing: true });
    }

    // Build tags based on persona and context
    const tags = buildTags(persona, pageContext, companyName);

    const payload: Record<string, unknown> = {
      locationId: LOCATION_ID,
      firstName,
      lastName,
      email,
      source: 'RecXchange AI Chat',
      tags,
    };

    if (persona === 'hiring-manager' && companyName) {
      payload.companyName = companyName;
    }

    const create = await fetch(`${GHL_BASE}/contacts/`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(payload),
    });

    const createData = await create.json();

    if (!createData?.contact?.id) {
      console.error('[Register Chat User] Failed to create contact:', createData);
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }

    const contactId = createData.contact.id;
    visitorContactIds.add(contactId);

    console.log('[Register Chat User] ✓ New contact created:', contactId, 'Tags:', tags);

    return NextResponse.json({ success: true, contactId, existing: false });

  } catch (err) {
    console.error('[Register Chat User] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function buildTags(persona: string, pageContext?: string, companyName?: string): string[] {
  const tags: string[] = [
    'ai-chat',
    'chat-form-submitted',
    'recxchange-website',
  ];

  if (persona === 'hiring-manager') {
    tags.push('hiring-manager');
    tags.push('chat-hiring-manager');
    if (companyName) tags.push('has-company');
  } else {
    tags.push('recruiter');
    tags.push('chat-recruiter');
  }

  if (pageContext) {
    tags.push(`page-${pageContext.toLowerCase().replace(/\s+/g, '-')}`);
  }

  return tags;
}
