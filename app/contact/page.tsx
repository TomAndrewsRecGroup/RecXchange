"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, User, Building2, Phone, Loader2, MessageCircle } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

type Persona = 'recruiter' | 'hiring-manager';
type Stage = 'persona' | 'capture' | 'chat';
type Message = {
  id: string;
  from: 'visitor' | 'team';
  body: string;
  timestamp: Date;
};

export default function ContactPage() {
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
    if (stage === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [stage]);

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
    const greeting = persona === 'hiring-manager'
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

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="GET IN TOUCH" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              <span className="text-cyan-400">Connect</span> with the <br />
              <span className="text-fuchsia-400">Engineers</span> of <span className="text-emerald-400">Talent</span>.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Whether you are scaling a team in California or sourcing from London, our team provides the human oversight for our AI-driven Xchange.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <HolographicCard color="purple" variant="content">
                <div className="flex gap-4 sm:gap-5 items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20 flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 sm:mb-2">Direct Liaison</p>
                    <a href="mailto:support@recxchange.io" className="text-base sm:text-lg md:text-xl font-medium text-white hover:text-purple-400 transition-colors break-all">
                      support@recxchange.io
                    </a>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">We typically respond within 2-4 hours during business hours.</p>
                  </div>
                </div>
              </HolographicCard>

              <HolographicCard color="cyan" variant="content">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 flex-shrink-0">
                    <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  Why Connect With Us?
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-[13px] sm:text-sm text-gray-300 flex-1"><strong className="text-white">Recruiters:</strong> Access RecX Direct roles, collaborate on shared positions, and earn protected split fees</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-fuchsia-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-[13px] sm:text-sm text-gray-300 flex-1"><strong className="text-white">Hiring Managers:</strong> Broadcast roles to 15,000+ specialist recruiters with zero admin overhead</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-[13px] sm:text-sm text-gray-300 flex-1"><strong className="text-white">Platform Support:</strong> Technical integrations, API access, and dedicated account management</span>
                  </li>
                </ul>
              </HolographicCard>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: "15k+", label: "Active Recruiters" },
                  { value: "270M+", label: "Candidate Profiles" },
                  { value: "24/7", label: "Platform Uptime" }
                ].map((stat, i) => (
                  <HolographicCard key={i} color={i === 0 ? "cyan" : i === 1 ? "fuchsia" : "emerald"} variant="stat" className="text-center">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 sm:mt-1">{stat.label}</p>
                  </HolographicCard>
                ))}
              </div>
            </div>

            {/* Right: Chat Interface */}
            <div className="relative">
              <HolographicCard color="purple" variant="content" className="overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-purple-400/20 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Chat</h3>
                    <p className="text-xs text-gray-400">Our team is standing by</p>
                  </div>
                </div>

                {stage === 'persona' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4 text-center">Welcome! How can we help?</h2>
                    <div className="space-y-3">
                      <button onClick={() => handlePersonaSelect('recruiter')} className="w-full px-5 py-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 transition-all text-left">
                        <div className="font-bold text-base">I'm a Recruiter</div>
                        <p className="text-xs text-gray-400 mt-1">Access roles, collaborate, and earn split fees</p>
                      </button>
                      <button onClick={() => handlePersonaSelect('hiring-manager')} className="w-full px-5 py-4 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-400 hover:bg-purple-500/20 transition-all text-left">
                        <div className="font-bold text-base">I'm a Hiring Manager</div>
                        <p className="text-xs text-gray-400 mt-1">Broadcast roles to 15,000+ recruiters</p>
                      </button>
                    </div>
                  </div>
                )}

                {stage === 'capture' && (
                  <form onSubmit={handleCaptureSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4">Let's get started</h2>
                    {captureError && <p className="text-red-400 text-sm">{captureError}</p>}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1.5">First Name</label>
                        <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1.5">Last Name</label>
                        <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1.5">Email</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50" />
                    </div>
                    {persona === 'hiring-manager' && (
                      <div>
                        <label className="text-xs text-gray-400 block mb-1.5">Company Name</label>
                        <input value={companyName} onChange={e => setCompanyName(e.target.value)} type="text" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50" />
                      </div>
                    )}
                    <GlowButton type="submit" variant="primary" className="w-full">Start Chat</GlowButton>
                  </form>
                )}

                {stage === 'chat' && (
                  <>
                    <div className="h-[350px] overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-400/20 scrollbar-track-transparent">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.from === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${msg.from === 'visitor' ? 'bg-purple-500/20 text-white' : 'bg-white/5 text-gray-200'}`}>
                            <p className="text-sm leading-relaxed">{msg.body}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{formatTime(msg.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." disabled={isSending} className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400/50 disabled:opacity-50" />
                      <button onClick={handleSend} disabled={isSending || !inputValue.trim()} className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                    </div>
                  </>
                )}
              </HolographicCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
