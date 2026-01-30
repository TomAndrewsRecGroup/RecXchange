"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

const mockCandidates = [
  { id: 1, name: "S. Chen", role: "Senior Backend Engineer", loc: "London", match: 94 },
  { id: 2, name: "A. Murray", role: "Product Designer", loc: "Remote", match: 89 },
  { id: 3, name: "J. Doe", role: "DevOps Architect", loc: "New York", match: 91 },
  { id: 4, name: "L. Zhang", role: "Fullstack Developer", loc: "Berlin", match: 87 },
];

export default function FillRolesPage() {
  const [feed, setFeed] = useState(mockCandidates);

  // Simple "Live" effect for the demo feed
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* 1. Network Masks / Background Accents */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Central Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">
            Recruiter Path — Fill Roles
          </span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            270M+ Profiles at Your Fingertips
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Drop in your roles, set your priorities, and watch live candidate matches flow onto your desk. 
            Access a global pool of talent with one click.
          </p>
        </header>

        {/* 3. Two-Column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          
          {/* Left: Explainer Section */}
          <div className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-8 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Turn signed roles into delivered placements.</h2>
              <ul className="space-y-8">
                {[
                  { title: "Plug into RecX Direct", desc: "Sync your roles into our direct distribution engine or keep them in your private ATS." },
                  { title: "Recruiter-Grade Filters", desc: "Search 270M+ profiles using technical stacks, seniority, and salary expectations." },
                  { title: "AI-Powered Matching", desc: "Our engine surfaces the top 1% of the market for your specific mandate automatically." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 bg-blue-500/10">
                      0{i+1}
                    </span>
                    <div>
                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <a href="https://app.recxchange.io/register" className="block w-full py-4 text-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/20">
                Start matching candidates
              </a>
              <Link href="/deal-protection" className="block text-center mt-6 text-[10px] text-gray-500 hover:text-blue-400 uppercase tracking-widest font-bold transition-colors">
                See how we protect your submissions →
              </Link>
            </div>
          </div>

          {/* Right: Live Feed Simulation */}
          <div className="glass-card p-8 rounded-[2.5rem] flex flex-col gap-4 max-h-[600px] border-white/5 relative overflow-hidden bg-black/40">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs uppercase font-bold text-gray-300 tracking-wider">Live Candidate Feed (Demo)</span>
              </div>
              <span className="text-[10px] text-blue-400 font-bold animate-pulse">MATCHING ACTIVE</span>
            </div>

            <div className="space-y-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {feed.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    className="p-5 rounded-2xl border border-white/5 bg-white/[0.03] flex flex-col gap-2 hover:border-blue-500/30 transition-colors cursor-default"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-bold text-sm">{c.name} — <span className="text-gray-400 font-normal">{c.loc}</span></span>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                        {c.match}% Match
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">{c.role}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 4. INTEGRATED FINAL CTA */}
        <RecruiterFinalCTA />
      </div>

      {/* 5. Minimal Root Footer Strip */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold">
          <span className="uppercase tracking-widest">Connected to Deal Protection & Global Splits</span>
          <div className="flex gap-8">
            <Link href="/deal-protection" className="hover:text-blue-400 uppercase transition-colors">Protection Rules</Link>
            <Link href="/pricing-and-splits" className="hover:text-purple-400 uppercase transition-colors">Pricing & Splits</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
