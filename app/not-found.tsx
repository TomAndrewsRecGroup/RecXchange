import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Page not found</p>
        <h1 className="text-5xl sm:text-7xl font-black text-white mb-6">404</h1>
        <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-bold hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
          <Link
            href="/recruiter"
            className="px-6 py-3 rounded-xl border border-cyan-400/40 text-cyan-300 text-sm font-bold hover:border-cyan-300/60 transition-colors"
          >
            For Recruiters
          </Link>
          <Link
            href="/hiring-manager-home"
            className="px-6 py-3 rounded-xl border border-fuchsia-400/40 text-fuchsia-300 text-sm font-bold hover:border-fuchsia-300/60 transition-colors"
          >
            For Hiring Managers
          </Link>
        </div>

        <div className="text-gray-600 text-xs space-y-1">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href="/pricing" className="text-gray-500 hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/roles" className="text-gray-500 hover:text-cyan-400 transition-colors">Live Roles</Link>
            <Link href="/faq" className="text-gray-500 hover:text-cyan-400 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-gray-500 hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
