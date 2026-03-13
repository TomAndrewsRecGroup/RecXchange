"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Brain, UserCheck, ArrowRight, TrendingUp } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function HealthcareSectorPage() {
  const specialisms = [
    { icon: Heart, color: "fuchsia" as const, name: "Nursing & Allied Health", roles: "Registered nurses, theatre nurses, ICU, paediatrics, district nursing, radiographers, physiotherapists", regions: "UK, Australia, USA, UAE" },
    { icon: Brain, color: "cyan" as const, name: "Mental Health", roles: "Psychiatrists, mental health nurses, psychologists, CAMHS, IAPT practitioners", regions: "UK, USA, Canada, Australia" },
    { icon: Activity, color: "purple" as const, name: "Clinical & Medical", roles: "GPs, consultants, locum doctors, paramedics, clinical managers, NHS executives", regions: "UK, Middle East, Australia, Africa" },
    { icon: UserCheck, color: "fuchsia" as const, name: "Social Care & Support", roles: "Social workers, care managers, support workers, OTs, residential managers", regions: "UK, Ireland, Canada, Australia" }
  ];
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="SECTOR · HEALTHCARE" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 60px rgba(236,72,153,0.3)' }}>Healthcare Recruitment<br /><span className="text-fuchsia-400">Split Fee Roles</span></h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">Live nursing, allied health, mental health, clinical, and social care roles on RecXchange. The UK faces a shortage of over 110,000 healthcare workers — collaborative recruitment is the fastest solution.</p>
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
          <HolographicCard color="purple" variant="content" className="mb-8">
            <TrendingUp className="w-6 h-6 text-purple-400 mb-3" />
            <h2 className="text-xl font-bold text-white mb-3">Healthcare Recruiters: Why Collaboration Wins</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">Healthcare is the single most candidate-short sector on the planet. No single recruiter has every specialism covered. A mental health recruiter in Manchester may have the perfect CAMHS nurse — but no open role. A clinical recruiter in London has a live NHS vacancy but no candidate in that geography. RecXchange closes that gap instantly.</p>
            <p className="text-gray-400 text-sm leading-relaxed">Average healthcare placement fee on RecXchange: <span className="text-white font-bold">$6,200</span>. RecX Direct healthcare roles pay candidate-side recruiters <span className="text-fuchsia-400 font-bold">70%</span>.</p>
          </HolographicCard>
          <HolographicCard color="fuchsia" variant="content" className="text-center">
            <StatusBadge label="HEALTHCARE ROLES LIVE NOW" color="fuchsia" />
            <h2 className="text-2xl font-bold text-white mt-4 mb-3">Browse Live Healthcare Roles</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">Access live healthcare split fee vacancies across nursing, mental health, clinical, allied health, and social care.</p>
            <a href="/roles" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 font-bold text-sm hover:bg-fuchsia-400/20 transition-all">View Live Roles <ArrowRight className="w-4 h-4" /></a>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
