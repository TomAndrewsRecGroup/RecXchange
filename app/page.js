"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function EntryWall() {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-x-hidden">
      
      {/* 1. Permanent Glass Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">RecXchange</div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button className="hover:text-white transition-colors">Recruiter ▾</button>
            <button className="hover:text-white transition-colors">Hiring Manager ▾</button>
            <button className="hover:text-white transition-colors">Roles</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-5 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-all">
              Login
            </button>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-sm font-semibold hover:opacity-90 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Central Content */}
      <div className="relative z-10 text-center mt-20">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-semibold">
          The Recruiter Xchange
        </span>
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
          What describes you best?
        </h1>
        <div className="pulse-underline mb-8" />
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-16">
          Choose your path and we’ll map the next steps for you.
        </p>

        {/* 4. Two-path card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mx-auto">
          
          {/* Recruiter Card */}
          <motion.div 
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="glass-card p-10 rounded-[2.5rem] flex flex-col justify-between items-start text-left min-h-[400px] cursor-pointer group"
          >
            <div>
              <div className="px-4 py-1 rounded-full border border-[#312fd7]/30 bg-[#312fd7]/10 text-[10px] font-bold uppercase text-[#312fd7] mb-8 inline-block">
                For Recruiters
              </div>
              <h2 className="text-3xl font-bold mb-4">Recruiter</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                I want roles, candidates, and collaboration that actually pays.
              </p>
              <ul className="space-y-4 text-xs text-gray-500 font-medium">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#312fd7]" /> Fill live roles with 270M+ profiles.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#312fd7]" /> Post roles to the Xchange Engine.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#312fd7]" /> Protect every deal and split.</li>
              </ul>
            </div>
            <button className="w-full mt-10 py-4 rounded-xl border border-white/10 bg-white/5 font-bold text-sm hover:border-[#312fd7]/50 transition-all">
              Enter Recruiter Path
            </button>
          </motion.div>

          {/* Hiring Manager Card */}
          <motion.div 
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="glass-card p-10 rounded-[2.5rem] flex flex-col justify-between items-start text-left min-h-[400px] cursor-pointer group"
          >
            <div>
              <div className="px-4 py-1 rounded-full border border-[#c71df1]/30 bg-[#c71df1]/10 text-[10px] font-bold uppercase text-[#c71df1] mb-8 inline-block">
                For Hiring Teams
              </div>
              <h2 className="text-3xl font-bold mb-4">Hiring Manager</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                I want a single partner to scale roles globally, fast.
              </p>
              <ul className="space-y-4 text-xs text-gray-500 font-medium">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c71df1]" /> Broadcast urgent roles to 1000+ recruiters.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c71df1]" /> Pre-warm talent pipelines before you hire.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c71df1]" /> One account manager, full visibility.</li>
              </ul>
            </div>
            <button className="w-full mt-10 py-4 rounded-xl border border-white/10 bg-white/5 font-bold text-sm hover:border-[#c71df1]/50 transition-all">
              Enter Hiring Manager Path
            </button>
          </motion.div>
        </div>

        {/* 5. Bottom Root Hint */}
        <div className="mt-16 glass-card px-8 py-3 rounded-full flex gap-6 items-center text-[10px] text-gray-500">
          <span>Every path connects. Switch journeys at any time.</span>
          <div className="h-4 w-[1px] bg-white/10" />
          <a href="#" className="hover:text-white transition-colors">Preview Roles</a>
          <a href="#" className="hover:text-white transition-colors">See how RecXchange works</a>
        </div>
      </div>
    </main>
  );
}
