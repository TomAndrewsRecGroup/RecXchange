"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function PrivacyPolicyPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="YOUR DATA, YOUR RIGHTS" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Privacy Policy
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              How we collect, use, and protect your personal information.
            </p>
          </motion.header>

          <HolographicCard color="purple" variant="content">
            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Database className="text-cyan-400" size={24} />
                  Information We Collect
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  We collect information you provide directly, information from your use of our platform, and information from third-party sources.
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span><strong>Account Information:</strong> Name, email, company details, and profile information</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span><strong>Usage Data:</strong> Pages visited, features used, search queries, and interaction patterns</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span><strong>Candidate Data:</strong> CVs, contact details, and professional information you upload</span></li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span><span><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Eye className="text-fuchsia-400" size={24} />
                  How We Use Your Information
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  We use collected information to:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>Provide, maintain, and improve our recruitment services</span></li>
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>Match candidates with relevant roles using our AI algorithms</span></li>
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>Facilitate split fee agreements and collaboration between recruiters</span></li>
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>Send platform updates, security alerts, and support messages</span></li>
                  <li className="flex items-start gap-2"><span className="text-fuchsia-400 mt-1">•</span><span>Analyze usage patterns to improve user experience</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Lock className="text-emerald-400" size={24} />
                  Data Security
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We implement industry-standard security measures including encryption, secure servers, regular security audits, and strict access controls. All candidate data is encrypted at rest and in transit.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="text-purple-400" size={24} />
                  Your Rights
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  Under GDPR and other data protection laws, you have the right to:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>Access your personal data</span></li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>Correct inaccurate data</span></li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>Request deletion of your data</span></li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>Object to processing of your data</span></li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>Export your data in a portable format</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Sharing</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We do not sell your personal data. We share data only with your consent, with service providers who help operate our platform, or when required by law. Candidate information is shared with other recruiters only after explicit authorization through our matching system.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Retention</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We retain your data as long as your account is active or as needed to provide services. Candidate data is retained according to your instructions and regulatory requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  For privacy questions or to exercise your rights, contact our Data Protection Officer at{' '}
                  <a href="mailto:privacy@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    privacy@recxchange.io
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
