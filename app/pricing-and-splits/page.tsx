"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Tier {
  t: string;
  d: string;
  focus: string;
}

interface Scenario {
  title: string;
  math: string;
  result: string;
}

export default function PricingSplits() {
  const tiers: string[] = ["Entry", "Lite", "Pro", "Teams"];
  
  const scenarios: Scenario[] = [
    { 
      title: "Mandate Owner + Candidate Provider", 
      math: "20% Placement Fee on £80,000 • 50/50 Split", 
      result: "£8,000 Commission per partner" 
    },
    { 
      title: "High-Margin Tech Placement", 
      math: "18% Placement Fee on £120,000 • 60/40 Split", 
      result: "£12,960 for Lead Partner" 
    }
  ];

  const tierDetails: Tier[] = [
    { t: "Entry", d: "Get in, get moving. Test the ecosystem with zero upfront risk.", focus: "Solo Starters" },
    { t: "Lite", d: "Build a consistent desk. Optimized for recruiters seeing initial traction.", focus: "Consistent Billing" },
    { t: "Pro", d: "Scale your revenue. Priority access to premium mandates and verified pools.", focus: "High Performance" },
    { t: "Teams", d: "Power up your squad. Shared visibility, multiple seats, and admin oversight.", focus: "Agency Scale" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05)_0%,transparent_50%)] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label text-blue-400"
          >
            Commercial Layer — Economics
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mt-6 tracking-tight"
          >
            Clear splits. <span className="gradient-text">Zero noise.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-8 max-w-2xl mx-auto leading-relaxed"
          >
            Choose the membership that matches your volume, then plug into a global network of roles and candidates with total commercial transparency.
          </motion.p>
        </header>

        {/* 1. Horizontal Tier Overview */}
        <section className="glass-card p-2 rounded-full mb-12 hidden md:flex items-center justify-between border-white/5 bg-white/[0.02]">
          <div className="pl-8">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Available Membership Tracks</p>
          </div>
          <div className="flex gap-2 p-1">
            {tiers.map(t => (
              <span key={t} className="px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* 2. Detailed Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tierDetails.map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ translateY: -5 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-blue-500/20 transition-all bg-gradient-to-br from-white/[0.02] to-transparent group"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{item.t}</h3>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-md group-hover:text-blue-400 group-hover:border-blue-400/30 transition-colors">
                  {item.focus}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">{item.d}</p>
              <Link href="/auth/signup" className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                View Feature Set <span className="text-blue-500">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 3. Splits Logic & Math */}
        <section className="glass-card p-10 md:p-14 rounded-[3.5rem] border-white/5 bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">The Mathematics of RecXchange.</h2>
            <p className="text-gray-400 mb-12 leading-relaxed">
              Every collaboration is underpinned by a pre-agreed digital contract. You see your exact net earnings before you ever share a candidate or accept a role.
            </p>
            
            <div className="space-y-4">
              {scenarios.map((s, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-white/[0.04] transition-all">
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{s.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium italic">{s.math}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-400 tabular-nums">{s.result}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-[2rem] border border-purple-500/20 bg-purple-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-bold text-white mb-1">Custom Revenue Modeling</p>
                <p className="text-xs text-gray-500">Predict your billings based on niche and volume.</p>
              </div>
              <Link href="/recruiter-roles" className="px-8 py-4 rounded-full bg-purple-600 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20">
                Open Split Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Commercial Navigation Strip */}
        <div className="mt-20 flex justify-center">
          <div className="glass-card py-5 px-12 rounded-full border-white/10 flex flex-wrap justify-center gap-10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            <Link href="/recruiter-candidates" className="hover:text-blue-400 transition-colors">Candidate Portability</Link>
            <Link href="/recruiter-roles" className="hover:text-purple-400 transition-colors">Role Liquidity</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Master SFA Agreement</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
