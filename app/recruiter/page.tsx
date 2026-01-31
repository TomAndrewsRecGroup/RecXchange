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
</div>
        {/* 3. Main Diagnostic Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Option A: Fill Roles (Blue) */}
          <Link href="/recruiter-roles" className="group h-full">
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
                <h3 className="text-2xl font-bold text-white mb-4">I need candidates</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  You have signed roles and need candidates. Post to the Xchange Engine and let partner recruiters bring the candidates to you.
                </p>
                <div className="space-y-3">
                  {["Instant AI Shortlisting", "Verified Recruiter Network", "Clients Protected"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <div className="w-1 h-1 rounded-full bg-blue-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">80%+ Matched Candidates, straight to you.</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </motion.div>
          </Link>

          {/* Option B: Post Roles (Purple) */}
          <Link href="/recruiter-with-candidates" className="group h-full">
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
                <h3 className="text-2xl font-bold text-white mb-4">I need roles</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  You have elite talent but need roles to fill. Post to the Xchange Engine and let partner recruiters bring the roles to you.
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
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Data protected until your ready</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </motion.div>
          </Link>
        </section>

          
          <div className="mt-8 text-center">
             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
               RecXchange Root System — Version 2026.1
             </p>
          </div>
    </footer>
    </main>
  )};
