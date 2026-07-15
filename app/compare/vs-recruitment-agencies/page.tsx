import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import ComparisonTable from '@/components/redesign/ComparisonTable';
import { GradientButton, SectionHeading } from '@/components/redesign/ui';

export const metadata: Metadata = {
  title: 'RecXchange vs Recruitment Agencies | One Network vs 15,000',
  description:
    'A recruitment agency gives you one firm’s network. RecXchange puts 15,000+ recruiters on your brief through one point of contact, on identical contingency terms.',
  alternates: {
    canonical: 'https://recxchange.io/compare/vs-recruitment-agencies',
  },
};

const rows = [
  {
    label: 'Reach',
    recxchange: '15,000+ recruiters, 270M candidate profiles',
    other: 'One firm’s consultants and database',
  },
  {
    label: 'Cost model',
    recxchange: 'Contingency - identical to agency terms',
    other: 'Contingency (or retainer for search firms)',
  },
  {
    label: 'Coverage on niche briefs',
    recxchange: 'The network self-selects - specialists pick up your role',
    other: 'Depends whether the agency has that desk',
  },
  {
    label: 'Managing the process',
    recxchange: 'One point of contact, however many recruiters work it',
    other: 'One contact per agency - multiply per agency engaged',
  },
  {
    label: 'Incentive to prioritise you',
    recxchange: 'Recruiters compete for the placement in parallel',
    other: 'Your role queues behind their other clients',
  },
];

export default function VsAgenciesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Comparison"
            title={
              <>
                RecXchange{' '}
                <span className="grad-text">vs recruitment agencies</span>
              </>
            }
            sub="Same contingency terms you already use - the difference is whether one recruiter works your role, or a marketplace of specialists competes to fill it."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <ComparisonTable otherName="Single agency" rows={rows} />
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <div className="grad-border rounded-2xl p-8">
            <h2 className="text-xl font-extrabold text-white mb-3">
              The honest verdict
            </h2>
            <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
              A great specialist agency with genuine depth in your niche is
              worth keeping. RecXchange is what you use when no single agency
              covers the brief - or when you want market-wide coverage without
              managing five agency relationships at once.
            </p>
            <div className="mt-6">
              <GradientButton href="/for-employers">
                Brief the network instead
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
