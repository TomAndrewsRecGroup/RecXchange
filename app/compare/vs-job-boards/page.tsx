import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import ComparisonTable from '@/components/redesign/ComparisonTable';
import { GradientButton, SectionHeading } from '@/components/redesign/ui';

export const metadata: Metadata = {
  title: 'RecXchange vs Job Boards | Applicants vs Delivered Candidates',
  description:
    'Job boards charge upfront for adverts and deliver applicants. RecXchange is contingency-based and delivers qualified candidates through 15,000+ recruiters. Full comparison.',
  alternates: { canonical: 'https://recxchange.io/compare/vs-job-boards' },
};

const rows = [
  {
    label: 'What you get',
    recxchange: 'Qualified candidates, submitted by recruiters who know them',
    other: 'A stack of applications to screen yourself',
  },
  {
    label: 'Cost model',
    recxchange: 'Contingency - pay only on a successful hire',
    other: 'Pay upfront per advert or per month, hire or not',
  },
  {
    label: 'Passive candidates',
    recxchange: 'Reached through recruiter relationships',
    other: 'Invisible - they aren’t browsing job ads',
  },
  {
    label: 'Screening',
    recxchange: 'Done by the submitting recruiter before you see anyone',
    other: 'Your time, your inbox',
  },
  {
    label: 'Speed on niche roles',
    recxchange: 'A specialist likely already holds the candidate',
    other: 'Wait and hope the right person applies',
  },
];

export default function VsJobBoardsPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Comparison"
            title={
              <>
                RecXchange <span className="grad-text">vs job boards</span>
              </>
            }
            sub="A job board sells you visibility and leaves the work to you. RecXchange sells you nothing upfront - 15,000+ recruiters deliver the candidate, and you pay only when one starts."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <ComparisonTable otherName="Job boards" rows={rows} />
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <div className="grad-border rounded-2xl p-8">
            <h2 className="text-xl font-extrabold text-white mb-3">
              The honest verdict
            </h2>
            <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
              Job boards are fine for high-volume roles where active applicants
              are plentiful. For anything specialist, senior, or urgent - where
              the right person isn&apos;t reading job ads - a recruiter network
              wins on both speed and quality, and costs nothing unless it
              delivers.
            </p>
            <div className="mt-6">
              <GradientButton href="/for-employers">
                Put the network on your role
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
