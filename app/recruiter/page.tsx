'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import SendRolesForm from '@/components/send-roles-form';
import { Database, Upload, Check } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import FAQSection from '@/components/FAQSection';
import LastUpdated from '@/components/LastUpdated';
import { recruiterGeneralFAQs } from '@/data/faqs/recruiter-faqs';
import { internalLinks } from '@/lib/internal-links';

export default function RecruiterDiagnostic() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Hero Content */}
          <header className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatusBadge label="FOR RECRUITERS" color="cyan" />
              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
                style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
                Stop sitting on <br className="hidden sm:block" />
                <span className="sm:inline">unmatched talent.</span>
              </h1>
              <NeonDivider width="w-40" color="mixed" />
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 mt-6">
                Every recruiter has roles without candidates, or candidates without roles. RecXchange fixes that. See our <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">simple pricing</Link> or find out <Link href={internalLinks.whyRecXchange} className="text-fuchsia-400 hover:text-fuchsia-300 underline">why thousands of recruiters already use us</Link>.
              </p>
            </motion.div>
          </header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">How does RecXchange work for recruiters?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              RecXchange is a collaboration platform where recruiters post roles to find candidates, or share candidates to find roles, and split the placement fee with the recruiter on the other side. The platform matches you with partners using AI, generates legally binding fee agreements automatically, and protects private data until both sides commit. Over 15,000 recruiters use RecXchange, with splits ranging from 50/50 to 70/30 and an average placement fee of $7,000.
            </p>
          </section>

          {/* Diagnostic Card */}
          <section className="mb-10 sm:mb-16 md:mb-20">
            <HolographicCard color="cyan" variant="content">
              <StatusBadge label="WHAT DO YOU NEED?" color="cyan" size="sm" />

              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight leading-snug mt-4">
                Tell us what's missing and we'll connect you:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-10">
                {/* Card A: I need candidates (Cyan) */}
                <Link href="/recruiter-roles" className="group">
                  <HolographicCard color="cyan" variant="content" className="h-full min-h-[400px] sm:min-h-[420px] md:min-h-[480px]">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-cyan-400">
                          <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 group-hover:text-cyan-400 transition-colors">I have a role, I need candidates</h3>
                        <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-6 md:mb-8">
                          Post your role and let recruiters who already have the right candidates come to you. You agree the terms, split the fee, and make the placement together.
                        </p>
                        <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-5 sm:mb-6 md:mb-8">
                          {[
                            "Smart matching finds the best candidates in seconds",
                            "Every recruiter is rated and reviewed by their peers",
                            "Your client stays confidential until you say otherwise"
                          ].map((item, i) => (
                            <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-2.5 md:gap-3">
                              <span className="w-1 h-1 mt-1.5 bg-cyan-400 rounded-full flex-shrink-0" /> 
                              <span className="text-[11px] sm:text-xs leading-snug flex-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <GlowButton variant="secondary" size="md" className="w-full">
                        See How Candidates Match
                      </GlowButton>
                    </div>
                  </HolographicCard>
                </Link>

                {/* Card B: I need roles (Fuchsia) */}
                <Link href="/recruiters-with-candidates" className="group">
                  <HolographicCard color="fuchsia" variant="content" className="h-full min-h-[400px] sm:min-h-[420px] md:min-h-[480px]">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-fuchsia-400">
                          <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 group-hover:text-fuchsia-400 transition-colors">I have candidates, I need roles</h3>
                        <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-6 md:mb-8">
                          Got a brilliant candidate sitting on your desk? Share them with recruiters who have live roles that fit. They find the opportunity, you split the reward.
                        </p>
                        <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-5 sm:mb-6 md:mb-8">
                          {[
                            "Flexible fee splits: 50/50, 60/40, or 70/30",
                            "Legally binding agreements generated automatically",
                            "Your candidate stays private until you approve the match"
                          ].map((item, i) => (
                            <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-2.5 md:gap-3">
                              <span className="w-1 h-1 mt-1.5 bg-fuchsia-400 rounded-full flex-shrink-0" /> 
                              <span className="text-[11px] sm:text-xs leading-snug flex-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <GlowButton variant="secondary" size="md" className="w-full">
                        Work on Live Roles
                      </GlowButton>
                    </div>
                  </HolographicCard>
                </Link>
              </div>

              <div className="pt-5 sm:pt-6 md:pt-8 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-[10px] sm:text-[11px] text-gray-400">
                <p className="flex items-center gap-2 text-center md:text-left">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)] flex-shrink-0" />
                  <span>Switch between paths at any time.</span>
                </p>
                <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-white transition-colors font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                  <span className="whitespace-nowrap">Review Membership Tiers</span> <span className="text-base sm:text-lg">→</span>
                </Link>
              </div>
            </HolographicCard>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Platform Benefits */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-14 px-2">
              <StatusBadge label="THE FULL TOOLKIT" color="purple" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6 tracking-tight leading-tight">
                Everything you need to make more placements
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
                Whichever path you choose, you get access to the full platform, built for recruiters who want to collaborate and earn more. See how our <Link href={internalLinks.collaboration} className="text-purple-400 hover:text-purple-300 underline">collaboration tools</Link> work.
              </p>
            </div>

            {/* Split Content: Roles vs Candidates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
              {/* Left: If You Need Candidates */}
              <HolographicCard color="cyan" variant="content">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-cyan-300">When You Need Candidates</h3>
                <p className="text-gray-300 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-5 sm:mb-6 md:mb-8">
                  Post your role with clear fee terms. Verified recruiters who have matching candidates will reach out to partner with you. No chasing required.
                </p>
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {[
                    { title: "Verified Partners Only", desc: "Your role goes to pre-vetted recruiters. You control who sees what and when." },
                    { title: "Smart Matching", desc: "Our AI finds the best-fit candidates for your role instantly. No manual searching needed." },
                    { title: "One Dashboard", desc: "Track every candidate from every partner in a single pipeline view." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5 sm:gap-3 md:gap-4 items-start">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                        <Check size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-[13px] sm:text-sm mb-0.5 sm:mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              {/* Right: If You Need Roles */}
              <HolographicCard color="fuchsia" variant="content">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-fuchsia-300">When You Need Roles</h3>
                <p className="text-gray-300 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-5 sm:mb-6 md:mb-8">
                  Share your candidates and let AI match them to live roles from thousands of recruiters across the network.
                </p>
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {[
                    { title: "Beyond Keyword Matching", desc: "Our AI understands skills, experience, and location fit, not just job titles." },
                    { title: "Always-On Scanning", desc: "New roles are matched to your candidates automatically as they're posted, 24/7." },
                    { title: "270M Profiles, One Search", desc: "Need candidates? Search 270 million profiles globally to find exactly who you need." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5 sm:gap-3 md:gap-4 items-start">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-fuchsia-400">
                        <Check size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-[13px] sm:text-sm mb-0.5 sm:mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>
            </div>

            {/* Core Platform */}
            <HolographicCard color="purple" variant="content">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-center leading-tight text-white">
                Included with <span className="gradient-text">every membership</span>
              </h3>
              <p className="text-gray-300 text-center text-[13px] sm:text-sm md:text-base max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                Whichever path you take, you get full access to our ATS, CRM, AI tools, protected fee agreements, and the entire collaboration network.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {[
                  { icon: Database, title: "Your Recruitment Hub", desc: "Manage candidates, clients, and pipelines, all in one place. No more spreadsheets." },
                  { icon: Upload, title: "AI-Powered Search", desc: "Find the perfect candidate from 270M profiles with intelligent, context-aware search." },
                  { icon: Check, title: "Protected Fee Splits", desc: "Every deal has a legally binding agreement generated automatically. No awkward conversations." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 mx-auto mb-2.5 sm:mb-3 md:mb-4">
                      <item.icon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="text-white font-bold text-[13px] sm:text-sm md:text-base mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </HolographicCard>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12">
              {[
                { value: "$7,000", label: "Average Placement Earning", sublabel: "What our recruiters typically make per deal" },
                { value: "15,000+", label: "Recruiters on the Network", sublabel: "Vetted, rated, and ready to collaborate" },
                { value: "270M", label: "Candidate Profiles", sublabel: "Searchable globally with AI-powered matching" }
              ].map((stat, i) => (
                <HolographicCard key={i} color={i === 0 ? "cyan" : i === 1 ? "fuchsia" : "purple"} variant="stat" className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</p>
                  <p className="text-white font-bold text-[11px] sm:text-xs md:text-sm mb-0.5 sm:mb-1">{stat.label}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">{stat.sublabel}</p>
                </HolographicCard>
              ))}
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* FAQ Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <StatusBadge label="GOT QUESTIONS?" color="cyan" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6">Frequently Asked Questions</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">The answers to what most recruiters want to know before getting started</p>
            </div>
            <FAQSection faqs={recruiterGeneralFAQs} color="cyan" />
            
            {/* Last Updated */}
            <div className="mt-8 text-center">
              <LastUpdated date="2026-03-08" className="inline-block" />
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Final CTA */}
          <section className="my-10 sm:my-16 md:my-20">
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white">
                Ready to <span className="gradient-text">turn dead roles into revenue?</span>
              </h3>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
                Thousands of recruiters are already earning an average of $7,000 per placement through RecXchange. Most active members make 2-5 placements per quarter. <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">View pricing</Link>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
                <GlowButton 
                  variant="primary" 
                  size="lg" 
                  href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                >
                  Get Started Now
                </GlowButton>
                <GlowButton 
                  variant="secondary" 
                  size="lg" 
                  onClick={scrollToTop}
                >
                  Know Your Path?
                </GlowButton>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-5 sm:mt-6 md:mt-8">Entry tier $1/month. Lite $99/month. Pro $249/month.</p>
            </HolographicCard>
          </section>

          {/* Quick Action: Send Roles */}
          <section className="mt-10 sm:mt-12 md:mt-16">
            <HolographicCard color="cyan" variant="content" className="text-center">
              <StatusBadge label="TRY IT NOW" color="cyan" size="sm" />
              <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-4 leading-snug">Curious what roles are live right now?</h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-3xl mx-auto">
                Tell us your specialisms and we'll send you 3 real roles that recruiters are actively working on, so you can see what's out there.
              </p>
              <div className="flex justify-center">
                <SendRolesForm className="" />
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>
    </main>
  );
}