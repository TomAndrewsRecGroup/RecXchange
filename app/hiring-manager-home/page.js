"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerHome() {
  const panelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 mesh-background">
      
      {/* 1. Permanent Glass Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/recruiter" className="text-gray-400 hover:text-white transition-colors">Recruiter</Link>
            <button className="text-white border-b-2 border-purple-500 pb-1">Hiring Manager ▾</button>
            <button className="text-gray-400 hover:text-white transition-colors">Roles</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Hiring Manager Mode
            </div>
            <button className="px-5 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-all">Login</button>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-sm font-semibold hover:opacity-90">Get Started</button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Background Overlays (Capacity & Growth focused) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full opacity-40" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* 3. Central Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="text-center mb-10">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-bold">
            For Hiring Managers & Talent Leaders
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            How can we support your growth?
          </h1>
          <div className="pulse-underline mt-4" />
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-6">
            Tell us if you’re firefighting live roles or planning ahead — we’ll route you to the right model and team.
          </p>
        </header>

        {/* 4. Diagnostic Card */}
        <section className="glass-card w-full rounded-[2.5rem] p-8 md:p-12 border-white/5">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
            Step 1 — Choose your priority
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-10">
            Are you solving a live hiring problem or planning ahead?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Urgent Support */}
            <Link href="/hiring-manager-live">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-3xl p-6 flex flex-col justify-between bg-white/[0.02] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Support on Live Roles (Urgent)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    You’ve got open roles now and need credible shortlists, fast. One brief, shared globally.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Single Brief Distribution", "Transparent Split Terms", "Single Point of Contact"].map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-center gap-2 font-semibold uppercase tracking-tight">
                        <span className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-end px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Get Live Role Support
                </div>
              </motion.div>
            </Link>

            {/* Strategic Planning */}
            <Link href="/hiring-manager-strategic">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-3xl p-6 flex flex-col justify-between bg-white/[0.02] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Upcoming Roles (Strategic)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Map the market, pre-warm talent pipelines, and get roles 'ready to go' before sign-off.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Market Mapping Insights", "Pre-warmed Pipelines", "Salary & Feasibility Data"].map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-center gap-2 font-semibold uppercase tracking-tight">
                        <span className="w-1 h-1 bg-purple-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-end px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                  Plan My Hiring Strategy
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>You can move between urgent and strategic support at any time.</p>
            <Link href="/account-management" className="text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4 decoration-purple-400/30">
              Want a single point of contact?
            </Link>
          </div>
        </section>

        {/* 5. Root Footer Strip */}
        <div className="mt-16 w-full max-w-4xl px-4">
           <div className="glass-card py-4 px-8 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="font-normal normal-case">One root system powering your hiring.</span>
            <div className="flex gap-6">
              <Link href="/hiring-manager-live" className="hover:text-blue-400 transition-colors">Live Support</Link>
              <Link href="/hiring-manager-strategic" className="hover:text-purple-400 transition-colors">Strategic</Link>
              <Link href="/account-management" className="hover:text-white transition-colors">Account Management</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
