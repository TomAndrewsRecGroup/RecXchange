"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

export default function PostRolesPage() {
  const [salary, setSalary] = useState(90000);
  const [fee, setFee] = useState(20);
  const [split, setSplit] = useState(50);

  const totalFee = (salary * (fee / 100));
  const yourShare = totalFee * (split / 100);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* Background Accents */}
      <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-0 left-0 w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 1. Header Section */}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">
            Recruiter Path — Post Roles & Collaborate
          </span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            The Xchange Engine: Distribute & Earn
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Post your roles once, tap into a global recruiter network, and track your split fees end-to-end with total transparency.
          </p>
        </header>

        {/* 2. Two-Column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          
          {/* Left: Engine Narrative */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 bg-gradient-to-br from-white/[0.02] to-transparent">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Share roles, not your entire book.</h2>
              <ul className="space-y-6">
                {[
                  { t: "Verified Mandates", d: "Upload roles with clear pre-agreed fees and engagement terms." },
                  { t: "Selective Collaboration", d: "Choose your audience: Broadcast to the whole network or a private trusted group." },
                  { t: "Centralized Tracking", d: "View every candidate CV, interview stage, and feedback in one unified portal." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.t}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="p-8 rounded-2xl bg-purple-500/5 border border-purple-500/20">
              <h3 className="text-sm font-bold text-purple-400 mb-2 italic">Why splits feel safe here:</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Timestamped submissions and automated Split Fee Agreements prevent circumvention. Every interaction is logged by the Xchange Engine.
              </p>
              <Link href="/legal/terms" className="text-[10px] text-white hover:text-purple-400 transition-colors inline-block font-bold uppercase tracking-widest">
                View Split Fee Framework →
              </Link>
            </section>
          </div>

          {/* Right: Calculator */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-black/40">
            <h2 className="text-2xl font-bold text-white mb-2">Split Fee Calculator</h2>
            <p className="text-xs text-gray-500 mb-10">Estimate your potential earnings on a shared placement.</p>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Candidate Salary (£)</label>
                <input 
                  type="number" 
                  value={salary} 
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Agency Fee %</label>
                  <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 font-mono" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Your Split %</label>
                  <input type="number" value={split} onChange={(e) => setSplit(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 font-mono" />
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-purple-600/5 border border-purple-500/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full" />
                <span className="text-xs text-gray-500 block mb-2 uppercase tracking-widest">Your Estimated Share</span>
                <span className="text-5xl font-bold gradient-text">
                  £{Math.floor(yourShare).toLocaleString()}
                </span>
                <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                   <span className="text-[10px] text-gray-600 uppercase">Total Fee: £{totalFee.toLocaleString()}</span>
                </div>
              </div>

              <a href="https://app.recxchange.io/register" className="block w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-sm text-center shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform">
                Post a Role to the Xchange Engine
              </a>
            </div>
          </div>
        </div>

        {/* 3. INTEGRATED FINAL CTA */}
        <RecruiterFinalCTA />

        {/* 4. Minimal Footer Strip */}
        <div className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold">
            <span className="uppercase tracking-widest">RecXchange Ecosystem • Dubai • London</span>
            <div className="flex gap-8">
              <Link href="/roles" className="hover:text-white uppercase transition-colors">Preview Live Roles</Link>
              <Link href="/legal/terms" className="hover:text-white uppercase transition-colors">Deal Protection</Link>
              <Link href="/pricing" className="hover:text-white uppercase transition-colors">Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
