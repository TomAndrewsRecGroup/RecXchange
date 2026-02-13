// Home page for RecXchange

import StatsSection from '../components/StatsSection';
import TrustSection from '../components/TrustSection';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero section replicating original two‑card layout.
          We preserve the RecXchange brand colours and layout while improving semantics.
          Each card clearly targets either recruiters or hiring managers, addressing their pain points. */}
      <section className="min-h-screen flex items-center justify-center bg-gray-950 text-white py-20">
        <div className="container mx-auto px-4">
          {/* Accessible page title for SEO (hidden visually) */}
          <h1 className="sr-only">
            RecXchange – Split‑Fee Recruitment Network for Recruiters and Hiring Managers
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recruiter card */}
            <div
              className="p-8 rounded-3xl shadow-lg flex flex-col justify-between"
              style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-3">For Recruiters</h2>
                <p className="mb-6 text-sm md:text-base">
                  Collaborate with thousands of vetted peers on split‑fee roles, access a shared pool of
                  candidates and protect your commissions every step of the way.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/recruiters"
                  className="bg-white text-gray-900 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Explore the Recruiter Path
                </Link>
                <Link
                  href="/recruiters/register"
                  className="bg-gray-900 bg-opacity-70 text-white font-semibold px-4 py-2 rounded shadow hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Join Now
                </Link>
              </div>
            </div>
            {/* Hiring manager / RecX Direct card */}
            <div
              className="p-8 rounded-3xl shadow-lg flex flex-col justify-between"
              style={{ backgroundImage: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-3">For Hiring Managers</h2>
                <p className="mb-6 text-sm md:text-base">
                  Post your roles to RecX Direct to access top recruiters, pay only on hire and benefit
                  from transparent, secure fee arrangements backed by escrow protection.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/direct"
                  className="bg-white text-gray-900 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Discover RecX Direct
                </Link>
                <Link
                  href="/direct/post-role"
                  className="bg-gray-900 bg-opacity-70 text-white font-semibold px-4 py-2 rounded shadow hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Post a Role
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section with live metrics */}
      <StatsSection />

      {/* Trust & Protection section */}
      <TrustSection />
    </>
  );
}