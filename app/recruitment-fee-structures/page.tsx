"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, Award, Zap, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function RecruitmentFeeStructuresPage() {
  const models = [
    { icon: Clock, color: "cyan" as const, name: "Contingency", fee: "15 to 25% of salary", who: "Hiring company pays on placement", best: "Mid-level roles, volume hiring", risk: "Recruiter bears all risk, no placement, no fee", notes: "Most common model. Competitive. No upfront cost to client." },
    { icon: Award, color: "fuchsia" as const, name: "Retained Search", fee: "30 to 33% of salary (split into 3 payments)", who: "Hiring company pays in stages", best: "Senior, executive, board-level roles", risk: "Client pays upfront; recruiter is exclusive", notes: "Deep search process. Higher quality. Higher cost." },
    { icon: TrendingUp, color: "purple" as const, name: "Split Fee", fee: "Shared between two recruiters", who: "Each recruiter invoices for their split share", best: "Hard-to-fill, niche, or fast-turnaround roles", risk: "Both recruiters share risk and reward", notes: "The RecXchange model. 50/50, 60/40, or 70/30. Average $7k per placement." },
    { icon: Zap, color: "cyan" as const, name: "RecX Direct", fee: "Candidate-side recruiter earns 70%", who: "Role verified by RecXchange; client pays", best: "Urgent, high-value direct client roles", risk: "Role-side recruiter earns 30% for verified placement", notes: "Highest candidate-side earning model on the platform." }
  ];

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="FEE GUIDE" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(168,85,247,0.15)' }}>
              Recruitment Fee Structures Explained
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Contingency, retained, split fee, RPO, every recruitment fee model compared. Whether you're a recruiter choosing how to work, or a hiring manager trying to understand costs, this is your complete reference.
            </p>
          </motion.header>

          {/* Model Cards */}
          <div className="space-y-5 mb-12 md:mb-16">
            {models.map((model, i) => {
              const Icon = model.icon;
              const tc = model.color === 'cyan' ? 'text-cyan-400' : model.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400';
              return (
                <motion.div key={model.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <HolographicCard color={model.color} variant="content">
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8">
                      <div className="flex items-center gap-3 md:flex-col md:items-start">
                        <Icon className={`w-7 h-7 ${tc} flex-shrink-0`} />
                        <h2 className={`text-xl font-black ${tc}`}>{model.name}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Typical Fee</div>
                          <div className="text-white text-sm font-semibold">{model.fee}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Best For</div>
                          <div className="text-gray-300 text-sm">{model.best}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Key Note</div>
                          <div className="text-gray-400 text-sm">{model.notes}</div>
                        </div>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Comparison Table */}
          <HolographicCard color="purple" variant="content" className="mb-10 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5">At a Glance Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-400/20">
                    {["Model", "Upfront Cost", "Pay on Placement", "Exclusive?", "Best Earning (Recruiter)"].map(h => (
                      <th key={h} className="text-left text-gray-400 font-semibold py-3 pr-6 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Contingency", "None", "Yes", "No", "Medium"],
                    ["Retained", "1/3 upfront", "Final 1/3", "Yes", "High"],
                    ["Split Fee", "None", "Yes", "No", "High (shared)"],
                    ["RecX Direct", "None", "Yes", "No", "Highest (70%)"],
                  ].map(([model, upfront, pop, excl, earn]) => (
                    <tr key={model} className="border-b border-white/5">
                      <td className="py-3 pr-6 text-white font-semibold">{model}</td>
                      <td className="py-3 pr-6 text-gray-400">{upfront}</td>
                      <td className="py-3 pr-6 text-gray-400">{pop}</td>
                      <td className="py-3 pr-6 text-gray-400">{excl}</td>
                      <td className={`py-3 font-semibold ${earn === 'Highest (70%)' ? 'text-cyan-400' : 'text-gray-300'}`}>{earn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </HolographicCard>

          {/* CTA */}
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="MAXIMIZE YOUR FEES" color="cyan" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Earn More Per Placement on RecXchange</h2>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">Access split fee roles with average $7,000 fees. Earn up to 70% on RecX Direct placements. Zero platform cut.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">
              View Pricing <ArrowRight className="w-4 h-4" />
            </a>
          </HolographicCard>

        </div>
      </div>
    </main>
  );
}
