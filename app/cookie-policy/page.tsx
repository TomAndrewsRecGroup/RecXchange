import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | RecXchange',
  description: 'Learn about how RecXchange uses cookies and how you can manage your preferences in compliance with UK GDPR and PECR regulations.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p>
              This Cookie Policy explains what cookies are, how we use them on RecXchange.io, and how you can manage your cookie preferences.
            </p>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
            <p className="mb-4">
              RecXchange uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Essential functionality:</strong> To enable core website features like login sessions and form submissions</li>
              <li><strong className="text-white">Analytics:</strong> To understand how visitors use our website and improve user experience</li>
              <li><strong className="text-white">Preferences:</strong> To remember your cookie consent choices and other settings</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Necessary Cookies</h3>
                <p className="mb-3 text-sm">
                  These cookies are essential for the website to function and cannot be disabled in our systems.
                </p>
                <div className="bg-black/30 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-white">Cookie Name</th>
                        <th className="text-left py-2 text-white">Purpose</th>
                        <th className="text-left py-2 text-white">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-cyan-400">cookie-consent</td>
                        <td className="py-2">Stores your cookie preferences</td>
                        <td className="py-2">12 months</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-cyan-400">session_*</td>
                        <td className="py-2">Authentication and security</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Analytics Cookies</h3>
                <p className="mb-3 text-sm">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="bg-black/30 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-white">Service</th>
                        <th className="text-left py-2 text-white">Purpose</th>
                        <th className="text-left py-2 text-white">Provider</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-cyan-400">Vercel Analytics</td>
                        <td className="py-2">Website performance and usage analytics</td>
                        <td className="py-2">Vercel Inc.</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-cyan-400">Funnel Tracking</td>
                        <td className="py-2">Conversion tracking and optimization</td>
                        <td className="py-2">RecXchange</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  <strong>Note:</strong> These cookies require your consent and will only be set if you accept analytics cookies.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Marketing Cookies</h3>
                <p className="text-sm">
                  We do not currently use marketing or advertising cookies. If we introduce these in the future, we will update this policy and request your consent.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="mb-4">
              Some cookies are set by third-party services that appear on our pages:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Vercel:</strong> Hosting and analytics (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Privacy Policy</a>)</li>
              <li><strong className="text-white">GoHighLevel:</strong> CRM and communication (<a href="https://www.gohighlevel.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Privacy Policy</a>)</li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Managing Your Cookie Preferences</h2>
            <p className="mb-4">
              You can manage your cookie preferences in several ways:
            </p>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-6 mb-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">🍪</span>
                Update Your Preferences
              </h3>
              <p className="text-sm mb-3">
                Click the button below to reopen the cookie consent banner and change your preferences at any time.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem('cookie-consent');
                  window.location.reload();
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Manage Cookie Preferences
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Browser Settings</h3>
            <p className="mb-3">
              Most web browsers allow you to control cookies through their settings. You can typically:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-sm text-gray-400">
              Please note that blocking all cookies will impact the functionality of most websites, including ours.
            </p>
          </section>

          {/* Legal Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Legal Compliance</h2>
            <p className="mb-4">
              This Cookie Policy complies with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">UK GDPR</strong> (UK General Data Protection Regulation)</li>
              <li><strong className="text-white">PECR</strong> (Privacy and Electronic Communications Regulations)</li>
              <li><strong className="text-white">DUA Act 2024</strong> (Data Use and Access Act 2024)</li>
            </ul>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date at the top of this page indicates when the policy was last revised.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p className="mb-4">
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <ul className="space-y-2">
              <li><strong className="text-white">Email:</strong> <a href="mailto:privacy@recxchange.io" className="text-cyan-400 hover:underline">privacy@recxchange.io</a></li>
              <li><strong className="text-white">Website:</strong> <a href="/contact" className="text-cyan-400 hover:underline">recxchange.io/contact</a></li>
            </ul>
          </section>

          {/* Related Policies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Related Policies</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/privacy" className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-400/30 transition-colors">
                <h3 className="text-white font-semibold mb-1">Privacy Policy</h3>
                <p className="text-gray-400 text-sm">How we collect and use your personal data</p>
              </a>
              <a href="/terms" className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-400/30 transition-colors">
                <h3 className="text-white font-semibold mb-1">Terms of Service</h3>
                <p className="text-gray-400 text-sm">Rules and guidelines for using RecXchange</p>
              </a>
              <a href="/gdpr" className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-400/30 transition-colors">
                <h3 className="text-white font-semibold mb-1">GDPR Compliance</h3>
                <p className="text-gray-400 text-sm">Your data protection rights</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
