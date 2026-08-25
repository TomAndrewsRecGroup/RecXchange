import type { Plan, RoleKind, User } from './types';

export type LockReason = 'login' | 'upgrade';

export interface ControlLock {
  locked: boolean;
  reason?: LockReason;
  upgradeTo?: string;
  label?: string;
}

export function planOf(user: User | null): Plan {
  return user?.plan ?? 'guest';
}

export function canMutate(user: User | null): boolean {
  return !!user && user.plan !== 'guest';
}

export function canWorkDirect(user: User | null): boolean {
  return !!user && ['entry', 'lite', 'pro'].includes(user.plan);
}

export function canApplyDirect(user: User | null): boolean {
  return canWorkDirect(user);
}

export function canAccessReferral(user: User | null): boolean {
  return !!user && ['lite', 'pro'].includes(user.plan);
}

export function canPostXchange(user: User | null): boolean {
  return !!user && ['entry', 'lite', 'pro'].includes(user.plan);
}

export function applyLock(user: User | null, kind: RoleKind): ControlLock {
  if (!user) {
    return { locked: true, reason: 'login', label: 'Log in' };
  }
  if (kind === 'referral' && !canAccessReferral(user)) {
    return {
      locked: true,
      reason: 'upgrade',
      upgradeTo: 'Lite',
      label: 'Upgrade to Lite',
    };
  }
  if (kind === 'direct' && !canApplyDirect(user)) {
    return {
      locked: true,
      reason: 'upgrade',
      upgradeTo: 'Entry',
      label: 'Upgrade to Entry',
    };
  }
  if (kind === 'xchange' && !canPostXchange(user)) {
    return {
      locked: true,
      reason: 'upgrade',
      upgradeTo: 'Entry',
      label: 'Upgrade to Entry',
    };
  }
  return { locked: false };
}

export function workLock(user: User | null, kind: RoleKind): ControlLock {
  if (kind !== 'direct') return { locked: false };
  if (!user) return { locked: true, reason: 'login', label: 'Log in' };
  if (!canWorkDirect(user)) {
    return {
      locked: true,
      reason: 'upgrade',
      upgradeTo: 'Entry',
      label: 'Upgrade to Entry',
    };
  }
  return { locked: false };
}

export function addLock(user: User | null): ControlLock {
  if (!user) return { locked: true, reason: 'login', label: 'Log in' };
  return { locked: false };
}

export function planLabel(plan: Plan): string {
  switch (plan) {
    case 'entry':
      return 'Entry';
    case 'lite':
      return 'Lite';
    case 'pro':
      return 'Pro';
    default:
      return 'Guest';
  }
}
