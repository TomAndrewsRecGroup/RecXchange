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
import { extractConversationIdFromText, extractVisitorFromText } from '@/lib/groq/telegram';

const TELEGRAM_API = 'https://api.telegram.org';
const RECX_CTA_PREFIX = '__RECX_CTA__:';

function parseTelegramCommand(text: string): { command: string; rest: string } | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith('/')) return null;
  const [firstToken, ...restParts] = trimmed.split(/\s+/);
  const command = (firstToken ?? '').slice(1).split('@')[0] ?? '';
  if (!command) return null;
  // Normalize so Telegram shortcuts can be typed as "/send3roles" or "/send-3-roles".
  return { command: command.toLowerCase().replace(/-/g, ''), rest: restParts.join(' ').trim() };
}

function buildCtaBody(kind: 'send3roles' | 'learnaboutrecxdirect' | 'howitworks'): string {
  return `${RECX_CTA_PREFIX}${JSON.stringify({ kind })}`;
}

async function replyInTelegramThread(chatId: number, replyToMessageId: number, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_to_message_id: replyToMessageId,
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error('[Telegram Webhook] Error replying in Telegram thread:', err);
  }
}

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

    const inboundText = String(message.text ?? '').trim();
    const chatId: number | undefined = message.chat?.id;
    const replyToMessageId: number | undefined = message.reply_to_message?.message_id;

    const parsed = inboundText ? parseTelegramCommand(inboundText) : null;
    if (parsed && typeof chatId === 'number' && typeof replyToMessageId === 'number') {
      // Phase 2/3: command shortcuts should respond in Telegram (do not route to visitor).
      if (parsed.command === 'commands') {
        const help = [
          'RecXchange shortcuts (Telegram)',
          '',
          'Reply to a handover message (contains "ref:..."), then send:',
          '',
          '/commands',
          '/send3roles (recruiter: opens the "Send me 3 matching roles" form)',
          '/learnaboutrecxdirect (recruiter: opens the RecX Direct explainer form)',
          '/howitworks (hiring manager: opens the "How it works" form)',
        ].join('\n');

        await replyInTelegramThread(chatId, replyToMessageId, help);
        return NextResponse.json({ ok: true });
      }

      // Commands must be run by replying to a RecXchange handover message (must contain ref:...)
      const conversationId = extractConversationIdFromText(replyToText);
      if (!conversationId) {
        await replyInTelegramThread(chatId, replyToMessageId, 'Please reply to a RecXchange handover message (the one containing "ref:...") to run commands.');
        return NextResponse.json({ ok: true });
      }

      const visitor = extractVisitorFromText(replyToText);

      if (parsed.command === 'send3roles') {
        if (visitor?.persona && visitor.persona !== 'recruiter') {
          await replyInTelegramThread(chatId, replyToMessageId, 'This visitor is marked as a Hiring Manager. Use /howitworks instead.');
          return NextResponse.json({ ok: true });
        }

        await insertReplyToSupabase(conversationId, buildCtaBody('send3roles'));
        await replyInTelegramThread(chatId, replyToMessageId, '✓ Sent the visitor a "Get 3 matching roles" button in the website chat.');
        return NextResponse.json({ ok: true });
      }

      if (parsed.command === 'learnaboutrecxdirect') {
        if (visitor?.persona && visitor.persona !== 'recruiter') {
          await replyInTelegramThread(chatId, replyToMessageId, 'This visitor is marked as a Hiring Manager. Use /howitworks instead.');
          return NextResponse.json({ ok: true });
        }

        await insertReplyToSupabase(conversationId, buildCtaBody('learnaboutrecxdirect'));
        await replyInTelegramThread(chatId, replyToMessageId, '✓ Sent the visitor a "Learn about RecX Direct" button in the website chat.');
        return NextResponse.json({ ok: true });
      }

      if (parsed.command === 'howitworks') {
        if (visitor?.persona && visitor.persona !== 'hiring-manager') {
          await replyInTelegramThread(chatId, replyToMessageId, 'This visitor is marked as a Recruiter. Use /send3roles or /learnaboutrecxdirect instead.');
          return NextResponse.json({ ok: true });
        }

        await insertReplyToSupabase(conversationId, buildCtaBody('howitworks'));
        await replyInTelegramThread(chatId, replyToMessageId, '✓ Sent the visitor a "How RecXchange works" button in the website chat.');
        return NextResponse.json({ ok: true });
      }

      await replyInTelegramThread(chatId, replyToMessageId, 'Unknown command. Send /commands to see available shortcuts.');
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
