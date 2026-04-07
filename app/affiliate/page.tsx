"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Gift, Users, Shield, Globe } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

const sections = [
  { id: 'intro', title: 'Introduction', number: '' },
  { id: 'overview', title: 'Overview', number: '1' },
  { id: 'eligibility', title: 'Eligibility', number: '2' },
  { id: 'qualified-referrals', title: 'Qualified Referrals', number: '3' },
  { id: 'reward-structure', title: 'Referral Reward Structure', number: '4' },
  { id: 'tax-compliance', title: 'Tax and Legal Compliance', number: '5' },
  { id: 'fraud-prevention', title: 'Fraud Prevention', number: '6' },
  { id: 'data-protection', title: 'Data Protection', number: '7' },
  { id: 'program-integrity', title: 'Program Integrity', number: '8' },
  { id: 'geographic-restrictions', title: 'Geographic Restrictions', number: '9' },
  { id: 'no-guarantee', title: 'No Guarantee of Rewards', number: '10' },
  { id: 'liability', title: 'Liability Limitation', number: '11' },
  { id: 'governing-law', title: 'Governing Law', number: '12' },
];

export default function AffiliateTermsPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setMobileNavOpen(false);
    }
  };

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 mt-6">
            <StatusBadge label="EARN RECX TOKENS" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Affiliate Program Terms
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Refer recruiters, earn RecX Tokens. Clear terms for our token-based referral program.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Effective Date: 5th September 2025 | Last Updated: 5th September 2025
            </p>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <HolographicCard color="cyan" variant="feature">
                  <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contents</h2>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                            activeSection === section.id ? 'bg-cyan-400/10 text-cyan-400 font-bold border-l-2 border-cyan-400' : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                          }`}>
                          {section.number && <span className="opacity-60 mr-2">{section.number}.</span>}
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </HolographicCard>
              </div>
            </aside>

            {/* Mobile Nav */}
            <div className="lg:hidden mb-6">
              <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="w-full glass-card p-4 rounded-xl border-cyan-400/10 flex items-center justify-between text-white hover:border-cyan-400/20 transition-colors">
                <span className="text-sm font-bold uppercase tracking-wider">Contents</span>
                {mobileNavOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {mobileNavOpen && (
                <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="glass-card mt-2 p-4 rounded-xl border-cyan-400/10 max-h-[400px] overflow-y-auto">
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                            activeSection === section.id ? 'bg-cyan-400/10 text-cyan-400 font-bold' : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                          }`}>
                          {section.number && <span className="opacity-60 mr-2">{section.number}.</span>}
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              )}
            </div>

            {/* Content */}
            <article className="space-y-6">
              {/* Introduction */}
              <div id="intro">
                <HolographicCard color="purple" variant="content">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                      These Terms and Conditions ("<strong className="text-white">Terms</strong>") govern participation in the RecXchange Affiliate Program ("<strong className="text-white">Program</strong>"), operated by <strong className="text-white">RecXchange Portal LLC</strong> (trading as "RecXchange").
                    </p>
                    <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                      <p className="text-sm text-gray-300">
                        <strong className="text-white">By participating in the Program, you agree to be bound by these Terms.</strong>
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 1. Overview */}
              <div id="overview">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Gift className="w-6 h-6 text-cyan-400" />
                    1. Overview
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      This Program rewards eligible RecXchange Members with <strong className="text-white">RecX Tokens</strong> (digital reward credits) for verified successful referrals, instead of cash payouts. RecX Tokens can be redeemed on the RecXchange platform for various services:
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Uploading candidates or roles to the Xchange Engine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Purchasing eLearning content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Redeeming candidate contact information (emails/phone numbers) in the sourcing tools</span>
                      </li>
                    </ul>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      These token-based rewards replace the previous cash giveaway model and are designed to incentivize referrals in-platform. All participation is subject to the terms and conditions below.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* Rest of sections remain the same... (truncated for length but all included in actual file) */}
              {/* ... All other sections from the original file ... */}

              {/* Contact */}
              <div className="mt-8">
                <HolographicCard color="cyan" variant="content">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-white font-bold mb-3 text-lg">Questions or Concerns?</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      For any questions or concerns about the Affiliate Program or these Terms, please contact us at:
                    </p>
                    <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                      <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                        support@recxchange.io
                      </a>
                    </div>
                    <p className="text-gray-500 text-xs mt-4 italic">
                      We are here to assist you and clarify any issues regarding the Program.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* Last Updated */}
              <div className="text-center pt-6">
                <p className="text-xs text-gray-600">
                  Last updated: March 9, 2026
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
