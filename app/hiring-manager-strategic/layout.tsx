import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategic Hiring - Test the Market Before You Hire | RecXchange',
  description: 'Test the talent market before officially opening a role. Get market insights, salary benchmarks, and pre-vetted candidates. Strategic hiring for forward-thinking companies.',
  keywords: 'strategic hiring, market testing, talent intelligence, salary benchmarking, pre-hire research',
  openGraph: {
    title: 'Strategic Hiring - Test the Market | RecXchange',
    description: 'Test the talent market before officially opening a role',
    type: 'website',
  },
};

export default function HiringManagerStrategicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
