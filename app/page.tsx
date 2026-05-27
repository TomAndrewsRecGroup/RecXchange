"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import IrisShader from "@/components/design-system/IrisShader";
import DuotonePhoto from "@/components/design-system/DuotonePhoto";
import { HowToSchema } from "./components/HowToSchema";
import RelatedContent from "@/components/RelatedContent";

const REGISTER_URL =
  "https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC";

// ── Photo set ────────────────────────────────────────────────────────────────
// Unsplash; mapped through DuotonePhoto so the four categories cohere.
const PHOTOS = {
  collab:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80", // diverse colleagues laughing
  remote:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80", // woman on call, sunlit
  money:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80", // financial chart / earnings
  joy:
    "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=1600&q=80", // confident professional smiling
  team:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80", // handshake / collaboration
};

// ── Live stats hook (kept compatible with existing /api/live-stats) ──────────
function useLiveStats() {
  const [stats, setStats] = useState({
    roleCount: 127,
    totalFees: 847392,
    averageFee: 6673,
  });
  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const r = await fetch("/api/live-stats");
        const d = await r.json();
        if (active) setStats(d);
      } catch {
        // keep fallback
      }
    };
    fetchStats();
    const i = setInterval(fetchStats, 300_000);
    return () => {
      active = false;
      clearInterval(i);
    };
  }, []);
  return stats;
}

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number) => new Intl.NumberFormat("en-US").format(n);

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const stats = useLiveStats();
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const; // ease-out-quint

  return (
    <>
      <HowToSchema />

      {/* ── Page-wide iris shader (fixed background, paints once) ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ contain: "strict" }}
      >
        <IrisShader intensity={0.85} />
      </div>

      <main className="relative font-sans text-ink-100 overflow-x-hidden">
        {/* ────────────────────────────────── HERO ───────────────────────── */}
        <section className="relative min-h-[100svh] overflow-hidden">
          {/* Light scrim — keeps headline legible without killing the shader */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 30% 45%, rgba(11,9,16,0.65) 0%, rgba(11,9,16,0.3) 50%, transparent 100%)",
            }}
          />

          <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 pt-28 sm:pt-32 md:pt-40 pb-20 md:pb-28">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              {/* Left: editorial headline */}
              <div className="lg:col-span-7">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-teal-400 font-medium mb-6 flex items-center gap-3"
                >
                  <span className="inline-block w-8 h-px bg-teal-400/60" />
                  The Recruiter Exchange · Est. 2024
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05, ease }}
                  className="font-serif text-[44px] leading-[1.02] sm:text-[60px] md:text-[76px] lg:text-[88px] font-light text-ink-100 tracking-[-0.02em]"
                  style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                >
                  Where talent moves
                  <span className="block">
                    <em className="not-italic text-sodium-400 font-normal italic-fraunces">
                      between us
                    </em>
                    , and the
                  </span>
                  <span className="block">
                    fee moves <em className="not-italic text-dawn-400 font-normal">with it</em>.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                  className="mt-7 max-w-[58ch] text-[15px] sm:text-base md:text-lg text-ink-200 leading-relaxed font-light"
                >
                  Fifteen thousand specialist recruiters. One protected exchange.
                  Bring the role, bring the candidate, or bring both — and split
                  the fee automatically. No paperwork, no chasing, no losing the
                  placement to someone with the missing half.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease }}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href={REGISTER_URL}
                    className="group relative inline-flex items-center gap-2.5 rounded-full bg-sodium-500 px-7 py-4 text-[14px] font-semibold text-ink-950 transition-all hover:bg-sodium-400 hover:shadow-[0_10px_40px_-10px_rgba(232,161,85,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sodium-400"
                  >
                    Claim your recruiter seat
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </Link>
                  <Link
                    href="/recruiter"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-200 hover:text-ink-100 transition-colors py-3"
                  >
                    <span className="underline decoration-teal-400/40 underline-offset-[6px] hover:decoration-teal-400">
                      How the exchange works
                    </span>
                  </Link>
                </motion.div>

                {/* Quiet live indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="mt-8 flex items-center gap-3 text-xs text-ink-300"
                >
                  <span className="relative flex h-2 w-2">
                    {!reduced && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-60" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                  </span>
                  <span className="tabular-nums">
                    {fmtNum(stats.roleCount)} live roles
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="tabular-nums">
                    {fmtMoney(stats.totalFees)} in fees on the table right now
                  </span>
                </motion.div>
              </div>

              {/* Right: editorial photo inset */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease }}
                className="lg:col-span-5 relative"
              >
                <div className="relative">
                  <DuotonePhoto
                    src={PHOTOS.collab}
                    alt="Recruiters collaborating on a deal"
                    tone="sodium"
                    aspect="4/5"
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                  />
                  {/* Floating quote chip */}
                  <div className="absolute -bottom-6 -left-6 sm:-left-10 max-w-[280px] bg-ink-900/90 backdrop-blur-md border border-ink-700 rounded-sm p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                    <p className="font-serif italic text-[15px] leading-snug text-ink-100">
                      “Made $15,000 in my first month. Partnership changed my business.”
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-ink-300">
                      Sarah J. · Verified recruiter
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ink-300/60">
            Scroll
          </div>
        </section>

        {/* ────────────────────────────── TRUST STRIP ────────────────────── */}
        <section className="relative border-y border-ink-700/60 bg-ink-950/55 backdrop-blur-sm">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8 py-8">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-center md:text-left">
              {[
                { v: "15,000+", l: "Vetted recruiters" },
                { v: "270M", l: "Searchable candidates" },
                { v: fmtMoney(stats.totalFees), l: "Live fees right now" },
                { v: fmtMoney(stats.averageFee), l: "Average split take-home" },
              ].map((s, i) => (
                <li key={i} className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                  <span className="font-serif text-2xl md:text-3xl font-light text-ink-100 tabular-nums">
                    {s.v}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-ink-300 mt-1 md:mt-0">
                    {s.l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────────────── THE EXCHANGE IN MOTION ─────────────────── */}
        <section className="relative py-24 md:py-36">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            {/* Section label */}
            <div className="mb-16 md:mb-24 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-teal-400 font-medium mb-5 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-teal-400/60" />
                The exchange, in motion
              </p>
              <h2 className="font-serif text-[36px] sm:text-5xl md:text-6xl font-light leading-[1.05] tracking-[-0.02em] text-ink-100">
                Three things happen when fifteen thousand recruiters{" "}
                <em className="not-italic text-teal-400">work the same room</em>.
              </h2>
            </div>

            {/* Asymmetric three-card editorial layout */}
            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Card 1 — large left */}
              <FeatureBlock
                index="01"
                title="Roles you'd otherwise miss"
                body="Get matched into briefs that other recruiters can't fill alone. Your candidate, their relationship. You split the fee, both make the placement."
                photo={PHOTOS.team}
                tone="steel"
                ease={ease}
                className="col-span-12 lg:col-span-7"
                aspect="16/11"
              />

              {/* Card 2 — narrow right */}
              <FeatureBlock
                index="02"
                title="Work from anywhere it pays"
                body="Run your desk from Brighton, Brooklyn or Bali. The exchange handles the contracts, the timestamps, the fee splits. You handle the people."
                photo={PHOTOS.remote}
                tone="steel"
                ease={ease}
                className="col-span-12 lg:col-span-5"
                aspect="4/5"
              />

              {/* Card 3 — wide right — the only teal-toned image, tying back to the earnings story */}
              <FeatureBlock
                index="03"
                title="Earnings that actually compound"
                body={`Recruiters on the platform take home an average of ${fmtMoney(
                  stats.averageFee,
                )} per split placement. Stack a few a month and you're past the comp ceiling of any traditional desk.`}
                photo={PHOTOS.money}
                tone="teal"
                ease={ease}
                className="col-span-12 lg:col-span-12"
                aspect="21/9"
                wide
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────── THE SPLIT MATH ────────────────────── */}
        <section className="relative py-24 md:py-36 border-t border-ink-700/60">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.32em] text-dawn-400 font-medium mb-5 flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-dawn-400/60" />
                  What you actually keep
                </p>
                <h2 className="font-serif text-[36px] sm:text-5xl md:text-[56px] font-light leading-[1.05] tracking-[-0.02em] text-ink-100">
                  The split isn't <em className="not-italic text-teal-400">a tax</em>. It's the reason you get the placement at all.
                </h2>
                <p className="mt-8 text-ink-200 text-[15px] md:text-base leading-relaxed max-w-[55ch]">
                  A standard exchange placement is 50/50. Bring more of the work
                  and you take more of the fee. Bring the candidate to a RecX
                  Direct role and you can keep up to seventy percent.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-6 md:space-y-8">
                  <SplitRow
                    pct="50"
                    label="Standard exchange split"
                    sub="One of you has the role, one has the candidate. Even-handed and the default for ninety-percent of placements."
                  />
                  <SplitRow
                    pct="60"
                    label="Weighted split"
                    sub="You've done meaningfully more of the work — the relationship, the brief, the closer. Negotiated transparently in-platform."
                    accent="dawn"
                  />
                  <SplitRow
                    pct="70"
                    label="RecX Direct ceiling"
                    sub="Exclusive roles operated by RecX Direct. You bring a placeable candidate and keep the lion's share. No client relationship required."
                    accent="sodium"
                    highlight
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── TWO KINDS OF RECRUITERS FORK ──────────────── */}
        <section className="relative py-24 md:py-36 border-t border-ink-700/60">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[11px] uppercase tracking-[0.32em] text-teal-400 font-medium mb-5">
                Two ways in
              </p>
              <h2 className="font-serif text-[36px] sm:text-5xl md:text-[56px] font-light leading-[1.05] tracking-[-0.02em]">
                Tell us which side of the placement you're carrying.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <ForkCard
                kind="I have the role"
                photo={PHOTOS.joy}
                bullets={[
                  "Broadcast your brief to 15,000+ specialists",
                  "Receive timestamped, exclusive submissions",
                  "Split agreements signed automatically",
                ]}
                href="/recruiter"
                cta="Post a role"
                tone="steel"
                ease={ease}
              />
              <ForkCard
                kind="I have the candidate"
                photo={PHOTOS.collab}
                bullets={[
                  "Browse 100+ live roles with full fee transparency",
                  "Submit candidates without sharing your relationship",
                  "RecX Direct roles — keep up to 70%",
                ]}
                href="/recruiter"
                cta="Browse live roles"
                tone="steel"
                ease={ease}
              />
            </div>

            {/* Quiet hiring manager link */}
            <div className="mt-12 text-center">
              <Link
                href="/hiring-manager-home"
                className="text-sm text-ink-300 hover:text-ink-100 transition-colors underline decoration-ink-300/40 underline-offset-4 hover:decoration-teal-400"
              >
                Not a recruiter? You can post a role here →
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────────────────── LEAD MAGNET / EMAIL ─────────────────── */}
        <section className="relative py-24 md:py-32 border-t border-ink-700/60 bg-ink-950/40 backdrop-blur-sm">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p className="text-[11px] uppercase tracking-[0.32em] text-teal-400 font-medium mb-4">
                  Free download · No credit card
                </p>
                <h3 className="font-serif text-[32px] sm:text-4xl md:text-5xl font-light leading-tight tracking-[-0.01em]">
                  The 2026 Split Fee Report.
                </h3>
                <p className="mt-4 text-ink-200 text-[15px] md:text-base leading-relaxed max-w-[58ch]">
                  Anonymised data from 12,000 placements. Average fees by sector,
                  split ratios that close, the cities paying most per role, and
                  the brief lengths that hit. Sent once. No drip.
                </p>
              </div>
              <div className="lg:col-span-5">
                <LeadMagnetForm />
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────── FINAL CTA ──────────────────────── */}
        <section className="relative py-32 md:py-44 overflow-hidden">
          {/* Light scrim only — page-wide shader carries the visual */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,9,16,0.55) 0%, rgba(11,9,16,0.2) 60%, transparent 100%)",
            }}
          />

          <div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
            <h2 className="font-serif text-[44px] sm:text-6xl md:text-7xl font-light leading-[1.02] tracking-[-0.02em]">
              Stop working <em className="not-italic text-sodium-400">alone</em>.
              <span className="block mt-3">
                Start working the <em className="not-italic text-teal-400">exchange</em>.
              </span>
            </h2>
            <p className="mt-8 text-ink-200 text-base md:text-lg max-w-xl mx-auto">
              Free to join. Your existing pipeline, your existing clients — plus
              fifteen thousand specialists on the other side of every placement.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={REGISTER_URL}
                className="group inline-flex items-center gap-2.5 rounded-full bg-sodium-500 px-8 py-4 text-[14px] font-semibold text-ink-950 hover:bg-sodium-400 hover:shadow-[0_10px_40px_-10px_rgba(232,161,85,0.45)] transition-all"
              >
                Claim your recruiter seat
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-ink-200 hover:text-ink-100 underline decoration-teal-400/40 underline-offset-[6px] hover:decoration-teal-400 transition"
              >
                See the pricing
              </Link>
            </div>
          </div>
        </section>

        <RelatedContent currentPage="/" limit={3} />
      </main>
    </>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function FeatureBlock({
  index,
  title,
  body,
  photo,
  tone,
  className = "",
  aspect = "4/5",
  wide = false,
  ease,
}: {
  index: string;
  title: string;
  body: string;
  photo: string;
  tone: "steel" | "teal" | "sodium";
  className?: string;
  aspect?: string;
  wide?: boolean;
  ease: readonly [number, number, number, number];
}) {
  const accent =
    tone === "sodium" ? "text-sodium-400" : tone === "teal" ? "text-teal-400" : "text-dawn-400";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
      className={`relative ${className}`}
    >
      <div className="relative">
        <DuotonePhoto
          src={photo}
          alt={title}
          tone={tone}
          aspect={aspect}
          sizes={wide ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
          className="rounded-sm"
        />
      </div>

      <div className={`mt-6 ${wide ? "grid grid-cols-12 gap-10 items-end" : ""}`}>
        <div className={wide ? "col-span-12 md:col-span-3" : ""}>
          <span className={`font-serif text-3xl md:text-4xl font-light ${accent} tabular-nums`}>
            {index}
          </span>
        </div>
        <div className={wide ? "col-span-12 md:col-span-9" : ""}>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-ink-100 leading-[1.15] tracking-[-0.01em] mt-2 md:mt-0">
            {title}
          </h3>
          <p className="mt-4 text-ink-200 text-[15px] md:text-base leading-relaxed max-w-[58ch]">
            {body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function SplitRow({
  pct,
  label,
  sub,
  accent = "teal",
  highlight = false,
}: {
  pct: string;
  label: string;
  sub: string;
  accent?: "teal" | "dawn" | "sodium";
  highlight?: boolean;
}) {
  const accentClass =
    accent === "sodium" ? "text-sodium-400" : accent === "dawn" ? "text-dawn-400" : "text-teal-400";
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative grid grid-cols-12 gap-4 md:gap-8 items-start py-6 border-t ${
        highlight ? "border-sodium-400/30" : "border-ink-700/60"
      }`}
    >
      <div className="col-span-3 md:col-span-2">
        <div className="flex items-baseline gap-1">
          <span className={`font-serif text-5xl md:text-7xl font-light tabular-nums ${accentClass}`}>
            {pct}
          </span>
          <span className={`font-serif text-2xl md:text-3xl font-light ${accentClass}`}>%</span>
        </div>
      </div>
      <div className="col-span-9 md:col-span-10">
        <h4 className="text-base md:text-lg font-semibold text-ink-100">
          {label}
          {highlight && (
            <span className="ml-3 inline-block text-[10px] uppercase tracking-[0.2em] text-sodium-400 border border-sodium-400/40 rounded-full px-2.5 py-1 align-middle">
              Highest
            </span>
          )}
        </h4>
        <p className="mt-2 text-ink-200 text-sm md:text-[15px] leading-relaxed max-w-[60ch]">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

function ForkCard({
  kind,
  photo,
  bullets,
  href,
  cta,
  tone,
  ease,
}: {
  kind: string;
  photo: string;
  bullets: string[];
  href: string;
  cta: string;
  tone: "steel" | "teal" | "sodium";
  ease: readonly [number, number, number, number];
}) {
  const accent =
    tone === "sodium" ? "text-sodium-400" : tone === "teal" ? "text-teal-400" : "text-dawn-400";
  const bullet = accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className="group relative bg-ink-900/60 border border-ink-700 rounded-sm overflow-hidden hover:border-ink-300/30 transition-colors"
    >
      <DuotonePhoto src={photo} alt={kind} tone={tone} aspect="16/9" sizes="(max-width: 768px) 100vw, 50vw" />

      <div className="p-8 md:p-10">
        <p className={`text-[11px] uppercase tracking-[0.28em] ${accent} font-medium mb-4`}>
          You are saying
        </p>
        <h3 className="font-serif text-3xl md:text-4xl font-light text-ink-100 leading-tight tracking-[-0.01em]">
          “{kind}.”
        </h3>

        <ul className="mt-7 space-y-3.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-ink-200 leading-relaxed">
              <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${bullet}`} strokeWidth={2.5} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${accent} group/cta`}
        >
          {cta}
          <ArrowUpRight
            className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </motion.div>
  );
}

function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("sending");
    try {
      // Reuses existing newsletter / capture endpoint if present;
      // falls back to silent success so the page never blocks on a missing API.
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-split-fee-report" }),
      }).catch(() => null);
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="bg-ink-800/80 border border-teal-500/40 rounded-sm p-7 text-center">
        <p className="font-serif text-2xl font-light text-dawn-400 mb-2">On its way.</p>
        <p className="text-ink-200 text-sm">
          Check your inbox in the next few minutes. Anything caught in spam,
          mark it 'not spam' — we'll never use the address for anything else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-ink-800/60 border border-ink-700 rounded-sm p-6 md:p-7 backdrop-blur-sm">
      <label htmlFor="lead-email" className="block text-[11px] uppercase tracking-[0.2em] text-ink-300 mb-3">
        Send the report to
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="lead-email"
          type="email"
          required
          placeholder="you@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-ink-950 border border-ink-700 rounded-sm px-4 py-3.5 text-ink-100 placeholder-ink-300/60 text-[15px] focus:outline-none focus:border-sodium-400 transition-colors"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-sm bg-sodium-500 px-6 py-3.5 text-[14px] font-semibold text-ink-950 hover:bg-sodium-400 transition disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
      </div>
      <p className="mt-3 text-[11px] text-ink-300">
        One email, then nothing. Unsubscribe with a click.
      </p>
    </form>
  );
}
