"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PricingSplits() {
  const tiers = ["Entry", "Lite", "Pro", "Teams"];
  
  const scenarios = [
    { title: "You own the role, partner brings candidate", math: "20% fee on £80k, 50/50 split", result: "£8,000 each" },
    { title: "You bring candidate, partner owns role", math: "18% fee on £60k, 60/40 split", result: "£6,480 for you" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Commercial Layer — Pricing & Splits</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">Simple tiers, clear splits, no hidden catches.</h1>
          <div className="pulse-underline mt-6" />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Choose the membership that matches your ambition, then plug into roles and candidates with transparent earning potential.
          </p>
        </header>

        {/* Tier Strip */}
        <section className="glass-card p-6 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/5">
          <p className="text-xs text-gray-400 max-w-md italic">RecXchange uses a tiered membership system so the tools scale with you.</p>
          <div className="flex flex-wrap gap-2">
            {tiers.map(t => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">{t}</span>
            ))}
          </div>
        </section>

        {/* High Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { t: "Entry", d: "Get in, get moving. Best for solo recruiters testing the waters." },
            { t: "Lite", d: "Build a consistent desk. Designed for recruiters seeing traction." },
            { t: "Pro", d: "Scale your revenue. Priority access to premium roles." },
            { t: "Teams", d: "Power up a squad. Shared visibility and multiple seats." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-blue-500/20 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">{item.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>

        {/* Splits Logic */}
        <section className="glass-card p-8 rounded-[2.5rem] border-white/5">
          <h2 className="text-2xl font-bold text-white mb-4">How splits work on RecXchange.</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-2xl">You always know what you stand to earn before you commit. Collaboration happens on pre-agreed digital contracts.</p>
          
          <div className="space-y-4">
            {scenarios.map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-300">{s.title}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.math}</p>
                </div>
                <span className="text-sm font-bold gradient-text">{s.result}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center">
            <p className="text-[10px] text-gray-400 mb-2">Want to simulate your own placements?</p>
            <Link href="/recruiter-roles" className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:underline">Open Split Fee Calculator →</Link>
          </div>
        </section>

        {/* Root Footer */}
        <div className="mt-16 glass-card py-4 px-8 rounded-full border-white/10 flex flex-wrap justify-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <Link href="/recruiter-candidates" className="hover:text-blue-400">Fill Roles</Link>
          <Link href="/recruiter-roles" className="hover:text-purple-400">Post Roles</Link>
          <Link href="/deal-protection" className="hover:text-white">Deal Protection</Link>
        </div>
      </div>
    </main>
  );
}
