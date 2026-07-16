'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import {
  APP_LOGIN_URL,
  APP_REGISTER_URL,
  NAV_LINKS,
} from '@/lib/redesign/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'glass-strong' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex-shrink-0" aria-label="RecXchange home">
          <Image
            src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png"
            alt="RecXchange"
            width={150}
            height={40}
            className="w-[120px] h-auto sm:w-[140px]"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'text-white'
                    : 'text-[var(--rx-muted)] hover:text-white'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={APP_LOGIN_URL}
            className="text-sm font-medium text-[var(--rx-muted)] hover:text-white transition-colors px-3 py-2"
          >
            Sign in
          </a>
          <a
            href={APP_REGISTER_URL}
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-[linear-gradient(100deg,#8b5cf6,#3b82f6_55%,#22d3ee)] shadow-[0_2px_16px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_2px_24px_rgba(59,130,246,0.55)] hover:-translate-y-px motion-reduce:transition-none"
          >
            Join now
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white glass"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="lg:hidden border-t border-[var(--rx-line)] px-4 pb-6 pt-3"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium text-[var(--rx-text)] hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={APP_REGISTER_URL}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-[linear-gradient(100deg,#8b5cf6,#3b82f6_55%,#22d3ee)]"
            >
              Join now
            </a>
            <a
              href={APP_LOGIN_URL}
              className="inline-flex items-center justify-center rounded-xl border border-[var(--rx-line)] px-5 py-3 text-sm font-semibold text-white"
            >
              Sign in
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
