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
            className="w-80 h-[450px] glass-card rounded-[2rem] border-cyan-400/20 mb-4 flex flex-col overflow-hidden shadow-2xl bg-[#050508]/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-cyan-400/10 bg-cyan-400/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Xchange AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-5 text-xs text-gray-400 space-y-4 overflow-y-auto">
              <div className="bg-white/5 p-3 rounded-2xl border border-cyan-400/10">
                Hello! I am the Xchange Engine assistant. How can I help you navigate the recruiter network or post your roles today?
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 flex gap-2 border-t border-cyan-400/10">
              <input type="text" placeholder="Ask anything..." className="flex-grow bg-transparent outline-none text-xs text-white placeholder-gray-600" />
              <button className="text-cyan-400 hover:text-fuchsia-400 transition-colors"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
