"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerStrategic() {
  const milestones = [
    { time: "0-30 Days", title: "Market Insight", desc: "We map the talent pool, locations, and salary bands for your upcoming headcount." },
    { time: "30-60 Days", title: "Network Pre-Warming", desc: "We identify and gently approach relevant candidates to position your brand." },
    { time: "60-90 Days", title: "Launch-Ready Pipelines", desc: "Shortlists are ready the moment your requisition is officially signed off." }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-16">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Upcoming Roles — Strategic Support</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Pre-warm the market <br/><span className="gradient-text">before you even raise a requisition.</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6">
            We map the talent, salary bands, and timelines ahead of time so your launches feel calm, not reactive.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8">
          <div className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold mb-10">Strategic Hiring Timeline</h2>
            <div className="relative pl-8 border-l border-white/10 space-y-12">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-600 border-4 border-black" />
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{m.time}</span>
                  <h3 className="text-lg font-bold text-white my-1">{m.title}</h3>
                  <p className="text-sm text-gray-500">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h3 className="text-white font-bold mb-4">What you receive:</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>• Market mapping decks</li>
                <li>• Pre-warmed candidate shortlists</li>
                <li>• Salary & feasibility reports</li>
              </ul>
            </div>
            <button className="w-full py-5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all">
              Book a Strategic Planning Session
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
