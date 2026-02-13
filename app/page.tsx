// Home page for RecXchange

import StatsSection from '../components/StatsSection';
import TrustSection from '../components/TrustSection';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Recruiter Collaboration Infrastructure
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            The platform where 15,000+ recruiters and hiring managers collaborate on split‑fee roles,
            protect deals and maximise earnings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/recruiters/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
            >
              Join as Recruiter
            </Link>
            <Link
              href="/direct/post-role"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            >
              Post a Role
            </Link>
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