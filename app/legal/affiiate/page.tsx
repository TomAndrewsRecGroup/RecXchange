"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AffiliatePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Breadcrumb / Back Link */}
        <Link href="/legal-hub" className="text-[10px] uppercase tracking-widest text-gray-500 font-bold hover:text-purple-400 transition-colors flex items-center gap-2 mb-8">
          <span>←</span> Back to Legal Hub
        </Link>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5 text-gray-300 relative overflow-hidden"
        >
          {/* Decorative Token Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />

          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Affiliate Program</h1>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-purple-400 uppercase tracking-[0.3em] font-black">
                Token-Based Reward System
              </span>
              <div className="h-[1px] w-12 bg-purple-500/30" />
            </div>
          </header>

          <div className="space-y-10 text-sm md:text-base leading-relaxed">
            <p>
              Operated by <span className="text-white font-semibold">RecXchange Portal LLC</span> (trading as "RecXchange"), 
              our affiliate program is designed to reward ecosystem growth through 
              <span className="text-purple-400 font-bold"> RecX Tokens</span>—digital credits used to power your productivity 
              within the platform, rather than direct cash disbursements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2rem] bg-purple-500/5 border border-purple-500/10 relative group">
                <h3 className="text-purple-400 font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  Redemption Rules
                </h3>
                <ul className="space-y-4 text-xs font-medium text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-purple-500 font-bold">01</span>
                    Unlock candidate contact details directly.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-500 font-bold">02</span>
                    Purchase platform-exclusive eLearning content.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-500 font-bold">03</span>
                    Boost role visibility in the Xchange Engine.
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01]">
                <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Qualification</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Referrals must sign up via your unique partner link and maintain an active, 
                  verified account for <span className="text-white">two full calendar months</span> to trigger a 
                  Qualified Referral reward.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-600 italic">
                    Referral rewards are subject to the Anti-Gaming Protocol as outlined in the Master Services Agreement.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <h3 className="text-white font-bold mb-4 text-lg">Program Transparency</h3>
              <p className="text-sm text-gray-500 mb-8">
                The value of RecX tokens is fixed within the internal ecosystem and carries no external cash value. 
                RecXchange reserves the right to modify token weights or redemption costs based on platform 
                inflation and marketplace dynamics.
              </p>
              
              <Link 
                href="/legal-hub" 
                className="inline-block px-8 py-4 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                Download Full Affiliate T&Cs (PDF)
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Global Footer Navigation */}
        <footer className="mt-12 flex justify-center">
          <div className="glass-card py-3 px-8 rounded-full border-white/10 flex gap-8 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/cookie-policy" className="hover:text-white">Cookies</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
