"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ManagerFinalCTA from '@/components/ManagerFinalCTA';

export default function HiringManagerLive() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
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
            <span className="gradient-text">Hundreds of recruiters</span> working for you.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Instead of juggling 20 different agencies, brief once and let our network of vetted niche specialists deliver the shortlist under a single, controlled framework.
          </motion.p>
        </header>

        {/* 2. Interactive Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left: Process Explainer */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 bg-gradient-to-br from-white/[0.02] to-transparent">
            <section>
              <h2 className="text-2xl font-bold mb-8">From urgent role to shortlist.</h2>
              <div className="space-y-8">
                {[
                  { t: "The Brief", d: "Submit your role details, timelines, and pre-agreed fee terms once." },
                  { t: "The Broadcast", d: "We deploy the mandate to the exact segment of our verified recruiter network." },
                  { t: "The Delivery", d: "Vetted shortlists and offers flow back through your single RecXchange point of contact." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 bg-blue-500/10">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.t}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-2">
                Managed Service Excellence
              </p>
              <p className="text-xs text-gray-400 italic">
                "We essentially became an extension of their internal talent team, providing instant scale without the administrative overhead."
              </p>
            </div>
          </div>

          {/* Right: Broadcast Map Visual */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center min-h-[500px] bg-black/40 relative overflow-hidden">
            <div className="absolute top-6 left-10">
               <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Network Distribution Engine</span>
            </div>

            

            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Pulsing Central Node */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 20px rgba(37,99,235,0.2)", "0 0 50px rgba(37,99,235,0.5)", "0 0 20px rgba(37,99,235,0.2)"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="z-10 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-400/30 text-center"
              >
                <span className="text-[10px] font-bold uppercase leading-tight">Your<br/>Mandate</span>
              </motion.div>

              {/* Orbiting Recruiter Nodes */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: 360 }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    className="relative w-full h-full"
                    style={{ rotate: angle }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <motion.div 
                        animate={{ height: [40, 60, 40] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        className="w-[1px] bg-gradient-to-t from-blue-500/50 to-transparent" 
                      />
                      <div className="w-5 h-5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      </div>
                      <span className="text-[8px] text-gray-500 mt-2 font-bold uppercase tracking-tighter">Specialist</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center relative z-10">
               <div className="px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 inline-flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Live Tracking Active</span>
               </div>
               <p className="text-[10px] text-gray-500 max-w-xs leading-relaxed">
                 Every recruiter in our network is vetted for niche performance. You see engagement, submissions, and status in real-time.
               </p>
            </div>
          </div>
        </div>

        {/* 3. INTEGRATED MANAGER CTA */}
        <ManagerFinalCTA />

        {/* 4. Navigation/Footer Strip */}
        <div className="mt-20">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span>Dubai Headquartered • Global Delivery Network</span>
            <div className="flex gap-8">
              <Link href="/hiring-manager-strategic" className="hover:text-white transition-colors">Strategic Planning</Link>
              <Link href="/account-management" className="hover:text-white transition-colors">Managed Services</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
