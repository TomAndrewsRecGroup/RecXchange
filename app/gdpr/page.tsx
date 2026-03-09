import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import { internalLinks } from '@/lib/internal-links';

export const metadata = {
  title: "GDPR Compliance | RecXchange Data Protection",
  description: "RecXchange is fully GDPR compliant. Learn about our data protection practices, your rights under GDPR, and how we safeguard recruiter and candidate information.",
};

export default function GDPRPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <header className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 mt-6">
            <StatusBadge label="DATA PROTECTION COMPLIANCE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              GDPR Compliance
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              RecXchange is fully compliant with the General Data Protection Regulation (GDPR). We take data protection seriously and are committed to safeguarding your personal information.
            </p>
          </header>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">

            {/* Introduction */}
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">Our Commitment to GDPR</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange operates in full compliance with the <strong className="text-white">General Data Protection Regulation (GDPR)</strong>, the EU's data protection law that sets strict rules for how organizations handle personal data.
                </p>
                <p>
                  As a recruitment collaboration platform connecting recruiters globally, we process personal data responsibly, transparently, and lawfully. This page outlines our GDPR compliance practices and your rights as a data subject.
                </p>
              </div>
            </HolographicCard>

            {/* Data Controller */}
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Data Controller</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white">RecXchange Portal LLC</strong> is the data controller responsible for your personal data collected through our platform and marketing website.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-400 mb-2"><strong className="text-white">Contact Information:</strong></p>
                  <p className="text-xs text-gray-400">Email: <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:underline">support@recxchange.io</a></p>
                  <p className="text-xs text-gray-400">Data Protection Officer: <a href="mailto:dpo@recxchange.io" className="text-cyan-400 hover:underline">dpo@recxchange.io</a></p>
                </div>
              </div>
            </HolographicCard>

            {/* Your Rights Under GDPR */}
            <HolographicCard color="purple" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Your Rights Under GDPR</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>Under GDPR, you have the following rights regarding your personal data:</p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Access:</strong> You can request a copy of the personal data we hold about you.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Rectification:</strong> You can request that we correct inaccurate or incomplete data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Erasure ("Right to be Forgotten"):</strong> You can request deletion of your personal data under certain circumstances.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Restrict Processing:</strong> You can request that we limit how we use your data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Data Portability:</strong> You can request to receive your data in a structured, machine-readable format.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Object:</strong> You can object to certain types of data processing, including direct marketing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Right to Lodge a Complaint:</strong> You can file a complaint with your local data protection authority.</span>
                  </li>
                </ul>
                <p className="pt-4">
                  To exercise any of these rights, contact us at <a href="mailto:dpo@recxchange.io" className="text-cyan-400 hover:underline">dpo@recxchange.io</a>. We will respond within 30 days.
                </p>
              </div>
            </HolographicCard>

            {/* Data We Collect */}
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Data We Collect</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We collect and process the following categories of personal data:</p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Account Information:</strong> Name, email address, phone number, company name, job title.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Professional Data:</strong> Recruitment specializations, industries, geographic regions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Platform Usage:</strong> Roles posted, candidates submitted, collaboration activity, timestamps.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Payment Information:</strong> Processed securely through third-party payment providers (Stripe). We do not store full credit card details.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Technical Data:</strong> IP address, browser type, device information, cookies (see our <Link href={internalLinks.cookiePolicy} className="text-cyan-400 hover:underline">Cookie Policy</Link>).</span>
                  </li>
                </ul>
                <p className="pt-4">
                  For full details, see our <Link href={internalLinks.privacy} className="text-cyan-400 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </HolographicCard>

            {/* Legal Bases for Processing */}
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Legal Bases for Processing</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We process your personal data under the following lawful bases:</p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Contract Performance:</strong> Processing necessary to provide our recruitment collaboration services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Consent:</strong> For marketing communications and non-essential cookies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Legitimate Interests:</strong> For platform security, fraud prevention, and service improvements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Legal Obligations:</strong> To comply with applicable laws and regulations.</span>
                  </li>
                </ul>
              </div>
            </HolographicCard>

            {/* Data Security */}
            <HolographicCard color="purple" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Data Security Measures</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Encryption:</strong> All data transmitted via HTTPS/TLS. Database encryption at rest.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Access Controls:</strong> Role-based access. Multi-factor authentication available.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Regular Audits:</strong> Security assessments and vulnerability testing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Third-Party Compliance:</strong> Our service providers (AWS, Vercel, Stripe) are GDPR-compliant.</span>
                  </li>
                </ul>
              </div>
            </HolographicCard>

            {/* International Transfers */}
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">International Data Transfers</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RecXchange operates globally. Your data may be transferred to and processed in countries outside the European Economic Area (EEA).
                </p>
                <p>
                  When we transfer data internationally, we ensure appropriate safeguards are in place:
                </p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Standard Contractual Clauses (SCCs):</strong> EU-approved data transfer agreements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Adequacy Decisions:</strong> Transfers to countries deemed adequate by the EU Commission.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Vendor Compliance:</strong> All third-party processors are GDPR-compliant.</span>
                  </li>
                </ul>
              </div>
            </HolographicCard>

            {/* Data Retention */}
            <HolographicCard color="fuchsia" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Data Retention</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We retain personal data only as long as necessary:</p>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Active Accounts:</strong> Data retained while your account is active.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Closed Accounts:</strong> Data deleted within 90 days of account closure, except where legally required.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-white">Legal Obligations:</strong> Some data retained for tax, accounting, or legal compliance (typically 7 years).</span>
                  </li>
                </ul>
              </div>
            </HolographicCard>

            {/* Complaints */}
            <HolographicCard color="purple" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Complaints & Supervisory Authority</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  If you believe we have not handled your data in accordance with GDPR, you have the right to lodge a complaint with your local data protection authority.
                </p>
                <p>
                  For EU residents, you can find your supervisory authority at: <a href="https://edpb.europa.eu/about-edpb/board/members_en" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">EDPB Member List</a>.
                </p>
                <p>
                  We encourage you to contact us first at <a href="mailto:dpo@recxchange.io" className="text-cyan-400 hover:underline">dpo@recxchange.io</a> so we can address your concerns directly.
                </p>
              </div>
            </HolographicCard>

            {/* Contact & More Info */}
            <HolographicCard color="cyan" variant="content">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Contact Us About GDPR</h2>
              <div className="prose prose-invert max-w-none space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  For any questions about our GDPR compliance or to exercise your data rights, contact:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-400/10">
                  <p className="text-sm text-white font-bold mb-2">Data Protection Officer</p>
                  <p className="text-sm text-gray-400">Email: <a href="mailto:dpo@recxchange.io" className="text-cyan-400 hover:underline">dpo@recxchange.io</a></p>
                  <p className="text-sm text-gray-400">General Support: <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:underline">support@recxchange.io</a></p>
                </div>
                <p className="pt-4">
                  For more information about how we handle your data, see:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">→</span>
                    <span><Link href={internalLinks.privacy} className="text-cyan-400 hover:underline">Privacy Policy</Link> - Full data processing details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">→</span>
                    <span><Link href={internalLinks.cookiePolicy} className="text-cyan-400 hover:underline">Cookie Policy</Link> - How we use cookies and tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">→</span>
                    <span><Link href={internalLinks.terms} className="text-cyan-400 hover:underline">Terms of Service</Link> - Platform usage terms</span>
                  </li>
                </ul>
              </div>
            </HolographicCard>

            {/* Last Updated */}
            <div className="text-center pt-6">
              <p className="text-xs text-gray-600">
                Last updated: March 9, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
