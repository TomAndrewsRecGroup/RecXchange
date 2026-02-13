// Recruiter registration page

export const metadata = {
  title: 'Join RecXchange as a Recruiter',
  description: 'Sign up to join the RecXchange network and start collaborating on split‑fee roles.',
};

export default function RecruiterRegisterPage() {
  return (
    <section className="py-16 container mx-auto px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Join as a Recruiter</h1>
      <p className="mb-4">
        Complete the form below to create your recruiter account. We’ll review your details and notify you
        once your profile is verified.
      </p>
      {/* Form is just a placeholder; integrate with your backend or CRM */}
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}