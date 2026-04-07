"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UserSearch, Eye, Network, Database, Globe, ArrowRight, Users, Shield } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

export default function PassiveCandidateSourcingPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="PASSIVE SOURCING" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Passive Candidate Sourcing
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              The best candidates are not on job boards. They are employed, performing well, and not actively looking. RecXchange gives you access to them through 15,000+ specialist recruiters who already have the relationships.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is passive candidate sourcing?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Passive candidate sourcing is the process of identifying and engaging professionals who are not actively searching for a new role. These candidates are typically employed and content, which makes them harder to reach but often higher quality. Specialist recruiters are the most effective passive sourcers because they have spent years building personal relationships with talent in their niche. RecXchange connects you to 15,000+ of these specialists, giving you access to passive talent pools that no job board, LinkedIn search, or single agency can match.
            </p>
          </section>

          {/* Why Passive Candidates Matter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 md:mb-16">
            <HolographicCard color="purple" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-7 h-7 text-purple-400" />
                Why Passive Candidates Are the Best Hires
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Research consistently shows that passive candidates outperform active jobseekers. They are more likely to be currently successful in their role, more selective about their next move, and less likely to leave within the first year.
                </p>
                <p>
                  The challenge is reaching them. They do not browse job boards. They rarely respond to generic InMails. The only reliable way to engage passive talent is through a recruiter who already knows them personally, someone who placed them previously, spoke to them six months ago, or has been building that relationship over years.
                </p>
                <p>
                  That is exactly what RecXchange provides: 15,000+ specialist recruiters, each with their own carefully built network of passive candidates.
                </p>
              </div>
            </HolographicCard>
          </motion.div>

          {/* How RecXchange Unlocks Passive Talent */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How RecXchange Unlocks Passive Talent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[
                { icon: Network, color: "text-cyan-400", title: "15,000+ recruiter networks", body: "Every specialist recruiter on RecXchange has their own database of candidates built through years of headhunting, relationship-building, and placements. When you post a role, dozens of specialists search their personal networks simultaneously." },
                { icon: Database, color: "text-fuchsia-400", title: "270M profile database", body: "Beyond recruiter networks, RecXchange provides access to a database of over 270 million professional profiles. This gives recruiters an additional sourcing layer for passive candidates who may not be in any single recruiter's CRM." },
                { icon: UserSearch, color: "text-purple-400", title: "AI-powered matching", body: "The Xchange Engine analyses role requirements against candidate profiles across the entire network. It identifies passive candidates who match but would never have surfaced through a job board or manual LinkedIn search." },
                { icon: Shield, color: "text-cyan-400", title: "Protected introductions", body: "Every candidate introduction is protected by a legally binding split fee agreement. Recruiters share their best passive candidates knowing they are contractually protected against backdoor hires or fee disputes." }
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

          {/* Comparison */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Globe className="w-7 h-7 text-fuchsia-400" />
                RecXchange vs LinkedIn Recruiter vs Job Boards
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-fuchsia-400/20">
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Capability</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">Job Boards</th>
                      <th className="text-left text-gray-400 font-semibold py-3 pr-6">LinkedIn Recruiter</th>
                      <th className="text-left text-gray-400 font-semibold py-3">RecXchange</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cap: "Passive candidates", board: "Very few", li: "Search only", rex: "Warm relationships" },
                      { cap: "Candidate engagement", board: "Cold applications", li: "Cold InMails", rex: "Personal recruiter calls" },
                      { cap: "Sector specialism", board: "Generic", li: "Self-serve filters", rex: "15,000+ specialists" },
                      { cap: "Database size", board: "Varies", li: "900M+ profiles", rex: "270M+ profiles + recruiter CRMs" },
                      { cap: "Response rate", board: "Low", li: "10-25% on InMail", rex: "Higher via trusted recruiters" }
                    ].map((row) => (
                      <tr key={row.cap} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white font-semibold">{row.cap}</td>
                        <td className="py-3 pr-6 text-gray-400">{row.board}</td>
                        <td className="py-3 pr-6 text-gray-400">{row.li}</td>
                        <td className="py-3 text-fuchsia-400 font-semibold">{row.rex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                LinkedIn gives you a search tool. RecXchange gives you 15,000+ specialists who already have the conversations.
              </p>
            </HolographicCard>
          </div>

          {/* For Recruiters */}
          <div className="mb-10 md:mb-16">
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-cyan-400" />
                For Recruiters: Monetise Your Passive Network
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  If you are a specialist recruiter with a strong passive candidate network, RecXchange turns that network into revenue. Browse live roles posted by other recruiters, match your passive candidates, and earn split fees on every placement.
                </p>
                <p>
                  You do not need to do any business development. You do not need a client relationship for the role. Just source, submit, and earn. Your candidates are protected by contract from the moment you agree to collaborate.
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* CTA */}
          <HolographicCard color="purple" variant="content" className="text-center">
            <StatusBadge label="ACCESS PASSIVE TALENT" color="purple" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Find the Candidates Nobody Else Can</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Whether you are a hiring manager looking for passive talent or a recruiter looking to monetise your network, RecXchange is where it happens.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <GlowButton variant="primary" size="md" href="/hiring-manager-home">Hire Passive Talent</GlowButton>
              <GlowButton variant="secondary" size="md" href="/recruiter">Join as Recruiter</GlowButton>
            </div>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
