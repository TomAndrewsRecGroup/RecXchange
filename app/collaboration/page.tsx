"use client";
import React from "react";
import { Zap, Cpu, Target } from "lucide-react";
import { motion } from 'framer-motion';

export default function CollaborationPage() {
  return (
    <div className="pb-20 pt-24 px-6 max-w-7xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            The RecXchange Engine
          </span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
            Split Fees. Zero Friction.
          </h1>
          <div className="pulse-underline mb-8 mx-auto" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            RecXchange isn't just a marketplace; it's a high-performance engine designed to protect your deals and automate your matchmaking.
          </p>
        </motion.div>
      </div>

      {/* The Split Logic */}
      <div className="grid md:grid-cols-2 gap-12 mb-32">
        <div className="glass-card p-10 rounded-3xl border-t-4 border-cyan-500">
          <h2 className="text-3xl font-bold mb-4">50/50 Standard</h2>
          <p className="text-gray-500 mb-6">The classic collaboration model. You bring the candidate, they bring the role (or vice versa). Our engine handles the legal framework so you can focus on the placement.</p>
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-400/20">Standard Xchange</div>
        </div>

        <div className="glass-card p-10 rounded-3xl border-t-4 border-fuchsia-500">
          <h2 className="text-3xl font-bold mb-4">Up to 70% Retained</h2>
          <p className="text-gray-500 mb-6">Work on high-priority <strong className="text-white">RecXDirect</strong> roles verified by our team. These roles offer aggressive splits for recruiters who deliver speed and quality.</p>
          <div className="inline-block px-4 py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-bold border border-fuchsia-400/20">RecXDirect Access</div>
        </div>
      </div>

      {/* Xchange Engine Section */}
      <div className="relative overflow-hidden glass-card rounded-[3rem] p-12 lg:p-20 border-cyan-400/10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-fuchsia-400 mb-4">The Heavy Lifting</h3>
            <h2 className="text-4xl font-bold mb-6">Proprietary <span className="gradient-text">Xchange Engine</span></h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Stop digging through spreadsheets. Our AI-powered candidate-role matching system operates 24/7 in the background to surface the perfect placement.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Target className="text-cyan-400" />, title: "Semantic Matching", desc: "We look beyond keywords to understand experience, career trajectory, and industry relevance." },
                { icon: <Zap className="text-fuchsia-400" />, title: "Instant Notifications", desc: "Get alerted the second a high-quality match enters the engine." },
                { icon: <Cpu className="text-white" />, title: "Continuous Scanning", desc: "The engine never sleeps, re-ranking your entire database as new roles go live." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl border-cyan-400/10 bg-white/[0.01]">
            <h4 className="font-mono text-[10px] text-gray-500 uppercase mb-4">Engine Impact</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-cyan-400/10 pb-2">
                <span className="text-sm text-gray-400">Search Time Reduction</span>
                <span className="text-2xl font-bold text-fuchsia-400">80%</span>
              </div>
              <div className="flex justify-between items-end border-b border-cyan-400/10 pb-2">
                <span className="text-sm text-gray-400">Database Utilization</span>
                <span className="text-2xl font-bold text-cyan-400">100%</span>
              </div>
              <div className="flex justify-between items-end border-b border-cyan-400/10 pb-2">
                <span className="text-sm text-gray-400">Time-to-Fill</span>
                <span className="text-2xl font-bold text-white">Instant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
