"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Users, Zap, Calendar } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

const features = [
  {
    icon: Target,
    title: 'Strategic Workforce Planning',
    desc: 'Plan hiring pipelines 3-6 months ahead with predictive talent mapping. Know who is available, what the market looks like, and be ready to move the moment headcount is approved.',
    color: 'cyan' as const,
    iconClass: 'text-cyan-400',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Talent Acquisition',
    desc: 'Activate 15,000+ specialist recruiters instantly when you need to scale fast. One brief. Hundreds of experts sourcing simultaneously, without the overhead of managing multiple agencies.',
    color: 'fuchsia' as const,
    iconClass: 'text-fuchsia-400',
  },
  {
    icon: Users,
    title: 'Dedicated Account Management',
    desc: 'Your Senior Account Manager coordinates the entire network on your behalf, briefing recruiters, filtering quality, and delivering only the strongest submissions. You stay focused on strategy.',
    color: 'purple' as const,
    iconClass: 'text-purple-400',
  },
  {
    icon: Zap,
    title: 'AI-Powered Candidate Matching',
    desc: 'The RecXchange Recruiters filter 270M+ profiles to surface only the top 1% of candidates, matched by skills, location, experience, and role fit. Your shortlist is built before you even ask for it.',
    color: 'emerald' as const,
    iconClass: 'text-emerald-400',
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
              className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}
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
                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.iconClass}`} />
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
                Book a strategic briefing with your Account Manager to map out your next 3-6 months of hiring. We&apos;ll show you exactly what the market looks like, who&apos;s available, and how to build a pipeline that&apos;s ready the moment you need it.
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="https://link.gohighlevel.com/widget/booking/xp9zWAV1rz40w5WdPSTi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
                >
                  <Calendar size={16} />
                  Schedule Strategic Briefing
                </motion.a>
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>
    </main>
  );
}
