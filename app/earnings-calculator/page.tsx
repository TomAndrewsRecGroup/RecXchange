'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import LastUpdated from '@/components/LastUpdated';
import { internalLinks } from '@/lib/internal-links';

const membershipTiers = [
  { label: 'Entry ($1/mo)', monthlyCost: 1 },
  { label: 'Lite ($99/mo)', monthlyCost: 99 },
  { label: 'Pro ($249/mo)', monthlyCost: 249 },
];

const splitOptions = [
  { label: '50%', value: 0.5 },
  { label: '60%', value: 0.6 },
  { label: '70%', value: 0.7 },
];

export default function EarningsCalculatorPage() {
  const [placementFee, setPlacementFee] = useState(15000);
  const [splitIndex, setSplitIndex] = useState(0);
  const [placementsPerQuarter, setPlacementsPerQuarter] = useState(2);
  const [tierIndex, setTierIndex] = useState(0);

  const splitPercentage = splitOptions[splitIndex].value;
  const annualMembershipCost = membershipTiers[tierIndex].monthlyCost * 12;

  const perPlacement = placementFee * splitPercentage;
  const quarterlyEarnings = perPlacement * placementsPerQuarter;
  const annualEarnings = quarterlyEarnings * 4 - annualMembershipCost;
  const roi = annualMembershipCost > 0
    ? ((quarterlyEarnings * 4) / annualMembershipCost) * 100
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    if (value >= 10000) {
      return `${Math.round(value / 100) * 100}%`;
    }
    return `${Math.round(value)}%`;
  };

  const inputClassName = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 transition-all";
  const labelClassName = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2";

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
              <StatusBadge label="EARNINGS CALCULATOR" color="cyan" />
              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
                style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
                How much could you earn?
              </h1>
              <NeonDivider width="w-40" color="mixed" />
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 mt-6">
                See what split fee recruitment could add to your annual billings. Adjust the inputs below and watch your projected earnings update in real time.
              </p>
            </motion.div>
          </header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What do recruiters earn on RecXchange?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Recruiters on RecXchange earn a share of the placement fee every time they collaborate on a successful hire. The average placement earning across the network is $7,000, with most active members completing 2 to 5 placements per quarter. Splits typically range from 50/50 to 70/30, and RecXchange takes zero commission from your fees. Your membership covers platform access, and every penny of the placement fee goes to you and your partner.
            </p>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Calculator Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-14 px-2">
              <StatusBadge label="YOUR NUMBERS" color="purple" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6 tracking-tight leading-tight">
                Calculate your split fee earnings
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
                Change any input and see your projected earnings instantly. No sign-up required.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Inputs */}
              <HolographicCard color="cyan" variant="content">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-6">Your inputs</h3>
                <div className="space-y-6">
                  {/* Average Placement Fee */}
                  <div>
                    <label htmlFor="placementFee" className={labelClassName}>
                      Average placement fee
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        id="placementFee"
                        type="number"
                        min={5000}
                        max={50000}
                        step={1000}
                        value={placementFee}
                        onChange={(e) => setPlacementFee(Math.min(50000, Math.max(5000, Number(e.target.value) || 5000)))}
                        className={`${inputClassName} pl-8`}
                      />
                    </div>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5">Range: $5,000 to $50,000</p>
                  </div>

                  {/* Split Percentage */}
                  <div>
                    <label htmlFor="splitPercentage" className={labelClassName}>
                      Your split percentage
                    </label>
                    <select
                      id="splitPercentage"
                      value={splitIndex}
                      onChange={(e) => setSplitIndex(Number(e.target.value))}
                      className={inputClassName}
                    >
                      {splitOptions.map((option, i) => (
                        <option key={i} value={i} className="bg-[#0a0a0f]">{option.label}</option>
                      ))}
                    </select>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5">50% is standard. 70% is available on RecX Direct roles.</p>
                  </div>

                  {/* Placements Per Quarter */}
                  <div>
                    <label htmlFor="placementsPerQuarter" className={labelClassName}>
                      Placements per quarter
                    </label>
                    <input
                      id="placementsPerQuarter"
                      type="number"
                      min={1}
                      max={20}
                      value={placementsPerQuarter}
                      onChange={(e) => setPlacementsPerQuarter(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
                      className={inputClassName}
                    />
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5">Most active members make 2 to 5 per quarter.</p>
                  </div>

                  {/* Membership Tier */}
                  <div>
                    <label htmlFor="membershipTier" className={labelClassName}>
                      Monthly membership tier
                    </label>
                    <select
                      id="membershipTier"
                      value={tierIndex}
                      onChange={(e) => setTierIndex(Number(e.target.value))}
                      className={inputClassName}
                    >
                      {membershipTiers.map((tier, i) => (
                        <option key={i} value={i} className="bg-[#0a0a0f]">{tier.label}</option>
                      ))}
                    </select>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5">Annual cost deducted from your projected earnings.</p>
                  </div>
                </div>
              </HolographicCard>

              {/* Results */}
              <div className="space-y-4 sm:space-y-5">
                <HolographicCard color="cyan" variant="stat" className="text-center">
                  <p className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2">Per Placement</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{formatCurrency(perPlacement)}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{formatCurrency(placementFee)} fee x {splitOptions[splitIndex].label} split</p>
                </HolographicCard>

                <HolographicCard color="fuchsia" variant="stat" className="text-center">
                  <p className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2">Quarterly Earnings</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{formatCurrency(quarterlyEarnings)}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{placementsPerQuarter} placement{placementsPerQuarter !== 1 ? 's' : ''} x {formatCurrency(perPlacement)}</p>
                </HolographicCard>

                <HolographicCard color="purple" variant="stat" className="text-center">
                  <p className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2">Annual Earnings (net)</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{formatCurrency(annualEarnings)}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{formatCurrency(quarterlyEarnings * 4)} gross minus {formatCurrency(annualMembershipCost)}/yr membership</p>
                </HolographicCard>

                <HolographicCard color="emerald" variant="stat" className="text-center">
                  <p className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2">Return on Investment</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{formatPercentage(roi)}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Gross earnings vs annual membership cost</p>
                </HolographicCard>
              </div>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Comparison Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <div className="text-center mb-8 sm:mb-10 px-2">
              <StatusBadge label="THE ALTERNATIVE" color="fuchsia" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4 mt-6 tracking-tight leading-tight">
                What if you didn't collaborate?
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed px-2">
                Without a collaboration partner, candidates without roles and roles without candidates sit on your desk earning nothing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <HolographicCard color="fuchsia" variant="content" className="text-center">
                <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">Without RecXchange</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-600 mb-2">$0</p>
                <p className="text-gray-500 text-[11px] sm:text-xs">Those candidates and roles go unfilled. Zero revenue.</p>
              </HolographicCard>

              <HolographicCard color="cyan" variant="content" glowIntensity="high" className="text-center">
                <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">With RecXchange</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-2">{formatCurrency(annualEarnings)}</p>
                <p className="text-gray-500 text-[11px] sm:text-xs">Projected annual earnings from split fee collaboration.</p>
              </HolographicCard>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* CTA Section */}
          <section className="my-10 sm:my-16 md:my-20">
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white">
                Ready to <span className="gradient-text">start earning?</span>
              </h3>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
                Thousands of recruiters are already collaborating and making placements they would have missed. Join from $1/month and keep 100% of your split fee. <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">View pricing</Link>.
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
                  href={internalLinks.pricing}
                >
                  Compare Plans
                </GlowButton>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-5 sm:mt-6 md:mt-8">Entry tier $1/month. Lite $99/month. Pro $249/month.</p>
            </HolographicCard>
          </section>

          {/* Last Updated */}
          <div className="mt-8 text-center">
            <LastUpdated date="2026-04-02" className="inline-block" />
          </div>

        </div>
      </div>
    </main>
  );
}
