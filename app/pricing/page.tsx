'use client';

import React from "react";
import { Check, HelpCircle } from "lucide-react";
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import RecXDirectForm from '@/components/recx-direct-form';
import FAQSection from '@/components/FAQSection';
import LastUpdated from '@/components/LastUpdated';
import { pricingFAQs } from '@/data/faqs/recruiter-faqs';
import { internalLinks } from '@/lib/internal-links';
import Link from 'next/link';

const tiers = [
  {
    name: "RecX Entry",
    price: "$1",
    description: "Test the platform. Make a few placements.",
    features: [
      { text: "5 tokens/month (5 role posts or 5 candidate submissions)", hasTooltip: true },
      { text: "Store 20 candidates in your database", hasTooltip: false },
      { text: "Store 20 client profiles in your CRM", hasTooltip: false },
      { text: "Post 20 private roles", hasTooltip: false },
      { text: "RecX Direct access 30 days after role posted", hasTooltip: false },
      { text: "Partner on collaborative roles", hasTooltip: false },
      { text: "Search 270M candidates once per day", hasTooltip: false },
      { text: "Community access", hasTooltip: false },
      { text: "Marketplace access", hasTooltip: false }
    ],
    buttonText: "Start with Entry",
    highlight: false,
    color: "cyan" as const,
  },
  {
    name: "RecX Lite",
    price: "$99",
    description: "For serious recruiters making placements.",
    features: [
      { text: "150 tokens/month (150 roles or 150 candidate submissions)", hasTooltip: true },
      { text: "Store 500 candidates in your database", hasTooltip: false },
      { text: "Store 500 client profiles in your CRM", hasTooltip: false },
      { text: "Post 500 private roles", hasTooltip: false },
      { text: "RecX Direct access 7 days after role posted", hasTooltip: false },
      { text: "AI shortlisting for all candidates", hasTooltip: false },
      { text: "Search 270M candidates 10 times per day", hasTooltip: false },
      { text: "ROI: 1 placement pays for 12+ months", hasTooltip: false }
    ],
    buttonText: "Choose Lite",
    highlight: true,
    color: "fuchsia" as const,
  },
  {
    name: "RecX Pro",
    price: "$250",
    description: "Lead the market. Get instant access.",
    features: [
      { text: "400 tokens/month (400 roles or 400 candidate submissions)", hasTooltip: true },
      { text: "Store 10,000 candidates in your database", hasTooltip: false },
      { text: "Store 10,000 client profiles in your CRM", hasTooltip: false },
      { text: "Post 10,000 private roles", hasTooltip: false },
      { text: "Instant RecX Direct access (roles appear immediately)", hasTooltip: false },
      { text: "First access to new features", hasTooltip: false },
      { text: "Search 270M candidates 25 times per day", hasTooltip: false },
      { text: "ROI: 1 placement pays for 5+ months", hasTooltip: false }
    ],
    buttonText: "Choose Pro",
    highlight: false,
    color: "purple" as const,
  },
];

export default function PricingPage() {
  const scrollToTokenExplainer = () => {
    const element = document.getElementById('token-explainer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 py-10 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="TRANSPARENT PRICING" color="cyan" />
            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 mt-6 text-white" 
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Pricing & <span className="gradient-text">Tiers</span>
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg px-2 mt-6">Pick a tier. Make placements. One placement pays for the year. Learn more about <Link href={internalLinks.whyRecXchange} className="text-cyan-400 hover:text-cyan-300 underline">why recruiters choose RecXchange</Link> or see our <Link href={internalLinks.collaboration} className="text-fuchsia-400 hover:text-fuchsia-300 underline">collaborative workflow</Link>.</p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-16 md:mb-20">
            {tiers.map((tier, index) => (
              <div key={index} className="relative">
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <StatusBadge label="MOST POPULAR" color="fuchsia" size="sm" />
                  </div>
                )}
                <HolographicCard 
                  color={tier.color} 
                  variant="content"
                  glowIntensity={tier.highlight ? "high" : "medium"}
                  className="h-full flex flex-col"
                >
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-white">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-gray-400 text-xs sm:text-sm">/mo</span>}
                  </div>
                  <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm mb-5 sm:mb-6 md:mb-8 leading-relaxed">{tier.description}</p>

                  <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-5 sm:mb-6 md:mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 sm:gap-3 text-[10px] sm:text-[11px] md:text-xs text-gray-300 items-start">
                        <Check size={12} className="sm:w-[14px] sm:h-[14px] text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="flex-1">{feature.text}</span>
                        {feature.hasTooltip && (
                          <button
                            onClick={scrollToTokenExplainer}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                            aria-label="What are tokens?"
                          >
                            <HelpCircle size={12} className="sm:w-[14px] sm:h-[14px]" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  <GlowButton 
                    variant={tier.highlight ? "primary" : "secondary"} 
                    size="md"
                    className="w-full"
                  >
                    {tier.buttonText}
                  </GlowButton>
                </HolographicCard>
              </div>
            ))}
          </div>

          <NeonDivider width="w-full" color="mixed" />

          {/* RecX Direct Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <HolographicCard color="fuchsia" variant="content" glowIntensity="high" className="text-center">
              <StatusBadge label="RecX DIRECT" color="fuchsia" />
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-4">Want to earn today?</h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                Get a detailed explainer of how the fee pool works, current pool size, and how to earn up to 70% on placements.
              </p>
              <div className="flex justify-center">
                <RecXDirectForm />
              </div>
            </HolographicCard>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* FAQ Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <StatusBadge label="PRICING FAQ" color="purple" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6">Common Pricing Questions</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">Everything you need to know about RecXchange membership costs</p>
            </div>
            <FAQSection faqs={pricingFAQs} color="purple" />
            
            {/* Last Updated */}
            <div className="mt-8 text-center">
              <LastUpdated date="2026-03-08" className="inline-block" />
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Token Explainer */}
          <section id="token-explainer" className="my-10 sm:my-16 md:my-20 scroll-mt-8">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2.5 sm:mb-3 md:mb-4 text-white">What are <span className="gradient-text">tokens?</span></h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed">
                Tokens let you participate in the RecXchange community with 15,000+ recruiters. Use them to post roles or submit candidates to collaborative opportunities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <HolographicCard color="cyan" variant="feature" showStatusIndicator={true}>
                  <div className="text-cyan-300 font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">1 Token =</div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Post 1 role to the community</div>
                </HolographicCard>
                <HolographicCard color="fuchsia" variant="feature" showStatusIndicator={true}>
                  <div className="text-fuchsia-300 font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">1 Token =</div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Submit 1 candidate to a collaborative role</div>
                </HolographicCard>
              </div>
            </HolographicCard>
          </section>

          {/* Earnings Section */}
          <section className="mt-10 sm:mt-12 md:mt-16">
            <HolographicCard color="purple" variant="content" className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">Average Recruiter <span className="gradient-text">Earnings</span></h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2">
                Partner with recruiters from the network of 15,000+. Set your split. Contracts auto-generated. Both parties protected. Learn about <Link href={internalLinks.collaboration} className="text-purple-400 hover:text-purple-300 underline">how collaboration works</Link>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                <div>
                  <div className="text-cyan-400 font-bold text-lg sm:text-xl md:text-2xl mb-1">Xchange</div>
                  <div className="text-xs sm:text-sm text-gray-400">Collaborative splits</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">50/50, 60/40, or 70/30</div>
                </div>
                <div>
                  <div className="text-fuchsia-400 font-bold text-lg sm:text-xl md:text-2xl mb-1">RecX Direct</div>
                  <div className="text-xs sm:text-sm text-gray-400">Up to 70% earnings</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">Average $7k per placement</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-1">No Fees</div>
                  <div className="text-xs sm:text-sm text-gray-400">0% Platform Fee</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">Keep 100% of your split</div>
                </div>
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>
    </main>
  );
}