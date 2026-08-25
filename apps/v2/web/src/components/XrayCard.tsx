'use client';

import { AlertTriangle, CheckCircle2, Eye, FileSearch } from 'lucide-react';
import type { XrayResult } from '@/lib/types';

function asList(value?: string[] | string | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
}

export function XrayCard({ result }: { result: XrayResult }) {
  const candidate = result.candidate;
  const why = asList(result.why ?? result.reasons);
  const concerns = asList(result.concerns);
  const verify = asList(result.verify ?? result.verify_on_screen);
  const evidence = (result.evidence || candidate.evidence || '').trim();
  const thin = evidence.length < 40;

  return (
    <article
      data-testid="xray-card"
      className="rx-card rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            {candidate.display_name}
          </h3>
          <p className="text-sm text-[var(--rx-muted)]">
            {candidate.headline || 'No headline on file'}
          </p>
          <p className="mt-1 text-xs text-[var(--rx-faint)]">
            {candidate.location || 'Location not listed'}
            {candidate.source_label ? ` · Demo · ${candidate.source_label}` : ' · Demo record'}
          </p>
        </div>
        <div className="rounded-xl bg-cyan-400/10 px-3 py-2 text-center ring-1 ring-cyan-400/30">
          <div className="font-display text-2xl font-bold text-cyan-200 tabular-nums">
            {Math.round(result.score)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-cyan-300/80">Match</div>
        </div>
      </div>

      <section className="mt-4">
        <h4 className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Why they match
        </h4>
        {why.length === 0 ? (
          <p className="text-sm text-[var(--rx-muted)]">
            No overlap stated. Do not infer a fit.
          </p>
        ) : (
          <ul className="space-y-1 text-sm text-[var(--rx-muted)]">
            {why.map((w) => (
              <li key={w}>· {w}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4">
        <h4 className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-purple-300">
          <FileSearch className="h-3.5 w-3.5" />
          Evidence
        </h4>
        {thin ? (
          <p className="text-sm text-purple-200">
            Evidence is thin. Do not assume fit — verify on screen.
            {evidence ? ` On file: “${evidence}”` : ''}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-[var(--rx-muted)]">{evidence}</p>
        )}
      </section>

      <section className="mt-4">
        <h4 className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-fuchsia-300">
          <AlertTriangle className="h-3.5 w-3.5" />
          Concerns
        </h4>
        {concerns.length === 0 ? (
          <p className="text-sm text-[var(--rx-muted)]">No concerns returned by the matcher.</p>
        ) : (
          <ul className="space-y-1 text-sm text-fuchsia-100/80">
            {concerns.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4 rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/10">
        <h4 className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          <Eye className="h-3.5 w-3.5 text-cyan-300" />
          Verify on screen
        </h4>
        {verify.length === 0 ? (
          <p className="text-sm text-[var(--rx-muted)]">
            Confirm skills, systems and location with the candidate before you submit.
          </p>
        ) : (
          <ul className="space-y-1 text-sm text-[var(--rx-muted)]">
            {verify.map((v) => (
              <li key={v}>· {v}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
