"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gift, DollarSign, Users, TrendingUp } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AffiliatePage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="TOKEN-BASED REWARD SYSTEM" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Affiliate Program
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              Grow the ecosystem and earn RecX Tokens—digital credits that power your productivity within the platform.
            </p>
          </motion.header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* Left: Program Overview */}
            <HolographicCard color="fuchsia" variant="content">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl mb-2">How It Works</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Operated by <span className="text-white font-semibold">RecXchange Portal LLC</span>, our affiliate program rewards ecosystem growth through <span className="text-fuchsia-400 font-bold">RecX Tokens</span>—digital credits used to power your productivity within the platform.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-fuchsia-400/20">
                  <h3 className="text-fuchsia-400 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                    Redemption Rules
                  </h3>
                  <ul className="space-y-4 text-sm font-medium text-gray-300">
                    <li className="flex gap-3 items-start">
                      <span className="text-fuchsia-400 font-bold text-lg">01</span>
                      <span>Unlock candidate contact details directly</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-fuchsia-400 font-bold text-lg">02</span>
                      <span>Purchase platform-exclusive eLearning content</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-fuchsia-400 font-bold text-lg">03</span>
                      <span>Boost role visibility in the Xchange Engine</span>
                    </li>
                  </ul>
                </div>
              </div>
            </HolographicCard>

            {/* Right: Qualification */}
            <div className="space-y-6">
              <HolographicCard color="cyan" variant="content">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-2">Qualification</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Referrals must sign up via your unique partner link and maintain an active, verified account for <span className="text-white font-semibold">two full calendar months</span> to trigger a Qualified Referral reward.
                </p>
                <div className="pt-4 border-t border-cyan-400/20">
                  <p className="text-xs text-gray-500 italic">
                    Referral rewards are subject to the Anti-Gaming Protocol as outlined in the Master Services Agreement.
                  </p>
                </div>
              </HolographicCard>

              <HolographicCard color="purple" variant="feature">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-2">Token Value</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      The value of RecX tokens is fixed within the internal ecosystem and carries no external cash value. RecXchange reserves the right to modify token weights based on platform dynamics.
                    </p>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </div>

          {/* Transparency Section */}
          <HolographicCard color="cyan" variant="content">
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl sm:text-2xl">Program Transparency</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                The value of RecX tokens is fixed within the internal ecosystem and carries no external cash value. RecXchange reserves the right to modify token weights or redemption costs based on platform inflation and marketplace dynamics.
              </p>
              <div className="pt-4">
                <Link href="/legal/terms" className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400/20 transition-all">
                  View Master Agreement
                </Link>
              </div>
            </div>
          </HolographicCard>

          {/* Legal Footer Navigation */}
          <footer className="mt-8 sm:mt-12">
            <div className="glass-card py-4 px-6 sm:px-10 rounded-full border-purple-400/10 flex flex-wrap justify-center gap-6 sm:gap-8 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
              <Link href="/legal/terms" className="hover:text-purple-400 transition-colors">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-purple-400 transition-colors">Privacy</Link>
              <Link href="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookies</Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
