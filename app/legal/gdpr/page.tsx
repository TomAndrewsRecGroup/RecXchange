"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function GDPRPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="EU COMPLIANCE" color="emerald" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              GDPR Compliance
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              How RecXchange complies with the General Data Protection Regulation.
            </p>
          </motion.header>

          <HolographicCard color="emerald" variant="content">
            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-emerald-400" size={28} />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Our Commitment to GDPR</h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  RecXchange is fully committed to compliance with the EU General Data Protection Regulation (GDPR). We implement technical and organizational measures to protect personal data and respect individual rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Legal Basis for Processing</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  We process personal data based on:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span><span><strong>Contract Performance:</strong> To provide recruitment services you've signed up for</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span><span><strong>Legitimate Interest:</strong> To improve our platform and prevent fraud</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span><span><strong>Consent:</strong> For marketing communications and optional features</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span><span><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Your GDPR Rights</h2>
                <div className="space-y-4">
                  {[
                    { right: 'Right to Access', desc: 'Request a copy of your personal data we hold' },
                    { right: 'Right to Rectification', desc: 'Correct inaccurate or incomplete data' },
                    { right: 'Right to Erasure', desc: 'Request deletion of your data ("right to be forgotten")' },
                    { right: 'Right to Restriction', desc: 'Limit how we use your data' },
                    { right: 'Right to Data Portability', desc: 'Receive your data in a machine-readable format' },
                    { right: 'Right to Object', desc: 'Object to processing based on legitimate interests' },
                    { right: 'Right to Withdraw Consent', desc: 'Withdraw consent for processing at any time' },
                  ].map((item, i) => (
                    <HolographicCard key={i} color="cyan" variant="feature">
                      <h3 className="text-white font-bold mb-2">{item.right}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                    </HolographicCard>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Protection Measures</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  RecXchange implements:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>End-to-end encryption for sensitive data</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Regular security audits and penetration testing</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Role-based access controls and data minimization</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Data Protection Impact Assessments (DPIAs) for high-risk processing</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Incident response procedures and breach notification protocols</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  When transferring data outside the EEA, we use Standard Contractual Clauses (SCCs) approved by the European Commission and ensure adequate safeguards are in place.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Exercising Your Rights</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  To exercise any GDPR rights, contact our Data Protection Officer at{' '}
                  <a href="mailto:dpo@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    dpo@recxchange.io
                  </a>
                  . We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-emerald-400/20 text-center">
                <p className="text-gray-500 text-xs">Last updated: February 27, 2026</p>
              </div>
            </div>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
