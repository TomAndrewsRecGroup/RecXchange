"use client";
import React from 'react';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

export default function RecruiterRoles() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Recruiter Path — Role Distribution</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Post your mandates. <br/><span className="gradient-text">Tap into global delivery.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold mb-6 text-blue-400">Why post on RecXchange?</h2>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>• Instant access to verified specialist recruiters.</li>
              <li>• Full control over split percentages and terms.</li>
              <li>• Automated candidate ownership tracking.</li>
            </ul>
          </div>
          
          {/* Placeholder for your Split Fee Calculator component */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/5">
            <h2 className="text-xl font-bold mb-2">Split Fee Calculator</h2>
            <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest">Interactive Estimation</p>
            <div className="space-y-4 opacity-60 pointer-events-none">
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-2/3 bg-white/10 rounded" />
              <div className="h-10 w-full bg-blue-500/20 rounded-xl" />
            </div>
          </div>
        </div>

        <RecruiterFinalCTA />
      </div>
    </main>
  );
}
