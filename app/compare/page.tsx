import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import { SectionHeading, GlassCard } from '@/components/redesign/ui';

export const metadata: Metadata = {
  title: 'Compare RecXchange | vs Job Boards, Agencies & Split-Fee Networks',
  description:
    'How RecXchange compares with job boards, traditional recruitment agencies, and legacy split-fee networks like NPA Worldwide and Top Echelon - side by side.',
  alternates: { canonical: 'https://recxchange.io/compare' },
};

const comparisons = [
  {
    href: '/compare/vs-job-boards',
    title: 'vs Job boards',
    body: 'Job boards give you applicants. RecXchange gives you recruiters who already hold the candidate - and only get paid when someone starts.',
  },
  {
    href: '/compare/vs-recruitment-agencies',
    title: 'vs Recruitment agencies',
    body: 'One agency is one network. RecXchange puts 15,000+ recruiters on the brief through a single point of contact, on the same contingency terms.',
  },
  {
    href: '/compare/vs-split-fee-networks',
    title: 'vs Legacy split-fee networks',
    body: 'NPA Worldwide, Top Echelon, Recruit Alliance - the model works, the tooling is dated. Here’s what automated contracts and live matching change.',
  },
];

export default function ComparePage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-14 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Compare"
            title={
              <>
                See how RecXchange <span className="grad-text">stacks up</span>
              </>
            }
            sub="Honest, side-by-side comparisons against the alternatives - because the model sells itself once the columns are next to each other."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {comparisons.map((c, i) => (
            <Reveal key={c.href} delay={i * 110}>
              <Link href={c.href} className="block h-full group">
                <GlassCard className="h-full transition-colors group-hover:border-[var(--rx-violet)]">
                  <h2 className="text-xl font-extrabold text-white mb-3">
                    {c.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--rx-muted)] mb-5">
                    {c.body}
                  </p>
                  <span className="text-sm font-semibold grad-text">
                    Read the comparison →
                  </span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
