"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerHome() {
  // Explicitly typing Framer Motion variants for TSX
  const panelVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      borderColor: "rgba(255, 255, 255, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">
      
      {/* 1. Persistent Glass Header - Persona Specific */}
      <header className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/recruiter-roles" className="text-gray-500 hover:text-white transition-colors">Recruiter Path</Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <button className="text-purple-400 border-b border-purple-400/50 pb-0.5">Hiring Manager</button>
            <Link href="/deal-protection" className="text-gray-500 hover:text-white transition-colors">Trust Layer</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-[9px] font-bold text-purple-400 uppercase tracking-widest">
              Manager Mode
            </div>
            <Link href="https://app.recxchange.io/login" className="px-5 py-2 rounded-full border border-white/10 text-xs font-bold hover:bg-white/5 transition-all">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Visual Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-label mb-4 block"
          >
            Tailored Talent Solutions
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
            How can we support <br/> 
            <span className="gradient-text">your growth?</span>
          </h1>
          <div className="pulse-underline mt-4 mx-auto" />
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Whether you are firefighting urgent hires or building a strategic roadmap for next quarter, we have the specialized engine to handle it.
          </p>
        </header>

        {/* 3. Diagnostic Card */}
        <section className="glass-card w-full rounded-[3rem] p-10 md:p-14 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none" />
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
            Diagnostic — Select your priority
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight">
            Select the path that matches your current timeline:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* URGENT SUPPORT */}
            <Link href="/hiring-manager-live" className="group">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Urgent Support</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Open roles that need immediate shortlists. Broadcast your brief to specialized recruiters today.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {["Single Brief Distribution", "Instant Fee Alignment"].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full py-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-[10px] font-bold text-blue-400 uppercase tracking-widest text-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                  Resolve Live Roles
                </div>
              </motion.div>
            </Link>

            {/* STRATEGIC PLANNING */}
            <Link href="/hiring-manager-strategic" className="group">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Strategic Planning</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Map the market and pre-warm talent pools before you hire. Build a pipeline for upcoming sign-offs.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {["Market Mapping Insights", "Pipeline Brand Warming"].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-purple-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full py-4 rounded-xl border border-purple-500/30 bg-purple-500/5 text-[10px] font-bold text-purple-400 uppercase tracking-widest text-center group-hover:bg-purple-500 group-hover:text-white transition-all">
                  Build Hiring Roadmap
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-14 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-gray-500">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Switch between models at any time.
            </p>
            <Link href="/account-management" className="text-purple-400 hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center gap-2">
              Learn about Managed Services <span className="text-lg">→</span>
            </Link>
          </div>
        </section>

        {/* 4. Footer Strip */}
        <footer className="mt-16 w-full max-w-4xl px-4">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            <span className="opacity-60">Global Talent Infrastructure</span>
            <div className="flex gap-8">
              <Link href="/hiring-manager-live" className="hover:text-blue-400">Urgent</Link>
              <Link href="/hiring-manager-strategic" className="hover:text-purple-400">Strategic</Link>
              <Link href="/account-management" className="hover:text-white">Enterprise</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
