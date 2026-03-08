'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function WhyRecXchangePage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Breadcrumbs />
          
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="PLATFORM COMPARISON" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Why Choose RecXchange?
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              See how RecXchange compares to traditional recruitment methods. Better for recruiters, better for hiring managers, better results for everyone.
            </p>
          </motion.header>

          {/* Comparison 1: vs Traditional Agencies */}
          <section className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 px-2">RecXchange vs Traditional Recruitment Agencies</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">How split fee collaboration beats working alone</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <HolographicCard color="cyan" variant="content">
                  <StatusBadge label="RECXCHANGE" color="cyan" size="sm" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 mt-4">Collaborative Recruitment</h3>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-cyan-300 mb-2 sm:mb-2.5 md:mb-3">For Recruiters:</h4>
                      <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-gray-300 text-[13px] sm:text-sm">
                        {[
                          { text: "Access to 270M candidates", desc: "Never run out of talent. Search the database when your pipeline is empty." },
                          { text: "Partner with 15,000+ recruiters", desc: "Find candidates for your roles or roles for your candidates." },
                          { text: "Earn up to 70% on RecX Direct", desc: "Higher splits than traditional agencies ($4,900 on $7k placement)." },
                          { text: "$1-$250/month flat fee", desc: "No commission splits. Keep 100% of your earnings." },
                          { text: "Legal protection", desc: "Auto-generated contracts. Timestamped submissions. Both parties protected." }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="text-cyan-400 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                            <span className="flex-1"><strong className="text-white">{item.text}</strong> - {item.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-5 border-t border-cyan-400/10">
                      <h4 className="text-base sm:text-lg font-bold text-cyan-300 mb-2 sm:mb-2.5 md:mb-3">For Hiring Managers:</h4>
                      <ul className="space-y-2 sm:space-y-2.5 text-gray-300 text-[13px] sm:text-sm">
                        {[
                          "15,000+ recruiters working on your role - Post once, thousands see it.",
                          "One point of contact - Account Manager handles everything. No recruiter spam.",
                          "12-20% fee - Lower than typical agencies (20-30%). Only pay when you hire.",
                          "Candidates in 48 hours - Fast turnaround. Multiple submissions from different recruiters."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="text-cyan-400 mt-0.5 flex-shrink-0">✓</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <HolographicCard color="emerald" variant="content" className="bg-red-950/10 border-red-400/20">
                  <StatusBadge label="TRADITIONAL AGENCY" color="emerald" size="sm" className="bg-red-400/10 border-red-400/30 text-red-400" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 mt-4">Solo Recruitment</h3>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-red-400 mb-2 sm:mb-2.5 md:mb-3">For Recruiters:</h4>
                      <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-gray-400 text-[13px] sm:text-sm">
                        {[
                          "Limited candidate pool - Only your database. Lose placement if you don't have the candidate.",
                          "No collaboration - Work alone. Compete with everyone. No partnerships.",
                          "40-60% commission split - Agency takes 40-60%. Keep only $2,800-$4,200 on $7k placement.",
                          "High overhead costs - Office rent, CRM fees, job board subscriptions, marketing.",
                          "No protection - Candidates can be poached. Clients work with other agencies freely."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="text-red-400 mt-0.5 sm:mt-1 flex-shrink-0">✗</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-5 border-t border-red-400/10">
                      <h4 className="text-base sm:text-lg font-bold text-red-400 mb-2 sm:mb-2.5 md:mb-3">For Hiring Managers:</h4>
                      <ul className="space-y-2 sm:space-y-2.5 text-gray-400 text-[13px] sm:text-sm">
                        {[
                          "Limited recruiter pool - Only recruiters you contact manually.",
                          "Multiple points of contact - Work with 5-10 agencies. Manage calls, emails, duplicates.",
                          "20-30% fee - Standard agency rates. Sometimes 35% for executive roles.",
                          "Slow process - Wait for each agency to search separately. Inconsistent quality."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Summary CTA */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="my-10 sm:my-12 md:my-16">
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2">
                The RecXchange Advantage
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                RecXchange combines the best of all recruitment methods: the reach of job boards, the service quality of RPO, and the flexibility of agencies - without the downsides. For recruiters, earn more while working less. For hiring managers, get better candidates faster at lower cost.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6 md:mb-8">
                {[
                  { value: "15,000+", label: "Active recruiters partnering" },
                  { value: "$7,000", label: "Average placement fee" },
                  { value: "270M", label: "Candidate profiles searchable" }
                ].map((stat, i) => (
                  <HolographicCard key={i} color={i === 0 ? "cyan" : i === 1 ? "fuchsia" : "purple"} variant="stat">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </HolographicCard>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <GlowButton variant="primary" size="lg" href="/recruiter">Join as Recruiter</GlowButton>
                <GlowButton variant="secondary" size="lg" href="/hiring-manager-home">Post Your Role</GlowButton>
                <GlowButton variant="ghost" size="lg" href="/pricing">View Pricing</GlowButton>
              </div>
            </HolographicCard>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
