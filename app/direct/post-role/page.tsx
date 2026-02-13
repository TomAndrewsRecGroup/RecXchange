// Page for hiring managers to post a role on RecX Direct

export const metadata = {
  title: 'Post a Role – RecX Direct',
  description: 'Submit your hiring needs and we’ll connect you with the best recruiters on RecXchange.',
};

export default function PostRolePage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Post a Role</h1>
      <p className="mb-4">
        Tell us about your open position and our team will match you with vetted recruiters from our
        network. We’ll manage the process, protect your fees and ensure a successful hire.
      </p>
      {/* Placeholder form */}
      <form className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role title
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}