/**
 * Telegram connectivity diagnostic endpoint.
 *
 * Sends a test message to the configured Telegram chat so you can verify
 * the bot token and chat ID are correct without needing to trigger a handover.
 *
 * Usage: GET /api/groq/telegram-test
 * Returns a JSON object describing what passed or failed.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    return NextResponse.json({ ok: false, error: 'TELEGRAM_BOT_TOKEN is not set in environment variables' }, { status: 500 });
  }
  if (!chatId) {
    return NextResponse.json({ ok: false, error: 'TELEGRAM_CHAT_ID is not set in environment variables' }, { status: 500 });
  }

  const text = `✅ RecXchange Telegram test\n\nBot token: configured ✓\nChat ID: ${chatId}\nTime: ${new Date().toUTCString()}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      return NextResponse.json({
        ok: false,
        error: 'Telegram API rejected the message',
        telegram_error: data,
        hint: data?.description?.includes('chat not found')
          ? 'The TELEGRAM_CHAT_ID is wrong. For a group/channel the ID is usually a negative number like -1001234567890'
          : data?.description?.includes('Unauthorized')
          ? 'The TELEGRAM_BOT_TOKEN is invalid. Copy it exactly from @BotFather with no spaces'
          : 'Check Telegram API error description above',
      }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: 'Test message sent to Telegram successfully',
      telegram_message_id: data.result?.message_id,
      chat_id: chatId,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: 'Network error calling Telegram API',
      detail: String(err),
    }, { status: 500 });
  }
}
