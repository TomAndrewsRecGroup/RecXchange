import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center px-8">
      <nav className="flex gap-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/deal-protection">Protection</Link>
      </nav>
    </header>
  );
}
