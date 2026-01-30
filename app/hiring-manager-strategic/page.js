"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

export default function HiringManagerStrategic() {
  const milestones = [
    { time: "0-30 Days", title: "Market Insight", desc: "We map the talent pool, target locations, and current salary bands for your upcoming headcount." },
    { time: "30-60 Days", title: "Network Pre-Warming", desc: "We identify and gently approach relevant candidates to position your employer brand ahead of the launch." },
    { time: "60-90 Days", title: "Launch-Ready Pipelines", desc: "Shortlists are vetted and ready the moment your requisition is officially signed off." }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
          >
            Upcoming Roles — Strategic Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-4 leading-tight"
          >
            Pre-warm the market <br/>
            <span className="gradient-text">before you even raise a requisition.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Stop the cycle of reactive hiring. We map the talent, salary bands, and timelines ahead of time 
            so your launches feel calm, calculated, and high-velocity.
          </motion.p>
        </header>

        {/* 2. Interactive Timeline & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-12 items-start mb-20">
          
          {/* Timeline Section */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
            <h2 className="text-xl font-bold mb-12 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              Strategic Hiring Roadmap
            </h2>
            
            <div className="relative pl-8 border-l border-white/10 space-y-12">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-purple-500/30 transition-all cursor-default"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-600 border-4 border-black group-hover:scale-125 transition-transform" />
                  
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{m.time}</span>
                  <h3 className="text-lg font-bold text-white my-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Deliverables Card */}
          <div className="flex flex-col gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-purple-600/5 to-transparent">
              <h3 className="text-white font-bold mb-6 text-lg tracking-tight">Executive Deliverables:</h3>
              <ul className="space-y-6">
                {[
                  { label: "Market Mapping", desc: "Detailed breakdown of competitor talent movements." },
                  { label: "Shortlist Incubation", desc: "A pre-vetted list of 'ready-to-move' talent." },
                  { label: "Benchmarking Reports", desc: "Real-time salary data vs. your internal bands." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 text-purple-500">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{item.label}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "By the time our requisitions hit the system, RecXchange already had the top 5 candidates briefed and ready for first-stage interviews."
              </p>
              <p className="text-[10px] font-bold text-white uppercase mt-4 tracking-widest">— VP of Talent, Fintech unicorn</p>
            </div>
          </div>
        </div>

        {/* 3. INTEGRATED MANAGER CTA */}
        <ManagerFinalCTA />
        
        {/* 4. Minimal Footer Strip */}
        <div className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span>Leadership Consultation • Confidential Search</span>
            <div className="flex gap-8">
              <Link href="/account-management" className="hover:text-white transition-colors">How We Work</Link>
              <Link href="/hiring-manager-live" className="hover:text-white transition-colors">Urgent Support</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
