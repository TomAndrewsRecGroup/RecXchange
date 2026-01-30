export default function AffiliatePage() {
  return (
    <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
      <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-8">Token-Based Reward System</p>

      <div className="space-y-8 text-sm">
        <p>Operated by RecXchange Portal LLC (trading as "RecXchange"), our program rewards success through RecX Tokens—digital credits rather than cash payouts.</p>

        <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
          <h3 className="text-purple-400 font-bold mb-4">Redemption Rules</h3>
          <ul className="space-y-3 text-xs">
            <li>• Use tokens to unlock candidate contact details.</li>
            <li>• Purchase platform-exclusive eLearning content.</li>
            <li>• Boost role visibility in the Xchange Engine.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">Qualification</h3>
          <p>Referrals must sign up via your unique link and remain active for 2 full calendar months to trigger a Qualified Referral reward.</p>
        </div>
      </div>
    </section>
  );
}
