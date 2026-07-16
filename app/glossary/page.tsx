import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import { SectionHeading, GradientButton } from '@/components/redesign/ui';
import { APP_REGISTER_URL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'Split-Fee Recruitment Glossary | Every Term Defined | RecXchange',
  description:
    'Plain-English definitions of every split-fee recruitment term: fee splits, candidate ownership, job orders, contingency vs retained, deal protection, tokens, and more.',
  alternates: { canonical: 'https://recxchange.io/glossary' },
};

interface Term {
  slug: string;
  name: string;
  alt?: string[];
  def: string;
}

const terms: Term[] = [
  {
    slug: 'split-fee-recruitment',
    name: 'Split-fee recruitment',
    alt: ['Fee split recruitment', 'Fee share recruitment'],
    def: 'A partnership in which two recruiters share one placement fee: one supplies the role (the job order) and the other supplies the candidate. Typical splits are 50/50 between recruiters, or up to 70/30 in the candidate-side recruiter\'s favour on employer-direct marketplaces such as RecX Direct.',
  },
  {
    slug: 'split-fee-agreement',
    name: 'Split-fee agreement',
    def: 'The contract between two partnering recruiters that fixes the fee percentages, payment timeline, responsibilities, and dispute terms before any candidate details are exchanged. On RecXchange these agreements are generated and accepted automatically at the start of every partnership.',
  },
  {
    slug: 'job-order',
    name: 'Job order (role holder)',
    def: 'The vacancy a recruiter has been engaged to fill, together with the client relationship behind it. In a split-fee partnership, the recruiter who owns the job order is the "role holder" and typically receives half of the placement fee.',
  },
  {
    slug: 'candidate-owner',
    name: 'Candidate owner',
    def: 'The recruiter who sourced and represents a candidate in a split-fee partnership. The candidate owner submits the candidate to the role holder\'s vacancy and receives the agreed share of the fee when the candidate is placed.',
  },
  {
    slug: 'candidate-ownership',
    name: 'Candidate ownership',
    def: 'The question of which recruiter introduced a candidate first, and therefore who is owed the fee. Disputes over ownership are the main reason recruiters historically avoided collaboration; timestamped submissions resolve them by record rather than argument.',
  },
  {
    slug: 'timestamped-submission',
    name: 'Timestamped submission',
    def: 'A candidate submission recorded with the exact date, time, and submitting recruiter. If two recruiters submit the same candidate to the same role, the earlier timestamp establishes ownership automatically.',
  },
  {
    slug: 'deal-protection',
    name: 'Deal protection',
    def: 'The combination of timestamped submissions and auto-generated split-fee agreements that guarantees neither side of a recruitment partnership can be cut out of a fee. Terms are locked before candidate details are shared, so they cannot drift afterwards.',
  },
  {
    slug: 'contingency-recruitment',
    name: 'Contingency recruitment',
    def: 'The traditional agency model: multiple agencies work the same role in competition and only the first to place a candidate earns the fee. It creates a race-to-submit dynamic; split-fee collaboration replaces the race with a shared outcome.',
  },
  {
    slug: 'retained-search',
    name: 'Retained search',
    def: 'A recruitment engagement where the client pays part of the fee upfront (often 30-50%) for an exclusive search, regardless of outcome. Contrast with contingency and split-fee models, where payment is due only on a successful placement.',
  },
  {
    slug: 'placement-fee',
    name: 'Placement fee',
    def: 'The fee an employer pays when a candidate is successfully placed, usually 12-20% of the candidate\'s first-year salary. In a split-fee placement this single fee is shared between the partnering recruiters at the agreed ratio.',
  },
  {
    slug: 'fee-split-ratio',
    name: 'Fee split ratio',
    def: 'The agreed division of a placement fee between partnering recruiters, expressed as percentages: 50/50 is standard between two recruiters; 60/40 and 70/30 favour the candidate-side recruiter on employer-direct roles.',
  },
  {
    slug: 'passive-candidate',
    name: 'Passive candidate',
    def: 'Someone employed and not actively job hunting, but open to the right opportunity. Passive candidates rarely appear on job boards; they are reached through recruiter relationships, which is why recruiter networks outperform advertising for senior and niche roles.',
  },
  {
    slug: 'recruitment-marketplace',
    name: 'Recruitment marketplace',
    def: 'A platform where recruitment supply and demand meet: recruiters with roles, recruiters with candidates, and employers with vacancies transact under standardised terms. RecXchange is a split-fee recruitment marketplace with 15,000+ verified recruiters.',
  },
  {
    slug: 'recx-direct',
    name: 'RecX Direct',
    def: 'RecXchange\'s employer-direct product, operated by Andrews Recruitment Group t/a RecX Direct (UK). Employers post roles straight to the network, and because there is no second agency in the chain, the recruiter who delivers the candidate keeps up to 70% of the placement fee.',
  },
  {
    slug: 'xchange-engine',
    name: 'Xchange Engine',
    def: 'RecXchange\'s AI matching system. It builds a fingerprint of every role across sector, seniority, location, salary, and skills, then ranks and alerts the specialist recruiters most likely to hold a matching candidate, in real time.',
  },
  {
    slug: 'tokens',
    name: 'Tokens (RecXchange)',
    def: 'The platform currency used to take actions on RecXchange, such as submitting a candidate to a role. Plans include a monthly allowance: 5 tokens on RecX Entry ($1/mo), 150 on RecX Lite ($99/mo), and 400 on RecX Pro ($249/mo).',
  },
];

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': 'https://recxchange.io/glossary#termset',
  name: 'Split-Fee Recruitment Glossary',
  description:
    'Definitions of split-fee recruitment and recruiter collaboration terminology, maintained by RecXchange.',
  url: 'https://recxchange.io/glossary',
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `https://recxchange.io/glossary#${t.slug}`,
    name: t.name,
    ...(t.alt ? { alternateName: t.alt } : {}),
    description: t.def,
    inDefinedTermSet: 'https://recxchange.io/glossary#termset',
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Glossary"
            title={
              <>
                Split-fee recruitment,{' '}
                <span className="grad-text">term by term</span>
              </>
            }
            sub="Plain-English definitions of every term you'll meet in recruiter collaboration. No jargon left unexplained."
          />
        </Reveal>
      </section>

      {/* Term index */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
        <Reveal>
          <nav
            aria-label="Glossary terms"
            className="glass rounded-2xl p-5 flex flex-wrap gap-2 justify-center"
          >
            {terms.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="rounded-full border border-[var(--rx-line)] px-3 py-1 text-xs font-semibold text-[var(--rx-muted)] hover:text-white hover:border-[var(--rx-violet)] transition-colors"
              >
                {t.name}
              </a>
            ))}
          </nav>
        </Reveal>
      </section>

      {/* Definitions */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <dl className="space-y-4">
          {terms.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 4) * 60}>
              <div id={t.slug} className="glass rounded-2xl p-6 scroll-mt-24">
                <dt className="text-lg font-bold text-white">{t.name}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--rx-muted)] m-0">
                  {t.def}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm text-[var(--rx-muted)]">
            Want the full picture?{' '}
            <Link
              href="/how-it-works"
              className="font-semibold grad-text hover:underline"
            >
              Read how split-fee recruitment works
            </Link>{' '}
            or{' '}
            <Link
              href="/split-fee-agreement-template"
              className="font-semibold grad-text hover:underline"
            >
              grab the free agreement template
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
            Now see the terms in action
          </h2>
          <div className="mt-6">
            <GradientButton href={APP_REGISTER_URL} external>
              Join the network
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
