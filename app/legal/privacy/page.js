export default function PrivacyPage() {
  return (
    <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm">
        <p>RecXchange Portal LLC (the "Data Controller") is committed to protecting your privacy in compliance with UK GDPR and EU GDPR.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-white font-bold text-xs mb-2">DATA WE COLLECT</h3>
            <ul className="text-[11px] space-y-1 text-gray-400">
              <li>• Identity: Name, Professional Title</li>
              <li>• Contact: Email, LinkedIn Profile</li>
              <li>• Verification: Business details</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-white font-bold text-xs mb-2">THIRD-PARTY DATA</h3>
            <ul className="text-[11px] space-y-1 text-gray-400">
              <li>• Member-shared CVs</li>
              <li>• Candidate match history</li>
              <li>• Encrypted communication logs</li>
            </ul>
          </div>
        </div>

        <h2 className="text-white font-bold">International Transfers</h2>
        <p>While headquartered in the UAE, we utilize Standard Contractual Clauses (SCCs) to ensure data remains protected to UK/EU standards during international transit.</p>
        
        <p className="pt-6 border-t border-white/5 italic">For privacy inquiries: legal@recxchange.io</p>
      </div>
    </section>
  );
}
