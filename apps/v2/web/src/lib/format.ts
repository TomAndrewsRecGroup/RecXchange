import type { FrictionFinding, FrictionReport, Role } from './types';

export function formatSalary(
  min?: number | null,
  max?: number | null,
  currency = 'GBP',
): string {
  if (!min && !max) return 'Salary not listed';
  const code = currency || 'GBP';
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(n);
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export function formatSplit(ownerBps?: number | null, partnerBps?: number | null): string {
  const o = Math.round((ownerBps ?? 5000) / 100);
  const p = Math.round((partnerBps ?? 5000) / 100);
  return `${o}/${p} split`;
}

export function kindLabel(kind: string): string {
  switch (kind) {
    case 'direct':
      return 'Direct';
    case 'xchange':
      return 'Xchange';
    case 'referral':
      return 'Referral';
    default:
      return kind;
  }
}

export function stageLabel(stage: string): string {
  switch (stage) {
    case 'applied':
      return 'Applied';
    case 'screening':
      return 'Screening';
    case 'interview':
      return 'Interview';
    case 'offer':
      return 'Offer';
    case 'placed':
      return 'Placed';
    default:
      return stage;
  }
}

export function clientName(role: Role): string | null {
  if (role.client_hidden) return null;
  if (role.client && role.client.name) return role.client.name;
  if (role.client_name) return role.client_name;
  return null;
}

export function clientIsHidden(role: Role): boolean {
  if (clientName(role)) return false;
  if (role.client_hidden) return true;
  return role.kind === 'direct';
}

export function frictionFromRole(role: Role): FrictionReport {
  const raw = role.friction_report;
  let report: FrictionReport = {};
  if (Array.isArray(raw)) {
    report = { findings: raw };
  } else if (raw && typeof raw === 'object') {
    report = raw;
  }
  return {
    advert_score: report.advert_score ?? role.friction_advert_score ?? undefined,
    split_score: report.split_score ?? role.friction_split_score ?? undefined,
    verdict: report.verdict ?? role.friction_verdict ?? undefined,
    findings: report.findings ?? [],
  };
}

export function findingsOf(role: Role): FrictionFinding[] {
  return frictionFromRole(role).findings ?? [];
}

export function relativeTime(iso?: string | null): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
