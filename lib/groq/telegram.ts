/**
 * Telegram Bot notifications for Groq AI chat handovers.
 *
 * When the AI detects a handover intent (user requests a human, or the AI
 * signals escalation via [handover] tag) this module fires a structured
 * message to the configured Telegram chat so a human team member can
 * follow up directly with the lead.
 *
 * Environment variables required:
 *   TELEGRAM_BOT_TOKEN — bot token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat/channel ID the bot posts into
 */

import type { ConversationMessage } from './types';

const TELEGRAM_API = 'https://api.telegram.org';

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
}

/**
 * Sends a handover notification to the configured Telegram chat.
 *
 * Always non-fatal — logs errors but never throws, so the Groq response
 * is returned to the user regardless of Telegram availability.
 */
export async function sendTelegramHandover(ctx: HandoverContext): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured — skipping handover notification');
    return;
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
    } else {
      console.log('[Telegram] ✓ Handover notification sent to chat', chatId);
    }
  } catch (err) {
    console.error('[Telegram] Error sending handover notification:', err);
  }
}

/** Escape special HTML characters for Telegram HTML parse mode */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
