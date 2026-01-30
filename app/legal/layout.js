import Link from 'next/link';

export default function LegalLayout({ children }) {
  const links = [
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Affiliate", href: "/affiliate" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <nav className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="glass-card px-6 py-2 rounded-full border-white/10 text-[10px] font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
