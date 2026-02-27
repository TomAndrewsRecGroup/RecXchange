"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-[1400px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            Earn RecX Tokens
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            Affiliate Program Terms
          </h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Refer recruiters, earn RecX Tokens. Clear terms for our token-based referral program.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Effective Date: 5th September 2025 | Last Updated: 30th October 2025
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
                These Terms and Conditions ("<strong className="text-white">Terms</strong>") govern participation in the RecXchange Affiliate Program ("<strong className="text-white">Program</strong>"), operated by <strong className="text-white">RecXchange Portal LLC</strong> (trading as "RecXchange").
              </p>
              <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5 mb-6">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">"RecX Tokens"</strong> means digital, non-monetary credits issued by RecXchange Portal LLC, redeemable only for services within the RecXchange platform and subject to these Terms.
                </p>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white">By participating in the Program, you agree to be bound by these Terms.</strong>
              </p>
            </section>

            {/* 1. Overview */}
            <section id="overview" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">1.</span> Overview
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  This Program rewards eligible RecXchange Members with <strong className="text-white">RecX Tokens</strong> (digital reward credits) for verified successful referrals, instead of cash payouts.
                </p>
                <p>
                  RecX Tokens can be redeemed on the RecXchange platform for various services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li>Uploading candidates or roles to the Xchange Engine</li>
                  <li>Purchasing eLearning content</li>
                  <li>Redeeming candidate contact information (emails/phone numbers) in the sourcing tools</li>
                </ul>
                <p className="text-sm">
                  These token-based rewards replace the previous cash giveaway model and are designed to incentivize referrals in-platform. All participation is subject to the terms and conditions below.
                </p>
              </div>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">2.</span> Eligibility
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>To participate in the Affiliate Program, you must meet all the following criteria:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be a registered RecXchange member in good standing (account active and not in violation of any terms)</li>
                  <li>Be 18 years of age or older</li>
                  <li>Not reside in a jurisdiction where such referral programs or promotions are prohibited by law</li>
                </ul>
                <p className="text-sm">
                  RecXchange may require proof of eligibility and reserves the right to refuse participation or rewards if eligibility criteria are not met.
                </p>
              </div>
            </section>

            {/* 3. Qualified Referrals */}
            <section id="qualified-referrals" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">3.</span> Qualified Referrals
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>A referral is only deemed "<strong className="text-white">Qualified</strong>" if all the following conditions are met:</p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/10">
                  <ul className="list-disc list-inside space-y-3 text-sm">
                    <li>The new user signs up for a RecXchange account via your unique affiliate referral link</li>
                    <li>The new user chooses a subscription tier (RecX Entry, RecXLite, or RecXPro) and completes all required registration steps, including successful payment of any initial subscription fee for paid plans</li>
                    <li><strong className="text-white">The referred user remains an active user of RecXchange for at least two full calendar months after their sign-up</strong></li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-white font-bold mb-3">Referrals will NOT qualify if:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    <li>The referral is a self-referral (you cannot refer yourself, a member of your immediate household, or create duplicate accounts)</li>
                    <li>The referred account is fake, fraudulent, inactive, or a duplicate account</li>
                    <li>The referred user cancels, downgrades, or fails to remain active during the two-month qualifying period</li>
                    <li>The referred user violates RecXchange's terms resulting in account termination during the initial two months</li>
                  </ul>
                </div>

                <p className="text-sm">
                  RecXchange reserves the right to determine whether a referral is Qualified at its sole discretion, including the right to verify user identity, eligibility, and activity.
                </p>
              </div>
            </section>

            {/* 4. Referral Reward Structure */}
            <section id="reward-structure" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">4.</span> Referral Reward Structure
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Qualified referrals earn RecX Tokens for the referrer as a <strong className="text-white">one-time reward</strong>. The reward structure is:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass-card p-6 rounded-lg border-gray-400/10">
                    <h3 className="text-white font-bold mb-2">RecX Entry Referral</h3>
                    <p className="text-3xl font-bold text-cyan-400 mb-2">1 Token</p>
                    <p className="text-gray-400 text-xs">For each new free membership user who meets the two-month active requirement</p>
                  </div>
                  <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                    <h3 className="text-white font-bold mb-2">RecXLite Referral</h3>
                    <p className="text-3xl font-bold text-cyan-400 mb-2">5 Tokens</p>
                    <p className="text-gray-400 text-xs">For each new RecXLite (paid subscription) user who meets the two-month active requirement</p>
                  </div>
                  <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                    <h3 className="text-white font-bold mb-2">RecXPro Referral</h3>
                    <p className="text-3xl font-bold text-fuchsia-400 mb-2">25 Tokens</p>
                    <p className="text-gray-400 text-xs">For each new RecXPro (paid subscription) user who meets the two-month active requirement</p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-lg border-cyan-400/10 mt-6">
                  <h3 className="text-white font-bold mb-3">4.1 Reward Processing and Token Usage</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="text-white font-bold mb-1">Award Timing</h4>
                      <p className="text-gray-400">RecX Tokens are typically credited to your account within approximately <strong className="text-white">15 business days</strong> after the referral's two-month qualification period is verified.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Token Usage</h4>
                      <p className="text-gray-400">RecX Tokens are digital credits with <strong className="text-white">no cash value</strong> (not redeemable for cash or monetary transfer). Tokens can be redeemed on the RecXchange platform for eligible services.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">No Cash or Transfer</h4>
                      <p className="text-gray-400">RecX Tokens cannot be withdrawn or exchanged for cash, and are <strong className="text-white">non-transferable</strong> to other users. Any attempt to sell, trade, or convert tokens outside of authorized platform uses is prohibited.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Expiration</h4>
                      <p className="text-gray-400">RecX Tokens do not expire as long as the Affiliate Program and the RecXchange platform remain active, unless otherwise stated by RecXchange.</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs">
                  <strong className="text-white">Note:</strong> There are no recurring monthly payments for referrals. Once the token reward for a referral is issued, that referral will not generate additional rewards in subsequent months. There is also no minimum number of referrals required to start earning tokens.
                </p>
              </div>
            </section>

            {/* 5. Tax and Legal Compliance */}
            <section id="tax-compliance" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">5.</span> Tax and Legal Compliance
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <div className="glass-card p-6 rounded-lg border-fuchsia-400/20 bg-fuchsia-400/5">
                  <p className="text-sm mb-3">
                    <strong className="text-white">Participants are solely responsible for any tax obligations or legal reporting requirements</strong> that may arise from receiving or redeeming RecX Tokens in their country or jurisdiction.
                  </p>
                  <p className="text-sm">
                    RecXchange does not deduct or withhold any taxes on your behalf for token rewards.
                  </p>
                </div>
                <p>
                  If required by applicable laws, RecXchange reserves the right to collect necessary tax information or documentation from participants (for example, completion of tax forms or submission of identification) before awarding token rewards or allowing their redemption.
                </p>
                <p className="text-sm">
                  All participants should consult with a tax professional if they are unsure about the tax treatment of the tokens or benefits received through this Program.
                </p>
              </div>
            </section>

            {/* 6. Fraud Prevention */}
            <section id="fraud-prevention" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">6.</span> Fraud Prevention
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange takes fraud and abuse seriously. We reserve the right to cancel, withhold, or revoke token rewards (and/or disqualify referrals) if any form of suspicious or prohibited activity is detected.
                </p>
                <div className="glass-card p-6 rounded-lg border-red-400/20 bg-red-400/5">
                  <h3 className="text-white font-bold mb-3">Prohibited Activities Include:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Suspicious or abusive activity by the participant or referred users, such as patterns suggestive of fraud</li>
                    <li>Referrals generated through bots, automated scripts, spam, incentivized bulk sign-ups, or unauthorized coupon/referral websites</li>
                    <li>Gaming the system: creating multiple accounts, fake identities, fake referrals, or collusion between users</li>
                    <li>Circular referral schemes (e.g., two users continuously referring each other)</li>
                  </ul>
                </div>
                <p className="text-sm">
                  RecXchange employs automated and manual review processes to monitor referral activity. Participants found to be engaging in fraudulent or abusive behavior may be:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li>Suspended from the Program</li>
                  <li>Have their RecXchange accounts terminated</li>
                  <li>Banned from all current and future promotions</li>
                  <li>Reported to appropriate authorities in cases of serious fraud</li>
                </ul>
              </div>
            </section>

            {/* 7. Data Protection */}
            <section id="data-protection" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">7.</span> Data Protection
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Participant data will be processed in accordance with RecXchange's <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link> and applicable data protection laws.
                </p>
                <p>
                  By participating, you agree that RecXchange may collect and use certain data for the purpose of operating and tracking the Affiliate Program. This data may include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li>Referral link tracking information (IP addresses, browser and device information, user agent strings)</li>
                  <li>Records of sign-up and subscription status for referred users</li>
                </ul>
                <p className="text-sm">
                  Such information is used strictly to administer the referral program and will be shared only with service providers as needed to operate the Program, always in compliance with applicable data protection regulations.
                </p>
                <p className="text-sm">
                  <strong className="text-white">RecXchange will not sell your personal data or the data of your referrals to third parties.</strong> All participants have rights regarding their personal data as described in the Privacy Policy.
                </p>
              </div>
            </section>

            {/* 8. Program Integrity */}
            <section id="program-integrity" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">8.</span> Program Integrity
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  To protect the integrity of the Affiliate Program, RecXchange reserves the right to take appropriate actions in its sole discretion.
                </p>
                <div className="space-y-3">
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Suspension or Termination</h3>
                    <p className="text-gray-400 text-sm">RecXchange may suspend or terminate any participant's account or participation in the Program if we determine that the participant has breached these Terms or any other RecXchange terms of service.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Delay or Cancel Rewards</h3>
                    <p className="text-gray-400 text-sm">RecXchange may delay or cancel the crediting of token rewards for referrals that are under investigation or where we have reason to suspect fraud. Rewards may be withheld during the investigation period.</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-cyan-400/10">
                    <h3 className="text-white font-bold mb-2">Modify, Suspend, or End the Program</h3>
                    <p className="text-gray-400 text-sm">RecXchange may modify, suspend, or end the Affiliate Program at any time, with at least <strong className="text-white">7 days' notice</strong> provided (via email or platform announcement). This includes the right to change reward structures, qualification criteria, or any other Program terms.</p>
                  </div>
                </div>
                <p className="text-sm">
                  Any referrals made prior to a program modification will still earn rewards under the terms in effect at the time of the referral, unless the modification was required by law or to prevent ongoing abuse.
                </p>
              </div>
            </section>

            {/* 9. Geographic Restrictions */}
            <section id="geographic-restrictions" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">9.</span> Geographic Restrictions
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The Affiliate Program is void where prohibited by law. It is the participant's responsibility to ensure that participating in this referral Program is in compliance with local laws and regulations in their jurisdiction.
                </p>
                <div className="glass-card p-6 rounded-lg border-red-400/20 bg-red-400/5">
                  <h3 className="text-white font-bold mb-3">Restricted Regions</h3>
                  <p className="text-sm mb-3">Due to legal or regulatory restrictions, residents of certain regions are not eligible to participate in the Program. Notably restricted regions include (but are not limited to):</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Canada (province of Quebec)</li>
                    <li>Brazil</li>
                    <li>China</li>
                    <li>Germany</li>
                  </ul>
                  <p className="text-xs mt-3 text-gray-400">This list may be updated if laws change or new restrictions arise.</p>
                </div>
                <p className="text-sm">
                  If you are located in a restricted region, you should not participate, and RecXchange will not be obligated to provide any reward for referrals originating from such regions.
                </p>
              </div>
            </section>

            {/* 10. No Guarantee of Rewards */}
            <section id="no-guarantee" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">10.</span> No Guarantee of Rewards
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange makes no guarantee that any participant will earn any particular amount of rewards or number of tokens through this Program.
                </p>
                <p>
                  All token rewards are contingent on actual Qualified Referrals and adherence to these Terms. While the Program sets forth the reward structure, the outcome for each participant will vary based on their referral activity.
                </p>
                <p className="text-sm">
                  <strong className="text-white">There is no guaranteed minimum payout to any individual.</strong> If you do not generate Qualified Referrals, you will not earn RecX Tokens.
                </p>
                <p className="text-sm">
                  Additionally, the availability of the Program itself and the total distribution of tokens are subject to RecXchange's discretion and Program rules. The Program may be limited, modified, or terminated as described in Section 8, and thus rewards are not guaranteed to continue indefinitely.
                </p>
              </div>
            </section>

            {/* 11. Liability Limitation */}
            <section id="liability" className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">11.</span> Liability Limitation
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  To the fullest extent permitted by law, RecXchange Portal LLC, trading as 'RecXchange', is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your participation in the Affiliate Program or use of RecX Tokens.
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/10">
                  <h3 className="text-white font-bold mb-3">RecXchange is NOT liable for:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong className="text-white">Tracking failures or technical errors:</strong> Any failure of the referral tracking system, delays in recording referrals, or other technical issues</li>
                    <li><strong className="text-white">Platform or third-party service issues:</strong> Any delays, failures, or interruptions in the crediting of tokens or ability to use tokens</li>
                    <li><strong className="text-white">Disqualified or invalid referrals:</strong> Any losses resulting from referrals that are determined to be disqualified or invalid under these Terms</li>
                  </ul>
                </div>
                <p className="text-sm">
                  <strong className="text-white">Our total liability to any participant under this Program is capped at the total value of rewards (RecX Tokens) that have been earned by and issued to that participant</strong> in accordance with these Terms.
                </p>
                <p className="text-xs">
                  Nothing in these Terms shall limit or exclude liability for gross negligence, fraud, or intentional misconduct by RecXchange, or for any other liability that cannot be limited or excluded under applicable law.
                </p>
              </div>
            </section>

            {/* 12. Governing Law */}
            <section id="governing-law" className="mb-0 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">12.</span> Governing Law
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  These Terms and the Affiliate Program are governed by the <strong className="text-white">laws of England and Wales</strong>, without regard to conflict of law principles.
                </p>
                <p>
                  By participating in the Program, you agree that any disputes or claims arising out of or relating to these Terms or your participation in the Program will be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
                <p className="text-sm">
                  RecXchange and participants each irrevocably submit to the jurisdiction of these courts for the purpose of resolving any such disputes.
                </p>
                <div className="glass-card p-6 rounded-lg border-cyan-400/10 mt-6">
                  <p className="text-sm mb-3">
                    <strong className="text-white">Important Notes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Nothing in this Program creates any agency, partnership, joint venture, or employment relationship between RecXchange and the participant</li>
                    <li>If any provision of these Terms is found to be unlawful or unenforceable, that provision will be deemed severable and will not affect the validity of the remaining provisions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-cyan-400/20">
              <div className="glass-card p-6 rounded-lg border-cyan-400/20 bg-cyan-400/5">
                <h3 className="text-white font-bold mb-3">Questions or Concerns?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  For any questions or concerns about the Affiliate Program or these Terms, please contact us at:
                </p>
                <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                  support@recxchange.io
                </a>
                <p className="text-gray-500 text-xs mt-4">
                  We are here to assist you and clarify any issues regarding the Program.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-xs">
                Thank you for being part of the RecXchange Affiliate Program. Together, we're building a community of successful recruiters.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                Effective Date: 5th September 2025 | Last Updated: 30th October 2025
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
