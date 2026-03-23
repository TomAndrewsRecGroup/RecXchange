import { NextRequest, NextResponse } from 'next/server';
import { forwardUserMessageToTelegram } from '@/lib/groq/telegram';
import { checkRateLimit, getClientIP, sanitizeInput } from '@/lib/security';

const MAX_MESSAGE_LENGTH = 2000;

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
  // Rate-limit per IP — prevent message flooding / Telegram spam
  const ip = getClientIP(req);
  const rl = checkRateLimit(ip, 'form'); // 5 msgs/min per IP
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many messages. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.resetIn / 1000)) } }
    );
  }

  try {
    const { message, name, conversationId, telegramMsgId } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    // Enforce message length cap and sanitize before forwarding
    const safeMessage = sanitizeInput(message.trim(), MAX_MESSAGE_LENGTH);
    const safeName = sanitizeInput((name || 'Visitor').trim(), 120);

    // Forward to Telegram thread only — visitor messages are not logged to GHL
    if (telegramMsgId && typeof telegramMsgId === 'number' && conversationId) {
      await forwardUserMessageToTelegram(conversationId, safeName, safeMessage, telegramMsgId);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[Chat Relay] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
