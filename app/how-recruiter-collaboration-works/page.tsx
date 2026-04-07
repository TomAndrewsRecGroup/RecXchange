"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, FileCheck, Handshake, ArrowRight, Star, Globe } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function HowRecruiterCollaborationWorksPage() {
  const steps = [
    { n: "01", icon: Network, color: "cyan" as const, title: "Post Your Role or Candidate", body: "If you have a live role you can't fill, post it on RecXchange. If you have an outstanding candidate without a home, post their profile. Either way, you're visible to 15,000+ specialist recruiters immediately." },
    { n: "02", icon: Cpu, color: "fuchsia" as const, title: "Xchange Engine Matches You", body: "Our AI matching engine runs 24/7, scanning every role and candidate profile for compatibility. It considers sector, seniority, location, salary band, and skill set. When a strong match is found, both recruiters are notified instantly." },
    { n: "03", icon: Handshake, color: "purple" as const, title: "Agree Your Split", body: "You choose your split percentage together (50/50, 60/40, or 70/30). This is agreed before any private information changes hands. No data. No names. No risk. Just the terms." },
    { n: "04", icon: FileCheck, color: "cyan" as const, title: "Auto-Contract Generated", body: "RecXchange instantly generates a legally binding split fee agreement containing both recruiter names, company details, the candidate, the role, the agreed split, and a permanent timestamp. Both parties sign digitally." },
    { n: "05", icon: Star, color: "fuchsia" as const, title: "Private Details Released", body: "Only after the contract is signed do private details unlock. The candidate's full CV and contact information. The client's company name and hiring manager details. Your deal is protected every step of the way." },
    { n: "06", icon: Globe, color: "purple" as const, title: "Placement Made, Fees Split", body: "The candidate interviews, accepts the offer, and starts. Both recruiters invoice for their agreed share. RecXchange takes no cut of your placement fee. The entire split is yours." }
  ];

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="HOW IT WORKS" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(236,72,153,0.15)' }}>
              How Recruiter Collaboration Works
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Recruiter collaboration is the practice of two specialist recruiters partnering on a single placement and splitting the fee. Here's exactly how it works on RecXchange, from first match to paid invoice.
            </p>
          </motion.header>

          {/* Steps */}
          <div className="space-y-5 mb-12 md:mb-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const tc = step.color === 'cyan' ? 'text-cyan-400' : step.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400';
              return (
                <motion.div key={step.n} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <HolographicCard color={step.color} variant="feature">
                    <div className="flex gap-4 md:gap-6 items-start">
                      <div className={`text-3xl md:text-4xl font-black ${tc} opacity-25 flex-shrink-0 w-10 text-right`}>{step.n}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${tc}`} />
                          <h2 className="text-lg font-bold text-white">{step.title}</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>

          {/* Stats strip */}
          <HolographicCard color="purple" variant="content" className="mb-10 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">RecXchange by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "15,000+", label: "Specialist Recruiters", color: "text-cyan-400" },
                { val: "$7,000", label: "Avg Placement Fee", color: "text-fuchsia-400" },
                { val: "$750k+", label: "Live Fees Available", color: "text-purple-400" },
                { val: "0%", label: "Platform Cut Taken", color: "text-cyan-400" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* CTA */}
          <HolographicCard color="fuchsia" variant="content" className="text-center">
            <StatusBadge label="START COLLABORATING" color="fuchsia" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Ready to Make Your First Split Placement?</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">Join 15,000+ recruiters already collaborating on RecXchange. Post your first role or candidate today.</p>
            <a href="/recruiter" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 font-bold text-sm hover:bg-fuchsia-400/20 transition-all">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
