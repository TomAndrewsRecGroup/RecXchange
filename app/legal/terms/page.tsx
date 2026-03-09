"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, AlertTriangle, Scale, Globe } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermsPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="MASTER TRUST CENTER" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Terms & Conditions
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">RecXchange Portal LLC</span>
              <div className="h-1 w-1 rounded-full bg-gray-700" />
              <span className="text-[10px] text-fuchsia-400 uppercase tracking-[0.3em] font-black">Last Updated: Jan 2026</span>
            </div>
          </motion.header>

          {/* Main Content */}
          <HolographicCard color="purple" variant="content">
            <div className="space-y-10 sm:space-y-12">
              {/* 1. Governance */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-white font-bold text-xl sm:text-2xl">Governance & Operation</h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  RecXchange is operated by <span className="text-white font-semibold">RecXchange Portal LLC</span>, headquartered in Dubai, UAE (Trade Licence No: 1508955). We provide the neutral digital infrastructure for recruiter-to-recruiter (R2R) collaboration. RecXchange acts as a facilitator and platform provider; we are not a party to individual recruitment transactions unless explicitly stated in a specific role.
                </p>
              </section>

              {/* 2. Split Fee Protocol */}
              <section>
                <HolographicCard color="cyan" variant="feature">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
                      <Scale size={20} />
                    </div>
                    <div>
                      <h2 className="text-cyan-400 font-bold text-lg sm:text-xl mb-2">Mandatory Split Fee Protocol</h2>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Integrity is non-negotiable. Every collaboration initiated on the platform must be formalized through a digital <span className="text-white font-semibold">Split Fee Agreement (SFA)</span>.
                      </p>
                      <p className="text-xs text-cyan-300/70 italic mt-4">
                        Note: RecXchange will not provide dispute mediation or account support for any placements where a valid SFA was not uploaded to the platform prior to the candidate shortlist submission.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </section>

              {/* 3. Non-Circumvention */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                    <AlertTriangle size={20} />
                  </div>
                  <h2 className="text-white font-bold text-xl sm:text-2xl">Non-Circumvention & Poaching</h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Members are strictly prohibited from engaging in unauthorized outreach to candidates or clients introduced by another Member. Any attempt to "bypass" the platform tracking or fee terms constitutes a material breach of contract and will result in <span className="text-red-400 font-bold uppercase text-[11px] ml-1">immediate account termination</span> and potential legal recovery of lost fees.
                </p>
              </section>

              {/* 4. Governing Law */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400">
                    <Globe size={20} />
                  </div>
                  <h2 className="text-white font-bold text-xl sm:text-2xl">Governing Law & Jurisdiction</h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  While operated from the UAE, these terms are governed by and construed in accordance with the <span className="text-white font-semibold">laws of England and Wales</span>. Any dispute arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <div className="pt-8 border-t border-purple-400/20">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By accessing RecXchange, you agree to abide by these terms. We reserve the right to update these terms at any time. Members will be notified of significant changes via their registered email address.
                </p>
              </div>
            </div>
          </HolographicCard>

          {/* Legal Footer Navigation */}
          <footer className="mt-8 sm:mt-12">
            <div className="glass-card py-4 px-6 sm:px-10 rounded-full border-fuchsia-400/10 flex flex-wrap justify-between items-center gap-4 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
              <span className="text-gray-500">License: DXB-1508955</span>
              <div className="flex flex-wrap gap-6 sm:gap-8">
                <Link href="/legal/privacy" className="hover:text-fuchsia-400 transition-colors">Privacy Policy</Link>
                <Link href="/legal/gdpr" className="hover:text-fuchsia-400 transition-colors">GDPR Portal</Link>
                <Link href="/legal/affiliate" className="hover:text-fuchsia-400 transition-colors">Affiliate Rewards</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
