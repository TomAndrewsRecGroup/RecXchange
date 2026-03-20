/**
 * Telegram Webhook — receives replies from team members and routes them to
 * the website visitor via Supabase.
 *
 * Setup (run once after deploying):
 *   curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://recxchange.io/api/groq/telegram-webhook"
 *
 * Flow:
 *   1. Team member replies to a handover notification in Telegram.
 *   2. Telegram POSTs the update to this endpoint.
 *   3. We extract the conversationId from the `ref:` marker embedded in the
 *      original message — no shared in-memory state needed.
 *   4. We insert a row into the Supabase `chat_replies` table.
 *   5. The SSE stream (/api/groq/stream) polls that table and delivers the
 *      reply to the visitor in real time.
 */

import { NextRequest, NextResponse } from 'next/server';
import { extractConversationIdFromText } from '@/lib/groq/telegram';

async function insertReplyToSupabase(conversationId: string, body: string): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('[Telegram Webhook] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');
    return;
  }
  try {
    const res = await fetch(`${url}/rest/v1/chat_replies`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ conversation_id: conversationId, body }),
    });
    if (res.ok) {
      console.log('[Telegram Webhook] ✓ Team reply saved to Supabase for conversation:', conversationId);
    } else {
      console.warn('[Telegram Webhook] Supabase insert failed:', res.status, await res.text());
    }
  } catch (err) {
    console.error('[Telegram Webhook] Error inserting to Supabase:', err);
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
    const conversationId = extractConversationIdFromText(replyToText);
    if (!conversationId) {
      console.warn('[Telegram Webhook] No ref: marker found in replied-to message. Snippet:', replyToText.substring(0, 100));
      return NextResponse.json({ ok: true });
    }

    const replyText: string = message.text.trim();
    console.log('[Telegram Webhook] Routing team reply to conversation:', conversationId);

    await insertReplyToSupabase(conversationId, replyText);

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
