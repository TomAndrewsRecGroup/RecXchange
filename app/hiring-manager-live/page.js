"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerLive() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Live Roles — Urgent Support</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight max-w-3xl">
            One role. One process. <br/><span className="gradient-text">Hundreds of recruiters</span> working for you.
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Instead of juggling multiple agencies, you brief once and our network of vetted recruiters gets to work under a single, controlled framework.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: How it works */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-6">From urgent role to shortlist.</h2>
              <div className="space-y-6">
                {[
                  "You submit a brief with role details, timelines, and fees.",
                  "We broadcast it to the right segment of our verified recruiter network.",
                  "Shortlists and offers flow back through a single point of contact."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400 bg-blue-500/10">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-400">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="pt-6 border-t border-white/5">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
                Book a Virtual Role Review
              </button>
              <p className="text-center mt-4 text-[10px] text-gray-500 italic">
                We’ll walk through your live roles and show you how the broadcast works.
              </p>
            </div>
          </div>

          {/* Right: Broadcast Map Visual */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col items-center justify-center min-h-[400px]">
            <span className="text-[10px] uppercase font-bold text-gray-500 mb-8 self-start">Broadcast Map (Concept)</span>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Central Node */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="z-10 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-400/30 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
              >
                <span className="text-[9px] font-bold uppercase">Your Role</span>
              </motion.div>

              {/* Orbiting Recruiter Nodes */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="relative w-full h-full"
                    style={{ rotate: angle }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-[1px] h-20 bg-gradient-to-t from-blue-500/50 to-transparent" />
                      <div className="w-4 h-4 rounded-full border border-white/20 bg-white/5" />
                      <span className="text-[8px] text-gray-600 mt-1 whitespace-nowrap">Recruiter</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-[10px] text-gray-500 text-center max-w-xs">
              In the platform, you’ll see who is engaged, who has submitted, and candidate progress in real-time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
