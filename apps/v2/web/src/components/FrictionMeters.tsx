'use client';

import type { FrictionFinding, FrictionReport } from '@/lib/types';
import { cn } from '@/lib/format';

function tone(score: number | undefined): string {
  if (score === undefined || score === null) return 'bg-white/20';
  if (score >= 70) return 'bg-cyan-400';
  if (score >= 50) return 'bg-purple-400';
  return 'bg-fuchsia-500';
}

function Meter({
  label,
  value,
  testId,
}: {
  label: string;
  value?: number;
  testId: string;
}) {
  const n = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0;
  return (
    <div data-testid={testId} className="flex-1">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--rx-muted)]">
          {label}
        </span>
        <span className="font-display text-2xl font-bold text-white tabular-nums">
          {typeof value === 'number' ? value : '—'}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn('h-full rounded-full transition-all duration-500', tone(value))}
          style={{ width: `${n}%` }}
        />
      </div>
    </div>
  );
}

function verdictStyle(verdict?: string) {
  if (verdict === 'block') return 'bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-500/40';
  if (verdict === 'warn') return 'bg-purple-500/15 text-purple-200 ring-purple-400/40';
  if (verdict === 'ok') return 'bg-cyan-400/15 text-cyan-200 ring-cyan-400/40';
  return 'bg-white/5 text-[var(--rx-muted)] ring-white/10';
}

export function FrictionMeters({
  report,
  preview,
}: {
  report: FrictionReport;
  preview?: boolean;
}) {
  const findings: FrictionFinding[] = report.findings ?? [];
  return (
    <section
      data-testid="friction-meters"
      className="rx-card-hot rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Friction</h2>
          <p className="text-xs text-[var(--rx-faint)]">
            {preview ? 'Live preview — save or score to persist' : 'Advert quality and split quality'}
          </p>
        </div>
        {report.verdict && (
          <span
            data-testid="friction-verdict"
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1',
              verdictStyle(report.verdict),
            )}
          >
            {report.verdict}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <Meter label="Advert" value={report.advert_score} testId="friction-advert" />
        <Meter label="Split" value={report.split_score} testId="friction-split" />
      </div>

      <ul className="mt-5 space-y-2" data-testid="friction-findings">
        {findings.length === 0 ? (
          <li className="text-sm text-[var(--rx-muted)]">No findings. Publish when you are ready.</li>
        ) : (
          findings.map((f) => (
            <li
              key={`${f.code}-${f.message}`}
              className="flex gap-3 rounded-lg bg-white/[0.03] px-3 py-2 text-sm"
            >
              <span
                className={cn(
                  'mt-0.5 h-2 w-2 shrink-0 rounded-full',
                  f.severity === 'block' ? 'bg-fuchsia-400' : 'bg-purple-400',
                )}
              />
              <div>
                <p className="font-medium text-white">{f.message}</p>
                <p className="text-[11px] uppercase tracking-wider text-[var(--rx-faint)]">
                  {f.code} · {f.severity}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
