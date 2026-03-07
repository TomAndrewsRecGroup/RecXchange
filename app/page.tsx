'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LiveStats {
  roleCount: number;
  totalFees: number;
  averageFee: number;
}

export default function HomePage() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);
  const [scrollLocked, setScrollLocked] = useState(true);
  
  const [liveStats, setLiveStats] = useState<LiveStats>({
    roleCount: 0,
    totalFees: 0,
    averageFee: 0
  });

  useEffect(() => {
    async function fetchLiveStats() {
      try {
        const response = await fetch('/api/live-stats');
        const data = await response.json();
        setLiveStats(data);
      } catch (error) {
        setLiveStats({
          roleCount: 127,
          totalFees: 847392,
          averageFee: 6673
        });
      }
    }

    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 300000);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const unlockAndScroll = () => {
    setScrollLocked(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      document.getElementById('path-selection')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      translateY: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <main className="relative bg-[#0a0a0f] font-[family-name:var(--font-lexend)]">
      {/* SCREEN 1: HERO - Locked viewport height */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent animate-gradient" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-fuchsia-500/20 via-transparent to-transparent animate-gradient-reverse" />
          </div>
          
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-radial from-cyan-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full animate-float"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-radial from-fuchsia-500/20 via-fuchsia-500/10 to-transparent blur-[120px] rounded-full animate-float-delayed"
          />
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,214,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,214,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 border border-cyan-400/20 backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_0_30px_rgba(6,214,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-cyan-300 tracking-wider">LIVE PLATFORM</span>
          </motion.div>
          
          {/* H1 - Tighter sizing for mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(6,214,255,0.4))'
            }}
          >
            RecXchange
          </motion.h1>

          {/* H2 - Compact */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl md:text-2xl font-semibold tracking-wide mb-5 sm:mb-6"
            style={{
              background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(6,214,255,0.3)'
            }}
          >
            The Recruiters Xchange
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-24 sm:w-32 h-[2px] mx-auto mb-5 sm:mb-7"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 animate-pulse" />
          </motion.div>

          {/* H3 - Tighter, more compact */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-light px-2"
          >
            RecXchange is a recruiter collaboration platform where 15,000+ recruiters 
            split fees (50/50 to 70%) on placements. Post roles to find candidates, 
            or share candidates to find roles. Access 270M candidate profiles with 
            AI-powered matching through our Xchange Engine.
          </motion.h3>

          {/* Compact Live Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            {/* Live Roles */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
              <div className="relative glass-card p-3 sm:p-4 rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,214,255,0.3)]">
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,214,255,0.8)]"></span>
                  </span>
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] font-bold text-cyan-400/70 mb-1 sm:mb-2">Live Roles</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 group-hover:text-cyan-300 transition-colors">
                  {formatNumber(liveStats.roleCount)}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-cyan-400">Active</div>
              </div>
            </div>

            {/* Total Fees */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
              <div className="relative glass-card p-3 sm:p-4 rounded-xl overflow-hidden border border-fuchsia-500/30 hover:border-fuchsia-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]">
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-400 shadow-[0_0_8px_rgba(255,0,255,0.8)]"></span>
                  </span>
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] font-bold text-fuchsia-400/70 mb-1 sm:mb-2">Total Fees</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 group-hover:text-fuchsia-300 transition-colors">
                  {formatCurrency(liveStats.totalFees)}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-fuchsia-400">Available</div>
              </div>
            </div>

            {/* Average Fee */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
              <div className="relative glass-card p-3 sm:p-4 rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  </span>
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] font-bold text-purple-400/70 mb-1 sm:mb-2">Avg Fee</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 group-hover:text-purple-300 transition-colors">
                  {formatCurrency(liveStats.averageFee)}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-purple-400">Per Deal</div>
              </div>
            </div>
          </motion.div>

          {/* Compact Stats Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 glass-card px-3 py-1.5 rounded-full border border-emerald-500/20 hover:border-emerald-400/40 transition-all group hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-200 group-hover:text-emerald-300 transition-colors">15,000+ recruiters</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 glass-card px-3 py-1.5 rounded-full border border-cyan-500/20 hover:border-cyan-400/40 transition-all group hover:shadow-[0_0_15px_rgba(6,214,255,0.2)]">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(6,214,255,0.8)]"></span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">270M profiles</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 glass-card px-3 py-1.5 rounded-full border border-fuchsia-500/20 hover:border-fuchsia-400/40 transition-all group hover:shadow-[0_0_15px_rgba(255,0,255,0.2)]">
              <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(255,0,255,0.8)]"></span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-200 group-hover:text-fuchsia-300 transition-colors">70% splits</span>
            </div>
          </motion.div>

          {/* Compact Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={unlockAndScroll}
              className="relative group"
            >
              <span className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 animate-pulse"></span>
              <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></span>
              
              <span className="relative flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 rounded-xl font-black text-sm sm:text-base text-white group-hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(6,214,255,0.5)]">
                <span className="relative z-10">Start Here</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                
                <span className="absolute inset-0 rounded-xl overflow-hidden">
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></span>
                </span>
              </span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1, 0] }}
            transition={{ duration: 3, delay: 1, repeat: Infinity }}
            className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="text-cyan-400/60 text-[9px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <svg className="w-4 h-4 text-cyan-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* SCREEN 2: PATH SELECTION - Unlocked after button click */}
      <section 
        id="path-selection" 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fuchsia-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-6xl w-full">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-black mb-4 sm:mb-5"
              style={{
                background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              The Recruiter Xchange Engine
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 tracking-tight leading-[1.1]"
              style={{
                background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(6,214,255,0.3))'
              }}
            >
              What describes you best?
            </h2>
            <div className="relative w-32 sm:w-36 h-[2px] mx-auto mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-sm" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2 font-light">
              Choose your professional path. Both save time.
            </p>
          </motion.header>

          {/* Tighter two-path cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full mx-auto max-w-5xl px-4">
            {/* RECRUITER CARD - Tighter */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              onClick={() => router.push('/recruiter')}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-lg transition duration-300" />
              <div className="relative glass-card p-6 sm:p-8 rounded-[2.5rem] flex flex-col justify-between items-start text-left min-h-[400px] sm:min-h-[440px] overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,214,255,0.2)]">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent blur-[60px] rounded-full group-hover:from-cyan-500/25 transition-all duration-300" />

                <div className="w-full relative z-10">
                  <div className="px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300 mb-5 sm:mb-6 inline-block shadow-[0_0_15px_rgba(6,214,255,0.15)]">
                    Recruiter Mode
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-white group-hover:text-cyan-300 transition-colors">
                    Recruiter
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed font-light">
                    You're a recruiter. Post roles to find candidates. Or share candidates to find roles. Either way,{' '}
                    <Link href="/collaboration" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 hover:decoration-cyan-400 transition-colors inline-block font-medium">split fees</Link>{' '}
                    with 15,000+ recruiters.
                  </p>
                  <ul className="space-y-3 text-[11px] sm:text-xs md:text-sm text-gray-400 font-normal">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,214,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1">Search 270M candidates when your pipeline is dry</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,214,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1">Up to{' '}<Link href="/why-recxchange" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors inline-block">70% split on RecX Direct</Link>{' '}roles</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,214,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1"><Link href="/deal-protection" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors inline-block">Split fee contracts</Link>{' '}protect both parties</span>
                    </li>
                  </ul>
                </div>

                <button className="relative w-full mt-6 sm:mt-8 py-3.5 sm:py-4 rounded-xl border border-cyan-500/30 bg-black/40 overflow-hidden group/btn font-black text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-all hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,214,255,0.2)]">
                  <span className="absolute inset-[1px] rounded-xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Enter Recruiter Path</span>
                </button>
              </div>
            </motion.div>

            {/* HIRING MANAGER CARD - Tighter */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              onClick={() => router.push('/hiring-manager-home')}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-lg transition duration-300" />
              <div className="relative glass-card p-6 sm:p-8 rounded-[2.5rem] flex flex-col justify-between items-start text-left min-h-[400px] sm:min-h-[440px] overflow-hidden border border-fuchsia-500/20 group-hover:border-fuchsia-400/40 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,0,255,0.2)]">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-radial from-fuchsia-500/15 via-fuchsia-500/5 to-transparent blur-[60px] rounded-full group-hover:from-fuchsia-500/25 transition-all duration-300" />

                <div className="w-full relative z-10">
                  <div className="px-3 py-1 rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 text-[9px] font-black uppercase tracking-[0.18em] text-fuchsia-300 mb-5 sm:mb-6 inline-block shadow-[0_0_15px_rgba(255,0,255,0.15)]">
                    Hiring Team Mode
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-white group-hover:text-fuchsia-300 transition-colors">
                    Hiring Manager
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed font-light">
                    You're hiring talent. We{' '}
                    <Link href="/hiring-manager-live" className="text-fuchsia-300 hover:text-fuchsia-200 underline decoration-fuchsia-500/30 hover:decoration-fuchsia-400 transition-colors inline-block font-medium">post your role</Link>.
                    {' '}Thousands of recruiters compete to fill it. You pay one fee.
                  </p>
                  <ul className="space-y-3 text-[11px] sm:text-xs md:text-sm text-gray-400 font-normal">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(255,0,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1">15,000+ recruiters see your role instantly</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(255,0,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1"><Link href="/account-management" className="text-fuchsia-300 hover:text-fuchsia-200 underline decoration-fuchsia-500/30 transition-colors inline-block">One point of contact</Link>.{' '}No recruiter spam.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(255,0,255,0.8)] flex-shrink-0 mt-1.5" /> 
                      <span className="flex-1"><Link href="/hiring-manager-strategic" className="text-fuchsia-300 hover:text-fuchsia-200 underline decoration-fuchsia-500/30 transition-colors inline-block">Test the market</Link>{' '}before you officially hire</span>
                    </li>
                  </ul>
                </div>

                <button className="relative w-full mt-6 sm:mt-8 py-3.5 sm:py-4 rounded-xl border border-fuchsia-500/30 bg-black/40 overflow-hidden group/btn font-black text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-all hover:border-fuchsia-400/50 hover:shadow-[0_0_25px_rgba(255,0,255,0.2)]">
                  <span className="absolute inset-[1px] rounded-xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Enter Hiring Manager Path</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Compact Footer Badge */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 sm:mt-14 glass-card py-3 px-5 sm:px-8 rounded-full inline-flex flex-wrap justify-center gap-3 sm:gap-6 items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] border border-white/10"
          >
            <span className="text-gray-500">Global Talent Infrastructure</span>
            <div className="h-3 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent hidden md:block" />
            <Link href="/roles" className="text-gray-400 hover:text-cyan-300 transition-colors whitespace-nowrap">Live Roles</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-fuchsia-300 transition-colors">Pricing</Link>
            <Link href="/deal-protection" className="text-gray-400 hover:text-cyan-300 transition-colors whitespace-nowrap">Protection</Link>
            <Link href="/faq" className="text-gray-400 hover:text-cyan-300 transition-colors hidden sm:inline">FAQ</Link>
          </motion.footer>

          {/* Compact Context Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-10 max-w-2xl mx-auto px-4"
          >
            <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed text-center font-light">
              Join our{' '}<Link href="/blog" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors">recruiter community</Link>{' '}with access to{' '}<Link href="/why-recxchange" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors">270M candidate profiles</Link>. Learn{' '}<Link href="/collaboration" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors">how split fees work</Link>, explore our{' '}<Link href="/pricing" className="text-fuchsia-300 hover:text-fuchsia-200 underline decoration-fuchsia-500/30 transition-colors">pricing tiers</Link>, or{' '}<Link href="/contact" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/30 transition-colors">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10%, 10%) rotate(120deg); }
          66% { transform: translate(-10%, 5%) rotate(240deg); }
        }
        @keyframes gradient-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10%, -10%) rotate(-120deg); }
          66% { transform: translate(10%, -5%) rotate(-240deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        .animate-gradient { animation: gradient 15s ease-in-out infinite; }
        .animate-gradient-reverse { animation: gradient-reverse 15s ease-in-out infinite; }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 2s; }
      `}</style>
    </main>
  );
}
