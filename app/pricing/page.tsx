'use client';

import React from "react";
import { motion } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import RecXDirectForm from '@/components/recx-direct-form';
import FAQSection from '@/components/FAQSection';
import LastUpdated from '@/components/LastUpdated';
import { pricingFAQs } from '@/data/faqs/recruiter-faqs';
import Link from 'next/link';

const tiers = [
  {
    name: "Entry",
    price: "1",
    period: "/month",
    description: "For recruiters trying the platform",
    tokens: "5 tokens/month",
    recxDirectAccess: "30-day delay",
    features: [
      "Up to 30 CVs stored",
      "5 tokens per month",
      "30-day delay on RecX Direct roles",
      "Basic search & match",
      "Standard support",
    ],
    color: "cyan" as const,
    bulletColor: "bg-cyan-400",
    highlighted: false,
  },
  {
    name: "Lite",
    price: "99",
    period: "/month",
    description: "For growing independent recruiters",
    tokens: "150 tokens/month",
    recxDirectAccess: "7-day delay",
    features: [
      "Up to 300 CVs stored",
      "150 tokens per month",
      "7-day delay on RecX Direct roles",
      "AI-powered candidate search",
      "Advanced matching algorithms",
      "Email & in-app support",
    ],
    color: "purple" as const,
    bulletColor: "bg-purple-400",
    highlighted: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Pro",
    price: "249",
    period: "/month",
    description: "For power recruiters & boutique firms",
    tokens: "400 tokens/month",
    recxDirectAccess: "Instant access",
    features: [
      "Huge CV storage allowance",
      "400 tokens per month",
      "Instant access to RecX Direct roles",
      "All AI & search features",
      "Priority matching",
      "Dedicated account manager",
      "Priority support",
    ],
    color: "fuchsia" as const,
    bulletColor: "bg-fuchsia-400",
    highlighted: false,
  },
];

const tokenPacks = [
  { tokens: 10,  price: 10,  color: "cyan" as const,    priceClass: "text-cyan-300" },
  { tokens: 50,  price: 40,  color: "purple" as const,  priceClass: "text-purple-300" },
  { tokens: 100, price: 70,  color: "fuchsia" as const, priceClass: "text-fuchsia-300" },
  { tokens: 500, price: 300, color: "emerald" as const, priceClass: "text-emerald-300" },
];

export default function PricingPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 md:mb-12 mt-6"
          >
            <StatusBadge label="PRICING" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6">
              Pay Monthly, <span className="text-white">Split Fees Forever</span>
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              No placement fees. No hidden charges. Just monthly membership and 100% of your split fee.
            </p>
          </motion.header>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-16">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <HolographicCard
                  color={tier.color}
                  variant={tier.highlighted ? "feature" : "content"}
                  glowIntensity={tier.highlighted ? "high" : "low"}
                  className="h-full flex flex-col"
                >
                  {tier.badge && (
                    <div className="mb-3 sm:mb-4">
                      <StatusBadge label={tier.badge} color={tier.color} />
                    </div>
                  )}

                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {tier.name}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{tier.description}</p>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                        ${tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-gray-400 text-xs sm:text-sm">{tier.period}</span>
                      )}
                    </div>

                    <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tier.bulletColor}`} />
                        <span className="text-gray-300">{tier.tokens}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tier.bulletColor}`} />
                        <span className="text-gray-300">RecX Direct: {tier.recxDirectAccess}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${tier.bulletColor}`} aria-hidden="true" />
                        <span className="text-gray-300 text-xs sm:text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <GlowButton
                    variant={tier.highlighted ? "primary" : "secondary"}
                    size="md"
                    href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                    className="w-full"
                  >
                    Get Started
                  </GlowButton>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          <NeonDivider width="w-full" color="mixed" />

          {/* Token Explainer */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10 sm:my-12 md:my-16"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">
                What Are Tokens?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
                Tokens are your proof of intent. They unlock contact details and let you submit candidates to live roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <HolographicCard color="cyan" variant="feature" showStatusIndicator={true}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Post a Role
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
                  Use 1 token to post a role to the Xchange network and let 15,000+ recruiters bring you candidates.
                </p>
                <div className="text-cyan-300 text-xs sm:text-sm font-bold">1 Token = 1 Role Posted</div>
              </HolographicCard>

              <HolographicCard color="fuchsia" variant="feature" showStatusIndicator={true}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Submit a Candidate
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
                  Use 1 token to submit your candidate to a live role. If they get hired, you earn your split of the fee.
                </p>
                <div className="text-fuchsia-300 text-xs sm:text-sm font-bold">1 Token = 1 Candidate Submitted</div>
              </HolographicCard>

              <HolographicCard color="purple" variant="feature" showStatusIndicator={true}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Unlock Contact Details
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
                  Use 1 token to reveal a candidate&apos;s full contact details from the 270M profile database.
                </p>
                <div className="text-purple-300 text-xs sm:text-sm font-bold">1 Token = 1 Contact Unlocked</div>
              </HolographicCard>
            </div>

            {/* Token Packs */}
            <div className="mt-8 sm:mt-10">
              <div className="text-center mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Need More Tokens?</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Top up anytime inside the platform. No subscription change needed.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {tokenPacks.map((pack) => (
                  <HolographicCard key={pack.tokens} color={pack.color} variant="stat" className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-white mb-1">{pack.tokens}</div>
                    <div className="text-gray-400 text-[10px] sm:text-xs mb-2">tokens</div>
                    <div className={`text-lg sm:text-xl font-bold text-white`}>${pack.price}</div>
                    <div className={`text-[10px] sm:text-xs mt-1 ${pack.priceClass}`}>${(pack.price / pack.tokens).toFixed(2)} per token</div>
                  </HolographicCard>
                ))}
              </div>
            </div>
          </motion.section>

          <NeonDivider width="w-full" color="mixed" />

          {/* RecX Direct Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10 sm:my-12 md:my-16"
          >
            <div className="text-center mb-6 sm:mb-8">
              <StatusBadge label="RecX DIRECT" color="emerald" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-4">
                Earn 70% on RecX Direct Placements
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
                End clients post roles. Recruiters compete to fill them. Winners earn up to 70% of the placement fee.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              <HolographicCard color="purple" variant="content" className="h-full">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  How RecX Direct Works
                </h3>
                <ol className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">1</span>
                    <span>End client posts a role to RecX Direct</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">2</span>
                    <span>15,000+ recruiters see the role</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">3</span>
                    <span>Recruiters submit their best candidates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">4</span>
                    <span>Your dedicated Account Manager handles all Recruiter and Client communication</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">5</span>
                    <span>When a placement is made, the recruiter earns up to 70% of the total fee (all fees shown are Recruiters cut)</span>
                  </li>
                </ol>
              </HolographicCard>

              <HolographicCard color="emerald" variant="feature" glowIntensity="high" showStatusIndicator={true} className="h-full">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Access Tiers & Timing
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-white font-bold text-xs sm:text-sm">Pro Members</span>
                      <StatusBadge label="INSTANT" color="emerald" />
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs">Get access to RecX Direct roles the moment they&apos;re posted</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-white font-bold text-xs sm:text-sm">Lite Members</span>
                      <StatusBadge label="7 DAYS" color="purple" />
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs">Access RecX Direct roles 7 days after posting</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-white font-bold text-xs sm:text-sm">Entry Members</span>
                      <StatusBadge label="30 DAYS" color="cyan" />
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs">Access RecX Direct roles 30 days after posting (if still open)</p>
                  </div>
                </div>
              </HolographicCard>
            </div>

            {/* Learn More CTA — triggers RecX Direct email explainer modal */}
            <div className="mt-6 sm:mt-8 text-center">
              <RecXDirectForm />
            </div>
          </motion.section>

          <NeonDivider width="w-full" color="mixed" />

          {/* FAQ Section */}
          <FAQSection faqs={pricingFAQs} />

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12 md:mt-16"
          >
            <HolographicCard color="fuchsia" variant="content" glowIntensity="high" className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">
                Ready to Start Splitting Fees?
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 px-2">
                Join 15,000+ recruiters already on the platform. From $1/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <GlowButton variant="primary" size="lg" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC">
                  Get Started
                </GlowButton>
                <GlowButton variant="ghost" size="lg" href="/why-recxchange">
                  Why RecXchange
                </GlowButton>
              </div>
            </HolographicCard>
          </motion.section>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <LastUpdated date="2026-03-11" />
          </div>
        </div>
      </div>
    </main>
  );
}
