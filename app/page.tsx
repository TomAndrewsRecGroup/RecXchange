import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import {
  GradientButton,
  GhostButton,
  SectionHeading,
  GlassCard,
  Stat,
  Step,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'RecXchange | The Split-Fee Recruitment Marketplace for Recruiters',
  description:
    'Join 15,000+ recruiters partnering on placements. Share roles or candidates, split fees automatically, and earn an average of $7,000 per placement. Join free.',
  alternates: { canonical: 'https://recxchange.io/' },
};

const sectors = [
  'Engineering',
  'Healthcare',
  'Technology',
  'Finance',
  'Sales',
  'HR & Recruitment',
  'Legal',
  'Construction',
];

const testimonials = [
  {
    quote:
      'Made $15,000 in my first month. The candidates submitted to my roles are higher quality than what I find alone. Partnership changed my business.',
    name: 'Sarah Johnson',
    role: 'Independent recruiter, UK',
  },
  {
    quote:
      "I was skeptical about sharing fees. But I've made MORE money by partnering than working alone. The ROI is incredible.",
    name: 'Mark Chen',
    role: 'Agency owner, US',
  },
  {
    quote:
      "Filled a role in 48 hours that I'd been stuck on for 2 months. RecX Direct completely changed my earnings.",
    name: 'David Williams',
    role: 'Freelance recruiter, UAE',
  },
];

const faqTeaser = [
  {
    q: 'What is split-fee recruitment?',
    a: 'Split-fee recruitment is when two recruiters partner on one placement — one brings the role, the other brings the candidate — and share the placement fee. On RecXchange the split terms are agreed upfront and the contract is generated automatically.',
  },
  {
    q: 'How much does RecXchange cost?',
    a: 'You can join from $1/month on RecX Entry. Recruiters on the platform earn an average of $7,000 per placement — their share after the split, not the total fee divided.',
  },
  {
    q: 'How do I know my candidate or role is protected?',
    a: 'Every submission is timestamped and covered by an automated split-fee agreement before any details are exchanged, so ownership is provable and payment terms are locked in.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-28 pb-16 text-center">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--rx-muted)]">
            <span
              className="h-2 w-2 rounded-full bg-[var(--rx-live)] animate-rx-pulse"
              aria-hidden="true"
            />
            {STATS.liveFees} in live fees across {STATS.liveRoles} open roles
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white [text-wrap:balance]">
            Your next placement is{' '}
            <span className="grad-text-hot">already here.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-[var(--rx-muted)] [text-wrap:balance]">
            {STATS.recruiters} recruiters share roles, share candidates, and
            split fees automatically. Average earnings:{' '}
            <strong className="text-white">
              {STATS.avgPlacement} per placement
            </strong>{' '}
            — your cut, after the split.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Join free — start earning
            </GradientButton>
            <GhostButton href="/roles" size="lg">
              Browse live roles
            </GhostButton>
          </div>
          <p className="mt-4 text-xs text-[var(--rx-faint)]">
            Free to join. No credit card required.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value={STATS.recruiters} label="Vetted recruiters" />
            <Stat value={STATS.liveFees} label="Fees live right now" live />
            <Stat value={STATS.avgPlacement} label="Avg. per placement" />
            <Stat value={STATS.maxSplit} label="Max split on RecX Direct" />
          </div>
        </Reveal>
      </section>

      {/* ── Sector ticker ────────────────────────────────── */}
      <section
        aria-label="Sectors covered"
        className="relative border-y border-[var(--rx-line)] py-4 overflow-hidden"
      >
        <div className="flex w-max animate-rx-marquee gap-12">
          {[...sectors, ...sectors].map((sector, i) => (
            <span
              key={`${sector}-${i}`}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--rx-faint)] whitespace-nowrap"
            >
              {sector}
            </span>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to a split fee"
            sub="No cold outreach, no chasing agreements. The platform handles matching, contracts, and payment terms."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal delay={0}>
            <Step number={1} title="Share what you have">
              Post a role you can&apos;t fill, or list candidates you can&apos;t
              place. Either side of the marketplace earns.
            </Step>
          </Reveal>
          <Reveal delay={120}>
            <Step number={2} title="Match with a partner">
              The Xchange Engine matches your roles and candidates against{' '}
              {STATS.recruiters} recruiters and {STATS.candidates} profiles —
              instantly.
            </Step>
          </Reveal>
          <Reveal delay={240}>
            <Step number={3} title="Split the fee, automatically">
              Terms are agreed upfront, the split-fee contract is generated for
              you, and every submission is timestamped and protected.
            </Step>
          </Reveal>
        </div>
      </section>

      {/* ── Two paths ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal dir="left">
            <GlassCard className="h-full">
              <p className="text-xs font-bold uppercase tracking-[0.22em] grad-text mb-3">
                Got candidates?
              </p>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Monetise the ones you can&apos;t place
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--rx-muted)] mb-6">
                Every recruiter has strong candidates with nowhere to send them.
                Submit them to live roles across the network and take your share
                of the fee when they&apos;re placed.
              </p>
              <Link
                href="/roles"
                className="text-sm font-semibold grad-text hover:underline"
              >
                See roles that need candidates →
              </Link>
            </GlassCard>
          </Reveal>
          <Reveal dir="right" delay={120}>
            <GlassCard className="h-full">
              <p className="text-xs font-bold uppercase tracking-[0.22em] grad-text mb-3">
                Got roles?
              </p>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Fill them with the network&apos;s candidates
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--rx-muted)] mb-6">
                Stuck on a brief? Put it in front of {STATS.recruiters}{' '}
                recruiters with {STATS.candidates} candidate profiles between
                them. You keep the client; the network fills the role.
              </p>
              <Link
                href="/how-it-works"
                className="text-sm font-semibold grad-text hover:underline"
              >
                How role sharing works →
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── RecX Direct ──────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24">
        <Reveal dir="scale">
          <div className="grad-border-hot rounded-3xl p-8 sm:p-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] grad-text-hot mb-3">
              RecX Direct
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-extrabold text-white [text-wrap:balance]">
              Exclusive client roles. Up to{' '}
              <span className="grad-text-hot">{STATS.maxSplit} of the fee</span>{' '}
              is yours.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[var(--rx-muted)]">
              RecX Direct roles come straight from employers, so there&apos;s
              only one split — and it&apos;s in your favour. Bring the
              candidate, take up to {STATS.maxSplit}.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton href={APP_REGISTER_URL} external>
                Unlock RecX Direct roles
              </GradientButton>
              <GhostButton href="/pricing">See plans</GhostButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Trust ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24">
        <Reveal>
          <SectionHeading
            eyebrow="Deal protection"
            title="Built so nobody gets burned"
            sub="The reason recruiters don't collaborate is trust. We engineered it into the platform."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Timestamped submissions',
              body: 'Every candidate submission is recorded and timestamped, so ownership disputes are impossible.',
            },
            {
              title: 'Automated contracts',
              body: 'Split-fee agreements are generated and accepted before any candidate details change hands.',
            },
            {
              title: 'Vetted network',
              body: `All ${STATS.recruiters} members are verified recruiters — no candidates, no clients, no tyre-kickers.`,
            },
            {
              title: 'Agreed terms upfront',
              body: 'Split percentages are fixed when the partnership starts, not negotiated after the placement.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <GlassCard className="h-full !p-6">
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
                  {item.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24">
        <Reveal>
          <SectionHeading
            eyebrow="Recruiters on RecXchange"
            title="The network is the pitch"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <GlassCard className="h-full flex flex-col">
                <p
                  className="text-2xl grad-text font-black leading-none mb-4"
                  aria-hidden="true"
                >
                  &ldquo;
                </p>
                <blockquote className="flex-grow text-[15px] leading-relaxed text-[var(--rx-text)]">
                  {t.quote}
                </blockquote>
                <footer className="mt-5">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[var(--rx-faint)]">{t.role}</p>
                </footer>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ teaser ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20 sm:pb-24">
        <Reveal>
          <SectionHeading eyebrow="Questions" title="Quick answers" />
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqTeaser.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="group glass rounded-xl px-6 py-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-white flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    className="grad-text text-xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--rx-muted)]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <p className="mt-6 text-center">
            <Link
              href="/faq"
              className="text-sm font-semibold grad-text hover:underline"
            >
              Read the full FAQ →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal dir="scale">
          <h2 className="mx-auto max-w-3xl text-3xl sm:text-5xl font-black tracking-tight text-white [text-wrap:balance]">
            Join {STATS.recruiters} recruiters.{' '}
            <span className="shimmer-text">Start earning this week.</span>
          </h2>
          <div className="mt-8">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Create your free account
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
