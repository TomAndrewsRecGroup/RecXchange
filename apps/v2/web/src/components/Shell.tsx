'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { planLabel } from '@/lib/entitlements';
import { cn } from '@/lib/format';

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2" data-testid="wordmark">
      <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
        RecXchange
      </span>
      <span
        data-testid="v2-chip"
        className="rounded-md bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300 ring-1 ring-cyan-400/40"
      >
        v2
      </span>
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const guest = !user;

  const links = guest
    ? [{ href: '/', label: 'Marketplace', testId: 'nav-marketplace' }]
    : [
        { href: '/', label: 'Marketplace', testId: 'nav-marketplace' },
        { href: '/ats', label: 'ATS', testId: 'nav-ats' },
        { href: '/xray', label: 'X-Ray', testId: 'nav-xray' },
        ...(user.is_admin ? [{ href: '/admin', label: 'Admin', testId: 'nav-admin' }] : []),
      ];

  async function onLogout() {
    await logout();
    router.push('/');
  }

  return (
    <div className="rx-grid min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060312]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark />

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main"
            data-testid="main-nav"
          >
            {links.map((l) => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-testid={l.testId}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-[var(--rx-muted)] hover:text-white',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {guest ? (
              <Link
                href="/login"
                data-testid="nav-login"
                className="rounded-lg bg-cyan-400/15 px-3 py-1.5 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40 hover:bg-cyan-400/25"
              >
                Log in
              </Link>
            ) : (
              <>
                <span
                  data-testid="plan-chip"
                  className="hidden rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fuchsia-200 ring-1 ring-fuchsia-500/30 sm:inline"
                >
                  {planLabel(user.plan)}
                  {user.is_admin ? ' · Admin' : ''}
                </span>
                <span className="hidden max-w-[12rem] truncate text-xs text-[var(--rx-muted)] lg:inline">
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void onLogout()}
                  data-testid="nav-logout"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-[var(--rx-muted)] hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </>
            )}
            <button
              type="button"
              className="rounded-lg p-2 text-white md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="space-y-1 border-t border-white/10 px-4 py-3 md:hidden" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-testid={`${l.testId}-mobile`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {guest && !loading && pathname !== '/login' && (
        <div
          data-testid="guest-banner"
          className="border-b border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-center text-sm text-cyan-100"
        >
          Open marketplace — data is live, Apply and Work are locked.{' '}
          <Link href="/login" className="font-semibold text-cyan-300 underline-offset-2 hover:underline">
            Log in
          </Link>
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">{children}</main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-[var(--rx-faint)]">
        RecXchange v2 prototype · UK English · not the marketing site
      </footer>
    </div>
  );
}
