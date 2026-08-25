'use client';

import Link from 'next/link';
import type { ControlLock } from '@/lib/entitlements';
import { cn } from '@/lib/format';

export function LockedControl({
  lock,
  children,
  className,
  href,
}: {
  lock: ControlLock;
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  if (!lock.locked) return <>{children}</>;

  const label = lock.label ?? (lock.reason === 'upgrade' ? `Upgrade to ${lock.upgradeTo ?? 'Lite'}` : 'Log in');
  const to =
    href ??
    (lock.reason === 'upgrade' ? '/login' : '/login');

  return (
    <div
      className={cn('relative inline-flex', className)}
      data-testid="locked-control"
    >
      <div className="pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
      <Link
        href={to}
        data-testid="locked-overlay"
        data-lock-reason={lock.reason ?? 'login'}
        className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-[#060312]/75 ring-1 ring-cyan-400/40 backdrop-blur-[1px]"
      >
        <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
          {label}
        </span>
      </Link>
    </div>
  );
}
