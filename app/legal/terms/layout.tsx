import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | RecXchange',
  description: 'RecXchange terms of service and conditions. Read our user agreement, platform rules, and legal terms for recruiters and hiring managers.',
  keywords: 'terms of service, user agreement, RecXchange terms, platform rules, legal conditions',
  openGraph: {
    title: 'Terms of Service | RecXchange',
    description: 'User agreement and platform terms',
    type: 'website',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
