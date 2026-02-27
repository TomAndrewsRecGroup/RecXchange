"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRecruitersOpen, setMobileRecruitersOpen] = useState(false);
  const [mobileHiringOpen, setMobileHiringOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-cyan-400/20 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0 z-[110]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w"
            alt="RecXchange Logo"
            width={120}
            height={32}
            className="sm:w-[150px] sm:h-[40px]"
            priority
            style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.5))' }}
          />
        </Link>

        {/* Desktop Nav - Hidden on mobile/tablet */}
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

        {/* Desktop CTAs - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" 
            className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            rel="external"
            data-intent="platform-access"
          >
            Login
          </Link>
          <Link
            href="{{trigger_link.jYQNc9YXcMkYPvo3HZfC}}"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            Get Started Today
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-[110] text-white p-2 hover:text-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[105] lg:hidden bg-[#050508] pt-20 overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-6">
              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pb-6 border-b border-cyan-400/20">
                <Link
                  href="{{trigger_link.jYQNc9YXcMkYPvo3HZfC}}"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold text-center shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Today
                </Link>
                <Link 
                  href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" 
                  className="w-full py-3 rounded-full border border-cyan-400/30 text-cyan-400 text-sm font-bold text-center"
                  rel="external"
                  data-intent="platform-access"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>

              {/* Mobile Nav Links */}
              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Recruiters Accordion */}
                <div>
                  <button
                    onClick={() => setMobileRecruitersOpen(!mobileRecruitersOpen)}
                    className="flex items-center justify-between w-full text-lg text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Recruiters
                    <ChevronDown size={18} className={`transform transition-transform ${mobileRecruitersOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileRecruitersOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 ml-4 space-y-3 overflow-hidden"
                      >
                        <Link href="/recruiter" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Recruiter Home</Link>
                        <Link href="/recruiter-roles" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Recruiters with Roles</Link>
                        <Link href="/recruiters-with-candidates" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Recruiters with Candidates</Link>
                        <Link href="/collaboration" className="block text-sm text-fuchsia-400 hover:text-fuchsia-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Split Fees</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hiring Manager Accordion */}
                <div>
                  <button
                    onClick={() => setMobileHiringOpen(!mobileHiringOpen)}
                    className="flex items-center justify-between w-full text-lg text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Hiring Manager
                    <ChevronDown size={18} className={`transform transition-transform ${mobileHiringOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileHiringOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 ml-4 space-y-3 overflow-hidden"
                      >
                        <Link href="/hiring-manager-home" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Hiring Manager Home</Link>
                        <Link href="/hiring-manager-live" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Hiring Now?</Link>
                        <Link href="/hiring-manager-strategic" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Hiring Soon?</Link>
                        <Link href="/account-management" className="block text-sm text-gray-400 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Managed Service</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/pricing" className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                <Link href="/collaboration" className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Collaboration</Link>
                <Link href="/contact" className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                <Link href="/roles" className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Live Roles</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
