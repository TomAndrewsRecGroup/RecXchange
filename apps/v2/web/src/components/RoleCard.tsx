'use client';

import Link from 'next/link';
import { MapPin, Wallet } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { LockedControl } from './LockedControl';
import { applyLock, workLock } from '@/lib/entitlements';
import { clientIsHidden, cn, formatSalary, formatSplit, kindLabel } from '@/lib/format';
import type { Role } from '@/lib/types';

const KIND_ACCENT: Record<string, string> = {
  direct: 'from-cyan-400/80 to-cyan-400/10',
  xchange: 'from-fuchsia-500/80 to-fuchsia-500/10',
  referral: 'from-purple-400/80 to-purple-400/10',
};

const KIND_CHIP: Record<string, string> = {
  direct: 'text-cyan-300 bg-cyan-400/10 ring-cyan-400/30',
  xchange: 'text-fuchsia-300 bg-fuchsia-500/10 ring-fuchsia-500/30',
  referral: 'text-purple-300 bg-purple-400/10 ring-purple-400/30',
};

export function RoleCard({
  role,
  onApply,
  onWork,
}: {
  role: Role;
  onApply?: (role: Role) => void;
  onWork?: (role: Role) => void;
}) {
  const { user } = useAuth();
  const apply = applyLock(user, role.kind);
  const work = workLock(user, role.kind);
  const hidden = clientIsHidden(role);
  const showWork = role.kind === 'direct';

  return (
    <article
      data-testid="role-card"
      data-kind={role.kind}
      data-role-id={role.id}
      className="rx-card group relative overflow-hidden rounded-2xl p-5 transition hover:border-white/20"
    >
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b',
          KIND_ACCENT[role.kind] ?? KIND_ACCENT.direct,
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <Link href={`/roles/${role.id}`} className="min-w-0">
          <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-cyan-200">
            {role.title}
          </h3>
        </Link>
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1',
            KIND_CHIP[role.kind],
          )}
        >
          {kindLabel(role.kind)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--rx-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-cyan-400/80" />
          {role.location || role.city || 'Location TBC'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wallet className="h-3.5 w-3.5 text-fuchsia-400/80" />
          {formatSalary(role.salary_min, role.salary_max, role.currency || 'GBP')}
        </span>
        {role.kind === 'xchange' && (
          <span className="text-fuchsia-300">{formatSplit(role.proposed_split_owner_bps, role.proposed_split_partner_bps)}</span>
        )}
      </div>

      {role.kind === 'direct' && (
        <p className="mt-3 text-sm" data-testid={hidden ? 'client-hidden' : 'client-name'}>
          {hidden ? (
            <span className="text-[var(--rx-faint)]">
              Client hidden until you work this role
            </span>
          ) : (
            <span className="text-cyan-200">{role.client?.name || role.client_name}</span>
          )}
        </p>
      )}

      {role.description && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--rx-muted)]">
          {role.description}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {showWork && (
          <LockedControl lock={work}>
            <button
              type="button"
              data-testid="work-control"
              onClick={() => onWork?.(role)}
              className="rounded-lg bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40 hover:bg-cyan-400/20"
            >
              Work role
            </button>
          </LockedControl>
        )}
        <LockedControl lock={apply}>
          <button
            type="button"
            data-testid="apply-control"
            onClick={() => onApply?.(role)}
            className="rounded-lg bg-white/5 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/10"
          >
            Apply
          </button>
        </LockedControl>
        <Link
          href={`/roles/${role.id}`}
          className="ml-auto text-xs font-medium uppercase tracking-wider text-[var(--rx-faint)] hover:text-white"
        >
          View
        </Link>
      </div>
    </article>
  );
}
