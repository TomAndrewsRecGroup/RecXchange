'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, User, ExternalLink } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
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

const getPageContext = (pathname: string): string => {
  const pageMap: Record<string, string> = {
    '/': 'Homepage', '/home': 'Homepage', '/why-recxchange': 'Why RecXchange',
    '/pricing': 'Pricing', '/split-fees': 'Collaboration', '/deal-protection': 'Deal Protection',
    '/roles': 'Active Roles', '/blog': 'Blog', '/account-management': 'Account Management',
    '/hiring-manager-live': 'Hiring Manager - Live Roles',
    '/hiring-manager-strategic': 'Hiring Manager - Strategic Roles',
  };
  return pageMap[pathname] || `${pathname.replace('/', '').replace(/-/g, ' ')} page`;
};

const detectUserIntent = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('how much')) return 'pricing-inquiry';
  if (lower.includes('demo') || lower.includes('trial') || lower.includes('try')) return 'demo-request';
  if (lower.includes('work') || lower.includes('how does') || lower.includes('features')) return 'product-inquiry';
  if (lower.includes('contact') || lower.includes('call') || lower.includes('meeting')) return 'contact-request';
  if (lower.includes('role') || lower.includes('job') || lower.includes('position') || lower.includes('hiring')) return 'recruitment-inquiry';
  if (lower.includes('collaborate') || lower.includes('partner') || lower.includes('together')) return 'collaboration-inquiry';
  return 'general-inquiry';
};

export default function FloatingChat() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasHandedOver, setHasHandedOver] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPersona, setUserPersona] = useState<'recruiter' | 'hiring-manager' | ''>('');
  const [companyName, setCompanyName] = useState('');
  const [contactId, setContactId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  // Pick one assistant name per chat session and keep it stable
  const [assistantName] = useState<AssistantName>(() => pickAssistantName());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsVisible(pathname !== '/'); }, [pathname]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleStartChat = async () => {
    if (!userName || !userEmail || !userPersona) { alert('Please fill in all required fields'); return; }
    if (userPersona === 'hiring-manager' && !companyName) { alert('Please enter your company name'); return; }

    setIsRegistering(true);
    try {
      // Register the contact in GHL immediately on form submit
      const pageContext = getPageContext(pathname);
      const res = await fetch('/api/groq/register-chat-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          persona: userPersona,
          companyName: userPersona === 'hiring-manager' ? companyName : undefined,
          pageContext,
        }),
      });
      const data = await res.json();
      if (data.contactId) setContactId(data.contactId);
    } catch (err) {
      // Non-blocking: log the error but still let the user into the chat
      console.error('[FloatingChat] Failed to register chat user:', err);
    } finally {
      setIsRegistering(false);
    }

    setShowUserForm(false);
    setMessages([{ role: 'assistant', content: `Hi ${userName.split(' ')[0]}! I'm ${assistantName} from RecXchange. How can I help you today?` }]);
  };

  const handleSmartLinkClick = (url: string) => { setIsOpen(false); router.push(url); };

  const renderMessageContent = (msg: Message) => {
    const parts: React.ReactNode[] = [];
    const smartLinkRegex = /\[smartlink:(\d+)\](.+?)\[\/smartlink\]/g;
    let lastIndex = 0; let match;
    while ((match = smartLinkRegex.exec(msg.content)) !== null) {
      if (match.index > lastIndex) parts.push(<span key={`text-${lastIndex}`}>{msg.content.substring(lastIndex, match.index)}</span>);
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
    if (lastIndex < msg.content.length) parts.push(<span key={`text-end`}>{msg.content.substring(lastIndex)}</span>);
    return parts.length > 0 ? <div className="whitespace-pre-wrap">{parts}</div> : msg.content;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || hasHandedOver) return;
    const userMessage = inputValue.trim(); setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]); setIsLoading(true);
    try {
      const pageContext = getPageContext(pathname);
      const userIntent = messages.length === 1 ? detectUserIntent(userMessage) : undefined;
      // If we already have a contactId from registration, pass it through to skip re-creation
      const payload: Record<string, unknown> = { message: userMessage, history: messages, pageContext, userIntent, assistantName };
      if (contactId) {
        payload.contactId = contactId;
        payload.conversationId = conversationId;
      } else {
        // Fallback: pass credentials so the route can create the contact if registration somehow failed
        payload.name = userName; payload.email = userEmail; payload.persona = userPersona;
        if (userPersona === 'hiring-manager') payload.companyName = companyName;
      }
      const response = await fetch('/api/groq/ai-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      if (data.contactId) setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);
      if (data.handover) { setHasHandedOver(true); setMessages(prev => [...prev, { role: 'assistant', content: data.message, isHandover: true, smartLinks: data.smartLinks }]); }
      else setMessages(prev => [...prev, { role: 'assistant', content: data.message, smartLinks: data.smartLinks }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an error. Please try again or contact support at support@recxchange.io` }]);
    } finally { setIsLoading(false); }
  };

  if (!isVisible) return null;

  return (
    <div data-chat-widget className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.2 }}
              className="fixed md:absolute bottom-20 right-4 left-4 md:bottom-20 md:right-0 md:left-auto md:w-[380px] h-[calc(100vh-180px)] max-h-[600px] md:h-[550px] bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-3.5 sm:p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm">{assistantName} — RecXchange</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Team Member {hasHandedOver && '→ Live Agent'}
                    </p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 touch-manipulation">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 overscroll-contain">
                {showUserForm ? (
                  <div className="space-y-3">
                    <div className="text-center py-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
                        <MessageCircle className="text-white w-6 h-6" />
                      </div>
                      <p className="text-white text-sm font-semibold mb-1">Welcome to RecXchange!</p>
                      <p className="text-gray-400 text-xs">Let's get started with a few quick details</p>
                    </div>
                    <div><label className="text-gray-300 text-xs block mb-1">Your Name *</label>
                      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="John Smith" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" /></div>
                    <div><label className="text-gray-300 text-xs block mb-1">Email Address *</label>
                      <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="john@company.com" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" /></div>
                    <div><label className="text-gray-300 text-xs block mb-1">I am a... *</label>
                      <select value={userPersona} onChange={(e) => setUserPersona(e.target.value as 'recruiter' | 'hiring-manager')} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 touch-manipulation">
                        <option value="" className="bg-[#0a0a0f]">Select one</option>
                        <option value="recruiter" className="bg-[#0a0a0f]">Recruiter</option>
                        <option value="hiring-manager" className="bg-[#0a0a0f]">Hiring Manager</option>
                      </select></div>
                    {userPersona === 'hiring-manager' && (
                      <div><label className="text-gray-300 text-xs block mb-1">Company Name *</label>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" /></div>
                    )}
                    <button
                      onClick={handleStartChat}
                      disabled={isRegistering}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-bold text-sm hover:shadow-lg transition-all touch-manipulation active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isRegistering ? <><Loader2 className="w-4 h-4 animate-spin" /> Starting...</> : 'Start Chat'}
                    </button>
                    <p className="text-gray-500 text-[10px] text-center">By continuing, you agree to our data collection for support purposes.</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' : msg.isHandover ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-white/10 text-gray-200'}`}>
                          {msg.isHandover && <div className="flex items-center gap-2 mb-2 text-xs font-semibold"><User size={14} />Live Agent</div>}
                          {renderMessageContent(msg)}
                        </div>
                      </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="bg-white/10 rounded-lg p-3"><Loader2 className="animate-spin text-cyan-400 w-4 h-4" /></div></div>}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              {!showUserForm && (
                <div className="p-3 sm:p-4 border-t border-cyan-400/20 flex-shrink-0 bg-[#0a0a0f]/95">
                  {hasHandedOver ? <div className="text-center py-2 text-gray-400 text-xs">A team member will respond in your GHL inbox</div> : (
                    <div className="flex gap-2">
                      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..." className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" disabled={isLoading} />
                      <button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}
                        className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation active:scale-95 flex-shrink-0">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-gray-500 text-[9px] text-center mt-2">Say "speak to human" to connect with a live agent</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow touch-manipulation">
        <AnimatePresence mode="wait">
          {isOpen ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div> :
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle className="w-5 h-5" /></motion.div>}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
