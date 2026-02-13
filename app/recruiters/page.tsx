// Recruiter overview page

export const metadata = {
  title: 'RecXchange for Recruiters',
  description:
    'Learn how recruiters collaborate, share roles and candidates, and protect split fees on RecXchange.',
};

export default function RecruitersPage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-4xl">
      {/* Main heading with SEO keywords */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        The Split‑Fee Recruitment Network for Recruiters
      </h1>
      <p className="mb-6 text-gray-700">
        RecXchange empowers recruiters to collaborate with peers on split‑fee roles, access a shared pool of
        candidates and protect their commissions. Join a network of over 15,000 vetted recruiters, share
        opportunities effortlessly and grow your earnings while maintaining full control over your
        relationships.
      </p>
      <a
        href="/recruiters/register"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded"
      >
        Join the network
      </a>
    </section>
  );
}