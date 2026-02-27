"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  { id: 'cookies', title: 'Cookies & Tracking', number: '13' },
  { id: 'external-links', title: 'External Links', number: '14' },
  { id: 'policy-updates', title: 'Policy Updates', number: '15' },
  { id: 'contact', title: 'Contact Details', number: '16' },
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
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-[1400px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            Your Privacy, Our Priority
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            Privacy Policy
          </h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Connected, Collaborative, Rewarding. We're committed to protecting your personal data and being fully transparent about how we use it.
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
                At RecXchange, your trust is our priority. We're committed to protecting your personal data and being fully transparent about how we use it. Whether you're sharing roles, collaborating on placements, or using our AI tools, your privacy, security, and fairness are at the core of everything we do.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                This policy explains how we collect, use, and safeguard your information and how we uphold the values of transparency, trust, and ethical collaboration across our recruiter community.
              </p>
            </section>

            {/* 1. Who We Are */}
            <section id="who-we-are" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">1.</span> Who We Are
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange is a global recruiter-to-recruiter collaboration platform operated by <strong className="text-white">RecXchange Portal LLC</strong>, a company registered in Dubai, United Arab Emirates (Trade Licence No. 1508955).
                </p>
                <p>
                  Our platform enables independent recruitment professionals to connect, share vacancies and candidates, and enter into split-fee arrangements in a trusted network. While headquartered in the UAE, our services are governed by the laws of England and Wales for consistency, as stated in our Terms & Conditions.
                </p>
                <p>
                  RecXchange Portal LLC is the data controller responsible for your personal data in connection with our services. We are committed to protecting your privacy and operate in compliance with the UK General Data Protection Regulation (UK GDPR), the EU GDPR, and other applicable data protection laws globally.
                </p>
              </div>
            </section>

            {/* 2. What Personal Data We Collect */}
            <section id="data-collected" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">2.</span> What Personal Data We Collect
              </h2>
              <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We only collect the personal information necessary to provide and improve our services. This may include:
                </p>
                
                <div className="space-y-4">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Identity and Contact Data</h3>
                    <p className="text-gray-400 text-sm">Your name, business or personal contact details (email address, telephone number, physical address).</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Professional Information</h3>
                    <p className="text-gray-400 text-sm">Your company or agency name, job title, and LinkedIn profile URL used to verify your role in the recruitment industry.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Financial and Transaction Data</h3>
                    <p className="text-gray-400 text-sm">Payment or billing information such as credit card details or bank account information for subscription payments, commission disbursements or split-fee transactions.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Profile and Membership Data</h3>
                    <p className="text-gray-400 text-sm">Information you provide when registering or filling out your profile on RecXchange (e.g. business specialties, regions, and any content you upload to the platform).</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Candidate/Client Data (Third-Party Personal Data)</h3>
                    <p className="text-gray-400 text-sm">Details of candidates or client contacts that you choose to share on the platform (e.g. candidate CVs or client contact information). You must ensure you have the right and consent to share this data.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Communications</h3>
                    <p className="text-gray-400 text-sm">Records of our correspondence with you and any information you submit through forms or messages on the platform.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Usage Data & IP-Based Geolocation</h3>
                    <p className="text-gray-400 text-sm">Technical and usage information when you use RecXchange, such as log-in times, the pages or vacancies you view, search queries, and your interactions with other Members. We may also collect standard technical information sent by your browser or device (IP address, browser type, operating system). <strong className="text-white">We use your IP address to derive approximate location (e.g., country/city) for fraud prevention, analytics, and to route you to the right local team. We then store the derived location in our CRM.</strong> This usage data helps us understand platform activity and improve performance.</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Marketing Preferences</h3>
                    <p className="text-gray-400 text-sm">Your preferences for receiving marketing or updates from us (only collected if you opt-in).</p>
                  </div>

                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Cookies and Tracking Data</h3>
                    <p className="text-gray-400 text-sm">Information collected via cookies and similar technologies when you use our website or platform (see Section 13 on Cookies & Tracking).</p>
                  </div>
                </div>

                <p className="text-sm">
                  We do not intentionally collect any sensitive personal data (also known as special category data), such as information about health, race, religion, or biometrics unless it is absolutely necessary and you have explicitly consented. We also do not knowingly collect data from anyone under 18, as our platform is for professional use by adults.
                </p>
              </div>
            </section>

            {/* 3. How We Collect Personal Data */}
            <section id="how-collected" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">3.</span> How We Collect Personal Data
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We collect personal data through various channels, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Directly from You:</strong> When you fill out our online registration forms, update your profile, submit a candidate or vacancy, contact us via email/phone, or communicate through the platform.</li>
                  <li><strong className="text-white">Through Our Website:</strong> Via cookies and analytics tools that track your usage of our site (see Section 13).</li>
                  <li><strong className="text-white">Referrals or Partnerships:</strong> If you were invited to the platform by another Member or through a referral program, we may receive basic information about you from the referrer with your consent.</li>
                  <li><strong className="text-white">Newsletters or Events:</strong> If you sign up for our newsletter or attend a RecXchange event/webinar, we may collect your name and contact details.</li>
                </ul>
                <p className="text-sm">
                  <strong className="text-white">No Third-Party Data Purchasing:</strong> All personal data we process is obtained directly from you or your authorized actions. We do not buy, rent, or scrape personal data from third-party sources.
                </p>
              </div>
            </section>

            {/* 4. How We Use Your Personal Data */}
            <section id="how-used" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">4.</span> How We Use Your Personal Data
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We use your personal data to run and improve the RecXchange platform and to provide our services to you. Specifically, we use data for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To register and identify you as a Member</li>
                  <li>To facilitate recruiter collaborations</li>
                  <li>For communication and support</li>
                  <li>To provide and record payments and transactions</li>
                  <li>To facilitate secure fee transfers (Escrow service)</li>
                  <li>To improve our platform and services</li>
                  <li>For marketing (with consent)</li>
                  <li>To comply with legal and tax obligations</li>
                  <li>To ensure platform integrity and enforce our terms</li>
                  <li>To support dispute resolution and legal processes</li>
                </ul>
                <p className="text-sm">
                  We do not use your personal data for any kind of automated decision-making or profiling that has legal or significant effects on you without your explicit consent.
                </p>
              </div>
            </section>

            {/* 5. Legal Bases for Processing */}
            <section id="legal-bases" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">5.</span> Legal Bases for Processing
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We process personal data only when we have a valid legal basis under the GDPR. The primary lawful bases we rely on are:</p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-bold mb-1">Consent</h3>
                    <p className="text-gray-400 text-sm">We will ask for your consent in situations where it is required, for example, when you subscribe to marketing emails.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Contract</h3>
                    <p className="text-gray-400 text-sm">We process data that is necessary to perform our contract with you (i.e., to provide the RecXchange services you signed up for).</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Legal Obligation</h3>
                    <p className="text-gray-400 text-sm">If we have a legal duty to process or disclose your data, we will do so (e.g., complying with tax law, responding to a valid legal warrant).</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Legitimate Interests</h3>
                    <p className="text-gray-400 text-sm">We may process your data for the purposes of our legitimate interests or those of a third party, provided that your rights and interests do not override those interests. Our legitimate interests include maintaining the security of the platform, preventing fraud, improving our services, and facilitating the recruiter network.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Consent and Marketing Communications */}
            <section id="consent-marketing" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">6.</span> Consent and Marketing Communications
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We will only send you marketing communications if you have given us clear, affirmative consent to do so. You have full control over your marketing preferences and can withdraw your consent at any time.
                </p>
                <p>
                  Every marketing email we send will include an unsubscribe link. You can also change your preferences by contacting us at <a href="mailto:privacy@recxchange.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">privacy@recxchange.com</a>.
                </p>
                <p className="text-sm">
                  We do not sell or share your personal data with third parties for their own direct marketing purposes without your consent.
                </p>
              </div>
            </section>

            {/* 7. Data Sharing and Disclosures */}
            <section id="data-sharing" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">7.</span> Data Sharing and Disclosures
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We value your privacy and share personal data only when necessary. We do not sell or rent your personal information to third parties. However, we may disclose your data to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Service Providers:</strong> Trusted third-party companies that help us operate RecXchange (payment processors, cloud hosting, IT infrastructure, analytics and marketing tools).</li>
                  <li><strong className="text-white">Other Members:</strong> By the nature of the platform, certain information you post may be visible to other approved Members (vacancy postings, candidate profiles, basic profile information).</li>
                  <li><strong className="text-white">Legal Obligations:</strong> When required by law or when disclosure is reasonably necessary to comply with legal obligations, protect rights, or ensure safety.</li>
                  <li><strong className="text-white">Business Transactions:</strong> In the event of a merger, acquisition, or sale of assets, your data might be transferred to the new owner.</li>
                </ul>
                <p className="text-sm">
                  All third parties that process personal data on our behalf are contractually obligated to uphold strict confidentiality and security standards in line with GDPR.
                </p>
              </div>
            </section>

            {/* 8. Member Responsibilities (Candidate Data Compliance) */}
            <section id="member-responsibilities" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">8.</span> Member Responsibilities
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  If you, as a Member, upload or share personal data about other individuals (for example, candidate CVs or client contact details), you must ensure you have a lawful basis to do so and that you handle that data responsibly.
                </p>
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <h3 className="text-white font-bold mb-3">Key Requirements:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    <li><strong className="text-white">Obtain Candidate Consent:</strong> You must have the candidate's explicit permission before sharing their information.</li>
                    <li><strong className="text-white">Comply with Data Protection Laws:</strong> Handle all personal data in compliance with UK GDPR, EU GDPR, and other applicable laws.</li>
                    <li><strong className="text-white">No Circumvention or Misuse:</strong> Do not use personal data obtained via RecXchange to go around another Member or for unrelated purposes.</li>
                  </ul>
                </div>
                <p className="text-sm">
                  Any misuse of personal data on the platform is taken very seriously and may result in account removal, bans, and legal consequences.
                </p>
              </div>
            </section>

            {/* 9. International Data Transfers */}
            <section id="international-transfers" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">9.</span> International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange operates a global platform, which means personal data may be transferred to or stored in different countries. We are headquartered in the UAE, and we use cloud infrastructure that may be located in the United Kingdom, the European Economic Area (EEA), the United Arab Emirates, or other jurisdictions.
                </p>
                <p>
                  For transfers of personal data out of the UK/EEA, we rely on approved safeguards like the European Commission's or UK's Standard Contractual Clauses (SCCs). We also employ technical measures like encryption in transit and at rest as an additional layer of security for international data.
                </p>
              </div>
            </section>

            {/* 10. Data Retention */}
            <section id="data-retention" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">10.</span> Data Retention
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We retain personal data only for as long as it is necessary to fulfill the purposes described in this policy, or as required by law or legitimate business needs.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Active Members:</strong> Data retained for the duration of your membership.</li>
                  <li><strong className="text-white">Former Members:</strong> Data generally retained for up to 7 years after membership ends (for legal, accounting, and dispute resolution purposes).</li>
                  <li><strong className="text-white">Prospective Members:</strong> Inquiry data kept for up to 12 months.</li>
                  <li><strong className="text-white">Cookie Data:</strong> Short-term tracking data retained according to typical cookie lifespans.</li>
                </ul>
                <p className="text-sm">
                  After the applicable retention period ends, we will either securely delete or anonymize your personal data.
                </p>
              </div>
            </section>

            {/* 11. Data Security */}
            <section id="data-security" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">11.</span> Data Security
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We employ strong security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. Our security program includes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Encryption</h3>
                    <p className="text-gray-400 text-xs">All communications protected by SSL/TLS encryption (HTTPS). Sensitive data encrypted at rest.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Secure Infrastructure</h3>
                    <p className="text-gray-400 text-xs">Reputable cloud hosting with robust physical and network security, firewalls, and monitoring.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Access Controls</h3>
                    <p className="text-gray-400 text-xs">Data accessible only on a need-to-know basis with strong authentication and periodic access reviews.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2 text-sm">Staff Training</h3>
                    <p className="text-gray-400 text-xs">Team members trained in data protection best practices and bound by confidentiality obligations.</p>
                  </div>
                </div>
                <p className="text-sm">
                  In the unlikely event of a data breach that could pose a risk to your rights or freedoms, we will notify you and the appropriate supervisory authority as required by law.
                </p>
              </div>
            </section>

            {/* 12. Your Rights */}
            <section id="your-rights" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">12.</span> Your Rights
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  As an individual using RecXchange, you have important rights regarding your personal data under the UK GDPR, EU GDPR, and similar data protection laws:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Be Informed</h3>
                    <p className="text-gray-400 text-sm">Clear and transparent information about how we use your data (this Privacy Policy).</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Access Your Data</h3>
                    <p className="text-gray-400 text-sm">Request a copy of the personal data we hold about you.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Rectification</h3>
                    <p className="text-gray-400 text-sm">Have inaccurate or incomplete personal data corrected.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Erasure (Right to be Forgotten)</h3>
                    <p className="text-gray-400 text-sm">Ask us to delete your personal data in certain circumstances.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Restrict Processing</h3>
                    <p className="text-gray-400 text-sm">Request that we limit the processing of your data in certain situations.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Data Portability</h3>
                    <p className="text-gray-400 text-sm">Receive your data in a structured, machine-readable format.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Object to Processing</h3>
                    <p className="text-gray-400 text-sm">Object to processing for direct marketing or processing based on legitimate interests.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Not Be Subject to Automated Decisions</h3>
                    <p className="text-gray-400 text-sm">Rights related to automated decision-making and profiling.</p>
                  </div>
                </div>
                <p>
                  To exercise any of these rights, please contact us at <a href="mailto:privacy@recxchange.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">privacy@recxchange.com</a>. We will respond within one month (30 days) of receiving your request, as required by GDPR.
                </p>
                <p className="text-sm">
                  You also have the right to lodge a complaint with a data protection supervisory authority. Our lead supervisory authority is the UK Information Commissioner's Office (ICO). You can contact the ICO at 0303 123 1113 or through their website <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">ico.org.uk</a>.
                </p>
              </div>
            </section>

            {/* 13. Cookies & Tracking Technologies */}
            <section id="cookies" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">13.</span> Cookies & Tracking Technologies
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  When you visit the RecXchange website or use the platform, we use cookies and similar tracking technologies to provide and improve our services. We use the following types of cookies:
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Essential Cookies</h3>
                    <p className="text-gray-400 text-sm">Necessary for the website and platform to function properly (e.g., keep you logged in). Cannot be opted out.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Analytics/Performance Cookies</h3>
                    <p className="text-gray-400 text-sm">Collect information about how users interact with our site (e.g., Google Analytics). Data is aggregated and does not directly identify individuals.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Functionality Cookies</h3>
                    <p className="text-gray-400 text-sm">Help to personalize your experience by remembering choices you've made.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Marketing Cookies</h3>
                    <p className="text-gray-400 text-sm">Used to track engagement if you have given permission (only activated with your consent).</p>
                  </div>
                </div>
                <p>
                  When you first visit our site, you will see a cookie notice that lets you manage your cookie preferences. You can also manage cookies through your browser settings.
                </p>
              </div>
            </section>

            {/* 14. External Links */}
            <section id="external-links" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">14.</span> External Links
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our platform or website may contain links to websites, plugins, or services that are not operated by RecXchange. This Privacy Policy does not cover those external websites. We are not responsible for the content, security, or privacy practices of any third-party sites.
                </p>
                <p className="text-sm">
                  We strongly encourage you to review the privacy policies of every website or service you interact with outside of RecXchange.
                </p>
              </div>
            </section>

            {/* 15. Updates to This Privacy Policy */}
            <section id="policy-updates" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">15.</span> Updates to This Privacy Policy
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We may update or revise this Privacy Policy from time to time to reflect changes in our business, legal obligations, or the services we offer. If we make material changes, we will notify you via email, an in-app alert, or an announcement on our website.
                </p>
                <p className="text-sm">
                  We encourage you to periodically review this Privacy Policy to stay informed about how we are protecting your information.
                </p>
              </div>
            </section>

            {/* 16. Contact Details */}
            <section id="contact" className="mb-0 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">16.</span> Contact Details
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We welcome any questions, concerns, or requests regarding this Privacy Policy or your personal data. Please feel free to contact us:
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold mb-1">Email</h3>
                      <a href="mailto:legal@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors">legal@recxchange.io</a>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Postal Address</h3>
                      <p className="text-gray-400 text-sm">RecXchange Portal LLC<br />Pinnacle Building<br />Sheikh Zayed Road<br />Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  For the fastest response, we recommend contacting us by email. We will strive to respond to all legitimate inquiries within 2 business days.
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-cyan-400/20 text-center">
              <p className="text-gray-500 text-xs">
                <strong className="text-white">Governing Law:</strong> This Privacy Policy is governed by the laws of England and Wales. This does not affect any mandatory rights or protections you have under local data privacy laws.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                Thank you for taking the time to read our Privacy Policy. We are dedicated to protecting your personal data and ensuring that RecXchange remains a secure and trustworthy platform for all members.
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
