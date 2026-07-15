import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import {
  GradientButton,
  GhostButton,
  SectionHeading,
  GlassCard,
  Step,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'How RecXchange Works | Split-Fee Recruitment Explained',
  description:
    'Split-fee recruitment on RecXchange: one recruiter brings the role, another brings the candidate, and the fee is shared under an automated contract. Here is exactly how it works.',
  alternates: { canonical: 'https://recxchange.io/how-it-works' },
};

const faqs = [
  {
    q: 'What is split-fee recruitment?',
    a: 'Split-fee recruitment is a partnership where two recruiters share one placement fee: one supplies the role (the job order), the other supplies the candidate. On RecXchange, splits are typically 50/50 on collaborative roles and up to 70/30 in your favour on RecX Direct roles.',
  },
  {
    q: 'Who pays the fee?',
    a: 'The employer pays the placement fee to the recruiter who owns the role, exactly as in normal contingency recruitment. The platform’s split-fee agreement then ensures the candidate-side recruiter receives their agreed share.',
  },
  {
    q: 'What are tokens?',
    a: 'Tokens are the platform currency used to unlock actions such as submitting candidates to roles. Each plan includes a monthly token allowance — from 5 tokens on RecX Entry to 400 on RecX Pro.',
  },
  {
    q: 'What stops a partner going around me?',
    a: 'Every submission is timestamped and covered by a signed split-fee agreement before candidate details are shared. Ownership is provable and enforceable, which is precisely why the network can operate at scale.',
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to make a split-fee placement on RecXchange',
  description:
    'Share a role or a candidate, match with a partner recruiter, and split the placement fee under an automated agreement.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create your account',
      text: 'Register at app.recxchange.io from $1/month and complete recruiter verification.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Share what you have',
      text: 'Post roles you cannot fill, or submit candidates to live roles across the network.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Agree the split upfront',
      text: 'The platform generates a timestamped split-fee agreement before any candidate details are exchanged.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Place and get paid',
      text: 'When the placement completes, the fee is shared according to the agreed split.',
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero — answer-first for AEO */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-14 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="How it works"
            title={
              <>
                Split-fee recruitment,{' '}
                <span className="grad-text">without the risk</span>
              </>
            }
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--rx-muted)]">
            RecXchange is a split-fee recruitment marketplace: one recruiter
            brings the role, another brings the candidate, and the placement
            fee is shared under an automated, timestamped agreement. No cold
            outreach, no handshake deals, no getting burned.
          </p>
        </Reveal>
      </section>

      {/* The four steps */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}>
            <Step number={1} title="Join and get verified">
              Create an account from $1/month. Every member is verified as a
              working recruiter — that&apos;s what keeps the network worth
              joining.
            </Step>
          </Reveal>
          <Reveal delay={100}>
            <Step number={2} title="Share roles or candidates">
              Post the brief you can&apos;t fill, or submit the candidate you
              can&apos;t place. Both sides of the exchange earn.
            </Step>
          </Reveal>
          <Reveal delay={200}>
            <Step number={3} title="Agree the split upfront">
              The Xchange Engine finds your match, and a split-fee contract is
              generated and accepted before any details are exchanged.
            </Step>
          </Reveal>
          <Reveal delay={300}>
            <Step number={4} title="Place and get paid">
              The employer pays the fee as normal; the platform ensures your
              agreed share reaches you. Average cut: {STATS.avgPlacement}.
            </Step>
          </Reveal>
        </div>
      </section>

      {/* Split types */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="The splits"
            title="Two ways to earn"
            sub="Collaborative roles between recruiters, or exclusive employer roles through RecX Direct."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal dir="left">
            <GlassCard className="h-full">
              <h3 className="text-xl font-extrabold text-white mb-1">
                Xchange roles
              </h3>
              <p className="text-sm font-bold grad-text mb-4">
                Typical split: 50/50
              </p>
              <p className="text-[15px] leading-relaxed text-[var(--rx-muted)]">
                Roles posted by other recruiters in the network. You bring the
                candidate, they bring the client relationship, and the fee is
                shared down the middle — terms fixed before you submit.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal dir="right" delay={120}>
            <GlassCard hot className="h-full">
              <h3 className="text-xl font-extrabold text-white mb-1">
                RecX Direct roles
              </h3>
              <p className="text-sm font-bold grad-text-hot mb-4">
                Up to {STATS.maxSplit} in your favour
              </p>
              <p className="text-[15px] leading-relaxed text-[var(--rx-muted)]">
                Exclusive roles sourced directly from employers. With no second
                recruiter on the client side, the majority of the fee goes to
                whoever delivers the candidate — you.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Protection */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20">
        <Reveal dir="scale">
          <div className="grad-border rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
              Every deal is protected before it starts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--rx-muted)]">
              Timestamped submissions prove candidate ownership. Automated
              agreements lock the split before details are shared. Disputes
              aren&apos;t argued after the fact — they&apos;re prevented by
              design.
            </p>
            <div className="mt-6">
              <Link
                href="/why-recxchange"
                className="text-sm font-semibold grad-text hover:underline"
              >
                More on deal protection →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-black tracking-tight text-white [text-wrap:balance]">
            See it working with your own roles
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Join now
            </GradientButton>
            <GhostButton href="/roles" size="lg">
              Browse live roles
            </GhostButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
