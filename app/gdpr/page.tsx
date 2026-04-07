"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, Globe, Lock, FileText, Users, AlertCircle, Database, Scale, UserCheck, Bell, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import { internalLinks } from '@/lib/internal-links';

const sections = [
  { id: 'intro', title: 'Purpose and Scope', number: '', icon: Shield },
  { id: 'definitions', title: 'Definitions', number: '1', icon: FileText },
  { id: 'principles', title: 'Data Protection Principles', number: '2', icon: CheckCircle },
  { id: 'lawful-bases', title: 'Lawful Bases for Processing', number: '3', icon: Scale },
  { id: 'data-subject-rights', title: 'Data Subject Rights', number: '4', icon: UserCheck },
  { id: 'accountability', title: 'Controller Accountability', number: '5', icon: Eye },
  { id: 'member-obligations', title: 'Member Obligations', number: '6', icon: Users },
  { id: 'data-sharing', title: 'Data Sharing & Disclosures', number: '7', icon: Database },
  { id: 'international-transfers', title: 'International Data Transfers', number: '8', icon: Globe },
  { id: 'data-retention', title: 'Data Retention & Deletion', number: '9', icon: Database },
  { id: 'data-security', title: 'Data Security Measures', number: '10', icon: Lock },
  { id: 'breach-response', title: 'Data Breach Response', number: '11', icon: AlertCircle },
  { id: 'enforcement', title: 'Enforcement & Compliance', number: '12', icon: Scale },
  { id: 'contact', title: 'Contact Information', number: '13', icon: Bell },
];

export default function GDPRPage() {
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
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-14 mt-6">
            <StatusBadge label="GLOBAL DATA PROTECTION POLICY" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              GDPR Compliance
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Comprehensive data protection compliance framework for UK GDPR, EU GDPR, and 8 major international privacy standards.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Last updated: September 2025
            </p>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <HolographicCard color="cyan" variant="feature">
                  <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contents</h2>
                  <ul className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <button onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
                              activeSection === section.id ? 'bg-cyan-400/10 text-cyan-400 font-bold border-l-2 border-cyan-400' : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                            }`}>
                            <Icon size={14} className="flex-shrink-0" />
                            <span className="flex-1">
                              {section.number && <span className="opacity-60 mr-2">{section.number}.</span>}
                              {section.title}
                            </span>
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
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-purple-400" />
                    Purpose and Scope
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      This Global Data Protection Policy outlines how <strong className="text-white">RecXchange Portal LLC</strong> protects personal data in compliance with applicable data protection laws worldwide. RecXchange is a recruiter-to-recruiter collaboration platform headquartered in the United Arab Emirates (Dubai) and operating under the laws of England and Wales.
                    </p>

                    <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                      <h4 className="text-sm font-bold text-white mb-3">Applicable Laws</h4>
                      <p className="text-xs text-gray-400 mb-2">This Policy meets or exceeds the requirements of major data protection regulations globally:</p>
                      <ul className="space-y-2 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">UK GDPR and EU GDPR:</strong> UK General Data Protection Regulation, EU GDPR, UK Data Protection Act 2018</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">United States:</strong> California Consumer Privacy Act (CCPA/CPRA), Virginia, Colorado state laws</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Canada:</strong> Personal Information Protection and Electronic Documents Act (PIPEDA)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Brazil:</strong> Lei Geral de Proteção de Dados (LGPD)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Australia:</strong> Privacy Act 1988 (Australian Privacy Principles)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">South Africa:</strong> Protection of Personal Information Act (POPIA)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Singapore:</strong> Personal Data Protection Act (PDPA)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">UAE:</strong> Federal Decree-Law No. 45 of 2021 (Personal Data Protection Law)</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-400 text-sm">
                      This Policy applies to all processing of personal data by RecXchange globally, including data of platform Members, candidates/clients shared via the platform, employees, contractors, and any identifiable individuals whose data we handle.
                    </p>

                    <p className="text-gray-500 text-xs italic">
                      This Policy complements our <Link href={internalLinks.privacy} className="text-cyan-400 hover:underline">Privacy Policy</Link> and <Link href={internalLinks.terms} className="text-cyan-400 hover:underline">Terms & Conditions</Link>, providing a comprehensive compliance framework.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 1. Definitions */}
              <div id="definitions">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <FileText className="w-6 h-6 text-fuchsia-400" />
                    1. Definitions
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">For purposes of this Policy:</p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Personal Data</h4>
                        <p className="text-xs text-gray-400">Any information relating to an identified or identifiable natural person. This includes names, contact details, identification numbers, IP addresses, or any data that can identify a person when combined.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Processing</h4>
                        <p className="text-xs text-gray-400">Any operation performed on personal data, including collection, recording, organizing, storing, adapting, retrieving, consulting, using, disclosing, erasing, or destroying data.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Data Subject</h4>
                        <p className="text-xs text-gray-400">The individual to whom personal data relates. May include Members, candidates, client representatives, or any person whose data is shared on the platform.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Data Controller</h4>
                        <p className="text-xs text-gray-400">The entity that determines the purposes and means of processing personal data. RecXchange Portal LLC is the primary Data Controller for platform operations.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Data Processor</h4>
                        <p className="text-xs text-gray-400">An entity that processes personal data on behalf of a controller. RecXchange acts as a processor when hosting candidate data shared between Members.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Member</h4>
                        <p className="text-xs text-gray-400">An approved user of the RecXchange platform, typically an independent recruitment professional or agency collaborating via split-fee arrangements.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Special Category (Sensitive) Data</h4>
                        <p className="text-xs text-gray-400">Personal data about racial/ethnic origin, health, biometric identifiers, or criminal background. RecXchange avoids collecting sensitive data unless absolutely necessary and with explicit consent.</p>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 2. Data Protection Principles */}
              <div id="principles">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                    2. Data Protection Principles
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange upholds the core data protection principles found in GDPR, UK GDPR, and mirrored in laws like LGPD, POPIA, and PDPA:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Lawfulness, Fairness, and Transparency:</strong> We process personal data lawfully (with valid legal basis), fairly (in expected ways), and transparently (with clear notices via Privacy Policy).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Purpose Limitation:</strong> We collect data for specified, explicit purposes and do not process it for unrelated purposes without additional consent.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Data Minimization:</strong> We collect only the minimum data necessary for recruitment collaboration. No excessive or irrelevant data collection.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Accuracy:</strong> We ensure personal data is accurate and up-to-date, with prompt rectification when notified of inaccuracies.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Storage Limitation:</strong> Personal data is retained only as long as necessary for its purpose, then securely deleted or anonymized.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Integrity and Confidentiality:</strong> Appropriate security measures protect against unauthorized processing, accidental loss, or damage.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Accountability:</strong> RecXchange demonstrates compliance through documentation, training, risk assessments, DPIAs, and continuous monitoring.</span>
                      </li>
                    </ul>
                  </div>
                </HolographicCard>
              </div>

              {/* 3. Lawful Bases for Processing */}
              <div id="lawful-bases">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Scale className="w-6 h-6 text-purple-400" />
                    3. Lawful Bases for Processing
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange processes personal data only where we have a valid legal basis as required by GDPR and analogous laws:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Consent:</strong> Clear and affirmative consent for marketing communications. Members must obtain candidate consent before uploading or sharing personal details on RecXchange.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Contractual Necessity:</strong> Processing necessary to perform our contract with Members (account setup, facilitating communications, payment processing).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Legal Obligation:</strong> Where law requires data processing (court orders, tax/accounting requirements, regulatory compliance).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Legitimate Interests:</strong> Platform security, fraud prevention, service improvement, dispute resolution - balanced against individual rights.</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 mt-4">
                      <p className="text-xs text-gray-400">
                        <strong className="text-white">Important:</strong> RecXchange does not use personal data for automated decision-making with legal/significant effects without human involvement. If this changes, we will obtain explicit consent and inform Data Subjects of their rights.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 4. Data Subject Rights */}
              <div id="data-subject-rights">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-fuchsia-400" />
                    4. Data Subject Rights
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We respect and uphold all data subject rights under UK/EU GDPR and analogous global privacy laws:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Be Informed:</strong> Clear, transparent information about data collection and use via this Policy and Privacy Policy.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right of Access:</strong> Request confirmation and copies of personal data we hold, with supplementary information (purposes, categories, recipients).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Rectification:</strong> Correct inaccurate or incomplete personal data. Members can update profile information directly.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Erasure (Right to be Forgotten):</strong> Request deletion when data is no longer necessary, consent withdrawn, or no legal ground exists.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Restrict Processing:</strong> Limit processing in certain scenarios (contesting accuracy, objection pending evaluation).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Data Portability:</strong> Receive personal data in structured, machine-readable format (CSV) and transmit to another controller.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Object:</strong> Absolute right to opt-out of direct marketing. Object to processing based on legitimate interests or public interest.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing (e.g., unsubscribe from newsletters).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Non-Discrimination:</strong> No denial of services, different pricing, or lower quality for exercising privacy rights.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Right to Lodge a Complaint:</strong> File complaints with local data protection authority (UK ICO for GDPR, or relevant supervisory authority).</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Exercising Your Rights</h4>
                      <p className="text-xs text-gray-400">
                        Contact <a href="mailto:legal@recxchange.io" className="text-fuchsia-400 hover:underline">legal@recxchange.io</a> to exercise rights. We respond within 30 days (GDPR requirement). Identity verification required to prevent unauthorized disclosure.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 5. Controller Accountability */}
              <div id="accountability">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    5. Controller Accountability
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange Portal LLC (Dubai, UAE) is the principal Data Controller with the UK ICO as lead supervisory authority for cross-border matters.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Policies and Governance</h4>
                        <p className="text-xs text-gray-400">Privacy by Design and Default integrated into all business processes. Data Protection Impact Assessments (DPIAs) for high-risk processing.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Record-Keeping</h4>
                        <p className="text-xs text-gray-400">GDPR Article 30 records maintained covering categories of data, purposes, recipients, transfers, retention, and security measures.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Training and Awareness</h4>
                        <p className="text-xs text-gray-400">Regular training for all employees handling personal data. Confidentiality agreements and culture of privacy awareness.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Audits and Monitoring</h4>
                        <p className="text-xs text-gray-400">Periodic compliance audits and third-party assessments. Monitoring of regulatory developments and policy updates.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Vendor Management</h4>
                        <p className="text-xs text-gray-400">Due diligence on all service providers (processors). Maintained list of current processors available on request.</p>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 6. Member Obligations */}
              <div id="member-obligations">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Users className="w-6 h-6 text-purple-400" />
                    6. Member Obligations
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      All RecXchange Members must uphold high data protection standards when handling personal data through the platform:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Compliance with Laws:</strong> Adhere to all applicable data protection laws in your jurisdiction (GDPR, POPIA, PDPA, CCPA, etc.).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Obtain Consent Before Sharing:</strong> Do not upload or share candidate data without explicit consent. Inform candidates about RecXchange and obtain permission. Document consent.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Use Data Only for Intended Purpose:</strong> Personal data must be used solely for the specific recruitment purpose shared. No repurposing for unrelated roles or clients.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Confidentiality and Security:</strong> Treat all personal data as confidential. Implement adequate security measures. No data scraping or mass downloading.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">No Circumvention:</strong> Never use data to bypass another Member. 24-month non-circumvention period applies. No poaching candidates or clients.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Cross-Border Compliance:</strong> Ensure lawful international data transfers. Inform candidates if data shared outside EEA/home country.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Honour Data Subject Rights:</strong> Comply with candidate requests to delete, correct, or stop processing their data. Inform RecXchange of such requests.</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Consequences of Non-Compliance</h4>
                      <p className="text-xs text-gray-400">
                        Misuse of personal data results in account suspension/termination, potential regulatory fines, legal liability, and indemnification obligations to RecXchange. Professional reputation damage from privacy violations is irreparable.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 7. Data Sharing & Disclosures */}
              <div id="data-sharing">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Database className="w-6 h-6 text-fuchsia-400" />
                    7. Data Sharing & Disclosures
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange shares personal data in controlled, secure ways. We do not sell or rent personal data to third parties.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Other RecXchange Members</h4>
                        <p className="text-xs text-gray-400">Data shared between Members as part of core collaboration functionality (job opportunities, candidate profiles). All exchanges logged and monitored.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Service Providers (Processors)</h4>
                        <p className="text-xs text-gray-400">Cloud hosting (AWS), payment processors (Stripe, PayPal), analytics (Google Analytics), communication tools, customer support software. All bound by data processing agreements.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Legal and Regulatory Disclosure</h4>
                        <p className="text-xs text-gray-400">Court orders, subpoenas, law enforcement requests, data protection regulator inquiries. Disclosure to protect rights, prevent harm, or defend legal claims.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Safeguards</h4>
                      <ul className="space-y-1 text-xs text-gray-400">
                        <li>• Least privilege: minimum data shared for purpose</li>
                        <li>• Contractual obligations: GDPR Article 28 data processing clauses</li>
                        <li>• No unauthorized third-party access without consent</li>
                        <li>• International transfer compliance (see Section 8)</li>
                      </ul>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 8. International Data Transfers */}
              <div id="international-transfers">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    8. International Data Transfers
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange is a global platform. All international data transfers comply with applicable laws to ensure adequate protection:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Standard Contractual Clauses (SCCs)</h4>
                        <p className="text-xs text-gray-400">EU Commission-approved SCCs and UK International Data Transfer Addendum for transfers from UK/EEA to third countries. Template contractual commitments binding data importers to EU/UK privacy standards.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Adequacy Decisions</h4>
                        <p className="text-xs text-gray-400">Reliance on EU/UK adequacy decisions for countries officially recognized as providing adequate protection (e.g., Canada under PIPEDA, Switzerland, Japan).</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Transfer Impact Assessments</h4>
                        <p className="text-xs text-gray-400">Evaluation of legal environment in data importing countries post-Schrems II. Ensuring SCCs can be complied with in practice.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Technical Measures</h4>
                        <p className="text-xs text-gray-400">All data in transit protected by HTTPS/TLS encryption. Data at rest encrypted in foreign servers. Confidential even if physically in another country.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Member-to-Member Transfers</h4>
                        <p className="text-xs text-gray-400">Platform terms incorporate clauses ensuring recipient Members protect data to GDPR/PDPL standards. Candidate consent should include international transfer acknowledgment.</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs italic mt-4">
                      By using RecXchange, Members acknowledge personal data may be transferred internationally as needed for the service, always in accordance with this Policy and applicable laws.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 9. Data Retention & Deletion */}
              <div id="data-retention">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Database className="w-6 h-6 text-purple-400" />
                    9. Data Retention & Deletion
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange retains personal data only as long as necessary for its purpose or as required by law:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Active Member Accounts</h4>
                        <p className="text-xs text-gray-400">Account information, profile data, and transaction history retained for duration of membership.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Former Members</h4>
                        <p className="text-xs text-gray-400"><strong className="text-white">7-year retention</strong> from end of membership for statutory limitation periods, financial record-keeping, and dispute resolution. Then deleted or anonymized.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Prospective Members</h4>
                        <p className="text-xs text-gray-400">Data from non-completed applications or inquiries retained up to 12 months, then deleted if no further engagement.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Candidate and Client Data</h4>
                        <p className="text-xs text-gray-400">Placement records retained 7 years as business/financial records. CV files disposed after deal conclusion unless ongoing lawful basis exists.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Communication Records</h4>
                        <p className="text-xs text-gray-400">Platform messages and support correspondence retained during active membership and 7-year former member period for dispute evidence.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Destruction and Anonymization</h4>
                        <p className="text-xs text-gray-400">Permanent deletion from active databases and backups, or anonymization (stripping all personal identifiers for aggregate statistics).</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Legal Hold Exception</h4>
                      <p className="text-xs text-gray-400">
                        Data preserved beyond normal retention if legal dispute, investigation, or preservation order requires it. Data isolated and used only for compliance/legal resolution.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 10. Data Security Measures */}
              <div id="data-security">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Lock className="w-6 h-6 text-fuchsia-400" />
                    10. Data Security Measures
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange implements robust information security to prevent breaches and unauthorized access:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Encryption:</strong> HTTPS/TLS for all communications. Strong encryption algorithms for data at rest in databases and backups. Secure key management.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Secure Infrastructure:</strong> 24/7 physical security in data centers. Firewalls, intrusion detection, regular security patches, network segmentation. Encrypted data backups.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Access Controls:</strong> Principle of least privilege. Role-based access. Multi-factor authentication for administrative access. Hashed password storage. Access logging and review.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Employee Training:</strong> Confidentiality agreements for all staff. Regular training on data handling, phishing recognition, secure practices. Non-compliance enforcement.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Vendor Security:</strong> Vetting for security certifications (ISO 27001, SOC 2). Security requirements in contracts. Breach notification obligations.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Testing and Auditing:</strong> Vulnerability scanning, penetration testing by independent experts, secure code review, audit logs protected from tampering. Anomaly alerts.</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">User Responsibilities</h4>
                      <p className="text-xs text-gray-400">
                        Keep login credentials confidential. Use strong, unique passwords. Enable 2FA if available. Be vigilant about phishing. Logout on shared computers. Report suspected unauthorized activity to support@recxchange.io.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 11. Data Breach Response */}
              <div id="breach-response">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-cyan-400" />
                    11. Data Breach Response
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      RecXchange has a defined procedure to respond to personal data breaches, minimize harm, and fulfill legal notification obligations:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Immediate Action</h4>
                        <p className="text-xs text-gray-400">Incident response team rapidly assesses situation. Secure systems, patch vulnerabilities, prevent further unauthorized access within hours/minutes.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Investigation</h4>
                        <p className="text-xs text-gray-400">Determine affected data, individuals, records, breach method. Engage forensic security experts if needed. Maintain detailed incident records.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Regulatory Notification</h4>
                        <p className="text-xs text-gray-400"><strong className="text-white">72-hour notification</strong> to supervisory authority (UK ICO, EU DPA) if breach likely risks individual rights. Initial notification with supplementary details if needed.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Individual Notification</h4>
                        <p className="text-xs text-gray-400">If <strong className="text-white">high risk</strong> to individuals (sensitive data, passwords, financial info), notify affected individuals without undue delay. Clear language with protective advice and contact info.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Containment and Recovery</h4>
                        <p className="text-xs text-gray-400">Deploy patches, change credentials, restore from clean backups, remove malicious code, improve failed processes. Keep affected users updated.</p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-1">Post-Incident Review</h4>
                        <p className="text-xs text-gray-400">Root-cause analysis to learn from event. Update security measures and training. Fix identified gaps in policies or technical controls.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Transparency Commitment</h4>
                      <p className="text-xs text-gray-400">
                        RecXchange will never hide a significant data breach. Swift, factual communication is crucial to maintaining trust and limiting damage. We will be forthright about what is known and unknown during ongoing investigations.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 12. Enforcement & Compliance */}
              <div id="enforcement">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Scale className="w-6 h-6 text-purple-400" />
                    12. Enforcement & Compliance
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      This Policy is a binding commitment enforced at every level:
                    </p>
                    
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Internal Enforcement:</strong> All personnel must comply. Breaches treated as serious misconduct with consequences including retraining, warnings, or termination. Audit trails and separation of duties.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Member Compliance Monitoring:</strong> Active monitoring of platform activity for policy violations. Investigation of complaints and red flags. Audit of Member activity when necessary.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Member Enforcement Actions:</strong> Warning/training for minor violations. Account suspension during investigations. Permanent termination/ban for serious violations (data misuse, scraping, poaching). Legal recourse for damages.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Third-Party Processor Compliance:</strong> Contractual enforcement with processors. Audits and compliance reviews. Swift corrective action or provider switching if non-compliant.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Regulatory Cooperation:</strong> Full cooperation with data protection authorities (ICO, Data Office, etc.). Transparency and good faith in inquiries/inspections. Compliance with directives.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span><strong className="text-white">Periodic Compliance Reviews:</strong> Regular reviews ensuring policy practices match stated commitments. Testing of response procedures. Results reported to senior management.</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Penalties for Non-Compliance</h4>
                      <p className="text-xs text-gray-400">
                        GDPR/UK GDPR fines up to 4% of global annual turnover or €20 million. Other laws (PDPL, CCPA/CPRA, LGPD, POPIA) have significant fine regimes and potential criminal sanctions. Reputational harm from violations is irreparable. Non-compliance is not worth the risk.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 13. Contact Information */}
              <div id="contact">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Bell className="w-6 h-6 text-cyan-400" />
                    13. Contact Information
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      For any questions, concerns, or requests regarding this Global Data Protection Policy or any aspect of how RecXchange handles personal data, please contact us:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Data Protection Officer</h4>
                        <a href="mailto:legal@recxchange.io" className="text-cyan-400 hover:underline text-sm block mb-1">legal@recxchange.io</a>
                        <p className="text-gray-500 text-xs">For data rights requests, privacy questions, or GDPR concerns</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">General Support</h4>
                        <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:underline text-sm block mb-1">support@recxchange.io</a>
                        <p className="text-gray-500 text-xs">For platform questions and general assistance</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        <strong className="text-white">RecXchange Portal LLC</strong><br />
                        Pinnacle Building, Sheikh Zayed Road<br />
                        Dubai, United Arab Emirates<br />
                        Trade Licence No: 1508955
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Response Times</h4>
                      <ul className="space-y-1 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span><strong className="text-white">Data Subject Rights Requests:</strong> Response within 30 days (GDPR requirement)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span><strong className="text-white">General Inquiries:</strong> Response within 2 business days</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span><strong className="text-white">Data Breach Notifications:</strong> Within 72 hours to supervisory authority</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-sm font-bold text-white mb-3">Related Policies</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-start gap-3">
                          <span className="text-cyan-400">→</span>
                          <span><Link href={internalLinks.privacy} className="text-cyan-400 hover:underline">Privacy Policy</Link> - Full data processing details</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-cyan-400">→</span>
                          <span><Link href={internalLinks.cookiePolicy} className="text-cyan-400 hover:underline">Cookie Policy</Link> - Tracking and cookies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-cyan-400">→</span>
                          <span><Link href={internalLinks.terms} className="text-cyan-400 hover:underline">Terms of Service</Link> - Platform usage terms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* Last Updated */}
              <div className="text-center pt-6">
                <p className="text-xs text-gray-600">
                  Last updated: September 2025
                </p>
                <p className="text-xs text-gray-700 mt-2">
                  Lead Supervisory Authority: UK Information Commissioner's Office (ICO)
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  Governed by the laws of England and Wales
                </p>
              </div>

            </article>
          </div>
        </div>
      </div>
    </main>
  );
}