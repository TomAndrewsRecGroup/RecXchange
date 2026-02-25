import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiters With Candidates | RecXchange Marketplace',
  description: 'Browse recruiters with pre-vetted candidates ready for placement. Connect with specialized recruiters and access their talent pools for your open roles.',
  keywords: 'recruiters with candidates, talent pools, pre-vetted candidates, recruiter network',
  openGraph: {
    title: 'Recruiters With Candidates | RecXchange',
    description: 'Connect with recruiters who have pre-vetted talent ready',
    type: 'website',
  },
};

export default function RecruitersWithCandidatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
