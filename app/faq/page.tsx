import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import { SectionHeading, GradientButton } from '@/components/redesign/ui';
import { APP_REGISTER_URL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'RecXchange FAQ | Split Fees, Tokens, Protection & Pricing',
  description:
    'Every common question about RecXchange answered: how split-fee recruitment works, what tokens are, how deals are protected, what plans cost, and how employers post roles.',
  alternates: { canonical: 'https://recxchange.io/faq' },
};

const groups: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: 'Getting started',
    items: [
      {
        q: 'What is RecXchange?',
        a: 'RecXchange is a split-fee recruitment marketplace where 15,000+ verified recruiters partner on placements. One recruiter brings the role, another brings the candidate, and the placement fee is shared under an automated agreement. The platform lives at app.recxchange.io.',
      },
      {
        q: 'Who can join?',
        a: 'Working recruiters - independent, freelance, or agency-based. Every member is verified before they can transact, which is what keeps the network high quality.',
      },
      {
        q: 'How much does it cost to join?',
        a: 'Membership starts at $1/month on the RecX Entry plan. Higher tiers - RecX Lite ($99/month) and RecX Pro ($249/month) - unlock more monthly tokens and RecX Direct access.',
      },
    ],
  },
  {
    heading: 'Splits and payments',
    items: [
      {
        q: 'How are fees split?',
        a: 'Collaborative Xchange roles typically split 50/50 between the role owner and the candidate owner. RecX Direct roles come straight from employers and pay up to 70% to the recruiter who delivers the candidate.',
      },
      {
        q: 'How much do recruiters actually earn?',
        a: 'The average recruiter cut on RecXchange is $7,000 per placement - that figure is the recruiter’s share after the split, not the total fee divided.',
      },
      {
        q: 'What are tokens?',
        a: 'Tokens are the platform currency for actions like submitting candidates to roles. Plans include a monthly allowance: 5 on Entry ($1/mo), 150 on Lite ($99/mo), 400 on Pro ($249/mo).',
      },
      {
        q: 'Does RecXchange take a cut of my placement fee?',
        a: 'No. Your subscription is the cost of access; the placement fee is split between you and your partner recruiter on the agreed terms.',
      },
    ],
  },
  {
    heading: 'Deal protection',
    items: [
      {
        q: 'What stops another recruiter stealing my candidate?',
        a: 'Every submission is timestamped, and a split-fee agreement is generated and accepted before candidate details are exchanged. Ownership is provable by the record, not by memory.',
      },
      {
        q: 'What happens if there is a dispute?',
        a: 'Because terms are locked before any exchange and every event is timestamped, most disputes are resolved simply by reading the record. That design is the core of the platform.',
      },
    ],
  },
  {
    heading: 'For employers',
    items: [
      {
        q: 'Can employers use RecXchange directly?',
        a: 'Yes. Employers post roles through RecX Direct and get a network of 15,000+ recruiters working the brief through a single point of contact, on contingency terms - payment only on a successful hire.',
      },
      {
        q: 'What does it cost an employer?',
        a: 'Nothing upfront. You agree a placement fee for the role and pay only when a candidate sourced through the network starts.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups.flatMap((g) =>
    g.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="FAQ"
            title={
              <>
                Everything people <span className="grad-text">ask us</span>
              </>
            }
            sub="Straight answers, no marketing voice. If yours isn't here, the contact page reaches a human."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        {groups.map((group, gi) => (
          <div key={group.heading} className="mb-12">
            <Reveal>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] grad-text">
                {group.heading}
              </h2>
            </Reveal>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <Reveal key={item.q} delay={(gi * 40 + i * 70) % 280}>
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
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
            Sounds fair? It is.
          </h2>
          <div className="mt-6">
            <GradientButton href={APP_REGISTER_URL} external>
              Join now
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
