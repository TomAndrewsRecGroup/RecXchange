import { safeJsonLd } from '@/lib/seo/jsonld';
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
import { STATS, SUPPORT_EMAIL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'Hire With RecXchange | One Brief, 15,000+ Recruiters',
  description:
    'Give RecXchange one brief and put 15,000+ specialist recruiters with 270M candidate profiles to work on it. Contingency terms - you pay only on a successful hire.',
  alternates: { canonical: 'https://recxchange.io/for-employers' },
};

const useCases = [
  {
    title: 'Hard-to-fill roles',
    body: 'Niche skills, awkward locations, unloved briefs. A network-wide search finds the recruiter who already knows the three people who can do the job.',
  },
  {
    title: 'Volume hiring',
    body: 'Multiple recruiters work the same brief in parallel - coverage a single agency can’t match, without you managing ten agency relationships.',
  },
  {
    title: 'Executive search',
    body: 'Senior hires move through relationships. The network reaches passive candidates through the recruiters who placed them last time.',
  },
  {
    title: 'International hiring',
    body: 'Recruiters across the UK, US, Europe, Middle East, Africa and Australia - local market knowledge without opening a local office.',
  },
];

const faqs = [
  {
    q: 'What does it cost to post a role?',
    a: 'Nothing upfront. RecXchange works on contingency: you agree a placement fee, and you only pay when you hire a candidate sourced through the network.',
  },
  {
    q: 'How is this different from using a recruitment agency?',
    a: 'One agency gives you one recruiter’s network. RecXchange gives your brief to 15,000+ recruiters with 270M candidate profiles between them - while you deal with a single point of contact.',
  },
  {
    q: 'How fast can I expect candidates?',
    a: 'Roles matched through the network regularly receive first candidate submissions within 48 hours, because recruiters are submitting people they already know and have already qualified.',
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

export default function ForEmployersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-14 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="For employers"
            title={
              <>
                One brief.{' '}
                <span className="grad-text-hot">
                  {STATS.recruiters} recruiters on it.
                </span>
              </>
            }
            sub={`Post a role once and put a vetted network of specialist recruiters - with ${STATS.candidates} candidate profiles between them - to work. You pay only on a successful hire.`}
          />
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href="/contact" size="lg">
              Post a role
            </GradientButton>
            <GhostButton href={`mailto:${SUPPORT_EMAIL}`} external size="lg">
              Email {SUPPORT_EMAIL}
            </GhostButton>
          </div>
        </Reveal>
      </section>

      {/* How it works for employers */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="You brief once. The network competes."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal delay={0}>
            <Step number={1} title="Tell us about the role">
              Share the brief, the location, and the fee terms. It takes ten
              minutes and costs nothing.
            </Step>
          </Reveal>
          <Reveal delay={120}>
            <Step number={2} title="The network goes to work">
              Your role is matched against {STATS.recruiters} recruiters.
              Specialists in your sector submit candidates they already know.
            </Step>
          </Reveal>
          <Reveal delay={240}>
            <Step number={3} title="Hire, then pay">
              Review qualified submissions from one point of contact. The fee
              is only due when someone starts.
            </Step>
          </Reveal>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Where it wins"
            title="Built for the roles agencies hand back"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {useCases.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 90}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-bold text-white mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
                  {uc.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm text-[var(--rx-muted)]">
            Weighing your options?{' '}
            <Link
              href="/compare"
              className="font-semibold grad-text hover:underline"
            >
              Compare RecXchange with agencies, job boards and other networks →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Employer questions" />
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
        <Reveal dir="scale">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-black tracking-tight text-white [text-wrap:balance]">
            The role won&apos;t fill itself.{' '}
            <span className="grad-text-hot">The network will.</span>
          </h2>
          <div className="mt-8">
            <GradientButton href="/contact" size="lg">
              Get in touch about a role
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
