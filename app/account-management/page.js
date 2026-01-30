"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

export default function AccountManagement() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
          >
            Enterprise Layer — Managed Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-4 leading-tight"
          >
            One point of contact. <br/>
            <span className="gradient-text">Infinite recruiter capacity.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Instead of managing dozens of fragmented agency relationships, you work with one dedicated RecXchange Account Manager who orchestrates our global network of niche specialists behind the scenes.
          </motion.p>
        </header>

        {/* 2. Visual & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left: Orchestration Infographic */}
          <div className="glass-card p-12 rounded-[3rem] border-white/5 flex flex-col items-center gap-12 bg-black/40 relative overflow-hidden min-h-[500px] justify-center">
            <div className="absolute top-8 left-10">
               <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.2em]">The Orchestration Model</span>
            </div>

            {/* Recruiters Cluster (Top) */}
            <div className="relative">
              <div className="grid grid-cols-4 gap-4 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                    className="w-8 h-8 rounded-full border border-white/40 bg-white/5" 
                  />
                ))}
              </div>
              {/* Connecting Lines Visual */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-t from-purple-500 to-transparent" />
            </div>
            
            {/* The Manager (Center) */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                boxShadow: ["0 0 20px rgba(168,85,247,0.2)", "0 0 50px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.2)"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="z-10 w-full max-w-xs py-5 px-10 rounded-2xl border border-purple-500/50 bg-purple-500/10 text-center backdrop-blur-md"
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">RecX Account Manager</span>
              <p className="text-[9px] text-gray-400 mt-2 uppercase">Your Single Point of Truth</p>
            </motion.div>

            {/* Downward Connector */}
            <div className="w-[1px] h-10 bg-gradient-to-b from-purple-500 to-transparent" />

            {/* The Client (Bottom) */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl border-2 border-white/20 flex items-center justify-center bg-white/5">
                <span className="text-[10px] font-bold tracking-widest">YOU</span>
              </div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Hiring Entity</span>
            </div>
          </div>

          {/* Right: Value Props */}
          <div className="space-y-8">
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <h3 className="text-xl font-bold mb-8 text-white">The Managed Advantage:</h3>
              <div className="space-y-10">
                {[
                  {
                    title: "Niche Depth, Single Source",
                    desc: "Brief your AM on Tech, Sales, or Ops. They select and manage the top 1% of recruiters in those specific segments so you don't have to."
                  },
                  {
                    title: "Zero Admin Overhead",
                    desc: "Stop the endless email chains. You receive one consolidated shortlist, one interview schedule, and one invoice."
                  },
                  {
                    title: "Quality Controlled",
                    desc: "Your AM vets every candidate submission against your internal culture and technical standards before they ever reach your desk."
                  }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-purple-500" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed pl-4 border-l border-white/5 group-hover:border-purple-500/50 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. INTEGRATED MANAGER CTA */}
        <ManagerFinalCTA />

        {/* 4. Minimal Footer Strip */}
        <div className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span>Enterprise Framework • Dedicated AM Support</span>
            <div className="flex gap-8">
              <Link href="/hiring-manager-live" className="hover:text-white transition-colors">Live Support</Link>
              <Link href="/hiring-manager-strategic" className="hover:text-white transition-colors">Strategic Planning</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
