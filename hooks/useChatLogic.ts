'use client';

/**
 * useChatLogic — single source of truth for all chat behaviour.
 *
 * Both FloatingChat (widget) and the Contact page import this hook.
 * Any change to chat logic, handover, SSE, or Groq payload happens here once.
 */

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, User } from 'lucide-react';
import { pickAssistantName, type AssistantName } from '@/lib/groq/config';
// Re-use the canonical SmartLinkData from the API types so there is only one definition
import type { SmartLinkData } from '@/lib/groq/types';

// Re-export so consumers can import from one place
export type { SmartLinkData };

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isHandover?: boolean;
  smartLinks?: SmartLinkData[];
}

// ─── Page context helper ──────────────────────────────────────────────────────

/**
 * Maps a Next.js pathname to a human-readable context label.
 * This label is sent to the Groq API so the knowledge-routing logic in
 * getRelevantContext() can inject the correct knowledge block.
 */
export function getPageContext(pathname: string): string {
  const pageMap: Record<string, string> = {
    '/':                           'Homepage',
    '/home':                       'Homepage',
    '/why-recxchange':             'Why RecXchange',
    '/pricing':                    'Pricing',
    '/split-fees':                 'Collaboration',
    '/deal-protection':            'Deal Protection',
    '/roles':                      'Active Roles',
    '/blog':                       'Blog',
    '/account-management':         'Account Management',
    '/contact':                    'Contact Page',
    '/hiring-manager-live':        'Hiring Manager - Live Roles',
    '/hiring-manager-strategic':   'Hiring Manager - Strategic Roles',
  };
  return pageMap[pathname] ?? `${pathname.replace('/', '').replace(/-/g, ' ')} page`;
}

// ─── Message renderer ─────────────────────────────────────────────────────────

/**
 * Parses [smartlink:N]text[/smartlink] tokens inside a ChatMessage and
 * returns a React node with smart-link buttons inline.
 */
export function renderChatMessageContent(
  msg: ChatMessage,
  onSmartLinkClick: (url: string) => void,
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[smartlink:(\d+)\](.+?)\[\/smartlink\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(msg.content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        React.createElement('span', { key: `txt-${lastIndex}` }, msg.content.substring(lastIndex, match.index))
      );
    }
    const linkIndex = parseInt(match[1], 10);
    const linkText  = match[2];
    const linkData  = msg.smartLinks?.[linkIndex];
    if (linkData) {
      parts.push(
        React.createElement(
          'button',
          {
            key: `link-${linkIndex}`,
            onClick: () => onSmartLinkClick(linkData.url),
            className:
              'inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-lg ' +
              'bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold ' +
              'hover:shadow-lg hover:scale-105 transition-all touch-manipulation',
          },
          linkText,
          React.createElement(ExternalLink, { size: 12 }),
        )
      );
    } else {
      parts.push(React.createElement('span', { key: `fallback-${linkIndex}` }, linkText));
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < msg.content.length) {
    parts.push(React.createElement('span', { key: 'txt-end' }, msg.content.substring(lastIndex)));
  }

  if (parts.length > 0) {
    return React.createElement('div', { className: 'whitespace-pre-wrap' }, ...parts);
  }
  return msg.content;
}

/**
 * Returns the className string for a chat message bubble.
 */
export function messageBubbleClass(msg: ChatMessage): string {
  if (msg.role === 'user') {
    return 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white';
  }
  if (msg.isHandover) {
    return 'bg-green-500/20 border border-green-500/30 text-green-300';
  }
  return 'bg-white/10 text-gray-200';
}

/**
 * Returns the Live Agent header element if the message is a handover message.
 */
export function HandoverBadge(): React.ReactElement {
  return React.createElement(
    'div',
    { className: 'flex items-center gap-2 mb-2 text-xs font-semibold' },
    React.createElement(User, { size: 14 }),
    'Live Agent',
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseChatLogicReturn {
  // State
  messages:             ChatMessage[];
  inputValue:           string;
  setInputValue:        (v: string) => void;
  isLoading:            boolean;
  isRegistering:        boolean;
  hasHandedOver:        boolean;
  showUserForm:         boolean;
  userName:             string;
  setUserName:          (v: string) => void;
  userEmail:            string;
  setUserEmail:         (v: string) => void;
  userPersona:          'recruiter' | 'hiring-manager' | '';
  setUserPersona:       (v: 'recruiter' | 'hiring-manager' | '') => void;
  companyName:          string;
  setCompanyName:       (v: string) => void;
  contactId:            string | null;
  conversationId:       string | null;
  assistantName:        AssistantName;
  messagesEndRef:       React.RefObject<HTMLDivElement | null>;
  // Actions
  handleStartChat:      () => Promise<void>;
  handleSendMessage:    () => Promise<void>;
}

/**
 * Core chat hook — identical logic for both the floating widget and the
 * contact page. Pass the current Next.js pathname so the correct knowledge
 * block is injected into every Groq call.
 */
export function useChatLogic(pathname: string): UseChatLogicReturn {
  const pageContext = getPageContext(pathname);

  const [messages,          setMessages]          = useState<ChatMessage[]>([]);
  const [inputValue,        setInputValue]        = useState('');
  const [isLoading,         setIsLoading]         = useState(false);
  const [isRegistering,     setIsRegistering]     = useState(false);
  const [hasHandedOver,     setHasHandedOver]     = useState(false);
  const [showUserForm,      setShowUserForm]      = useState(true);
  const [userName,          setUserName]          = useState('');
  const [userEmail,         setUserEmail]         = useState('');
  const [userPersona,       setUserPersona]       = useState<'recruiter' | 'hiring-manager' | ''>('');
  const [companyName,       setCompanyName]       = useState('');
  const [contactId,         setContactId]         = useState<string | null>(null);
  const [conversationId,    setConversationId]    = useState<string | null>(null);
  const [handoverTelegramMsgId, setHandoverTelegramMsgId] = useState<number | null>(null);
  const [assistantName]                           = useState<AssistantName>(() => pickAssistantName());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // SSE: open a stream to receive live-agent replies after handover
  useEffect(() => {
    if (!hasHandedOver || !conversationId) return;

    const eventSource = new EventSource(`/api/groq/stream?conversationId=${conversationId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.body) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.body, isHandover: true }]);
        }
      } catch {
        // Malformed SSE frame — ignore
      }
    };

    eventSource.onerror = () => {
      // EventSource auto-reconnects; log a warning only
      console.warn('[Chat] SSE error — will retry');
    };

    return () => eventSource.close();
  }, [hasHandedOver, conversationId]);

  // ── handleStartChat ────────────────────────────────────────────────────────
  const handleStartChat = async () => {
    if (!userName || !userEmail || !userPersona) {
      alert('Please fill in all required fields');
      return;
    }
    if (userPersona === 'hiring-manager' && !companyName) {
      alert('Please enter your company name');
      return;
    }

    setIsRegistering(true);
    try {
      const res = await fetch('/api/groq/register-chat-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        userName,
          email:       userEmail,
          persona:     userPersona,
          companyName: userPersona === 'hiring-manager' ? companyName : undefined,
          pageContext,
        }),
      });
      const data = await res.json();
      if (data.contactId) setContactId(data.contactId);
    } catch (err) {
      // Non-fatal — user still enters chat
      console.error('[Chat] Failed to register chat user:', err);
    } finally {
      setIsRegistering(false);
    }

    setShowUserForm(false);
    const firstName = userName.split(' ')[0];
    setMessages([{
      role: 'assistant',
      content: `Hi ${firstName}! I'm ${assistantName} from RecXchange. How can I help you today?`,
    }]);
  };

  // ── handleSendMessage ──────────────────────────────────────────────────────
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Post-handover path: forward to Telegram thread, skip Groq AI
      if (hasHandedOver) {
        const payload: Record<string, unknown> = {
          message:      userMessage,
          pageContext,
          name:         userName,
          email:        userEmail,
          persona:      userPersona,
          assistantName,
          isHandover:   true,
          contactId,
          conversationId,
        };
        if (handoverTelegramMsgId) payload.telegramHandoverMessageId = handoverTelegramMsgId;
        if (userPersona === 'hiring-manager') payload.companyName = companyName;

        await fetch('/api/groq/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        // No AI response shown — team reply arrives via SSE
        return;
      }

      // Normal Groq AI path
      const payload: Record<string, unknown> = {
        message:      userMessage,
        pageContext,
        assistantName,
        name:         userName,
        email:        userEmail,
        persona:      userPersona,
      };
      if (userPersona === 'hiring-manager') payload.companyName = companyName;
      if (contactId) {
        payload.contactId      = contactId;
        payload.conversationId = conversationId;
      }

      const response = await fetch('/api/groq/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const reason = errorBody?.message || errorBody?.error || `HTTP ${response.status}`;
        console.error('[Chat] API error:', response.status, errorBody);
        throw new Error(reason);
      }

      const data = await response.json();
      if (data.contactId)      setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);

      if (data.handover) {
        setHasHandedOver(true);
        if (data.telegramHandoverMessageId) setHandoverTelegramMsgId(data.telegramHandoverMessageId);
        setMessages(prev => [...prev, {
          role:       'assistant',
          content:    data.message,
          isHandover: true,
          smartLinks: data.smartLinks,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role:       'assistant',
          content:    data.message,
          smartLinks: data.smartLinks,
        }]);
      }
    } catch (error) {
      console.error('[Chat] handleSendMessage error:', error);
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: 'Sorry, I ran into an issue. Please try again or email support@recxchange.io',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages, inputValue, setInputValue, isLoading, isRegistering,
    hasHandedOver, showUserForm, userName, setUserName, userEmail, setUserEmail,
    userPersona, setUserPersona, companyName, setCompanyName,
    contactId, conversationId, assistantName, messagesEndRef,
    handleStartChat, handleSendMessage,
  };
}
