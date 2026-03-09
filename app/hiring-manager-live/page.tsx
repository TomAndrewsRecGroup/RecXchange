"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, MapPin, DollarSign, Briefcase } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

export default function HiringManagerLive() {
  const [recruiters, setRecruiters] = useState(0);
  const [applicants, setApplicants] = useState(0);

  useEffect(() => {
    const recruiterInterval = setInterval(() => {
      setRecruiters(prev => (prev < 342 ? prev + 1 : prev));
    }, 40);

    const applicantInterval = setInterval(() => {
      setApplicants(prev => {
        const growthFactor = Math.floor(recruiters / 50) + 1;
        return prev < 1240 ? prev + growthFactor : prev;
      });
    }, 30);

    return () => {
      clearInterval(recruiterInterval);
      clearInterval(applicantInterval);
    };
  }, [recruiters]);

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />
          
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="LIVE BROADCAST SIMULATION" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              One role. Massive Velocity.<br/>
              Watch the engine work.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              When you post a role, you aren't waiting for a single agency. You are activating a global hive of 15,000+ specialists. Watch how fast your talent pool expands when 300+ experts source simultaneously.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-10 sm:mb-12 md:mb-16">
            
            {/* Left: Stats */}
            <div className="space-y-5 sm:space-y-6">
              <HolographicCard color="fuchsia" variant="content">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white">The Network Effect</h3>
                <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  Your role for a <strong>Senior Software Engineer</strong> is currently being broadcast across the Xchange. The acceleration you see is the result of 15,000+ recruiters scanning their private, vetted databases for your specific requirements.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <HolographicCard color="cyan" variant="stat">
                    <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-black mb-1">Active Recruiters</div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{recruiters}</div>
                  </HolographicCard>
                  <HolographicCard color="fuchsia" variant="stat">
                    <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-black mb-1">Vetted Candidates</div>
                    <div className="text-2xl sm:text-3xl font-bold text-fuchsia-400">{applicants}</div>
                  </HolographicCard>
                </div>
              </HolographicCard>

              <HolographicCard color="cyan" variant="feature" showStatusIndicator={true}>
                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-400 flex-shrink-0" size={20} />
                  <p className="text-[11px] sm:text-xs text-gray-300"><strong>Real-time Matching:</strong> Engine is currently re-ranking 270M+ profiles.</p>
                </div>
              </HolographicCard>
            </div>

            {/* Right: Live Job Card */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HolographicCard color="purple" variant="content" glowIntensity="high">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl border border-purple-400/20 flex items-center justify-center">
                      <Briefcase className="text-purple-400" size={24} />
                    </div>
                    <StatusBadge label="LIVE BROADCAST" color="emerald" size="sm" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Senior Software Engineer</h2>
                  <div className="flex flex-wrap gap-3 text-gray-400 text-xs mb-6">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> California, USA</span>
                    <span className="flex items-center gap-1.5"><DollarSign size={14} /> $100k - $120k</span>
                  </div>

                  <div className="space-y-5">
                    {/* Recruiters Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Recruiters Sourcing</span>
                        <span className="text-xs font-bold text-white">{recruiters} / 300+</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" 
                          style={{ width: `${(recruiters / 342) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Applicants Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">AI Matched Candidates</span>
                        <span className="text-xs font-bold text-fuchsia-400">{applicants} Found</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-fuchsia-500 shadow-[0_0_15px_#d946ef]" 
                          style={{ width: `${(applicants / 1240) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-fuchsia-500 flex items-center justify-center text-[8px] font-bold text-white">+{recruiters - 4}</div>
                      </div>
                      <p className="text-[9px] text-gray-500 font-medium flex-1">Recruiters from the Xchange currently reviewing this role...</p>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            </div>
          </div>

          <ManagerFinalCTA />
        </div>
      </div>
    </main>
  );
}
