"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Introduction', number: '' },
  { id: 'what-is-gdpr', title: 'What is GDPR?', number: '1' },
  { id: 'your-rights', title: 'Your Data Protection Rights', number: '2' },
  { id: 'data-we-collect', title: 'Data We Collect', number: '3' },
  { id: 'how-we-use-data', title: 'How We Use Your Data', number: '4' },
  { id: 'legal-basis', title: 'Legal Basis for Processing', number: '5' },
  { id: 'data-retention', title: 'Data Retention', number: '6' },
  { id: 'data-security', title: 'Data Security Measures', number: '7' },
  { id: 'ip-location-tracking', title: 'IP Address & Location Tracking', number: '8' },
  { id: 'data-sharing', title: 'Data Sharing & Third Parties', number: '9' },
  { id: 'international-transfers', title: 'International Data Transfers', number: '10' },
  { id: 'exercise-rights', title: 'How to Exercise Your Rights', number: '11' },
  { id: 'complaints', title: 'Filing Complaints', number: '12' },
  { id: 'updates', title: 'Policy Updates', number: '13' },
  { id: 'contact', title: 'Contact Us', number: '14' },
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
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-[1400px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            Your Rights, Our Responsibility
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            GDPR Compliance
          </h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            RecXchange is fully compliant with the General Data Protection Regulation (GDPR). We're committed to protecting your personal data and respecting your privacy rights.
          </p>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <nav className="glass-card p-4 rounded-xl border-cyan-400/10">
                <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contents</h2>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                          activeSection === section.id
                            ? 'bg-cyan-400/10 text-cyan-400 font-bold border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                        }`}
                      >
                        {section.number && <span className="opacity-60 mr-2">{section.number}.</span>}
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Mobile/Tablet Collapsible Navigation */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="w-full glass-card p-4 rounded-xl border-cyan-400/10 flex items-center justify-between text-white hover:border-cyan-400/20 transition-colors"
            >
              <span className="text-sm font-bold uppercase tracking-wider">Contents</span>
              {mobileNavOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {mobileNavOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card mt-2 p-4 rounded-xl border-cyan-400/10 max-h-[400px] overflow-y-auto"
              >
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                          activeSection === section.id
                            ? 'bg-cyan-400/10 text-cyan-400 font-bold'
                            : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                        }`}
                      >
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
          <article className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl md:rounded-2xl border-cyan-400/10">
            {/* Introduction */}
            <section id="intro" className="mb-12 scroll-mt-28">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                The General Data Protection Regulation (GDPR) is one of the world's strongest data protection laws. At RecXchange, we embrace these standards and apply them globally, not just in the EU and UK.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                This page explains how RecXchange complies with GDPR requirements and what rights you have regarding your personal data. For full details, please see our <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link>.
              </p>
            </section>

            {/* 1. What is GDPR? */}
            <section id="what-is-gdpr" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">1.</span> What is GDPR?
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on 25 May 2018 in the European Union. Following Brexit, the UK adopted its own version known as the UK GDPR.
                </p>
                <p>
                  GDPR gives individuals more control over their personal data and places strict obligations on organizations that collect, process, or store that data. It applies to any organization operating in the EU/UK or handling the data of EU/UK residents, regardless of where the organization is located.
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <h3 className="text-white font-bold mb-3">Key GDPR Principles:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong className="text-white">Lawfulness, Fairness & Transparency:</strong> Data must be processed legally, fairly, and transparently</li>
                    <li><strong className="text-white">Purpose Limitation:</strong> Data collected for specified, explicit, and legitimate purposes</li>
                    <li><strong className="text-white">Data Minimization:</strong> Only collect what is necessary</li>
                    <li><strong className="text-white">Accuracy:</strong> Keep data accurate and up to date</li>
                    <li><strong className="text-white">Storage Limitation:</strong> Retain data only as long as necessary</li>
                    <li><strong className="text-white">Integrity & Confidentiality:</strong> Protect data with appropriate security</li>
                    <li><strong className="text-white">Accountability:</strong> Demonstrate compliance with all principles</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Your Data Protection Rights */}
            <section id="your-rights" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">2.</span> Your Data Protection Rights
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Under GDPR, you have the following rights regarding your personal data:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">1. Right to Be Informed</h3>
                    <p className="text-gray-400 text-sm">You have the right to clear, transparent information about how we collect and use your personal data.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">2. Right of Access</h3>
                    <p className="text-gray-400 text-sm">You can request a copy of the personal data we hold about you, free of charge.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">3. Right to Rectification</h3>
                    <p className="text-gray-400 text-sm">You can ask us to correct inaccurate or incomplete personal data.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">4. Right to Erasure (Right to be Forgotten)</h3>
                    <p className="text-gray-400 text-sm">You can request deletion of your personal data in certain circumstances, such as when it's no longer needed for the purpose it was collected.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">5. Right to Restrict Processing</h3>
                    <p className="text-gray-400 text-sm">You can ask us to limit how we use your data in specific situations, such as while we verify the accuracy of disputed data.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">6. Right to Data Portability</h3>
                    <p className="text-gray-400 text-sm">You can request your data in a structured, commonly used, machine-readable format to transfer to another service provider.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">7. Right to Object</h3>
                    <p className="text-gray-400 text-sm">You can object to processing based on legitimate interests, direct marketing, or processing for research/statistical purposes.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">8. Rights Related to Automated Decision Making</h3>
                    <p className="text-gray-400 text-sm">You have rights regarding automated decision-making and profiling. RecXchange does not use automated decision-making that produces legal or similarly significant effects.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Data We Collect */}
            <section id="data-we-collect" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">3.</span> Data We Collect
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We only collect personal data that is necessary to provide and improve our services. This includes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Identity & Contact Data</h3>
                    <p className="text-gray-400 text-xs">Name, email, phone number, address</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Professional Information</h3>
                    <p className="text-gray-400 text-xs">Company, job title, LinkedIn profile</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Financial Data</h3>
                    <p className="text-gray-400 text-xs">Payment details for subscriptions</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Platform Activity</h3>
                    <p className="text-gray-400 text-xs">Usage data, interactions, submissions</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Technical Data</h3>
                    <p className="text-gray-400 text-xs">IP address, browser type, device info</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Marketing Preferences</h3>
                    <p className="text-gray-400 text-xs">Your communication preferences (opt-in only)</p>
                  </div>
                </div>
                <p className="text-sm">
                  <strong className="text-white">We do not collect:</strong> Sensitive personal data (health, race, religion) unless absolutely necessary and with your explicit consent. We do not knowingly collect data from anyone under 18.
                </p>
              </div>
            </section>

            {/* 4. How We Use Your Data */}
            <section id="how-we-use-data" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">4.</span> How We Use Your Data
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We use your personal data to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and manage your RecXchange account and services</li>
                  <li>Facilitate recruiter-to-recruiter collaboration and split-fee arrangements</li>
                  <li>Process payments and manage transactions</li>
                  <li>Communicate with you about your account, support queries, and updates</li>
                  <li>Improve our platform through analytics and feedback</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations (tax, regulatory requirements)</li>
                  <li>Send marketing communications (only with your explicit consent)</li>
                  <li>Resolve disputes and enforce our terms</li>
                </ul>
                <p className="text-sm">
                  We process your data only for the specific purposes stated and do not use it for unrelated purposes without informing you.
                </p>
              </div>
            </section>

            {/* 5. Legal Basis for Processing */}
            <section id="legal-basis" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">5.</span> Legal Basis for Processing
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  GDPR requires us to have a lawful basis for processing your personal data. We rely on the following:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Consent</h3>
                    <p className="text-gray-400 text-sm">When you've given clear permission (e.g., for marketing communications).</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Contract Performance</h3>
                    <p className="text-gray-400 text-sm">Processing necessary to fulfill our contract with you (providing platform services).</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Legal Obligation</h3>
                    <p className="text-gray-400 text-sm">When we must process data to comply with the law (tax reporting, regulatory compliance).</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Legitimate Interests</h3>
                    <p className="text-gray-400 text-sm">For purposes like fraud prevention, platform security, and improving services, where your rights don't override our legitimate business interests.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Data Retention */}
            <section id="data-retention" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">6.</span> Data Retention
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We retain personal data only as long as necessary for the purposes we collected it, or as required by law:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Active Membership</h3>
                    <p className="text-gray-400 text-sm">Data retained for the duration of your active membership.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">After Account Closure</h3>
                    <p className="text-gray-400 text-sm">Up to 7 years for legal, accounting, and dispute resolution purposes.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Prospective Members</h3>
                    <p className="text-gray-400 text-sm">Inquiry data kept for up to 12 months.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Marketing Data</h3>
                    <p className="text-gray-400 text-sm">Until consent is withdrawn or the data is no longer relevant.</p>
                  </div>
                </div>
                <p className="text-sm">
                  After retention periods end, we securely delete or anonymize your data.
                </p>
              </div>
            </section>

            {/* 7. Data Security Measures */}
            <section id="data-security" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">7.</span> Data Security Measures
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your personal data:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Encryption</h3>
                    <p className="text-gray-400 text-xs">SSL/TLS encryption (HTTPS) for all communications. Data encrypted at rest.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Access Controls</h3>
                    <p className="text-gray-400 text-xs">Role-based access, strong authentication, regular access reviews.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Infrastructure Security</h3>
                    <p className="text-gray-400 text-xs">Secure cloud hosting, firewalls, intrusion detection, 24/7 monitoring.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Staff Training</h3>
                    <p className="text-gray-400 text-xs">Regular data protection training and confidentiality obligations.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Incident Response</h3>
                    <p className="text-gray-400 text-xs">Data breach procedures with notification protocols as required by GDPR.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Regular Audits</h3>
                    <p className="text-gray-400 text-xs">Periodic security assessments and vulnerability testing.</p>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-2">Data Breach Notification</h3>
                  <p className="text-gray-400 text-sm">In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours, as required by GDPR.</p>
                </div>
              </div>
            </section>

            {/* 8. IP Address & Location Tracking */}
            <section id="ip-location-tracking" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">8.</span> IP Address & Location Tracking
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  As part of our technical operations and security measures, we collect and process information about your device and connection:
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <h3 className="text-white font-bold mb-3">What We Collect:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong className="text-white">IP Address:</strong> Your device's unique internet protocol address</li>
                    <li><strong className="text-white">Browser Type:</strong> Information about your web browser and version</li>
                    <li><strong className="text-white">Device Information:</strong> Operating system, device type, screen resolution</li>
                    <li><strong className="text-white">Approximate Location:</strong> Derived from IP address (country/city level, not precise GPS)</li>
                    <li><strong className="text-white">Usage Data:</strong> Login times, pages viewed, search queries, platform interactions</li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-3">How We Use This Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong className="text-white">Fraud Prevention:</strong> Detect suspicious activity, prevent unauthorized access, identify potential security threats</li>
                    <li><strong className="text-white">Analytics & Performance:</strong> Understand platform usage patterns, optimize performance, improve user experience</li>
                    <li><strong className="text-white">Regional Routing:</strong> Connect you to the appropriate local support team based on your location</li>
                    <li><strong className="text-white">CRM Storage:</strong> We derive approximate location from your IP address and store this geographical information in our Customer Relationship Management (CRM) system for business operations</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-white">Important:</strong> We use your IP address to derive approximate location (e.g., country/city) for fraud prevention, analytics, and to route you to the right local team. We then store the derived location in our CRM. This process helps us provide better service while maintaining platform security.
                </p>
                <p className="text-sm">
                  <strong className="text-white">Legal Basis:</strong> We process this data based on our legitimate interests in maintaining platform security, preventing fraud, and improving our services. Your fundamental rights are protected through our security measures and data minimization practices.
                </p>
              </div>
            </section>

            {/* 9. Data Sharing & Third Parties */}
            <section id="data-sharing" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">9.</span> Data Sharing & Third Parties
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We do not sell or rent your personal data. We share data only when necessary:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Service Providers</h3>
                    <p className="text-gray-400 text-sm">Trusted third parties that help operate our platform (payment processors, cloud hosting, email services). All bound by strict data protection agreements.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Other Members</h3>
                    <p className="text-gray-400 text-sm">Limited profile information visible to other approved platform members to facilitate collaboration.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Legal Requirements</h3>
                    <p className="text-gray-400 text-sm">When required by law, court order, or to protect rights and safety.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Business Transfers</h3>
                    <p className="text-gray-400 text-sm">In the event of a merger, acquisition, or asset sale, with notice to affected users.</p>
                  </div>
                </div>
                <p className="text-sm">
                  All third-party processors are required to maintain GDPR-compliant data protection standards.
                </p>
              </div>
            </section>

            {/* 10. International Data Transfers */}
            <section id="international-transfers" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">10.</span> International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange operates globally, which means your data may be transferred to and stored in countries outside the European Economic Area (EEA) or UK, including the United Arab Emirates where we are headquartered.
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <h3 className="text-white font-bold mb-3">Transfer Safeguards:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong className="text-white">Standard Contractual Clauses (SCCs):</strong> We use European Commission-approved SCCs for transfers outside the EEA/UK</li>
                    <li><strong className="text-white">Encryption:</strong> Data encrypted in transit and at rest during international transfers</li>
                    <li><strong className="text-white">Access Controls:</strong> Strict limitations on who can access data across jurisdictions</li>
                    <li><strong className="text-white">Vendor Vetting:</strong> All international service providers must meet GDPR-equivalent standards</li>
                  </ul>
                </div>
                <p className="text-sm">
                  Where we transfer data internationally, we ensure adequate safeguards are in place to protect your information in accordance with GDPR requirements.
                </p>
              </div>
            </section>

            {/* 11. How to Exercise Your Rights */}
            <section id="exercise-rights" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">11.</span> How to Exercise Your Rights
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  You can exercise any of your GDPR rights by contacting us. We make it easy:
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <h3 className="text-white font-bold mb-3">To Make a Request:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Email us at <a href="mailto:privacy@recxchange.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">privacy@recxchange.com</a> or <a href="mailto:legal@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">legal@recxchange.io</a></li>
                    <li>Clearly state which right you wish to exercise (e.g., "I request access to my personal data")</li>
                    <li>Provide enough information for us to verify your identity</li>
                    <li>Specify any particular data or processing activities you're concerned about</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg border-fuchsia-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Response Time</h3>
                    <p className="text-gray-400 text-xs">We will respond within 1 month (30 days) as required by GDPR. Complex requests may take up to 2 additional months with notification.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-fuchsia-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Free of Charge</h3>
                    <p className="text-gray-400 text-xs">Exercising your rights is free. We may charge a reasonable fee only for manifestly unfounded or excessive requests.</p>
                  </div>
                </div>
                <p className="text-sm">
                  We may ask for additional information to verify your identity before fulfilling requests, especially for sensitive data access or deletion requests.
                </p>
              </div>
            </section>

            {/* 12. Filing Complaints */}
            <section id="complaints" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">12.</span> Filing Complaints
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  If you believe we have not handled your personal data correctly or you're unhappy with our response to your request, you have the right to lodge a complaint with a data protection supervisory authority.
                </p>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-3">UK Information Commissioner's Office (ICO)</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-white">Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">ico.org.uk</a></p>
                    <p><strong className="text-white">Phone:</strong> 0303 123 1113</p>
                    <p><strong className="text-white">Live Chat:</strong> Available on ICO website</p>
                    <p className="text-gray-400">The ICO is our lead supervisory authority as RecXchange follows UK GDPR standards.</p>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <h3 className="text-white font-bold mb-3">EU Residents</h3>
                  <p className="text-sm">If you're in the EU, you can also contact your local data protection authority. Find your authority at <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">edpb.europa.eu</a></p>
                </div>
                <p className="text-sm">
                  We encourage you to contact us first so we can address your concerns directly, but you have the right to escalate to a supervisory authority at any time.
                </p>
              </div>
            </section>

            {/* 13. Policy Updates */}
            <section id="updates" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">13.</span> Policy Updates
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We may update this GDPR compliance statement from time to time to reflect changes in our practices, legal requirements, or the services we offer.
                </p>
                <p>
                  If we make material changes that affect your rights, we will notify you via email, in-app notification, or a prominent notice on our website at least 30 days before the changes take effect.
                </p>
                <p className="text-sm">
                  We recommend reviewing this page periodically to stay informed about how we protect your data.
                </p>
              </div>
            </section>

            {/* 14. Contact Us */}
            <section id="contact" className="mb-0 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">14.</span> Contact Us
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  For any questions about GDPR compliance, your data protection rights, or this statement, please contact us:
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold mb-1">Data Controller</h3>
                      <p className="text-gray-400 text-sm">RecXchange Portal LLC</p>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Email</h3>
                      <div className="space-y-1">
                        <p><a href="mailto:privacy@recxchange.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">privacy@recxchange.com</a> (Data protection inquiries)</p>
                        <p><a href="mailto:legal@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">legal@recxchange.io</a> (General legal matters)</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Postal Address</h3>
                      <p className="text-gray-400 text-sm">
                        RecXchange Portal LLC<br />
                        Pinnacle Building<br />
                        Sheikh Zayed Road<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  We aim to respond to all GDPR-related inquiries within 2 business days for initial acknowledgment, with full responses provided within the legally required 30-day period.
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-cyan-400/20 text-center">
              <p className="text-gray-500 text-xs mb-4">
                <strong className="text-white">Related Documents:</strong> This page should be read alongside our full <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link> and <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms of Service</Link>.
              </p>
              <p className="text-gray-500 text-xs mb-4">
                <strong className="text-white">Governing Law:</strong> This statement is governed by the laws of England and Wales, in accordance with our Terms of Service.
              </p>
              <p className="text-gray-500 text-xs">
                Thank you for trusting RecXchange with your personal data. Your privacy and data protection rights are fundamental to how we operate.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                <strong className="text-white">Last updated:</strong> February 27, 2026
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
