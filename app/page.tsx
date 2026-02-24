"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EntryWall() {
  const router = useRouter();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      translateY: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-x-hidden">

      {/* Central Content */}
      <div className="relative z-10 text-center max-w-6xl w-full">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            The Recruiter Xchange Engine
          </span>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 tracking-tight">
            What describes you best?
          </h1>
          <div className="pulse-underline mb-10" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Choose your professional path. We’ve built tailored ecosystems for both independent recruiters and corporate hiring teams.
          </p>
        </motion.header>

        {/* Two-path card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mx-auto">

          {/* RECRUITER PATH */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => router.push('/recruiter')}
            className="glass-card p-12 rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[480px] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />

            <div>
              <div className="px-4 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-10 inline-block">
                Recruiter Mode
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">Recruiter</h2>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                You are an independent recruiter or agency looking to scale your deal flow through collaboration.
              </p>
              <ul className="space-y-5 text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" /> Access 270M+ candidate profiles</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Share split fees with trusted partners</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Automated Split Fee Protection</li>
              </ul>
            </div>

            <button className="w-full mt-12 py-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-fuchsia-500 group-hover:text-white group-hover:border-transparent transition-all uppercase tracking-widest">
              Enter Recruiter Path
            </button>
          </motion.div>

          {/* HIRING MANAGER PATH */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => router.push('/hiring-manager-home')}
            className="glass-card p-12 rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[480px] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors" />

            <div>
              <div className="px-4 py-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 mb-10 inline-block">
                Hiring Team Mode
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-fuchsia-400 transition-colors">Hiring Manager</h2>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                You are looking to fill urgent roles or build strategic pipelines using a global network of specialists.
              </p>
              <ul className="space-y-5 text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.8)]" /> Broadcast roles to 15,000+ recruiters</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> One AM, zero administrative friction</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> Strategic market pre-warming</li>
              </ul>
            </div>

            <button className="w-full mt-12 py-5 rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/5 font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-fuchsia-500 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all uppercase tracking-widest">
              Enter Hiring Manager Path
            </button>
          </motion.div>
        </div>

        {/* Bottom Root Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 glass-card px-10 py-4 rounded-full inline-flex flex-wrap justify-center gap-8 items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest"
        >
          <span className="opacity-60">Global Talent Infrastructure</span>
          <div className="h-4 w-[1px] bg-cyan-400/20 hidden md:block" />
          <Link href="/roles" className="hover:text-cyan-400 transition-colors">Preview Live Roles</Link>
          <Link href="/deal-protection" className="hover:text-cyan-400 transition-colors">How Protection Works</Link>
        </motion.div>
      </div>
    </main>
  );
}
