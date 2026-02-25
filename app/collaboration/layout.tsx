import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collaboration & Split Fees | RecXchange',
  description: 'How split fee collaboration works on RecXchange. Partner with 15,000+ recruiters, share opportunities, and earn fair splits on successful placements.',
  keywords: 'split fees, recruiter collaboration, partnership model, fee sharing, recruitment network',
  openGraph: {
    title: 'Collaboration & Split Fees | RecXchange',
    description: 'Partner with recruiters and share placement fees',
    type: 'website',
  },
};

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
