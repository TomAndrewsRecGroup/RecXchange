"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Users, Zap } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

const features = [
  {
    icon: Target,
    title: 'Strategic Workforce Planning',
    desc: 'Plan hiring pipelines 6-12 months ahead with predictive talent mapping.',
    color: 'cyan' as const,
  },
  {
    icon: TrendingUp,
    title: 'Scalable Talent Acquisition',
    desc: 'Activate 15,000+ specialist recruiters instantly when you need to scale fast.',
    color: 'fuchsia' as const,
  },
  {
    icon: Users,
    title: 'Dedicated Account Management',
    desc: 'Your Senior Account Manager coordinates the network, so you stay focused on strategy.',
    color: 'purple' as const,
  },
  {
    icon: Zap,
    title: 'AI-Powered Candidate Matching',
    desc: 'The Xchange Engine filters 270M+ profiles to surface only the top 1% of candidates.',
    color: 'emerald' as const,
  },
];

export default function HiringManagerStrategic() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 md:mb-12 mt-6"
          >
            <StatusBadge label="STRATEGIC HIRING" color="purple" />
            <h1
              className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}
            >
              Scale Your Team at the Speed of Strategy
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              RecX Direct gives you instant access to a global network of specialist recruiters, coordinated by a dedicated Account Manager who manages the complexity while you focus on growth.
            </p>
          </motion.header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <HolographicCard key={index} color={feature.color} variant="feature">
                  <div className="mb-4 sm:mb-6">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </HolographicCard>
              );
            })}
          </section>

          <section className="mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="cyan" variant="content" glowIntensity="high">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 gradient-text">
                  One Point of Contact. 15,000+ Recruiters.
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                  Your Account Manager acts as the single orchestration layer between your hiring needs and the global recruiter network. You brief once. They manage the rest.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">270M+</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Candidate Profiles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-fuchsia-400 mb-2">Top 1%</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Quality Filter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">AI Matching</div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </section>

          <section className="text-center">
            <HolographicCard color="emerald" variant="content">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                Ready to scale your hiring strategy?
              </h3>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-6 sm:mb-8 px-2 max-w-3xl mx-auto">
                Book a strategic briefing with your Account Manager to map out your next 6-12 months of hiring.
              </p>
              <GlowButton variant="primary" size="lg" href="{{trigger_link.vJPDrwl8k6nFBhkZeZJH}}">
                Schedule Strategic Briefing
              </GlowButton>
            </HolographicCard>
          </section>
        </div>
      </div>
    </main>
  );
}
