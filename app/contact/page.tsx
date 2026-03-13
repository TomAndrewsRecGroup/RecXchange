"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Loader2, MessageCircle, MessageSquare, User, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import { pickAssistantName, type AssistantName } from '@/lib/groq/config';

interface SmartLinkData {
  action: 'send-3-roles' | 'book-meeting' | 'recx-direct-info' | 'how-it-works' | 'how-it-works-no-meeting';
  url: string;
}
interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHandover?: boolean;
  smartLinks?: SmartLinkData[];
}

const previewMessages: Message[] = [
  { role: 'assistant', content: 'Hi there! Welcome to RecXchange. How can we help you today?' },
  { role: 'user',      content: 'I\'d like to find out more about posting a role...' },
  { role: 'assistant', content: 'Great! Are you a Recruiter or a Hiring Manager?' },
  { role: 'user',      content: 'I\'m a Hiring Manager looking to fill a few positions.' },
  { role: 'assistant', content: 'Perfect. Let me pull up the right details for you right away...' },
];

// Single source-of-truth height for the chat panel across all 3 states
const CHAT_HEIGHT = 'h-[560px]';

export default function ContactPage() {
  const router = useRouter();
  const [chatOpen, setChatOpen]           = useState(false);
  const [assistantName]                   = useState<AssistantName>(() => pickAssistantName());
  const [messages, setMessages]           = useState<Message[]>([]);
  const [inputValue, setInputValue]       = useState('');
  const [isLoading, setIsLoading]         = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasHandedOver, setHasHandedOver] = useState(false);
  const [showUserForm, setShowUserForm]   = useState(true);
  const [userName, setUserName]           = useState('');
  const [userEmail, setUserEmail]         = useState('');
  const [userPersona, setUserPersona]     = useState<'recruiter' | 'hiring-manager' | ''>('');
  const [companyName, setCompanyName]     = useState('');
  const [contactId, setContactId]         = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartChat = async () => {
    if (!userName || !userEmail || !userPersona) { alert('Please fill in all required fields'); return; }
    if (userPersona === 'hiring-manager' && !companyName) { alert('Please enter your company name'); return; }
    setIsRegistering(true);
    try {
      const res = await fetch('/api/groq/register-chat-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail, persona: userPersona,
          companyName: userPersona === 'hiring-manager' ? companyName : undefined,
          pageContext: 'Contact Page' }),
      });
      const data = await res.json();
      if (data.contactId) setContactId(data.contactId);
    } catch (err) {
      console.error('[ContactPage] Failed to register chat user:', err);
    } finally {
      setIsRegistering(false);
    }
    setShowUserForm(false);
    const firstName = userName.split(' ')[0];
    const greeting = userPersona === 'hiring-manager'
      ? `Hi ${firstName}! I'm ${assistantName} from RecXchange. Our team will be with you shortly. What can we help with today?`
      : `Hi ${firstName}! I'm ${assistantName} from RecXchange. Great to have a recruiter on board. What are you looking for today?`;
    setMessages([{ role: 'assistant', content: greeting }]);
  };

  const handleSmartLinkClick = (url: string) => { router.push(url); };

  const renderMessageContent = (msg: Message) => {
    const parts: React.ReactNode[] = [];
    const smartLinkRegex = /\[smartlink:(\d+)\](.+?)\[\/smartlink\]/g;
    let lastIndex = 0; let match;
    while ((match = smartLinkRegex.exec(msg.content)) !== null) {
      if (match.index > lastIndex)
        parts.push(<span key={`text-${lastIndex}`}>{msg.content.substring(lastIndex, match.index)}</span>);
      const linkIndex = parseInt(match[1]); const linkText = match[2]; const linkData = msg.smartLinks?.[linkIndex];
      if (linkData) {
        parts.push(
          <button key={`link-${linkIndex}`} onClick={() => handleSmartLinkClick(linkData.url)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all touch-manipulation">
            {linkText} <ExternalLink size={12} />
          </button>
        );
      } else parts.push(<span key={`fallback-${linkIndex}`}>{linkText}</span>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < msg.content.length)
      parts.push(<span key="text-end">{msg.content.substring(lastIndex)}</span>);
    return parts.length > 0 ? <div className="whitespace-pre-wrap">{parts}</div> : msg.content;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || hasHandedOver) return;
    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const payload: Record<string, unknown> = { message: userMessage, history: messages, pageContext: 'Contact Page', assistantName };
      if (!contactId) {
        payload.name = userName; payload.email = userEmail; payload.persona = userPersona;
        if (userPersona === 'hiring-manager') payload.companyName = companyName;
      } else {
        payload.contactId = contactId; payload.conversationId = conversationId;
      }
      const response = await fetch('/api/groq/ai-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      if (data.contactId)     setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);
      if (data.handover) {
        setHasHandedOver(true);
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, isHandover: true, smartLinks: data.smartLinks }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, smartLinks: data.smartLinks }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again or contact support at support@recxchange.io' }]);
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* ── Two-column grid ── */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

            {/* ── Left: use flex col so stat cards can be pushed to the bottom ── */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
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
                    <span className="text-[13px] sm:text-sm text-gray-300 flex-1"><strong className="text-white">Platform Support:</strong> In-app ticketing system, Live Chat, Administration Users available and technical support available.</span>
                  </li>
                </ul>
              </HolographicCard>

              {/* mt-auto pushes stat cards to the bottom of the left column,
                  aligning their bottom edge with the bottom of the fixed-height chat panel */}
              <div className="mt-auto grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: '15k+',  label: 'Active Recruiters' },
                  { value: '270M+', label: 'Candidate Profiles' },
                  { value: '24/7',  label: 'Platform Uptime' },
                ].map((stat, i) => (
                  <HolographicCard key={i} color={i === 0 ? 'cyan' : i === 1 ? 'fuchsia' : 'emerald'} variant="stat" className="text-center">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 sm:mt-1">{stat.label}</p>
                  </HolographicCard>
                ))}
              </div>
            </div>

            {/* ── Right: fixed-height container — single source of truth for all 3 states ── */}
            <div className={`relative ${CHAT_HEIGHT}`}>
              {/* HolographicCard fills the fixed-height wrapper absolutely */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-purple-400/40"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(168,85,247,0.15), 0 0 20px rgba(168,85,247,0.05)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>

                {/* Chat header */}
                <div className="p-3.5 sm:p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-sm">
                        {chatOpen && !showUserForm ? `${assistantName} — RecXchange` : 'RecXchange Support'}
                      </h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {chatOpen && !showUserForm ? (hasHandedOver ? 'Live Agent' : 'Team Member') : 'AI Assistant'}
                      </p>
                    </div>
                    {chatOpen && (
                      <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Gate: blurred preview — fills remaining height ── */}
                {!chatOpen && (
                  <div className="absolute inset-0 top-[60px]">
                    {/* Blurred chat bubbles */}
                    <div className="h-full overflow-hidden p-4 space-y-3 select-none blur-[3px] pointer-events-none">
                      {previewMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                              : 'bg-white/10 text-gray-200'
                          }`}>{msg.content}</div>
                        </div>
                      ))}
                    </div>
                    {/* Gradient overlay + CTA */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent">
                      <div className="text-center px-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="text-white w-7 h-7" />
                        </div>
                        <p className="text-white text-sm font-semibold mb-1">Welcome to RecXchange!</p>
                        <p className="text-gray-400 text-xs mb-5 max-w-[240px] mx-auto">Let&apos;s get started with a few quick details</p>
                        <motion.button
                          onClick={() => setChatOpen(true)}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
                        >
                          <MessageSquare size={15} /> Start Chat
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Active chat — fills remaining height as flex column ── */}
                {chatOpen && (
                  <div className="absolute inset-0 top-[60px] flex flex-col">
                    {/* Scrollable area */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 overscroll-contain">
                      <AnimatePresence mode="wait">
                        {showUserForm ? (
                          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                            <div className="text-center py-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
                                <MessageCircle className="text-white w-6 h-6" />
                              </div>
                              <p className="text-white text-sm font-semibold mb-1">Welcome to RecXchange!</p>
                              <p className="text-gray-400 text-xs">Let&apos;s get started with a few quick details</p>
                            </div>
                            <div>
                              <label className="text-gray-300 text-xs block mb-1">Your Name *</label>
                              <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="John Smith"
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
                            </div>
                            <div>
                              <label className="text-gray-300 text-xs block mb-1">Email Address *</label>
                              <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="john@company.com"
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
                            </div>
                            <div>
                              <label className="text-gray-300 text-xs block mb-1">I am a... *</label>
                              <select value={userPersona} onChange={e => setUserPersona(e.target.value as 'recruiter' | 'hiring-manager')}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50">
                                <option value="" className="bg-[#0a0a0f]">Select one</option>
                                <option value="recruiter" className="bg-[#0a0a0f]">Recruiter</option>
                                <option value="hiring-manager" className="bg-[#0a0a0f]">Hiring Manager</option>
                              </select>
                            </div>
                            {userPersona === 'hiring-manager' && (
                              <div>
                                <label className="text-gray-300 text-xs block mb-1">Company Name *</label>
                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Acme Corp"
                                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
                              </div>
                            )}
                            <button onClick={handleStartChat} disabled={isRegistering}
                              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-bold text-sm hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                              {isRegistering ? <><Loader2 className="w-4 h-4 animate-spin" /> Starting...</> : 'Start Chat'}
                            </button>
                            <p className="text-gray-500 text-[10px] text-center">By continuing, you agree to our data collection for support purposes.</p>
                          </motion.div>
                        ) : (
                          <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {messages.map((msg, idx) => (
                              <div key={idx} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                                  msg.role === 'user'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                    : msg.isHandover
                                    ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                                    : 'bg-white/10 text-gray-200'
                                }`}>
                                  {msg.isHandover && <div className="flex items-center gap-2 mb-2 text-xs font-semibold"><User size={14} /> Live Agent</div>}
                                  {renderMessageContent(msg)}
                                </div>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex justify-start">
                                <div className="bg-white/10 rounded-lg p-3"><Loader2 className="animate-spin text-cyan-400 w-4 h-4" /></div>
                              </div>
                            )}
                            <div ref={messagesEndRef} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Input bar — pinned to bottom */}
                    {!showUserForm && (
                      <div className="p-3 sm:p-4 border-t border-cyan-400/20 bg-[#0a0a0f]/95 flex-shrink-0">
                        {hasHandedOver ? (
                          <div className="text-center py-2 text-gray-400 text-xs">A team member will respond in your GHL inbox</div>
                        ) : (
                          <div className="flex gap-2">
                            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}
                              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Type your message..."
                              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                              disabled={isLoading} />
                            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}
                              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0">
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <p className="text-gray-500 text-[9px] text-center mt-2">Say &quot;speak to human&quot; to connect with a live agent</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
