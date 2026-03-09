"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Shield, Lock, FileText, AlertCircle } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import Breadcrumbs from '@/components/Breadcrumbs';

const sections = [
  { id: 'scope', title: 'Scope of Compliance', icon: Shield },
  { id: 'rights', title: 'Data Subject Rights', icon: FileText },
  { id: 'breach', title: 'Breach Protocol', icon: AlertCircle },
  { id: 'transfers', title: 'Cross-Border Data Flows', icon: Lock },
];

export default function GDPRPage() {
  const [activeSection, setActiveSection] = useState('scope');
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
          <Breadcrumbs />

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 mt-6">
            <StatusBadge label="YOUR RIGHTS, OUR RESPONSIBILITY" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              GDPR Compliance
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              RecXchange is fully compliant with the General Data Protection Regulation (GDPR). We're committed to protecting your personal data and respecting your privacy rights.
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
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <button onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                              activeSection === section.id ? 'bg-cyan-400/10 text-cyan-400 font-bold border-l-2 border-cyan-400' : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                            }`}>
                            <Icon size={14} />
                            {section.title}
                          </button>
                        </li>
                      );
                    })}
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
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <button onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                              activeSection === section.id ? 'bg-cyan-400/10 text-cyan-400 font-bold' : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                            }`}>
                            <Icon size={14} />
                            {section.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.nav>
              )}
            </div>

            {/* Content */}
            <article>
              <HolographicCard color="purple" variant="content">
                <div className="prose prose-invert max-w-none">
                  {/* Introduction */}
                  <section className="mb-12">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                      The General Data Protection Regulation (GDPR) is one of the world's strongest data protection laws. At RecXchange, we embrace these standards and apply them globally, not just in the EU and UK.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      This page explains how RecXchange complies with GDPR requirements and what rights you have regarding your personal data. For full details, please see our <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link>.
                    </p>
                  </section>

                  {/* Scope of Compliance */}
                  <section id="scope" className="mb-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <Shield className="text-cyan-400" size={28} />
                      Scope of Compliance
                    </h2>
                    <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        Our privacy infrastructure is engineered to meet or exceed the world's most stringent data laws. We maintain a single, high-water mark policy that covers <strong className="text-white">UK/EU GDPR</strong>, UAE PDPL, California CCPA, Canada PIPEDA, and Brazil LGPD.
                      </p>
                    </div>
                  </section>

                  {/* Data Subject Rights */}
                  <section id="rights" className="mb-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <FileText className="text-fuchsia-400" size={28} />
                      Data Subject Rights
                    </h2>
                    <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5 space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        You retain full sovereignty over your data. You have the right to access, rectify, delete, and port your information. All SAR (Subject Access Requests) are acknowledged immediately and fulfilled within <strong className="text-white">2 business days</strong>.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
                        <li><strong className="text-white">Right of Access:</strong> Request a copy of your personal data</li>
                        <li><strong className="text-white">Right to Rectification:</strong> Correct inaccurate information</li>
                        <li><strong className="text-white">Right to Erasure:</strong> Delete your data ("right to be forgotten")</li>
                        <li><strong className="text-white">Right to Data Portability:</strong> Receive your data in machine-readable format</li>
                      </ul>
                    </div>
                  </section>

                  {/* Breach Protocol */}
                  <section id="breach" className="mb-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertCircle className="text-red-400" size={28} />
                      Breach Protocol
                    </h2>
                    <div className="glass-card p-6 rounded-lg border-red-400/20 bg-red-400/5 space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Security is proactive. In the unlikely event of a high-risk data breach, RecXchange is committed to notifying the relevant supervisory authorities and affected users within <strong className="text-white">72 hours</strong> of detection.
                      </p>
                    </div>
                  </section>

                  {/* Cross-Border Data Flows */}
                  <section id="transfers" className="mb-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <Lock className="text-purple-400" size={28} />
                      Cross-Border Data Flows
                    </h2>
                    <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We utilize Standard Contractual Clauses (SCCs) to ensure your data remains protected even when moving between global recruitment jurisdictions.
                      </p>
                      <div className="flex gap-4 pt-4">
                        <Link href="mailto:privacy@recxchange.io" className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-cyan-300 transition-colors">
                          Contact DPO →
                        </Link>
                      </div>
                    </div>
                  </section>

                  <div className="mt-12 pt-8 border-t border-cyan-400/20 text-center">
                    <p className="text-gray-500 text-xs mb-4">
                      <strong className="text-white">Related Documents:</strong> This page should be read alongside our full <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link> and <Link href="/legal/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms of Service</Link>.
                    </p>
                    <p className="text-gray-500 text-xs mb-4">
                      <strong className="text-white">Governing Law:</strong> This statement is governed by the laws of England and Wales, in accordance with our Terms of Service.
                    </p>
                    <p className="text-gray-500 text-xs">
                      Thank you for trusting RecXchange with your personal data. Your privacy and data protection rights are fundamental to how we operate.
                    </p>
                    <p className="text-gray-500 text-xs mt-4">
                      <strong className="text-white">Last updated:</strong> January 2026
                    </p>
                  </div>
                </div>
              </HolographicCard>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
