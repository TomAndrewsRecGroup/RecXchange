import Link from 'next/link';

/**
 * Global employer capture card - rendered above the footer on every page,
 * so the hiring-manager funnel is always one scroll away without diluting
 * the recruiter-led page content.
 */
export default function HiringManagerCard() {
  return (
    <section
      aria-labelledby="hiring-card-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-20"
    >
      <div className="grad-border-hot rounded-2xl p-8 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] grad-text-hot mb-2">
            For employers
          </p>
          <h2
            id="hiring-card-heading"
            className="text-xl sm:text-2xl font-extrabold text-white [text-wrap:balance]"
          >
            Hiring for a role?
          </h2>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-[var(--rx-muted)]">
            Get in touch to see how our network of recruiters can help fill
            your roles faster.
          </p>
        </div>
        <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0 justify-center">
          <Link
            href="/for-employers"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-[linear-gradient(100deg,#d946ef,#8b5cf6_45%,#3b82f6)] shadow-[0_2px_16px_rgba(217,70,239,0.35)] transition-all duration-300 hover:shadow-[0_2px_24px_rgba(139,92,246,0.55)] hover:-translate-y-px motion-reduce:transition-none"
          >
            Post a role
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--rx-line)] px-6 py-3 text-sm font-semibold text-white bg-white/[0.03] transition-colors hover:border-[var(--rx-violet)]"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
