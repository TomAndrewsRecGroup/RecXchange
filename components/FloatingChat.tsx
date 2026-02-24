"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  from: 'visitor' | 'team';
  body: string;
  timestamp: Date;
};

type ChatStage = 'capture' | 'chat';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<ChatStage>('capture');

  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Session state (persisted after first message)
  const [contactId, setContactId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [captureError, setCaptureError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sseRef = useRef<EventSource | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && stage === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, stage]);

  // ─── SSE: Connect to reply stream once we have a conversationId ─────────────────────
  useEffect(() => {
    if (!conversationId) return;

    // Close any existing stream
    if (sseRef.current) sseRef.current.close();

    const sse = new EventSource(`/api/ghl/stream?conversationId=${conversationId}`);
    sseRef.current = sse;

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.body) {
          setMessages(prev => [
            ...prev,
            {
              id: `team-${Date.now()}`,
              from: 'team',
              body: data.body,
              timestamp: new Date(),
            },
          ]);
        }
      } catch {
        // ignore parse errors
      }
    };

    sse.onerror = () => {
      // SSE will auto-reconnect; no action needed
    };

    return () => sse.close();
  }, [conversationId]);

  // ─── Handle capture form submit ─────────────────────────────────────────────────
  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setCaptureError('Please enter your name and email to start chatting.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setCaptureError('Please enter a valid email address.');
      return;
    }
    setCaptureError('');
    setMessages([
      {
        id: 'welcome',
        from: 'team',
        body: `Hi ${name.split(' ')[0]}! 👋 Welcome to RecXchange. Our team will be with you shortly. What can we help you with today?`,
        timestamp: new Date(),
      },
    ]);
    setStage('chat');
  };

  // ─── Handle sending a message ─────────────────────────────────────────────────────
  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const tempId = `visitor-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      { id: tempId, from: 'visitor', body: trimmed, timestamp: new Date() },
    ]);
    setInputValue('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ghl/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: trimmed,
          contactId,
          conversationId,
        }),
      });

      const data = await res.json();

      if (data.contactId) setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          from: 'team',
          body: 'Sorry, there was an issue sending your message. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // ─── Render ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-80 glass-card rounded-[2rem] border-cyan-400/20 mb-4 flex flex-col overflow-hidden shadow-2xl bg-[#050508]/95 backdrop-blur-2xl"
            style={{ height: '520px' }}
          >

            {/* ─── Header ─────────────────────────────────────────────────── */}
            <div className="p-4 border-b border-cyan-400/10 bg-gradient-to-r from-cyan-400/5 to-fuchsia-400/5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#050508]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">RecXchange Team</p>
                  <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Online Now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* ─── Stage: Capture ──────────────────────────────────────────── */}
            {stage === 'capture' && (
              <form
                onSubmit={handleCaptureSubmit}
                className="flex-grow flex flex-col justify-center p-6 gap-4"
              >
                <div>
                  <p className="text-white text-sm font-bold mb-1">Start a conversation</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Our team typically replies within a few minutes.
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                  />
                </div>

                {captureError && (
                  <p className="text-[10px] text-red-400 font-bold">{captureError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                >
                  Start Chatting
                </button>

                <p className="text-[9px] text-gray-600 text-center">
                  By chatting you agree to our privacy policy.
                </p>
              </form>
            )}

            {/* ─── Stage: Chat ─────────────────────────────────────────────── */}
            {stage === 'chat' && (
              <>
                {/* Messages */}
                <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col gap-1 ${
                        msg.from === 'visitor' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                          msg.from === 'visitor'
                            ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/20 text-white rounded-br-sm'
                            : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-sm'
                        }`}
                      >
                        {msg.body}
                      </div>
                      <span className="text-[8px] text-gray-600">
                        {msg.from === 'visitor' ? 'You' : 'RecXchange'} · {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex items-start gap-2">
                      <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white/[0.02] border-t border-cyan-400/10 flex gap-2 items-center flex-shrink-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={isSending}
                    className="flex-grow bg-transparent outline-none text-xs text-white placeholder-gray-600 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isSending || !inputValue.trim()}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white hover:shadow-[0_0_12px_rgba(0,255,255,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    {isSending ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Send size={12} />
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Unread indicator — shown when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050508] animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
