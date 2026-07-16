import Link from 'next/link';
import type { ReactNode } from 'react';

/* ─── Buttons ─────────────────────────────────────────────── */

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Larger hero sizing */
  size?: 'md' | 'lg';
  external?: boolean;
}

const sizeClasses = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function GradientButton({
  href,
  children,
  className = '',
  size = 'md',
  external = false,
}: ButtonLinkProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white
    bg-[linear-gradient(100deg,#8b5cf6,#3b82f6_55%,#22d3ee)] bg-[length:150%_100%] bg-left
    shadow-[0_4px_24px_rgba(139,92,246,0.35)]
    transition-all duration-300 hover:bg-right hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)] hover:-translate-y-0.5
    motion-reduce:transition-none motion-reduce:hover:translate-y-0
    ${sizeClasses[size]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = '',
  size = 'md',
  external = false,
}: ButtonLinkProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold
    text-[var(--rx-text)] border border-[var(--rx-line)] bg-white/[0.03]
    transition-all duration-300 hover:border-[var(--rx-violet)] hover:bg-white/[0.06] hover:-translate-y-0.5
    motion-reduce:transition-none motion-reduce:hover:translate-y-0
    ${sizeClasses[size]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ─── Section heading ─────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] grad-text">
          {eyebrow}
        </p>
      )}
      <Tag
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white [text-wrap:balance]"
      >
        {title}
      </Tag>
      {sub && (
        <p className="mt-4 text-base sm:text-lg text-[var(--rx-muted)] [text-wrap:balance]">
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─── Cards & stats ───────────────────────────────────────── */

export function GlassCard({
  children,
  className = '',
  hot = false,
}: {
  children: ReactNode;
  className?: string;
  /** Use the magenta-led gradient rim */
  hot?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl ${hot ? 'grad-border-hot' : 'glass'} p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
  live = false,
}: {
  value: string;
  label: string;
  live?: boolean;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        {live && (
          <span
            className="h-2 w-2 rounded-full bg-[var(--rx-live)] animate-rx-pulse"
            style={{ boxShadow: '0 0 8px rgba(52,211,153,0.8)' }}
            aria-hidden="true"
          />
        )}
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight grad-text tabular-nums">
          {value}
        </span>
      </div>
      <div className="mt-1 text-xs sm:text-sm text-[var(--rx-muted)]">
        {label}
      </div>
    </div>
  );
}

/* ─── Step (numbered process) ─────────────────────────────── */

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 h-full">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl grad-border text-lg font-extrabold grad-text tabular-nums">
        {number}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--rx-muted)]">
        {children}
      </p>
    </div>
  );
}
