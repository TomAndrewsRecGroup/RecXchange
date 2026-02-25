import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GDPR Compliance | RecXchange',
  description: 'RecXchange GDPR compliance statement. We are committed to protecting EU citizens data rights under the General Data Protection Regulation.',
  keywords: 'GDPR compliance, data protection, EU privacy, RecXchange GDPR, data rights',
  openGraph: {
    title: 'GDPR Compliance | RecXchange',
    description: 'Our commitment to EU data protection standards',
    type: 'website',
  },
};

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
