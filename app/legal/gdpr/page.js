export default function GDPRPage() {
  return (
    <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-2">Global Data Protection</h1>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">Harmonized Compliance Framework</p>

      <div className="space-y-8 text-sm">
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <div>
            <h3 className="text-white font-bold mb-2">Scope of Compliance</h3>
            <p className="text-gray-400">Our policy meets or exceeds standards for UK/EU GDPR, UAE PDPL, California CCPA, Canada PIPEDA, and Brazil LGPD.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <h4 className="text-white font-bold mb-2">Data Subject Rights</h4>
            <p className="text-xs text-gray-500">You have the right to access, rectify, delete, and port your data. Requests are processed within 2 business days.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <h4 className="text-white font-bold mb-2">Breach Protocol</h4>
            <p className="text-xs text-gray-500">Commitment to notify relevant authorities and affected users within 72 hours of a detected high-risk breach.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
