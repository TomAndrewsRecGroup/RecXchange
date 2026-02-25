import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post | RecXchange',
  description: 'Read insights, updates, and expert advice from RecXchange. Stay informed about recruitment industry trends and platform developments.',
  keywords: 'recruitment blog post, industry insights, RecXchange updates',
  openGraph: {
    title: 'Blog Post | RecXchange',
    description: 'Recruitment insights and platform updates',
    type: 'article',
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
