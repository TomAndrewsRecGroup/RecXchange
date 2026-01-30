"use client";
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

interface Milestone {
  time: string;
  title: string;
  desc: string;
}

export default function HiringManagerStrategic() {
  const milestones: Milestone[] = [
    { time: "Phase 01: 0-30 Days", title: "Market Intelligence", desc: "We map the local and global talent pool, target specific competitor org charts, and benchmark current salary bands." },
    { time: "Phase 02: 30-60 Days", title: "Network Warming", desc: "We begin discreet outreach to high-intent passive talent, positioning your company vision 3 months before you hire." },
    { time: "Phase 03: 60-90 Days", title: "Launch-Ready Pipelines", desc: "Vetted shortlists are primed and ready the moment your requisition is officially signed off by finance." }
  ];

  // Scroll animation for the timeline line
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden text-white">
      
      {/* Background Accents - Purple Focus */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label"
          >
            Strategic Support — Talent Infrastructure
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mt-4 leading-[1.1]"
          >
            Pre-warm the market <br/>
            <span className="gradient-text">before you hire.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-8 max-w-2xl leading-relaxed"
          >
            Stop the cycle of reactive "firefighting." We build your talent infrastructure ahead of time, ensuring high-velocity growth that doesn't sacrifice quality.
          </motion.p>
        </header>

        {/* 2. Interactive Timeline & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-12 items-start mb-24">
          
          {/* Timeline Section */}
          <div className="glass-card p-10 md:p-14 rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden">
            <h2 className="text-xl font-bold mb-14 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
              The 90-Day Strategic Roadmap
            </h2>
            
            <div className="relative pl-10">
              {/* Static background line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/10" />
              {/* Animated "Filling" line */}
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-purple-500 shadow-[0_0_10px_#a855f7]" 
              />

              <div className="space-y-16">
                {milestones.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2 }}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-purple-500 transition-colors z-10">
                        <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    </div>
                    
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.3em] mb-3 block">{m.time}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-md">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Deliverables & Evidence */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-purple-600/10 to-transparent"
            >
              <h3 className="text-white font-bold mb-8 text-lg">Executive Deliverables</h3>
              <ul className="space-y-8">
                {[
                  { label: "Competitor Mapping", d: "Org-chart visualization of rival teams." },
                  { label: "Pipeline Incubation", d: "Nurtured lists of 'Ready-to-Move' talent." },
                  { label: "Feasibility Data", d: "Local salary vs. your budget reality." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-sm"
            >
              <p className="text-xs text-gray-400 italic leading-relaxed">
                "We essentially eliminated our 'time-to-hire' metric because the talent was already identified before the role was even live."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                <p className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">VP Talent • Fintech Global</p>
              </div>
            </motion.div>
          </div>
        </div>

        <ManagerFinalCTA />
        
        {/* Footer Context Strip */}
        <footer className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="opacity-60">Confidentiality Assured • 2026 Talent Mapping Protocol</span>
            <div className="flex gap-8">
              <Link href="/account-management" className="hover:text-purple-400 transition-colors">Managed Services</Link>
              <Link href="/hiring-manager-live" className="hover:text-blue-400 transition-colors">Urgent Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
