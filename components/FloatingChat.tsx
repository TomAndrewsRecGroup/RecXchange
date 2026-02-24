"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Persona = 'recruiter' | 'hiring-manager';
type Stage = 'persona' | 'capture' | 'chat';

type Message = {
  id: string;
  from: 'visitor' | 'team';
  body: string;
  timestamp: Date;
};

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('persona');
  const [persona, setPersona] = useState<Persona | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [captureError, setCaptureError] = useState('');

  const [contactId, setContactId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && stage === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, stage]);

  useEffect(() => {
    if (!conversationId) return;
    if (sseRef.current) sseRef.current.close();
    const sse = new EventSource(`/api/ghl/stream?conversationId=${conversationId}`);
    sseRef.current = sse;
    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.body) {
          setMessages(prev => [
            ...prev,
            { id: `team-${Date.now()}-${Math.random()}`, from: 'team', body: data.body, timestamp: new Date() },
          ]);
        }
      } catch { /* ignore */ }
    };
    return () => sse.close();
  }, [conversationId]);

  const handlePersonaSelect = (p: Persona) => {
    setPersona(p);
    setStage('capture');
  };

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName.trim()) return setCaptureError('Please enter your first name.');
    if (!lastName.trim()) return setCaptureError('Please enter your last name.');
    if (!email.trim() || !emailRegex.test(email)) return setCaptureError('Please enter a valid email.');
    if (persona === 'hiring-manager' && !companyName.trim()) return setCaptureError('Please enter your company name.');
    setCaptureError('');
    const greeting =
      persona === 'hiring-manager'
        ? `Hi ${firstName}! Welcome to RecXchange. Our team will be with you shortly. What can we help with today?`
        : `Hi ${firstName}! Welcome to RecXchange. Great to have a recruiter on board. What are you looking for today?`;
    setMessages([{ id: 'welcome', from: 'team', body: greeting, timestamp: new Date() }]);
    setStage('chat');
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    setMessages(prev => [
      ...prev,
      { id: `v-${Date.now()}`, from: 'visitor', body: trimmed, timestamp: new Date() },
    ]);
    setInputValue('');
    setIsSending(true);
    try {
      const res = await fetch('/api/ghl/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          message: trimmed,
          persona,
          companyName: persona === 'hiring-manager' ? companyName : undefined,
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
        { id: `err-${Date.now()}`, from: 'team', body: 'Sorry, there was an issue. Please try again.', timestamp: new Date() },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const resetChat = () => {
    setStage('persona');
    setPersona(null);
    setFirstName(''); setLastName(''); setEmail(''); setCompanyName('');
    setContactId(null); setConversationId(null);
    setMessages([]);
    setInputValue('');
    if (sseRef.current) { sseRef.current.close(); sseRef.current = null; }
  };

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
            style={{ height: stage === 'persona' ? 'auto' : '520px' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-400/10 bg-gradient-to-r from-cyan-400/5 to-fuchsia-400/5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center p-0.5">
                    <img
                      src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
                      alt="RecXchange"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#050508]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">RecXchange Team</p>
                  <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Online Now</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stage === 'chat' && (
                  <button onClick={resetChat} className="text-[9px] text-gray-600 hover:text-gray-400 uppercase tracking-widest font-bold transition-colors">
                    New Chat
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Stage: Persona */}
            {stage === 'persona' && (
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-white text-sm font-bold mb-1">How can we help?</p>
                  <p className="text-gray-500 text-xs">Tell us who you are so we can route you correctly.</p>
                </div>
                <button
                  onClick={() => handlePersonaSelect('recruiter')}
                  className="group w-full p-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all text-left flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white mb-0.5">I&apos;m a Recruiter</p>
                    <p className="text-[10px] text-gray-500">I have candidates or need roles to fill</p>
                  </div>
                  <ChevronRight size={14} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handlePersonaSelect('hiring-manager')}
                  className="group w-full p-4 rounded-2xl border border-fuchsia-400/15 bg-fuchsia-400/5 hover:bg-fuchsia-400/10 hover:border-fuchsia-400/30 transition-all text-left flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white mb-0.5">I&apos;m a Hiring Manager</p>
                    <p className="text-[10px] text-gray-500">I&apos;m looking to hire for my company</p>
                  </div>
                  <ChevronRight size={14} className="text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[9px] text-gray-600 text-center">Typically replies within a few minutes.</p>
              </div>
            )}

            {/* Stage: Capture */}
            {stage === 'capture' && (
              <form onSubmit={handleCaptureSubmit} className="flex-grow flex flex-col justify-center p-6 gap-4">
                <div>
                  <p className="text-white text-sm font-bold mb-1">
                    {persona === 'hiring-manager' ? 'Hiring Manager Details' : 'Your Details'}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {persona === 'hiring-manager'
                      ? "We'll add you to our Clients directory so our team can follow up."
                      : "We'll add you to our Recruiter network for follow-up."}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text" placeholder="First name" value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                    />
                    <input
                      type="text" placeholder="Last name" value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder={persona === 'hiring-manager' ? 'Business email' : 'Email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                  />
                  {persona === 'hiring-manager' && (
                    <input
                      type="text" placeholder="Company name" value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-fuchsia-400/40 transition-colors"
                    />
                  )}
                </div>
                {captureError && (
                  <p className="text-[10px] text-red-400 font-bold">{captureError}</p>
                )}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all ${
                    persona === 'hiring-manager'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]'
                      : 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                  }`}
                >
                  Start Chatting
                </button>
                <button
                  type="button"
                  onClick={() => setStage('persona')}
                  className="text-[9px] text-gray-600 hover:text-gray-400 transition-colors text-center"
                >
                  &larr; Back
                </button>
              </form>
            )}

            {/* Stage: Chat */}
            {stage === 'chat' && (
              <>
                <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col gap-1 ${msg.from === 'visitor' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.from === 'visitor'
                          ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/20 text-white rounded-br-sm'
                          : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-sm'
                      }`}>
                        {msg.body}
                      </div>
                      <span className="text-[8px] text-gray-600">
                        {msg.from === 'visitor' ? 'You' : 'RecXchange'} &middot; {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex items-start">
                      <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
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
                    {isSending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
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
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050508] animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
