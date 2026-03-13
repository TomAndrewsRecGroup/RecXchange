"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, DollarSign, TrendingUp, ArrowRight, CheckCircle, X } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function WhatIsRecXDirectPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="RECX DIRECT" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(236,72,153,0.4)' }}>
              What Is RecX Direct?
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              RecX Direct is RecXchange's highest-earning placement model — verified roles that pay candidate-side recruiters <span className="text-fuchsia-400 font-bold">70% of the fee</span>. No middleman. No agency markup. Just the most efficient hire possible.
            </p>
          </motion.header>

          {/* Hero Definition */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">The Model</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">A hiring manager posts a role directly on RecXchange — no traditional recruitment agency involved. RecXchange verifies the role, the company, and the hiring intent. The role is then listed as <strong className="text-fuchsia-400">RecX Direct</strong> in the live roles feed.</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Any registered recruiter with a matching candidate can submit them. If placed, the candidate-side recruiter earns <strong className="text-white">70% of the total placement fee</strong>. RecXchange earns the remaining 30% to cover the platform and verification service.</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-fuchsia-400/5 border border-fuchsia-400/20">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Candidate-Side Recruiter Earns</div>
                    <div className="text-4xl font-black text-fuchsia-400">70%</div>
                    <div className="text-gray-400 text-xs mt-1">of placement fee</div>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Average Placement Fee</div>
                    <div className="text-4xl font-black text-cyan-400">$7,000</div>
                    <div className="text-gray-400 text-xs mt-1">= $4,900 to you on a 70% split</div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Old Way vs RecX Direct */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Traditional Agency vs RecX Direct</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <HolographicCard color="purple" variant="feature">
                <h3 className="text-lg font-bold text-gray-400 mb-4">Traditional Recruitment Agency</h3>
                <ul className="space-y-3">
                  {[
                    "Agency takes 15–25% of salary",
                    "Agency keeps 100% of the fee",
                    "Limited recruiter network",
                    "No transparency on candidate quality",
                    "Slow process, multiple rounds",
                    "Hiring manager pays inflated rate"
                  ].map(item => (
                    <li key={item} className="flex gap-2 items-start text-sm text-gray-500">
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </HolographicCard>
              <HolographicCard color="fuchsia" variant="feature">
                <h3 className="text-lg font-bold text-fuchsia-400 mb-4">RecX Direct</h3>
                <ul className="space-y-3">
                  {[
                    "Role verified by RecXchange team",
                    "Candidate-side recruiter earns 70%",
                    "15,000+ specialist recruiters on platform",
                    "Top 1% candidate quality only",
                    "Xchange Engine matches 24/7",
                    "Hiring manager saves on agency markup"
                  ].map(item => (
                    <li key={item} className="flex gap-2 items-start text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </HolographicCard>
            </div>
          </div>

          {/* Who It's For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <Zap className="w-6 h-6 text-cyan-400 mb-3" />
              <h2 className="text-xl font-bold text-white mb-3">For Recruiters</h2>
              <p className="text-gray-400 text-sm leading-relaxed">RecX Direct roles are the highest-earning opportunities on the platform. If you have a strong candidate and a RecX Direct role appears, you earn 70% of the fee. The role is already verified — no ghosting, no tyre-kickers, no time wasters.</p>
            </HolographicCard>
            <HolographicCard color="fuchsia" variant="content">
              <Shield className="w-6 h-6 text-fuchsia-400 mb-3" />
              <h2 className="text-xl font-bold text-white mb-3">For Hiring Managers</h2>
              <p className="text-gray-400 text-sm leading-relaxed">RecX Direct gives you direct access to 15,000+ specialist recruiters without paying a full agency retainer. Your role is verified and promoted to the right recruiter audience. You only pay on a successful placement — and typically at a lower total cost than a traditional agency.</p>
            </HolographicCard>
          </div>

          {/* CTA */}
          <HolographicCard color="fuchsia" variant="content" className="text-center">
            <StatusBadge label="ACCESS RECX DIRECT" color="fuchsia" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Unlock RecX Direct Roles Today</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">RecX Direct roles are available to qualifying RecXchange members. Browse live verified roles and earn 70% on your next placement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/recruiter" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 font-bold text-sm hover:bg-fuchsia-400/20 transition-all">
                For Recruiters <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/hiring-manager-home" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">
                For Hiring Managers <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
