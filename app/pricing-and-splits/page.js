"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    { name: "Entry", desc: "Get in, get moving.", best: "Solo recruiters testing the waters.", points: ["Low barrier to entry", "Access to core tools", "Community access"] },
    { name: "Lite", desc: "Build a consistent desk.", best: "Recruiters seeing traction and throughput.", points: ["More role/candidate data", "Better network visibility", "Increased throughput"] },
    { name: "Pro", desc: "Scale your revenue.", best: "Strong independent desks.", points: ["Higher access limits", "Priority role access", "Enhanced partner visibility"] },
    { name: "Teams", desc: "Power up a squad.", best: "Boutique agencies or pods.", points: ["Multiple shared seats", "Central oversight", "Individual autonomy"] }
  ];

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 mesh-background relative overflow-x-hidden">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/recruiter" className="hover:text-white transition-colors">Recruiter</Link>
            <Link href="/hiring-manager" className="hover:text-white transition-colors">Hiring Manager</Link>
            <Link href="/roles" className="hover:text-white transition-colors">Roles</Link>
          </div>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-sm font-semibold">Get Started</button>
        </div>
      </nav>

      {/* 2. Hero Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* 3. Hero Header */}
        <header className="text-center mb-16">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Commercial Layer — Pricing & Splits</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple tiers, clear splits, no hidden catches.</h1>
          <div className="pulse-underline mx-auto" />
          <p className="text-gray-400 max-w-2xl mx-auto mt-8 text-lg">
            Choose the membership that matches your ambition, then plug into roles, candidates, and collaborations with transparent earning potential.
          </p>
        </header>

        {/* 4. Section 1 — Tier Overview Strip */}
        <div className="glass-card p-8 rounded-[2rem] border-white/5 mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <p className="text-sm text-gray-400 leading-relaxed">
              RecXchange uses a tiered membership system so the tools and access scale with you — from getting started to running a full desk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Entry", "Lite", "Pro", "Teams"].map((tier) => (
              <div key={tier} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                {tier}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Section 2 — Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{tier.name} — {tier.desc}</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase mb-6 tracking-tighter">Best for: {tier.best}</p>
                <ul className="space-y-3 mb-8">
                  {tier.points.map((p, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-3">
                      <span className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[9px] text-gray-600 italic leading-tight">
                Features can evolve as we release new functionality, ensuring more earning power for members.
              </p>
            </motion.div>
          ))}
        </div>

        {/* 6. Section 3 — Splits Explained */}
        <section className="glass-card p-10 rounded-[2.5rem] border-white/5">
          <h2 className="text-2xl font-bold text-white mb-4">How splits work on RecXchange.</h2>
          <p className="text-gray-400 text-sm mb-10 max-w-2xl">
            When you collaborate on a role, your earnings come from clearly agreed split percentages on the placement fee. You always know what you stand to earn before you commit.
          </p>

          <div className="space-y-4">
            {[
              { label: "You own role, partner brings candidate", scenario: "20% fee on £80,000 salary, 50/50 split", result: "£8,000 each" },
              { label: "You bring candidate, partner owns role", scenario: "18% fee on £60,000 salary, 60/40 split", result: "£6,480 in your favor" },
              { label: "You own both, use sourcing support", scenario: "Agreed flat support fee or minor split", result: "Keep majority of the fee" }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm text-gray-300">{item.scenario}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold gradient-text">{item.result}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-300 font-medium">For a deeper feel, test the Split Fee Calculator on the Recruiter Roles page.</span>
            <Link href="/recruiter-roles" className="px-6 py-2 rounded-full border border-blue-500/50 text-[10px] font-bold text-blue-400 uppercase hover:bg-blue-500/10 transition-all">
              Open Calculator
            </Link>
          </div>
        </section>

        {/* 7. Root/Vines Connectivity Footer */}
        <div className="mt-20 glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 text-center md:text-left">
            Pricing & Splits sit at the centre of your RecXchange root system — feeding how you source, post roles, and protect deals.
          </p>
          <div className="flex gap-6">
            <Link href="/recruiter-candidates" className="text-[10px] text-blue-400 font-bold hover:text-white uppercase">Fill Roles</Link>
            <Link href="/recruiter-roles" className="text-[10px] text-purple-400 font-bold hover:text-white uppercase">Post Roles</Link>
            <Link href="/deal-protection" className="text-[10px] text-gray-300 font-bold hover:text-white uppercase underline">Deal Protection</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
