// Global layout for RecXchange site
// Defines metadata and imports the Header and Footer components.

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'RecXchange – Recruiter Collaboration Infrastructure',
  description:
    'Join 15,000+ recruiters and hiring managers on the leading platform for split‑fee recruitment. Protect deals, access shared roles and candidates, and earn more with RecXchange.',
  openGraph: {
    title: 'RecXchange – Split‑Fee Operating System',
    description:
      'The infrastructure layer for recruiter collaboration. Protect your split fees and grow your network.',
    url: 'https://recxchange.io',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}