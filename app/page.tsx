'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HowToSchema } from './components/HowToSchema';
import RelatedContent from '@/components/RelatedContent';

interface LiveStats {
  roleCount: number;
  totalFees: number;
  averageFee: number;
  lastUpdated?: string;
}

export default function HomePage() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  const [liveStats, setLiveStats] = useState<LiveStats>({
    roleCount: 0,
    totalFees: 0,
    averageFee: 0,
    lastUpdated: undefined
  });

  useEffect(() => {
    async function fetchLiveStats() {
      try {
        const response = await fetch('/api/live-stats');
        const data = await response.json();
        setLiveStats({
          ...data,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        setLiveStats({
          roleCount: 127,
          totalFees: 847392,
          averageFee: 6673,
          lastUpdated: new Date().toISOString()
        });
      }
    }

    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const scrollToCards = () => {
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

  const formatTimestamp = (isoString: string | undefined) => {
    if (!isoString) return 'Updating...';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <HowToSchema />
      <main className="relative bg-[#0a0a0f] font-sans overflow-x-hidden">
        <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20" aria-label="Hero section">
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <motion.div 
              style={{ 
                y: y1,
                background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.05) 40%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              className="absolute top-[-15%] left-[5%] w-[50%] h-[50%] rounded-full animate-float"
            />
            <motion.div 
              style={{ 
                y: y2,
                background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, rgba(255,0,255,0.05) 40%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              className="absolute bottom-[-15%] right-[5%] w-[50%] h-[50%] rounded-full animate-float-delayed"
            />
            
            {/* Subtle ambient gradient line */}
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute w-full h-[1px] top-[40%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>

          <header className="relative z-10 max-w-5xl mx-auto text-center" style={{ perspective: '1000px' }}>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 relative group"
              role="status"
              aria-live="polite"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(255,0,255,0.05) 100%)',
                border: '1px solid rgba(0,240,255,0.3)',
                boxShadow: '0 0 15px rgba(0,240,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="relative flex items-center justify-center w-3 h-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" style={{
                  boxShadow: '0 0 8px rgba(0,240,255,0.6), 0 0 12px rgba(0,240,255,0.3)'
                }} />
              </div>
              <span className="text-xs font-bold text-cyan-300 tracking-[0.2em] uppercase" style={{
                textShadow: '0 0 8px rgba(0,240,255,0.3)'
              }}>LIVE NOW</span>
              <div className="absolute inset-0 rounded-full overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 text-white tracking-tight flex items-center justify-center"
              style={{
                textShadow: '0 0 20px rgba(0,240,255,0.15)',
                letterSpacing: '-0.02em'
              }}
            >
              <span>Rec</span>
              <span className="inline-block" style={{ 
                fontSize: 'calc(1em + 2px)',
                margin: '0 -0.02em'
              }}>X</span>
              <span>change</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mb-8"
              style={{
                background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Where Recruiters Make More Placements Together
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-40 h-[3px] mx-auto mb-8"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 animate-pulse-slow" style={{
                filter: 'blur(4px)'
              }} />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400" style={{
                boxShadow: '0 0 8px rgba(0,240,255,0.6)'
              }} />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-400" style={{
                boxShadow: '0 0 8px rgba(255,0,255,0.6)'
              }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light px-2"
            >
              Stop leaving placements on the table. RecXchange connects you with{' '}
              <Link href="/recruiter" className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 hover:decoration-cyan-300/50">
                thousands of specialist recruiters
              </Link>
              {' '}who{' '}
              <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 hover:decoration-cyan-300/50">
                split fees
              </Link>
              {' '}on roles you'd otherwise miss. You bring the candidate or the role,
              and someone else brings what you're missing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto"
              role="region"
              aria-label="Live platform statistics"
              style={{ perspective: '1000px' }}
            >
              {/* Live Roles Count — microdata removed; JSON-LD in layout.tsx is the sole structured data source */}
              <motion.article
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="group relative isolate"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-cyan-600/15 to-cyan-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300 pointer-events-none" aria-hidden="true" />
                
                <Link href="/recruiter" className="block relative backdrop-blur-xl bg-black/40 p-3 sm:p-5 rounded-2xl border border-cyan-400/40 group-hover:border-cyan-300/60 transition-all duration-300 overflow-hidden"
                  style={{
                    boxShadow: '0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,240,255,0.1)'
                  }}
                >
                  <div className="absolute top-2 left-2" aria-hidden="true">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" style={{
                        boxShadow: '0 0 6px rgba(0,240,255,0.8)'
                      }} />
                    </div>
                  </div>
                  
                  <h3 className="sr-only">Live Roles Count</h3>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-cyan-400/80 mb-1 sm:mb-2" aria-hidden="true">ROLES</div>
                  <data 
                    value={liveStats.roleCount} 
                    className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 sm:mb-1 group-hover:text-cyan-300 transition-colors leading-none block" 
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: '0 0 15px rgba(0,240,255,0.3)'
                    }}
                  >
                    {formatNumber(liveStats.roleCount)}
                  </data>
                  <div className="text-[8px] sm:text-xs font-semibold text-cyan-400/80" aria-hidden="true">ACTIVE</div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" aria-hidden="true" />
                </Link>
              </motion.article>

              {/* Total Fees Available — microdata removed */}
              <motion.article
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="group relative isolate"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500/20 via-pink-600/15 to-fuchsia-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300 pointer-events-none" aria-hidden="true" />
                
                <Link href="/pricing" className="block relative backdrop-blur-xl bg-black/40 p-3 sm:p-5 rounded-2xl border border-fuchsia-400/40 group-hover:border-fuchsia-300/60 transition-all duration-300 overflow-hidden"
                  style={{
                    boxShadow: '0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,0,255,0.1)'
                  }}
                >
                  <div className="absolute top-2 left-2" aria-hidden="true">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fuchsia-400" style={{
                        boxShadow: '0 0 6px rgba(255,0,255,0.8)'
                      }} />
                    </div>
                  </div>
                  
                  <h3 className="sr-only">Total Fees Available</h3>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-fuchsia-400/80 mb-1 sm:mb-2" aria-hidden="true">FEES</div>
                  <data 
                    value={liveStats.totalFees} 
                    className="text-base sm:text-2xl md:text-3xl font-black text-white mb-0.5 sm:mb-1 group-hover:text-fuchsia-300 transition-colors leading-none block" 
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: '0 0 15px rgba(255,0,255,0.3)'
                    }}
                  >
                    {formatCurrency(liveStats.totalFees)}
                  </data>
                  <div className="text-[8px] sm:text-xs font-semibold text-fuchsia-400/80" aria-hidden="true">AVAILABLE</div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-50" aria-hidden="true" />
                </Link>
              </motion.article>

              {/* Average Fee Per Deal — microdata removed */}
              <motion.article
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="group relative isolate"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 via-purple-600/15 to-cyan-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300 pointer-events-none" aria-hidden="true" />
                
                <Link href="/why-recxchange" className="block relative backdrop-blur-xl bg-black/40 p-3 sm:p-5 rounded-2xl border border-purple-400/40 group-hover:border-purple-300/60 transition-all duration-300 overflow-hidden"
                  style={{
                    boxShadow: '0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(168,85,247,0.1)'
                  }}
                >
                  <div className="absolute top-2 left-2" aria-hidden="true">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400" style={{
                        boxShadow: '0 0 6px rgba(168,85,247,0.8)'
                      }} />
                    </div>
                  </div>
                  
                  <h3 className="sr-only">Average Fee Per Deal</h3>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-purple-400/80 mb-1 sm:mb-2" aria-hidden="true">AVG</div>
                  <data 
                    value={liveStats.averageFee} 
                    className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 sm:mb-1 group-hover:text-purple-300 transition-colors leading-none block" 
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: '0 0 15px rgba(168,85,247,0.3)'
                    }}
                  >
                    {formatCurrency(liveStats.averageFee)}
                  </data>
                  <div className="text-[8px] sm:text-xs font-semibold text-purple-400/80" aria-hidden="true">PER DEAL</div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" aria-hidden="true" />
                </Link>
              </motion.article>
            </motion.div>

            {liveStats.lastUpdated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="text-[9px] sm:text-[10px] text-gray-500 mb-8 flex items-center justify-center gap-1.5"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <time dateTime={liveStats.lastUpdated}>
                  Data refreshed at {formatTimestamp(liveStats.lastUpdated)}
                </time>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
              role="list"
              aria-label="Key statistics"
            >
              {[
                { color: 'emerald', text: 'Trusted by 15K+ Recruiters', label: '15,000+ recruiters on the platform', source: 'Platform member count', href: '/why-recxchange' },
                { color: 'cyan', text: '270M Searchable Profiles', label: '270 million candidate profiles', source: 'Aggregated candidate database', href: '/recruiter' },
                { color: 'fuchsia', text: 'Keep Up to 70%', label: 'Keep up to 70% of placement fees', source: 'RecX Direct tier', href: '/pricing' }
              ].map((chip, i) => (
                <Link key={i} href={chip.href} className="group relative isolate" role="listitem">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-${chip.color}-500/20 to-${chip.color}-600/20 rounded-full blur opacity-30 group-hover:opacity-50 transition pointer-events-none`} aria-hidden="true" />
                  <div className={`relative backdrop-blur-lg bg-black/30 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full border border-${chip.color}-400/30 group-hover:border-${chip.color}-300/50 transition-all min-h-[44px] flex items-center`}
                    style={{
                      boxShadow: `0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
                    }}
                    title={chip.source}
                  >
                    <span className={`text-[10px] sm:text-xs font-bold text-${chip.color}-300 tracking-[0.1em] sm:tracking-[0.12em] uppercase flex items-center gap-1.5 sm:gap-2`}>
                      <span className="animate-pulse" style={{
                        textShadow: `0 0 8px currentColor`
                      }} aria-hidden="true">●</span>
                      <span aria-label={chip.label}>{chip.text}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 text-white text-sm font-bold hover:scale-105 transition-transform min-h-[44px] flex items-center"
              >
                Get Started Free
              </Link>
              <button
                onClick={scrollToCards}
                className="px-6 py-3 rounded-xl border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all text-sm font-medium min-h-[44px] flex items-center gap-2 group cursor-pointer"
              >
                <span>Choose your path</span>
                <svg
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </header>
        </section>

        <section 
          id="path-selection" 
          className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
          aria-labelledby="path-selection-heading"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true" />

          <div className="relative z-10 text-center max-w-6xl w-full">
            <motion.header
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="block text-[10px] uppercase tracking-[0.3em] font-black mb-5" aria-label="System label"
                style={{
                  background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 15px rgba(0,240,255,0.3)'
                }}
              >
                CHOOSE YOUR PATH
              </p>
              <h2 id="path-selection-heading" className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight"
                style={{
                  textShadow: '0 0 30px rgba(0,240,255,0.15)'
                }}
              >
                How can we help you today?
              </h2>
              <div className="relative w-36 h-[3px] mx-auto mb-8" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-sm" />
              </div>
              <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                Whether you're a recruiter looking to fill more roles or a hiring manager searching for top talent, we've built something for you.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full mx-auto max-w-5xl px-4" style={{ perspective: '2000px' }} role="list">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => router.push('/recruiter')}
                className="group relative cursor-pointer isolate"
                style={{ transformStyle: 'preserve-3d' }}
                role="listitem"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 via-cyan-600/20 to-cyan-500/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 pointer-events-none" aria-hidden="true" />
                
                <div className="relative backdrop-blur-2xl bg-black/50 p-6 sm:p-8 rounded-2xl min-h-[420px] sm:min-h-[460px] flex flex-col border border-cyan-400/30 group-hover:border-cyan-300/50 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,240,255,0.1)'
                  }}
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none" aria-hidden="true"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
                      filter: 'blur(40px)'
                    }}
                  />

                  <div className="w-full relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 flex-wrap">
                      <div className="inline-flex px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10"
                        style={{
                          boxShadow: '0 0 12px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                      >
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.2em] text-cyan-300">RECRUITER</span>
                      </div>
                      <div className="inline-flex px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40">
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-300">Most chosen</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-white group-hover:text-cyan-300 transition-colors"
                      style={{
                        textShadow: '0 0 20px rgba(0,240,255,0.2)'
                      }}
                    >
                      I'm a Recruiter
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">
                      Got a role with no candidates? Or a great candidate with no role? Partner with recruiters who have what you need and split the fee.
                    </p>

                    <ul className="space-y-2.5 sm:space-y-3.5 text-[11px] sm:text-xs md:text-sm text-gray-400 mb-3 sm:mb-4">
                      {[
                        'Tap into 270M candidate profiles',
                        'Earn up to 70% on direct placements',
                        'Fee agreements handled automatically'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0" aria-hidden="true"
                            style={{
                              boxShadow: '0 0 6px rgba(0,240,255,0.6)'
                            }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    type="button"
                    className="relative w-full mt-auto py-3 sm:py-4 rounded-xl border border-cyan-400/40 bg-black/40 group/btn font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all hover:border-cyan-300/60 overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/recruiter');
                    }}
                    style={{
                      boxShadow: '0 2px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,240,255,0.1)'
                    }}
                    aria-label="Enter recruiter path"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity" aria-hidden="true" />
                    <span className="relative z-10 text-white flex items-center justify-center gap-2">
                      <span className="hidden sm:inline">Show Me How It Works</span>
                      <span className="sm:hidden">Learn More</span>
                      <span className="text-cyan-400" aria-hidden="true">→</span>
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => router.push('/hiring-manager-home')}
                className="group relative cursor-pointer isolate"
                style={{ transformStyle: 'preserve-3d' }}
                role="listitem"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500/30 via-pink-600/20 to-fuchsia-500/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 pointer-events-none" aria-hidden="true" />
                
                <div className="relative backdrop-blur-2xl bg-black/50 p-6 sm:p-8 rounded-2xl min-h-[420px] sm:min-h-[460px] flex flex-col border border-fuchsia-400/30 group-hover:border-fuchsia-300/50 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,0,255,0.1)'
                  }}
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none" aria-hidden="true"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,0,255,0.08) 0%, transparent 70%)',
                      filter: 'blur(40px)'
                    }}
                  />

                  <div className="w-full relative z-10">
                    <div className="inline-flex px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-fuchsia-400/50 bg-fuchsia-400/10 mb-5 sm:mb-6"
                      style={{
                        boxShadow: '0 0 12px rgba(255,0,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                    >
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.2em] text-fuchsia-300">HIRING</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-white group-hover:text-fuchsia-300 transition-colors"
                      style={{
                        textShadow: '0 0 20px rgba(255,0,255,0.2)'
                      }}
                    >
                      I'm Hiring
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">
                      Post your role once. Thousands of specialist recruiters start sourcing immediately. One dedicated account manager, one simple fee.
                    </p>

                    <ul className="space-y-2.5 sm:space-y-3.5 text-[11px] sm:text-xs md:text-sm text-gray-400 mb-3 sm:mb-4">
                      {[
                        'Thousands of recruiters competing for your role',
                        'One point of contact handles everything',
                        'Test the market before committing'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-fuchsia-400 mt-1 sm:mt-1.5 flex-shrink-0" aria-hidden="true"
                            style={{
                              boxShadow: '0 0 6px rgba(255,0,255,0.6)'
                            }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    type="button"
                    className="relative w-full mt-auto py-3 sm:py-4 rounded-xl border border-fuchsia-400/40 bg-black/40 group/btn font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all hover:border-fuchsia-300/60 overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/hiring-manager-home');
                    }}
                    style={{
                      boxShadow: '0 2px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,0,255,0.1)'
                    }}
                    aria-label="Enter hiring manager path"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-fuchsia-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity" aria-hidden="true" />
                    <span className="relative z-10 text-white flex items-center justify-center gap-2">
                      <span className="hidden sm:inline">Post Your Role Free</span>
                      <span className="sm:hidden">Get Started</span>
                      <span className="text-fuchsia-400" aria-hidden="true">→</span>
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <RelatedContent currentPage="/" limit={3} />

        <style jsx>{`
          @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -20px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-20px, 20px); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-scan { animation: scan 4s linear infinite; }
          .animate-float { animation: float 8s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 2s; }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}</style>
      </main>
    </>
  );
}
