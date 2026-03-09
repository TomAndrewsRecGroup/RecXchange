"use client";
import React from 'react';
import { motion } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function AffiliateTermsPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="LEGAL" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Affiliate Program Terms
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              Terms and conditions for the RecXchange Affiliate Program.
            </p>
          </motion.header>

          <HolographicCard color="purple" variant="content">
            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">1. Program Overview</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  The RecXchange Affiliate Program allows approved participants to earn tokens by referring new users to the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">2. Eligibility</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  To participate in the Affiliate Program, you must:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Be an active RecXchange user in good standing</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Comply with all platform terms and policies</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>Not engage in fraudulent or misleading promotional activities</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">3. Token Rewards</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  Affiliates earn tokens based on the tier of new users they refer:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span><span>1 token for each Free tier signup</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span>10 tokens for each Lite tier signup</span></li>
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>25 tokens for each Pro tier signup</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Referral Attribution</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Referrals are tracked via unique affiliate links. New users must sign up using your link to be attributed to you. Credits are issued after the referred user completes account verification.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">5. Prohibited Activities</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  The following activities are strictly prohibited:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span><span>Self-referrals or creating fake accounts</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span><span>Spamming or unsolicited marketing</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span><span>Misrepresenting RecXchange features or pricing</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span><span>Using paid advertising without prior approval</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Termination</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  RecXchange reserves the right to terminate affiliate accounts that violate these terms. Earned tokens may be forfeited in cases of fraud or abuse.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">7. Program Changes</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  RecXchange may modify token reward rates, eligibility requirements, or program terms at any time with reasonable notice to active affiliates.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">8. Contact</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  For questions about the Affiliate Program, contact{' '}
                  <a href="mailto:affiliates@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    affiliates@recxchange.io
                  </a>
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-cyan-400/20 text-center">
                <p className="text-gray-500 text-xs">Last updated: February 27, 2026</p>
              </div>
            </div>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
