import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | RecXchange',
  description: 'Common questions about RecXchange answered. Learn about pricing, split fees, platform features, and how our recruitment marketplace works for recruiters and hiring managers.',
  keywords: 'RecXchange FAQ, recruitment questions, platform help, split fee explained, how RecXchange works',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | RecXchange',
    description: 'Get answers to common questions about RecXchange',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
