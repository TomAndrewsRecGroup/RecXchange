'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Note: Metadata export removed - now handled by layout.tsx in this directory

export default function ResearchPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Platform Statistics & Research Data
          </span>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
            RecXchange By The Numbers
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Real data from our growing global recruitment network. These statistics reflect live roles, active recruiters, and real earning potential across our platform.
          </p>
        </motion.header>

        {/* Key Platform Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="glass-card p-8 rounded-3xl border-cyan-400/10 text-center">
            <div className="text-5xl font-bold gradient-text mb-3">70%</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Average Recruiter Split</div>
            <p className="text-xs text-gray-500 mt-3">On RecX Direct placements</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border-cyan-400/10 text-center">
            <div className="text-5xl font-bold gradient-text mb-3">$7,000</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Average Placement Fee</div>
            <p className="text-xs text-gray-500 mt-3">Across 100+ live roles</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border-cyan-400/10 text-center">
            <div className="text-5xl font-bold gradient-text mb-3">$750K</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Total Available Fees</div>
            <p className="text-xs text-gray-500 mt-3">For recruiters to earn</p>
          </div>
        </section>

        {/* Geographic Distribution */}
        <section className="glass-card p-10 rounded-3xl border-cyan-400/10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Global Role Distribution</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            RecXchange connects recruiters and hiring managers across six continents. Our platform hosts live roles from multiple markets, creating cross-border collaboration opportunities.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { region: 'United Kingdom', flag: '🇬🇧' },
              { region: 'United States', flag: '🇺🇸' },
              { region: 'Europe', flag: '🇪🇺' },
              { region: 'Africa', flag: '🌍' },
              { region: 'Middle East', flag: '🌐' },
              { region: 'Australia', flag: '🇦🇺' }
            ].map((location, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <div className="text-3xl mb-2">{location.flag}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">{location.region}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Coverage */}
        <section className="glass-card p-10 rounded-3xl border-cyan-400/10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Industries Covered</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            From technical engineering roles to executive healthcare positions, RecXchange serves diverse industries with specialized recruitment needs.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { industry: 'Engineering', icon: '⚙️' },
              { industry: 'Healthcare', icon: '🏥' },
              { industry: 'Technology', icon: '💻' },
              { industry: 'Human Resources', icon: '👥' },
              { industry: 'Sales', icon: '📊' },
              { industry: 'Finance', icon: '💰' },
              { industry: 'Legal', icon: '⚖️' },
              { industry: 'Marketing', icon: '📱' }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm text-gray-300 font-bold">{item.industry}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Split Distribution */}
        <section className="glass-card p-10 rounded-3xl border-cyan-400/10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Recruiter Earning Potential</h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.02]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">RecX Direct Roles</h3>
                <span className="text-cyan-400 font-bold text-2xl">70%</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Average recruiter split on RecX Direct placements. With a $7,000 average fee, recruiters earn approximately <strong className="text-white">$4,900 per placement</strong>.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Instant access for Pro members ($250/month)
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-fuchsia-400/10 bg-fuchsia-400/[0.02]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">Collaborative Roles</h3>
                <span className="text-fuchsia-400 font-bold text-2xl">50%</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Standard split on recruiter-to-recruiter collaboration. With a $7,000 average fee, each partner earns <strong className="text-white">$3,500 per placement</strong>.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400"></span>
                Available to all tiers including Entry ($1/month)
              </div>
            </div>
          </div>
        </section>

        {/* Live Roles Summary */}
        <section className="glass-card p-10 rounded-3xl border-cyan-400/10">
          <h2 className="text-3xl font-bold text-white mb-8">Platform Activity Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Role Volume</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">100+ live roles</strong> currently available on the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">$750,000</strong> in total placement fees available for recruiters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Roles span <strong className="text-white">6 geographic regions</strong> and <strong className="text-white">8+ industries</strong></span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fuchsia-400 mb-4">Recruiter Benefits</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-fuchsia-400 mt-1">•</span>
                  <span><strong className="text-white">70% average split</strong> on RecX Direct roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-fuchsia-400 mt-1">•</span>
                  <span><strong className="text-white">$7,000 average fee</strong> per successful placement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-fuchsia-400 mt-1">•</span>
                  <span><strong className="text-white">No platform fees</strong> on placements (keep 100% of your split)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Statistics are based on live roles and active placements on the RecXchange platform as of February 2026. 
            Average fees and splits may vary by role, industry, and geographic location. Platform is actively growing with new roles and recruiters joining daily.
          </p>
        </div>
      </div>
    </main>
  );
}
