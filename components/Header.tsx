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
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-cyan-400/20 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Left: Logo */}
          <Link href="/home" className="flex-shrink-0 z-[110] relative">
            <Image
              src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png"
              alt="RecXchange Logo"
              width={150}
              height={40}
              className="w-[120px] h-auto sm:w-[150px]"
              priority
              style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.5))' }}
            />
          </Link>

          {/* Desktop Nav - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/home" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Home</Link>

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
              href="https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1" 
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              rel="external"
              data-intent="platform-access"
            >
              Platform Login
            </Link>
            <Link
              href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              Get Started Today
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden z-[110] relative text-white p-2 hover:text-cyan-400 transition-colors tap-target"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header for better z-index control */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[99] lg:hidden bg-[#050508] border-l border-cyan-400/20 overflow-y-auto"
            >
              <div className="px-6 py-20 space-y-6">
                {/* Mobile CTAs */}
                <div className="flex flex-col gap-3 pb-6 border-b border-cyan-400/20">
                  <Link
                    href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold text-center shadow-[0_0_20px_rgba(0,255,255,0.3)] tap-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started Today
                  </Link>
                  <Link 
                    href="https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1" 
                    className="w-full py-3.5 rounded-full border border-cyan-400/30 text-cyan-400 text-sm font-bold text-center tap-target"
                    rel="external"
                    data-intent="platform-access"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Platform Login
                  </Link>
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-4">
                  <Link 
                    href="/home" 
                    className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Recruiters Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileRecruitersOpen(!mobileRecruitersOpen)}
                      className="flex items-center justify-between w-full text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 tap-target"
                    >
                      <span>Recruiters</span>
                      <ChevronDown 
                        size={18} 
                        className={`transform transition-transform ${mobileRecruitersOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {mobileRecruitersOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-4 space-y-2 overflow-hidden"
                        >
                          <Link 
                            href="/recruiter" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Recruiter Home
                          </Link>
                          <Link 
                            href="/recruiter-roles" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Recruiters with Roles
                          </Link>
                          <Link 
                            href="/recruiters-with-candidates" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Recruiters with Candidates
                          </Link>
                          <Link 
                            href="/collaboration" 
                            className="block text-sm text-fuchsia-400 hover:text-fuchsia-300 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Split Fees
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hiring Manager Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileHiringOpen(!mobileHiringOpen)}
                      className="flex items-center justify-between w-full text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 tap-target"
                    >
                      <span>Hiring Manager</span>
                      <ChevronDown 
                        size={18} 
                        className={`transform transition-transform ${mobileHiringOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {mobileHiringOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-4 space-y-2 overflow-hidden"
                        >
                          <Link 
                            href="/hiring-manager-home" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Hiring Manager Home
                          </Link>
                          <Link 
                            href="/hiring-manager-live" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Hiring Now?
                          </Link>
                          <Link 
                            href="/hiring-manager-strategic" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Hiring Soon?
                          </Link>
                          <Link 
                            href="/account-management" 
                            className="block text-sm text-gray-400 hover:text-cyan-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Managed Service
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    href="/pricing" 
                    className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/collaboration" 
                    className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Collaboration
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="/roles" 
                    className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Live Roles
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
