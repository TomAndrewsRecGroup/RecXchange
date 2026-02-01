"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link href="/legal-hub" className="text-[10px] uppercase tracking-widest text-gray-500 font-bold hover:text-white transition-colors flex items-center gap-2 mb-8">
          <span>←</span> Master Trust Center
        </Link>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5 text-gray-300 relative overflow-hidden"
        >
          {/* Decorative Legal Seal Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 blur-[100px] pointer-events-none rounded-full" />

          <header className="mb-12 border-b border-white/5 pb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Terms & Conditions</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">
                RecXchange Portal LLC
              </span>
              <div className="h-1 w-1 rounded-full bg-gray-700" />
              <span className="text-[10px] text-blue-400 uppercase tracking-[0.3em] font-black">
                Last Updated: Jan 2026
              </span>
            </div>
          </header>

          <div className="space-y-12 text-sm md:text-base leading-relaxed">
            
            {/* 1. About RecXchange */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-white/20">01.</span>
                <h2 className="text-white font-bold text-xl">Governance & Operation</h2>
              </div>
              <p className="text-gray-400">
                RecXchange is operated by <span className="text-white">RecXchange Portal LLC</span>, headquartered in Dubai, UAE (Trade Licence No: 1508955). 
                We provide the neutral digital infrastructure for recruiter-to-recruiter (R2R) collaboration. 
                RecXchange acts as a facilitator and platform provider; we are not a party to individual recruitment transactions unless explicitly stated in a specific role.
              </p>
            </section>

            {/* 2. Mandatory Split Fee Agreements */}
            <section className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/20 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-blue-400/40">02.</span>
                <h2 className="text-blue-400 font-bold text-xl">Mandatory Split Fee Protocol</h2>
              </div>
              <p className="text-gray-300">
                Integrity is non-negotiable. Every collaboration initiated on the platform must be formalized through a digital 
                <span className="text-white font-semibold"> Split Fee Agreement (SFA)</span>. 
              </p>
              
              

              <p className="text-xs text-blue-300/70 italic mt-4">
                Note: RecXchange will not provide dispute mediation or account support for any placements where a valid SFA was not uploaded to the platform prior to the candidate shortlist submission.
              </p>
            </section>

            {/* 3. Non-Circumvention */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-white/20">03.</span>
                <h2 className="text-white font-bold text-xl">Non-Circumvention & Poaching</h2>
              </div>
              <p className="text-gray-400">
                Members are strictly prohibited from engaging in unauthorized outreach to candidates or clients introduced by another Member. 
                Any attempt to "bypass" the platform tracking or fee terms constitutes a material breach of contract and will result in 
                <span className="text-red-400 font-bold uppercase text-[11px] ml-1">immediate account termination</span> and potential legal recovery of lost fees.
              </p>
            </section>

            {/* 4. Governing Law */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-white/20">04.</span>
                <h2 className="text-white font-bold text-xl">Governing Law & Jurisdiction</h2>
              </div>
              <p className="text-gray-400">
                While operated from the UAE, these terms are governed by and construed in accordance with the 
                <span className="text-white"> laws of England and Wales</span>. Any dispute arising from the use of this platform shall 
                be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <div className="pt-10 border-t border-white/5">
              <p className="text-xs text-gray-500 leading-relaxed">
                By accessing RecXchange, you agree to abide by these terms. We reserve the right to update these terms at any time. 
                Members will be notified of significant changes via their registered email address.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Legal Footer Navigation */}
        <footer className="mt-12">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex justify-between items-center text-[9px] text-gray-600 font-bold uppercase tracking-widest">
            <span>License: DXB-1508955</span>
            <div className="flex gap-8">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/legal/gdpr" className="hover:text-white transition-colors">GDPR Portal</Link>
              <Link href="/legal/affiliate" className="hover:text-purple-400 transition-colors">Affiliate Rewards</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
