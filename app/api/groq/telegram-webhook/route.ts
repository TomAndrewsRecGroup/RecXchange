/**
 * Telegram Webhook — receives replies from team members and routes them to
 * the website chat via GHL (which the SSE stream polls).
 *
 * Setup (run once after deploying):
 *   curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://recxchange.io/api/groq/telegram-webhook"
 *
 * Flow:
 *   1. Team member replies to a handover notification in Telegram.
 *   2. Telegram POSTs the update to this endpoint.
 *   3. We extract the conversationId from the ref: marker embedded in the
 *      original message text — no shared in-memory state needed.
 *   4. We log the reply to GHL as an outbound message.
 *   5. The SSE stream (/api/groq/stream) polls GHL and delivers it to the visitor.
 */

import { NextRequest, NextResponse } from 'next/server';
import { extractConversationIdFromText } from '@/lib/groq/telegram';

const GHL_BASE = 'https://services.leadconnectorhq.com';

async function logReplyToGHL(conversationId: string, body: string): Promise<void> {
  const API_KEY = process.env.GHL_API_KEY;
  if (!API_KEY) {
    console.warn('[Telegram Webhook] GHL_API_KEY not set — cannot log reply');
    return;
  }
  try {
    const res = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({ type: 'Live_Chat', conversationId, message: body }),
    });
    if (res.ok) {
      console.log('[Telegram Webhook] ✓ Team reply logged to GHL');
    } else {
      console.warn('[Telegram Webhook] Failed to log reply to GHL:', res.status);
    }
  } catch (err) {
    console.error('[Telegram Webhook] Error logging to GHL:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update.message || update.channel_post;

    // Ignore non-text updates
    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    // Ignore messages from bots (including our own bot)
    if (message.from?.is_bot) {
      return NextResponse.json({ ok: true });
    }

    // Only handle replies — stand-alone messages have no reply context
    const replyToText: string = message.reply_to_message?.text ?? '';
    if (!replyToText) {
      console.log('[Telegram Webhook] Ignoring non-reply message from', message.from?.username ?? 'unknown');
      return NextResponse.json({ ok: true });
    }

    // Extract conversationId from the ref: marker embedded in every message we send.
    // This works across serverless instances — no shared in-memory Map needed.
    const conversationId = extractConversationIdFromText(replyToText);
    if (!conversationId) {
      console.warn('[Telegram Webhook] No ref: marker found in replied-to message. Text snippet:', replyToText.substring(0, 100));
      return NextResponse.json({ ok: true });
    }

    const replyText: string = message.text.trim();
    console.log('[Telegram Webhook] Routing team reply to conversation:', conversationId);

    // Log to GHL as an outbound message — the SSE stream polls GHL for new outbound
    // messages so this delivers the reply to the visitor without shared in-memory state.
    await logReplyToGHL(conversationId, replyText);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Telegram Webhook] Error:', err);
    // Always return 200 to Telegram to prevent retries
    return NextResponse.json({ ok: true });
  }
}

// Telegram verifies the webhook URL with a GET on first setup
export async function GET() {
  return NextResponse.json({ status: 'RecXchange Telegram webhook active' });
}
