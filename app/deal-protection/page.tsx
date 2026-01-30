"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

interface Step {
  label: string;
  status: string;
  desc: string;
}

export default function DealProtection() {
  const steps: Step[] = [
    { label: "Role Uploaded", status: "Agreed", desc: "Terms locked by Owner" },
    { label: "Candidate Linked", status: "Linked", desc: "Timestamped Entry" },
    { label: "Deal Closure", status: "Placed", desc: "Split Fee Released" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
              Protocol — Trust Infrastructure
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mt-4 leading-[1.1] tracking-tighter"
          >
            Every submission has a timestamp, <br/>
            <span className="gradient-text text-glow">a trail, and an agreement.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-8 max-w-2xl leading-relaxed font-medium"
          >
            We log who shared what, when they shared it, and under which terms—so your split-fee placements feel secure, not fragile.
          </motion.p>
        </header>

        <div className="flex flex-col gap-8 pb-16">
          
          {/* Section 1: Immutable Visual Timeline */}
          <section className="glass-card p-10 md:p-14 rounded-[3.5rem] border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 tracking-tight">Immutable introduction sequence.</h2>
              <p className="text-sm text-gray-500 mb-12 max-w-xl font-medium leading-relaxed">
                Our engine creates a cryptographic-style log of authorship. Once a candidate is linked to a role, the origin is indisputable within the RecXchange terminal.
              </p>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 bg-black/40 p-10 rounded-[2.5rem] border border-white/5">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0" />
                
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center gap-4 relative z-10 bg-[#0a0a0a] px-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-black border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] group hover:border-blue-500 transition-colors">
                      <span className="text-xs font-black text-blue-400">0{i+1}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">{step.label}</span>
                      <span className="block text-[9px] text-gray-600 font-mono italic">{step.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Framework Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.section 
              whileHover={{ translateY: -5 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-4 tracking-tight">Agreement-First</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium">
                Commercial terms are locked via a standardized framework before any data is exchanged. No "handshake" deals—only hard data protected by our master SFA.
              </p>
              <div className="space-y-4">
                {["Clear fees & splits", "Standardized language", "One source of truth"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="w-1 h-1 rounded-full bg-blue-500" /> {item}
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              whileHover={{ translateY: -5 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-4 tracking-tight">Authorship Protection</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium">
                If two recruiters submit the same candidate, the system automatically recognizes the primary author based on the verified RecX timestamp.
              </p>
              <Link href="/roles" className="text-blue-400 text-[10px] font-black hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                Browse Protected Roles <span>→</span>
              </Link>
            </motion.section>
          </div>

          {/* Section 3: Summary Chips */}
          <section className="glass-card p-10 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/20">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2">Framework Protocol</h3>
              <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Resolution & Ethics Compliance // v2.6</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["Agreed Resolution", "Transparency", "Data Privacy"].map((text, i) => (
                <span key={i} className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/[0.03] text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  {text}
                </span>
              ))}
            </div>
          </section>
        </div>

        <RecruiterFinalCTA />
      </div>

      {/* Footer Navigation Overlay */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50">
        <div className="glass-card py-4 px-10 rounded-full border-white/10 flex justify-between items-center text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <span>Active Protocol v2.6</span>
          </div>
          <div className="flex gap-8">
            <Link href="/roles" className="hover:text-blue-400 transition-colors">Marketplace</Link>
            <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
