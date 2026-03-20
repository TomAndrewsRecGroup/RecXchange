'use client';

/**
 * useChatLogic — single source of truth for all live chat behaviour.
 *
 * No AI. Every visitor message goes straight to Telegram via the relay API.
 * Team replies arrive via SSE (polling GHL for new outbound messages).
 *
 * Both FloatingChat (widget) and the Contact page import this hook.
 */

import React, { useState, useEffect, useRef } from 'react';

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface ChatMessage { 
  role: 'user' | 'assistant'; 
  content: string; 
  cta?: ChatCta;
} 

export type ChatCtaKind = 'send3roles' | 'learnaboutrecxdirect' | 'howitworks';

export interface ChatCta {
  kind: ChatCtaKind;
  label: string;
}

const RECX_CTA_PREFIX = '__RECX_CTA__:';

function parseCtaFromBody(body: string): ChatCta | null {
  if (!body || typeof body !== 'string') return null;
  if (!body.startsWith(RECX_CTA_PREFIX)) return null;

  const json = body.slice(RECX_CTA_PREFIX.length).trim();
  try {
    const parsed = JSON.parse(json) as Partial<{ kind: ChatCtaKind; label: string }>;
    const kind = parsed.kind;
    if (!kind) return null;

    const label =
      parsed.label ||
      (kind === 'send3roles'
        ? 'Get 3 matching roles'
        : kind === 'learnaboutrecxdirect'
        ? 'Learn about RecX Direct'
        : 'How RecXchange works');

    return { kind, label };
  } catch {
    return null;
  }
}

// ─── Live hours check ─────────────────────────────────────────────────────────

/** Returns true if the current UTC time is within live support hours (7am–9pm GMT). */
export function isLiveHours(): boolean {
  const utcHour = new Date().getUTCHours();
  return utcHour >= 7 && utcHour < 21;
}

// ─── Page context helper ──────────────────────────────────────────────────────

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

export function renderChatMessageContent(
  msg: ChatMessage,
  opts?: { onCtaClick?: (cta: ChatCta) => void },
): React.ReactNode {
  if (msg.cta) {
    return (
      <button
        type="button"
        onClick={() => opts?.onCtaClick?.(msg.cta!)}
        className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-sm hover:shadow-lg transition-all active:scale-[0.99]"
      >
        {msg.cta.label}
      </button>
    );
  }

  return msg.content;
} 

export function messageBubbleClass(msg: ChatMessage): string {
  return msg.role === 'user'
    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
    : 'bg-white/10 text-gray-200';
}

// ─── Hook interface ───────────────────────────────────────────────────────────

export interface UseChatLogicReturn {
  messages:          ChatMessage[];
  inputValue:        string;
  setInputValue:     (v: string) => void;
  isLoading:         boolean;
  isRegistering:     boolean;
  isOffline:         boolean;
  showUserForm:      boolean;
  userName:          string;
  setUserName:       (v: string) => void;
  userEmail:         string;
  setUserEmail:      (v: string) => void;
  userPersona:       'recruiter' | 'hiring-manager' | '';
  setUserPersona:    (v: 'recruiter' | 'hiring-manager' | '') => void;
  companyName:       string;
  setCompanyName:    (v: string) => void;
  contactId:         string | null;
  conversationId:    string | null;
  messagesEndRef:    React.RefObject<HTMLDivElement | null>;
  handleStartChat:   () => Promise<void>;
  handleSendMessage: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChatLogic(pathname: string): UseChatLogicReturn {
  const pageContext = getPageContext(pathname);

  const [messages,       setMessages]       = useState<ChatMessage[]>([]);
  const [inputValue,     setInputValue]     = useState('');
  const [isLoading,      setIsLoading]      = useState(false);
  const [isRegistering,  setIsRegistering]  = useState(false);
  const [isOffline,      setIsOffline]      = useState(false);
  const [showUserForm,   setShowUserForm]   = useState(true);
  const [userName,       setUserName]       = useState('');
  const [userEmail,      setUserEmail]      = useState('');
  const [userPersona,    setUserPersona]    = useState<'recruiter' | 'hiring-manager' | ''>('');
  const [companyName,    setCompanyName]    = useState('');
  const [contactId,      setContactId]      = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [telegramMsgId,  setTelegramMsgId]  = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // SSE: subscribe to team replies as soon as a conversation exists
  useEffect(() => {
    if (!conversationId) return;

    const eventSource = new EventSource(`/api/groq/stream?conversationId=${conversationId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.body) {
          const body = String(data.body);
          const cta = parseCtaFromBody(body);
          if (cta) {
            setMessages(prev => [...prev, { role: 'assistant', content: '', cta }]);
          } else {
            setMessages(prev => [...prev, { role: 'assistant', content: body }]);
          }
        }
      } catch {
        // Malformed SSE frame — ignore
      }
    };

    eventSource.onerror = () => {
      console.warn('[Chat] SSE error — will retry');
    };

    return () => eventSource.close();
  }, [conversationId]);

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

    const live = isLiveHours();
    setIsRegistering(true);
    try {
      const res  = await fetch('/api/groq/register-chat-user', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:        userName,
          email:       userEmail,
          persona:     userPersona,
          companyName: userPersona === 'hiring-manager' ? companyName : undefined,
          pageContext,
          isLive:      live,
        }),
      });
      const data = await res.json();
      if (data.contactId)      setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);
      if (data.telegramMsgId)  setTelegramMsgId(data.telegramMsgId);
    } catch (err) {
      console.error('[Chat] Failed to register chat user:', err);
    } finally {
      setIsRegistering(false);
    }

    setShowUserForm(false);

    if (!live) {
      // Outside live hours — contact captured, show offline blocker
      setIsOffline(true);
      return;
    }

    setMessages([{
      role:    'assistant',
      content: 'A team member will be with you shortly. Please go ahead and share a brief message about your query.',
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
      await fetch('/api/groq/ai-chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          message:       userMessage,
          name:          userName,
          email:         userEmail,
          persona:       userPersona,
          companyName:   userPersona === 'hiring-manager' ? companyName : undefined,
          contactId,
          conversationId,
          telegramMsgId,
          pageContext,
        }),
      });
    } catch (err) {
      console.error('[Chat] Send failed:', err);
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: 'Sorry, your message failed to send. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages, inputValue, setInputValue, isLoading, isRegistering, isOffline,
    showUserForm, userName, setUserName, userEmail, setUserEmail,
    userPersona, setUserPersona, companyName, setCompanyName,
    contactId, conversationId, messagesEndRef,
    handleStartChat, handleSendMessage,
  };
}
