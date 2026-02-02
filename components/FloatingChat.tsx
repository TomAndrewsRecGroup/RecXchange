"use client";
import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 h-[450px] glass-card rounded-[2rem] border-white/10 mb-4 flex flex-col overflow-hidden shadow-2xl bg-black/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-[#312fd7]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#c71df1]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Xchange AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-5 text-xs text-gray-400 space-y-4 overflow-y-auto">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                Hello! I am the Xchange Engine assistant. How can I help you navigate the recruiter network or post your roles today?
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 flex gap-2">
              <input type="text" placeholder="Ask anything..." className="flex-grow bg-transparent outline-none text-xs" />
              <button className="text-[#c71df1]"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
