import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import Reveal from '@/components/redesign/Reveal';
import { GradientButton, GhostButton } from '@/components/redesign/ui';
import {
  formatSalary,
  formatSplit,
  WORK_MODEL_LABEL,
} from '@/lib/roles/format';
import { getRoleById } from '@/lib/roles/fetch';
import { APP_REGISTER_URL } from '@/lib/redesign/site';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const role = await getRoleById(id);
  if (!role) {
    return { title: 'Role Not Found | RecXchange' };
  }
  return {
    title: `${role.title} - ${role.location} | Live Roles | RecXchange`,
    description: `${role.descriptionSnippet.slice(0, 150)}... Split fee available to the recruiter who delivers the candidate.`,
    alternates: { canonical: `https://recxchange.io/roles/${role.id}` },
  };
}

export default async function RoleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const role = await getRoleById(id);
  if (!role) notFound();

  const isDirect = role.source === 'recx_direct';
  const postedDate = new Date(role.postedAt);
  const validThrough = new Date(
    postedDate.getTime() + 60 * 24 * 60 * 60 * 1000
  );

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.descriptionSnippet,
    datePosted: role.postedAt,
    validThrough: validThrough.toISOString(),
    employmentType: role.roleType === 'permanent' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: isDirect ? 'RecX Direct Client (via RecXchange)' : 'RecXchange Partner Network',
      sameAs: 'https://recxchange.io',
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: role.location },
    },
    jobLocationType:
      role.workModel === 'remote' ? 'TELECOMMUTE' : undefined,
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: role.salaryCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: role.salaryMin,
        maxValue: role.salaryMax,
        unitText: 'YEAR',
      },
    },
    industry: role.industry,
    directApply: false,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-14 sm:pt-20 pb-24">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/roles"
              className="text-sm font-semibold text-[var(--rx-muted)] hover:text-white transition-colors"
            >
              ← All live roles
            </Link>
          </nav>
        </Reveal>

        {/* Header card */}
        <Reveal delay={80}>
          <header
            className={`rounded-2xl p-7 sm:p-9 ${isDirect ? 'grad-border-hot' : 'glass'}`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] bg-white/[0.07] ${
                  isDirect ? 'grad-text-hot' : 'grad-text'
                }`}
              >
                {isDirect ? 'RecX Direct' : 'Xchange'}
              </span>
              <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-[var(--rx-muted)]">
                {role.roleType === 'permanent' ? 'Permanent' : role.roleType}
              </span>
              <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-[var(--rx-muted)] capitalize">
                {role.seniorityLevel} level
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">
              {role.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--rx-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                {role.location} ·{' '}
                {WORK_MODEL_LABEL[role.workModel] ?? role.workModel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} aria-hidden="true" />
                {role.industry}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                Posted {postedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </header>
        </Reveal>

        {/* Money facts */}
        <Reveal delay={160}>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--rx-faint)] mb-1">
                Salary range
              </p>
              <p className="text-2xl font-extrabold text-white tabular-nums">
                {formatSalary(role.salaryMin, role.salaryMax, role.salaryCurrency)}
              </p>
              <p className="mt-1 text-xs text-[var(--rx-muted)]">per year</p>
            </div>
            {role.splitAmount && role.splitCurrency ? (
              <div className="grad-border-hot rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--rx-faint)] mb-1">
                  Your split fee
                </p>
                <p className="text-2xl font-extrabold grad-text-hot tabular-nums">
                  {formatSplit(role.splitAmount, role.splitCurrency)}
                </p>
                <p className="mt-1 text-xs text-[var(--rx-muted)]">
                  paid to the recruiter who delivers the placed candidate
                </p>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--rx-faint)] mb-1">
                  Split terms
                </p>
                <p className="text-lg font-bold text-white">
                  Agreed on partnership
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* Description */}
        <Reveal delay={220}>
          <section className="glass rounded-2xl mt-5 p-7 sm:p-9">
            <h2 className="text-lg font-bold text-white mb-3">About the role</h2>
            <p className="text-[15px] leading-relaxed text-[var(--rx-muted)]">
              {role.descriptionSnippet}
            </p>
            <p className="mt-4 text-sm text-[var(--rx-faint)]">
              Full client details, the complete brief, and the split-fee
              agreement are available on the platform once you express interest
              in this role.
            </p>
          </section>
        </Reveal>

        {/* How claiming works */}
        <Reveal delay={280}>
          <section className="glass rounded-2xl mt-5 p-7 sm:p-9">
            <h2 className="text-lg font-bold text-white mb-4">
              How to work this role
            </h2>
            <ol className="space-y-3 text-sm text-[var(--rx-muted)] list-none p-0">
              <li className="flex gap-3">
                <span className="font-extrabold grad-text tabular-nums">1.</span>
                Join RecXchange and open this role on the platform.
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold grad-text tabular-nums">2.</span>
                Accept the split-fee agreement. Terms are locked before any
                candidate details are exchanged.
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold grad-text tabular-nums">3.</span>
                Submit your candidate. Every submission is timestamped, so your
                ownership is protected.
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold grad-text tabular-nums">4.</span>
                They place, you get paid your agreed share.
              </li>
            </ol>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal delay={340}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Submit a candidate to this role
            </GradientButton>
            <GhostButton href="/roles" size="lg">
              Browse more roles
            </GhostButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}
