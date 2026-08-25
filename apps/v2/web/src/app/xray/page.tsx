'use client';

import { FormEvent, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { XrayResult } from '@/lib/types';
import { RequireSession } from '@/components/RequireSession';
import { XrayCard } from '@/components/XrayCard';

function splitList(raw: string): string[] {
  return raw
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function XraySearch() {
  const [keywords, setKeywords] = useState('');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [systems, setSystems] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [results, setResults] = useState<XrayResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const rows = await api.xraySearch({
        keywords: keywords.trim() || undefined,
        title: title.trim() || undefined,
        location: location.trim() || undefined,
        skills: splitList(skills),
        systems: splitList(systems),
        salary_min: salaryMin ? Number(salaryMin) : undefined,
        salary_max: salaryMax ? Number(salaryMax) : undefined,
      });
      setResults(rows);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white">X-Ray</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--rx-muted)]">
        Ranked matches with why, evidence and concerns. Nothing is invented —
        if seed evidence is thin, the card says so.
      </p>

      <form
        onSubmit={onSubmit}
        data-testid="xray-form"
        className="rx-card mt-6 grid gap-3 rounded-2xl p-5 sm:grid-cols-2"
      >
        <label className="block text-sm text-[var(--rx-muted)]">
          Keywords
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm text-[var(--rx-muted)]">
          Job title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm text-[var(--rx-muted)]">
          Skills
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Comma separated"
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm text-[var(--rx-muted)]">
          Systems / plant
          <input
            value={systems}
            onChange={(e) => setSystems(e.target.value)}
            placeholder="Comma separated"
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm text-[var(--rx-muted)]">
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <div className="flex gap-3">
          <label className="block flex-1 text-sm text-[var(--rx-muted)]">
            Salary min
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block flex-1 text-sm text-[var(--rx-muted)]">
            Salary max
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-cyan-400/20 px-5 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/50"
          >
            {busy ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-sm text-fuchsia-300">{error}</p>}

      {results && (
        <div className="mt-6 space-y-4" data-testid="xray-results">
          {results.length === 0 ? (
            <p className="text-sm text-[var(--rx-muted)]">
              No matches. The matcher does not invent candidates.
            </p>
          ) : (
            results.map((r) => (
              <XrayCard key={r.candidate.id || `${r.score}-${r.candidate.display_name}`} result={r} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function XrayPage() {
  return (
    <RequireSession>
      <XraySearch />
    </RequireSession>
  );
}
