"use client";
import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [userType, setUserType] = useState<'recruiter' | 'hiring' | null>(null);

  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-20 items-start">

        {/* Left: Brand Value */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-fuchsia-400 mb-6">Global Hub</h3>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 italic leading-tight">
            Connect with the <br />
            <span className="gradient-text">Engineers of Talent.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
            Whether you are scaling a team in California or sourcing from London, our team provides the human oversight for our AI-driven Xchange.
          </p>

          <div className="space-y-6">
            <div className="flex gap-6 p-8 glass-card rounded-[2.5rem] border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.03] to-transparent">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-inner">
                <Mail />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Direct Liaison</p>
                <p className="text-xl font-medium text-white">support@recxchange.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chat-Style Interface */}
        <div className="relative">
          <div className="absolute -inset-4 bg-cyan-500/5 blur-[100px] rounded-full" />
          <div className="relative glass-card p-10 md:p-12 rounded-[3.5rem] border-cyan-400/10 space-y-8 bg-black/40 backdrop-blur-3xl">
            
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live Chat</h3>
                <p className="text-xs text-gray-500 font-medium">Start a conversation with our team</p>
              </div>
            </div>

            {/* User Type Selection */}
            {!userType ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 font-medium mb-6">I am a...</p>
                
                <button
                  onClick={() => setUserType('recruiter')}
                  className="w-full p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-white mb-1">Recruiter</p>
                      <p className="text-xs text-gray-500">Agency or independent recruiter</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/20 transition-all">
                      →
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType('hiring')}
                  className="w-full p-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 hover:bg-fuchsia-400/10 hover:border-fuchsia-400/40 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-white mb-1">Hiring Manager</p>
                      <p className="text-xs text-gray-500">Need to fill roles</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-fuchsia-400/10 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-400/20 transition-all">
                      →
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selected Type Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest ${
                    userType === 'recruiter' 
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400'
                      : 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-400'
                  }`}>
                    {userType === 'recruiter' ? 'Recruiter' : 'Hiring Manager'}
                  </div>
                  <button 
                    onClick={() => setUserType(null)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium"
                  >
                    Change
                  </button>
                </div>

                {/* Chat Message Placeholder */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-gray-500 mb-2 font-medium">RecXchange Team</p>
                    <p className="text-sm text-white leading-relaxed">
                      {userType === 'recruiter' 
                        ? "Great! We'd love to help you access our platform and collaborate with other recruiters. Our team will connect with you shortly to discuss partnership opportunities."
                        : "Perfect! We're here to help you fill your roles. Our team will reach out to understand your hiring needs and get you connected with top talent."}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 rounded-2xl p-4 border border-cyan-400/20">
                    <p className="text-xs text-gray-400 mb-2 font-medium">You</p>
                    <input 
                      type="text" 
                      placeholder="Type your message here..."
                      className="w-full bg-transparent border-none text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl">
                  <MessageCircle size={16} />
                  Start Live Chat
                </button>

                <p className="text-center text-[9px] text-gray-600 uppercase font-bold tracking-widest">
                  Connected via secure channel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
