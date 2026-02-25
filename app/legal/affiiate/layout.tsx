import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Program Terms | RecXchange',
  description: 'RecXchange affiliate program terms and conditions. Learn about commission structure, referral rules, and partnership requirements.',
  keywords: 'affiliate program, referral terms, commission structure, RecXchange partnership',
  openGraph: {
    title: 'Affiliate Program Terms | RecXchange',
    description: 'Partner with us and earn commissions',
    type: 'website',
  },
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
