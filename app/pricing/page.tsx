'use client';

import React from "react";
import { Check, HelpCircle } from "lucide-react";
import type { Metadata } from 'next';
import RecXDirectForm from '@/components/recx-direct-form';

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
  },
  {
    name: "RecX Teams",
    price: "Custom",
    description: "For agencies with 5+ recruiters.",
    features: [
      { text: "Everything in Pro for your entire team", hasTooltip: false },
      { text: "Shared token pool across team members", hasTooltip: true },
      { text: "Shared candidate database (ATS)", hasTooltip: false },
      { text: "Shared client CRM", hasTooltip: false },
      { text: "Private roles visible to your team only", hasTooltip: false },
      { text: "Up to 70% split on RecX Direct placements", hasTooltip: false }
    ],
    buttonText: "Talk to Sales",
    highlight: false,
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
    <div className="py-10 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Pricing & <span className="gradient-text">Tiers</span></h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg px-2">Pick a tier. Make placements. One placement pays for the year.</p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-16 md:mb-20">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`glass-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col relative overflow-visible ${
              tier.highlight
                ? 'border-fuchsia-500/50 ring-1 ring-fuchsia-500/50 shadow-[0_0_30px_rgba(255,0,255,0.1)]'
                : ''
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-[8px] sm:text-[9px] font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full uppercase tracking-[0.12em] sm:tracking-widest shadow-lg z-10 rotate-12">
                Most Popular
              </span>
            )}
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{tier.price}</span>
              {tier.price !== "Custom" && <span className="text-gray-500 text-xs sm:text-sm">/mo</span>}
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

            <button className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm transition-all ${
              tier.highlight
                ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                : 'bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10'
            }`}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Quick Action: Explain RecX Direct */}
      <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16 md:mb-20 glass-card rounded-xl sm:rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] p-5 sm:p-8 md:p-10 lg:p-14 border-fuchsia-400/10 text-center">
        <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-fuchsia-400 mb-3 sm:mb-4 md:mb-6">
          RecX Direct
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Want to earn today?</h2>
        <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
          Get a detailed explainer of how the fee pool works, current pool size, and how to earn up to 70% on placements.
        </p>
        <div className="flex justify-center">
          <RecXDirectForm />
        </div>
      </section>

      {/* AI-Optimized Pricing Questions */}
      <section className="max-w-[1200px] mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mb-10 sm:mb-16 md:mb-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Common Pricing Questions</h2>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">Everything you need to know about RecXchange membership costs</p>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-cyan-400/10">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Which tier should I choose?</h3>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
            It depends on your activity level. Recruiters earn an average of <strong className="text-white">$7,000 per placement</strong>:
          </p>
          <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm md:text-base text-gray-400">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Entry ($1/month):</strong> Testing the platform or making 1-2 placements per year</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Lite ($99/month):</strong> Making 1-2 placements per quarter. One placement pays for the entire year</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Pro ($250/month):</strong> Making 3+ placements per quarter with instant RecX Direct access</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-cyan-400/10">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Are there any platform fees on placements?</h3>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed">
            <strong className="text-white">No platform fees.</strong> RecXchange only charges the monthly membership fee ($1, $99, or $250 depending on tier). Recruiters earn an average of $7,000 per placement and keep 100% of their agreed split.
          </p>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-cyan-400/10">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">Can I switch between tiers?</h3>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed">
            Yes, you can upgrade or downgrade at any time. When you upgrade, your unused tokens roll over for 30 days. If you're on Lite ($99/month) and run out of the 150 monthly tokens, you can upgrade to Pro ($250/month) mid-month to get 400 tokens immediately, plus retain any unused tokens from Lite.
          </p>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-cyan-400/10">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">What's the actual ROI on RecXchange membership?</h3>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
            Recruiters earn an average of <strong className="text-white">$7,000 per placement</strong>:
          </p>
          <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm md:text-base text-gray-400">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Lite ($99/month):</strong> One placement covers 70+ months of membership</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Pro ($250/month):</strong> One placement covers 28+ months of membership</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Most active recruiters make 2-5 placements per quarter, earning $14,000-$35,000 quarterly</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Token Explainer */}
      <section id="token-explainer" className="max-w-[1200px] mx-auto mt-10 sm:mt-16 md:mt-20 p-5 sm:p-8 md:p-10 glass-card rounded-xl sm:rounded-2xl md:rounded-3xl border-cyan-400/10 scroll-mt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2.5 sm:mb-3 md:mb-4">What are <span className="gradient-text">tokens?</span></h2>
        <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed">
          Tokens let you participate in the RecXchange community with 15,000+ recruiters. Use them to post roles or submit candidates to collaborative opportunities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.02]">
            <div className="text-cyan-400 font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">1 Token =</div>
            <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Post 1 role to the community</div>
          </div>
          <div className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/[0.02]">
            <div className="text-fuchsia-400 font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">1 Token =</div>
            <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Submit 1 candidate to a collaborative role</div>
          </div>
        </div>
      </section>

      {/* Split Fee Section */}
      <section className="max-w-[1200px] mx-auto mt-10 sm:mt-12 md:mt-16 p-6 sm:p-10 md:p-12 glass-card rounded-xl sm:rounded-2xl md:rounded-3xl text-center border-cyan-400/10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">Average Recruiter <span className="gradient-text">Earnings</span></h2>
        <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2">
          Partner with recruiters from the network of 15,000+. Set your split. Contracts auto-generated. Both parties protected.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          <div>
            <div className="text-cyan-400 font-bold text-lg sm:text-xl md:text-2xl mb-1">Xchange</div>
            <div className="text-xs sm:text-sm text-gray-500">Collaborative splits</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2">50/50, 60/40, or 70/30</div>
          </div>
          <div>
            <div className="text-fuchsia-400 font-bold text-lg sm:text-xl md:text-2xl mb-1">RecX Direct</div>
            <div className="text-xs sm:text-sm text-gray-500">Up to 70% earnings</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2">Average $7k per placement</div>
          </div>
          <div>
            <div className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-1">No Fees</div>
            <div className="text-xs sm:text-sm text-gray-500">0% Platform Fee</div>
            <div className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2">Keep 100% of your split</div>
          </div>
        </div>
      </section>
    </div>
  );
}
