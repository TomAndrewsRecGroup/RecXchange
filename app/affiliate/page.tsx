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
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
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
                      These Terms and Conditions ("<strong className="text-white">Terms</strong>") govern participation in the RecXchange Affiliate Program ("<strong className="text-white">Program</strong>"), operated by <strong className="text-white">Eavee AI Ltd</strong> (trading as "RecXchange").
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

              {/* 2. Eligibility */}
              <div id="eligibility">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-fuchsia-400" />
                    2. Eligibility
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                      To participate in the Affiliate Program, you must meet all the following criteria:
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span>Be a registered RecXchange member in good standing (account active and not in violation of any terms).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span>Be 18 years of age or older.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span>Not reside in a jurisdiction where such referral programs or promotions are prohibited by law.</span>
                      </li>
                    </ul>
                    <p className="text-gray-400 text-sm leading-relaxed mt-4">
                      RecXchange may require proof of eligibility and reserves the right to refuse participation or rewards if eligibility criteria are not met.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 3. Qualified Referrals */}
              <div id="qualified-referrals">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Users className="w-6 h-6 text-purple-400" />
                    3. Qualified Referrals
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                      A referral is only deemed <strong className="text-white">"Qualified"</strong> if <strong className="text-white">all</strong> the following conditions are met:
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>The new user signs up for a RecXchange account via <strong className="text-white">your unique affiliate referral link</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>The new user chooses a subscription tier (Free, Lite, or Pro) and completes all required registration steps — including successful payment of any initial subscription fee for paid plans.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>The referred user <strong className="text-white">remains an active user</strong> of RecXchange for at least <strong className="text-white">two full calendar months</strong> after their sign-up.</span>
                      </li>
                    </ul>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                      <h4 className="text-sm font-bold text-white mb-2">Referrals Will NOT Qualify If:</h4>
                      <ul className="space-y-2 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          <span>The referral is a <strong className="text-white">self-referral</strong> (you cannot refer yourself, a household member, or create duplicate accounts).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          <span>The referred account is <strong className="text-white">fake, fraudulent, inactive, or a duplicate</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          <span>The referred user <strong className="text-white">cancels, downgrades, or fails to remain active</strong> during the two-month qualifying period.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-500 text-xs italic mt-4">
                      RecXchange reserves the right to determine whether a referral is Qualified at its sole discretion, including the right to verify user identity, eligibility, and activity.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 4. Referral Reward Structure */}
              <div id="reward-structure">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">4. Referral Reward Structure</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                      Qualified referrals earn <strong className="text-white">RecX Tokens</strong> for the referrer as a one-time reward:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-gray-500/10 to-gray-500/5 border border-gray-500/20">
                        <div className="text-center">
                          <div className="text-3xl font-black text-white mb-2">1</div>
                          <div className="text-xs font-bold text-gray-400 mb-2">RecX Token</div>
                          <div className="text-xs text-gray-500">Free Referral</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                        <div className="text-center">
                          <div className="text-3xl font-black text-cyan-400 mb-2">10</div>
                          <div className="text-xs font-bold text-cyan-300 mb-2">RecX Tokens</div>
                          <div className="text-xs text-gray-500">Lite Referral</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-500/5 border border-fuchsia-500/20">
                        <div className="text-center">
                          <div className="text-3xl font-black text-fuchsia-400 mb-2">25</div>
                          <div className="text-xs font-bold text-fuchsia-300 mb-2">RecX Tokens</div>
                          <div className="text-xs text-gray-500">Pro Referral</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-400 mb-2">Reward Processing and Token Usage</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-white">Award Timing:</strong> RecX Tokens earned from Qualified Referrals are typically credited to your account within approximately <strong className="text-white">15 business days</strong> after the referral's two-month qualification period is verified.
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-white">Token Usage:</strong> RecX Tokens are digital credits with no cash value (i.e., they are <strong className="text-white">not</strong> redeemable for cash or monetary transfer). Instead, tokens can be redeemed on the RecXchange platform for eligible services and content.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Important Notes</h4>
                      <ul className="space-y-2 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">No Cash or Transfer:</strong> RecX Tokens cannot be withdrawn or exchanged for cash, and are non-transferable to other users.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">Expiration:</strong> RecX Tokens do not expire as long as the Affiliate Program and the RecXchange platform remain active.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">No Recurring Payments:</strong> Each Qualified Referral yields a one-time token credit after the two-month period.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 5. Tax and Legal Compliance */}
              <div id="tax-compliance">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">5. Tax and Legal Compliance</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Participants are solely responsible for any <strong className="text-white">tax obligations</strong> or legal reporting requirements that may arise from receiving or redeeming RecX Tokens in their country or jurisdiction. RecXchange does not deduct or withhold any taxes on your behalf for token rewards.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      If required by applicable laws, RecXchange reserves the right to collect necessary tax information or documentation from participants (for example, completion of tax forms or submission of identification) before awarding token rewards or allowing their redemption, in accordance with local regulations.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      All participants should consult with a tax professional if they are unsure about the tax treatment of the tokens or benefits received through this Program.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 6. Fraud Prevention */}
              <div id="fraud-prevention">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">6. Fraud Prevention</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange takes fraud and abuse seriously. We reserve the right to <strong className="text-white">cancel, withhold, or revoke token rewards</strong> (and/or disqualify referrals) if any form of suspicious or prohibited activity is detected.
                    </p>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Prohibited Activities Include:</h4>
                      <ul className="space-y-2 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Suspicious or abusive activity by the participant or referred users, such as patterns suggestive of fraud.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Referrals generated through <strong className="text-white">bots, automated scripts, spam, incentivized bulk sign-ups</strong>, or "coupon"/referral websites not authorized by RecXchange.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Any form of <strong className="text-white">gaming the system</strong>, including creating multiple accounts, fake identities, fake referrals, or collusion between users.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span><strong className="text-white">Circular referral schemes</strong> (e.g. two users continuously referring each other).</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      RecXchange employs automated and manual review processes to monitor referral activity. Participants found to be engaging in fraudulent or abusive behavior may be suspended from the Program, have their RecXchange accounts terminated, and/or be banned from all current and future promotions. In cases of serious fraud, RecXchange reserves the right to report such activity to the appropriate authorities.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 7. Data Protection */}
              <div id="data-protection">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">7. Data Protection</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Participant data will be processed in accordance with RecXchange's Privacy Policy and applicable data protection laws. By participating, you agree that RecXchange may collect and use certain data for the purpose of operating and tracking the Affiliate Program.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      This data may include, for example, referral link tracking information such as IP addresses, browser and device information, and user agent strings, as well as records of sign-up and subscription status for referred users.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Such information is used strictly to administer the referral program (e.g., to attribute referrals and calculate rewards) and will be shared only with service providers as needed to operate the Program, and always in compliance with applicable data protection regulations. RecXchange will not sell your personal data or the data of your referrals to third parties.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 8. Program Integrity */}
              <div id="program-integrity">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">8. Program Integrity</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                      To protect the integrity of the Affiliate Program, RecXchange reserves the right to take appropriate actions in its sole discretion:
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Suspend or terminate</strong> any participant's account or participation in the Program if we determine that the participant has breached these Terms or any other RecXchange terms of service.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Delay or cancel the crediting of token rewards</strong> for referrals that are under investigation or where RecXchange has reason to suspect fraud or violation of these Terms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-fuchsia-400 mt-1">•</span>
                        <span><strong className="text-white">Modify, suspend, or end the Affiliate Program</strong> at any time, with at least 7 days' notice provided (e.g. via email or an announcement on our platform).</span>
                      </li>
                    </ul>
                    <p className="text-gray-500 text-xs italic mt-4">
                      Any referrals made prior to a program modification will still earn rewards under the terms in effect at the time of the referral, unless the modification was required by law or to prevent ongoing abuse.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 9. Geographic Restrictions */}
              <div id="geographic-restrictions">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    9. Geographic Restrictions
                  </h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      The Affiliate Program is <strong className="text-white">void where prohibited</strong> by law. It is the participant's responsibility to ensure that participating in this referral Program is in compliance with local laws and regulations in their jurisdiction.
                    </p>

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">Restricted Regions</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-2">
                        Due to legal or regulatory restrictions, residents of certain regions are <strong className="text-white">not eligible</strong> to participate in the Program. Notably restricted regions include (but are not limited to):
                      </p>
                      <ul className="space-y-1 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Canada (province of Quebec)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Brazil</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>China</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Germany</span>
                        </li>
                      </ul>
                      <p className="text-gray-500 text-xs mt-2 italic">
                        This list may be updated if laws change or new restrictions arise.
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </div>

              {/* 10. No Guarantee of Rewards */}
              <div id="no-guarantee">
                <HolographicCard color="cyan" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">10. No Guarantee of Rewards</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      RecXchange makes <strong className="text-white">no guarantee</strong> that any participant will earn any particular amount of rewards or number of tokens through this Program. All token rewards are contingent on actual Qualified Referrals and adherence to these Terms.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      While the Program sets forth the reward structure, the <strong className="text-white">outcome for each participant will vary</strong> based on their referral activity. There is no guaranteed minimum payout to any individual, and nothing in these Terms shall be construed as an assurance that you will earn tokens or any benefit by merely participating.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      If you do not generate Qualified Referrals, you will not earn RecX Tokens. Additionally, the availability of the Program itself and the total distribution of tokens are subject to RecXchange's discretion and Program rules.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 11. Liability Limitation */}
              <div id="liability">
                <HolographicCard color="fuchsia" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">11. Liability Limitation</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      To the fullest extent permitted by law, RecXchange (Eavee AI Ltd) is <strong className="text-white">not liable</strong> for any indirect, incidental, special, or consequential damages arising out of or in connection with your participation in the Affiliate Program or use of RecX Tokens.
                    </p>

                    <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <h4 className="text-sm font-bold text-white mb-2">RecXchange Is Not Liable For:</h4>
                      <ul className="space-y-2 text-gray-400 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">Tracking failures or technical errors</strong> — any failure of the referral tracking system, delays in recording referrals, or other technical issues.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">Platform or third-party service issues</strong> — any delays, failures, or interruptions in the crediting of tokens or in the ability to use tokens.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span><strong className="text-white">Disqualified or invalid referrals</strong> — any losses resulting from referrals that are determined to be disqualified or invalid under these Terms.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      Our total liability to any participant under this Program is <strong className="text-white">capped at the total value of rewards (RecX Tokens) that have been earned by and issued to that participant</strong> in accordance with these Terms. This limitation applies to any and all claims, whether arising in contract, tort (including negligence), or otherwise.
                    </p>

                    <p className="text-gray-500 text-xs italic">
                      Nothing in these Terms shall limit or exclude liability for gross negligence, fraud, or intentional misconduct by RecXchange, or for any other liability that cannot be limited or excluded under applicable law.
                    </p>
                  </div>
                </HolographicCard>
              </div>

              {/* 12. Governing Law */}
              <div id="governing-law">
                <HolographicCard color="purple" variant="content">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">12. Governing Law</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      These Terms and the Affiliate Program are governed by the laws of <strong className="text-white">England and Wales</strong>, without regard to conflict of law principles. By participating in the Program, you agree that any disputes or claims arising out of or relating to these Terms or your participation in the Program will be subject to the exclusive jurisdiction of the courts of <strong className="text-white">England and Wales</strong>.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      RecXchange and participants each irrevocably submit to the jurisdiction of these courts for the purpose of resolving any such disputes.
                    </p>
                    <p className="text-gray-500 text-xs italic">
                      If any provision of these Terms is found to be unlawful or unenforceable, that provision will be deemed severable from the Terms and will not affect the validity and enforceability of the remaining provisions.
                    </p>
                  </div>
                </HolographicCard>
              </div>

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
