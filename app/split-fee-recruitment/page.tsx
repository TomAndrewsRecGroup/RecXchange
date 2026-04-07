"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Split, Users, Shield, DollarSign, TrendingUp, ArrowRight, CheckCircle, FileText } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

export default function SplitFeeRecruitmentPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="SPLIT FEE RECRUITMENT" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Split Fee Recruitment
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Two recruiters collaborate on one placement. One has the role, the other has the candidate. They agree a split, make the placement, and both earn. RecXchange is where 15,000+ recruiters do this every day.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is split fee recruitment?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Split fee recruitment is a collaborative model where two specialist recruiters work together on a single vacancy and divide the placement fee when the candidate is hired. One recruiter owns the client relationship and the role. The other has a matching candidate ready to go. They lock in a split percentage, typically 50/50, 60/40, or 70/30, before sharing any private information. It is the fastest-growing placement model in recruitment, and RecXchange is the platform where it happens at scale.
            </p>
          </section>

          {/* What It Is */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Split className="w-7 h-7 text-cyan-400" />
                How Split Fee Recruitment Works
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                The concept is straightforward. A recruiter with a live role posts it on RecXchange. The platform&apos;s Xchange Engine scans 15,000+ recruiter candidate databases and identifies potential matches. A second recruiter with a suitable candidate expresses interest. Both parties review the opportunity, agree a fee split, and sign a digital agreement before any candidate details are exchanged.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Once the candidate is submitted, interviewed, and placed, each recruiter invoices for their agreed share. RecXchange takes zero platform cut. You keep 100% of your split.
              </p>
            </HolographicCard>
          </motion.div>

          {/* Who It's For */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Who Uses Split Fee Recruitment?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[
                { icon: Users, color: "text-cyan-400", title: "Role-side recruiters", body: "You have live roles but your candidate pipeline is thin. Rather than losing the placement or letting the role go cold, you bring in a specialist sourcer who already has the right person." },
                { icon: TrendingUp, color: "text-fuchsia-400", title: "Candidate-side recruiters", body: "You have strong candidates but no matching live vacancy. Instead of waiting for new business, you browse live roles posted by other recruiters and place your candidates immediately." },
                { icon: Shield, color: "text-purple-400", title: "Independent and boutique agencies", body: "Smaller agencies cannot cover every sector. Split fees let you serve your clients across specialisms you do not cover in-house, without turning work away." },
                { icon: DollarSign, color: "text-cyan-400", title: "Recruiters at capacity", body: "You have more roles than you can work. Rather than letting vacancies sit unworked, you open them to trusted partners. 50% of a fee is better than 0%." }
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

          {/* Why It's Growing */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-fuchsia-400" />
                Why Split Fee Recruitment Is Growing
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The recruitment industry is shifting. Clients expect faster fills, deeper specialism, and broader reach. No single recruiter can deliver all three on every role. Split fee recruitment solves this by connecting specialists who complement each other.
                </p>
                <p>
                  The model has existed for decades, but it was always held back by trust issues and lack of infrastructure. Recruiters had no reliable way to find partners, agree terms, or protect their candidates. RecXchange changed that by building the contracts, matching, and protection layer that the industry needed.
                </p>
                <p>
                  Today, over 15,000 recruiters use RecXchange to split fees. The average placement fee on the platform is $7,000, and the total value of live fees available at any time exceeds $750,000.
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* How RecXchange Makes It Simple */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How RecXchange Makes It Simple</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                { step: "01", color: "cyan", icon: Users, title: "AI-powered matching", body: "The Xchange Engine scans thousands of recruiter databases and flags the best role-candidate matches automatically. No manual searching required." },
                { step: "02", color: "fuchsia", icon: FileText, title: "Automatic contracts", body: "Before any private data is shared, RecXchange generates a legally binding split fee agreement. Timestamped, stored permanently, and enforceable." },
                { step: "03", color: "purple", icon: Shield, title: "Full deal protection", body: "Your candidates and your clients are protected from the moment you agree to collaborate. No backdoor introductions. No fee disputes. Everything is on record." }
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

          {/* Deep Dive Link */}
          <div className="mb-10 md:mb-16 text-center">
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              Want a deeper breakdown of how split fees work, including fee structures and real examples?
            </p>
            <Link href="/blog/what-is-split-fee-recruitment" className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors">
              Read the full guide: What Is Split Fee Recruitment? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CTA */}
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="JOIN 15,000+ RECRUITERS" color="cyan" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Start Splitting Fees Today</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Browse live roles, post your candidates, and collaborate with specialist recruiters across every sector and region. Contracts generated automatically. Fees protected.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <GlowButton variant="primary" size="md" href="/recruiter">Join as Recruiter</GlowButton>
              <GlowButton variant="secondary" size="md" href="/what-is-split-fee-recruitment">How Split Fees Work</GlowButton>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
