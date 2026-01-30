"use client";
import React from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "RecX Entry",
    price: "$1",
    description: "Start lean. Grow smart.",
    features: ["5 RecX tokens/month", "ATS for 20 candidate profiles", "Talent pools", "CRM for 20 client profiles", "20 private roles", "30 day RecX Direct access", "Xchange Engine", "1 AI search/day", "Community", "Marketplace"],
    buttonText: "Choose Entry",
    highlight: false,
  },
  {
    name: "RecX Lite",
    price: "$99",
    description: "Serious recruiters don't wait.",
    features: ["150 RecX tokens/month", "ATS for 500 candidate profiles", "CRM for 500 client profiles", "500 Private Roles", "7 day RecX Direct access", "AI Wall access", "RecX Social Value Access", "10 AI searches/day", "AI sourcing (270M profiles)"],
    buttonText: "Choose Lite",
    highlight: true, // Most Popular
  },
  {
    name: "RecX Pro",
    price: "$250",
    description: "Lead the market, don't chase it.",
    features: ["400 RecX tokens/month", "ATS for 10,000 candidate profiles", "CRM for 10,000 client profiles", "10,000 private roles", "Immediate RecX Direct access", "First access to new features", "AI Wall access", "25 AI searches/day"],
    buttonText: "Choose Pro",
    highlight: false,
  },
  {
    name: "RecX Team",
    price: "Custom",
    description: "Build a powerhouse team.",
    features: ["Everything in Pro for teams of 5+", "Shared Tokens & ATS", "Shared CRM for Client Profiles", "Private Roles for your Team", "Up to 70% split on RecXDirect"],
    buttonText: "Talk to Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Price & <span className="gradient-text">Tiers</span></h1>
        <p className="text-gray-400 text-lg">Choose the engine that fits your scale.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => (
          <div 
            key={index}
            className={`glass-card p-8 rounded-2xl flex flex-col ${tier.highlight ? 'border-[#c71df1] ring-1 ring-[#c71df1]' : ''}`}
          >
            {tier.highlight && (
              <span className="bg-gradient-to-r from-[#312fd7] to-[#c71df1] text-xs font-bold py-1 px-3 rounded-full self-start mb-4 uppercase tracking-widest">
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
                <li key={i} className="flex gap-3 text-xs text-gray-300">
                  <Check size={14} className="text-[#c71df1] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-all ${
              tier.highlight 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-white/10 text-white hover:bg-white/20'
            }`}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Split Fee Section */}
      <section className="max-w-4xl mx-auto mt-32 p-12 glass-card rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Split Fee <span className="gradient-text">& Commissions</span></h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          RecXchange is built on fair collaboration. Whether you are providing the candidate or the role, 
          our engine ensures transparent splits and automated protection for every deal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-[#312fd7] font-bold text-2xl mb-1">Standard</div>
            <div className="text-sm text-gray-500">50/50 Split</div>
          </div>
          <div>
            <div className="text-[#c71df1] font-bold text-2xl mb-1">RecXDirect</div>
            <div className="text-sm text-gray-500">Up to 70% Split</div>
          </div>
          <div>
            <div className="text-white font-bold text-2xl mb-1">Protection</div>
            <div className="text-sm text-gray-500">Guaranteed Escrow</div>
          </div>
        </div>
      </section>
    </div>
  );
}
