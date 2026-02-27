'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import SendRolesForm from '@/components/send-roles-form';
import { Zap, Database, Upload, Check, Globe, Search } from 'lucide-react';

// Note: Metadata export removed - handled by layout.tsx

export default function RecruiterDiagnostic() {
  const panelVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(0, 255, 255, 0.02)",
      borderColor: "rgba(0, 255, 255, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
              Share Roles. Split Fees. Fill Roles. Get Paid.
            </span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
              What do you need <br />right now?
            </h1>
            <div className="pulse-underline mb-8 mx-auto" />
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Pick one. We'll show you how to make money from it.
            </p>
          </motion.div>
        </header>

        {/* Diagnostic Card — matching hiring-manager-home structure */}
        <section className="glass-card w-full rounded-[3rem] p-10 md:p-14 border-cyan-400/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />

          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-8">
            Select your path
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight">
            Choose the option that matches your current need:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Card A: I need candidates (Cyan) */}
            <Link href="/recruiter-roles" className="group">
              <motion.div
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-cyan-400/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-6 text-cyan-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">I need candidates</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    You have a role but no candidates. Post it. Recruiters with matching candidates partner with you. Split the fee 50/50.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "AI matches candidates to your role in seconds",
                      "All recruiters rated and reviewed by others",
                      "Your client details stay hidden until you agree"
                    ].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full py-4 rounded-xl border border-white/15 bg-black/40 overflow-hidden group/btn text-[10px] font-bold uppercase tracking-widest text-center transition-all">
                  <span className="absolute inset-[1px] rounded-xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">See How Candidates Match</span>
                </div>
              </motion.div>
            </Link>

            {/* Card B: I need roles (Fuchsia) */}
            <Link href="/recruiters-with-candidates" className="group">
              <motion.div
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-fuchsia-400/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-6 text-fuchsia-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-fuchsia-400 transition-colors">I need roles</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    You have a great candidate but no role. Post them. Recruiters with matching roles partner with you. Split the fee 50/50.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Pre-set split terms (50/50, 60/40, 70/30)",
                      "Split fee agreements auto-generated and legally binding",
                      "Candidate details hidden until you approve the match"
                    ].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-fuchsia-400 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full py-4 rounded-xl border border-white/15 bg-black/40 overflow-hidden group/btn text-[10px] font-bold uppercase tracking-widest text-center transition-all">
                  <span className="absolute inset-[1px] rounded-xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Work on Live Roles</span>
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-14 pt-10 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-gray-500">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              Switch between paths at any time.
            </p>
            <Link href="/pricing" className="text-cyan-400 hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center gap-2">
              Review Membership Tiers <span className="text-lg">→</span>
            </Link>
          </div>
        </section>

        {/* HORMOZI-STYLE COMBINED CONTENT SECTION */}
        <section className="mt-20 w-full">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/5 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-6">
              Here's What You Actually Get
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Both paths unlock the same platform
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Whether you need candidates or roles right now, you're getting the full RecXchange recruiter operating system. Here's exactly what that means.
            </p>
          </div>

          {/* Split Content: Roles vs Candidates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left: If You Need Candidates */}
            <div className="glass-card p-10 rounded-[2.5rem] border-cyan-400/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px]" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">If You Need Candidates</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Post your role with pre-agreed fee structures. Verified recruiters with matching candidates see it and partner with you. You split the work and split the fee.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Verified Roles", desc: "Broadcast roles to pre-vetted partners. Control who sees what with visibility tiers." },
                    { title: "AI Candidate Matching", desc: "AI scans and matches candidates to your role instantly, no manual searching." },
                    { title: "Unified Pipeline", desc: "Track all candidate flows from multiple partners in one dashboard." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                        <Check size={16} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: If You Need Roles */}
            <div className="glass-card p-10 rounded-[2.5rem] border-fuchsia-400/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 blur-[60px]" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-fuchsia-400">If You Need Roles</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Upload your candidates to the Xchange Engine. AI analyzes them and matches to live roles from 15,000+ recruiters. You pick which matches to pursue.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "AI-Powered Matching", desc: "Semantic matching beyond keywords. Analyzes skill fit, experience, and location." },
                    { title: "24/7 Background Scanning", desc: "Engine continuously scans for new roles as they're posted." },
                    { title: "270M Candidate Database", desc: "No candidates? Search 270 million profiles globally to find exactly who you need." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-fuchsia-400">
                        <Check size={16} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What You Get No Matter What */}
          <div className="glass-card p-12 md:p-16 rounded-[3rem] border-purple-400/10 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px]" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">What You Get <span className="gradient-text">No Matter What</span></h3>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                Both paths include full access to the recruiter operating system. ATS, CRM, AI tools, split fee protection, and collaboration infrastructure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Database, title: "Full ATS & CRM", desc: "Store candidates and clients. Track activity. Manage pipelines in one place." },
                  { icon: Zap, title: "AI Wall & Search", desc: "GPT-powered AI assistant. Semantic search across 270M profiles." },
                  { icon: Globe, title: "Split Fee Protection", desc: "Auto-generated legal agreements. Clear terms, known amounts, known dates." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 mx-auto mb-4">
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Numbers (Hormozi-Style Proof) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { value: "$7,000", label: "Avg Placement Fee", sublabel: "Your share: $3,500-$4,900" },
              { value: "15,000+", label: "Active Recruiters", sublabel: "Pre-vetted and rated" },
              { value: "270M", label: "Candidate Profiles", sublabel: "Global AI-powered search" }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl border-white/5 text-center">
                <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-white font-bold text-sm mb-1">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Final CTA Section */}
          <div className="glass-card p-12 md:p-16 rounded-[3rem] border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-cyan-500/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="gradient-text">start making placements?</span>
              </h3>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 15,000+ recruiters already using RecXchange. Average member makes 2-5 placements per quarter at $3,500-$4,900 per placement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black text-sm uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  Get Started Now
                </Link>
                <button
                  onClick={scrollToTop}
                  className="px-10 py-5 rounded-2xl border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Know Your Path?
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-8">Free to start. 150 tokens/month on Lite ($99). 400 tokens/month on Pro ($250).</p>
            </div>
          </div>
        </section>

        {/* Quick Action: Send Me 3 Roles */}
        <section className="mt-20 w-full glass-card rounded-[3rem] p-10 md:p-14 border-cyan-400/10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6">
            Quick Start
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to see live roles?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Tell us your industries and we'll send you 3 example roles that recruiters are working on right now.
          </p>
          <div className="flex justify-center">
            <SendRolesForm className="" />
          </div>
        </section>

        {/* Condensed FAQ Section */}
        <section className="mt-20 w-full space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-400">Quick answers for recruiters</p>
          </div>

          {/* Reduced to 2 questions instead of 4 */}
          <div className="glass-card p-8 rounded-3xl border-cyan-400/10">
            <h3 className="text-xl font-bold text-white mb-4">How much can I earn on RecXchange?</h3>
            <p className="text-gray-400 leading-relaxed">
              Average placement fee is <strong className="text-white">$7,000</strong>. Split 50/50 = $3,500 per placement. On RecX Direct roles, earn up to <strong className="text-white">70%</strong> = $4,900 per placement. Most active recruiters make 2-5 placements per quarter while paying $99-$250/month.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-cyan-400/10">
            <h3 className="text-xl font-bold text-white mb-4">How does the 70% split on RecX Direct work?</h3>
            <p className="text-gray-400 leading-relaxed">
              RecX Direct roles are posted by real clients. You can earn up to <strong className="text-white">70% of the placement fee</strong> (typically $4,900 on a $7,000 placement). Pro members get instant access. Lite members get access 7 days after posting.
            </p>
          </div>
        </section>

        <footer className="mt-16 w-full px-4">
          <div className="glass-card py-4 px-10 rounded-full border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            <span className="opacity-60">RecXchange Root System — Version 2026.1</span>
            <div className="flex gap-8">
              <Link href="/recruiter-roles" className="hover:text-cyan-400 transition-colors">I Need Candidates</Link>
              <Link href="/recruiters-with-candidates" className="hover:text-fuchsia-400 transition-colors">I Need Roles</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
