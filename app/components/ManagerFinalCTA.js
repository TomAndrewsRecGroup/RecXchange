export default function ManagerFinalCTA() {
  return (
    <section className="mt-20 py-16 border-t border-white/5">
      <div className="glass-card p-10 md:p-16 rounded-[3rem] border-white/10 bg-gradient-to-br from-purple-600/10 to-blue-600/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Design your hiring roadmap.</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Speak directly with our leadership team to see how the RecXchange network can scale your internal talent function.
        </p>
        
        {/* Calendly Integration Link */}
        <a 
          href="https://calendly.com/recxchange-leadership/30min" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
          Schedule 30-Min Strategy Call
        </a>
        
        <p className="text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-bold">
          No commitment. Just data, market mapping, and scale.
        </p>
      </div>
    </section>
  );
}
