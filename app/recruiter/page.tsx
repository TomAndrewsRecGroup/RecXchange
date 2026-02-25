import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recruiter Collaboration Platform | RecXchange - Split Fees, Share Roles",
  description: "Join 15,000+ recruiters partnering on placements. Post roles to find candidates or share candidates to find roles. Split fees 50/50, 60/40, or 70/30. AI-powered matching with 270M candidates.",
  keywords: [
    "recruiter collaboration",
    "split fee recruitment",
    "fee share recruitment",
    "recruiter partnership platform",
    "collaborative recruitment",
    "recruitment fee split",
    "recruiter network",
    "candidate sharing",
    "role sharing recruitment"
  ],
  openGraph: {
    title: "Recruiter Collaboration Platform | RecXchange",
    description: "Join 15,000+ recruiters partnering on placements. Split fees automatically. Post roles or share candidates.",
    url: "https://recxchange.io/recruiter",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Recruiter Platform"
    }]
  },
  alternates: {
    canonical: "https://recxchange.io/recruiter"
  }
};

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

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">
              Share Roles. Split Fees. Fill Roles. Get Paid.
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-[27px] tracking-tight leading-tight">
            What do you need <br />
            <span className="gradient-text">right now?</span>
          </h1>
          <div className="pulse-underline mt-4 mx-auto" />
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Pick one. We'll show you how to make money from it.
          </p>
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
