"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

interface ProcessStep {
  t: string;
  d: string;
}

export default function HiringManagerLive() {
  const steps: ProcessStep[] = [
    { t: "The Brief", d: "Submit your role details, timelines, and pre-agreed fee terms once." },
    { t: "The Broadcast", d: "We deploy the role to the exact segment of our verified recruiter network." },
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
            Live Roles — Urgent Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-4 leading-tight max-w-3xl"
          >
            One role. One process. <br/>
            <span className="gradient-text">Hundreds of specialists</span> working for you.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Stop juggling 20 fragmented agency relationships. Brief once and let our network of vetted niche recruiters deliver the shortlist under a single, controlled framework.
          </motion.p>
        </header>

        {/* 2. Interactive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left: Process Explainer */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 bg-gradient-to-br from-white/[0.02] to-transparent">
            <section>
              <h2 className="text-2xl font-bold mb-8">Role distribution protocol.</h2>
              <div className="space-y-8">
                {steps.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
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
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">
                Operational Efficiency
              </p>
              <p className="text-xs text-gray-400 italic">
                "Instant capacity without the administrative noise of multiple contracts."
              </p>
            </div>
          </div>

          {/* Right: Broadcast Map Visual */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center min-h-[500px] bg-black/40 relative overflow-hidden">
            <div className="absolute top-8 left-10">
               <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.3em]">Network Pulse</span>
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Pulsing Central Node (Your Role) */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.2)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="z-20 w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-400/30 text-center shadow-2xl"
              >
                <span className="text-[9px] font-black uppercase leading-tight tracking-tighter">Your<br/>Active<br/>Role</span>
              </motion.div>

              {/* Orbiting Specialist Nodes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="relative w-full h-full"
                    style={{ rotate: `${angle}deg` }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      {/* Connecting Line from center to node */}
                      <motion.div 
                        animate={{ height: [50, 80, 50], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                        className="w-[1px] bg-gradient-to-t from-blue-500 to-transparent" 
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-4 h-4 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md"
                      >
                         <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa]" />
                      </motion.div>
                      <span className="text-[7px] text-gray-600 mt-2 font-bold uppercase tracking-widest">Niche Specialist</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center relative z-10">
               <div className="px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 inline-flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Global Broadcast Active</span>
               </div>
               <p className="text-[10px] text-gray-500 max-w-[240px] leading-relaxed mx-auto font-medium">
                 Your role is intelligently routed to the top-performing recruiters in that specific vertical.
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
