import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RecXchange Blog - Recruitment Industry Insights & News',
  description: 'Latest updates, tips, and insights from RecXchange. Stay informed about recruitment trends, platform features, and success stories from our 15,000+ recruiter community.',
  keywords: 'recruitment blog, hiring insights, recruiter tips, RecXchange updates, recruitment trends',
  openGraph: {
    title: 'RecXchange Blog - Recruitment Industry Insights',
    description: 'Latest updates, tips, and insights from RecXchange',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
