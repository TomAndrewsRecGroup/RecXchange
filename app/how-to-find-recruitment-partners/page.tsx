"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Globe, MessageSquare, Award, ArrowRight, CheckCircle } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function HowToFindRecruitmentPartnersPage() {
  const methods = [
    { rank: "01", icon: Cpu, color: "cyan" as const, title: "Use a Recruiter Marketplace (Fastest)", body: "RecXchange is purpose-built for this. Join, post your roles or candidates, and the Xchange Engine automatically matches you with compatible partner recruiters from a pool of 15,000+. No cold outreach. No LinkedIn DMs. Just instant, AI-powered matching based on sector, geography, and candidate profile." },
    { rank: "02", icon: Users, color: "fuchsia" as const, title: "LinkedIn Recruiter Groups", body: "LinkedIn hosts hundreds of recruiter collaboration groups where members post candidates seeking roles or flag vacancies they can't fill. Search for \"split fee recruiters\", \"recruiter collaboration\", or your sector + \"recruitment network\". Response rates are variable and there's no formal contract layer." },
    { rank: "03", icon: Globe, color: "purple" as const, title: "Sector Associations & Conferences", body: "REC (UK), ASA (US), and RCSA (APAC) all host events where recruiters network. Face-to-face partnerships built here often turn into long-term collaboration. The trust level is higher but the volume of opportunities is lower than a digital marketplace." },
    { rank: "04", icon: MessageSquare, color: "cyan" as const, title: "Direct Outreach to Complementary Recruiters", body: "If you specialise in Engineering candidates but a Healthcare recruiter regularly posts Engineering roles, reach out directly. Find recruiters who are adjacent to your niche — you solve each other's gaps. Frame it as a partnership, not a transaction." },
    { rank: "05", icon: Award, color: "fuchsia" as const, title: "Recruiter Referral Networks", body: "Some agencies run formal referral or alliance programs where independent recruiters share roles and candidates. These are typically invite-only and require a track record. RecXchange's affiliate program also rewards recruiters who bring new partners to the platform with RecX Tokens." },
    { rank: "06", icon: CheckCircle, color: "purple" as const, title: "Your Existing Network First", body: "Check your own contacts. Former colleagues, clients who became recruiters, or competitors you respect. Known quantities reduce risk. A formal split agreement via RecXchange makes it easy to collaborate even with people you already know." }
  ];

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="RECRUITER GUIDE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              How to Find Recruitment Partners
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Finding the right recruitment partner is the difference between a hard-to-fill role sitting open for months and a placement made in days. Here are the 6 most effective methods in 2026.
            </p>
          </motion.header>

          {/* Methods */}
          <div className="space-y-5 mb-12 md:mb-16">
            {methods.map((m, i) => {
              const Icon = m.icon;
              const tc = m.color === 'cyan' ? 'text-cyan-400' : m.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400';
              return (
                <motion.div key={m.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <HolographicCard color={m.color} variant="feature">
                    <div className="flex gap-4 items-start">
                      <div className={`text-3xl font-black ${tc} opacity-20 w-8 flex-shrink-0 text-right`}>{m.rank}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${tc}`} />
                          <h2 className="text-lg font-bold text-white">{m.title}</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{m.body}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>

          {/* What to look for in a partner */}
          <HolographicCard color="purple" variant="content" className="mb-10 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5">What to Look For in a Recruitment Partner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Sector Specialisation", desc: "They know their niche cold. Not a generalist pretending." },
                { label: "Verified Track Record", desc: "Placement history, ratings, and references available." },
                { label: "Fast Communication", desc: "Responds within hours, not days. Speed wins in recruitment." },
                { label: "Formal Agreement", desc: "Willing to sign a split fee contract before any data is shared." },
                { label: "Complementary Geography", desc: "Strong in a region or sector you're not." },
                { label: "Shared Standards", desc: "Same quality threshold for candidates you'd both be proud to submit." }
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-semibold">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* CTA */}
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="15,000+ PARTNERS WAITING" color="cyan" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Find Your Recruitment Partners on RecXchange</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">Skip the cold outreach. The Xchange Engine matches you with the right partner recruiter automatically — based on sector, location, and live opportunities.
            </p>
            <a href="/recruiter" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">
              Join RecXchange <ArrowRight className="w-4 h-4" />
            </a>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
