"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-cyan-400/20 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w"
            alt="RecXchange Logo"
            width={150}
            height={40}
            priority
            style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.5))' }}
          />
        </Link>

        {/* Center: Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Home</Link>

          {/* Recruiters Dropdown */}
          <div className="group relative py-4">
            <button className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
              Recruiters <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-[#050508] border border-cyan-400/20 rounded-lg p-2 shadow-2xl">
              <Link href="/recruiter" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Recruiter Home</Link>
              <Link href="/recruiter-roles" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Recruiters with Roles</Link>
              <Link href="/recruiters-with-candidates" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Recruiters with Candidates</Link>
              <Link href="/collaboration" className="block px-4 py-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-400/5 rounded border-t border-white/5 mt-1 font-medium">Split Fees</Link>
            </div>
          </div>

          {/* Hiring Manager Dropdown */}
          <div className="group relative py-4">
            <button className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
              Hiring Manager <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-[#050508] border border-cyan-400/20 rounded-lg p-2 shadow-2xl">
              <Link href="/hiring-manager-home" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Hiring Manager Home</Link>
              <Link href="/hiring-manager-live" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Hiring Now?</Link>
              <Link href="/hiring-manager-strategic" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded">Hiring Soon?</Link>
              <Link href="/account-management" className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded border-t border-white/5 mt-1">Managed Service</Link>
            </div>
          </div>

          <Link href="/pricing" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Pricing</Link>
          <Link href="/collaboration" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Collaboration</Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Contact Us</Link>
          <Link href="/roles" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Live Roles</Link>
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-4">
          <Link href="https://app.recxchange.io" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
            Login
          </Link>
          <Link
            href="https://app.recxchange.io/register"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </header>
  );
}
