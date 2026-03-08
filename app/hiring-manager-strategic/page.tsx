"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

  // Scroll animation for the timeline - track the timeline container specifically
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  // Transform to make the bar reach 100% earlier in the scroll
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 0.85], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Background Accents - Purple Focus */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        
        {/* Header Section */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12 w-full max-w-5xl mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Badge */}
            <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-purple-400/60 font-bold">
              Strategic Support — Talent Infrastructure
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight px-2">
              Pre-warm the market <br/>
              before you hire.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Stop the cycle of reactive "firefighting." We build your talent infrastructure ahead of time, ensuring high-velocity growth that doesn&apos;t sacrifice quality.
            </p>
          </motion.div>
        </header>

        {/* Interactive Timeline & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full">
          
          {/* Timeline Section */}
          <div ref={timelineRef} className="glass-card p-4 sm:p-6 md:p-8 lg:p-14 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-14 flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7] flex-shrink-0" />
              <span>The 90-Day Strategic Roadmap</span>
            </h2>
            
            <div className="relative pl-6 sm:pl-8 md:pl-10">
              {/* Static background line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/10" />
              {/* Animated "Filling" line */}
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-purple-500 shadow-[0_0_10px_#a855f7]" 
              />

              <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
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
                    <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[43px] top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-purple-500 transition-colors z-10">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-600 animate-pulse" />
                    </div>
                    
                    <span className="text-[9px] sm:text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3 block">{m.time}</span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2">{m.title}</h3>
                    <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed max-w-md">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Deliverables & Evidence */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-white/5 bg-gradient-to-br from-purple-600/10 to-transparent"
            >
              <h3 className="text-white font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-base sm:text-lg">Executive Deliverables</h3>
              <ul className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                {[
                  { label: "Competitor Mapping", d: "Org-chart visualization of rival teams." },
                  { label: "Pipeline Incubation", d: "Nurtured lists of 'Ready-to-Move' talent." },
                  { label: "Feasibility Data", d: "Local salary vs. your budget reality." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 sm:gap-4 md:gap-5 items-start">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg width="10" height="10" className="sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] sm:text-sm font-bold text-white mb-0.5 sm:mb-1">{item.label}</p>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm"
            >
              <p className="text-[11px] sm:text-xs text-gray-400 italic leading-relaxed">
                "We essentially eliminated our 'time-to-hire' metric because the talent was already identified before the role was even live."
              </p>
              <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <svg width="20" height="20" className="sm:w-[22px] sm:h-[22px] md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Female avatar silhouette */}
                    <circle cx="12" cy="8" r="3.5" fill="#a855f7" opacity="0.8"/>
                    <path d="M5 20c0-4 3-7 7-7s7 3 7 7" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                    {/* Hair representation - simple curved lines */}
                    <path d="M8 7c0-2.5 1.5-4 4-4s4 1.5 4 4" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                </div>
                <p className="text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-[0.15em] sm:tracking-[0.2em]">VP Talent • Fintech Global</p>
              </div>
            </motion.div>
          </div>
        </div>

        <ManagerFinalCTA />
        
        {/* Footer Context Strip */}
        <footer className="mt-10 sm:mt-12 md:mt-16 w-full px-2">
          <div className="glass-card py-3 sm:py-4 px-3 sm:px-8 md:px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em]" style={{ minHeight: 'auto' }}>
            <span className="opacity-60 text-center md:text-left leading-tight">Confidentiality Assured • 2026 Talent Mapping Protocol</span>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
              <Link href="/account-management" className="hover:text-purple-400 transition-colors whitespace-nowrap">Managed Services</Link>
              <Link href="/hiring-manager-live" className="hover:text-blue-400 transition-colors whitespace-nowrap">Urgent Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
