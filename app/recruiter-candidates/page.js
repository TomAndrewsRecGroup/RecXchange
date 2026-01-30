"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const mockCandidates = [
  { id: 1, name: "S. Chen", role: "Senior Backend Engineer", loc: "London", match: 94 },
  { id: 2, name: "A. Murray", role: "Product Designer", loc: "Remote", match: 89 },
  { id: 3, name: "J. Doe", role: "DevOps Architect", loc: "New York", match: 91 },
  { id: 4, name: "L. Zhang", role: "Fullstack Developer", loc: "Berlin", match: 87 },
];

export default function FillRolesPage() {
  const [feed, setFeed] = useState(mockCandidates);

  // Simple "Live" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden">
      {/* 1. Nav & Background */}
      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/recruiter" className="text-white border-b-2 border-blue-500 pb-1">Recruiter</Link>
            <button className="text-gray-400 hover:text-white transition-colors">Hiring Manager ▾</button>
            <button className="text-gray-400 hover:text-white transition-colors">Roles</button>
          </div>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-sm font-semibold">Get Started</button>
        </div>
      </div>

      {/* Network Masks */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. Central Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Recruiter Path — Fill Roles</span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">270M+ Profiles at Your Fingertips</h1>
          <div className="pulse-underline mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Drop in your roles, set your priorities, and watch live candidate matches flow into your desk.
          </p>
        </header>

        {/* 4. Two-Column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Explainer */}
          <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-8 border-white/5">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Turn signed roles into delivered placements.</h2>
              <ul className="space-y-6">
                {[
                  "Plug your roles into RecX Direct & your private ATS.",
                  "Search 270M+ candidate profiles with recruiter-grade filters.",
                  "Use AI matching to surface best-fit profiles in seconds."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-gray-400 text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold">0{i+1}</span> {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
                Start matching candidates
              </button>
              <Link href="/deal-protection" className="block text-center mt-4 text-[10px] text-gray-500 hover:text-blue-400 underline underline-offset-4">
                See how we protect your submissions
              </Link>
            </div>
          </div>

          {/* Right: Live Feed Simulation */}
          <div className="glass-card p-6 rounded-[2rem] flex flex-col gap-4 max-h-[550px] border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-gray-300">Live Candidate Feed (Demo)</span>
              </div>
              <span className="text-[9px] text-gray-600 italic">Real-time matching active</span>
            </div>

            <div className="space-y-3 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {feed.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-medium text-sm">{c.name} — {c.loc}</span>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">{c.match}% Fit</span>
                    </div>
                    <span className="text-gray-400 text-xs">{c.role}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
               <Link href="/recx-direct" className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">See RecX Direct</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Root Footer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="glass-card py-3 px-8 rounded-full border-white/10 flex justify-between items-center text-[10px] text-gray-500">
          <span>This branch connects directly to Deal Protection and Pricing.</span>
          <div className="flex gap-4">
            <Link href="/deal-protection" className="hover:text-blue-400 uppercase font-bold">Protection Rules</Link>
            <Link href="/pricing-and-splits" className="hover:text-purple-400 uppercase font-bold">Pricing & Splits</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
