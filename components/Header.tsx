// Header component for RecXchange site
// This component defines a split navigation for recruiters and RecX Direct clients.

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 bg-gray-950 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          RecXchange
        </Link>
        {/* Navigation split into two groups */}
        <nav className="hidden md:flex space-x-8" aria-label="Primary">
          {/* Recruiter journey */}
          <div className="flex space-x-4" aria-label="Recruiter navigation">
            <Link href="/recruiters" className="hover:underline">
              Recruiters
            </Link>
            <Link href="/roles" className="hover:underline">
              Collaborative Roles
            </Link>
            <Link href="/candidates" className="hover:underline">
              Candidate Pool
            </Link>
          </div>
          {/* Separator */}
          <div className="border-l border-gray-700 h-6" aria-hidden="true"></div>
          {/* RecX Direct journey */}
          <div className="flex space-x-4" aria-label="RecX Direct navigation">
            <Link href="/direct" className="hover:underline">
              RecX Direct
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </nav>
        {/* CTA buttons */}
        <div className="space-x-4">
          <Link
            href="/recruiters/register"
            className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Join as Recruiter
          </Link>
          <Link
            href="/direct/post-role"
            className="hidden md:inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Post a Role
          </Link>
        </div>
      </div>
    </header>
  );
}