"use client";
import React from "react";
import { UserCheck, MessageSquare, Users, ShieldCheck, Trophy, Handshake } from "lucide-react";
import { motion } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

const supportSteps = [
  {
    Icon: MessageSquare,
    color: "cyan" as const,
    iconClass: "text-cyan-400",
    title: "Expert Role Briefing",
    description: "Your dedicated Account Manager meets with you to understand the technical requirements, cultural fit, and strategic goals of your roles."
  },
  {
    Icon: Users,
    color: "fuchsia" as const,
    iconClass: "text-fuchsia-400",
    title: "Global Recruiter Management",
    description: "We manage the 15,000+ specialist recruiters on the platform, directing their sourcing efforts so you don't have to deal with multiple agencies."
  },
  {
    Icon: Trophy,
    color: "purple" as const,
    iconClass: "text-purple-400",
    title: "Elite Candidate Filtering",
    description: "The Xchange Engine performs semantic matching, and your Account Manager manually vets the results to ensure only the top 1% of candidates reach your desk."
  },
  {
    Icon: Handshake,
    color: "cyan" as const,
    iconClass: "text-cyan-400",
    title: "End-to-End Support",
    description: "From scheduling interviews to managing offers and onboarding, your Account Manager acts as an extension of your internal HR team."
  }
];

export default function AccountManagement() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="PARTNERSHIP AT SCALE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Your Dedicated Account Manager
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Hiring at speed shouldn't mean sacrificing quality. Every client is assigned a specialist Account Manager to navigate the Xchange Engine and manage the global recruiter community for you.
            </p>
          </motion.header>

          {/* Process Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            {supportSteps.map((step, index) => {
              const IconComponent = step.Icon;
              return (
                <HolographicCard key={index} color={step.color} variant="feature">
                  <div className="mb-4 sm:mb-6">
                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${step.iconClass}`} />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white">{step.title}</h4>
                  <p className="text-gray-400 text-[13px] sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </HolographicCard>
              );
            })}
          </section>

          {/* High-Impact Stat Section */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="purple" variant="content" glowIntensity="high">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">One Point of Contact. 15,000+ Recruiters.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Role Ownership</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-fuchsia-400 mb-2">Top 1%</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Candidate Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Engine Monitoring</div>
                </div>
              </div>
            </HolographicCard>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <HolographicCard color="emerald" variant="content">
              <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="text-green-400 w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Ready to brief your Account Manager?</h3>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-8 px-2 max-w-3xl mx-auto">
                Experience the efficiency of the Xchange Engine backed by the expertise of a dedicated recruitment partner.
              </p>
              <div className="flex justify-center">
                <GlowButton variant="primary" size="md" href="{{trigger_link.vJPDrwl8k6nFBhkZeZJH}}">
                  Schedule Your Briefing
                </GlowButton>
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>
    </main>
  );
}
