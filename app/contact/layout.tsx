import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact RecXchange - Get in Touch With Our Team',
  description: 'Have questions about RecXchange? Contact our team for support, partnership inquiries, or platform information. We are here to help recruiters and hiring managers succeed.',
  keywords: 'contact RecXchange, recruitment support, platform help, partnership inquiries',
  openGraph: {
    title: 'Contact RecXchange',
    description: 'Get in touch with the RecXchange team',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
