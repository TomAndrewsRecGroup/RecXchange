import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Choose RecXchange? | Compare RecXchange vs Traditional Recruitment",
  description: "See why 15,000+ recruiters and hiring managers choose RecXchange. Compare split fee recruitment vs traditional agencies, job boards, and RPO providers. Higher earnings, lower costs, better results.",
  keywords: [
    "why choose RecXchange",
    "RecXchange vs recruitment agencies",
    "RecXchange vs job boards",
    "RecXchange vs RPO",
    "split fee recruitment benefits",
    "recruitment platform comparison"
  ],
  openGraph: {
    title: "Why Choose RecXchange? | Platform Comparison",
    description: "See why 15,000+ recruiters choose RecXchange over traditional methods. Higher earnings, lower costs, better results.",
    url: "https://recxchange.io/why-recxchange",
    type: "website"
  },
  alternates: {
    canonical: "https://recxchange.io/why-recxchange"
  }
};

export default function WhyRecXchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
