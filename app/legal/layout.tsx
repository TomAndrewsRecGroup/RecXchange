"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: "Master Terms", href: "/legal/terms" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Global GDPR", href: "/legal/gdpr" },
    { name: "Affiliate Terms", href: "/legal/affiliate" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      {/* Background Glows shared across all legal pages */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl bg-blue-600/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Trust Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-label text-blue-400">Governance & Compliance</span>
            <h2 className="text-2xl font-bold text-white mt-2">Legal Trust Center</h2>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">System Status: Compliant</span>
          </div>
        </header>

        {/* Dynamic Navigation Bar */}
        <header className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative px-6 py-3 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive 
                  ? "border-blue-500/50 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                  : "border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300 hover:border-white/10"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </header>

        {/* Content Area */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Centralized Legal Support Footer */}
        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            Need legal clarification?
          </p>
          <a 
            href="mailto:legal@recxchange.io" 
            className="text-sm text-gray-400 hover:text-white transition-colors mt-2 inline-block border-b border-gray-800 pb-1"
          >
            legal@recxchange.io
          </a>
        </div>
      </div>
    </div>
  );
}
