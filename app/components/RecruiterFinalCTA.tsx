"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecruiterFinalCTA() {
  return (
    <section className="mt-20 py-16 border-t border-white/5 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card p-10 md:p-16 rounded-[3rem] border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/5 text-center relative overflow-hidden"
      >
        {/* Subtle Blue Glow for Recruiter Path */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 blur-[120px] pointer-events-none" />

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
          Ready to plug into the network?
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed relative z-10">
          Join 2,000+ verified recruiters sharing roles, candidates, and split fees under one protected framework. Secure your seat in the Xchange Engine.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <motion.a 
            href="https://app.recxchange.io/register" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 rounded-full bg-white text-black font-extrabold text-sm shadow-xl shadow-white/5 transition-all"
          >
            Join RecXchange Now
          </motion.a>
          
          <Link href="/pricing-and-splits">
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
              className="px-10 py-5 rounded-full border border-white/10 text-white font-bold text-sm transition-all"
            >
              Review Membership Tiers
            </motion.button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          Live Network Active
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
