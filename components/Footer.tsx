import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-cyan-400/20 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w"
            alt="Logo" width={140} height={35}
            className="mb-6 opacity-90"
            style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.4))' }}
          />
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-4">
            The premium engine for recruiter collaboration, candidate exchange, and guaranteed deal protection.
          </p>
          <div className="flex gap-4 items-center">
            <Link 
              href="https://youtube.com/@recxchange" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Tutorials
            </Link>
            <Link 
              href="https://www.linkedin.com/company/recxchange" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
            <Link 
              href="https://twitter.com/RecXchange" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Recruiters</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/recruiter" className="hover:text-cyan-400 transition-colors">Recruiter Home</Link></li>
            <li><Link href="/recruiter-roles" className="hover:text-cyan-400 transition-colors">Post Roles</Link></li>
            <li><Link href="/recruiter-candidates" className="hover:text-cyan-400 transition-colors">Submit Candidates</Link></li>
            <li><Link href="/collaboration" className="hover:text-cyan-400 transition-colors">Split Fees</Link></li>
            <li><Link href="/pricing" className="hover:text-fuchsia-400 transition-colors font-medium">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Hiring Managers</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/hiring-manager-home" className="hover:text-cyan-400 transition-colors">Hiring Manager Home</Link></li>
            <li><Link href="/hiring-manager-live" className="hover:text-cyan-400 transition-colors">Hiring Now?</Link></li>
            <li><Link href="/hiring-manager-strategic" className="hover:text-cyan-400 transition-colors">Hiring Soon?</Link></li>
            <li><Link href="/account-management" className="hover:text-cyan-400 transition-colors">Management & Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link></li>
            <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
            <li><Link href="/deal-protection" className="hover:text-cyan-400 transition-colors">Deal Protection</Link></li>
            <li><Link href="https://youtube.com/@recxchange" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1">
              🎥 Video Tutorials
            </Link></li>
            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
        <p>© {new Date().getFullYear()} RecXchange Engine. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" className="hover:text-cyan-400 transition-colors">Platform Login</Link>
          <Link href="{{trigger_link.jYQNc9YXcMkYPvo3HZfC}}" className="hover:text-fuchsia-400 transition-colors">Create Account</Link>
        </div>
      </div>
    </footer>
  );
}
