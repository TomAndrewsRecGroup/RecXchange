/**
 * Telegram Webhook — receives replies from team members and routes them to
 * the website chat via the SSE stream.
 *
 * Setup (run once after deploying):
 *   curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://recxchange.io/api/groq/telegram-webhook"
 *
 * Flow:
 *   1. Team member replies to a handover notification in Telegram.
 *   2. Telegram POSTs the update to this endpoint.
 *   3. We look up conversationId from the reply_to_message.message_id.
 *   4. We queue the reply in pendingReplies.
 *   5. The SSE stream (/api/groq/stream) delivers it to the visitor's chat.
 */

import { NextRequest, NextResponse } from 'next/server';
import { telegramMessageToConversation } from '@/lib/groq/telegram';
import { pendingReplies } from '../webhook/route';

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
    const replyToMsgId: number | undefined = message.reply_to_message?.message_id;
    if (!replyToMsgId) {
      console.log('[Telegram Webhook] Ignoring non-reply message from', message.from?.username ?? 'unknown');
      return NextResponse.json({ ok: true });
    }

    // Look up the GHL conversation this reply belongs to
    const conversationId = telegramMessageToConversation.get(replyToMsgId);
    if (!conversationId) {
      console.warn('[Telegram Webhook] No conversationId mapping for Telegram msgId:', replyToMsgId);
      return NextResponse.json({ ok: true });
    }

    const replyText: string = message.text.trim();
    console.log('[Telegram Webhook] Routing team reply to conversation:', conversationId);

    // Queue for SSE delivery to the website visitor
    const existing = pendingReplies.get(conversationId) ?? [];
    existing.push({ body: replyText, timestamp: Date.now() });
    pendingReplies.set(conversationId, existing);

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
