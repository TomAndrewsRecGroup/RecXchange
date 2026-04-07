"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart, Shield, ArrowRight } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function FinanceSectorPage() {
  const specialisms = [
    { icon: DollarSign, color: "cyan" as const, name: "Senior Finance", roles: "CFOs, FDs, Group Finance Directors, VP Finance, Heads of Finance", regions: "UK, USA, UAE, Switzerland, Singapore" },
    { icon: BarChart, color: "fuchsia" as const, name: "Management Accounting", roles: "Management accountants, financial controllers, FP&A analysts, commercial finance managers", regions: "UK, Ireland, USA, Australia" },
    { icon: Shield, color: "purple" as const, name: "Risk, Audit & Compliance", roles: "Internal auditors, risk managers, compliance officers, financial crime analysts", regions: "UK, USA, Luxembourg, Hong Kong, UAE" },
    { icon: TrendingUp, color: "cyan" as const, name: "Fintech & Banking", roles: "Fintech product managers, investment analysts, derivatives traders, quantitative analysts", regions: "UK, USA, Germany, Singapore, Dubai" }
  ];
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="SECTOR · FINANCE" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 20px rgba(168,85,247,0.15)' }}>Finance Recruitment<br /><span className="text-purple-400">Split Fee Roles</span></h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">Live CFO, FD, financial controller, management accounting, risk, audit, and fintech roles. Average finance placement on RecXchange: $9,200. RecX Direct finance roles pay 70% to the candidate-side recruiter.</p>
          </motion.header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {specialisms.map((s, i) => { const Icon = s.icon; const tc = s.color === 'cyan' ? 'text-cyan-400' : s.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-purple-400'; return (
              <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <HolographicCard color={s.color} variant="feature">
                  <Icon className={`w-6 h-6 ${tc} mb-3`} />
                  <h2 className="text-lg font-bold text-white mb-2">{s.name}</h2>
                  <p className="text-gray-400 text-xs mb-2"><span className="text-gray-500">Roles:</span> {s.roles}</p>
                  <p className="text-gray-400 text-xs"><span className="text-gray-500">Regions:</span> {s.regions}</p>
                </HolographicCard>
              </motion.div>
            ); })}
          </div>
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="FINANCE ROLES LIVE NOW" color="purple" />
            <h2 className="text-2xl font-bold text-white mt-4 mb-3">Browse Live Finance Roles</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">CFOs, FDs, controllers, fintech, risk and audit, live split fee vacancies ready to fill.</p>
            <a href="/roles" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-400 font-bold text-sm hover:bg-purple-400/20 transition-all">View Live Roles <ArrowRight className="w-4 h-4" /></a>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
