'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import type { Metadata } from 'next';

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { number: '15,000+', desc: 'Recruiters onboarded' },
  { number: '£750k+', desc: 'Active placement fees' },
  { number: '240+', desc: 'Live matches created' },
  { number: '178', desc: 'Countries represented' },
  { number: '< 6 weeks', desc: 'To reach scale' },
];

const problemCards = [
  {
    title: 'Recruiters already collaborate',
    items: [
      'Informal splits happen constantly',
      'Via WhatsApp, email, personal networks',
      'Manual, untracked, and unenforceable',
      'Cannot scale beyond personal relationships',
    ],
    color: 'cyan' as const,
  },
  {
    title: 'No platform exists for this',
    items: [
      "ATS / CRM tools don't facilitate collaboration",
      'Job boards serve clients, not recruiters',
      'AI tools replace recruiters, not coordinate them',
      'No neutral trust layer for cross-agency splits',
    ],
    color: 'fuchsia' as const,
  },
];

const steps = [
  {
    num: 1,
    title: 'Get Verified',
    body: 'Identity confirmed via LinkedIn and Stripe Identity. Trust is established before access is granted.',
  },
  {
    num: 2,
    title: 'Share',
    body: 'Recruiters add live roles and warm candidates to the Xchange Engine. Everything is consent-based and private until terms are agreed.',
  },
  {
    num: 3,
    title: 'Match',
    body: 'AI matches candidates to roles across the network without exposing CVs or client names.',
  },
  {
    num: 4,
    title: 'Agree Terms',
    body: 'A Split Fee Agreement is signed before any data is shared — stating the split, the fee, and the payment date.',
  },
  {
    num: 5,
    title: 'Place & Compound',
    body: 'Placements are made, outcomes recorded, and reputation builds. Warm candidates no longer go cold — they compound across the network.',
  },
];

const traction = [
  {
    title: 'Network growth',
    items: [
      '15,000+ recruiters onboarded',
      'Across 178 countries',
      '~12% daily active users',
      'Organic growth — no paid acquisition at scale',
    ],
    color: 'cyan' as const,
  },
  {
    title: 'Platform activity',
    items: [
      '240+ live recruiter-to-recruiter matches',
      '£750k+ in active placement fees inside the network',
      '£140k in split fees on public roles',
      '£1.2M+ projected throughput for Q1 2025',
    ],
    color: 'purple' as const,
  },
];

const marketCards = [
  { num: '$600B+', label: 'Global recruitment market (Staffing Industry Analysts)' },
  { num: '2–3M+', label: 'Independent & freelance recruiters globally' },
  { num: '$50B+', label: 'Addressable split-fee & collaborative hiring infrastructure' },
  { num: '~8–10%', label: 'Of global recruitment fees in collaborative/split-fee activity' },
];

const askItems = [
  {
    amount: '£400k',
    purpose: 'Global Core — platform engineering, trust architecture, mobile apps, compliance & GTM',
    color: 'cyan' as const,
  },
  {
    amount: '£400k',
    purpose: 'RecX Direct city hubs — US & Europe — enterprise role acquisition, no recruiter payroll',
    color: 'purple' as const,
  },
  {
    amount: '£200k',
    purpose: 'Marketing — recruiter density, enterprise demand generation, brand and distribution',
    color: 'fuchsia' as const,
  },
];

const teamMembers = [
  {
    name: 'Tom Andrews',
    role: 'CEO & Co-Founder',
    items: [
      '14+ years in agency & enterprise recruitment',
      'Ex Reed, HSBC',
      'Originated RecXchange from first-hand yield loss',
      'Leads growth, brand, and enterprise demand',
    ],
    color: 'cyan' as const,
  },
  {
    name: 'James Brown',
    role: 'CTO & Co-Founder',
    items: [
      'Designed and built RecXchange in under 6 months',
      'Scaled previous business from £1M → £5M revenue',
      'Sole architect, developer, and product owner',
      'Owns platform reliability and trust architecture',
    ],
    color: 'purple' as const,
  },
  {
    name: 'Lucinda Reader',
    role: 'Head of RecX Direct',
    items: [
      'Senior HR & recruitment leadership',
      'Ex Harrods, Metro Bank, KPMG',
      'Expert in regulated, high-trust hiring systems',
      'Leads enterprise client relationships',
    ],
    color: 'fuchsia' as const,
  },
];

// ─── Color helper ────────────────────────────────────────────────────────────

const glowColors = {
  cyan:    { border: 'border-cyan-400/40',    text: 'text-cyan-300',    bg: 'bg-cyan-400/10',    num: 'text-cyan-300'    },
  purple:  { border: 'border-purple-400/40',  text: 'text-purple-300',  bg: 'bg-purple-400/10',  num: 'text-purple-300'  },
  fuchsia: { border: 'border-fuchsia-400/40', text: 'text-fuchsia-300', bg: 'bg-fuchsia-400/10', num: 'text-fuchsia-300' },
  emerald: { border: 'border-emerald-400/40', text: 'text-emerald-300', bg: 'bg-emerald-400/10', num: 'text-emerald-300' },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400 mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-5 leading-tight tracking-tight">
      {children}
    </h2>
  );
}

function AccentText({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>;
}

function YieldPill({
  label,
  highlight = false,
  tooltip,
}: {
  label: string;
  highlight?: boolean;
  tooltip?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close on outside click (mobile)
  const handleOutside = useCallback((e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [open, handleOutside]);

  return (
    <span
      ref={ref}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
        highlight
          ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
          : 'bg-white/5 border-white/15 text-gray-400'
      }`}
    >
      {label}

      {tooltip && (
        <span className="group/tip relative inline-flex items-center">
          {/* ? button */}
          <button
            type="button"
            aria-label={`Info: ${label}`}
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none border transition-colors cursor-pointer select-none
              ${
                highlight
                  ? 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20'
                  : 'border-white/20 text-gray-500 hover:border-white/40 hover:text-gray-300'
              }`}
          >
            ?
          </button>

          {/* Desktop hover tooltip */}
          <span
            className="pointer-events-none hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 px-3 py-2 rounded-lg text-xs text-gray-200 leading-relaxed
              opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 z-50"
            style={{
              background: 'rgba(10,10,20,0.96)',
              border: '1px solid rgba(0,240,255,0.25)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,240,255,0.08)',
            }}
            role="tooltip"
          >
            {tooltip}
            {/* Arrow */}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid rgba(0,240,255,0.25)',
              }}
            />
          </span>

          {/* Mobile tap tooltip */}
          {open && (
            <span
              className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 px-3 py-2 rounded-lg text-xs text-gray-200 leading-relaxed z-50"
              style={{
                background: 'rgba(10,10,20,0.98)',
                border: '1px solid rgba(0,240,255,0.3)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.1)',
              }}
              role="tooltip"
            >
              {tooltip}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid rgba(0,240,255,0.3)',
                }}
              />
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function YieldArrow() {
  return <span className="text-gray-600 text-lg font-bold">→</span>;
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function InvestorOnePager() {
  return (
    <main className="relative bg-[#050508] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 text-center border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <StatusBadge label="Seed Round · Investor Overview" color="cyan" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,6vw,4rem)] font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            The <AccentText>trust layer</AccentText> for
            <br className="hidden sm:block" /> global recruiter collaboration.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-8"
          >
            RecXchange is the operating system for recruiter-to-recruiter split-fee collaboration.
            Live. Growing. Revenue inside the network from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(168,85,247,0.15))',
              border: '1px solid rgba(0,240,255,0.4)',
              boxShadow: '0 0 40px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              color: '#00f0ff',
            }}
          >
            £1M · 8% Equity · 24-Month Runway
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-8 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.desc}
                variants={fadeUp}
                custom={i}
                className="text-center px-2"
              >
                <div
                  className="text-2xl sm:text-3xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.number}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Problem</SectionLabel>
              <SectionHeading>
                Recruitment isn't demand constrained.
                <br />
                <AccentText>It's yield constrained.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                A recruiter puts ten screened candidates forward for a role. One gets hired. Nine go cold — still valuable, still warm, but trapped inside one agency's system.
              </p>
            </motion.div>

            {/* Yield flow */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
              <YieldPill label="20 outreach" tooltip="Candidates approached by the recruiter, or who applied directly for the role." />
              <YieldArrow />
              <YieldPill label="10 screened" tooltip="Candidates who passed initial screening calls — qualified against the role's key criteria." />
              <YieldArrow />
              <YieldPill label="5 submitted" tooltip="Shortlisted CVs formally submitted to the hiring client for review." />
              <YieldArrow />
              <YieldPill label="1 hired" tooltip="The single candidate who receives and accepts the job offer." />
              <YieldArrow />
              <YieldPill label="9 wasted" highlight tooltip="The remaining 9 screened, qualified candidates — still warm, still valuable — but siloed inside one agency's system with nowhere to go." />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-lg font-black text-red-400 tracking-wide">YIELD: 1 of 10</span>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {problemCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`rounded-xl border p-6 ${glowColors[card.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${glowColors[card.color].text}`}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          card.color === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── SOLUTION ────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Solution</SectionLabel>
              <SectionHeading>
                The missing trust layer.
                <br />
                <AccentText>Now live.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange is the neutral operating system that lets recruiters safely share roles and warm candidates, agree structured split-fee terms, and place together — with identity verified, ownership recorded, and payment terms agreed before any data is shared.
              </p>
            </motion.div>

            {/* Solution yield flow */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
              <YieldPill label="9 warm candidates" tooltip="The 9 qualified candidates from the problem flow — already screened and ready, just without a matching role at their original agency." />
              <YieldArrow />
              <YieldPill label="Xchange Engine" highlight tooltip="RecXchange's AI matching layer — anonymously maps candidates to live roles across the network without exposing CVs or client names until terms are agreed." />
              <YieldArrow />
              <YieldPill label="AI match to 9 roles" tooltip="Each warm candidate is matched to a live role held by a different recruiter in the network — creating 9 new potential placements from candidates that would otherwise go cold." />
              <YieldArrow />
              <YieldPill label="Split fee agreed" tooltip="A legally binding Split Fee Agreement is signed by both recruiters before any candidate data or client details are shared — protecting both parties." />
              <YieldArrow />
              <YieldPill label="9 placements" highlight tooltip="Every qualified candidate finds a placement. The original recruiter earns a split fee on each — turning 9 wasted outcomes into 9 revenue events." />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-lg font-black text-cyan-400 tracking-wide">YIELD: 10 of 10</span>
            </motion.div>

            {/* Steps */}
            <motion.div variants={stagger} className="space-y-4 mt-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 items-start p-4 rounded-xl border border-white/[0.06] hover:border-cyan-400/20 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-black"
                    style={{
                      background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                      boxShadow: '0 0 16px rgba(0,240,255,0.3)',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── TRACTION ────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Traction</SectionLabel>
              <SectionHeading>
                Live network. <AccentText>Real economic throughput.</AccentText>
                <br />First 6 weeks.
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange went live in November 2024. Recruitment cycles typically complete in ~90 days — the platform is still inside its first full placement cycle.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {traction.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`rounded-xl border p-6 ${glowColors[card.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${glowColors[card.color].text}`}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          card.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote block */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-cyan-400/20 p-5"
              style={{ background: 'rgba(0,240,255,0.04)' }}
            >
              <p className="text-white italic text-base mb-2">
                "5 matched candidates submitted to a live role in under 30 minutes."
              </p>
              <p className="text-gray-500 text-xs">Real outcome on the live platform.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── BUSINESS MODEL ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Business Model</SectionLabel>
              <SectionHeading>
                Revenue scales with placements,
                <br />
                <AccentText>not headcount.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange earns a share of every successful placement. RecX Direct aggregates enterprise hiring mandates and fulfils them through the independent recruiter network — with no recruited payroll.
              </p>
            </motion.div>

            {/* Hub economics table */}
            <motion.div variants={fadeUp} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {['One City Hub — Inputs', 'Annual Financials', 'Structure'].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-bold uppercase tracking-widest text-cyan-400 px-4 py-3 border-b border-white/[0.08]"
                        style={{ background: 'rgba(0,240,255,0.04)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      input: '~100 enterprise roles/month',
                      finance: { big: '$2.4M', sub: 'Annual placement value' },
                      structure: 'No recruiter salaries',
                    },
                    {
                      input: 'Avg placement fee: ~$10k',
                      finance: { big: '$1M+', sub: 'Net to RecXchange per hub' },
                      structure: 'No local agency build-out',
                    },
                    {
                      input: '~$2k coordination fee per role',
                      finance: { big: '—', sub: '' },
                      structure: 'Delivery risk distributed across the network',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400">{row.input}</td>
                      <td className="px-4 py-3">
                        {row.finance.big !== '—' ? (
                          <>
                            <span
                              className="text-xl font-black"
                              style={{
                                background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {row.finance.big}
                            </span>
                            <br />
                            <span className="text-[11px] text-gray-500">{row.finance.sub}</span>
                          </>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{row.structure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-5 text-gray-500 text-xs">
              2 city hubs planned for Phase 1: US · Europe. Asia & MENA in Phase 2. Subscriptions and tokens add upside but are not required for profitability.
            </motion.p>
          </motion.div>
        </section>

        {/* ── MARKET OPPORTUNITY ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Market Opportunity</SectionLabel>
              <SectionHeading>
                A $600B market.
                <br />
                <AccentText>With no infrastructure layer.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                Independent and freelance recruiters generate a significant share of global placement fees, but have no shared operating system. RecXchange is building that infrastructure.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketCards.map((card, i) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl border border-white/[0.08] p-5 hover:border-cyan-400/20 transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderTop: '2px solid rgba(0,240,255,0.4)',
                  }}
                >
                  <div
                    className="text-2xl sm:text-3xl font-black mb-2 text-white"
                  >
                    {card.num}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">{card.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── THE ASK ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Ask</SectionLabel>
              <SectionHeading>
                <AccentText>£1M for 8%.</AccentText>
                <br />
                24-month runway to scale global infrastructure.
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                Capital scales execution, not experimentation. The platform is live. The model is proven at unit level. This round funds scale.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {askItems.map((item, i) => (
                <motion.div
                  key={item.amount}
                  variants={fadeUp}
                  custom={i}
                  className={`rounded-xl border p-5 ${glowColors[item.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className={`text-xl font-black mb-2 ${glowColors[item.color].text}`}
                    style={{ textShadow: `0 0 20px currentColor` }}
                  >
                    {item.amount}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.purpose}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-white/[0.08] p-5"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="text-gray-400 text-sm">
                Total burn:{' '}
                <strong className="text-white">£500k/year</strong>
                {' '}· 24-month runway · Revenue from placements from month one of each hub.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── TEAM ────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Team</SectionLabel>
              <SectionHeading>
                Built by people who <AccentText>lived the problem.</AccentText>
              </SectionHeading>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  custom={i}
                  className={`rounded-xl border p-6 ${glowColors[member.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="text-base font-black text-white mb-1">{member.name}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-4 ${glowColors[member.color].text}`}>
                    {member.role}
                  </div>
                  <ul className="space-y-2">
                    {member.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          member.color === 'cyan' ? 'bg-cyan-400' :
                          member.color === 'purple' ? 'bg-purple-400' : 'bg-fuchsia-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

      </div>{/* /max-w-4xl */}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(0,240,255,0.04) 0%, rgba(168,85,247,0.04) 100%)',
          borderTop: '1px solid rgba(0,240,255,0.2)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Interested in the round?
            </h2>
            <NeonDivider width="w-24" color="mixed" />
            <p className="text-gray-400 mt-5 mb-8 max-w-md mx-auto text-sm sm:text-base">
              We&apos;re raising £1M Seed at 8% equity. The platform is live, the network is growing, and economic throughput is already inside the system.
            </p>
            <GlowButton href="mailto:invest@recxchange.io" variant="primary" size="lg">
              Request the Full Deck →
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER DISCLAIMER ───────────────────────────────────────────────── */}
      <footer className="relative z-10 py-6 px-4 text-center border-t border-white/[0.06]">
        <p className="text-[11px] text-gray-600 max-w-2xl mx-auto">
          © 2025 RecXchange Ltd. · All traction figures reflect live platform data as of December 2024 – January 2025.
          Forward projections are estimates and not guarantees of future performance.
          This document is for information purposes only and does not constitute a financial promotion.
        </p>
      </footer>
    </main>
  );
}
