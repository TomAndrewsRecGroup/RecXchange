"use client"; 

import React, { useMemo, useState } from 'react'; 
import { Mail, Send, Loader2, MessageCircle, MessageSquare, X } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { usePathname } from 'next/navigation'; 
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import { 
  useChatLogic, 
  renderChatMessageContent, 
  messageBubbleClass, 
  type ChatCtaKind,
} from '@/hooks/useChatLogic'; 
import { UserForm, OfflineBlocker } from '@/components/FloatingChat'; 
import ChatCtaModal from '@/components/ChatCtaModal';

// ─── Static preview messages shown behind the blur gate ──────────────────────
const previewMessages = [
  { role: 'assistant' as const, content: 'Hi there! Welcome to RecXchange. How can we help you today?' },
  { role: 'user'      as const, content: 'I\'d like to find out more about posting a role...' },
  { role: 'assistant' as const, content: 'Great! Are you a Recruiter or a Hiring Manager?' },
  { role: 'user'      as const, content: 'I\'m a Hiring Manager looking to fill a few positions.' },
  { role: 'assistant' as const, content: 'Perfect. Let me pull up the right details for you right away...' },
];

// Single source-of-truth height for the chat panel across all 3 states
const CHAT_HEIGHT = 'h-[560px]';

export default function ContactPage() { 
  const pathname = usePathname(); 
  const [chatOpen, setChatOpen] = useState(false); 
  const [activeCta, setActiveCta] = useState<ChatCtaKind | null>(null);

  // ── All chat logic lives in the shared hook ────────────────────────────────
  const {
    messages, inputValue, setInputValue, isLoading, isRegistering, isOffline,
    showUserForm, userName, setUserName, userEmail, setUserEmail,
    userPersona, setUserPersona, companyName, setCompanyName,
    messagesEndRef, handleStartChat, handleSendMessage,
  } = useChatLogic(pathname); 

  const prefill = useMemo(() => {
    const parts = (userName || '').trim().split(/\s+/).filter(Boolean);
    const firstName = parts[0] || 'Website';
    const lastName = parts.slice(1).join(' ') || 'Visitor';
    return {
      firstName,
      lastName,
      email: userEmail || '',
      companyName: companyName || '',
    };
  }, [userName, userEmail, companyName]);

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="GET IN TOUCH" color="purple" />
            <h1
              className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}
            >
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

            {/* ── Left column ── */}
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

              {/* mt-auto pushes stat cards to the bottom, aligning with chat panel bottom */}
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

            {/* ── Right: fixed-height chat panel ── */}
            <div className={`relative ${CHAT_HEIGHT}`}>
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-purple-400/40"
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(168,85,247,0.15), 0 0 20px rgba(168,85,247,0.05)',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Chat header */}
                <div className="p-3.5 sm:p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-sm">RecXchange Team</h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live Support
                      </p>
                    </div>
                    {chatOpen && (
                      <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Blurred preview gate ── */}
                {!chatOpen && (
                  <div className="absolute inset-0 top-[60px]">
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

                {/* ── Active chat ── */}
                {chatOpen && (
                  <div className="absolute inset-0 top-[60px] flex flex-col">
                    {/* Scrollable message area */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 overscroll-contain">
                      <AnimatePresence mode="wait">
                        {showUserForm ? (
                          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <UserForm
                              userName={userName} setUserName={setUserName}
                              userEmail={userEmail} setUserEmail={setUserEmail}
                              userPersona={userPersona} setUserPersona={setUserPersona}
                              companyName={companyName} setCompanyName={setCompanyName}
                              isRegistering={isRegistering}
                              handleStartChat={handleStartChat}
                            />
                          </motion.div>
                        ) : isOffline ? (
                          <motion.div key="offline" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <OfflineBlocker />
                          </motion.div>
                        ) : (
                          <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {messages.map((msg, idx) => (
                              <div key={idx} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${messageBubbleClass(msg)}`}>
                                  {renderChatMessageContent(msg, { onCtaClick: (cta) => setActiveCta(cta.kind) })} 
                                </div>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex justify-start">
                                <div className="bg-white/10 rounded-lg p-3">
                                  <Loader2 className="animate-spin text-cyan-400 w-4 h-4" />
                                </div>
                              </div>
                            )}
                            <div ref={messagesEndRef} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Input bar — hidden when form is showing or chat is offline */}
                    {!showUserForm && !isOffline && (
                      <div className="p-3 sm:p-4 border-t border-cyan-400/20 bg-[#0a0a0f]/95 flex-shrink-0">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                            disabled={isLoading}
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-[9px] text-center mt-2">
                          You are chatting with the RecXchange team
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div> 

      <ChatCtaModal
        open={Boolean(activeCta)}
        kind={activeCta}
        onClose={() => setActiveCta(null)}
        prefill={prefill}
      />
    </main> 
  ); 
} 
