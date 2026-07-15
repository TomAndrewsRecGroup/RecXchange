import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import ComparisonTable from '@/components/redesign/ComparisonTable';
import { GradientButton, SectionHeading } from '@/components/redesign/ui';
import { APP_REGISTER_URL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title:
    'RecXchange vs NPA Worldwide, Top Echelon & Recruit Alliance | Split-Fee Networks Compared',
  description:
    'How RecXchange compares with legacy split-fee networks: automated contracts and timestamped submissions vs manual agreements, $1 entry vs annual commitments, up to 70% splits via RecX Direct.',
  alternates: {
    canonical: 'https://recxchange.io/compare/vs-split-fee-networks',
  },
};

const rows = [
  {
    label: 'Split agreements',
    recxchange: 'Generated and signed automatically before details exchange',
    other: 'Manual contracts, often negotiated per deal',
  },
  {
    label: 'Candidate ownership',
    recxchange: 'Timestamped submissions — disputes settled by the record',
    other: 'Depends on member conduct and network arbitration',
  },
  {
    label: 'Entry cost',
    recxchange: 'From $1/month, cancel anytime',
    other: 'Typically annual memberships and/or brokerage fees',
  },
  {
    label: 'Best available split',
    recxchange: 'Up to 70% in your favour on RecX Direct employer roles',
    other: 'Usually 50/50 recruiter-to-recruiter splits only',
  },
  {
    label: 'Matching',
    recxchange: 'Live matching engine across roles and candidates',
    other: 'Directories, email lists, and manual browsing',
  },
];

export default function VsSplitFeeNetworksPage() {
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
                <span className="grad-text">vs legacy split-fee networks</span>
              </>
            }
            sub="NPA Worldwide, Top Echelon and Recruit Alliance proved the split-fee model works. RecXchange rebuilds it with automated contracts, timestamped ownership, and employer-direct roles."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <ComparisonTable otherName="Legacy networks" rows={rows} />
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <div className="grad-border rounded-2xl p-8">
            <h2 className="text-xl font-extrabold text-white mb-3">
              The honest verdict
            </h2>
            <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
              The established networks have long-standing member communities,
              and that history counts for something. Where RecXchange pulls
              ahead is automation — contracts, timestamps, and matching that
              remove the manual trust-building the legacy model depends on —
              plus RecX Direct roles no recruiter-to-recruiter network can
              offer.
            </p>
            <div className="mt-6">
              <GradientButton href={APP_REGISTER_URL} external>
                Try it from $1/month
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
