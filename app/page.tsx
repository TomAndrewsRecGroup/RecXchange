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
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-28 overflow-x-hidden">

      {/* Central Content */}
      <div className="relative z-10 text-center max-w-[1200px] w-full">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.5em] text-cyan-400/70 mb-5 sm:mb-7 md:mb-10 font-black">
            The Recruiter Xchange Engine
          </span>
          <h1 className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black gradient-text mb-6 sm:mb-7 md:mb-9 tracking-[-0.02em] leading-[1.05] px-2">
            What describes you best?
          </h1>
          <div className="pulse-underline mb-8 sm:mb-10 md:mb-14" />
          <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20 leading-relaxed px-2 font-medium">
            Choose your professional path. Both save time.
          </p>
        </motion.header>

        {/* Two-path card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 md:gap-12 w-full mx-auto mb-16 sm:mb-20 md:mb-24">

          {/* RECRUITER PATH */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => router.push('/recruiter')}
            className="glass-card p-7 sm:p-9 md:p-11 lg:p-14 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col justify-between items-start text-left min-h-[460px] sm:min-h-[500px] md:min-h-[540px] cursor-pointer group relative overflow-hidden border-2 border-white/5 hover:border-cyan-400/20 transition-all"
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 blur-[90px] rounded-full group-hover:bg-cyan-500/25 transition-colors" />

            <div>
              <div className="px-4 sm:px-5 py-1.5 rounded-full border-2 border-cyan-400/40 bg-cyan-400/15 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400 mb-7 sm:mb-9 md:mb-12 inline-block shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                Recruiter Mode
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 sm:mb-6 md:mb-7 text-white group-hover:text-cyan-400 transition-colors leading-tight">Recruiter</h2>
              <p className="text-gray-400 text-[14px] sm:text-[15px] md:text-base lg:text-lg mb-7 sm:mb-8 md:mb-10 leading-relaxed font-medium">
                You're a recruiter. Post roles to find candidates. Or share candidates to find roles. Either way, <Link href="/collaboration" className="text-cyan-400 hover:underline font-bold">split fees</Link> with 15,000+ recruiters.
              </p>
              <ul className="space-y-4 sm:space-y-5 md:space-y-6 text-[12px] sm:text-[13px] md:text-sm text-gray-500 font-semibold">
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.9)]" /> Search 270M candidates when your pipeline is dry</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.7)]" /> Up to <Link href="/why-recxchange" className="text-cyan-400 hover:underline font-bold">70% split on RecX Direct</Link> roles</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.7)]" /> <Link href="/deal-protection" className="text-cyan-400 hover:underline font-bold">Split fee contracts</Link> protect both parties</li>
              </ul>
            </div>

            <button className="relative w-full mt-10 sm:mt-12 md:mt-14 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl md:rounded-[1.5rem] border-2 border-white/20 bg-black/50 overflow-hidden group/btn font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] transition-all hover:border-cyan-400/50">
              <span className="absolute inset-[2px] rounded-xl sm:rounded-2xl md:rounded-[1.4rem] bg-black/80 group-hover/btn:bg-transparent transition-colors" />
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
            className="glass-card p-7 sm:p-9 md:p-11 lg:p-14 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col justify-between items-start text-left min-h-[460px] sm:min-h-[500px] md:min-h-[540px] cursor-pointer group relative overflow-hidden border-2 border-white/5 hover:border-fuchsia-400/20 transition-all"
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-fuchsia-500/15 blur-[90px] rounded-full group-hover:bg-fuchsia-500/25 transition-colors" />

            <div>
              <div className="px-4 sm:px-5 py-1.5 rounded-full border-2 border-fuchsia-400/40 bg-fuchsia-400/15 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-fuchsia-400 mb-7 sm:mb-9 md:mb-12 inline-block shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                Hiring Team Mode
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 sm:mb-6 md:mb-7 text-white group-hover:text-fuchsia-400 transition-colors leading-tight">Hiring Manager</h2>
              <p className="text-gray-400 text-[14px] sm:text-[15px] md:text-base lg:text-lg mb-7 sm:mb-8 md:mb-10 leading-relaxed font-medium">
                You're hiring talent. We <Link href="/hiring-manager-live" className="text-fuchsia-400 hover:underline font-bold">post your role</Link>. Thousands of recruiters compete to fill it. You pay one fee.
              </p>
              <ul className="space-y-4 sm:space-y-5 md:space-y-6 text-[12px] sm:text-[13px] md:text-sm text-gray-500 font-semibold">
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(255,0,255,0.9)]" /> 15,000+ recruiters see your role instantly</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.7)]" /> <Link href="/account-management" className="text-fuchsia-400 hover:underline font-bold">One point of contact</Link>. No recruiter spam.</li>
                <li className="flex items-center gap-3 sm:gap-4"><span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.7)]" /> <Link href="/hiring-manager-strategic" className="text-fuchsia-400 hover:underline font-bold">Test the market</Link> before you officially hire</li>
              </ul>
            </div>

            <button className="relative w-full mt-10 sm:mt-12 md:mt-14 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl md:rounded-[1.5rem] border-2 border-white/20 bg-black/50 overflow-hidden group/btn font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] transition-all hover:border-fuchsia-400/50">
              <span className="absolute inset-[2px] rounded-xl sm:rounded-2xl md:rounded-[1.4rem] bg-black/80 group-hover/btn:bg-transparent transition-colors" />
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
          className="glass-card py-1.5 sm:py-2 md:py-4 px-4 sm:px-8 md:px-10 rounded-full inline-flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 items-center text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em]"
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
          className="mt-10 sm:mt-12 md:mt-14 max-w-3xl mx-auto px-4"
        >
          <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed text-center">
            Join our <Link href="/blog" className="text-cyan-400 hover:underline">recruiter community</Link> with access to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">270M candidate profiles</Link>. Learn <Link href="/collaboration" className="text-cyan-400 hover:underline">how split fees work</Link>, explore our <Link href="/pricing" className="text-fuchsia-400 hover:underline">transparent pricing tiers</Link>, or read success stories on our <Link href="/blog" className="text-cyan-400 hover:underline">blog</Link>. Questions? Check our <Link href="/faq" className="text-cyan-400 hover:underline">FAQ</Link> or <Link href="/contact" className="text-cyan-400 hover:underline">contact us</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
