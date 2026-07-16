import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import {
  GradientButton,
  GhostButton,
  SectionHeading,
  GlassCard,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'How Recruiters Earn More by Working Roles | RecXchange',
  description:
    'A recruiter earns more by monetising what they already have: candidates they cannot place and roles they cannot fill. On RecXchange, split-fee partnerships turn both into placements worth an average of $7,000 each.',
  alternates: { canonical: 'https://recxchange.io/earn-more-as-a-recruiter' },
};

const strategies = [
  {
    title: 'Place the candidates you already have',
    body: `Silver-medalist candidates, candidates in dead searches, candidates whose role fell through: every desk carries them. Submitting them to matching live roles across the network turns sunk sourcing time into fees. There are ${STATS.liveRoles} roles with ${STATS.liveFees} in fees open right now.`,
  },
  {
    title: 'Get help on the roles you cannot fill',
    body: 'A brief outside your niche normally earns you nothing. Shared to the network, a specialist fills it, you keep the client relationship, and you take your share of the fee instead of losing the whole thing.',
  },
  {
    title: 'Work employer-direct roles at up to 70%',
    body: `RecX Direct roles come straight from employers. There is no second agency in the chain, so the recruiter who delivers the candidate keeps up to ${STATS.maxSplit} of the placement fee.`,
  },
  {
    title: 'Fill the quiet weeks',
    body: 'Contingency income is lumpy. A live board of roles that need candidates means there is always billable work between your own briefs, without any business development.',
  },
];

const faqs = [
  {
    q: 'How can a recruiter earn more money without more clients?',
    a: 'By monetising existing assets: candidates you could not place and roles you could not fill. Split-fee recruitment on RecXchange turns both into revenue. You partner with another recruiter, one side brings the role, the other brings the candidate, and the fee is shared under an automated agreement. Recruiters on the platform average $7,000 per placement, which is their share after the split.',
  },
  {
    q: 'How much can I realistically make from split-fee placements?',
    a: 'The average recruiter cut on RecXchange is $7,000 per placement. Six split placements a year at that average adds $42,000 of income on top of your own desk, with no new clients and no extra sourcing beyond candidates you already know.',
  },
  {
    q: 'Is split-fee work worth it at 50%?',
    a: 'Half of a fee you would otherwise never bill is infinitely better than 100% of nothing. Split placements come from candidates and roles that were earning you zero. On RecX Direct employer roles the economics are even better: up to 70% of the fee goes to the recruiter who delivers the candidate.',
  },
  {
    q: 'What do I need to start?',
    a: 'A RecXchange account (plans start at $1/month), verification as a working recruiter, and either a candidate or a role. Most new members submit their first candidate within days of joining because they arrive with a bench.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function EarnMorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Answer-first hero for AEO */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Earn more"
            title={
              <>
                How recruiters earn more{' '}
                <span className="grad-text">by working roles</span>
              </>
            }
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--rx-muted)]">
            A recruiter earns more by monetising what they already have:
            candidates they cannot place, and roles they cannot fill. Split-fee
            partnerships on RecXchange turn both into placements, at an average
            of {STATS.avgPlacement} per placement in the recruiter&apos;s
            pocket after the split.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href="/roles" size="lg">
              See roles that pay splits now
            </GradientButton>
            <GhostButton href="/pricing" size="lg">
              Run the earnings calculator
            </GhostButton>
          </div>
        </Reveal>
      </section>

      {/* The four strategies */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Four income streams"
            title="Revenue hiding on your desk"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {strategies.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <GlassCard className="h-full">
                <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
                  {s.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The maths */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20">
        <Reveal dir="scale">
          <div className="grad-border-hot rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
              The maths is simple
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--rx-muted)]">
              Six split placements a year at the platform average of{' '}
              {STATS.avgPlacement} is $42,000 of income that did not exist
              before, earned from candidates and briefs that were already on
              your desk.{' '}
              <Link
                href="/pricing"
                className="font-semibold grad-text hover:underline"
              >
                Run your own numbers in the calculator
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Earning questions" />
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
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
        <Reveal delay={300}>
          <p className="mt-8 text-center text-sm text-[var(--rx-muted)]">
            New to the model?{' '}
            <Link
              href="/how-it-works"
              className="font-semibold grad-text hover:underline"
            >
              Read how split-fee recruitment works
            </Link>
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-black tracking-tight text-white [text-wrap:balance]">
            Your bench is worth money.{' '}
            <span className="grad-text-hot">Put it to work.</span>
          </h2>
          <div className="mt-8">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Join from $1/month
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
