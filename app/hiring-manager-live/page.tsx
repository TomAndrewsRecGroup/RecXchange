"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';
import { Zap, Activity, Users, Globe } from 'lucide-react';

interface ProcessStep {
  t: string;
  d: string;
}

export default function HiringManagerLive() {
  const steps: ProcessStep[] = [
    { t: "The Brief", d: "Submit your role details, timelines, and pre-agreed fee terms once." },
    { t: "The Broadcast", d: "We deploy the role to 15,000+ recruiters. On average, 300+ specialist recruiters activate immediately for a single role." },
    { t: "The Delivery", d: "Vetted shortlists and offers flow back through your single RecXchange point of contact." }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden text-white">
      
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label"
          >
            Network Pulse — Live Execution
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-4 leading-tight max-w-3xl"
          >
            One role. <span className="gradient-text">15,000 Recruiters.</span> <br/>
            Real-time global sourcing.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            The moment you brief us, the Xchange Engine activates. We leverage a verified global network where an average of 300+ recruiters work a single role simultaneously to find your perfect match.
          </motion.p>
        </header>

        {/* 2. Interactive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left: Process Explainer */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 bg-gradient-to-br from-white/[0.02] to-transparent">
            <section>
              <h2 className="text-2xl font-bold mb-8 italic">Sourcing at scale.</h2>
              <div className="space-y-8">
                {steps.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#c71df1]/30 flex items-center justify-center text-xs font-bold text-[#c71df1] bg-[#c71df1]/10 shadow-[0_0_10px_rgba(199,31,241,0.2)]">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.t}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            
            <div className="pt-8 border-t border-white/5 text-center">
              <div className="flex justify-around items-center">
                <div>
                  <p className="text-2xl font-bold text-white">15k+</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">Network Size</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-[#c71df1]">300+</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">Recruiters Per Role</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Network Pulse Visual */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center min-h-[500px] bg-black/40 relative overflow-hidden">
            <div className="absolute top-8 left-10 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.3em]">Network Pulse: Active</span>
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Central Hub: The Engine */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: 360
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 border border-[#c71df1]/20 rounded-full"
              />
              
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 20px rgba(199,31,241,0.2)", "0 0 60px rgba(199,31,241,0.5)", "0 0 20px rgba(199,31,241,0.2)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-20 w-24 h-24 rounded-3xl bg-white flex items-center justify-center text-black shadow-2xl"
              >
                <Zap size={40} fill="currentColor" />
              </motion.div>

              {/* Orbiting Specialist Nodes (Representing 300+ Recruiters) */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15 + i, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full relative"
                  >
                    <motion.div 
                      style={{ rotate: `${angle}deg` }}
                      className="absolute top-0 left-1/2 -translate-x-1/2"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#c71df1] shadow-[0_0_10px_#c71df1]" />
                      <div className="w-[1px] h-32 bg-gradient-to-t from-[#c71df1]/40 to-transparent mx-auto" />
                    </motion.div>
                  </motion.div>
                </div>
              ))}
              
              {/* Outer Scanning Rings */}
              <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-32 h-32 border-2 border-white/20 rounded-full"
              />
            </div>
            
            <div className="mt-12 text-center relative z-10">
               <div className="text-3xl font-black mb-1">300+</div>
               <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                 Recruiters working this role now
               </p>
               <p className="text-[8px] text-[#c71df1] mt-4 max-w-[200px] mx-auto opacity-70">
                 Every recruiter is scanning their private database and vetting candidates through the Xchange Engine.
               </p>
            </div>
          </div>
        </div>

        <ManagerFinalCTA />

        {/* 4. Persona Navigation Strip */}
        <div className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="opacity-70">Dubai Tech Hub • Global Network Reach</span>
            <div className="flex gap-8">
              <Link href="/hiring-manager-strategic" className="hover:text-purple-400 transition-colors">Strategic Planning</Link>
              <Link href="/account-management" className="hover:text-white transition-colors">Managed Services</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
