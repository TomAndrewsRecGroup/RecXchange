"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Shield, BarChart, ArrowRight, TrendingUp } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';

export default function TechnologySectorPage() {
  const specialisms = [
    { icon: Code, color: "cyan" as const, name: "Software Engineering", roles: "Frontend, backend, full-stack, mobile, ML engineers, architects, engineering managers", regions: "UK, USA, Germany, Netherlands, Canada, Australia" },
    { icon: Server, color: "purple" as const, name: "DevOps & Cloud", roles: "DevOps engineers, SRE, cloud architects (AWS, Azure, GCP), platform engineers", regions: "UK, USA, India, Australia, Singapore" },
    { icon: Shield, color: "fuchsia" as const, name: "Cybersecurity", roles: "Security analysts, pentesters, CISOs, SOC analysts, GRC specialists, infosec architects", regions: "UK, USA, UAE, Singapore, Australia" },
    { icon: BarChart, color: "cyan" as const, name: "Data & AI", roles: "Data scientists, ML engineers, data engineers, analytics leads, AI product managers", regions: "UK, USA, Germany, Canada, Singapore" }
  ];
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-14 mt-6">
            <StatusBadge label="SECTOR · TECHNOLOGY" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>Technology Recruitment<br /><span className="text-cyan-400">Split Fee Roles</span></h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">Live software engineering, DevOps, data, cybersecurity, and product roles available now. Tech is the most in-demand sector globally, and split fee collaboration gets the right candidates to the right roles faster than any job board.</p>
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
            <h2 className="text-xl font-bold text-white mb-3">Why Tech Recruiters Choose RecXchange</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">Tech candidates are the most hotly contested in recruitment. The best engineers are off the market in hours. RecXchange's Xchange Engine gives tech recruiters access to a peer network of 15,000+ specialists who are often sitting on exactly the candidate you need, before they ever hit LinkedIn.</p>
            <p className="text-gray-400 text-sm leading-relaxed">Average tech placement fee on RecXchange: <span className="text-white font-bold">$9,500</span>. RecX Direct tech roles pay candidate-side recruiters <span className="text-fuchsia-400 font-bold">70%</span>.</p>
          </HolographicCard>
          <HolographicCard color="cyan" variant="content" className="text-center">
            <StatusBadge label="TECH ROLES LIVE NOW" color="cyan" />
            <h2 className="text-2xl font-bold text-white mt-4 mb-3">Browse Live Technology Roles</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">Software, DevOps, data, cybersecurity, product, live split fee vacancies ready to fill.</p>
            <a href="/roles" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm hover:bg-cyan-400/20 transition-all">View Live Roles <ArrowRight className="w-4 h-4" /></a>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
