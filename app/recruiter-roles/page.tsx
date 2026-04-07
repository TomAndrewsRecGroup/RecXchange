"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const currencies: Currency[] = [
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
];

export default function PostRolesPage() {
  const [salary, setSalary] = useState<number>(90000);
  const [fee, setFee] = useState<number>(20);
  const [split, setSplit] = useState<number>(50);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  const totalFee = (salary * (fee / 100));
  const yourShare = totalFee * (split / 100);

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="NEED CANDIDATES?" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              See how much you'll still take home
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Post your role. Collaborating with a pre-vetted recruiter. Split the work. Split the fee. Keep more than you think.
            </p>
          </motion.header>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start mb-16 sm:mb-20 md:mb-24">
            <div className="space-y-6 sm:space-y-8">
              <HolographicCard color="cyan" variant="content">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 text-white">Role Liquidity. Partnered Success.</h2>
                <div className="space-y-6 sm:space-y-8">
                  {[
                    { t: "Verified Roles", d: "Broadcast roles with pre-agreed fee. RecXchange ensures every partner is pre-vetted for quality." },
                    { t: "Controlled Visibility", d: "Total control. Submit what you only want to share. Keep your clients private." },
                    { t: "Unified Pipeline", d: "Track candidate flows from multiple partners in one dashboard. No more messy email chains or lost CVs." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 sm:gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">{item.t}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard color="purple" variant="feature">
                <h3 className="text-xs sm:text-sm font-bold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse" />
                  Secure Transaction Layer
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                  RecXchange acts as the neutral contract guardian. Automated Split Fee Agreements (SFAs) are generated at the point of candidate match to lock in your commercial protection and non-circumvention.
                </p>
              </HolographicCard>
            </div>

            {/* Calculator */}
            <aside className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <HolographicCard color="fuchsia" variant="content" glowIntensity="high">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2 text-center">Split Fee Calculator</h2>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 text-center uppercase tracking-widest font-black">Post. Split. See what you still earn</p>
                  </div>
                  
                  <div className="space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                      <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-widest">Currency</label>
                      <select
                        value={selectedCurrency.code}
                        onChange={(e) => {
                          const currency = currencies.find(c => c.code === e.target.value);
                          if (currency) setSelectedCurrency(currency);
                        }}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-fuchsia-500/50 transition-all cursor-pointer"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code} className="bg-black text-white">
                            {currency.code} - {currency.symbol} ({currency.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-widest">Annual Base Salary</label>
                      <input 
                        type="number" 
                        value={salary} 
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-6 py-3.5 sm:py-5 text-lg sm:text-xl text-white outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-widest">Agency Fee %</label>
                        <input 
                          type="number" 
                          value={fee} 
                          onChange={(e) => setFee(Number(e.target.value))}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                        />
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-widest">Your Split %</label>
                        <input 
                          type="number" 
                          value={split} 
                          onChange={(e) => setSplit(Number(e.target.value))}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <HolographicCard color="cyan" variant="stat">
                      <span className="text-[9px] sm:text-[10px] text-gray-400 block mb-2 sm:mb-3 uppercase tracking-widest font-black">Your Estimated Take-Home</span>
                      {/* Reduced from text-4xl sm:text-5xl md:text-6xl → text-3xl sm:text-4xl md:text-5xl */}
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text tabular-nums tracking-tighter block">
                        {selectedCurrency.symbol}{Math.floor(yourShare).toLocaleString()}
                      </span>
                      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/5">
                        <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase font-bold tracking-widest">Total Invoice: {selectedCurrency.symbol}{totalFee.toLocaleString()}</span>
                      </div>
                    </HolographicCard>

                    <motion.a
                      href="{{trigger_link.jYQNc9YXcMkYPvo3HZfC}}"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full block px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all text-center"
                    >
                      Post Role to Xchange
                    </motion.a>
                  </div>
                </HolographicCard>
              </motion.div>
            </aside>
          </div>

          <RecruiterFinalCTA />
        </div>
      </div>
    </main>
  );
}
