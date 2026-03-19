/**
 * Telegram Bot notifications for Groq AI chat handovers.
 *
 * Outbound: sends structured handover notifications to the Telegram chat.
 * Inbound: the telegram-webhook route receives replies from the team and
 *          routes them to the SSE stream so they appear in the website chat.
 *
 * Environment variables required:
 *   TELEGRAM_BOT_TOKEN — bot token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat/channel ID the bot posts into
 *
 * To enable two-way Telegram replies, register the webhook once:
 *   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://recxchange.io/api/groq/telegram-webhook"
 */

import type { ConversationMessage } from './types';

const TELEGRAM_API = 'https://api.telegram.org';

/**
 * Maps Telegram message_id → GHL conversationId.
 * Used by the telegram-webhook route to route team replies to the correct SSE stream.
 * All messages we send (handover + follow-ups) are stored here so the team can
 * reply to any message in the thread and it routes to the right conversation.
 */
export const telegramMessageToConversation = new Map<number, string>();

export interface HandoverContext {
  name?: string;
  email?: string;
  persona?: 'recruiter' | 'hiring-manager';
  companyName?: string;
  pageContext?: string;
  /** The message that triggered the handover */
  userMessage: string;
  /** The AI's handover response (already sanitized) */
  aiResponse: string;
  /** Recent conversation history from GHL — may be empty on first message */
  history?: ConversationMessage[];
  /** GHL conversationId — stored against the Telegram message_id for reply routing */
  conversationId?: string;
}

/**
 * Sends a handover notification to the configured Telegram chat.
 * Returns the Telegram message_id so follow-up messages can be threaded against it.
 * Always non-fatal — logs errors but never throws.
 */
export async function sendTelegramHandover(ctx: HandoverContext): Promise<number | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured — skipping handover notification');
    return null;
  }

  const personaLabel = ctx.persona === 'hiring-manager' ? 'Hiring Manager' : 'Recruiter';
  const now = new Date().toUTCString();

  // Build a readable snippet from GHL history (last 6 turns)
  let historySnippet = '';
  if (ctx.history && ctx.history.length > 0) {
    const relevant = ctx.history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-6);
    if (relevant.length > 0) {
      const lines = relevant.map(m => {
        const prefix = m.role === 'user' ? '👤' : '🤖';
        const text = m.content.length > 250 ? m.content.substring(0, 250) + '…' : m.content;
        return `${prefix} ${escapeHtml(text)}`;
      }).join('\n');
      historySnippet = `\n\n<b>📜 Conversation so far:</b>\n${lines}`;
    }
  }

  const parts: string[] = [
    '🔔 <b>Chat Handover — RecXchange</b>',
    '',
    `👤 <b>Name:</b> ${escapeHtml(ctx.name || 'Not provided')}`,
    `📧 <b>Email:</b> ${escapeHtml(ctx.email || 'Not provided')}`,
    `🎯 <b>Type:</b> ${personaLabel}`,
  ];

  if (ctx.persona === 'hiring-manager' && ctx.companyName) {
    parts.push(`🏢 <b>Company:</b> ${escapeHtml(ctx.companyName)}`);
  }

  parts.push(
    `📍 <b>Page:</b> ${escapeHtml(ctx.pageContext || 'Unknown')}`,
    `🕐 <b>Time:</b> ${now}`,
    '',
    `💬 <b>Last user message:</b>`,
    escapeHtml(ctx.userMessage.substring(0, 500)),
    '',
    `🤖 <b>AI response sent:</b>`,
    escapeHtml(ctx.aiResponse.substring(0, 500)),
  );

  if (historySnippet) {
    parts.push(historySnippet);
  }

  parts.push('', '↩️ <i>Reply to this message to respond directly in the website chat.</i>');

  const text = parts.join('\n');

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      console.error('[Telegram] Failed to send handover notification:', res.status, err);
      return null;
    }

    const result = await res.json();
    const messageId: number | undefined = result?.result?.message_id;

    if (messageId && ctx.conversationId) {
      telegramMessageToConversation.set(messageId, ctx.conversationId);
      console.log('[Telegram] ✓ Handover sent. Stored mapping: Telegram msgId', messageId, '→ conversationId', ctx.conversationId);
    } else {
      console.log('[Telegram] ✓ Handover notification sent to chat', chatId);
    }

    return messageId ?? null;
  } catch (err) {
    console.error('[Telegram] Error sending handover notification:', err);
    return null;
  }
}

/**
 * Forwards a post-handover user message to Telegram as a reply to the original
 * handover notification so the team sees it in the same thread.
 * Also stores the new message_id → conversationId mapping so team replies
 * to follow-up messages are also routed correctly.
 */
export async function forwardUserMessageToTelegram(
  conversationId: string,
  userName: string,
  userMessage: string,
  replyToMessageId: number,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text = `💬 <b>${escapeHtml(userName)}:</b>\n${escapeHtml(userMessage.substring(0, 1000))}`;

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_to_message_id: replyToMessageId,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      const msgId: number | undefined = result?.result?.message_id;
      if (msgId) {
        // Map this reply too so team can reply to any message in the thread
        telegramMessageToConversation.set(msgId, conversationId);
      }
      console.log('[Telegram] ✓ Forwarded user message to thread');
    } else {
      console.warn('[Telegram] Failed to forward user message:', res.status);
    }
  } catch (err) {
    console.error('[Telegram] Error forwarding user message:', err);
  }
}

/** Escape special HTML characters for Telegram HTML parse mode */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
