import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-12 text-center">
      <h1 className="font-display text-3xl font-bold text-white">Not found</h1>
      <p className="mt-2 text-sm text-[var(--rx-muted)]">That route is not in v2.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
        Back to the marketplace
      </Link>
    </div>
  );
}
