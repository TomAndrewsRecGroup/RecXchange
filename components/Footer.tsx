import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-cyan-400/20 pt-12 sm:pt-16 pb-8 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Main Footer Grid - 4 columns plus brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="RecXchange Homepage">
              <Image
                src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png"
                alt="RecXchange - Recruiter collaboration platform connecting 15,000+ recruiters for split fee recruitment" 
                width={120}
                height={30}
                quality={90}
                className="sm:w-[140px] sm:h-[35px] mb-4 sm:mb-6 opacity-90 hover:opacity-100 transition-opacity"
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.4))' }}
              />
            </Link>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xs leading-relaxed mb-4">
              The premium engine for <Link href="/collaboration" className="text-cyan-400 hover:underline">recruiter collaboration</Link>, candidate exchange, and guaranteed <Link href="/deal-protection" className="text-cyan-400 hover:underline">deal protection</Link>.
            </p>
            <div className="flex gap-3 sm:gap-4 items-center">
              <Link 
                href="https://youtube.com/@recxchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-xs sm:text-sm font-medium"
                aria-label="Watch RecXchange tutorials on YouTube"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="hidden sm:inline">Watch Tutorials</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/company/recxchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-label="Follow RecXchange on LinkedIn"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link 
                href="https://twitter.com/RecXchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Follow RecXchange on Twitter/X"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Recruiters Column */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4">Recruiters</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li><Link href="/recruiter" className="hover:text-cyan-400 transition-colors">Recruiter Home</Link></li>
              <li><Link href="/recruiter-roles" className="hover:text-cyan-400 transition-colors">Post Roles</Link></li>
              <li><Link href="/recruiters-with-candidates" className="hover:text-cyan-400 transition-colors">Submit Candidates</Link></li>
              <li><Link href="/roles" className="hover:text-cyan-400 transition-colors">Browse Live Roles</Link></li>
              <li><Link href="/collaboration" className="hover:text-cyan-400 transition-colors">How Split Fees Work</Link></li>
              <li><Link href="/why-recxchange" className="hover:text-cyan-400 transition-colors">Why RecXchange</Link></li>
              <li><Link href="/pricing" className="hover:text-fuchsia-400 transition-colors font-medium">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Hiring Managers Column */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4">Hiring Managers</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li><Link href="/hiring-manager-home" className="hover:text-cyan-400 transition-colors">Hiring Manager Home</Link></li>
              <li><Link href="/hiring-manager-live" className="hover:text-cyan-400 transition-colors">Post a Role Now</Link></li>
              <li><Link href="/hiring-manager-strategic" className="hover:text-cyan-400 transition-colors">Strategic Hiring</Link></li>
              <li><Link href="/account-management" className="hover:text-cyan-400 transition-colors">Account Management</Link></li>
              <li><Link href="/deal-protection" className="hover:text-cyan-400 transition-colors">Candidate Protection</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog & Updates</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link></li>
              <li><Link href="/why-recxchange" className="hover:text-cyan-400 transition-colors">Why RecXchange</Link></li>
              <li><Link href="https://youtube.com/@recxchange" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1">
                🎥 Video Tutorials
              </Link></li>
              <li><Link href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7330859663111901185" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                📧 Newsletter
              </Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/gdpr" className="hover:text-cyan-400 transition-colors">GDPR Compliance</Link></li>
              <li><Link href="/affiliate" className="hover:text-cyan-400 transition-colors">Affiliate Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Consolidated About Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-cyan-400/10">
          <h3 className="text-white font-bold text-xs sm:text-sm mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            About RecXchange
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[1200px] mb-4">
            <strong className="text-white">RecXchange</strong> is a <Link href="/collaboration" className="text-cyan-400 hover:underline">split fee recruitment platform</Link> connecting 15,000+ recruiters globally. Our platform enables <Link href="/recruiter-roles" className="text-cyan-400 hover:underline">role sharing</Link>, <Link href="/recruiters-with-candidates" className="text-cyan-400 hover:underline">candidate submissions</Link>, and automated fee splits up to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">70% on RecX Direct roles</Link>. With access to <Link href="/research" className="text-cyan-400 hover:underline">270M candidate profiles</Link> and <Link href="/deal-protection" className="text-cyan-400 hover:underline">timestamped submission protection</Link>, recruiters can earn an average of $7,000 per placement across <Link href="/roles" className="text-cyan-400 hover:underline">100+ live roles</Link> in Engineering, Healthcare, Tech, Sales, Finance, and HR. Learn more about our <Link href="/pricing" className="text-fuchsia-400 hover:underline">pricing plans</Link> or read <Link href="/blog" className="text-cyan-400 hover:underline">success stories from our community</Link>.
          </p>
          <p className="text-gray-600 text-[10px] sm:text-xs leading-relaxed max-w-[1200px]">
            <strong className="text-gray-500">Platform Access:</strong> RecXchange.io provides informational resources, guides, and educational content. Full platform functionality (candidate tracking, commission management, role posting, collaboration tools) is accessed via <Link href="https://app.recxchange.io" rel="external" className="text-cyan-400 hover:underline">app.recxchange.io</Link>. <Link href="https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1" rel="external" data-intent="platform-access" className="text-cyan-400 hover:underline">Log in to access the full platform</Link>.
          </p>
        </div>

        {/* Copyright Row */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-cyan-400/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] sm:text-xs">
            <p className="order-2 lg:order-1">© {new Date().getFullYear()} RecXchange. All rights reserved.</p>
            
            <div className="order-1 lg:order-2 flex items-center gap-3">
              <p className="text-gray-600 text-[9px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap">Website Designed & Developed by</p>
              <Link 
                href="https://andrews-recruitment.com/about" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit AMIVY Designs - Web Design & Development"
              >
                <Image
                  src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/79a68aec-f3cc-44c3-8b5b-500176059f26_20260228_053107_0000.png"
                  alt="AMIVY Designs - Premium Web Design & Development Agency"
                  width={180}
                  height={45}
                  quality={90}
                  className="opacity-90"
                />
              </Link>
            </div>
            
            <div className="flex gap-6 sm:gap-8 order-3">
              <Link href="https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1" rel="external" data-intent="platform-access" className="hover:text-cyan-400 transition-colors">Platform Login</Link>
              <Link href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" className="hover:text-fuchsia-400 transition-colors">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
