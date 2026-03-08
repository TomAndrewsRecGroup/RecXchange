"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import Breadcrumbs from '@/components/Breadcrumbs';
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

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 0.85], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />
          
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="STRATEGIC SUPPORT — TALENT INFRASTRUCTURE" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Pre-warm the market <br/>
              before you hire.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              Stop the cycle of reactive "firefighting." We build your talent infrastructure ahead of time, ensuring high-velocity growth that doesn&apos;t sacrifice quality.
            </p>
          </motion.header>

          {/* Timeline & Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6 sm:gap-8 items-start mb-10 sm:mb-12 md:mb-16">
            
            {/* Timeline */}
            <div ref={timelineRef}>
              <HolographicCard color="purple" variant="content">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
                  <span>The 90-Day Strategic Roadmap</span>
                </h2>
                
                <div className="relative pl-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/10" />
                  <motion.div 
                    style={{ scaleY, originY: 0 }}
                    className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-purple-500 shadow-[0_0_10px_#a855f7]" 
                  />

                  <div className="space-y-10 sm:space-y-12">
                    {milestones.map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="relative group"
                      >
                        <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-[#0a0a0f] border border-white/20 flex items-center justify-center group-hover:border-purple-500 transition-colors z-10">
                          <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                        </div>
                        
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 block">{m.time}</span>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2">{m.title}</h3>
                        <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed">{m.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </HolographicCard>
            </div>

            {/* Deliverables */}
            <div className="flex flex-col gap-6">
              <HolographicCard color="fuchsia" variant="content">
                <h3 className="text-white font-bold mb-6 text-lg">Executive Deliverables</h3>
                <ul className="space-y-6">
                  {[
                    { label: "Competitor Mapping", d: "Org-chart visualization of rival teams." },
                    { label: "Pipeline Incubation", d: "Nurtured lists of 'Ready-to-Move' talent." },
                    { label: "Feasibility Data", d: "Local salary vs. your budget reality." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </HolographicCard>

              <HolographicCard color="cyan" variant="feature">
                <p className="text-xs text-gray-400 italic leading-relaxed mb-5">
                  "We essentially eliminated our 'time-to-hire' metric because the talent was already identified before the role was even live."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border-2 border-cyan-400/30 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="3.5" fill="#06b6d4" opacity="0.8"/>
                      <path d="M5 20c0-4 3-7 7-7s7 3 7 7" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                    </svg>
                  </div>
                  <p className="text-[9px] font-bold text-white uppercase tracking-widest">VP Talent • Fintech Global</p>
                </div>
              </HolographicCard>
            </div>
          </div>

          <ManagerFinalCTA />
        </div>
      </div>
    </main>
  );
}
