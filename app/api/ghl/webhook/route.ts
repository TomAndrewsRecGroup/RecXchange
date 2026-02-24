import { NextRequest, NextResponse } from 'next/server';

// ───────────────────────────────────────────────────────────────────────────
// In-memory message store keyed by conversationId.
// On Vercel Serverless this resets per cold start, which is fine for live chat
// (SSE client is always connected while the widget is open).
// For persistence across restarts swap this for a KV store (Vercel KV / Redis).
// ───────────────────────────────────────────────────────────────────────────
export const pendingReplies: Map<string, { body: string; timestamp: number }[]> = new Map();

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // GHL OutboundMessage webhook shape:
    // { type: 'OutboundMessage', conversationId, body, contactId, ... }
    const { type, conversationId, body, messageType } = payload;

    // Only handle outbound messages (team replies) — ignore other webhook types
    if (type !== 'OutboundMessage' && messageType !== 'TYPE_LIVE_CHAT') {
      return NextResponse.json({ received: true });
    }

    if (!conversationId || !body) {
      return NextResponse.json({ received: true });
    }

    // Store the reply so the SSE stream can pick it up
    const existing = pendingReplies.get(conversationId) || [];
    existing.push({ body, timestamp: Date.now() });
    pendingReplies.set(conversationId, existing);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[GHL Webhook] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
