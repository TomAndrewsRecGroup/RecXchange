import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | RecXchange',
  description: 'RecXchange privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and global privacy regulations.',
  keywords: 'privacy policy, data protection, GDPR compliance, RecXchange privacy, personal data',
  openGraph: {
    title: 'Privacy Policy | RecXchange',
    description: 'How we protect your data and respect your privacy',
    type: 'website',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
