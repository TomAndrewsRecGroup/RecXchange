"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building, HardHat, Ruler, Wrench, ArrowRight, TrendingUp } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function ConstructionSectorPage() {
  const specialisms = [
    { icon: HardHat, color: "cyan" as const, name: "Site & Project Management", roles: "Site managers, project managers, construction managers, programme managers", regions: "UK, UAE, Australia, South Africa, Saudi Arabia" },
    { icon: Ruler, color: "fuchsia" as const, name: "Quantity Surveying & Commercial", roles: "QSs, senior QSs, commercial managers, contracts managers, estimators", regions: "UK, Ireland, UAE, Australia" },
    { icon: Building, color: "purple" as const, name: "Fit Out & Residential", roles: "Fit out managers, residential site managers, finishing managers, building managers", regions: "UK, UAE, Singapore, Hong Kong" },
    { icon: Wrench, color: "cyan" as const, name: "Trades & Technical", roles: "Mechanical & electrical site supervisors, plumbers, electricians (site), HVAC engineers", regions: "UK, Ireland, Australia, UAE" }
  ];
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="SECTOR · CONSTRUCTION" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>Construction Recruitment<br /><span className="text-cyan-400">Split Fee Roles</span></h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">Project managers, QSs, site managers, estimators, and trades — live construction split fee roles on RecXchange. The built environment sector faces a chronic skills shortage globally, making collaboration between specialist recruiters essential.</p>
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
            <StatusBadge label="CONSTRUCTION ROLES LIVE NOW" color="cyan" />
            <h2 className="text-2xl font-bold text-white mt-4 mb-3">Browse Live Construction Roles</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">PMs, QSs, site managers, estimators, and trades — live split fee vacancies ready to fill.</p>
            <a href="/roles" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">View Live Roles <ArrowRight className="w-4 h-4" /></a>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
