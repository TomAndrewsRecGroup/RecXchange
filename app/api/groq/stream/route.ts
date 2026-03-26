import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Polls the Supabase `chat_replies` table for messages sent to a conversation
 * after the SSE connection was opened.
 *
 * The telegram-webhook inserts a row here whenever the team replies in Telegram.
 * This is serverless-safe — Supabase is shared external state, unlike in-memory Maps.
 */
async function fetchRepliesSince(
  conversationId: string,
  since: string, // ISO timestamp
): Promise<Array<{ body: string; created_at: string }>> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('[Stream SSE] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/chat_replies?conversation_id=eq.${encodeURIComponent(conversationId)}&created_at=gt.${encodeURIComponent(since)}&order=created_at.asc&select=body,created_at`,
      {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
        },
      },
    );
    if (!res.ok) {
      console.warn('[Stream SSE] Supabase query failed:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error('[Stream SSE] Error fetching replies:', err);
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');
  const sinceParam = searchParams.get('since');

  if (!conversationId) {
    return new Response('conversationId is required', { status: 400 });
  }

  // Use the client-supplied `since` timestamp so reconnects after a Vercel
  // function timeout don't miss replies that arrived during the gap.
  let lastDeliveredAt = sinceParam && !isNaN(Date.parse(sinceParam))
    ? sinceParam
    : new Date().toISOString();

  const stream = new ReadableStream({
    start(controller) {
      const enc = (data: object) =>
        new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);

      controller.enqueue(enc({ type: 'connected' }));

      const interval = setInterval(async () => {
        // Heartbeat — keeps the connection alive
        controller.enqueue(enc({ type: 'heartbeat' }));

        const replies = await fetchRepliesSince(conversationId, lastDeliveredAt);

        for (const reply of replies) {
          controller.enqueue(enc({ type: 'message', body: reply.body }));
          // Advance the cursor so we don't re-deliver the same row
          if (reply.created_at > lastDeliveredAt) {
            lastDeliveredAt = reply.created_at;
          }
        }
      }, 1000);

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
