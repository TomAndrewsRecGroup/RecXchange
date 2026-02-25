import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Management | RecXchange',
  description: 'Your dedicated account manager on RecXchange. Single point of contact for hiring managers to streamline recruitment and avoid recruiter spam.',
  keywords: 'account management, dedicated support, hiring manager support, recruitment coordinator',
  openGraph: {
    title: 'Account Management | RecXchange',
    description: 'Your dedicated recruitment account manager',
    type: 'website',
  },
};

export default function AccountManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
