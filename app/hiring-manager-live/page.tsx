"use client";
import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';
import { Zap, MapPin, DollarSign, Users, Briefcase } from 'lucide-react';

export default function HiringManagerLive() {
  const [recruiters, setRecruiters] = useState(0);
  const [applicants, setApplicants] = useState(0);

  useEffect(() => {
    // Simulating the "Broadcast" effect
    const recruiterInterval = setInterval(() => {
      setRecruiters(prev => (prev < 342 ? prev + 1 : prev));
    }, 40);

    // Applicants grow exponentially as more recruiters join
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
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-x-hidden text-white">
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <motion.span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            Live Broadcast Simulation
          </motion.span>
          <motion.h1 className="text-[28px] sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            One role. <span className="gradient-text">Massive Velocity.</span><br/>
            Watch the engine work.
          </motion.h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <motion.p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            When you post a role, you aren't waiting for a single agency. You are activating a global hive of 15,000+ specialists. Watch how fast your talent pool expands when 300+ experts source simultaneously.
          </motion.p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          
          {/* Left: Tactical Stats */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            <div className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-white/5 bg-gradient-to-br from-[#c71df1]/10 to-transparent">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 italic">The Network Effect</h3>
              <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                Your role for a <strong>Senior Software Engineer</strong> is currently being broadcast across the Xchange. The acceleration you see is the result of 15,000+ recruiters scanning their private, vetted databases for your specific requirements.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-black mb-1 sm:mb-1.5">Active Recruiters</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">{recruiters}</p>
                </div>
                <div className="flex-1 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-black mb-1 sm:mb-1.5">Vetted Candidates</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#c71df1] tracking-tighter">{applicants}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl sm:rounded-2xl border-white/5">
                <Zap size={16} className="sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs text-gray-400 flex-1"><strong>Real-time Matching:</strong> Engine is currently re-ranking 270M+ profiles.</p>
              </div>
            </div>
          </div>

          {/* Right: The Live Job Card Visual */}
          <div className="relative">
            {/* Glow Effect behind card */}
            <div className="absolute inset-0 bg-[#c71df1]/20 blur-[60px] sm:blur-[80px] rounded-full" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <div className="p-2 sm:p-2.5 md:p-3 bg-white/5 rounded-xl sm:rounded-2xl">
                  <Briefcase className="text-white" size={20} />
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 md:px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-green-500 uppercase">Live Broadcast</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">Senior Software Engineer</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-gray-400 text-[11px] sm:text-xs md:text-sm mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <span className="flex items-center gap-1 sm:gap-1.5"><MapPin size={12} className="sm:w-[14px] sm:h-[14px]" /> California, USA</span>
                <span className="flex items-center gap-1 sm:gap-1.5"><DollarSign size={12} className="sm:w-[14px] sm:h-[14px]" /> $100k - $120k</span>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Progress Bar: Recruiters */}
                <div>
                  <div className="flex justify-between mb-1.5 sm:mb-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest">Recruiters Sourcing</span>
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-white">{recruiters} / 300+</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" 
                      style={{ width: `${(recruiters / 342) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Progress Bar: Applicants */}
                <div>
                  <div className="flex justify-between mb-1.5 sm:mb-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest">AI Matched Candidates</span>
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#c71df1]">{applicants} Found</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#c71df1] shadow-[0_0_15px_#c71df1]" 
                      style={{ width: `${(applicants / 1240) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 lg:pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-black bg-gray-800" />
                    ))}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-black bg-[#c71df1] flex items-center justify-center text-[7px] sm:text-[8px] font-bold">+{recruiters - 4}</div>
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-gray-500 font-medium flex-1">Recruiters from the Xchange currently reviewing this role...</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <ManagerFinalCTA />
      </div>
    </main>
  );
}
