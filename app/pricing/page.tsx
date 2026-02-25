"use client";
import React, { useState } from "react";
import { Check, HelpCircle } from "lucide-react";

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
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Pricing & <span className="gradient-text">Tiers</span></h1>
        <p className="text-gray-400 text-lg">Pick a tier. Make placements. One placement pays for the year.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`glass-card p-8 rounded-2xl flex flex-col relative overflow-visible ${
              tier.highlight
                ? 'border-fuchsia-500/50 ring-1 ring-fuchsia-500/50 shadow-[0_0_30px_rgba(255,0,255,0.1)]'
                : ''
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-[9px] font-bold py-2 px-3 rounded-full uppercase tracking-widest shadow-lg z-10 rotate-12">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">{tier.price}</span>
              {tier.price !== "Custom" && <span className="text-gray-500">/mo</span>}
            </div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{tier.description}</p>

            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-xs text-gray-300 items-start">
                  <Check size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="flex-1">{feature.text}</span>
                  {feature.hasTooltip && (
                    <button
                      onClick={scrollToTokenExplainer}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                      aria-label="What are tokens?"
                    >
                      <HelpCircle size={14} />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-all ${
              tier.highlight
                ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                : 'bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10'
            }`}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Token Explainer */}
      <section id="token-explainer" className="max-w-4xl mx-auto mt-20 p-10 glass-card rounded-3xl border-cyan-400/10 scroll-mt-8">
        <h2 className="text-2xl font-bold mb-4">What are <span className="gradient-text">tokens?</span></h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Tokens let you participate in the RecXchange community. Use them to post roles or submit candidates to collaborative opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.02]">
            <div className="text-cyan-400 font-bold text-lg mb-2">1 Token =</div>
            <div className="text-sm text-gray-400">Post 1 role to the community</div>
          </div>
          <div className="p-6 rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/[0.02]">
            <div className="text-fuchsia-400 font-bold text-lg mb-2">1 Token =</div>
            <div className="text-sm text-gray-400">Submit 1 candidate to a collaborative role</div>
          </div>
        </div>
      </section>

      {/* Split Fee Section */}
      <section className="max-w-4xl mx-auto mt-16 p-12 glass-card rounded-3xl text-center border-cyan-400/10">
        <h2 className="text-3xl font-bold mb-6">Split Fees & <span className="gradient-text">Commissions</span></h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Partner with recruiters. Set your split. Contracts auto-generated. Both parties protected.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-cyan-400 font-bold text-2xl mb-1">Standard</div>
            <div className="text-sm text-gray-500">50/50 Split</div>
          </div>
          <div>
            <div className="text-fuchsia-400 font-bold text-2xl mb-1">RecX Direct</div>
            <div className="text-sm text-gray-500">Up to 70% Split</div>
          </div>
          <div>
            <div className="text-white font-bold text-2xl mb-1">Protection</div>
            <div className="text-sm text-gray-500">Split fee contracts protect both parties</div>
          </div>
        </div>
      </section>
    </div>
  );
}
