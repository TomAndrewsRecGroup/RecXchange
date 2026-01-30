"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AccountManagement() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Account Management</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            One point of contact. <br/><span className="gradient-text">Infinite recruiter capacity.</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Instead of managing dozens of agency relationships, you work with one account manager who orchestrates the RecXchange network behind the scenes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Infographic */}
          <div className="glass-card p-12 rounded-[2.5rem] border-white/5 flex flex-col items-center gap-10">
            {/* Recruiters Cluster */}
            <div className="grid grid-cols-4 gap-3 opacity-40">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-white/20 bg-white/5" />
              ))}
            </div>
            
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-full max-w-xs py-4 px-8 rounded-full border border-purple-500/50 bg-purple-500/10 text-center shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">RecX Account Manager</span>
            </motion.div>

            <div className="w-12 h-12 rounded-2xl border-2 border-white/20 flex items-center justify-center">
              <span className="text-[10px] font-bold">YOU</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h3 className="text-lg font-bold mb-4">Why this works better:</h3>
              <ul className="space-y-4">
                <li className="text-sm text-gray-400 leading-relaxed">
                  <strong className="text-white block mb-1">One Relationship, Many Specialisms.</strong>
                  Brief your AM on Tech, Sales, or Ops—they find the right recruiters in each segment.
                </li>
                <li className="text-sm text-gray-400 leading-relaxed">
                  <strong className="text-white block mb-1">Scale Without Admin.</strong>
                  You get the horsepower of a global network without the 50 emails a day.
                </li>
              </ul>
            </div>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#312fd7] to-[#c71df1] font-bold text-sm">
              Book an Intro Call
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
