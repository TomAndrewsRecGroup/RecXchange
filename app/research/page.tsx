'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function ResearchPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="PLATFORM STATISTICS & RESEARCH DATA" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              RecXchange By The Numbers
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              Real data from our growing global recruitment network. These statistics reflect live roles, active recruiters, and real earning potential across our platform.
            </p>
          </motion.header>

          {/* Key Platform Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            <HolographicCard color="cyan" variant="stat">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2 sm:mb-3">70%</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-400 font-bold">Average Recruiter Split</div>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-2 sm:mt-3">On RecX Direct placements</p>
              </div>
            </HolographicCard>
            
            <HolographicCard color="fuchsia" variant="stat">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2 sm:mb-3">$7,000</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-400 font-bold">Average Placement Fee</div>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-2 sm:mt-3">Across 100+ live roles</p>
              </div>
            </HolographicCard>
            
            <HolographicCard color="purple" variant="stat">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2 sm:mb-3">$750K</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-400 font-bold">Total Available Fees</div>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-2 sm:mt-3">For recruiters to earn</p>
              </div>
            </HolographicCard>
          </section>

          {/* Geographic Distribution */}
          <HolographicCard color="cyan" variant="content" className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5 sm:mb-6 md:mb-8">Global Role Distribution</h2>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              RecXchange connects recruiters and hiring managers across six continents. Our platform hosts live roles from multiple markets, creating cross-border collaboration opportunities.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { region: 'United Kingdom', flag: '🇬🇧' },
                { region: 'United States', flag: '🇺🇸' },
                { region: 'Europe', flag: '🇪🇺' },
                { region: 'Africa', flag: '🌍' },
                { region: 'Middle East', flag: '🌐' },
                { region: 'Australia', flag: '🇦🇺' }
              ].map((location, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{location.flag}</div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wide">{location.region}</div>
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* Industry Coverage */}
          <HolographicCard color="fuchsia" variant="content" className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5 sm:mb-6 md:mb-8">Industries Covered</h2>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              From technical engineering roles to executive healthcare positions, RecXchange serves diverse industries with specialized recruitment needs.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { industry: 'Engineering', icon: '⚙️' },
                { industry: 'Healthcare', icon: '🏥' },
                { industry: 'Technology', icon: '💻' },
                { industry: 'Human Resources', icon: '👥' },
                { industry: 'Sales', icon: '📊' },
                { industry: 'Finance', icon: '💰' },
                { industry: 'Legal', icon: '⚖️' },
                { industry: 'Marketing', icon: '📱' }
              ].map((item, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xl sm:text-2xl mb-1.5 sm:mb-2">{item.icon}</div>
                  <div className="text-xs sm:text-sm text-gray-300 font-bold">{item.industry}</div>
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* Fee Split Distribution */}
          <HolographicCard color="purple" variant="content" className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Recruiter Earning Potential</h2>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.02]">
                <div className="flex justify-between items-center mb-2 sm:mb-3 gap-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">RecX Direct Roles</h3>
                  <span className="text-cyan-400 font-bold text-xl sm:text-2xl">70%</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Average recruiter split on RecX Direct placements. With a $7,000 average fee, recruiters earn approximately <strong className="text-white">$4,900 per placement</strong>.
                </p>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400"></span>
                  Instant access for Pro members ($249/month)
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/[0.02]">
                <div className="flex justify-between items-center mb-2 sm:mb-3 gap-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Collaborative Roles</h3>
                  <span className="text-fuchsia-400 font-bold text-xl sm:text-2xl">50%</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Standard split on recruiter-to-recruiter collaboration. With a $7,000 average fee, each partner earns <strong className="text-white">$3,500 per placement</strong>.
                </p>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-fuchsia-400"></span>
                  Available to all tiers including Entry ($1/month)
                </div>
              </div>
            </div>
          </HolographicCard>

          {/* Live Roles Summary */}
          <HolographicCard color="cyan" variant="content">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Platform Activity Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-cyan-400 mb-3 sm:mb-4">Role Volume</h3>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">100+ live roles</strong> currently available on the platform</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">$750,000</strong> in total placement fees available for recruiters</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span>Roles span <strong className="text-white">6 geographic regions</strong> and <strong className="text-white">8+ industries</strong></span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-fuchsia-400 mb-3 sm:mb-4">Recruiter Benefits</h3>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">70% average split</strong> on RecX Direct roles</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">$7,000 average fee</strong> per successful placement</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">No platform fees</strong> on placements (keep 100% of your split)</span>
                  </li>
                </ul>
              </div>
            </div>
          </HolographicCard>

          {/* Footer Note */}
          <div className="mt-10 sm:mt-12 md:mt-16 text-center">
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Statistics are based on live roles and active placements on the RecXchange platform as of February 2026. 
              Average fees and splits may vary by role, industry, and geographic location. Platform is actively growing with new roles and recruiters joining daily.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
