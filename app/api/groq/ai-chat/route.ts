import { NextRequest, NextResponse } from 'next/server';
import { forwardUserMessageToTelegram } from '@/lib/groq/telegram';

/**
 * POST /api/groq/ai-chat
 *
 * Live chat message relay — no AI involved.
 * Forwards the visitor's message to Telegram as a threaded reply under the
 * original session notification. No GHL message logging — the GHL contact
 * and tag were already captured at the gate.
 * The SSE stream (/api/groq/stream) polls GHL for team replies and delivers
 * them to the visitor in real time.
 */
export async function POST(req: NextRequest) {
  try {
    const { message, name, conversationId, telegramMsgId } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    // Forward to Telegram thread only — visitor messages are not logged to GHL
    if (telegramMsgId && typeof telegramMsgId === 'number' && conversationId) {
      await forwardUserMessageToTelegram(conversationId, name || 'Visitor', message.trim(), telegramMsgId);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[Chat Relay] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
