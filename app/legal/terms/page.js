export default function TermsPage() {
  return (
    <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 text-gray-300 leading-relaxed">
      <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">Effective: 2025 | RecXchange Portal LLC</p>
      
      <div className="space-y-8 text-sm">
        <div>
          <h2 className="text-white font-bold text-lg mb-3">1. About RecXchange</h2>
          <p>RecXchange is operated by RecXchange Portal LLC, Dubai, UAE (Trade Licence No: 1508955). We provide the digital infrastructure for recruiter-to-recruiter collaboration but are not a party to individual recruitment transactions unless explicitly stated.</p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
          <h2 className="text-blue-400 font-bold text-lg mb-3">2. Mandatory Split Fee Agreements</h2>
          <p>Every collaboration on the platform must be formalized through a written Split Fee Agreement. RecXchange will not provide support or mediation for disputes unless a signed agreement is uploaded to the platform before work commences.</p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">3. Non-Circumvention</h2>
          <p>Members are strictly prohibited from poaching or unauthorized outreach to candidates or clients introduced by another Member. Any attempt to "bypass" the platform terms will result in immediate account termination.</p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">4. Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales. Disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </div>
      </div>
    </section>
  );
}
