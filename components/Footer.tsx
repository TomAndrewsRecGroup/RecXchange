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
              The premium engine for <Link href="/split-fees" className="text-cyan-400 hover:underline">recruiter collaboration</Link>, candidate exchange, and guaranteed <Link href="/deal-protection" className="text-cyan-400 hover:underline">deal protection</Link>.
            </p>
            <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
              {/* YouTube */}
              <Link 
                href="https://youtube.com/@recxchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Watch RecXchange tutorials on YouTube"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              {/* LinkedIn */}
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
              {/* Twitter/X */}
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
              {/* Facebook */}
              <Link 
                href="https://facebook.com/recxchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Follow RecXchange on Facebook"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link 
                href="https://instagram.com/recxchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
                aria-label="Follow RecXchange on Instagram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              {/* WhatsApp */}
              <Link 
                href="https://whatsapp.com/channel/0029VbAmXWG7z4ki7lMZ9e0S" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
                aria-label="Join RecXchange on WhatsApp"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
              <li><Link href="/split-fees" className="hover:text-cyan-400 transition-colors">How Split Fees Work</Link></li>
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
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog & Updates</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link></li>
              <li><Link href="/collaboration" className="hover:text-cyan-400 transition-colors">Collaboration</Link></li>
              <li><Link href="/deal-protection" className="hover:text-cyan-400 transition-colors">Candidate Protection</Link></li>
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
            <strong className="text-white">RecXchange</strong> is a <Link href="/split-fees" className="text-cyan-400 hover:underline">split fee recruitment platform</Link> connecting 15,000+ recruiters globally. Our platform enables <Link href="/recruiter-roles" className="text-cyan-400 hover:underline">role sharing</Link>, <Link href="/recruiters-with-candidates" className="text-cyan-400 hover:underline">candidate submissions</Link>, and automated fee splits up to <Link href="/why-recxchange" className="text-cyan-400 hover:underline">70% on RecX Direct roles</Link>. With access to <Link href="/research" className="text-cyan-400 hover:underline">270M candidate profiles</Link> and <Link href="/deal-protection" className="text-cyan-400 hover:underline">timestamped submission protection</Link>, recruiters can earn an average of $7,000 per placement across <Link href="/roles" className="text-cyan-400 hover:underline">100+ live roles</Link> in Engineering, Healthcare, Tech, Sales, Finance, and HR. Learn more about our <Link href="/pricing" className="text-fuchsia-400 hover:underline">pricing plans</Link> or read <Link href="/blog" className="text-cyan-400 hover:underline">success stories from our community</Link>.
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
