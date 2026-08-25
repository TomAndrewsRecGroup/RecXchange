'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function RequireSession({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/login');
    else if (admin && !user.is_admin) router.replace('/');
  }, [user, loading, admin, router]);

  if (loading) {
    return <p className="text-sm text-[var(--rx-faint)]">Checking session…</p>;
  }
  if (!user) return <p className="text-sm text-[var(--rx-muted)]">Redirecting to log in…</p>;
  if (admin && !user.is_admin) {
    return <p className="text-sm text-[var(--rx-muted)]">Admin only.</p>;
  }
  return <>{children}</>;
}
