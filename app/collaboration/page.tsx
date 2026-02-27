"use client";
import React from "react";
import { Zap, Cpu, Target } from "lucide-react";
import { motion } from 'framer-motion';
import SendRolesForm from '@/components/send-roles-form';

export default function CollaborationPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-x-hidden">
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">

        {/* Hero */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
              The RecXchange Engine
            </span>
            <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
              Split Fees. Zero Friction.
            </h1>
            <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
              RecXchange isn't just a marketplace; it's a high-performance engine designed to protect your deals and automate your matchmaking.
            </p>
          </motion.div>
        </header>

        {/* The Split Logic */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-t-2 sm:border-t-4 border-cyan-500">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">50/50 Standard</h2>
            <p className="text-gray-500 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6">The classic collaboration model. You bring the candidate, they bring the role (or vice versa). Our engine handles the legal framework so you can focus on the placement.</p>
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-400/20 text-[10px] sm:text-xs">Standard Xchange</div>
          </div>

          <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-t-2 sm:border-t-4 border-fuchsia-500">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">Up to 70% Retained</h2>
            <p className="text-gray-500 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6">Work on high-priority <strong className="text-white">RecXDirect</strong> roles verified by our team. These roles offer aggressive splits for recruiters who deliver speed and quality.</p>
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-bold border border-fuchsia-400/20 text-[10px] sm:text-xs">RecXDirect Access</div>
          </div>
        </section>

        {/* Xchange Engine Section */}
        <section className="w-full relative overflow-hidden glass-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 border-cyan-400/10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="absolute top-0 right-0 -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-fuchsia-500/10 blur-[80px] sm:blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center">
            <div>
              <h3 className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-fuchsia-400 mb-2 sm:mb-3 md:mb-4">The Heavy Lifting</h3>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">Proprietary <span className="gradient-text">Xchange Engine</span></h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                Stop digging through spreadsheets. Our AI-powered candidate-role matching system operates 24/7 in the background to surface the perfect placement.
              </p>

              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                {[
                  { icon: <Target className="text-cyan-400" />, title: "Semantic Matching", desc: "We look beyond keywords to understand experience, career trajectory, and industry relevance." },
                  { icon: <Zap className="text-fuchsia-400" />, title: "Instant Notifications", desc: "Get alerted the second a high-quality match enters the engine." },
                  { icon: <Cpu className="text-white" />, title: "Continuous Scanning", desc: "The engine never sleeps, re-ranking your entire database as new roles go live." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                    <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 16, className: `sm:w-5 sm:h-5 md:w-6 md:h-6 ${(item.icon as React.ReactElement).props.className}` })}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-[13px] sm:text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-cyan-400/10 bg-white/[0.01]">
              <h4 className="font-mono text-[9px] sm:text-[10px] text-gray-500 uppercase mb-3 sm:mb-4">Engine Impact</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                  <span className="text-[13px] sm:text-sm text-gray-400">Search Time Reduction</span>
                  <span className="text-xl sm:text-2xl font-bold text-fuchsia-400">80%</span>
                </div>
                <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                  <span className="text-[13px] sm:text-sm text-gray-400">Database Utilization</span>
                  <span className="text-xl sm:text-2xl font-bold text-cyan-400">100%</span>
                </div>
                <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                  <span className="text-[13px] sm:text-sm text-gray-400">Time-to-Fill</span>
                  <span className="text-xl sm:text-2xl font-bold text-white">Instant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action: Send Me 3 Roles */}
        <section className="w-full glass-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 border-cyan-400/10 text-center">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400 mb-3 sm:mb-4 md:mb-6">
            Try the Engine
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">See the matching engine in action</h2>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Tell us your industries and we'll show you 3 matching roles from our live database.
          </p>
          <div className="flex justify-center">
            <SendRolesForm className="" />
          </div>
        </section>
      </div>
    </main>
  );
}
