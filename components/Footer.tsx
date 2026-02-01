import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2">
          <Image 
            src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w"
            alt="Logo" width={140} height={35} className="mb-6 opacity-90"
          />
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            The premium engine for recruiter collaboration, candidate exchange, and guaranteed deal protection.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Recruiters</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/recruiter" className="hover:text-white">Recruiter Home</Link></li>
            <li><Link href="/recruiter-roles" className="hover:text-white">Post Roles</Link></li>
            <li><Link href="/recruiters-with-candidates" className="hover:text-white">Submit Candidates</Link></li>
            <li><Link href="/collaboration" className="hover:text-white">Split Fees</Link></li>
            <li><Link href="/pricing" className="hover:text-[#c71df1] transition-colors font-medium">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Hiring Managers</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/hiring-manager" className="hover:text-white">Hiring Manager Home</Link></li>
            <li><Link href="/hire-now" className="hover:text-white">Hiring Now?</Link></li>
            <li><Link href="/hire-soon" className="hover:text-white">Hiring Soon?</Link></li>
            <li><Link href="/account-management" className="hover:text-white">Management & Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/deal-protection" className="hover:text-white">Deal Protection</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
        <p>© {new Date().getFullYear()} RecXchange Engine. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="https://app.recxchange.io" className="hover:text-white">Platform Login</Link>
          <Link href="https://app.recxchange.io/register" className="hover:text-white">Create Account</Link>
        </div>
      </div>
    </footer>
  );
}
