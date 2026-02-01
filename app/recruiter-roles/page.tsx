"use client";
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

export default function PostRolesPage() {
  const [salary, setSalary] = useState<number>(90000);
  const [fee, setFee] = useState<number>(20);
  const [split, setSplit] = useState<number>(50);

  // Derived calculations
  const totalFee = (salary * (fee / 100));
  const yourShare = totalFee * (split / 100);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* Dynamic Background Ambience */}
      <div className="fixed bottom-0 right-0 w-[45%] h-[45%] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-0 left-0 w-[35%] h-[35%] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label text-purple-400"
          >
            Recruiter Path — Post Roles
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mt-6 tracking-tight"
          >
            The Xchange Engine: <br/>
            <span className="gradient-text">Distribute, Partner, Earn.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg mt-8 leading-relaxed"
          >
            Stop letting hard-to-fill roles gather dust. Post your roles once, leverage a global recruiter network for high-quality candidates, and manage every split fee with institutional security.
          </motion.p>
        </header>

        {/* 2. Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          
          {/* Left: Narrative & Process */}
          <div className="space-y-10">
            <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <h2 className="text-2xl font-bold mb-8">Role Liquidity. Partnered Success.</h2>
              <div className="space-y-12">
                {[
                  { t: "Verified Roles", d: "Broadcast roles with pre-agreed fee structures. RecXchange ensures every partner is pre-vetted for quality." },
                  { t: "Tiered Visibility", d: "Total control. Broadcast to the open marketplace or limit visibility to your private 'Circle of Trust'." },
                  { t: "Unified Pipeline", d: "Track candidate flows from multiple partners in one dashboard. No more messy email chains or lost CVs." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">{item.t}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            

            <div className="p-8 rounded-[2.5rem] border border-purple-500/20 bg-purple-500/5 relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    Secure Transaction Layer
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    RecXchange acts as the neutral escrow and contract guardian. Automated Split Fee Agreements (SFAs) are generated at the point of candidate submission to lock in your commercial protection.
                  </p>
               </div>
            </div>
          </div>

          {/* Right: Interactive Calculator */}
          <aside className="sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 md:p-14 rounded-[3.5rem] border-white/5 bg-black/60 relative"
            >
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">Split Fee Calculator</h2>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest font-black">Revenue Projection Engine</p>
              </div>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-gray-400 font-black tracking-[0.2em]">Annual Base Salary (£)</label>
                  <input 
                    type="number" 
                    value={salary} 
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-xl text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase text-gray-400 font-black tracking-[0.2em]">Agency Fee %</label>
                    <input 
                      type="number" 
                      value={fee} 
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-lg text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase text-gray-400 font-black tracking-[0.2em]">Your Split %</label>
                    <input 
                      type="number" 
                      value={split} 
                      onChange={(e) => setSplit(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-lg text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full" />
                  <span className="text-[10px] text-gray-400 block mb-3 uppercase tracking-[0.3em] font-black">Your Estimated Take-Home</span>
                  <span className="text-5xl md:text-6xl font-bold gradient-text tabular-nums tracking-tighter">
                    £{Math.floor(yourShare).toLocaleString()}
                  </span>
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-center gap-6">
                     <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Total Invoice: £{totalFee.toLocaleString()}</span>
                  </div>
                </div>

                <a 
                  href="https://app.recxchange.io/register" 
                  className="w-full text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-white text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(199,31,241,0.3)]"
                >
                  Post Role to Xchange
                </a>
              </div>
            </motion.div>
          </aside>
        </div>

        <RecruiterFinalCTA />

        {/* Global Hub Footer Navigation */}
        <footer className="mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-1">
               <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Corporate Entity: RecXchange Portal LLC</span>
               <span className="text-[9px] text-gray-700 font-bold uppercase">Registered in Dubai Silicon Oasis</span>
            </div>
            <div className="flex gap-10">
              <Link href="/roles" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Marketplace</Link>
              <Link href="/legal/terms" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">SFA Rules</Link>
              <Link href="/pricing-and-splits" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Tiers</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
