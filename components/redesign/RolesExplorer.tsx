'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase } from 'lucide-react';
import type { Role } from '@/lib/roles/data';
import {
  formatSalary,
  formatSplit,
  WORK_MODEL_LABEL,
} from '@/lib/roles/format';

function timeAgo(iso: string): string {
  const posted = new Date(iso).getTime();
  if (Number.isNaN(posted)) return '';
  const days = Math.max(
    0,
    Math.floor((Date.now() - posted) / (1000 * 60 * 60 * 24))
  );
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  if (days < 28) return `Posted ${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `Posted ${weeks} weeks ago`;
}

const PAGE_SIZE = 9;

export default function RolesExplorer({ roles }: { roles: Role[] }) {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<'all' | 'recx_direct' | 'xchange'>(
    'all'
  );
  const [industry, setIndustry] = useState('all');
  const [page, setPage] = useState(1);

  const industries = useMemo(
    () => [...new Set(roles.map((r) => r.industry))].sort(),
    [roles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roles
      .filter((role) => {
        if (source !== 'all' && role.source !== source) return false;
        if (industry !== 'all' && role.industry !== industry) return false;
        if (!q) return true;
        return (
          role.title.toLowerCase().includes(q) ||
          role.industry.toLowerCase().includes(q) ||
          role.location.toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
  }, [roles, query, source, industry]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const counts = useMemo(
    () => ({
      all: roles.length,
      recx_direct: roles.filter((r) => r.source === 'recx_direct').length,
      xchange: roles.filter((r) => r.source === 'xchange').length,
    }),
    [roles]
  );

  const sourceTabs = [
    { key: 'all' as const, label: `All (${counts.all})` },
    { key: 'recx_direct' as const, label: `RecX Direct (${counts.recx_direct})` },
    { key: 'xchange' as const, label: `Xchange (${counts.xchange})` },
  ];

  return (
    <div>
      {/* Controls */}
      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 lg:items-center">
        <div className="relative flex-grow">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--rx-faint)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search title, industry, or location"
            aria-label="Search roles"
            className="w-full rounded-xl border border-[var(--rx-line)] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[var(--rx-faint)] focus:border-[var(--rx-violet)] focus:outline-none"
          />
        </div>

        <div
          className="flex rounded-xl border border-[var(--rx-line)] p-1 self-start"
          role="tablist"
          aria-label="Role source"
        >
          {sourceTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={source === tab.key}
              onClick={() => {
                setSource(tab.key);
                setPage(1);
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                source === tab.key
                  ? 'bg-[linear-gradient(100deg,#8b5cf6,#3b82f6)] text-white'
                  : 'text-[var(--rx-muted)] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by industry"
          className="rounded-xl border border-[var(--rx-line)] bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-[var(--rx-violet)] focus:outline-none [&>option]:bg-[#12121d]"
        >
          <option value="all">All industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <div className="glass rounded-2xl mt-6 p-12 text-center">
          <p className="text-white font-semibold mb-1">No roles match</p>
          <p className="text-sm text-[var(--rx-muted)]">
            Try a broader search, or clear the filters.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {visible.map((role) => (
            <li key={role.id}>
              <Link
                href={`/roles/${role.id}`}
                className="group flex h-full flex-col rounded-2xl glass p-6 transition-all duration-300 hover:border-[var(--rx-violet)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                      role.source === 'recx_direct'
                        ? 'grad-text-hot bg-white/[0.07]'
                        : 'grad-text bg-white/[0.07]'
                    }`}
                  >
                    {role.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'}
                  </span>
                  <span className="text-[11px] text-[var(--rx-faint)] whitespace-nowrap">
                    {timeAgo(role.postedAt)}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-white leading-snug group-hover:grad-text">
                  {role.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--rx-muted)]">
                  <MapPin size={12} aria-hidden="true" />
                  {role.location}
                  <span className="text-[var(--rx-faint)]">·</span>
                  {WORK_MODEL_LABEL[role.workModel] ?? role.workModel}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--rx-muted)]">
                  <Briefcase size={12} aria-hidden="true" />
                  {role.industry}
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--rx-line)] flex items-end justify-between gap-3 mt-auto">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--rx-faint)]">
                      Salary
                    </p>
                    <p className="text-sm font-semibold text-white tabular-nums">
                      {formatSalary(
                        role.salaryMin,
                        role.salaryMax,
                        role.salaryCurrency
                      )}
                    </p>
                  </div>
                  {role.splitAmount && role.splitCurrency && (
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--rx-faint)]">
                        Your split
                      </p>
                      <p className="text-sm font-extrabold grad-text-hot tabular-nums">
                        {formatSplit(role.splitAmount, role.splitCurrency)}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-2"
          aria-label="Roles pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-[var(--rx-line)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:border-[var(--rx-violet)] transition-colors"
          >
            Previous
          </button>
          <span className="px-3 text-sm text-[var(--rx-muted)] tabular-nums">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-[var(--rx-line)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:border-[var(--rx-violet)] transition-colors"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
