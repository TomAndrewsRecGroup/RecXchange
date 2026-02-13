// Pricing page

export const metadata = {
  title: 'Pricing – RecXchange',
  description: 'Explore pricing options for RecXchange recruiter subscriptions and RecX Direct.',
};

export default function PricingPage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple & Transparent Pricing</h1>
      <p className="mb-8">
        Choose the plan that’s right for your business. We offer flexible options for recruiters and
        competitive fees for hiring managers using RecX Direct.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="border border-gray-200 rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Recruiter Plan</h2>
          <p className="mb-4 text-sm text-gray-600">
            Access collaborative roles, share candidates and protect your split fees. Paid monthly.
          </p>
          <p className="text-3xl font-bold mb-4">£99<span className="text-base font-normal">/mo</span></p>
          <a
            href="/recruiters/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Join now
          </a>
        </div>
        <div className="border border-gray-200 rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">RecX Direct</h2>
          <p className="mb-4 text-sm text-gray-600">
            Managed hiring service where you only pay when you hire. No subscriptions required.
          </p>
          <p className="text-3xl font-bold mb-4">20%<span className="text-base font-normal"> fee</span></p>
          <a
            href="/direct/post-role"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Post a role
          </a>
        </div>
      </div>
    </section>
  );
}