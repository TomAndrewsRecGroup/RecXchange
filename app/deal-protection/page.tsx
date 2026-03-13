"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, FileCheck } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
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
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="PROTOCOL: TRUST INFRASTRUCTURE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Every submission has a timestamp, a trail, and an agreement.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              We log who shared what, when they shared it, and under which terms - so your split-fee placements feel secure, not fragile.
            </p>
          </motion.header>

          {/* Timeline Section */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 tracking-tight">Immutable introduction sequence.</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm mb-6 sm:mb-8 md:mb-10 max-w-xl font-medium leading-relaxed">
                Our engine creates a cryptographic-style log of authorship. Once a candidate is linked to a role, the origin is indisputable within the RecXchange terminal.
              </p>

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-4 bg-black/40 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-cyan-400/10">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-0" />

                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center gap-2 sm:gap-3 relative z-10 bg-[#0a0a0f] px-3 sm:px-4 md:px-6"
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
            </HolographicCard>
          </section>

          {/* Protection Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="emerald" variant="feature">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 sm:mb-6 border border-green-500/20">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </div>
              <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 tracking-tight text-white">Agreement-First</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-8 font-medium">
                Commercial terms are locked via a standardized framework before any data is exchanged. No handshake deals - only hard data protected by our master SFA.
              </p>
              <ul className="space-y-2.5 sm:space-y-4">
                {["Clear fees & splits", "Standardized language", "One source of truth"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-gray-400">
                    <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </HolographicCard>

            <HolographicCard color="fuchsia" variant="feature">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center mb-4 sm:mb-6 border border-fuchsia-500/20">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" />
              </div>
              <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 tracking-tight text-white">Authorship Protection</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-8 font-medium">
                If two recruiters submit the same candidate, the system automatically recognizes the primary author based on the verified RecX timestamp.
              </p>
              <GlowButton variant="ghost" size="sm" href="/roles">
                Browse Protected Roles &rarr;
              </GlowButton>
            </HolographicCard>
          </div>

          {/* Summary Chips */}
          <HolographicCard color="cyan" variant="content" className="mb-10 sm:mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-[13px] sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2 text-white">Resolution & Ethics</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest">Disputes handled with one shared log.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {["Agreed Resolution", "Transparency", "Data Privacy"].map((text, i) => (
                  <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-[0.12em] sm:tracking-[0.15em]">
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </HolographicCard>

          <RecruiterFinalCTA />
        </div>
      </div>
    </main>
  );
}
