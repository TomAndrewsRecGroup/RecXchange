import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deal Protection & Split Fee Contracts | RecXchange',
  description: 'How RecXchange protects both recruiters with automated split fee contracts, transparent terms, and secure payment processing. Fair deals for all parties.',
  keywords: 'split fee protection, recruitment contracts, deal security, payment protection, fair split agreements',
  openGraph: {
    title: 'Deal Protection & Split Fee Contracts | RecXchange',
    description: 'Automated contracts and payment protection for recruiters',
    type: 'website',
  },
};

export default function DealProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
