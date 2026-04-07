"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Store, Repeat, Zap, Shield, Users, Brain, DollarSign, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

export default function RecruitmentMarketplacePage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="RECRUITMENT MARKETPLACE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              The Recruitment Marketplace
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              A two-sided marketplace where recruiters post roles and candidates, AI matches them, and split fee agreements protect every deal. 15,000+ recruiters. $750K+ in live fees. Zero platform commission.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is a recruitment marketplace?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A recruitment marketplace is a platform that connects the people who can fill roles with the people who have roles to fill. Unlike a job board, which simply lists vacancies for candidates to apply to, a recruitment marketplace actively matches supply and demand. RecXchange is a two-sided recruitment marketplace built specifically for recruiters. Recruiters post both live roles and available candidates. The Xchange Engine uses AI to match them, and legally binding split fee agreements are generated before any data is shared.
            </p>
          </section>

          {/* How It Differs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Store className="w-7 h-7 text-cyan-400" />
                Not a Job Board. Not an Agency. A Marketplace.
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-400/20">
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Feature</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Job Boards</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Traditional Agencies</th>
                      <th className="text-left text-gray-400 font-semibold py-3">RecXchange</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Who posts roles", board: "Employers", agency: "Employers via agency", rex: "Recruiters" },
                      { feature: "Who supplies candidates", board: "Candidates apply", agency: "Agency sources", rex: "Specialist recruiters" },
                      { feature: "Matching method", board: "Manual search", agency: "Single consultant", rex: "AI-powered engine" },
                      { feature: "Contract protection", board: "None", agency: "Agency terms", rex: "Auto-generated agreements" },
                      { feature: "Platform commission", board: "Per-post fees", agency: "20-30% of salary", rex: "Zero. Membership only." }
                    ].map((row) => (
                      <tr key={row.feature} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white font-semibold">{row.feature}</td>
                        <td className="py-3 pr-6 text-gray-400">{row.board}</td>
                        <td className="py-3 pr-6 text-gray-400">{row.agency}</td>
                        <td className="py-3 text-cyan-400 font-semibold">{row.rex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </HolographicCard>
          </motion.div>

          {/* How the Marketplace Works */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How the Marketplace Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[
                { icon: Repeat, color: "text-cyan-400", title: "Two-sided listings", body: "Recruiters post live roles on one side and available candidates on the other. This creates a constantly updated pool of supply and demand that no single recruiter could build alone." },
                { icon: Brain, color: "text-fuchsia-400", title: "AI-powered matching", body: "The Xchange Engine analyses role requirements and candidate profiles in real time. It identifies high-probability matches and notifies both recruiters automatically." },
                { icon: Shield, color: "text-purple-400", title: "Protected collaboration", body: "Before any candidate or client data is exchanged, both recruiters sign a digital split fee agreement. Every deal is timestamped and stored permanently." },
                { icon: DollarSign, color: "text-cyan-400", title: "Transparent pricing", body: "Recruiters agree their split before collaborating. Common structures are 50/50, 60/40, or 70/30. RecXchange takes zero commission. You keep 100% of your agreed share." }
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

          {/* Scale */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-fuchsia-400" />
                Marketplace at Scale
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The value of any marketplace depends on its participants. RecXchange has over 15,000 specialist recruiters covering every major sector and region. That means thousands of live roles available at any time, thousands of pre-screened candidates ready to be placed, and over $750,000 in live fees on the platform.
                </p>
                <p>
                  For recruiters, this means more opportunities. For hiring managers using RecXchange&apos;s managed service, it means access to a depth of talent that no single agency can match. The marketplace grows stronger with every recruiter who joins, because every new participant brings their own roles, candidates, and specialist knowledge.
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* CTA */}
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="JOIN THE MARKETPLACE" color="cyan" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Start Trading on RecXchange</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Post your first role or candidate. Get matched with specialist partners. Make placements you could not make alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <GlowButton variant="primary" size="md" href="/recruiter">Join as Recruiter</GlowButton>
              <GlowButton variant="secondary" size="md" href="/hiring-manager-home">Hire Through RecXchange</GlowButton>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
