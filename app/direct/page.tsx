// RecX Direct overview page for hiring managers

export const metadata = {
  title: 'RecX Direct – Managed Hiring Service',
  description:
    'Discover how RecX Direct connects you to thousands of vetted recruiters and manages your recruitment projects end‑to‑end.',
};

export default function DirectPage() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">RecX Direct</h1>
      <p className="mb-6">
        RecX Direct is our managed hiring service. We match your open roles with the best recruiters in
        our network, coordinate the process and ensure fees and agreements are enforced. With 70+ live
        roles and over $700k in fees, you can trust us to deliver exceptional talent.
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