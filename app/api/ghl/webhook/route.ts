import { NextRequest, NextResponse } from 'next/server';
import { requireGHLWebhookSecret } from '@/lib/security';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

// ─────────────────────────────────────────────────────────────────────────
// Shared in-memory stores
// ─────────────────────────────────────────────────────────────────────────
export interface PendingReply {
  body: string;
  timestamp: number;
}

// Team replies waiting to be delivered to website visitors
export const pendingReplies: Map<string, PendingReply[]> = new Map();

// Contact IDs that belong to website visitors (not team members)
// Used to filter out echo messages from "Customer Replied" trigger
export const visitorContactIds = new Set<string>();

// ─── Resolve conversationId from contactId ───────────────────────────────────────
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
  const authError = requireGHLWebhookSecret(req);
  if (authError) return authError;

  try {
    const payload = await req.json();
    console.log('[GHL Webhook] Received payload:', JSON.stringify(payload));
    
    const { contactId, body, direction } = payload;
    let { conversationId } = payload;

    if (!body) return NextResponse.json({ received: true });

    // ─── Filter out visitor echoes ──────────────────────────────────────────────────
    // If this contactId is a known website visitor, ignore the message
    // (it's their own message being echoed back by GHL's "Customer Replied" trigger)
    if (contactId && visitorContactIds.has(contactId)) {
      console.log('[GHL Webhook] Ignoring visitor echo for contactId:', contactId);
      return NextResponse.json({ received: true });
    }

    // If direction is explicitly inbound, also skip
    if (direction && direction !== 'outbound') {
      console.log('[GHL Webhook] Ignoring non-outbound message, direction:', direction);
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

    console.log('[GHL Webhook] Queueing team reply for conversation:', conversationId);

    // Queue the team reply for the SSE stream
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
