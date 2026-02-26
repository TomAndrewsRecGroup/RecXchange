"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, User, Building2, Phone, Loader2, MessageCircle } from 'lucide-react';

// Matching FloatingChat types
type Persona = 'recruiter' | 'hiring-manager';
type Stage = 'persona' | 'capture' | 'chat';
type Message = {
  id: string;
  from: 'visitor' | 'team';
  body: string;
  timestamp: Date;
};

export default function ContactPage() {
  // State management matching FloatingChat
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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when entering chat stage
  useEffect(() => {
    if (stage === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [stage]);

  // SSE for real-time messages (same as FloatingChat)
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

  // Handle persona selection
  const handlePersonaSelect = (p: Persona) => {
    setPersona(p);
    setStage('capture');
  };

  // Handle capture form submission (same validation as FloatingChat)
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

  // Handle sending messages (same API call as FloatingChat)
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

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative text-white" style={{
      backgroundColor: '#050508',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 255, 0.15) 0px, transparent 50%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 mb-6">Get In Touch</h3>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
            Connect with the <br />
            Engineers of Talent.
          </h1>
          <div className="pulse-underline mb-8 mx-auto" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are scaling a team in California or sourcing from London, our team provides the human oversight for our AI-driven Xchange.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Contact Info & Trust */}
          <div className="space-y-6">
            
            {/* Email Card */}
            <div className="glass-card p-8 rounded-[2.5rem] border-purple-400/10 bg-gradient-to-r from-purple-400/[0.03] to-transparent">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20 shadow-inner flex-shrink-0">
                  <Mail />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Direct Liaison</p>
                  <a href="mailto:support@recxchange.io" className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
                    support@recxchange.io
                  </a>
                  <p className="text-sm text-gray-400 mt-2">We typically respond within 2-4 hours during business hours.</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="glass-card p-8 rounded-[2.5rem] border-cyan-400/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                  <MessageCircle size={20} />
                </div>
                Why Connect With Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Recruiters:</strong> Access RecX Direct roles, collaborate on shared positions, and earn protected split fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Hiring Managers:</strong> Broadcast roles to 15,000+ specialist recruiters with zero admin overhead</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Platform Support:</strong> Technical integrations, API access, and dedicated account management</span>
                </li>
              </ul>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">15k+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Active Recruiters</p>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">270M+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Candidate Profiles</p>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">24/7</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Platform Uptime</p>
              </div>
            </div>
          </div>

          {/* Right: Chat Form (Static Always-Open Version) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-purple-500/5 blur-[100px] rounded-full" />
            <div className="relative glass-card rounded-[3.5rem] border-purple-400/10 bg-black/40 backdrop-blur-3xl overflow-hidden" style={{ minHeight: stage === 'chat' ? '600px' : 'auto' }}>
              
              {/* Chat Header */}
              <div className="p-8 pb-6 border-b border-white/5 bg-gradient-to-r from-cyan-400/5 to-fuchsia-400/5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center p-1.5">
                      <img
                        src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
                        alt="RecXchange"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">RecXchange Team</h3>
                    <p className="text-xs text-green-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Online Now
                    </p>
                  </div>
                </div>
              </div>

              {/* Stage: Persona Selection */}
              {stage === 'persona' && (
                <div className="p-10 space-y-6">
                  <div>
                    <p className="text-white text-base font-bold mb-2">How can we help?</p>
                    <p className="text-gray-400 text-sm">Tell us who you are so we can route you correctly.</p>
                  </div>
                  
                  <button
                    onClick={() => handlePersonaSelect('recruiter')}
                    className="w-full p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-white mb-1">I'm a Recruiter</p>
                        <p className="text-xs text-gray-500">I have candidates or need roles to fill</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:translate-x-1 transition-transform text-lg">
                        →
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePersonaSelect('hiring-manager')}
                    className="w-full p-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 hover:bg-fuchsia-400/10 hover:border-fuchsia-400/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-white mb-1">I'm a Hiring Manager</p>
                        <p className="text-xs text-gray-500">I'm looking to hire for my company</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-400/10 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-400 group-hover:translate-x-1 transition-transform text-lg">
                        →
                      </div>
                    </div>
                  </button>

                  <p className="text-xs text-gray-600 text-center pt-4">Typically replies within a few minutes.</p>
                </div>
              )}

              {/* Stage: Capture Details */}
              {stage === 'capture' && (
                <form onSubmit={handleCaptureSubmit} className="p-10 space-y-6">
                  <div>
                    <p className="text-white text-base font-bold mb-2">
                      {persona === 'hiring-manager' ? 'Hiring Manager Details' : 'Your Details'}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {persona === 'hiring-manager'
                        ? "We'll add you to our Clients directory so our team can follow up."
                        : "We'll add you to our Recruiter network for follow-up."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          placeholder="Smith"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        {persona === 'hiring-manager' ? 'Business Email' : 'Email'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/40 transition-colors"
                      />
                    </div>

                    {persona === 'hiring-manager' && (
                      <div>
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">Company Name</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          placeholder="Your Company Ltd"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-fuchsia-400/40 transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {captureError && (
                    <p className="text-xs text-red-400 font-bold">{captureError}</p>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-xl text-white text-sm font-bold uppercase tracking-widest transition-all ${
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
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors w-full text-center"
                  >
                    ← Back
                  </button>
                </form>
              )}

              {/* Stage: Live Chat */}
              {stage === 'chat' && (
                <div className="flex flex-col" style={{ height: '540px' }}>
                  <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex flex-col gap-1 ${msg.from === 'visitor' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.from === 'visitor'
                            ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/20 text-white rounded-br-sm'
                            : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-sm'
                        }`}>
                          {msg.body}
                        </div>
                        <span className="text-[9px] text-gray-600">
                          {msg.from === 'visitor' ? 'You' : 'RecXchange'} &middot; {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    ))}
                    {isSending && (
                      <div className="flex items-start">
                        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 bg-white/[0.02] border-t border-cyan-400/10 flex gap-3 items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      disabled={isSending}
                      className="flex-grow bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-400 transition-colors disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isSending || !inputValue.trim()}
                      className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white hover:shadow-[0_0_16px_rgba(0,255,255,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
