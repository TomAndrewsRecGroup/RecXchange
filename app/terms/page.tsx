"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Introduction', number: '' },
  { id: 'about', title: 'About RecXchange', number: '1' },
  { id: 'definitions', title: 'Definitions', number: '2' },
  { id: 'platform-access', title: 'Platform Access & Use', number: '3' },
  { id: 'split-fee', title: 'Split Fee Agreements', number: '4' },
  { id: 'escrow', title: 'Escrow, Fee Security & Dispute Resolution', number: '5' },
  { id: 'non-circumvention', title: 'Non-Circumvention & Poaching', number: '6' },
  { id: 'candidate-consent', title: 'Candidate Consent & Data Compliance', number: '7' },
  { id: 'ip', title: 'Intellectual Property', number: '8' },
  { id: 'liability', title: 'Liability, Disclaimers & Indemnity', number: '9' },
  { id: 'subscription', title: 'Subscription & Billing Terms', number: '10' },
  { id: 'termination', title: 'Termination of Account', number: '11' },
  { id: 'governing-law', title: 'Governing Law', number: '12' },
  { id: 'updates', title: 'Updates to These Terms', number: '13' },
  { id: 'confidentiality', title: 'Confidentiality & Non-Disclosure', number: '14' },
  { id: 'contact', title: 'Contact Us', number: '15' },
];

export default function TermsConditionsPage() {
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
            Clarity. Fairness. Confidence.
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            Terms & Conditions
          </h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Clear terms built on mutual respect. These terms outline your rights, responsibilities, and what you can expect from us as a trusted industry platform.
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
                At RecXchange, we believe terms and conditions shouldn't be confusing — they should be clear, fair, and built on mutual respect. These terms exist to protect everyone in our Operating System: from recruiters and employers to candidates and contributors.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Whether you're posting a role, collaborating on placements, or accessing our platform's AI-powered tools, these terms outline how we work, what we expect, and how we protect your rights. <strong className="text-white">Transparency, trust, and professional integrity are at the heart of everything we do.</strong>
              </p>
            </section>

            {/* 1. About RecXchange */}
            <section id="about" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">1.</span> About RecXchange
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange is a recruiter-to-recruiter collaboration platform operated by <strong className="text-white">RecXchange Portal LLC</strong>, a licensed company based in Dubai, UAE (Trade Licence No. 1508955).
                </p>
                <p>
                  The platform enables verified independent recruiters to connect, collaborate on vacancies, share candidates, and enter into split-fee arrangements. RecXchange provides the digital infrastructure to support this collaboration, but is not a party to any recruitment transaction or split-fee deal between Members (unless explicitly stated, for example, if using our escrow service as described in Section 5).
                </p>
                <p className="text-sm">
                  <strong className="text-white">Important:</strong> RecXchange is not a recruitment agency or employer — each Member remains an independent entity. Nothing in these terms creates any partnership, joint venture, or employment relationship between RecXchange and any Member.
                </p>
              </div>
            </section>

            {/* 2. Definitions */}
            <section id="definitions" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">2.</span> Definitions
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>For clarity in these Terms & Conditions, we use the following definitions:</p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">RecXchange</h3>
                    <p className="text-gray-400 text-sm">Refers to RecXchange Portal LLC and the services/platform it operates.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">Member</h3>
                    <p className="text-gray-400 text-sm">Any individual recruiter, agency, or firm that has been approved and granted access to use the RecXchange platform.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">Split Fee Agreement</h3>
                    <p className="text-gray-400 text-sm">A formal written contract between Members outlining the terms of a shared placement (split-fee deal), signed by both parties.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">Client</h3>
                    <p className="text-gray-400 text-sm">The end employer or hiring company for which a role is being filled.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">Candidate</h3>
                    <p className="text-gray-400 text-sm">An individual candidate being considered or submitted for a potential role.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-1">Platform</h3>
                    <p className="text-gray-400 text-sm">The RecXchange digital environment (website and/or app) used by Members for communication, deal-making, and collaboration.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Platform Access & Use */}
            <section id="platform-access" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">3.</span> Platform Access & Use
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>RecXchange's platform is provided exclusively for professional recruitment collaboration. By accessing or using the Platform, Members agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Authorized Use Only:</strong> The Platform is for verified recruitment professionals. Provide accurate information and keep your profile up-to-date. Account sharing or transfer is not allowed.</li>
                  <li><strong className="text-white">Legal Compliance:</strong> Comply with all applicable laws governing recruitment and data use, including licensing requirements and data protection laws (e.g., UK GDPR, EU GDPR).</li>
                  <li><strong className="text-white">Genuine Roles & Candidates:</strong> Only share legitimate job vacancies and candidate profiles that you are authorized to represent. Do not post fake or speculative roles.</li>
                  <li><strong className="text-white">Prohibited Conduct:</strong> No data scraping, spamming, harassment, false representations, or poaching (see Section 6 for non-circumvention obligations).</li>
                  <li><strong className="text-white">Integrity and Fair Dealing:</strong> All interactions should be professional and in good faith. Do not circumvent platform processes or promote external services.</li>
                </ul>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-2">Consequences of Misuse</h3>
                  <p className="text-gray-400 text-sm">Violation of Platform use rules may result in immediate suspension or termination of your account (see Section 11). Serious violations may result in legal action.</p>
                </div>
              </div>
            </section>

            {/* 4. Split Fee Agreements */}
            <section id="split-fee" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">4.</span> Split Fee Agreements
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  To ensure clarity and protection for all parties, <strong className="text-white">every collaboration between Members must be formalized through a written Split Fee Agreement</strong>. Before any candidate submissions or work begins, the Members involved are required to have a signed agreement in place.
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/10">
                  <h3 className="text-white font-bold mb-3">Required Contents:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    <li><strong className="text-white">Fee Split:</strong> The agreed split of the placement fee (percentage or fixed amount).</li>
                    <li><strong className="text-white">Payment Terms:</strong> Clear terms on how and when the fee will be invoiced and paid.</li>
                    <li><strong className="text-white">Candidate Ownership & Deal Protection:</strong> Clauses specifying ownership, protection periods, and any fall-off guarantees.</li>
                    <li><strong className="text-white">Placement Start Date & Invoicing:</strong> The candidate's start date and timing for invoicing.</li>
                    <li><strong className="text-white">Signatures:</strong> Electronic or physical signatures from both participating Members.</li>
                  </ul>
                </div>
                <p className="text-sm">
                  RecXchange provides tools to facilitate creating or uploading a Split Fee Agreement. Members may use RecXchange's standard template or upload their own contract. <strong className="text-white">If an agreement is not on file in the platform for a given collaboration, RecXchange will not provide support in the event of a dispute.</strong>
                </p>
                <p className="text-sm">
                  <strong className="text-white">Important:</strong> RecXchange is not a party to Split Fee Agreements between Members. The contract is solely between the recruiters involved.
                </p>
              </div>
            </section>

            {/* 5. Escrow, Fee Security & Dispute Resolution */}
            <section id="escrow" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">5.</span> Escrow, Fee Security & Dispute Resolution
              </h2>
              <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                <div>
                  <h3 className="text-white font-bold mb-3">Escrow Service (Optional, In Development)</h3>
                  <p className="mb-4">
                    RecXchange's escrow feature, once available, will allow Members to secure their split fee payments through the platform. Funds are held securely by a neutral third party until the placement is successfully completed and confirmed by both parties.
                  </p>
                  <p className="text-sm">
                    <strong className="text-white">No Liability Without Escrow:</strong> Use of the escrow service is optional but strongly recommended. If Members choose not to use escrow, RecXchange assumes no responsibility for any payment disputes, non-payment, or fee collection issues.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-3">Dispute Resolution Support</h3>
                  <p className="mb-4">
                    While RecXchange is not a party to deals and is not an arbitrator, we offer limited support to help Members resolve disputes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Platform Mediation (Non-Binding):</strong> Either Member can reach out for assistance. RecXchange may facilitate dialogue and suggest resolutions, but cannot compel either side.</li>
                    <li><strong className="text-white">Eligibility:</strong> To qualify for dispute support, Members must have a signed Split Fee Agreement uploaded on the platform, and key interactions must have occurred via the platform.</li>
                    <li><strong className="text-white">Dispute Administration Fee:</strong> 100 RecX Tokens required to initiate a dispute (refunded if successful, forfeited if unsuccessful).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-3">International Arbitration</h3>
                  <p>
                    If a dispute cannot be resolved through mutual agreement or our informal mediation, and the Members are in different countries, the parties agree to attempt resolution through international arbitration administered by the London Court of International Arbitration (LCIA) in London, under the LCIA's rules.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Non-Circumvention & Poaching Prohibition */}
            <section id="non-circumvention" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">6.</span> Non-Circumvention & Poaching Prohibition
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Trust and fairness are core to RecXchange's community. To protect Members from bad actors and ensure everyone is rewarded for their contributions, all Members agree to the following non-circumvention rules:
                </p>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-3">No Bypassing Introductions</h3>
                  <p className="text-sm mb-4">
                    If one Member introduces a Candidate, Client, or job Opportunity to another Member through RecXchange, the receiving Member shall not directly or indirectly approach, solicit, or conduct recruitment business with that Candidate, Client, or regarding that Opportunity without the introducing Member's prior written consent.
                  </p>
                  <p className="text-sm">
                    <strong className="text-white">This restriction applies for a period of 24 months from the date of the initial introduction via the platform.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-3">Consequences of Breach</h3>
                  <p className="mb-3">A violation of this non-circumvention clause is considered a serious breach. If a Member is found to have circumvented another:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    <li>The breaching Member will be liable to pay <strong className="text-white">100% of any fee or compensation gained</strong> from the placement or opportunity to the aggrieved Member.</li>
                    <li>The breaching Member may be subject to legal action to enforce payment or seek additional damages.</li>
                    <li>RecXchange will impose a <strong className="text-white">permanent platform ban</strong> on any Member confirmed to have engaged in poaching or circumvention.</li>
                  </ul>
                </div>

                <div className="glass-card p-6 rounded-lg border-red-400/20 bg-red-400/5">
                  <h3 className="text-white font-bold mb-3">Direct End Client Engagement Restriction & Penalty</h3>
                  <p className="text-sm mb-3">
                    Recruiters are strictly prohibited from directly contacting, soliciting, or attempting to engage with any Direct End Client introduced via the RecXchange platform.
                  </p>
                  <p className="text-sm">If a Recruiter breaches this clause, they will:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm mt-2">
                    <li>Be subject to immediate termination from the RecXchange platform</li>
                    <li>Incur a mandatory loss-of-earnings penalty equivalent to <strong className="text-white">100% of the full placement fee</strong> that would have been due to RecXchange, payable within 14 days</li>
                    <li>Face legal proceedings to recover damages and losses incurred</li>
                  </ul>
                </div>

                <p className="text-sm">
                  <strong className="text-white">Summary:</strong> All Members must observe strict non-circumvention and non-solicitation obligations. Any Candidate, Client, or End Client introduced through RecXchange remains the proprietary relationship of the introducing Member for a minimum of 24 months. Breaches will be prosecuted to the fullest extent permitted under law.
                </p>
              </div>
            </section>

            {/* 7. Candidate Consent & Global Data Compliance */}
            <section id="candidate-consent" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">7.</span> Candidate Consent & Global Data Compliance
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Recruitment involves handling personal data, and RecXchange is committed to the highest standards of data protection. We require our Members to uphold these standards as well.
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Candidate Consent Requirement</h3>
                    <p className="text-gray-400 text-sm">Before sharing or submitting any Candidate's personal information on the RecXchange platform, the Member must have obtained that Candidate's explicit consent. The candidate should understand that their information will be shared with another recruiter and potentially an end Client.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Member Data Compliance</h3>
                    <p className="text-gray-400 text-sm">Members are responsible for handling all personal data in compliance with applicable data protection and privacy laws (UK GDPR, EU GDPR, etc.). Any misuse of personal data is strictly prohibited and is grounds for removal from the platform.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">RecXchange's Data Practices</h3>
                    <p className="text-gray-400 text-sm">RecXchange adheres to all relevant data protection laws in the operation of the platform. We collect and process only the data needed to provide our services effectively. Personal data is processed according to our Privacy Policy.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">International Data Transfers</h3>
                    <p className="text-gray-400 text-sm">By using RecXchange, Members consent to the transfer and storage of their data across international borders as necessary for platform functionality. We utilize Standard Contractual Clauses (SCCs) or other approved legal mechanisms to ensure data protection compliance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Intellectual Property */}
            <section id="ip" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">8.</span> Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  All rights, title, and interest in and to the RecXchange platform and its content are owned by RecXchange Portal LLC. This includes the platform's software code, design, logos, trademarks, branding, databases, and any content created or provided by RecXchange.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Use of Platform IP:</strong> Members are granted a limited, revocable, non-exclusive license to use the platform and its materials for their intended purpose (professional recruitment collaboration) while they are approved Members in good standing.</li>
                  <li><strong className="text-white">Prohibited Actions:</strong> Do not copy, modify, distribute, or create derivative works based on any part of the platform. Reverse-engineering, scraping, or reselling any aspect of the platform is strictly prohibited.</li>
                  <li><strong className="text-white">Member IP & Data:</strong> Members retain ownership of the data and content they personally upload to the platform. By uploading content, you grant RecXchange a license to use, store, and process it as needed to operate the service.</li>
                  <li><strong className="text-white">Feedback:</strong> If you provide RecXchange with feedback or suggestions, you acknowledge that RecXchange may use and incorporate this feedback without any obligation to you.</li>
                </ul>
              </div>
            </section>

            {/* 9. Liability, Disclaimers & Indemnity */}
            <section id="liability" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">9.</span> Liability, Disclaimers & Indemnity
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange's goal is to facilitate successful collaborations, but we also need to make clear what risks we do not assume. By using the platform, you acknowledge and accept the following disclaimers and limitations of liability:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">No Liability for Member Dealings</h3>
                    <p className="text-gray-400 text-sm">RecXchange is not liable for any issues or losses that arise between Members or as a result of collaborations initiated on the platform. All agreements and interactions between Members are solely the responsibility of those Members.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Platform Provided "As Is"</h3>
                    <p className="text-gray-400 text-sm">RecXchange provides the platform and services on an "as is" and "as available" basis, without any warranties or guarantees. We do not warrant that the platform will be uninterrupted, error-free, or secure at all times.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Member's Responsibility & Due Diligence</h3>
                    <p className="text-gray-400 text-sm">Each Member assumes full responsibility for their use of RecXchange. You agree to use your own judgment and due diligence when engaging with other Members. Conduct background checks and screening as you deem necessary.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Limitation of Liability</h3>
                    <p className="text-gray-400 text-sm">If RecXchange is found liable for any claim, our liability shall be limited to the amount of subscription fees you have paid in the 12 months prior to the event, or £100, whichever is greater.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Indemnification</h3>
                    <p className="text-gray-400 text-sm">You agree to indemnify and hold harmless RecXchange from any third-party claims, liabilities, damages, losses, or expenses that arise out of your use of the platform, your violation of these Terms, or your violation of any applicable law or rights of any third party.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Subscription & Billing Terms */}
            <section id="subscription" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">10.</span> Subscription & Billing Terms
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Access to RecXchange may require an active subscription (unless you are in a trial or promotional access period). The following terms apply to subscriptions and billing:
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-bold mb-2">Billing & Payment</h3>
                    <p className="text-sm">Subscription fees are billed via our third-party payment processor (e.g., Stripe) in the currency and interval indicated when you sign up. You agree to provide a valid payment method.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                    <h3 className="text-white font-bold mb-2">No Refund Policy</h3>
                    <p className="text-sm">All payments are non-refundable. Once a billing period has been charged, you will not be refunded for that period, except in cases of a billing error or technical fault on our side.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Cancellation by Member</h3>
                    <p className="text-sm">You may cancel your subscription at any time. <strong className="text-white">You must provide at least 15 days notice before your upcoming renewal date</strong> to avoid the next charge. Cancellation prevents the next renewal charge, but you will continue to have access until the end of the period you already paid for.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Changes to Fees</h3>
                    <p className="text-sm">RecXchange reserves the right to change its subscription plans or pricing. Any changes will be communicated in advance and will only apply to subsequent billing cycles.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Termination of Account */}
            <section id="termination" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">11.</span> Termination of Account
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Both Members and RecXchange have the right to terminate the use of the platform under certain conditions:
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-bold mb-2">Termination by RecXchange (For Cause)</h3>
                    <p className="text-sm">RecXchange reserves the right to suspend or terminate your account at any time, with or without notice, if we determine that you have violated these Terms or engaged in harmful, unlawful, or unethical behavior. Serious violations will result in immediate termination without prior warning.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Termination by Member</h3>
                    <p className="text-sm">You are free to stop using RecXchange and may terminate your own account at any time by cancelling your subscription and contacting support to confirm account closure.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Effect of Termination</h3>
                    <p className="text-sm">Once an account is terminated, the Member no longer has any right to access or use the RecXchange platform. RecXchange may delete or deactivate your account and all associated data. It is your responsibility to download or secure any information you need before your account is closed.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Survival of Certain Terms</h3>
                    <p className="text-sm">Even after account termination, certain provisions of these Terms will remain in effect, including: Non-Circumvention (Section 6, which continues for 24 months post any introduction), Confidentiality, Liability & Indemnity, Governing Law & Jurisdiction, and any obligation to pay fees or resolve disputes for transactions initiated before termination.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 12. Governing Law & Multi-Jurisdiction Considerations */}
            <section id="governing-law" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">12.</span> Governing Law
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange is a global platform, but we have chosen a single governing law to provide consistency in our Terms & Conditions.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-bold mb-2">Governing Law</h3>
                    <p className="text-sm">These Terms & Conditions, and any dispute or claim arising out of or in connection with them or the use of the platform, shall be governed by and construed in accordance with the <strong className="text-white">laws of England and Wales</strong>.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Jurisdiction</h3>
                    <p className="text-sm">Except as provided under the arbitration clause in Section 5 (for international arbitration), all Members agree that any legal proceedings related to these Terms will be subject to the exclusive jurisdiction of the courts of England and Wales (London, United Kingdom).</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Global Compliance</h3>
                    <p className="text-sm">While the laws of England and Wales govern these Terms, you must still comply with any applicable laws in the country or state where you operate. If you are accessing RecXchange from outside the UK, you are responsible for ensuring that your use is lawful in your own jurisdiction.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 13. Updates to These Terms */}
            <section id="updates" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">13.</span> Updates to These Terms
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange may update or modify these Terms & Conditions from time to time as our platform evolves or laws change. We promise to handle changes in a transparent way.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Notification of Changes:</strong> If we make material changes to the Terms, we will provide notice via email, in-platform announcement, and/or a login alert.</li>
                  <li><strong className="text-white">Acceptance of Changes:</strong> After we update the Terms, your continued use of RecXchange constitutes acceptance of the new Terms. If you do not agree, you must stop using the platform.</li>
                  <li><strong className="text-white">Review Frequency:</strong> We encourage Members to review the Terms & Conditions periodically. The current version will always be available on our website.</li>
                </ul>
              </div>
            </section>

            {/* 14. Confidentiality & Non-Disclosure */}
            <section id="confidentiality" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">14.</span> Confidentiality & Non-Disclosure
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  By accepting these Terms & Conditions, all Members agree to treat as strictly confidential any information obtained through the RecXchange platform, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Candidate data, resumes, contact details, or personal information</li>
                  <li>Client identities, job descriptions, hiring needs, or contact information</li>
                  <li>Any business opportunity, client introduction, or relationship facilitated by RecXchange</li>
                  <li>Any communication or commercial arrangement disclosed by another Member or by RecXchange</li>
                </ul>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <p className="text-sm mb-3">
                    <strong className="text-white">These confidentiality obligations continue for two (2) years after your access to the platform ends</strong>, or after the date on which the confidential information was last accessed (whichever is later).
                  </p>
                  <p className="text-sm">
                    Any breach of this section will be considered a material violation of these Terms and may result in legal action for breach of contract, injunctive relief, financial damages, and permanent termination of platform access.
                  </p>
                </div>
              </div>
            </section>

            {/* 15. Contact Us */}
            <section id="contact" className="mb-0 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">15.</span> Contact Us
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We're here to help and answer any questions or concerns you might have about these Terms or the RecXchange platform.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                    <h3 className="text-white font-bold mb-2">General Enquiries & Support</h3>
                    <p className="text-sm mb-2">For general questions, technical support, or platform clarifications:</p>
                    <a href="mailto:support@recxchange.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">support@recxchange.com</a>
                  </div>
                  <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                    <h3 className="text-white font-bold mb-2">Legal Notices & Escalations</h3>
                    <p className="text-sm mb-2">For formal communications, legal notices, or dispute escalations:</p>
                    <a href="mailto:legal@recxchange.com" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-sm">legal@recxchange.com</a>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-lg border-cyan-400/10 mt-6">
                  <h3 className="text-white font-bold mb-2">Company Details</h3>
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">RecXchange Portal LLC</strong><br />
                    (trading as RecXchange)<br />
                    Dubai, United Arab Emirates<br />
                    Legal Mailing Address available upon request
                  </p>
                </div>
                <p className="text-sm">
                  Please allow 1-2 business days for a response (though we often respond sooner). We prefer email communication for record-keeping purposes.
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-cyan-400/20 text-center">
              <p className="text-gray-500 text-xs">
                RecXchange exists to empower trusted recruiter-to-recruiter collaboration, deliver fair outcomes, and create a platform where professionalism is rewarded and protected. By adhering to these Terms & Conditions, all Members contribute to a healthy ecosystem of clarity, fairness, and confidence in every interaction.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                Thank you for being a valued part of the RecXchange community and for upholding these standards. Let's work together to make sure every split placement and partnership is a win-win for everyone involved!
              </p>
              <p className="text-gray-500 text-xs mt-4">
                Last updated: February 27, 2026
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
