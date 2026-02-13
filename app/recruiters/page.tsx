// Recruiter overview page

export const metadata = {
  title: 'RecXchange for Recruiters',
  description:
    'Learn how recruiters collaborate, share roles and candidates, and protect split fees on RecXchange.',
};

export default function RecruitersPage() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">For Recruiters</h1>
      <p className="mb-6">
        RecXchange empowers recruiters to collaborate with peers on split‑fee roles, access a shared pool of
        candidates and protect their commissions. Join a network of thousands of vetted recruiters and
        expand your reach.
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