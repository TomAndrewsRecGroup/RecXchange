"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Shield, Zap, FileText, Search, TrendingUp, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

export default function RecruiterCollaborationPlatformPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="COLLABORATION PLATFORM" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Recruiter Collaboration Platform
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              RecXchange connects 15,000+ specialist recruiters to collaborate on placements. AI-powered matching, automatic contracts, and full deal protection. Built by recruiters, for recruiters.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is a recruiter collaboration platform?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A recruiter collaboration platform is a technology-driven marketplace that connects specialist recruiters so they can partner on placements. One recruiter brings a live role, another brings a matching candidate. The platform handles the matching, generates legally binding split fee agreements, and protects both parties throughout the process. RecXchange is the largest recruiter collaboration platform globally, with over 15,000 active recruiters across every sector and region.
            </p>
          </section>

          {/* How It Differs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-7 h-7 text-fuchsia-400" />
                Not a Job Board. Not LinkedIn. Something New.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                Job boards connect employers with candidates. LinkedIn connects professionals with each other. Neither solves the problem recruiters actually face: having a great candidate but no matching role, or a great role but no matching candidate.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                RecXchange connects recruiters with each other. It is a two-sided marketplace where recruiters post both roles and candidates. The Xchange Engine uses AI to match them automatically. When a match is found, both recruiters agree a fee split, sign a digital contract, and collaborate on the placement. No cold outreach. No guesswork. No risk.
              </p>
            </HolographicCard>
          </motion.div>

          {/* Key Features */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[
                { icon: Search, color: "text-cyan-400", title: "AI-powered matching", body: "The Xchange Engine scans recruiter databases in real time, identifying role-candidate matches that would take hours to find manually. You get notified when a match is ready." },
                { icon: FileText, color: "text-fuchsia-400", title: "Automatic split agreements", body: "Before any candidate or client data is shared, RecXchange generates a legally binding split fee agreement. Timestamped, stored permanently, and enforceable." },
                { icon: Shield, color: "text-purple-400", title: "Deal protection", body: "Your candidates and clients are protected by contract from the moment you agree to collaborate. No backdoor introductions, no fee disputes, no grey areas." },
                { icon: TrendingUp, color: "text-cyan-400", title: "Zero platform fee", body: "RecXchange does not take a cut of your placement fee. You keep 100% of your agreed split. The only cost is your membership subscription." }
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

          {/* Why 15,000+ Recruiters */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="purple" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-purple-400" />
                Why 15,000+ Recruiters Use RecXchange
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Recruitment is a relationship business. But even the best-connected recruiter has limits. You cannot cover every sector, every geography, and every candidate pool on your own.
                </p>
                <p>
                  RecXchange removes those limits. When you join, you gain access to a network of 15,000+ specialist recruiters, each with their own client relationships and candidate databases. That means thousands of live roles to place your candidates into, and thousands of candidates to fill your roles with.
                </p>
                <p>
                  The result is simple: more placements, faster fills, and income from deals you could never have completed alone. Every collaboration is protected by contract, so you can focus on what matters: making placements.
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* Stats Row */}
          <div className="mb-10 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
              {[
                { stat: "15,000+", label: "Active recruiters", color: "cyan" },
                { stat: "$750K+", label: "Live fees available", color: "fuchsia" },
                { stat: "$7,000", label: "Average split fee", color: "purple" }
              ].map((item) => (
                <HolographicCard key={item.label} color={item.color as 'cyan' | 'fuchsia' | 'purple'} variant="feature" className="text-center">
                  <div className={`text-3xl md:text-4xl font-black ${item.color === 'cyan' ? 'text-cyan-400' : item.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400'} mb-2`}>{item.stat}</div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                </HolographicCard>
              ))}
            </div>
          </div>

          {/* CTA */}
          <HolographicCard color="fuchsia" variant="content" className="text-center">
            <StatusBadge label="START COLLABORATING" color="fuchsia" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Join the Platform</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Post your first role or candidate today. Get matched with specialist partners. Make placements you could not make alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <GlowButton variant="primary" size="md" href="/recruiter">Join as Recruiter</GlowButton>
              <GlowButton variant="secondary" size="md" href="/collaboration">Our Philosophy</GlowButton>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
