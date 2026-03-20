import { NextRequest, NextResponse } from 'next/server';
import { forwardUserMessageToTelegram } from '@/lib/groq/telegram';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY  = process.env.GHL_API_KEY!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

/**
 * POST /api/groq/ai-chat
 *
 * Live chat message relay — no AI involved.
 * Logs the visitor's message to GHL (inbound) and forwards it to Telegram
 * as a threaded reply under the original session notification.
 * The SSE stream (/api/groq/stream) polls GHL for team replies and delivers
 * them to the visitor in real time.
 */
export async function POST(req: NextRequest) {
  try {
    const { message, name, conversationId, telegramMsgId } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    // Log visitor message to GHL as inbound
    if (conversationId) {
      try {
        await fetch(`${GHL_BASE}/conversations/messages/inbound`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({ type: 'Live_Chat', conversationId, message: message.trim() }),
        });
      } catch (err) {
        console.warn('[Chat Relay] GHL inbound log failed (non-fatal):', err);
      }
    }

    // Forward to Telegram thread
    if (telegramMsgId && typeof telegramMsgId === 'number' && conversationId) {
      await forwardUserMessageToTelegram(conversationId, name || 'Visitor', message.trim(), telegramMsgId);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[Chat Relay] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
