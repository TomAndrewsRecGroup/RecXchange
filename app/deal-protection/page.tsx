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
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-label"
          >
            Trust Layer — Deal Protection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight"
          >
            Every submission has a timestamp, <br/>
            <span className="gradient-text">a trail, and an agreement.</span>
          </motion.h1>
          <div className="pulse-underline mt-6 ml-0" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-8 max-w-2xl leading-relaxed"
          >
            We log who shared what, when they shared it, and under which terms—so your split-fee placements feel secure, not fragile.
          </motion.p>
        </header>

        <div className="flex flex-col gap-8 pb-16">
          
          {/* Section 1: Visual Timeline */}
          <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-2">Immutable introduction sequence.</h2>
              <p className="text-sm text-gray-500 mb-10 max-w-xl">
                Our engine creates a cryptographic-style log of authorship. Once a candidate is linked to a role, the origin is indisputable.
              </p>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 bg-black/40 p-8 rounded-3xl border border-white/5">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 z-0" />
                
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center gap-3 relative z-10 bg-[#0a0a0a] px-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-black border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <span className="text-[10px] font-bold text-blue-400">0{i+1}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase tracking-wider">{step.label}</span>
                      <span className="block text-[9px] text-gray-500 font-mono mt-1">{step.desc}</span>
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
              className="glass-card p-8 rounded-[2rem] border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h2 className="text-lg font-bold text-white mb-4">Agreement-First</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Commercial terms are locked via a standardized framework before any data is exchanged. No "handshake" deals—only hard data.
              </p>
              <div className="space-y-3">
                {["Clear fees & splits", "Standardized language", "One source of truth"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] font-medium text-gray-500 italic">
                    <span className="w-1 h-1 rounded-full bg-blue-500" /> {item}
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              whileHover={{ translateY: -5 }}
              className="glass-card p-8 rounded-[2rem] border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h2 className="text-lg font-bold text-white mb-4">Authorship Protection</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                If two recruiters submit the same candidate, the system recognizes the primary author based on the verified timestamp.
              </p>
              <Link href="/legal-hub" className="text-blue-400 text-[11px] font-bold hover:underline uppercase tracking-widest">
                View 2026 Split Fee Agreement →
              </Link>
            </motion.section>
          </div>

          {/* Section 3: Summary Chips */}
          <section className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Framework Protocol</h3>
              <p className="text-[11px] text-gray-500 uppercase tracking-tighter">Resolution & Ethics Compliance</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Agreed Resolution", "Transparency", "Data Privacy"].map((text, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
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
        <div className="glass-card py-3 px-8 rounded-full border-white/10 flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          <span>Protection Protocol v2.6</span>
          <div className="flex gap-6">
            <Link href="/recruiter-roles" className="hover:text-blue-400 transition-colors">Roles</Link>
            <Link href="/pricing-and-splits" className="hover:text-purple-400 transition-colors">Pricing</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
