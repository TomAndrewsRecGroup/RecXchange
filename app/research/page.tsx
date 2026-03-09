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
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
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
