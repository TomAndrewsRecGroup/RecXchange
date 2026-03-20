'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  useChatLogic,
  renderChatMessageContent,
  messageBubbleClass,
  type ChatMessage,
} from '@/hooks/useChatLogic';

export default function FloatingChat() {
  const pathname = usePathname();

  const {
    messages, inputValue, setInputValue, isLoading, isRegistering,
    showUserForm, userName, setUserName, userEmail, setUserEmail,
    userPersona, setUserPersona, companyName, setCompanyName,
    messagesEndRef, handleStartChat, handleSendMessage,
  } = useChatLogic(pathname);

  // Hide on the homepage
  if (pathname === '/') return null;

  return (
    <div data-chat-widget className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[150]">
      <AnimatePresence>
        <FloatingPanel
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          isRegistering={isRegistering}
          showUserForm={showUserForm}
          userName={userName}
          setUserName={setUserName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPersona={userPersona}
          setUserPersona={setUserPersona}
          companyName={companyName}
          setCompanyName={setCompanyName}
          messagesEndRef={messagesEndRef}
          handleStartChat={handleStartChat}
          handleSendMessage={handleSendMessage}
        />
      </AnimatePresence>
    </div>
  );
}

// ─── Inner panel ──────────────────────────────────────────────────────────────

interface PanelProps {
  messages:          ChatMessage[];
  inputValue:        string;
  setInputValue:     (v: string) => void;
  isLoading:         boolean;
  isRegistering:     boolean;
  showUserForm:      boolean;
  userName:          string;
  setUserName:       (v: string) => void;
  userEmail:         string;
  setUserEmail:      (v: string) => void;
  userPersona:       'recruiter' | 'hiring-manager' | '';
  setUserPersona:    (v: 'recruiter' | 'hiring-manager' | '') => void;
  companyName:       string;
  setCompanyName:    (v: string) => void;
  messagesEndRef:    React.RefObject<HTMLDivElement | null>;
  handleStartChat:   () => Promise<void>;
  handleSendMessage: () => Promise<void>;
}

function FloatingPanel({
  messages, inputValue, setInputValue, isLoading, isRegistering,
  showUserForm, userName, setUserName, userEmail, setUserEmail,
  userPersona, setUserPersona, companyName, setCompanyName,
  messagesEndRef, handleStartChat, handleSendMessage,
}: PanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed md:absolute bottom-20 right-4 left-4 md:bottom-20 md:right-0 md:left-auto md:w-[380px] h-[calc(100vh-180px)] max-h-[600px] md:h-[550px] bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm">RecXchange Team</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Live Support
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 touch-manipulation"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 overscroll-contain">
                {showUserForm ? (
                  <UserForm
                    userName={userName} setUserName={setUserName}
                    userEmail={userEmail} setUserEmail={setUserEmail}
                    userPersona={userPersona} setUserPersona={setUserPersona}
                    companyName={companyName} setCompanyName={setCompanyName}
                    isRegistering={isRegistering}
                    handleStartChat={handleStartChat}
                  />
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${messageBubbleClass(msg)}`}>
                          {renderChatMessageContent(msg)}
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
                  </>
                )}
              </div>

              {/* Input bar */}
              {!showUserForm && (
                <div className="p-3 sm:p-4 border-t border-cyan-400/20 flex-shrink-0 bg-[#0a0a0f]/95">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation active:scale-95 flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-[9px] text-center mt-2">
                    You are chatting with the RecXchange team
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow touch-manipulation"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
            : <motion.div key="open"  initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle className="w-5 h-5" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// ─── Shared gate form ─────────────────────────────────────────────────────────

interface UserFormProps {
  userName: string;       setUserName:    (v: string) => void;
  userEmail: string;      setUserEmail:   (v: string) => void;
  userPersona: 'recruiter' | 'hiring-manager' | '';
  setUserPersona: (v: 'recruiter' | 'hiring-manager' | '') => void;
  companyName: string;    setCompanyName: (v: string) => void;
  isRegistering: boolean;
  handleStartChat: () => Promise<void>;
}

export function UserForm({
  userName, setUserName, userEmail, setUserEmail,
  userPersona, setUserPersona, companyName, setCompanyName,
  isRegistering, handleStartChat,
}: UserFormProps) {
  return (
    <div className="space-y-3">
      <div className="text-center py-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
          <MessageCircle className="text-white w-6 h-6" />
        </div>
        <p className="text-white text-sm font-semibold mb-1">Welcome to RecXchange!</p>
        <p className="text-gray-400 text-xs">Let&apos;s get started with a few quick details</p>
      </div>
      <div>
        <label className="text-gray-300 text-xs block mb-1">Your Name *</label>
        <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
          placeholder="John Smith"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" />
      </div>
      <div>
        <label className="text-gray-300 text-xs block mb-1">Email Address *</label>
        <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)}
          placeholder="john@company.com"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" />
      </div>
      <div>
        <label className="text-gray-300 text-xs block mb-1">I am a... *</label>
        <select value={userPersona} onChange={e => setUserPersona(e.target.value as 'recruiter' | 'hiring-manager')}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 touch-manipulation">
          <option value="" className="bg-[#0a0a0f]">Select one</option>
          <option value="recruiter" className="bg-[#0a0a0f]">Recruiter</option>
          <option value="hiring-manager" className="bg-[#0a0a0f]">Hiring Manager</option>
        </select>
      </div>
      {userPersona === 'hiring-manager' && (
        <div>
          <label className="text-gray-300 text-xs block mb-1">Company Name *</label>
          <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
            placeholder="Acme Corp"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation" />
        </div>
      )}
      <button
        onClick={handleStartChat}
        disabled={isRegistering}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-bold text-sm hover:shadow-lg transition-all touch-manipulation active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isRegistering
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</>
          : 'Start Chat'}
      </button>
      <p className="text-gray-500 text-[10px] text-center">By continuing, you agree to our data collection for support purposes.</p>
    </div>
  );
}
