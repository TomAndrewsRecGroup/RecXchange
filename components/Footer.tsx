// Footer component for RecXchange site
// Mirrors the split navigation structure of the header and adds company links.

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-900 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">RecXchange</h3>
          <p className="text-sm">
            The recruiter collaboration infrastructure powering split‑fee recruitment worldwide.
          </p>
        </div>
        {/* Recruiter navigation */}
        <div>
          <h4 className="font-semibold text-white mb-2">For Recruiters</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/recruiters" className="hover:underline">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/roles" className="hover:underline">
                Collaborative Roles
              </Link>
            </li>
            <li>
              <Link href="/candidates" className="hover:underline">
                Candidate Pool
              </Link>
            </li>
            <li>
              <Link href="/recruiters/register" className="hover:underline">
                Join RecXchange
              </Link>
            </li>
          </ul>
        </div>
        {/* RecX Direct navigation */}
        <div>
          <h4 className="font-semibold text-white mb-2">For Hiring Managers</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/direct" className="hover:underline">
                RecX Direct
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/direct/post-role" className="hover:underline">
                Post a Role
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} RecXchange. All rights reserved.
      </div>
    </footer>
  );
}