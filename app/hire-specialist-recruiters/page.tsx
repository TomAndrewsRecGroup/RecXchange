"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, DollarSign, CheckCircle, Briefcase, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

export default function HireSpecialistRecruitersPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="FOR HIRING MANAGERS" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Hire Specialist Recruiters
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Access 15,000+ specialist recruiters through one platform. Pay 12 to 20% on placement only. No retainers, no upfront costs. One account manager handles everything.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Why hire through specialist recruiters?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Specialist recruiters outperform generalists because they live and breathe their niche. They know the candidates personally, understand the market rates, and can assess technical fit in ways a generalist simply cannot. RecXchange gives hiring managers access to thousands of these specialists through a single platform, with one point of contact and one simple fee structure.
            </p>
          </section>

          {/* Why Specialists Win */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="purple" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Target className="w-7 h-7 text-purple-400" />
                Why Specialists Outperform Generalists
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  A generalist recruiter covers multiple sectors. They cast a wide net but lack depth. When you need a senior DevOps engineer, a niche compliance lawyer, or a bilingual sales director, you need someone who already knows where those people are.
                </p>
                <p>
                  Specialist recruiters have spent years building relationships in a specific sector. Their candidate networks are deeper, their screening is sharper, and their shortlists are more accurate. The result: faster fills, better retention, and less wasted time interviewing the wrong people.
                </p>
              </div>
            </HolographicCard>
          </motion.div>

          {/* How RecXchange Works for Hiring Managers */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                { step: "01", color: "cyan", icon: Briefcase, title: "Submit your role", body: "Tell us what you need. Your dedicated account manager captures the brief and posts it to the RecXchange network of 15,000+ specialist recruiters." },
                { step: "02", color: "fuchsia", icon: Users, title: "Specialists compete to fill it", body: "The Xchange Engine identifies which recruiters are most likely to have matching candidates. Multiple specialists work your role simultaneously, giving you far greater reach than any single agency." },
                { step: "03", color: "purple", icon: CheckCircle, title: "Hire and pay on placement", body: "You receive a curated shortlist from your account manager. Interview, select, and hire. You only pay 12 to 20% when the candidate starts. No retainers. No upfront costs." }
              ].map((item) => {
                const Icon = item.icon;
                const textColor = item.color === 'cyan' ? 'text-cyan-400' : item.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400';
                return (
                  <HolographicCard key={item.step} color={item.color as 'cyan' | 'fuchsia' | 'purple'} variant="feature">
                    <div className={`text-4xl font-black ${textColor} mb-3 opacity-30`}>{item.step}</div>
                    <Icon className={`w-6 h-6 ${textColor} mb-3`} />
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </HolographicCard>
                );
              })}
            </div>
          </div>

          {/* The Managed Service Model */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-7 h-7 text-cyan-400" />
                The Managed Service Model
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  You do not need to manage 15,000 recruiters. That is our job. Every hiring manager gets a dedicated account manager who handles the entire process. They brief the network, filter submissions, and present you with a curated shortlist of the best candidates.
                </p>
                <p>
                  From your perspective, it feels like working with one highly effective agency. Behind the scenes, dozens of specialists are competing to find you the right person.
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* Pricing */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <DollarSign className="w-7 h-7 text-fuchsia-400" />
                Simple, Transparent Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { value: "12-20%", label: "Of first-year salary", color: "text-cyan-400" },
                  { value: "$0", label: "Upfront cost", color: "text-fuchsia-400" },
                  { value: "$0", label: "Retainer fees", color: "text-purple-400" }
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className={`text-2xl md:text-3xl font-black ${item.color} mb-1`}>{item.value}</div>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                You only pay when a candidate is successfully placed and starts work. The fee percentage depends on the role type and seniority. There are no hidden costs, no subscription fees, and no lock-in contracts.
              </p>
            </HolographicCard>
          </div>

          {/* CTA */}
          <HolographicCard color="purple" variant="content" className="text-center">
            <StatusBadge label="GET STARTED" color="purple" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Find Your Next Hire</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Submit your role today. Your account manager will brief the network and start delivering candidates within days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <GlowButton variant="primary" size="md" href="/hiring-manager-home">Post a Role</GlowButton>
              <GlowButton variant="secondary" size="md" href="/pricing">View Pricing</GlowButton>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
