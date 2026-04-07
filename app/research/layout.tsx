import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Research & Statistics | RecXchange Data',
  description: 'RecXchange platform statistics: 70% average split on RecX Direct, $7,000 average fee, $750,000 in live fees. UK, USA, Europe, Middle East, Australia.',
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
