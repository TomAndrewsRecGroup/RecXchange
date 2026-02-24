import { NextRequest, NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

// ───────────────────────────────────────────────────────────────────────────
// Shared in-memory reply store keyed by conversationId.
// Multiple simultaneous sessions are fully isolated.
// ───────────────────────────────────────────────────────────────────────────
export interface PendingReply {
  body: string;
  timestamp: number;
}

export const pendingReplies: Map<string, PendingReply[]> = new Map();

// ─── Resolve conversationId from contactId when GHL doesn't send it directly ───
async function getConversationIdFromContact(contactId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
      { headers: ghlHeaders }
    );
    const data = await res.json();
    return data?.conversations?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { contactId, body, direction } = payload;
    let { conversationId } = payload;

    if (!body) return NextResponse.json({ received: true });

    // Only queue outbound (team) replies — drop inbound (visitor) echoes.
    // If direction is explicitly inbound, skip. If direction is missing we
    // fall through and trust the conversationId lookup to find the right thread.
    if (direction && direction !== 'outbound') {
      return NextResponse.json({ received: true });
    }

    // Resolve conversationId via GHL API if not provided in payload
    if (!conversationId && contactId) {
      conversationId = await getConversationIdFromContact(contactId);
    }

    if (!conversationId) {
      console.warn('[GHL Webhook] Could not resolve conversationId for contactId:', contactId);
      return NextResponse.json({ received: true });
    }

    // Queue for SSE stream
    const existing = pendingReplies.get(conversationId) || [];
    existing.push({ body, timestamp: Date.now() });
    pendingReplies.set(conversationId, existing);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[GHL Webhook] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GHL sends a GET to verify the endpoint on first save
export async function GET() {
  return NextResponse.json({ status: 'RecXchange webhook active' });
}
