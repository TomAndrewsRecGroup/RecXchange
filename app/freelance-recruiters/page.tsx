'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import FAQSection from '@/components/FAQSection';
import LastUpdated from '@/components/LastUpdated';
import { internalLinks } from '@/lib/internal-links';

const freelanceFAQs = [
  {
    question: "Can I use RecXchange as a freelance recruiter?",
    answer: "Yes. RecXchange is built for independent and freelance recruiters. You keep your own clients and candidates, set your own schedule, and use the platform to access thousands of live roles and sourcing partners. There are no desk fees, no agency overheads, and no lock-in contracts. You pay from $1/month and earn split fees on every placement you collaborate on."
  },
  {
    question: "How do split fees work for freelance recruiters on RecXchange?",
    answer: "When you collaborate on a placement through RecXchange, the fee is split between the recruiter who holds the role and the recruiter who supplies the candidate. Splits are typically 50/50 or 60/40, and on RecX Direct roles the candidate-holding recruiter can earn up to 70% of the total fee. Every split is covered by an automatically generated, legally binding agreement before any candidate data is shared."
  },
  {
    question: "Do I need an agency or company to join RecXchange?",
    answer: "No. Solo freelance recruiters, independent consultants, and one-person recruitment businesses all use RecXchange. You do not need a company registration, a team, or an office. You just need recruitment experience, a willingness to collaborate, and a membership starting from $1/month."
  }
];

export default function FreelanceRecruitersPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Hero */}
          <header className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatusBadge label="FREELANCE RECRUITERS" color="cyan" />
              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
                style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
                Your network. Your rules. <br className="hidden sm:block" />
                <span className="sm:inline">Better splits.</span>
              </h1>
              <NeonDivider width="w-40" color="mixed" />
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 mt-6">
                RecXchange gives freelance recruiters a full collaboration network with no desk fees, no overheads, and fee splits up to 70%. Keep your clients, work your own roles, and plug into 15,000+ recruiters when you need a partner. See our <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">simple pricing</Link> or find out <Link href={internalLinks.whyRecXchange} className="text-fuchsia-400 hover:text-fuchsia-300 underline">why thousands of recruiters already use us</Link>.
              </p>
            </motion.div>
          </header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is freelance recruitment collaboration?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Freelance recruitment collaboration is when independent recruiters partner on placements without working for the same agency. One recruiter holds the role, the other supplies the candidate, and they split the placement fee between them. RecXchange makes this simple by providing AI-powered matching, automated legally binding fee agreements, and built-in deal protection. You stay independent, keep your own clients, and earn on placements you could never have made alone.
            </p>
          </section>

          {/* Three Benefit Cards */}
          <section className="mb-10 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-14 px-2">
              <StatusBadge label="WHY FREELANCERS CHOOSE US" color="purple" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6 tracking-tight leading-tight">
                Built for recruiters who work for themselves
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
                No agency politics. No revenue targets set by someone else. Just a platform that lets you earn more from every placement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {/* Card 1 */}
              <HolographicCard color="cyan" variant="content">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-cyan-400">
                      <Check size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">No desk fees, no overheads</h3>
                    <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-6">
                      Traditional agencies charge desk fees, take a cut of your billings, and tie you into contracts. On RecXchange you pay from $1/month and split fees directly with the recruiter on the other side. No middleman, no hidden costs.
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      {[
                        "No desk fees or monthly revenue targets",
                        "No lock-in contracts or notice periods",
                        "Your earnings go to you, not an agency"
                      ].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs leading-snug flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HolographicCard>

              {/* Card 2 */}
              <HolographicCard color="fuchsia" variant="content">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-fuchsia-400">
                      <Check size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Work your own roles, plus the network</h3>
                    <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-6">
                      You keep every client relationship you have. RecXchange just gives you access to thousands of extra roles and candidates when you need them. Think of it as a collaboration layer on top of your existing business.
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      {[
                        "Your clients stay yours. Always.",
                        "Access 15,000+ recruiters for sourcing help",
                        "Post your roles or browse the network's live roles"
                      ].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-fuchsia-400 rounded-full flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs leading-snug flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HolographicCard>

              {/* Card 3 */}
              <HolographicCard color="purple" variant="content">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-purple-400">
                      <Check size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Earn up to 70% on RecX Direct</h3>
                    <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-6">
                      RecX Direct roles give freelance recruiters higher splits than any agency would offer. Supply the candidate, earn up to 70% of the total placement fee. No negotiation needed, the split is set before you start.
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      {[
                        "Up to 70% splits on RecX Direct roles",
                        "Standard splits from 50/50 to 60/40",
                        "Legally binding agreements on every deal"
                      ].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs leading-snug flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* How It Works */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-14 px-2">
              <StatusBadge label="HOW IT WORKS" color="cyan" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6 tracking-tight leading-tight">
                How it works for freelance recruiters
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
                Four steps from sign-up to your first split fee placement. Most freelancers are matched within days.
              </p>
            </div>

            <HolographicCard color="cyan" variant="content">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  {
                    step: "01",
                    title: "Sign up and set your specialisms",
                    desc: "Create your profile, pick your sectors and locations, and tell us whether you have roles, candidates, or both. Takes about two minutes."
                  },
                  {
                    step: "02",
                    title: "Post a role or browse the network",
                    desc: "Got a role that needs candidates? Post it. Got a strong candidate without a role? Browse live roles from 15,000+ recruiters and find the right fit."
                  },
                  {
                    step: "03",
                    title: "Match, agree terms, collaborate",
                    desc: "Our AI matches your roles and candidates to the best partners. You agree the fee split, a legally binding agreement is generated automatically, and you start working together."
                  },
                  {
                    step: "04",
                    title: "Make the placement, split the fee",
                    desc: "When the candidate starts, the fee is split according to your agreement. Deal protection ensures both sides are paid. Simple."
                  }
                ].map((item, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-black gradient-text mb-3 sm:mb-4">{item.step}</div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </HolographicCard>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Stats Row */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {[
                { value: "$7,000", label: "Avg Placement Fee", sublabel: "What freelance recruiters typically earn per split" },
                { value: "15,000+", label: "Recruiters on the Network", sublabel: "Independent and agency recruiters collaborating daily" },
                { value: "From $1/mo", label: "Entry Membership", sublabel: "No desk fees. No lock-in. Cancel any time." }
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6">Freelance Recruiter FAQs</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">The questions freelance recruiters ask before signing up</p>
            </div>
            <FAQSection faqs={freelanceFAQs} color="cyan" showBadge={false} />

            {/* Last Updated */}
            <div className="mt-8 text-center">
              <LastUpdated date="2026-04-02" className="inline-block" />
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Final CTA */}
          <section className="my-10 sm:my-16 md:my-20">
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white">
                Ready to <span className="gradient-text">earn more as a freelancer?</span>
              </h3>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
                Thousands of independent recruiters are already splitting fees and making placements they could never have made alone. No desk fees, no agency overhead. Just you, your network, and a platform that works. <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">View pricing</Link>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
                <GlowButton
                  variant="primary"
                  size="lg"
                  href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                >
                  Join Free as a Freelancer
                </GlowButton>
                <GlowButton
                  variant="secondary"
                  size="lg"
                  href={internalLinks.recruiter}
                >
                  Explore the Platform
                </GlowButton>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-5 sm:mt-6 md:mt-8">Entry tier $1/month. Lite $99/month. Pro $249/month.</p>
            </HolographicCard>
          </section>

        </div>
      </div>
    </main>
  );
}
