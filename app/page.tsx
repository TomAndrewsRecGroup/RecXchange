'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Note: Metadata export doesn't work with 'use client'
// Metadata is handled by layout.tsx

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
      <div className="relative z-10 text-center max-w-[1200px] w-full">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            The Recruiter Xchange Engine
          </span>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-[27px] tracking-tight">
            What describes you best?
          </h1>
          <div className="pulse-underline mb-10" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Choose your professional path. Both save time.
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
                You're a recruiter. Post roles to find candidates. Or share candidates to find roles. Either way, <Link href="/collaboration" className="text-cyan-400 hover:underline">split fees</Link> with 15,000+ recruiters.
              </p>
              <ul className="space-y-5 text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" /> Search 270M candidates when your pipeline is dry</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Up to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">70% split on RecX Direct</Link> roles</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> <Link href="/deal-protection" className="text-cyan-400 hover:underline">Split fee contracts</Link> protect both parties</li>
              </ul>
            </div>

            <button className="relative w-full mt-12 py-5 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all">
              <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center">Enter Recruiter Path</span>
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
                You're hiring talent. We <Link href="/hiring-manager-live" className="text-fuchsia-400 hover:underline">post your role</Link>. Thousands of recruiters compete to fill it. You pay one fee.
              </p>
              <ul className="space-y-5 text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.8)]" /> 15,000+ recruiters see your role instantly</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> <Link href="/account-management" className="text-fuchsia-400 hover:underline">One point of contact</Link>. No recruiter spam.</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> <Link href="/hiring-manager-strategic" className="text-fuchsia-400 hover:underline">Test the market</Link> before you officially hire</li>
              </ul>
            </div>

            <button className="relative w-full mt-12 py-5 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all">
              <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center">Enter Hiring Manager Path</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Root Hint - ENHANCED with more contextual links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 glass-card px-10 py-4 rounded-full inline-flex flex-wrap justify-center gap-8 items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest"
        >
          <span className="opacity-60">Global Talent Infrastructure</span>
          <div className="h-4 w-[1px] bg-cyan-400/20 hidden md:block" />
          <Link href="/roles" className="hover:text-cyan-400 transition-colors">Preview Live Roles</Link>
          <Link href="/pricing" className="hover:text-fuchsia-400 transition-colors">View Pricing</Link>
          <Link href="/deal-protection" className="hover:text-cyan-400 transition-colors">How Protection Works</Link>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors">Latest Updates</Link>
          <Link href="/faq" className="hover:text-cyan-400 transition-colors">Common Questions</Link>
        </motion.div>

        {/* Additional Contextual Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <p className="text-gray-500 text-sm leading-relaxed text-center">
            Join our <Link href="/blog" className="text-cyan-400 hover:underline">recruiter community</Link> with access to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">270M candidate profiles</Link>. Learn <Link href="/collaboration" className="text-cyan-400 hover:underline">how split fees work</Link>, explore our <Link href="/pricing" className="text-fuchsia-400 hover:underline">transparent pricing tiers</Link>, or read success stories on our <Link href="/blog" className="text-cyan-400 hover:underline">blog</Link>. Questions? Check our <Link href="/faq" className="text-cyan-400 hover:underline">FAQ</Link> or <Link href="/contact" className="text-cyan-400 hover:underline">contact us</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
