"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PostRolesPage() {
  const [salary, setSalary] = useState(90000);
  const [fee, setFee] = useState(20);
  const [split, setSplit] = useState(60);

  const totalFee = (salary * (fee / 100));
  const yourShare = totalFee * (split / 100);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden">
      {/* Nav & Background (Consistent) */}
      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-[9px] font-bold text-purple-400 uppercase">Recruiter Mode</div>
             <button className="px-5 py-2 rounded-full bg-white/5 text-sm font-semibold">Login</button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. Central Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Recruiter Path — Post Roles & Collaborate</span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">The Xchange Engine: Distribute & Earn</h1>
          <div className="pulse-underline mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Post your roles once, tap a global recruiter network, and track your split fees end to end.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Engine Narrative */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Share roles, not your entire book.</h2>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"/> Upload roles with clear fees & terms.</li>
                <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"/> Choose collaborators: Public or Trusted.</li>
                <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"/> Track every submission in one dashboard.</li>
              </ul>
            </section>
            
            <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <h3 className="text-sm font-bold text-white mb-2 italic">Why splits feel safe here:</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Timestamped submissions and pre-agreed digital contracts prevent bypass. Every placement is tracked by the Xchange Engine.
              </p>
              <Link href="/legal-hub" className="text-[10px] text-purple-400 mt-3 inline-block font-bold underline underline-offset-4">View Split Fee Agreement</Link>
            </section>
          </div>

          {/* Right: Calculator */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold text-white mb-2">Split Fee Calculator</h2>
            <p className="text-xs text-gray-500 mb-8">Estimate your earnings on a shared placement.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Candidate Salary (£)</label>
                <input 
                  type="number" 
                  value={salary} 
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Agency Fee %</label>
                  <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Your Split %</label>
                  <input type="number" value={split} onChange={(e) => setSplit(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-600/5 border border-purple-500/20 text-center">
                <span className="text-xs text-gray-500 block mb-1">Your Estimated Share</span>
                <span className="text-4xl font-bold gradient-text">
                  £{Math.floor(yourShare).toLocaleString()}
                </span>
                <span className="block text-[9px] text-gray-600 mt-2 uppercase tracking-tighter">Total Fee: £{totalFee.toLocaleString()}</span>
              </div>

              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-sm shadow-xl shadow-purple-500/20">
                Post a Role to the Xchange Engine
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Root Footer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="glass-card py-3 px-8 rounded-full border-white/10 flex justify-between items-center text-[10px] text-gray-500">
          <span>This branch connects directly to Roles, Deal Protection, and Pricing.</span>
          <div className="flex gap-4">
            <Link href="/roles" className="hover:text-white uppercase font-bold">Preview Roles</Link>
            <Link href="/deal-protection" className="hover:text-white uppercase font-bold">Protection</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
