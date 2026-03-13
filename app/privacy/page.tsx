"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, Lock, Eye, UserCheck, Globe, Database, FileText, AlertCircle, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

const sections = [
  { id: 'intro', title: 'Introduction', number: '' },
  { id: 'who-we-are', title: 'Who We Are', number: '1' },
  { id: 'data-collected', title: 'What Personal Data We Collect', number: '2' },
  { id: 'how-collected', title: 'How We Collect Personal Data', number: '3' },
  { id: 'how-used', title: 'How We Use Your Personal Data', number: '4' },
  { id: 'legal-bases', title: 'Legal Bases for Processing', number: '5' },
  { id: 'consent-marketing', title: 'Consent and Marketing', number: '6' },
  { id: 'data-sharing', title: 'Data Sharing and Disclosures', number: '7' },
  { id: 'member-responsibilities', title: 'Member Responsibilities', number: '8' },
  { id: 'international-transfers', title: 'International Data Transfers', number: '9' },
  { id: 'data-retention', title: 'Data Retention', number: '10' },
  { id: 'data-security', title: 'Data Security', number: '11' },
  { id: 'your-rights', title: 'Your Rights', number: '12' },
  { id: 'external-links', title: 'External Links', number: '13' },
  { id: 'policy-updates', title: 'Policy Updates', number: '14' },
  { id: 'contact', title: 'Contact Details', number: '15' },
];

export default function PrivacyPolicyPage() {
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
            <StatusBadge label="YOUR PRIVACY, OUR PRIORITY" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6">
              Privacy Policy
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              We're committed to protecting your personal data and being fully transparent about how we use it.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Last updated: March 9, 2026
            </p>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <HolographicCard color="cyan" variant="feature">
                  <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contents</h2>
                  <ul className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
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
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      At RecXchange, your trust is our priority. We're committed to protecting your personal data and operating in full compliance with <strong className="text-white">UK GDPR</strong>, <strong className="text-white">EU GDPR</strong>, and other applicable data protection laws globally. This Privacy Policy explains how we collect, use, share, and safeguard your personal data, and outlines your rights under relevant data protection laws.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 1. Who We Are */}
              <div id="who-we-are">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    1. Who We Are
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange is a global recruiter-to-recruiter collaboration platform operated by <strong className="text-white">RecXchange Portal LLC</strong>, a company registered in Dubai, United Arab Emirates (Trade Licence No. 1508955). Our platform enables independent recruitment professionals to connect, share vacancies and candidates, and enter into split-fee arrangements in a trusted network.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      While headquartered in the UAE, our services are governed by the laws of <strong className="text-white">England and Wales</strong> for consistency, as stated in our <Link href="/terms" className="text-cyan-400 hover:underline">Terms & Conditions</Link>.
                    </p>
                    <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                      <p className="text-sm text-gray-300">
                        <strong className="text-white">RecXchange Portal LLC</strong> is the <strong className="text-white">data controller</strong> responsible for your personal data in connection with our services.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 2. What Personal Data We Collect */}
              <div id="data-collected">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Database className="w-6 h-6 text-fuchsia-400" />
                    2. What Personal Data We Collect
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We only collect the personal information necessary to provide and improve our services. This may include:
                    </p>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Identity and Contact Data:</strong> Your name, business or personal contact details (email address, telephone number, physical address).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Professional Information:</strong> Your company or agency name, job title, and LinkedIn profile URL (used to verify your role in the recruitment industry).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Financial and Transaction Data:</strong> Payment or billing information such as credit card details or bank account information (for subscription payments, commission disbursements or split-fee transactions).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Profile and Membership Data:</strong> Information you provide when registering or filling out your profile on RecXchange (e.g. business specialties, regions, and any content you upload).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Candidate/Client Data (Third-Party Personal Data):</strong> Details of candidates or client contacts that you choose to share on the platform. <strong className="text-white">You must ensure you have the right and consent to share this data</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Communications:</strong> Records of our correspondence with you and any information you submit through forms or messages on the platform.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Usage Data:</strong> Technical and usage information when you use RecXchange, such as log-in times, pages viewed, search queries, IP address, browser type, and operating system.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Marketing Preferences:</strong> Your preferences for receiving marketing or updates from us (only collected if you opt-in).</span>
                      </li>
                    </ul>
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                      <p className="text-xs text-gray-400">
                        We do <strong className="text-white">not</strong> intentionally collect any sensitive personal data (also known as special category data, such as information about health, race, religion, or biometrics) unless it is absolutely necessary and you have explicitly consented. We also do not knowingly collect data from anyone under 18.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 3. How We Collect Personal Data */}
              <div id="how-collected">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Eye className="w-6 h-6 text-purple-400" />
                    3. How We Collect Personal Data
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We collect personal data through various channels, including:
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span><strong className="text-white">Directly from You:</strong> When you fill out our online registration forms, update your profile, submit a candidate or vacancy, contact us via email/phone, or communicate through the platform.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span><strong className="text-white">Through Our Website:</strong> Via cookies and analytics tools that track your usage of our site.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span><strong className="text-white">Referrals or Partnerships:</strong> If you were invited to the platform by another Member or through a referral program, we may receive basic information about you from the referrer (with your consent).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span><strong className="text-white">Newsletters or Events:</strong> If you sign up for our newsletter or attend a RecXchange event/webinar, we may collect your name and contact details.</span>
                      </li>
                    </ul>
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">No Third-Party Data Purchasing</h4>
                      <p className="text-xs text-gray-400">
                        All personal data we process is obtained directly from you or your authorized actions. We do <strong className="text-white">not</strong> buy, rent, or scrape personal data from third-party sources.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 4. How We Use Your Personal Data */}
              <div id="how-used">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    4. How We Use Your Personal Data
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We use your personal data to run and improve the RecXchange platform and to provide our services to you. Specifically, we use data for the following purposes:
                    </p>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To register and identify you as a Member:</strong> Creating your account and verifying your credentials so you can access the platform.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To facilitate recruiter collaborations:</strong> Enabling introductions, vacancy postings, candidate profile sharing, and communications between Members for potential split-fee placements.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">For communication and support:</strong> To send service messages, respond to your inquiries, provide customer support, and keep the platform running smoothly.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To provide and record payments and transactions:</strong> Using your data for subscription billing, invoicing, commission splits and reconciliation.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To facilitate secure fee transfers (Escrow service):</strong> If you opt to use our escrow protection service (once available), we will use relevant data to enable that transaction.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To improve our platform and services:</strong> Analyzing usage data and feedback to develop new features, enhance user experience, and ensure the platform's effectiveness.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">For marketing (with consent):</strong> Sending you newsletters, industry updates, new feature announcements, or promotions only if you have agreed to receive them.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To comply with legal and tax obligations:</strong> Fulfilling our duties under applicable laws, such as maintaining transaction records for tax auditing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To ensure platform integrity and enforce our terms:</strong> Monitoring and using data to prevent fraudulent, unauthorized or harmful activities on RecXchange.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span><strong className="text-white">To support dispute resolution and legal processes:</strong> In the event of a dispute between Members or a legal claim related to platform use, we may process and retain relevant data to help resolve the issue.</span>
                      </li>
                    </ul>
                    <p className="text-gray-500 text-xs italic mt-4">
                      We do <strong className="text-white">not use</strong> your personal data for any kind of automated decision-making or profiling that has legal or significant effects on you without your explicit consent.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 5. Legal Bases for Processing */}
              <div id="legal-bases">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <FileText className="w-6 h-6 text-fuchsia-400" />
                    5. Legal Bases for Processing
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We process personal data only when we have a valid legal basis under the GDPR and equivalent laws. Under Article 6 of the UK GDPR, the primary lawful bases we rely on are:
                    </p>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Consent:</strong> We will ask for your consent in situations where it is required, for example, when you subscribe to marketing emails. You have the right to withdraw consent at any time.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Contract:</strong> We process data that is necessary to perform our contract with you — i.e., to provide the RecXchange services you signed up for.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Legal Obligation:</strong> If we have a legal duty to process or disclose your data, we will do so. For instance, complying with tax law or responding to a valid legal warrant.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Legitimate Interests:</strong> We may process your data for the purposes of our legitimate interests (or those of a third party) provided that your rights and interests do not override those interests. Our legitimate interests include maintaining the security of the platform, preventing fraud, and improving our services.
                        </div>
                      </li>
                    </ul>
                  </div>
                </HolographicCard>
              </div>

              {/* 6. Consent and Marketing Communications */}
              <div id="consent-marketing">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Mail className="w-6 h-6 text-purple-400" />
                    6. Consent and Marketing Communications
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We will only send you marketing communications if you have given us <strong className="text-white">clear, affirmative consent</strong> to do so. At the point of collecting your contact information, we will ask you to confirm that you wish to receive such emails or updates from us.
                    </p>
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">You Have Full Control</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        If you choose to subscribe, you can <strong className="text-white">withdraw your consent</strong> at any time:
                      </p>
                      <ul className="space-y-1 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>Click the "unsubscribe" link in any marketing email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>Contact us at <strong className="text-white">privacy@recxchange.com</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>Change your preferences through your account settings</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-gray-500 text-xs italic">
                      Even if you opt out of marketing, we may still send you essential service or account communications as these are not promotional in nature.
                    </p>
                    <p className="text-gray-400 text-sm">
                      We do not sell or share your personal data with third parties for their own direct marketing purposes without your consent.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 7. Data Sharing and Disclosures */}
              <div id="data-sharing">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    7. Data Sharing and Disclosures
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <p className="text-sm text-white font-bold mb-2">We Do Not Sell Your Data</p>
                      <p className="text-xs text-gray-400">
                        We value your privacy and share personal data only when necessary. <strong className="text-white">We do not sell or rent your personal information to third parties.</strong>
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      However, we may disclose your data to the following categories of recipients in order to run our business and comply with our obligations:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-cyan-400 mb-2">Service Providers</h3>
                        <p className="text-gray-400 text-sm mb-2">Trusted third-party companies that help us operate RecXchange:</p>
                        <ul className="space-y-2 text-gray-400 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span><strong className="text-white">Payment Processors</strong> (e.g. Stripe, PayPal) for secure processing of subscription payments or escrow transactions.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span><strong className="text-white">Escrow Agent or Payment Intermediary:</strong> If you use the optional escrow service, we will share necessary information with the neutral escrow provider.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span><strong className="text-white">Cloud Hosting and IT Infrastructure:</strong> We use reputable cloud servers and IT providers to host our platform and data.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span><strong className="text-white">Analytics and Marketing Tools:</strong> We may utilize tools or platforms (e.g., Google Analytics, email marketing services) that process data under our instructions.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-cyan-400 mb-2">Other Members of RecXchange</h3>
                        <p className="text-gray-400 text-sm">
                          By the nature of the platform, certain information you post may be visible to other approved Members. For example, if you share a job vacancy or candidate profile on RecXchange, those details will be viewable by other recruiters in the network as part of the collaboration workflow. Your basic profile information (name, agency, location, and verified status) is visible to other Members so that they know who they are collaborating with.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-cyan-400 mb-2">Legal Obligations and Safety</h3>
                        <p className="text-gray-400 text-sm">
                          We may disclose personal data when required to do so by law or when that disclosure is reasonably necessary to: (i) comply with a legal obligation, regulatory requirement, or governmental request; (ii) enforce our Terms & Conditions or other agreements; or (iii) protect the rights, property, or safety of RecXchange, our Members, or the public.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-cyan-400 mb-2">Business Transactions</h3>
                        <p className="text-gray-400 text-sm">
                          In the unlikely event that RecXchange undergoes a major business transaction, such as a merger, acquisition, corporate reorganization, or sale of assets, your personal data might be transferred to the new owner or successor entity as part of that deal. If this happens, we will ensure the new owners use your data in line with this Privacy Policy and applicable law.
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs italic">
                      All third parties that process personal data on our behalf are contractually obligated to uphold strict confidentiality and security standards in line with GDPR and this Privacy Policy.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 8. Member Responsibilities (Candidate Data & Compliance) */}
              <div id="member-responsibilities">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-fuchsia-400" />
                    8. Member Responsibilities (Candidate Data & Compliance)
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange takes data protection seriously, and we require our Members to do the same. If you, as a Member, upload or share personal data about other individuals (for example, candidate CVs or client contact details), you must ensure you have a lawful basis to do so and that you handle that data responsibly.
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">➤ Obtain Candidate Consent Before Sharing</h4>
                        <p className="text-xs text-gray-400">
                          You <strong className="text-white">must have the candidate's explicit permission</strong> before sharing any candidate's personal information on RecXchange. Prior to uploading or forwarding a candidate's CV, contact details, or any identifiable data to another recruiter through our platform, you should inform the candidate and get their clear consent. Do <strong className="text-white">not</strong> submit any candidate's data to RecXchange without their knowledge and agreement.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">➤ Comply with Data Protection Laws</h4>
                        <p className="text-xs text-gray-400">
                          You are responsible for handling all personal data accessed through RecXchange in compliance with applicable data protection laws, including UK GDPR, EU GDPR, and any analogous laws in other jurisdictions. Any personal data you obtain via the platform <strong className="text-white">must be kept confidential and used only for the intended recruitment purpose</strong> for which it was shared.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">➤ No Circumvention or Misuse of Data</h4>
                        <p className="text-xs text-gray-400">
                          In line with our non-circumvention rules, you must <strong className="text-white">not use personal data obtained via RecXchange to go around another Member</strong>. If another recruiter introduces a candidate or client to you through the platform, you should not later approach that candidate or client independently for any other business without the original introducer's prior consent. Using someone's data to cut out the person who provided it is a serious breach of trust and of our Terms.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">➤ Consequences of Misusing Personal Data</h4>
                        <p className="text-xs text-gray-400">
                          Any misuse of personal data on the platform is taken very seriously by RecXchange. We reserve the right to remove and ban Members who engage in such behavior. In addition, you could face legal consequences under applicable data protection laws for unauthorized use of personal information.
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm italic">
                      In summary, treat any personal data you access through RecXchange with the same care you would expect others to treat your candidates' or clients' data. Obtain consent, use it only for the intended collaboration, and do not betray the trust of introductions.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 9. International Data Transfers */}
              <div id="international-transfers">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    9. International Data Transfers
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange operates a global platform, which means personal data may be transferred to or stored in different countries. We are headquartered in the UAE, and we use cloud infrastructure that may be located in the <strong className="text-white">United Kingdom</strong>, the <strong className="text-white">European Economic Area (EEA)</strong>, the <strong className="text-white">United Arab Emirates</strong>, or other jurisdictions. Regardless of where data is processed, we apply strong protections to it.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-purple-400 mb-2">Standard Contractual Clauses</h3>
                        <p className="text-gray-400 text-sm">
                          For transfers of personal data out of the UK/EEA, we rely on approved safeguards like the European Commission's or UK's Standard Contractual Clauses (SCCs). These are legal contracts that require the recipient of the data in a third country to protect the data to EU/UK privacy standards.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-purple-400 mb-2">Adequacy Decisions</h3>
                        <p className="text-gray-400 text-sm">
                          Where possible, we may host or transfer data to countries that have been officially recognized by the UK Government or European Commission as having adequate data protection laws. This means your data gets essentially the same protection as in the UK/EU.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-purple-400 mb-2">Other Safeguards</h3>
                        <p className="text-gray-400 text-sm">
                          In some cases, we might use Binding Corporate Rules or other mechanisms approved under GDPR to legitimize data flows. We also employ technical measures (like encryption in transit and at rest) as an additional layer of security for international data.
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs italic mt-4">
                      By using RecXchange, you acknowledge that your personal data (and any candidate data you input) may be transferred and stored across international borders as needed for the platform's functionality. If you require more information about our international data transfer practices or need a copy of the relevant safeguards (e.g. SCCs), please contact us.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 10. Data Retention */}
              <div id="data-retention">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Database className="w-6 h-6 text-cyan-400" />
                    10. Data Retention
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We retain personal data only for as long as it is necessary to fulfill the purposes described in this policy, or as required by law or legitimate business needs. Retention periods will vary depending on the type of data and the context of your relationship with us:
                    </p>

                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Active Members</h4>
                        <p className="text-xs text-gray-400">
                          If you are an active Member, we retain your personal data for the duration of your membership. Your profile and related data will be kept as long as you have an account with us and have not requested deletion.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Former Members</h4>
                        <p className="text-xs text-gray-400">
                          If you choose to leave the platform or your membership is terminated, we generally will retain your data for <strong className="text-white">up to 7 years</strong> after the end of the membership. This retention period allows us to meet any legal, accounting, or reporting requirements and to have information available in case of any later disputes or inquiries.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Prospective Members and Inquiries</h4>
                        <p className="text-xs text-gray-400">
                          If you contact us but do not ultimately sign up, we may keep your information for up to <strong className="text-white">12 months</strong>. If you haven't become a Member in that time, we will delete or anonymize your inquiry data.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Candidate/Placement Data</h4>
                        <p className="text-xs text-gray-400">
                          If you have engaged in a split-fee placement via RecXchange, details of that transaction may be retained as part of the business record of the deal. We generally align this with the 7-year retention for former members or longer if required by contract or law.
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mt-4">
                      After the applicable retention period ends, we will either <strong className="text-white">securely delete or anonymize</strong> your personal data. "Anonymize" means we strip out personal identifiers so that the information can no longer be linked to you.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 11. Data Security */}
              <div id="data-security">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Lock className="w-6 h-6 text-fuchsia-400" />
                    11. Data Security
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We employ strong security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. We understand that your data is sensitive and we treat it with the utmost care. Our security program includes:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">🔐 Encryption</h4>
                        <p className="text-xs text-gray-400">
                          All communications with our website are protected by SSL/TLS encryption (HTTPS). Sensitive data is also encrypted at rest in our databases or servers.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">🏢 Secure Infrastructure</h4>
                        <p className="text-xs text-gray-400">
                          We use reputable cloud hosting providers who implement robust physical and network security. Our servers are kept in controlled facilities, and we apply firewalls and monitoring to prevent intrusions.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">👥 Access Controls</h4>
                        <p className="text-xs text-gray-400">
                          Personal data is accessible only by those at RecXchange who need it to perform their job (on a "need-to-know" basis). Employee and contractor access is protected with strong authentication.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">📚 Staff Training</h4>
                        <p className="text-xs text-gray-400">
                          Our team members are trained in data protection best practices and are bound by confidentiality obligations. We maintain internal policies to ensure we handle data in line with GDPR and other regulations.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">🔍 Testing and Auditing</h4>
                        <p className="text-xs text-gray-400">
                          We conduct regular security audits and risk assessments. Our systems are kept up-to-date with security patches. We also utilize monitoring tools to detect suspicious activities.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
                        <h4 className="text-sm font-bold text-white mb-2">⚠️ Breach Response</h4>
                        <p className="text-xs text-gray-400">
                          In the unlikely event of a data breach that could pose a risk to your rights or freedoms, we will notify you and the appropriate supervisory authority within 72 hours as required by law.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Your Role in Security</h4>
                      <p className="text-xs text-gray-400">
                        You also play a part in security. Please keep your account credentials (username and password) confidential. Notify us immediately at <strong className="text-white">support@recxchange.com</strong> if you suspect any unauthorized use of your account. We will never ask you for your password via email, so beware of phishing attempts.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 12. Your Rights */}
              <div id="your-rights">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-purple-400" />
                    12. Your Rights
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      As an individual using RecXchange, you have a number of important rights regarding your personal data. We respect and uphold these rights, which are provided under the UK GDPR, EU GDPR, and similar data protection laws.
                    </p>

                    <div className="grid gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Be Informed</h4>
                        <p className="text-xs text-gray-400">You have the right to clear and transparent information about how we use your data. This Privacy Policy fulfills that right.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Access Your Data</h4>
                        <p className="text-xs text-gray-400">You can request a copy of the personal data we hold about you.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Rectification</h4>
                        <p className="text-xs text-gray-400">If any personal data we have is inaccurate or incomplete, you have the right to have it corrected.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Erasure (Right to be Forgotten)</h4>
                        <p className="text-xs text-gray-400">You can ask us to delete your personal data in certain circumstances.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Restrict Processing</h4>
                        <p className="text-xs text-gray-400">You have the right to request that we limit the processing of your data in certain situations.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Data Portability</h4>
                        <p className="text-xs text-gray-400">You can request to receive your data in a structured, commonly used, machine-readable format.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Object to Processing</h4>
                        <p className="text-xs text-gray-400">You have the right to object to certain types of processing, notably for direct marketing.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-1">✓ Not Be Subject to Automated Decisions</h4>
                        <p className="text-xs text-gray-400">You have rights related to automated decision-making and profiling.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">How to Exercise Your Rights</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        To exercise any of these rights, please contact us at <strong className="text-white">privacy@recxchange.com</strong> with your request. We will respond within <strong className="text-white">one month (30 days)</strong> of receiving your request, as required by GDPR.
                      </p>
                      <p className="text-xs text-gray-400">
                        These rights are generally free to exercise. We will not charge you a fee for handling a reasonable request.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Right to Lodge a Complaint</h4>
                      <p className="text-xs text-gray-400">
                        If you believe we have not handled your personal data properly or fulfilled your rights, you have the right to lodge a complaint with a data protection supervisory authority. Our lead supervisory authority is the UK Information Commissioner's Office (<strong className="text-white">ICO</strong>). You can contact the ICO at <strong className="text-white">0303 123 1113</strong> or through their website (ico.org.uk).
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 13. External Links */}
              <div id="external-links">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-cyan-400" />
                    13. External Links
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Our platform or website may contain links to websites, plugins, or services that are not operated by RecXchange. For example, a Member could share a LinkedIn profile link or you might see a link to an article or a third-party service.
                    </p>
                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <p className="text-sm text-gray-300">
                        This Privacy Policy <strong className="text-white">does not cover</strong> those external websites. We are not responsible for the content, security, or privacy practices of any third-party sites. We strongly encourage you to review the privacy policies of every website or service you interact with outside of RecXchange, especially before submitting any personal data to them.
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      If you believe a link on our platform is pointing to a malicious or inappropriate site, please notify us so we can take action if necessary.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 14. Updates to This Privacy Policy */}
              <div id="policy-updates">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <FileText className="w-6 h-6 text-fuchsia-400" />
                    14. Updates to This Privacy Policy
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We may update or revise this Privacy Policy from time to time to reflect changes in our business, legal obligations, or the services we offer. If we make material changes (for example, changing how we use personal data or introducing new purposes), we will <strong className="text-white">notify you</strong> in a timely manner and as required by law.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Notification may be done via email to our Members, an in-app alert, or an announcement on our website. We will also update the "Last updated" date at the top of this Policy.
                    </p>
                    <p className="text-gray-400 text-sm">
                      We encourage you to periodically review this Privacy Policy to stay informed about how we are protecting your information. If you continue to use RecXchange after updates to the Policy take effect, we will consider that as acceptance of the new terms to the extent permitted by law.
                    </p>
                    <p className="text-gray-500 text-xs italic">
                      All prior versions of this Privacy Policy will be archived and available upon request for your reference. We maintain transparency about our privacy practices.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 15. Contact Details */}
              <div id="contact">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Mail className="w-6 h-6 text-purple-400" />
                    15. Contact Details
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We welcome any questions, concerns, or requests regarding this Privacy Policy or your personal data.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Privacy Inquiries</h4>
                        <a href="mailto:privacy@recxchange.com" className="text-purple-400 hover:underline text-sm block mb-1">privacy@recxchange.com</a>
                        <p className="text-gray-500 text-xs">For data rights requests, privacy questions, or concerns</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-purple-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Legal Notices</h4>
                        <a href="mailto:legal@recxchange.com" className="text-purple-400 hover:underline text-sm block mb-1">legal@recxchange.com</a>
                        <p className="text-gray-500 text-xs">For formal legal communications</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        <strong className="text-white">RecXchange Portal LLC</strong><br />
                        Dubai, United Arab Emirates<br />
                        Trade Licence No: 1508955
                      </p>
                    </div>
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
