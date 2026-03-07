'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Type for live stats
interface LiveStats {
  roleCount: number;
  totalFees: number;
  averageFee: number;
}

export default function HomePage() {
  const router = useRouter();
  const [liveStats, setLiveStats] = useState<LiveStats>({
    roleCount: 0,
    totalFees: 0,
    averageFee: 0
  });

  // Fetch live data from /roles page
  useEffect(() => {
    async function fetchLiveStats() {
      try {
        // Replace with your actual API endpoint or data source
        const response = await fetch('/api/live-stats');
        const data = await response.json();
        setLiveStats(data);
      } catch (error) {
        // Fallback static data if API fails
        setLiveStats({
          roleCount: 127,
          totalFees: 847392,
          averageFee: 6673
        });
      }
    }

    fetchLiveStats();
    // Refresh every 5 minutes
    const interval = setInterval(fetchLiveStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPathSelection = () => {
    document.getElementById('path-selection')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
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
      translateY: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <main className="relative">
      {/* SCREEN 1: HERO - Full viewport */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* H1 - Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gradient-text mb-4"
          >
            RecXchange
          </motion.h1>

          {/* H2 - Tagline/Descriptor */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl text-cyan-400/80 mb-8 font-medium tracking-wide"
          >
            The Recruiters Xchange
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8 rounded-full"
          />

          {/* H3 - Explanation */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-normal px-4"
          >
            RecXchange is a recruiter collaboration platform where 15,000+ recruiters 
            split fees (50/50 to 70%) on placements. Post roles to find candidates, 
            or share candidates to find roles. Access 270M candidate profiles with 
            AI-powered matching through our Xchange Engine. Automated contracts protect 
            both parties with timestamp verification.
          </motion.h3>

          {/* Live Data Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto"
          >
            {/* Live Roles Counter */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-3 right-3">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Live Roles</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1">
                {formatNumber(liveStats.roleCount)}
              </div>
              <div className="text-sm text-cyan-400">Active Now</div>
            </div>

            {/* Total Fees Counter */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-3 right-3">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                </span>
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Fees Available</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1">
                {formatCurrency(liveStats.totalFees)}
              </div>
              <div className="text-sm text-fuchsia-400">In Placement Fees</div>
            </div>

            {/* Average Fee Counter */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-3 right-3">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Average Fee</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1">
                {formatCurrency(liveStats.averageFee)}
              </div>
              <div className="text-sm text-cyan-400">Per Placement</div>
            </div>
          </motion.div>

          {/* Additional Live Context */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>15,000+ recruiters active</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span>270M candidate profiles</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"></span>
              <span>Split fees up to 70%</span>
            </div>
          </motion.div>

          {/* Pulsing "Start Here" Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={scrollToPathSelection}
              className="relative group"
            >
              {/* Pulsing glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></span>
              
              {/* Button content */}
              <span className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl font-bold text-lg sm:text-xl text-white group-hover:scale-105 transition-transform">
                Start Here
                <svg 
                  className="w-6 h-6 group-hover:translate-y-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs uppercase tracking-widest"
          >
            Scroll Down
          </motion.div>
        </div>
      </section>

      {/* SCREEN 2: PATH SELECTION - Full viewport */}
      <section 
        id="path-selection" 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
      >
        <div className="relative z-10 text-center max-w-[1200px] w-full">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[9px] sm:text-[10px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
              The Recruiter Xchange Engine
            </span>
            <h2 className="text-[32px] sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-4 sm:mb-5 md:mb-[27px] tracking-tight leading-[1.1]">
              What describes you best?
            </h2>
            <div className="pulse-underline mb-6 sm:mb-8 md:mb-10" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 leading-relaxed px-2">
              Choose your professional path. Both save time.
            </p>
          </motion.header>

          {/* Two-path card layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full mx-auto">
            {/* RECRUITER CARD */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              onClick={() => router.push('/recruiter')}
              className="glass-card p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[420px] sm:min-h-[450px] md:min-h-[480px] cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />

              <div className="w-full">
                <div className="px-3 sm:px-4 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 mb-6 sm:mb-8 md:mb-10 inline-block">
                  Recruiter Mode
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-white group-hover:text-cyan-400 transition-colors">
                  Recruiter
                </h3>
                <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed pl-0 md:pl-0">
                  You're a recruiter. Post roles to find candidates. Or share candidates to find roles. Either way,{' '}
                  <Link href="/collaboration" className="text-cyan-400 hover:underline inline-block">split fees</Link>{' '}
                  with 15,000+ recruiters.
                </p>
                <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium pl-0">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)] flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1">Search 270M candidates when your pipeline is dry</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1">Up to{' '}<Link href="/why-recxchange" className="text-cyan-400 hover:underline inline-block">70% split on RecX Direct</Link>{' '}roles</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1"><Link href="/deal-protection" className="text-cyan-400 hover:underline inline-block">Split fee contracts</Link>{' '}protect both parties</span>
                  </li>
                </ul>
              </div>

              <button className="relative w-full mt-8 sm:mt-10 md:mt-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all">
                <span className="absolute inset-[1px] rounded-lg sm:rounded-xl md:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative z-10 text-white flex items-center justify-center">Enter Recruiter Path</span>
              </button>
            </motion.div>

            {/* HIRING MANAGER CARD */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              onClick={() => router.push('/hiring-manager-home')}
              className="glass-card p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-[3rem] flex flex-col justify-between items-start text-left min-h-[420px] sm:min-h-[450px] md:min-h-[480px] cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors" />

              <div className="w-full">
                <div className="px-3 sm:px-4 py-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-widest text-fuchsia-400 mb-6 sm:mb-8 md:mb-10 inline-block">
                  Hiring Team Mode
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-white group-hover:text-fuchsia-400 transition-colors">
                  Hiring Manager
                </h3>
                <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed pl-0 md:pl-0">
                  You're hiring talent. We{' '}
                  <Link href="/hiring-manager-live" className="text-fuchsia-400 hover:underline inline-block">post your role</Link>.
                  {' '}Thousands of recruiters compete to fill it. You pay one fee.
                </p>
                <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium pl-0">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,0.8)] flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1">15,000+ recruiters see your role instantly</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1"><Link href="/account-management" className="text-fuchsia-400 hover:underline inline-block">One point of contact</Link>.{' '}No recruiter spam.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 flex-shrink-0 mt-1.5" /> 
                    <span className="flex-1"><Link href="/hiring-manager-strategic" className="text-fuchsia-400 hover:underline inline-block">Test the market</Link>{' '}before you officially hire</span>
                  </li>
                </ul>
              </div>

              <button className="relative w-full mt-8 sm:mt-10 md:mt-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all">
                <span className="absolute inset-[1px] rounded-lg sm:rounded-xl md:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative z-10 text-white flex items-center justify-center">Enter Hiring Manager Path</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Footer Section */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 sm:mt-16 md:mt-20 glass-card py-3 sm:py-4 px-4 sm:px-8 md:px-10 rounded-full inline-flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 items-center text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em]"
          >
            <span className="opacity-60">Global Talent Infrastructure</span>
            <div className="h-4 w-[1px] bg-cyan-400/20 hidden md:block" />
            <Link href="/roles" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Preview Live Roles</Link>
            <Link href="/pricing" className="hover:text-fuchsia-400 transition-colors">View Pricing</Link>
            <Link href="/deal-protection" className="hover:text-cyan-400 transition-colors whitespace-nowrap">How Protection Works</Link>
            <Link href="/blog" className="hover:text-cyan-400 transition-colors whitespace-nowrap hidden sm:inline">Latest Updates</Link>
            <Link href="/faq" className="hover:text-cyan-400 transition-colors whitespace-nowrap hidden sm:inline">Common Questions</Link>
          </motion.footer>

          {/* Additional Context Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto px-4"
          >
            <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed text-center">
              Join our{' '}<Link href="/blog" className="text-cyan-400 hover:underline">recruiter community</Link>{' '}with access to{' '}<Link href="/why-recxchange" className="text-cyan-400 hover:underline">270M candidate profiles</Link>. Learn{' '}<Link href="/collaboration" className="text-cyan-400 hover:underline">how split fees work</Link>, explore our{' '}<Link href="/pricing" className="text-fuchsia-400 hover:underline">transparent pricing tiers</Link>, or read success stories on our{' '}<Link href="/blog" className="text-cyan-400 hover:underline">blog</Link>. Questions? Check our{' '}<Link href="/faq" className="text-cyan-400 hover:underline">FAQ</Link>{' '}or{' '}<Link href="/contact" className="text-cyan-400 hover:underline">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
