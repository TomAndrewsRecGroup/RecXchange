import { NextRequest } from 'next/server';
import { pendingReplies } from '../webhook/route';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return new Response('conversationId is required', { status: 400 });
  }

  // Capture timestamp at connection time - only deliver replies after this point
  const connectedAt = Date.now();

  const stream = new ReadableStream({
    start(controller) {
      const enc = (data: object) =>
        new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);

      // Confirm connection to client
      controller.enqueue(enc({ type: 'connected' }));

      const interval = setInterval(() => {
        // Heartbeat - keeps connection alive through Vercel's 30s limit
        controller.enqueue(enc({ type: 'heartbeat' }));

        const replies = pendingReplies.get(conversationId);
        if (!replies || replies.length === 0) return;

        // Only send replies that arrived AFTER this SSE connection was opened
        const newReplies = replies.filter(r => r.timestamp > connectedAt);
        if (newReplies.length === 0) return;

        newReplies.forEach(reply => {
          controller.enqueue(enc({ type: 'message', body: reply.body }));
        });

        // Prune delivered replies from store
        const remaining = replies.filter(r => r.timestamp <= connectedAt);
        if (remaining.length === 0) {
          pendingReplies.delete(conversationId);
        } else {
          pendingReplies.set(conversationId, remaining);
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
