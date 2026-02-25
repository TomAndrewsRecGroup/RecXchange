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
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden text-white">
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.span className="text-label">Live Broadcast Simulation</motion.span>
          <motion.h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight max-w-3xl">
            One role. <span className="gradient-text">Massive Velocity.</span><br/>
            Watch the engine work.
          </motion.h1>
          <motion.p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
            When you post a role, you aren't waiting for a single agency. You are activating a global hive of 15,000+ specialists. Watch how fast your talent pool expands when 300+ experts source simultaneously.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left: Tactical Stats */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl border-white/5 bg-gradient-to-br from-[#c71df1]/10 to-transparent">
              <h3 className="text-xl font-bold mb-4 italic">The Network Effect</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your role for a <strong>Senior Software Engineer</strong> is currently being broadcast across the Xchange. The acceleration you see is the result of 15,000+ recruiters scanning their private, vetted databases for your specific requirements.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Active Recruiters</p>
                  <p className="text-3xl font-bold text-white tracking-tighter">{recruiters}</p>
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Vetted Candidates</p>
                  <p className="text-3xl font-bold text-[#c71df1] tracking-tighter">{applicants}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 glass-card rounded-2xl border-white/5">
                <Zap size={20} className="text-yellow-400" />
                <p className="text-xs text-gray-400"><strong>Real-time Matching:</strong> Engine is currently re-ranking 270M+ profiles.</p>
              </div>
            </div>
          </div>

          {/* Right: The Live Job Card Visual */}
          <div className="relative">
            {/* Glow Effect behind card */}
            <div className="absolute inset-0 bg-[#c71df1]/20 blur-[80px] rounded-full" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative glass-card p-8 rounded-[2.5rem] border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Briefcase className="text-white" size={28} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 uppercase">Live Broadcast</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">Senior Software Engineer</h2>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-8">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> California, USA</span>
                <span className="flex items-center gap-1.5"><DollarSign size={14} /> $100k - $120k</span>
              </div>

              <div className="space-y-6">
                {/* Progress Bar: Recruiters */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Recruiters Sourcing</span>
                    <span className="text-xs font-bold text-white">{recruiters} / 300+</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" 
                      style={{ width: `${(recruiters / 342) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Progress Bar: Applicants */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">AI Matched Candidates</span>
                    <span className="text-xs font-bold text-[#c71df1]">{applicants} Found</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#c71df1] shadow-[0_0_15px_#c71df1]" 
                      style={{ width: `${(applicants / 1240) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-[#c71df1] flex items-center justify-center text-[8px] font-bold">+{recruiters - 4}</div>
                  </div>
                  <p className="text-[9px] text-gray-500 font-medium">Recruiters from the Xchange currently reviewing this role...</p>
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
