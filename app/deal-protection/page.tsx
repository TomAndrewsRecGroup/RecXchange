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
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 mesh-background overflow-x-hidden text-white">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(0,255,255,0.04)_0%,_transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        {/* UPDATED Header */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12 max-w-5xl mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Badge */}
            <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-cyan-400/60 font-bold">
              Protocol — Trust Infrastructure
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight px-2">
              Every submission has a timestamp, a trail, and an agreement.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              We log who shared what, when they shared it, and under which terms—so your split-fee placements feel secure, not fragile.
            </p>
          </motion.div>
        </header>

        <div className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-6 sm:pb-8 md:pb-10">

          {/* Section 1: Timeline */}
          <section className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3.5rem] border-cyan-400/10 relative overflow-hidden bg-gradient-to-br from-cyan-400/[0.02] to-transparent shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-2.5 md:mb-3 tracking-tight">Immutable introduction sequence.</h2>
              <p className="text-[13px] sm:text-sm text-gray-500 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xl font-medium leading-relaxed">
                Our engine creates a cryptographic-style log of authorship. Once a candidate is linked to a role, the origin is indisputable within the RecXchange terminal.
              </p>

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-4 bg-black/40 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border border-cyan-400/10">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-0" />

                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4 relative z-10 bg-[#0a0a0a] px-3 sm:px-4 md:px-6"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-black border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:border-cyan-400 transition-colors">
                      <span className="text-[10px] sm:text-xs font-black text-cyan-400">0{i + 1}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1">{step.label}</span>
                      <span className="block text-[8px] sm:text-[9px] text-gray-600 font-mono italic">{step.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Protection Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.section
              whileHover={{ translateY: -5 }}
              className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-cyan-400/10 bg-gradient-to-b from-cyan-400/[0.02] to-transparent"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-green-500/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 border border-green-500/20">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight">Agreement-First</h2>
              <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed mb-5 sm:mb-6 md:mb-8 font-medium">
                Commercial terms are locked via a standardized framework before any data is exchanged. No "handshake" deals—only hard data protected by our master SFA.
              </p>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                {["Clear fees & splits", "Standardized language", "One source of truth"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest text-gray-500">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" /> <span className="flex-1">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              whileHover={{ translateY: -5 }}
              className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-fuchsia-400/10 bg-gradient-to-b from-fuchsia-400/[0.02] to-transparent"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-fuchsia-500/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 border border-fuchsia-500/20">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight">Authorship Protection</h2>
              <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed mb-5 sm:mb-6 md:mb-8 font-medium">
                If two recruiters submit the same candidate, the system automatically recognizes the primary author based on the verified RecX timestamp.
              </p>
              <Link href="/roles" className="text-cyan-400 text-[9px] sm:text-[10px] font-black hover:text-white transition-colors uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1.5 sm:gap-2">
                <span>Browse Protected Roles</span> <span>→</span>
              </Link>
            </motion.section>
          </div>

          {/* Section 3: Summary Chips */}
          <section className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-cyan-400/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-8 bg-black/20">
            <div className="text-center md:text-left">
              <h3 className="text-[13px] sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">Resolution & Ethics</h3>
              <p className="text-[10px] sm:text-xs text-gray-600 font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest">Disputes handled with one shared log.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3">
              {["Agreed Resolution", "Transparency", "Data Privacy"].map((text, i) => (
                <span key={i} className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  {text}
                </span>
              ))}
            </div>
          </section>
        </div>

        <RecruiterFinalCTA />
      </div>
    </main>
  );
}
