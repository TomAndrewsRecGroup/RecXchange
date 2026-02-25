import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Research & Statistics | RecXchange Data',
  description: 'RecXchange platform statistics: 70% average recruiter split on RecX Direct, $7,000 average fee across 100+ live roles, $750,000 total available fees. Roles across UK, USA, Europe, Africa, Middle East, Australia in Engineering, Healthcare, Tech, HR, Sales, Finance.',
  keywords: 'candidate database, talent search, recruiter research, 270 million candidates, professional profiles, recruitment statistics, platform data',
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: 'Platform Research & Statistics | RecXchange',
    description: 'Real data from our growing global recruitment network',
    type: 'website',
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
