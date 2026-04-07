"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

const sections = [
  { id: 'intro', title: 'Introduction', number: '' },
  { id: 'about', title: 'About RecXchange', number: '1' },
  { id: 'definitions', title: 'Definitions', number: '2' },
  { id: 'platform-access', title: 'Platform Access & Use', number: '3' },
  { id: 'split-fee', title: 'Split Fee Agreements', number: '4' },
  { id: 'escrow', title: 'Escrow & Dispute Resolution', number: '5' },
  { id: 'non-circumvention', title: 'Non-Circumvention & Poaching', number: '6' },
  { id: 'candidate-consent', title: 'Candidate Consent & Data Compliance', number: '7' },
  { id: 'ip', title: 'Intellectual Property', number: '8' },
  { id: 'liability', title: 'Liability & Disclaimers', number: '9' },
  { id: 'subscription', title: 'Subscription & Billing', number: '10' },
  { id: 'termination', title: 'Termination of Account', number: '11' },
  { id: 'governing-law', title: 'Governing Law', number: '12' },
  { id: 'updates', title: 'Updates to These Terms', number: '13' },
  { id: 'contact', title: 'Contact Us', number: '14' },
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
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 mt-6">
            <StatusBadge label="CLARITY. FAIRNESS. CONFIDENCE." color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6">
              Terms & Conditions
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Clear terms built on mutual respect. These terms outline your rights, responsibilities, and what you can expect from us as a trusted industry platform.
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
                      <strong className="text-white">Effective from:</strong> March 9, 2026
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      At RecXchange, trust starts with clarity. These Terms & Conditions establish the legal framework for how our platform operates and how Members collaborate. Whether you're posting roles, sharing candidates, or entering into a split fee arrangement, these terms are designed to protect all parties and uphold the platform's integrity. Please read them carefully. By using RecXchange, you agree to these terms. If you have any questions, contact us using the details in Section 14.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 1. About RecXchange */}
              <div id="about">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">1. About RecXchange</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange is a recruiter-to-recruiter collaboration platform operated by <strong className="text-white">RecXchange Portal LLC</strong>, a licensed company based in Dubai, UAE (Trade Licence No: 1508955). The platform enables verified independent recruiters to connect, collaborate on vacancies, share candidates, and enter into split-fee arrangements. RecXchange provides the digital infrastructure to support this collaboration, but <strong className="text-white">is not a party to any recruitment transaction or split-fee deal between Members</strong> unless explicitly stated (for example, if using our escrow service as described in Section 5). RecXchange is not a recruitment agency or employer; each Member remains an independent entity. Nothing in these terms creates any partnership, joint venture, or employment relationship between RecXchange and any Member.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 2. Definitions */}
              <div id="definitions">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">2. Definitions</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                      For clarity in these Terms & Conditions, we use the following definitions:
                    </p>
                    <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                      <li><strong className="text-white">RecXchange:</strong> Refers to RecXchange Portal LLC and the services/platform it operates.</li>
                      <li><strong className="text-white">Member:</strong> Any individual recruiter, agency, or firm that has been approved and granted access to use the RecXchange platform.</li>
                      <li><strong className="text-white">Split Fee Agreement:</strong> A formal written contract between Members outlining the terms of a shared placement (split-fee) deal, signed by both parties.</li>
                      <li><strong className="text-white">Client:</strong> The end employer or hiring company for which a role is being filled.</li>
                      <li><strong className="text-white">Candidate:</strong> An individual candidate being considered or submitted for a potential role.</li>
                      <li><strong className="text-white">Platform:</strong> The RecXchange digital environment (website and/or app) used by Members for communication, deal-making, and collaboration.</li>
                    </ul>
                    <p className="text-gray-500 text-xs mt-4 italic">
                      Throughout these terms, "you" or "Member" refers to any user of the platform who meets the above definition of Member, and "RecXchange" may be referred to as "we," "us," or "our."
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 3. Platform Access & Use */}
              <div id="platform-access">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">3. Platform Access & Use</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange's platform is provided exclusively for professional recruitment collaboration. By accessing or using the Platform, Members agree to the following rules of use:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Authorized Use Only</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          The Platform is for verified recruitment professionals. You must provide accurate, truthful information during signup and keep your profile information up-to-date. Only approved Members may access the Platform; account sharing or transfer is not allowed.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Legal Compliance</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Members must comply with all applicable laws and regulations governing recruitment and data use. This includes, for example, any local licensing requirements and data protection laws (e.g. UK GDPR, EU GDPR, etc.). If you operate in the UK, you are responsible for complying with the Conduct of Employment Agencies and Employment Businesses Regulations 2003 and any other relevant regulations.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Genuine Roles & Candidates</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Only share legitimate job vacancies and candidate profiles that you are <strong className="text-white">authorized to represent</strong>. Do not post fake or speculative roles, and do not submit any candidate's information unless you have the right to represent that candidate for the opportunity (and their consent, per Section 7).
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Prohibited Conduct</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Misuse of the Platform is strictly forbidden. "Misuse" includes activities such as: scraping or harvesting data from the platform; spamming or sending unsolicited bulk communications to other Members; harassing or abusing other Members; making false representations or posting misleading information; and any form of poaching or unauthorized outreach to candidates or clients that another Member introduced (see Section 6 for non-circumvention obligations).
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Integrity and Fair Dealing</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          All interactions on RecXchange should be professional and in good faith. You must not attempt to circumvent the platform's processes or protections. You also must not promote external services or engage in any activity that conflicts with the collaborative spirit of RecXchange.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Consequences of Misuse</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Violation of any Platform use rule may result in immediate suspension or termination of your account (see Section 11). RecXchange reserves the right to remove any content that violates these terms or is deemed harmful to the community. Serious violations (such as fraud or unlawful activity) may result in legal action.
                        </p>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 4. Split Fee Agreements */}
              <div id="split-fee">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">4. Split Fee Agreements (Mandatory for Collaborations)</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      To ensure clarity and protection for all parties, <strong className="text-white">every collaboration between Members facilitated by RecXchange must be formalized through a written Split Fee Agreement.</strong> Before any candidate submissions or work begins on a shared role, the Members involved are required to have a signed agreement in place covering the key terms of their split fee arrangement.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-3">Required Contents of the Split Fee Agreement</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">At a minimum, the agreement between collaborating Members must include:</p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Fee Split:</strong> The agreed split of the placement fee (percentage division or a specific fixed amount to each party).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Payment Terms:</strong> Clear terms on how and when the fee will be invoiced and paid.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Candidate Ownership & Deal Protection:</strong> Clauses specifying which Member "owns" the candidate submission for the purpose of the deal.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Placement Start Date & Invoicing Window:</strong> The candidate's start date and any agreed timing for invoicing.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span><strong className="text-white">Signatures:</strong> Signatures or explicit acceptance from both participating Members.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        <strong className="text-white">Process:</strong> RecXchange provides tools to facilitate creating or uploading a Split Fee Agreement. Members may use RecXchange's standard agreement template or upload their own contract, but in all cases the agreement <strong className="text-white">must be uploaded to (or created on) the Platform</strong> before any collaboration begins. If an agreement is not on file in the platform for a given collaboration, <strong className="text-white">RecXchange will not provide support in the event of a dispute</strong> between the Members for that deal.
                      </p>
                    </div>

                    <p className="text-gray-500 text-xs italic">
                      Please note: RecXchange is <strong>not a party to Split Fee Agreements</strong> between Members. The contract is solely between the recruiters involved. RecXchange's role is limited to providing the platform to connect and help manage the process. It is the responsibility of the Members to honor their agreement and enforce its terms.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 5. Escrow & Dispute Resolution */}
              <div id="escrow">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">5. Escrow, Fee Security & Dispute Resolution</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange is committed to fostering secure and fair collaborations. To that end, we are introducing an <strong className="text-white">Escrow Protection</strong> service (currently in development) and offering guidance for dispute resolution.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Escrow Service (Optional; In Development)</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RecXchange's escrow feature, once available, will allow Members to secure their split fee payments through the platform. Under this service, the agreed fee can be held securely by a neutral third party until the placement is successfully completed and confirmed by both parties. This provides peace of mind, the introducing recruiter knows their fee share is secured up front, and the job-owning recruiter knows funds will only be released when the placement is real.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">No Liability Without Escrow</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Use of the escrow service is optional but strongly recommended for fee protection. <strong className="text-white">If Members choose not to use RecXchange's escrow, RecXchange assumes no responsibility or liability for any payment disputes, non-payment, or fee collection issues between the parties.</strong> Without escrow, any fee-sharing arrangement and payment must be managed and enforced by the Members involved alone.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Dispute Resolution Support</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        While RecXchange is not a party to deals and is not an arbitrator, we do offer limited support to help Members resolve disputes arising from collaborations on the platform:
                      </p>
                      <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span><strong className="text-white">Platform Mediation (Non-Binding):</strong> RecXchange may act as an impartial facilitator by opening a dialogue with both parties, reviewing platform communications, and suggesting possible resolutions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span><strong className="text-white">Eligibility for Dispute Support:</strong> Members must have a signed Split Fee Agreement uploaded on the platform.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span><strong className="text-white">Dispute Administration Fee:</strong> Any Member initiating a dispute will be required to pay 100 RecX Tokens. If successful, the fee is returned; if unsuccessful, it is forfeited.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">International Arbitration</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        If a dispute cannot be resolved through mutual agreement or informal mediation, and the Members are in different countries, the parties agree to <strong className="text-white">attempt resolution through international arbitration</strong> administered by the <strong className="text-white">London Court of International Arbitration (LCIA)</strong> in London, under the LCIA's rules.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 6. Non-Circumvention */}
              <div id="non-circumvention">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">6. Non-Circumvention & Poaching Prohibition</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Trust and fairness are core to RecXchange's community. To protect Members from bad actors and to ensure everyone is rewarded for their contributions, all Members agree to the following non-circumvention rules:
                    </p>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">No Bypassing Introductions</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        If one Member introduces a Candidate, Client, or job Opportunity to another Member through RecXchange, the receiving Member <strong className="text-white">shall not directly or indirectly approach, solicit, or conduct recruitment business</strong> with that Candidate, Client, or regarding that Opportunity <strong className="text-white">without the introducing Member's prior written consent</strong>. This restriction applies for a period of <strong className="text-white">24 months</strong> from the date of the initial introduction via the platform.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Consequences of Breach</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        A violation of this non-circumvention clause is considered a serious breach of these Terms and of the trust within our network:
                      </p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>The breaching Member <strong className="text-white">will be liable to pay 100% of any fee or compensation</strong> gained from the placement or opportunity that was circumvented <strong className="text-white">to the aggrieved Member</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>The breaching Member may also be subject to <strong className="text-white">legal action</strong> by the aggrieved Member.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>RecXchange will impose a <strong className="text-white">permanent platform ban</strong> on any Member confirmed to have engaged in such poaching or circumvention.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      In summary, honor your fellow recruiter's relationships. If someone introduces you to a candidate or client through a collaboration, respect that relationship. Non-circumvention builds a safer community where everyone can collaborate with confidence.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 7. Candidate Consent & Data Compliance */}
              <div id="candidate-consent">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">7. Candidate Consent & Global Data Compliance</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Recruitment involves handling personal data, and RecXchange is committed to the highest standards of data protection. We require our Members to uphold these standards as well.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Candidate Consent Requirement</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Before sharing or submitting any Candidate's personal information on the RecXchange platform, the Member must have obtained that Candidate's explicit consent. The candidate should understand that their information will be shared with another recruiter (and potentially an end Client) for the purpose of exploring a job opportunity. <strong className="text-white">Do not submit any candidate to the platform without their permission.</strong>
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Member Data Compliance</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Members are responsible for handling all personal data in compliance with applicable data protection and privacy laws. This includes laws such as the <strong className="text-white">UK GDPR</strong>, EU GDPR, and any similar regulations in the jurisdictions where you operate. When you use RecXchange, you must treat personal data with confidentiality and only use it for the intended recruitment purposes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">RecXchange's Data Practices</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RecXchange itself adheres to all relevant data protection laws in the operation of the platform. We collect and process only the data needed to provide our services effectively. Personal data you provide will be processed according to our <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link> and in compliance with laws. We implement industry-standard security measures, including encryption, to protect data in transit and at rest.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">International Data Transfers</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        By using RecXchange, Members consent to the transfer and storage of their data across international borders as necessary for platform functionality. We utilize <strong className="text-white">Standard Contractual Clauses (SCCs)</strong> or other approved legal mechanisms to ensure that any personal data transferred internationally remains protected and compliant with EU/UK data export requirements.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 8. Intellectual Property */}
              <div id="ip">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">8. Intellectual Property</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      All rights, title, and interest in and to the RecXchange platform and its content are owned by <strong className="text-white">RecXchange Portal LLC</strong>. This includes the platform's software code, design, logos, trademarks, branding, databases, and any content created or provided by RecXchange. These are protected by copyright, trademark, and other intellectual property laws.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Use of Platform IP</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Members are granted a limited, revocable, non-exclusive license to use the platform and its materials <strong className="text-white">for their intended purpose</strong> (professional recruitment collaboration) while they are approved Members in good standing. You may not use RecXchange's name, logos, or branding for any purpose outside of the platform without prior written permission.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Prohibited Actions</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Members must not attempt to copy, modify, distribute, or create derivative works based on any part of the platform. Reverse-engineering any feature of the platform, scraping or extracting our data, or reselling any aspect of the platform to third parties without consent is strictly prohibited.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Member's IP & Data</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Members retain ownership of the data and content they personally upload to the platform. By uploading such content, you are not transferring ownership to RecXchange. However, you grant RecXchange a license to use, store, and process that content as needed to operate the service.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 9. Liability & Disclaimers */}
              <div id="liability">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">9. Liability, Disclaimers & Indemnity</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange's goal is to facilitate successful collaborations, but we also need to make clear what risks we do <strong>not</strong> assume. By using the platform, you acknowledge and accept the following disclaimers and limitations of liability:
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">No Liability for Member Dealings</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RecXchange is <strong className="text-white">not liable for any issues or losses that arise between Members</strong> or as a result of collaborations initiated on the platform. This includes disputes between Members, non-payment of fees, contract breaches or misconduct, placement outcomes, and indirect or consequential losses.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Platform Provided "As Is"</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RecXchange provides the platform and services on an "as is" and "as available" basis, <strong className="text-white">without any warranties or guarantees</strong> of any kind (to the maximum extent permitted by law). While we strive for high availability and accuracy, we do not warrant that the platform will be uninterrupted, error-free, or secure at all times.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Member's Responsibility & Due Diligence</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Each Member assumes full responsibility for their use of RecXchange. This means you will use your own judgment and due diligence when engaging with other Members. RecXchange facilitates introductions and communications, but <strong className="text-white">does not vet or certify</strong> the truthfulness, qualifications, or capabilities of Members.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Limitation of Liability</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Our liability shall be limited to the amount of subscription fees you have paid to RecXchange in the <strong className="text-white">12 months</strong> prior to the event giving rise to the liability, or <strong className="text-white">£100 GBP</strong>, whichever is greater. <strong className="text-white">Nothing in these Terms is intended to limit or exclude</strong> any liability that cannot be limited by law, such as liability for death or personal injury caused by negligence, or liability for fraud.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Indemnification</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        You agree to <strong className="text-white">indemnify and hold harmless RecXchange Portal LLC</strong>, its affiliates, and their respective directors, officers, employees, and agents from and against any third-party claims, liabilities, damages, losses, or expenses (including reasonable legal fees) that arise out of or relate to your use of the platform, your violation of these Terms, or your violation of any applicable law or the rights of any third party.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 10. Subscription & Billing */}
              <div id="subscription">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">10. Subscription & Billing Terms</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Access to RecXchange may require an active subscription (unless you are in a trial or promotional access period). The following terms apply to subscriptions and billing:
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Billing & Payment</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Subscription fees are billed via our third-party payment processor (e.g. Stripe) in the currency and interval indicated when you sign up. You agree to provide a valid payment method and allow RecXchange to charge your card or account for the subscription fees and any applicable taxes.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">No Refund Policy</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        <strong className="text-white">All payments are non-refundable.</strong> This includes your initial subscription payment and any subsequent recurring charges. Once a billing period has been charged, you will not be refunded for that period, except in cases of a billing error or technical fault on our side.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Cancellation by Member</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        You may cancel your subscription at any time. Cancellation will prevent the next renewal charge, but <strong className="text-white">you must provide at least 15 days' notice</strong> before your upcoming renewal date. If you cancel in time, your subscription will simply not renew further; you will continue to have access until the end of the period you already paid for.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">How to Cancel</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Cancellation can be done through your online dashboard settings or by contacting RecXchange support (see Section 14) with a clear request to cancel. We will confirm the cancellation and the effective end date of your subscription.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Changes to Fees</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RecXchange reserves the right to change its subscription plans or pricing in the future. Any changes will be communicated to you in advance and will <strong className="text-white">only apply to subsequent billing cycles</strong>. We will not retroactively charge you more for a period you've already paid for.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 11. Termination */}
              <div id="termination">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">11. Termination of Account</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Both Members and RecXchange have the right to terminate the use of the platform under certain conditions.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Termination by RecXchange (For Cause)</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        RecXchange <strong className="text-white">reserves the right to suspend or terminate</strong> your account at any time, with or without notice, if we determine that you have violated these Terms or engaged in behavior that is harmful, unlawful, or unethical. Reasons for termination may include:
                      </p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Breach of these Terms & Conditions (any section).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Engaging in fraud, dishonesty, or illegal activities through the platform.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Actions that harm the integrity, reputation, or security of the platform or its Members.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Repeated non-compliance or failure to cooperate with investigations into complaints.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Termination by Member</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        You are free to stop using RecXchange and may terminate your own account at any time. You can do this by cancelling your subscription (see Section 10 for the notice period) and contacting support to confirm account closure if needed.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-2">Effect of Termination</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Once an account is terminated, the Member no longer has any right to access or use the RecXchange platform. It is your responsibility to download or secure any information you need from the platform <strong className="text-white">before</strong> your account is closed. We are not liable for any data loss due to termination.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Survival of Certain Terms</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Even after an account is terminated, certain provisions of these Terms will remain in effect, including: <strong className="text-white">Non-Circumvention (Section 6)</strong> which continues for 24 months post any introduction, <strong className="text-white">Confidentiality and data provisions</strong>, <strong className="text-white">Liability & Indemnity (Section 9)</strong>, and <strong className="text-white">Governing Law & Jurisdiction (Section 12)</strong>.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 12. Governing Law */}
              <div id="governing-law">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">12. Governing Law & Multi-Jurisdiction Considerations</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange is a global platform, but we have chosen a single governing law to provide consistency in our Terms & Conditions.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Governing Law</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        These Terms & Conditions, and any dispute or claim arising out of or in connection with them or the use of the platform, shall be governed by and construed in accordance with the <strong className="text-white">laws of England and Wales</strong>. Choosing the law of England and Wales provides a consistent legal framework for all Members, regardless of their location.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Jurisdiction</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Except as provided under the arbitration clause in Section 5, all Members agree that any legal proceedings related to these Terms or your use of RecXchange will be subject to the <strong className="text-white">exclusive jurisdiction of the courts of England and Wales</strong>. In particular, the courts located in <strong className="text-white">London, United Kingdom</strong> will be the venue for resolving any claims.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Global Compliance</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        While the laws of England and Wales govern the interpretation of these Terms, you understand that you must still comply with any applicable laws in the country or state where you operate. If you are accessing or using RecXchange from outside the UK, <strong className="text-white">you are responsible for ensuring that your use is lawful in your own jurisdiction</strong>.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 13. Updates to Terms */}
              <div id="updates">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">13. Updates to These Terms</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange may update or modify these Terms & Conditions from time to time as our platform evolves or laws change. We promise to handle changes in a transparent way.
                    </p>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Notification of Changes</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        If we make material changes to the Terms, we will provide notice to Members. Notification may be sent via email to the address on your account, via an in-platform announcement, and/or by posting an alert when you log in.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Acceptance of Changes</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        After we update the Terms, your continued use of RecXchange constitutes acceptance of the new Terms. If you do not agree to the changes, you must stop using the platform and may cancel your subscription as per Section 10.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Review Frequency</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We encourage Members to review the Terms & Conditions periodically (the current version will always be available on our website) to stay informed of any updates. We will typically version or date stamp our terms so you can track what has changed.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 14. Contact Us */}
              <div id="contact">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">14. Contact Us</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      We're here to help and answer any questions or concerns you might have about these Terms or the RecXchange platform. Please use the appropriate contact below, and we will respond as soon as possible:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">General Enquiries & Support</h4>
                        <p className="text-gray-400 text-xs leading-relaxed mb-2">
                          For general questions about the platform, technical support, or clarification on how something works:
                        </p>
                        <p className="text-cyan-400 text-xs">
                          <a href="mailto:support@recxchange.com" className="hover:underline">support@recxchange.com</a>
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-fuchsia-400/10">
                        <h4 className="text-sm font-bold text-white mb-2">Legal Notices & Escalations</h4>
                        <p className="text-gray-400 text-xs leading-relaxed mb-2">
                          For formal communications, legal notices, or to escalate an unresolved issue:
                        </p>
                        <p className="text-fuchsia-400 text-xs">
                          <a href="mailto:legal@recxchange.com" className="hover:underline">legal@recxchange.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        <strong className="text-white">RecXchange Portal LLC</strong> (trading as RecXchange)<br />
                        Dubai, United Arab Emirates<br />
                        <span className="text-gray-500 italic">Legal Mailing Address available upon request</span>
                      </p>
                    </div>

                    <p className="text-gray-500 text-xs italic">
                      When contacting us, please allow 1-2 business days for a response (though we often respond sooner). We prefer email communication for record-keeping purposes.
                    </p>

                    <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20">
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        RecXchange exists to empower <strong className="text-white">trusted recruiter-to-recruiter collaboration</strong>, deliver fair outcomes, and create a platform where professionalism is rewarded and protected. By adhering to these Terms & Conditions, all Members contribute to a healthy ecosystem of <strong className="text-white">clarity, fairness, and confidence in every interaction</strong>. Thank you for being a valued part of the RecXchange community!
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
