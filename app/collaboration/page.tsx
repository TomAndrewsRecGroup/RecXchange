"use client";
import React from "react";
import { Zap, ShieldCheck, Cpu, Target } from "lucide-react";

export default function CollaborationPage() {
  return (
    <div className="pb-20 pt-10 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6 italic">Split Fees. <span className="gradient-text">Zero Friction.</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          RecXchange isn't just a marketplace; it's a high-performance engine designed to protect your deals and automate your matchmaking.
        </p>
      </div>

      {/* The Split Logic */}
      <div className="grid md:grid-cols-2 gap-12 mb-32">
        <div className="glass-card p-10 rounded-3xl border-t-4 border-[#312fd7]">
          <h2 className="text-3xl font-bold mb-4">50/50 Standard</h2>
          <p className="text-gray-500 mb-6">The classic collaboration model. You bring the candidate, they bring the role (or vice versa). Our engine handles the legal framework so you can focus on the placement.</p>
          <div className="inline-block px-4 py-2 rounded-full bg-[#312fd7]/20 text-[#312fd7] font-bold">Standard Xchange</div>
        </div>

        <div className="glass-card p-10 rounded-3xl border-t-4 border-[#c71df1]">
          <h2 className="text-3xl font-bold mb-4">Up to 70% Retained</h2>
          <p className="text-gray-500 mb-6">Work on high-priority **RecXDirect** roles verified by our team. These roles offer aggressive splits for recruiters who deliver speed and quality.</p>
          <div className="inline-block px-4 py-2 rounded-full bg-[#c71df1]/20 text-[#c71df1] font-bold">RecXDirect Access</div>
        </div>
      </div>

      {/* The AI Matchmaking Section (Xchange Engine) */}
      <div className="relative overflow-hidden glass-card rounded-[3rem] p-12 lg:p-20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#c71df1]/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c71df1] mb-4">The Heavy Lifting</h3>
            <h2 className="text-4xl font-bold mb-6">Proprietary <span className="gradient-text">Xchange Engine</span></h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Stop digging through spreadsheets. Our AI-powered candidate-role matching system operates 24/7 in the background to surface the perfect placement.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Target className="text-[#312fd7]" />, title: "Semantic Matching", desc: "We look beyond keywords to understand experience, career trajectory, and industry relevance." },
                { icon: <Zap className="text-[#c71df1]" />, title: "Instant Notifications", desc: "Get alerted the second a high-quality match enters the engine." },
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

          <div className="glass-card p-8 rounded-2xl border-white/5 bg-white/[0.01]">
             <h4 className="font-mono text-[10px] text-gray-500 uppercase mb-4">Engine Impact</h4>
             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-sm text-gray-400">Search Time Reduction</span>
                  <span className="text-2xl font-bold text-[#c71df1]">80%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-sm text-gray-400">Database Utilization</span>
                  <span className="text-2xl font-bold text-[#312fd7]">100%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
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
