"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Split, FileText, Shield, TrendingUp, Users, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function WhatIsSplitFeeRecruitmentPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="RECRUITMENT GUIDE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              What Is Split Fee Recruitment?
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Two recruiters. One placement. Shared fee. Split fee recruitment is the fastest-growing model in the industry, and RecXchange is where 15,000+ recruiters do it safely.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is split fee recruitment?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Split fee recruitment is a placement model where two specialist recruiters collaborate on a single vacancy and divide the fee when the candidate is hired. One recruiter owns the client relationship and the role. The other has a matching candidate. They agree a split, commonly 50/50, 60/40, or 70/30, before sharing any private information. On RecXchange, over 15,000 recruiters use split fees to make placements they could not complete alone, with an average fee of $7,000 per deal.
            </p>
          </section>

          {/* Definition */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Split className="w-7 h-7 text-cyan-400" />
                The Definition
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                <strong className="text-white">Split fee recruitment</strong> is a collaborative placement model where two specialist recruiters work together on a single job vacancy and divide the resulting placement fee. One recruiter owns the <span className="text-cyan-400 font-semibold">role</span> (the client relationship and the vacancy). The other recruiter has a <span className="text-fuchsia-400 font-semibold">matching candidate</span>. Both agree on a fee split before any private information is exchanged. When the candidate is hired, the fee is divided according to that agreement.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                It solves one of recruitment's oldest problems: the role-side recruiter can't find the right candidate in time, and the candidate-side recruiter has no live opening to place their person into. Split fee recruitment unlocks both simultaneously.
              </p>
            </HolographicCard>
          </motion.div>

          {/* How It Works — 3 Steps */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                { step: "01", color: "cyan", icon: Users, title: "Two Recruiters Connect", body: "A role-side recruiter posts a live vacancy on RecXchange. The Xchange Engine scans 15,000+ recruiter candidate databases and flags matching profiles. Both recruiters agree to collaborate." },
                { step: "02", color: "fuchsia", icon: FileText, title: "Split Agreement Locked", body: "Before any private data is shared, both parties agree a split percentage (50/50, 60/40, or 70/30). RecXchange auto-generates a legally binding contract with a permanent timestamp." },
                { step: "03", color: "purple", icon: DollarSign, title: "Candidate Placed, Fee Split", body: "The candidate is submitted, interviews, and accepts the offer. Both recruiters invoice for their agreed share. RecXchange takes zero platform cut. You keep 100% of your split." }
              ].map((item) => {
                const Icon = item.icon;
                const borderColor = item.color === 'cyan' ? 'border-cyan-400/20' : item.color === 'fuchsia' ? 'border-fuchsia-400/20' : 'border-purple-400/20';
                const textColor = item.color === 'cyan' ? 'text-cyan-400' : item.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400';
                return (
                  <HolographicCard key={item.step} color={item.color as 'cyan'|'fuchsia'|'purple'} variant="feature">
                    <div className={`text-4xl font-black ${textColor} mb-3 opacity-30`}>{item.step}</div>
                    <Icon className={`w-6 h-6 ${textColor} mb-3`} />
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </HolographicCard>
                );
              })}
            </div>
          </div>

          {/* Fee Split Table */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="purple" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Standard Split Fee Structures</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-400/20">
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Split Model</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Role-Side</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Candidate-Side</th>
                      <th className="text-left text-gray-400 font-semibold py-3">Typical Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {[
                      { model: "50/50 Standard", role: "50%", cand: "50%", use: "Equal partnership, both bring equal value", color: "text-cyan-400" },
                      { model: "60/40", role: "60%", cand: "40%", use: "Role-side has stronger client relationship", color: "text-fuchsia-400" },
                      { model: "70/30 RecX Direct", role: "30%", cand: "70%", use: "Candidate-side earns more on verified Direct roles", color: "text-purple-400" }
                    ].map((row) => (
                      <tr key={row.model} className="border-b border-white/5">
                        <td className={`py-3 pr-6 font-bold ${row.color}`}>{row.model}</td>
                        <td className="py-3 pr-6 text-white">{row.role}</td>
                        <td className="py-3 pr-6 text-white">{row.cand}</td>
                        <td className="py-3 text-gray-400">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs mt-4">Average placement fee on RecXchange: <span className="text-white font-bold">$7,000</span>. Total live fees available: <span className="text-cyan-400 font-bold">$750,000+</span></p>
            </HolographicCard>
          </div>

          {/* Why It Works */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Why Split Fee Recruitment Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { icon: TrendingUp, color: "text-cyan-400", title: "You fill more roles", body: "Even if your candidate database is thin, you can access thousands of live opportunities from other recruiters. More roles = more placements." },
                { icon: Shield, color: "text-fuchsia-400", title: "You're protected by contract", body: "RecXchange auto-generates a timestamped split agreement before any private data is exchanged. Your candidate and your deal are protected." },
                { icon: DollarSign, color: "text-purple-400", title: "You earn on hard-to-fill roles", body: "Have a niche candidate nobody else can place? Other recruiters will bring you their toughest roles. Your specialist knowledge becomes direct income." },
                { icon: CheckCircle, color: "text-cyan-400", title: "Zero platform fee taken", body: "RecXchange does not take a cut of your placement fee. You keep 100% of your agreed split. The only cost is your membership." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <HolographicCard key={item.title} color="cyan" variant="feature">
                    <Icon className={`w-6 h-6 ${item.color} mb-3`} />
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </HolographicCard>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="JOIN 15,000+ RECRUITERS" color="cyan" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Start Splitting Fees on RecXchange</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Browse live roles, post your candidates, and collaborate with specialist recruiters across every sector and region. Contracts generated automatically. Fees protected.
            </p>
            <a href="/recruiter" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">
              Explore the Platform <ArrowRight className="w-4 h-4" />
            </a>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
