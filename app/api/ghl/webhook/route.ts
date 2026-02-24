import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Shared in-memory reply store.
// Keyed by conversationId so multiple simultaneous chat sessions are isolated.
// Each entry tracks the contactId that belongs to the VISITOR so we can filter
// out echo messages (GHL "Customer Replied" fires for ALL messages including
// the visitor's own inbound messages which we already display client-side).
// ─────────────────────────────────────────────────────────────────────────────
export interface PendingReply {
  body: string;
  timestamp: number;
}

// visitorContactIds: tracks which contactIds are website visitors (not team)
export const visitorContactIds = new Set<string>();

// pendingReplies: keyed by conversationId
export const pendingReplies: Map<string, PendingReply[]> = new Map();

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const {
      conversationId,
      body,
      contactId,
      direction,
      messageType,
      type,
    } = payload;

    if (!conversationId || !body) {
      return NextResponse.json({ received: true });
    }

    // Filter out visitor echo:
    // If the message came FROM the visitor (direction=inbound, or contactId is
    // a known visitor, or type is inbound) — skip it.
    const isInbound =
      direction === 'inbound' ||
      type === 'inbound' ||
      messageType === 'TYPE_LIVE_CHAT' ||
      visitorContactIds.has(contactId);

    if (isInbound) {
      return NextResponse.json({ received: true });
    }

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

// Allow GHL to register this endpoint (some GHL versions send a GET to verify)
export async function GET() {
  return NextResponse.json({ status: 'RecXchange webhook active' });
}
