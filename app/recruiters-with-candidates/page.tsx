"use client";
import React from "react";
import { Database, Search, Zap, Cpu, Bell, Globe } from "lucide-react";

export default function RecruiterCandidatesPage() {
  return (
    <div className="w-full pb-20 pt-10 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#312fd7] mb-4">
          Monetize Your Database
        </h3>
        <h1 className="text-5xl font-bold mb-6 italic">
          AI-Powered <span className="gradient-text">Candidate Matching</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Stop letting your goldmine of candidates gather dust. Share your database with the Xchange Engine and let our AI find the roles they were meant for.
        </p>
      </div>

      {/* Main Feature: The Database Sync */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="glass-card p-12 rounded-[3rem] border-l-4 border-[#312fd7] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Database size={200} />
          </div>
          <h2 className="text-3xl font-bold mb-6">
            Utilize Your Existing <span className="text-[#312fd7]">Database</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The Xchange Engine automatically analyzes your CVs and profiles to extract meaningful insights like skill compatibility, career trajectory, and industry relevance. It then matches these candidates across multiple dimensions to the best-suited roles on the platform.
          </p>
          <ul className="space-y-4">
            {[
              "Semantic matching beyond simple keywords",
              "Continuous 24/7 background scanning",
              "Instant notifications for high-quality role matches"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <Zap size={16} className="text-[#312fd7]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Proof: The Match Screenshot */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#312fd7] to-[#c71df1] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic">Xchange Engine — AI Match Analysis</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>
            <img 
              src="/match.png" 
              alt="System Match Interface" 
              className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Trust Cards: Analysis & Discovery */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-[#c71df1]">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Multi-Dimensional Analysis</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Our AI evaluates candidates based on location fit, experience alignment, and work model preferences (remote/hybrid) to ensure every match is viable.
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-white">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Automated Discovery</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                The engine re-calculates matches dynamically as new roles are added, ensuring your candidates never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative: The 270M Candidate Search */}
      <div className="glass-card p-12 lg:p-20 rounded-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c71df1]/5 to-transparent pointer-events-none" />
        <Globe className="mx-auto text-[#c71df1] mb-8 opacity-50" size={64} />
        <h2 className="text-4xl font-bold mb-6">
          No Candidates? <span className="gradient-text">No Problem.</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          If your internal database doesn't have the right fit, tap into our global AI search engine. Access over **270 million candidate profiles** instantly to find exactly who you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
            <Search size={18} /> Start AI Search
          </button>
          <button className="px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all">
            Upload Database
          </button>
        </div>
      </div>
    </div>
  );
}
