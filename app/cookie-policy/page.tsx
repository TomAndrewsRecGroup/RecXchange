"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function CookiePolicyPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="TRANSPARENT TRACKING" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Cookie Policy
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              We use cookies to improve your experience. Here's exactly what we track and why.
            </p>
          </motion.header>

          {/* Content */}
          <HolographicCard color="cyan" variant="content">
            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  This Cookie Policy explains how RecXchange uses cookies and similar tracking technologies when you visit our website or use our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Cookie className="text-cyan-400" size={24} />
                  What Are Cookies?
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Cookies are small text files stored on your device when you visit websites. They help us recognize your device, remember your preferences, and improve your experience.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Essential Cookies', desc: 'Required for the platform to function. These cookies are necessary for authentication, security, and core features. You cannot opt out of these.', color: 'emerald' },
                    { title: 'Performance Cookies', desc: 'Help us understand how visitors use our site through analytics (e.g., Google Analytics). Data is anonymized and aggregated.', color: 'cyan' },
                    { title: 'Functionality Cookies', desc: 'Remember your preferences and settings to provide a personalized experience.', color: 'purple' },
                    { title: 'Marketing Cookies', desc: 'Track engagement with marketing content. Only used with your explicit consent.', color: 'fuchsia' }
                  ].map((type, i) => (
                    <HolographicCard key={i} color={type.color as any} variant="feature">
                      <h3 className="text-white font-bold mb-2">{type.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">{type.desc}</p>
                    </HolographicCard>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Managing Cookies</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  You have full control over cookies. When you first visit our site, you'll see a cookie banner allowing you to accept or customize your preferences.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  You can also manage cookies through your browser settings. Note that blocking essential cookies may impact platform functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Questions?</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  For questions about our cookie usage, contact us at{' '}
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
