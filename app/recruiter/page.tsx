"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecruiterDiagnostic() {
  const panelVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden mesh-background">
      
      {/* 1. Permanent Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-3xl px-8 py-4 flex items-center justify-between border-white/5 shadow-2xl shadow-black/50">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
            RecX<span className="text-blue-500 font-black italic">change</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
            <button className="text-white border-b-2 border-blue-500 pb-1">Recruiter Path</button>
            <button className="text-gray-500 hover:text-white transition-colors">Hiring Manager</button>
            <button className="text-gray-500 hover:text-white transition-colors">Live Roles</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              Login
            </button>
            <button className="px-1 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 transition-all hover:scale-105 active:scale-95">
              <div className="bg-black rounded-[10px] px-6 py-2">
                <span className="text-[10px] font-black uppercase tracking-widest gradient-text">Get Started</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">
              Global Recruiter Protocol Active
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            How would you like to <br/>
            <span className="gradient-text">scale your desk today?</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            RecXchange is a modular ecosystem. Tell us your current bottleneck and we’ll route you to the specific tools, roles, or candidate pools you need.
          </p>
        </header>

        {/* 3. Main Diagnostic Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Option A: Fill Roles (Blue) */}
          <Link href="/recruiter-candidates" className="group h-full">
            <motion.div 
              variants={panelVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="h-full glass-card rounded-[3rem] p-10 flex flex-col justify-between border-white/5 relative overflow-hidden bg-white/[0.02]"
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">I have the mandates</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  You have signed roles and need a candidate injection. Instantly tap into our verified pool of 270M+ profiles and live partner submissions.
                </p>
                <div className="space-y-3">
                  {["Instant AI Shortlisting", "270M+ Global Profiles", "Verified Match Scores"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <div className="w-1 h-1 rounded-full bg-blue-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Find Candidates</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </motion.div>
          </Link>

          {/* Option B: Post Roles (Purple) */}
          <Link href="/recruiter-roles" className="group h-full">
            <motion.div 
              variants={panelVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="h-full glass-card rounded-[3rem] p-10 flex flex-col justify-between border-white/5 relative overflow-hidden bg-white/[0.02]"
            >
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">I have the candidates</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  You have elite talent but need the right mandate. Post to the Xchange Engine and let partner recruiters bring the client fees to you.
                </p>
                <div className="space-y-3">
                  {["Collaborative Split Fees", "Automated SFAs", "Circle of Trust Privacy"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <div className="w-1 h-1 rounded-full bg-purple-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Collaborate & Split</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </motion.div>
          </Link>
        </section>

        {/* 4. Cross-Path Footer */}
        <footer className="mt-16 w-full max-w-4xl">
          <div className="glass-card rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/5 bg-black/40">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-sm mb-1">New to Split-Fee Economics?</p>
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">Protecting your deals is our core priority.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/deal-protection" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                Deal Protection Rules
              </Link>
              <Link href="/pricing-and-splits" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                Split Calculator
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
               RecXchange Root System — Version 2026.1
             </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
