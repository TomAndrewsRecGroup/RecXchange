// RecX Direct overview page for hiring managers

export const metadata = {
  title: 'RecX Direct – Managed Hiring Service',
  description:
    'Discover how RecX Direct connects you to thousands of vetted recruiters and manages your recruitment projects end‑to‑end.',
};

export default function DirectPage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        RecX Direct – Managed Hiring for Split‑Fee Recruitment
      </h1>
      <p className="mb-6 text-gray-700">
        RecX Direct is our managed hiring service. We match your open roles with the best recruiters in
        our network, coordinate the process end‑to‑end and ensure fees and agreements are enforced via
        escrow. With over 70 live roles and $700k in available fees, you can trust our split‑fee
        platform to deliver exceptional talent while protecting your budget and timeline.
      </p>
      <a
        href="/direct/post-role"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded"
      >
        Post a role
      </a>
    </section>
  );
}