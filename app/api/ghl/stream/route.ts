import { NextRequest } from 'next/server';
import { pendingReplies } from '../webhook/route';

// Required for streaming responses on Vercel
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return new Response('conversationId is required', { status: 400 });
  }

  // Track the last timestamp we sent so we don't re-send old messages
  let lastSentAt = Date.now();

  const stream = new ReadableStream({
    start(controller) {
      // Send an initial heartbeat so the connection is confirmed open
      controller.enqueue(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

      const interval = setInterval(() => {
        const replies = pendingReplies.get(conversationId) || [];
        const newReplies = replies.filter(r => r.timestamp > lastSentAt);

        if (newReplies.length > 0) {
          newReplies.forEach(reply => {
            controller.enqueue(
              `data: ${JSON.stringify({ type: 'message', body: reply.body })}\n\n`
            );
          });
          lastSentAt = Date.now();

          // Clean up sent messages from store
          const remaining = replies.filter(r => r.timestamp <= lastSentAt);
          if (remaining.length === 0) {
            pendingReplies.delete(conversationId);
          } else {
            pendingReplies.set(conversationId, remaining);
          }
        }

        // Heartbeat every 25s to keep connection alive through Vercel's 30s timeout
        controller.enqueue(`data: ${JSON.stringify({ type: 'heartbeat' })}\n\n`);
      }, 3000); // Poll every 3 seconds

      // Clean up interval when client disconnects
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
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
