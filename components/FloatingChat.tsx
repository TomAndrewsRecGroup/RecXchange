'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHandover?: boolean;
}

export default function FloatingChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasHandedOver, setHasHandedOver] = useState(false);
  
  // User info for first message
  const [showUserForm, setShowUserForm] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPersona, setUserPersona] = useState<'recruiter' | 'hiring-manager' | ''>('');
  const [companyName, setCompanyName] = useState('');
  
  // Session tracking
  const [contactId, setContactId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide chat on root page
  useEffect(() => {
    setIsVisible(pathname !== '/');
  }, [pathname]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleStartChat = () => {
    if (!userName || !userEmail || !userPersona) {
      alert('Please fill in all required fields');
      return;
    }

    if (userPersona === 'hiring-manager' && !companyName) {
      alert('Please enter your company name');
      return;
    }

    setShowUserForm(false);
    setMessages([{
      role: 'assistant',
      content: `Hi ${userName.split(' ')[0]}! I'm RecXchange Support, your AI assistant. How can I help you today?`
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || hasHandedOver) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const payload: Record<string, unknown> = {
        message: userMessage,
        history: messages,
      };

      // First message includes user info
      if (!contactId) {
        payload.name = userName;
        payload.email = userEmail;
        payload.persona = userPersona;
        if (userPersona === 'hiring-manager') {
          payload.companyName = companyName;
        }
      } else {
        payload.contactId = contactId;
        payload.conversationId = conversationId;
      }

      const response = await fetch('/api/ghl/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      // Store session IDs
      if (data.contactId) setContactId(data.contactId);
      if (data.conversationId) setConversationId(data.conversationId);

      // Check if handover occurred
      if (data.handover) {
        setHasHandedOver(true);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.message,
          isHandover: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.message 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again or contact support at support@recxchange.io' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div data-chat-widget className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                fixed md:absolute
                inset-4 md:inset-auto
                md:bottom-20 md:right-0
                md:w-[380px] md:h-[550px]
                max-w-full
                bg-[#0a0a0f]/95 backdrop-blur-xl 
                border border-cyan-400/30 
                rounded-2xl md:rounded-2xl
                shadow-2xl 
                flex flex-col 
                overflow-hidden
              "
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base sm:text-sm">RecXchange Support</h3>
                    <p className="text-gray-400 text-sm sm:text-xs flex items-center gap-1.5 sm:gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      AI Assistant {hasHandedOver && '→ Live Agent'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 sm:p-2 rounded-lg hover:bg-white/10 touch-manipulation"
                  >
                    <X size={20} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-4 space-y-4 overscroll-contain">
                {showUserForm ? (
                  <div className="space-y-4 sm:space-y-4">
                    <div className="text-center py-4 sm:py-4">
                      <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="text-white" size={28} />
                      </div>
                      <p className="text-white text-base sm:text-sm font-semibold mb-1">Welcome to RecXchange!</p>
                      <p className="text-gray-400 text-sm sm:text-xs">Let's get started with a few quick details</p>
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm sm:text-xs block mb-1.5 sm:mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 sm:px-3 sm:py-2 text-white text-base sm:text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm sm:text-xs block mb-1.5 sm:mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 sm:px-3 sm:py-2 text-white text-base sm:text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm sm:text-xs block mb-1.5 sm:mb-1">I am a... *</label>
                      <select
                        value={userPersona}
                        onChange={(e) => setUserPersona(e.target.value as 'recruiter' | 'hiring-manager')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 sm:px-3 sm:py-2 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                      >
                        <option value="" className="bg-[#0a0a0f]">Select one</option>
                        <option value="recruiter" className="bg-[#0a0a0f]">Recruiter</option>
                        <option value="hiring-manager" className="bg-[#0a0a0f]">Hiring Manager</option>
                      </select>
                    </div>

                    {userPersona === 'hiring-manager' && (
                      <div>
                        <label className="text-gray-300 text-sm sm:text-xs block mb-1.5 sm:mb-1">Company Name *</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 sm:px-3 sm:py-2 text-white text-base sm:text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                        />
                      </div>
                    )}

                    <button
                      onClick={handleStartChat}
                      className="w-full py-3.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-bold text-base sm:text-sm hover:shadow-lg transition-all touch-manipulation active:scale-98"
                    >
                      Start Chat
                    </button>

                    <p className="text-gray-500 text-xs sm:text-[10px] text-center">
                      By continuing, you agree to our data collection for support purposes.
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3.5 sm:p-3 text-base sm:text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                              : msg.isHandover
                              ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                              : 'bg-white/10 text-gray-200'
                          }`}
                        >
                          {msg.isHandover && (
                            <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
                              <User size={14} />
                              Live Agent
                            </div>
                          )}
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 rounded-lg p-3.5 sm:p-3">
                          <Loader2 className="animate-spin text-cyan-400" size={18} className="sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              {!showUserForm && (
                <div className="p-4 sm:p-4 border-t border-cyan-400/20 flex-shrink-0 bg-[#0a0a0f]/80">
                  {hasHandedOver ? (
                    <div className="text-center py-3 sm:py-2 text-gray-400 text-sm sm:text-xs">
                      A team member will respond in your GHL inbox
                    </div>
                  ) : (
                    <div className="flex gap-2.5 sm:gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 sm:px-3 sm:py-2 text-white text-base sm:text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 touch-manipulation"
                        disabled={isLoading}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="px-5 py-3 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation active:scale-95"
                      >
                        <Send size={18} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-gray-500 text-[10px] sm:text-[9px] text-center mt-2.5 sm:mt-2">
                    Say "speak to human" to connect with a live agent
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow touch-manipulation"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} className="sm:w-6 sm:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={26} className="sm:w-6 sm:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
