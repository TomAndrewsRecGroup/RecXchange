"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecruiterDiagnostic() {
  const panelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">
      
      {/* 1. Permanent Glass Nav (Consistent with Home) */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">RecXchange</Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="text-white border-b border-[#312fd7] pb-1">Recruiter ▾</button>
            <button className="text-gray-400 hover:text-white transition-colors">Hiring Manager ▾</button>
            <button className="text-gray-400 hover:text-white transition-colors">Roles</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-5 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-all">
              Login
            </button>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-sm font-semibold hover:opacity-90 transition-all p-[1px]">
              <div className="bg-black rounded-full px-5 py-2">
                <span className="gradient-text">Get Started</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Background Overlays (Delivery Network focused) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* 3. Central Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="text-center mb-10">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-bold">
            For Recruiters — Built by Recruiters
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            What is your priority today?
          </h1>
          <div className="pulse-underline mt-4" />
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-6">
            Tell us what matters right now and we’ll route you to the right tools and roles.
          </p>
        </header>

        {/* 4. Main Diagnostic Card */}
        <section className="glass-card w-full rounded-[2.5rem] p-8 md:p-12 border-white/5 relative overflow-hidden">
          {/* Step Label */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">
            Step 1 — Choose your focus
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-8">
            What do you need to move first: jobs or candidates?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Fill Roles Option */}
            <Link href="/recruiter-candidates">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-3xl p-6 flex flex-col justify-between bg-white/[0.03] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Fill Roles (I have the jobs)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    You’ve got signed roles and need high-quality candidates fast. Plug into 270M+ profiles.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Search 270M+ profiles", "AI matching engine", "Live match feed"].map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-center gap-2 font-medium uppercase tracking-tight">
                        <span className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-end px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-blue-400 uppercase">
                  Find Candidates
                </div>
              </motion.div>
            </Link>

            {/* Post Roles Option */}
            <Link href="/recruiter-roles">
              <motion.div 
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-white/10 rounded-3xl p-6 flex flex-col justify-between bg-white/[0.03] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Post Roles (I have candidates)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    You’ve got candidates ready. Distribute roles to the Engine and earn from splits.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Upload to Xchange Engine", "Auto-match candidates", "Track split fees"].map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-center gap-2 font-medium uppercase tracking-tight">
                        <span className="w-1 h-1 bg-purple-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-end px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-bold text-purple-400 uppercase">
                  Post Roles & Collaborate
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Context Strip */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>You can change your focus anytime — clients, candidates, or both.</p>
            <Link href="/deal-protection" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30">
              Want to understand how deals are protected?
            </Link>
          </div>
        </section>

        {/* 5. Root "Vines" Hint */}
        <div className="mt-12 w-full max-w-4xl relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="glass-card mt-[-0.5px] rounded-b-2xl py-4 flex flex-col items-center gap-3">
            <p className="text-[10px] text-gray-500 text-center max-w-lg leading-relaxed">
              This is one branch of the RecXchange Root System. Every recruiter path connects to roles, candidates, deal protection, and pricing.
            </p>
            <div className="flex gap-6 items-center">
              <Link href="/recx-direct" className="text-[10px] text-blue-400 font-bold hover:brightness-125 transition-all uppercase tracking-widest">
                See RecX Direct roles
              </Link>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <Link href="/pricing-and-splits" className="text-[10px] text-purple-400 font-bold hover:brightness-125 transition-all uppercase tracking-widest">
                View pricing and splits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
