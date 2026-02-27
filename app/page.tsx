'use client';

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
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 overflow-x-hidden">

      {/* Central Content */}
      <div className="relative z-10 text-center max-w-[1200px] w-full">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[9px] sm:text-[10px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            The Recruiter Xchange Engine
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-4 sm:mb-5 md:mb-[27px] tracking-tight leading-[1.1]">
            What describes you best?
          </h1>
          <div className="pulse-underline mb-6 sm:mb-8 md:mb-10" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 leading-relaxed px-2">
            Choose your professional path. Both save time.
          </p>
        </motion.header>

        {/* Two-path card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full mx-auto">

          {/* RECRUITER PATH */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => router.push('/recruiter')}
            className="glass-card p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[420px] sm:min-h-[450px] md:min-h-[480px] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />

            <div>
              <div className="px-3 sm:px-4 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 mb-6 sm:mb-8 md:mb-10 inline-block">
                Recruiter Mode
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-white group-hover:text-cyan-400 transition-colors">Recruiter</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                You're a recruiter. Post roles to find candidates. Or share candidates to find roles. Either way, <Link href="/collaboration" className="text-cyan-400 hover:underline">split fees</Link> with 15,000+ recruiters.
              </p>
              <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" /> Search 270M candidates when your pipeline is dry</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Up to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">70% split on RecX Direct</Link> roles</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> <Link href="/deal-protection" className="text-cyan-400 hover:underline">Split fee contracts</Link> protect both parties</li>
              </ul>
            </div>

            <button className="relative w-full mt-8 sm:mt-10 md:mt-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all">
              <span className="absolute inset-[1px] rounded-lg sm:rounded-xl md:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
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
            className="glass-card p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[420px] sm:min-h-[450px] md:min-h-[480px] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors" />

            <div>
              <div className="px-3 sm:px-4 py-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-widest text-fuchsia-400 mb-6 sm:mb-8 md:mb-10 inline-block">
                Hiring Team Mode
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-white group-hover:text-fuchsia-400 transition-colors">Hiring Manager</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                You're hiring talent. We <Link href="/hiring-manager-live" className="text-fuchsia-400 hover:underline">post your role</Link>. Thousands of recruiters compete to fill it. You pay one fee.
              </p>
              <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium">
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.8)]" /> 15,000+ recruiters see your role instantly</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> <Link href="/account-management" className="text-fuchsia-400 hover:underline">One point of contact</Link>. No recruiter spam.</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> <Link href="/hiring-manager-strategic" className="text-fuchsia-400 hover:underline">Test the market</Link> before you officially hire</li>
              </ul>
            </div>

            <button className="relative w-full mt-8 sm:mt-10 md:mt-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all">
              <span className="absolute inset-[1px] rounded-lg sm:rounded-xl md:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center">Enter Hiring Manager Path</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Root Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 glass-card py-1.5 sm:py-2 md:py-4 px-4 sm:px-8 md:px-10 rounded-full inline-flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 items-center text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em]"
        >
          <span className="opacity-60">Global Talent Infrastructure</span>
          <div className="h-4 w-[1px] bg-cyan-400/20 hidden md:block" />
          <Link href="/roles" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Preview Live Roles</Link>
          <Link href="/pricing" className="hover:text-fuchsia-400 transition-colors">View Pricing</Link>
          <Link href="/deal-protection" className="hover:text-cyan-400 transition-colors whitespace-nowrap">How Protection Works</Link>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors whitespace-nowrap hidden sm:inline">Latest Updates</Link>
          <Link href="/faq" className="hover:text-cyan-400 transition-colors whitespace-nowrap hidden sm:inline">Common Questions</Link>
        </motion.div>

        {/* Additional Contextual Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto px-4"
        >
          <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed text-center">
            Join our <Link href="/blog" className="text-cyan-400 hover:underline">recruiter community</Link> with access to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">270M candidate profiles</Link>. Learn <Link href="/collaboration" className="text-cyan-400 hover:underline">how split fees work</Link>, explore our <Link href="/pricing" className="text-fuchsia-400 hover:underline">transparent pricing tiers</Link>, or read success stories on our <Link href="/blog" className="text-cyan-400 hover:underline">blog</Link>. Questions? Check our <Link href="/faq" className="text-cyan-400 hover:underline">FAQ</Link> or <Link href="/contact" className="text-cyan-400 hover:underline">contact us</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
