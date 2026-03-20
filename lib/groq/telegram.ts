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
 * Extracts the GHL conversationId embedded in a Telegram message body.
 * Every message we send includes a line: ref:CONVERSATION_ID
 * The telegram-webhook calls this instead of relying on an in-memory Map
 * so it works correctly on serverless (Vercel) where each request may run
 * in a different function instance.
 */
export function extractConversationIdFromText(text: string): string | null {
  const match = text.match(/ref:([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

export interface TelegramVisitorContext {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  persona?: 'recruiter' | 'hiring-manager';
  companyName?: string;
  pageContext?: string;
  conversationId?: string;
}

function stripTelegramHtml(input: string): string {
  // Telegram webhook "text" is usually already plain, but if we ever parse our own
  // outbound HTML string, strip tags to make regex matching stable.
  return input.replace(/<[^>]*>/g, '');
}

function extractLabeledLineValue(text: string, label: string): string | undefined {
  // Matches lines like:
  //   "👤 Name: John Doe"
  //   "Email: jane@acme.com"
  // and tolerates an emoji/icon prefix.
  const re = new RegExp(`^\\s*[^\\w\\n]*\\s*${label}\\s*:\\s*(.+?)\\s*$`, 'im');
  const match = text.match(re);
  const value = match?.[1]?.trim();
  if (!value || /^not provided$/i.test(value)) return undefined;
  return value;
}

/**
 * Extracts visitor/contact metadata embedded in the Telegram handover message text.
 * Intended for use by command shortcuts (e.g., /commands) where the team replies
 * to the original handover notification.
 */
export function extractVisitorFromText(text: string): TelegramVisitorContext | null {
  if (!text?.trim()) return null;

  const normalized = stripTelegramHtml(text).replace(/\r\n/g, '\n');

  const name = extractLabeledLineValue(normalized, 'Name');
  const email = extractLabeledLineValue(normalized, 'Email');
  const type = extractLabeledLineValue(normalized, 'Type');
  const companyName = extractLabeledLineValue(normalized, 'Company');
  const pageContext = extractLabeledLineValue(normalized, 'Page');

  let firstName: string | undefined;
  let lastName: string | undefined;
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length > 0) {
      firstName = parts[0];
      lastName = parts.slice(1).join(' ') || undefined;
    }
  }

  let persona: TelegramVisitorContext['persona'];
  if (type) {
    if (/hiring\s*manager/i.test(type)) persona = 'hiring-manager';
    else if (/recruiter/i.test(type)) persona = 'recruiter';
  }

  const conversationId = extractConversationIdFromText(normalized) ?? undefined;

  return {
    name,
    firstName,
    lastName,
    email,
    persona,
    companyName,
    pageContext,
    conversationId,
  };
}

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
    // Embed conversationId early so the telegram-webhook can extract it
    // regardless of how long the message is. Format: ref:CONVERSATION_ID
    ctx.conversationId ? `🔗 ref:${ctx.conversationId}` : '',
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

    console.log('[Telegram] ✓ Handover sent. Telegram msgId:', messageId, '| conversationId:', ctx.conversationId ?? 'none');

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

  const text = `💬 <b>${escapeHtml(userName)}:</b>\n${escapeHtml(userMessage.substring(0, 900))}\n🔗 ref:${conversationId}`;

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
