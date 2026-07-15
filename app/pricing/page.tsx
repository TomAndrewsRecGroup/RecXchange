import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import EarningsCalculator from '@/components/redesign/EarningsCalculator';
import {
  GradientButton,
  SectionHeading,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'RecXchange Pricing | Plans From $1/Month',
  description:
    'RecXchange plans: RecX Entry at $1/month, RecX Lite at $99/month, RecX Pro at $249/month with instant RecX Direct access and up to 70% fee splits. Calculate your earnings.',
  alternates: { canonical: 'https://recxchange.io/pricing' },
};

const plans = [
  {
    name: 'RecX Entry',
    price: '$1',
    period: '/month',
    tagline: 'Try the network for the price of a coffee. Well, less.',
    features: [
      '5 tokens per month',
      'Access to collaborative Xchange roles',
      'Candidate database access',
      'Timestamped submission protection',
    ],
    cta: 'Start for $1',
    featured: false,
  },
  {
    name: 'RecX Pro',
    price: '$249',
    period: '/month',
    tagline: 'For recruiters who treat the network as a revenue channel.',
    features: [
      '400 tokens per month',
      'Instant RecX Direct access',
      `Up to ${STATS.maxSplit} fee split in your favour`,
      'Priority matching via the Xchange Engine',
      'Everything in Lite',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'RecX Lite',
    price: '$99',
    period: '/month',
    tagline: 'Serious volume without the full commitment.',
    features: [
      '150 tokens per month',
      'RecX Direct access after 7 days',
      'All collaborative roles',
      'Everything in Entry',
    ],
    cta: 'Choose Lite',
    featured: false,
  },
];

const faqs = [
  {
    q: 'What do tokens actually pay for?',
    a: 'Tokens unlock platform actions - chiefly submitting candidates to roles. They exist to keep submissions intentional and high quality, which is what keeps role owners engaged.',
  },
  {
    q: 'Is there a placement fee or commission to RecXchange?',
    a: 'Your subscription is the cost of access. The placement fee itself is split between you and your partner recruiter according to the agreed terms.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. All plans are monthly subscriptions and can be cancelled from your account at any time.',
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

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-14 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title={
              <>
                One placement pays for{' '}
                <span className="grad-text">years of membership</span>
              </>
            }
            sub={`The average recruiter cut on RecXchange is ${STATS.avgPlacement} per placement. Plans start at $1/month.`}
          />
        </Reveal>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110} className="h-full">
              <div
                className={`h-full rounded-2xl p-7 flex flex-col ${
                  plan.featured ? 'grad-border-hot' : 'glass'
                }`}
              >
                {plan.featured && (
                  <p className="mb-3 self-start rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] grad-text-hot">
                    Most popular
                  </p>
                )}
                <h2 className="text-lg font-extrabold text-white">
                  {plan.name}
                </h2>
                <p className="mt-3">
                  <span className="text-4xl font-black text-white tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--rx-faint)]">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-2 text-sm text-[var(--rx-muted)]">
                  {plan.tagline}
                </p>
                <ul className="mt-6 space-y-2.5 flex-grow">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--rx-text)]"
                    >
                      <span className="grad-text font-bold" aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <GradientButton
                    href={APP_REGISTER_URL}
                    external
                    className="w-full"
                  >
                    {plan.cta}
                  </GradientButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Earnings calculator"
            title="Run your own numbers"
            sub="Drag the sliders. The maths does the selling."
          />
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10">
            <EarningsCalculator />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Pricing questions" />
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
      </section>
    </>
  );
}
