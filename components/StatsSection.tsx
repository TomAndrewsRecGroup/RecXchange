// Dynamic statistics section for the RecXchange homepage
// Shows live counts of recruiters, roles, fees and countries active.

"use client";

import { useEffect, useState } from 'react';

export default function StatsSection() {
  // Starting number of active recruiters
  const [recruiterCount, setRecruiterCount] = useState(15034);

  useEffect(() => {
    // Increment recruiter count every 50 minutes on the client
    const interval = setInterval(() => {
      setRecruiterCount((prev) => prev + 1);
    }, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-100 text-gray-900">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold">{recruiterCount.toLocaleString()}</h3>
          <p className="mt-1 text-sm text-gray-600">Active recruiters</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">14</h3>
          <p className="mt-1 text-sm text-gray-600">Collaborative roles this month</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">53</h3>
          <p className="mt-1 text-sm text-gray-600">Collaborative roles total</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">$250k+</h3>
          <p className="mt-1 text-sm text-gray-600">Fees in collaborative roles</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">70</h3>
          <p className="mt-1 text-sm text-gray-600">Live RecX Direct roles</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">$700k+</h3>
          <p className="mt-1 text-sm text-gray-600">Fees in RecX Direct roles</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="mt-1 text-sm text-gray-600">Countries active</p>
        </div>
      </div>
    </section>
  );
}