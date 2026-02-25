import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pricing & Plans | RecXchange - From $1/month | Split Fee Recruitment",
  description: "RecXchange pricing starts at $1/month. Choose Entry ($1), Lite ($99), Pro ($250), or Teams (custom). One placement pays for 5-12 months. No platform fees on placements. Access 15,000+ recruiters and 270M candidates.",
  keywords: [
    "recruiter pricing",
    "recruitment platform cost",
    "split fee recruitment pricing",
    "recruiter collaboration cost",
    "recruitment software pricing",
    "RecXchange pricing",
    "recruitment platform tiers"
  ],
  openGraph: {
    title: "RecXchange Pricing - From $1/month",
    description: "One placement pays for the year. Entry $1, Lite $99, Pro $250. No platform fees on placements.",
    url: "https://recxchange.io/pricing",
    type: "website"
  },
  alternates: {
    canonical: "https://recxchange.io/pricing"
  }
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
