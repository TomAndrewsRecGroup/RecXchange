"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GDPRPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link href="/legal-hub" className="text-[10px] uppercase tracking-widest text-gray-500 font-bold hover:text-blue-400 transition-colors flex items-center gap-2 mb-8">
          <span>←</span> Back to Trust Center
        </Link>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5 text-gray-300 relative overflow-hidden"
        >
          {/* Subtle Security Shield Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Global Data Protection</h1>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-blue-400 uppercase tracking-[0.3em] font-black">
                Harmonized Compliance Framework
              </span>
              <div className="h-[1px] w-12 bg-blue-500/30" />
            </div>
          </header>

          <div className="space-y-12 text-sm leading-relaxed">
            
            {/* 1. Global Scope */}
            <div className="flex gap-6 items-stretch">
              <div className="w-1.5 bg-gradient-to-b from-blue-600 via-purple-500 to-transparent rounded-full" />
              <div>
                <h3 className="text-white font-bold mb-3 text-lg">Scope of Compliance</h3>
                <p className="text-gray-400 max-w-2xl">
                  Our privacy infrastructure is engineered to meet or exceed the world’s most stringent data laws. 
                  We maintain a single, high-water mark policy that covers <span className="text-white">UK/EU GDPR</span>, 
                  UAE PDPL, California CCPA, Canada PIPEDA, and Brazil LGPD.
                </p>
              </div>
            </div>

            {/* 2. Visual Representation of Data Rights */}
            

            {/* 3. Rights & Protocols Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <motion.div 
                whileHover={{ translateY: -5 }}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h4 className="text-white font-bold mb-3 uppercase text-[11px] tracking-widest">Data Subject Rights</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You retain full sovereignty over your data. You have the right to access, rectify, delete, and port your information. 
                  All SAR (Subject Access Requests) are acknowledged immediately and fulfilled within 2 business days.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ translateY: -5 }}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="text-white font-bold mb-3 uppercase text-[11px] tracking-widest">Breach Protocol</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Security is proactive. In the unlikely event of a high-risk data breach, RecXchange is committed to 
                  notifying the relevant supervisory authorities and affected users within <span className="text-white">72 hours</span> of detection.
                </p>
              </motion.div>
            </div>

            {/* 4. Cross-Border Sovereignty */}
            <div className="pt-8 border-t border-white/5">
              <h3 className="text-white font-bold mb-4">Cross-Border Data Flows</h3>
              <p className="text-sm text-gray-500 mb-6">
                Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We utilize Standard Contractual Clauses (SCCs) 
                to ensure your data remains protected even when moving between global recruitment jurisdictions.
              </p>
              <div className="flex gap-4">
                <Link href="mailto:privacy@recxchange.io" className="text-blue-400 text-[11px] font-bold uppercase tracking-widest hover:underline">
                  Contact DPO →
                </Link>
                <Link href="/security-whitepaper" className="text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Security Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Global Hub Navigation */}
        <footer className="mt-12">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex justify-between items-center text-[9px] text-gray-600 font-bold uppercase tracking-widest">
            <span>DPO Registry: RX-2026-PRIV</span>
            <div className="flex gap-8">
              <Link href="/legal/affiliate" className="hover:text-purple-400">Affiliate Terms</Link>
              <Link href="/legal/terms" className="hover:text-white">Master Agreement</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
