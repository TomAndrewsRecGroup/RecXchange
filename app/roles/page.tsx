// Collaborative roles page

export const metadata = {
  title: 'Collaborative Roles – RecXchange',
  description: 'Browse live split‑fee roles shared by recruiters on RecXchange.',
};

export default function RolesPage() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Collaborative Roles</h1>
      <p className="mb-6">
        Here you’ll find a list of active collaborative roles shared by recruiters. Join the network to
        view full details and submit candidates.
      </p>
      {/* In a real app this would fetch and display roles from your backend */}
      <div className="text-sm text-gray-500">Role listings coming soon.</div>
    </section>
  );
}