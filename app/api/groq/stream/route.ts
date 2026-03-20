import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const GHL_BASE = 'https://services.leadconnectorhq.com';

/**
 * Polls GHL for outbound messages on a conversation that were added after `since`.
 * After handover, the only new outbound messages are team replies (Groq has stopped).
 * Returns messages sorted oldest-first so they are delivered in order.
 */
async function fetchOutboundMessagesSince(
  conversationId: string,
  since: number,
): Promise<Array<{ body: string; timestamp: number }>> {
  const API_KEY = process.env.GHL_API_KEY;
  if (!API_KEY) return [];

  try {
    const res = await fetch(
      `${GHL_BASE}/conversations/${conversationId}/messages?limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
      },
    );
    if (!res.ok) return [];

    const data = await res.json();
    const messages: any[] = data.messages?.messages ?? [];

    return messages
      .filter((msg: any) => {
        const ts = new Date(msg.dateAdded ?? 0).getTime();
        return msg.direction === 'outbound' && ts > since && msg.body?.trim();
      })
      .map((msg: any) => ({
        body: msg.body.trim(),
        timestamp: new Date(msg.dateAdded ?? 0).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return new Response('conversationId is required', { status: 400 });
  }

  // Only deliver replies that arrive after this connection was opened
  let lastDeliveredAt = Date.now();

  const stream = new ReadableStream({
    start(controller) {
      const enc = (data: object) =>
        new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);

      // Confirm connection to client
      controller.enqueue(enc({ type: 'connected' }));

      const interval = setInterval(async () => {
        // Heartbeat — keeps connection alive through Vercel's timeout
        controller.enqueue(enc({ type: 'heartbeat' }));

        // Poll GHL for new outbound (team) messages since the last delivery.
        // This is serverless-safe — no shared in-memory state needed.
        const newMessages = await fetchOutboundMessagesSince(conversationId, lastDeliveredAt);

        for (const msg of newMessages) {
          controller.enqueue(enc({ type: 'message', body: msg.body }));
          if (msg.timestamp > lastDeliveredAt) {
            lastDeliveredAt = msg.timestamp;
          }
        }
      }, 2000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
