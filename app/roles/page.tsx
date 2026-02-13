// Collaborative roles page

export const metadata = {
  title: 'Collaborative Roles – RecXchange',
  description: 'Browse live split‑fee roles shared by recruiters on RecXchange.',
};

export default function RolesPage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Live Collaborative Roles on RecXchange
      </h1>
      <p className="mb-6 text-gray-700">
        Explore active split‑fee roles shared by our recruiter network. Each role is posted by a vetted
        recruiter looking for a partner to source candidates and complete the hire. Sign in or join
        RecXchange to view full details, apply your candidates and share fees securely.
      </p>
      {/* In a real app this would fetch and display roles from your backend */}
      <div className="text-sm text-gray-500">Role listings coming soon.</div>
    </section>
  );
}