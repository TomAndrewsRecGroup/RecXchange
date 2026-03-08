"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
  { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  { code: 'UZS', symbol: "so'm", name: 'Uzbekistani Som' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
];

export default function PostRolesPage() {
  const [salary, setSalary] = useState<number>(90000);
  const [fee, setFee] = useState<number>(20);
  const [split, setSplit] = useState<number>(50);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  const totalFee = (salary * (fee / 100));
  const yourShare = totalFee * (split / 100);

  return (
    <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 mesh-background relative overflow-x-hidden text-white">
      
      <div className="fixed bottom-0 right-0 w-[60%] sm:w-[50%] md:w-[45%] h-[40%] sm:h-[45%] bg-purple-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-0 left-0 w-[50%] sm:w-[40%] md:w-[35%] h-[30%] sm:h-[35%] bg-blue-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Hero Header */}
        <header className="text-center mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Badge */}
            <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-cyan-400/60 font-bold">
              Need Candidates?
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight px-2">
              See how much you'll take home
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              After collaborating with a pre-vetted recruiter. Split the work. Split the fee. Keep more than you think.
            </p>
          </motion.div>
        </header>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start mb-16 sm:mb-20 md:mb-24">
          
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20 transition-all">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8">Role Liquidity. Partnered Success.</h2>
              <div className="space-y-6 sm:space-y-8 md:space-y-12">
                {[
                  { t: "Verified Roles", d: "Broadcast roles with pre-agreed fee structures. RecXchange ensures every partner is pre-vetted for quality." },
                  { t: "Tiered Visibility", d: "Total control. Broadcast to the open marketplace or limit visibility to your private 'Circle of Trust'." },
                  { t: "Unified Pipeline", d: "Track candidate flows from multiple partners in one dashboard. No more messy email chains or lost CVs." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 sm:gap-4 md:gap-6"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">{item.t}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border border-purple-500/20 bg-purple-500/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
               <div className="relative z-10">
                  <h3 className="text-xs sm:text-sm font-bold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse" />
                    Secure Transaction Layer
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                    RecXchange acts as the neutral escrow and contract guardian. Automated Split Fee Agreements (SFAs) are generated at the point of candidate submission to lock in your commercial protection.
                  </p>
               </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] border border-white/10 bg-black/60 relative hover:border-white/20 transition-all"
            >
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2 text-center">Split Fee Calculator</h2>
                <p className="text-[10px] sm:text-[11px] text-gray-500 text-center uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest font-black">Revenue Projection Engine</p>
              </div>
              
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Currency Selector */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-[0.15em] sm:tracking-[0.2em]">Currency</label>
                  <select
                    value={selectedCurrency.code}
                    onChange={(e) => {
                      const currency = currencies.find(c => c.code === e.target.value);
                      if (currency) setSelectedCurrency(currency);
                    }}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-purple-500/50 transition-all cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' opacity='0.4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code} className="bg-black text-white text-sm">
                        {currency.code} - {currency.symbol} ({currency.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-[0.15em] sm:tracking-[0.2em]">Annual Base Salary</label>
                  <input 
                    type="number" 
                    value={salary} 
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3.5 sm:py-5 text-lg sm:text-xl text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-[0.15em] sm:tracking-[0.2em]">Agency Fee %</label>
                    <input 
                      type="number" 
                      value={fee} 
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-black tracking-[0.15em] sm:tracking-[0.2em]">Your Split %</label>
                    <input 
                      type="number" 
                      value={split} 
                      onChange={(e) => setSplit(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3.5 sm:py-5 text-base sm:text-lg text-white outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 blur-[60px] rounded-full" />
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block mb-2 sm:mb-3 uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-black">Your Estimated Take-Home</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text tabular-nums tracking-tighter block">
                    {selectedCurrency.symbol}{Math.floor(yourShare).toLocaleString()}
                  </span>
                  <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-white/5 flex justify-center gap-4 sm:gap-6">
                     <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase font-bold tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest">Total Invoice: {selectedCurrency.symbol}{totalFee.toLocaleString()}</span>
                  </div>
                </div>

                <motion.a
                  href="{{trigger_link.jYQNc9YXcMkYPvo3HZfC}}"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 sm:py-5 md:py-6 text-sm sm:text-base text-center block rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] transition-all"
                >
                  Post Role to Xchange
                </motion.a>
              </div>
            </motion.div>
          </aside>
        </div>

        <RecruiterFinalCTA />
      </div>
    </main>
  );
}
