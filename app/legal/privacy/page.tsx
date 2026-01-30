"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link href="/legal-hub" className="text-[10px] uppercase tracking-widest text-gray-500 font-bold hover:text-white transition-colors flex items-center gap-2 mb-8">
          <span>←</span> Privacy & Trust Center
        </Link>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5 text-gray-300 relative overflow-hidden"
        >
          {/* Subtle Privacy Shield Gradient */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">
                Version 2.1 — Effective Jan 2026
              </span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
          </header>

          <div className="space-y-10 text-sm md:text-base leading-relaxed">
            <p className="text-gray-400">
              <span className="text-white font-semibold">RecXchange Portal LLC</span> (the "Data Controller") is committed to protecting your privacy in compliance with the highest global standards, including <span className="text-white">UK GDPR</span> and <span className="text-white">EU GDPR</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              {/* Data We Collect */}
              <motion.div 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-widest">Platform Identity Data</h3>
                </div>
                <ul className="space-y-3 text-[12px] text-gray-500 font-medium">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Identity</span>
                    <span className="text-gray-300">Name, Professional Title</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Contact</span>
                    <span className="text-gray-300">Work Email, LinkedIn URL</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Verification</span>
                    <span className="text-gray-300">Trade License, KYC</span>
                  </li>
                </ul>
              </motion.div>

              {/* Third Party Data */}
              <motion.div 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-widest">Transactional Data</h3>
                </div>
                <ul className="space-y-3 text-[12px] text-gray-500 font-medium">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Member CVs</span>
                    <span className="text-gray-300">Anonymized Processing</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Interactions</span>
                    <span className="text-gray-300">Match & Hire History</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Communications</span>
                    <span className="text-gray-300">End-to-End Encryption</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">International Data Transfers</h2>
              <p className="text-gray-400">
                While RecXchange is headquartered in the UAE, all data movement is governed by 
                <span className="text-white italic"> Standard Contractual Clauses (SCCs)</span>. 
                This ensures that your information—and your candidates' information—receives the same level of protection as it would within the EEA.
              </p>
            </section>

            

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Privacy Inquiries</p>
                  <p className="text-white font-bold">legal@recxchange.io</p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Download Data Audit Report
              </button>
            </div>
          </div>
        </motion.section>

        {/* Legal Footer Navigation */}
        <footer className="mt-12">
          <div className="glass-card py-4 px-10 rounded-full border-white/10 flex justify-center gap-10 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
            <Link href="/legal/terms" className="hover:text-white transition-colors">Master Terms</Link>
            <Link href="/legal/gdpr" className="hover:text-white transition-colors">GDPR Portal</Link>
            <Link href="/legal/affiliate" className="hover:text-white transition-colors">Affiliate Policy</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
