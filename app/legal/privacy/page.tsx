"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Database, Lock, Globe } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="PRIVACY & TRUST CENTER" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Privacy Policy
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              Version 2.1 — Effective January 2026
            </p>
          </motion.header>

          {/* Main Content */}
          <HolographicCard color="cyan" variant="content">
            <div className="space-y-8 sm:space-y-10">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <span className="text-white font-semibold">RecXchange Portal LLC</span> (the "Data Controller") is committed to protecting your privacy in compliance with the highest global standards, including <span className="text-white">UK GDPR</span> and <span className="text-white">EU GDPR</span>.
              </p>

              {/* Data Collection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HolographicCard color="fuchsia" variant="feature">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Platform Identity Data</h3>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-gray-400">
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
                </HolographicCard>

                <HolographicCard color="purple" variant="feature">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Transactional Data</h3>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-gray-400">
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
                </HolographicCard>
              </div>

              {/* International Transfers */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-cyan-400" size={24} />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">International Data Transfers</h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  While RecXchange is headquartered in the UAE, all data movement is governed by <span className="text-white italic">Standard Contractual Clauses (SCCs)</span>. This ensures that your information—and your candidates' information—receives the same level of protection as it would within the EEA.
                </p>
              </div>

              {/* Contact Footer */}
              <div className="pt-8 border-t border-cyan-400/20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Privacy Inquiries</p>
                    <p className="text-white font-bold text-sm">legal@recxchange.io</p>
                  </div>
                </div>
                <Link href="/legal/gdpr" className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400/20 transition-all">
                  View GDPR Portal
                </Link>
              </div>
            </div>
          </HolographicCard>

          {/* Legal Footer Navigation */}
          <footer className="mt-8 sm:mt-12">
            <div className="glass-card py-4 px-6 sm:px-10 rounded-full border-cyan-400/10 flex flex-wrap justify-center gap-6 sm:gap-10 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
              <Link href="/legal/terms" className="hover:text-cyan-400 transition-colors">Master Terms</Link>
              <Link href="/legal/gdpr" className="hover:text-cyan-400 transition-colors">GDPR Portal</Link>
              <Link href="/legal/affiliate" className="hover:text-cyan-400 transition-colors">Affiliate Policy</Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
