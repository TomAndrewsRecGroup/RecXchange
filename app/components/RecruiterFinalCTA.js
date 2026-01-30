export default function RecruiterFinalCTA() {
  return (
    <section className="mt-20 py-16 border-t border-white/5">
      <div className="glass-card p-10 md:p-16 rounded-[3rem] border-white/10 bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to plug into the network?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Join 2,000+ verified recruiters sharing roles, candidates, and split fees under one protected framework.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="https://app.recxchange.io/register" className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all">
            Join RecXchange Now
          </a>
          <Link href="/pricing-and-splits" className="px-8 py-4 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">
            Review Membership Tiers
          </Link>
        </div>
      </div>
    </section>
  );
}
