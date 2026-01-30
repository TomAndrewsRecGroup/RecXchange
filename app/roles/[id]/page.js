"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function IndividualRoleView() {
  const params = useParams();
  
  // In a real app, you would fetch this by ID. 
  // Here is a mock-up of a "RecX Direct" role.
  const role = {
    title: "Principal AI Engineer",
    id: params.id || "RAI-992",
    type: "RecX Direct",
    loc: "London, UK (Hybrid)",
    salary: "£140,000 - £160,000",
    split: "£14,000",
    industry: "Artificial Intelligence / Fintech",
    posted: "2 hours ago",
    description: "Seeking a lead-level AI Engineer to build out the core inference engine for a Tier-1 Fintech platform. You will work directly with the CTO to scale LLM deployments across global infrastructure.",
    requirements: [
      "8+ years in Software Engineering (Python/C++)",
      "Proven experience deploying LLMs in production environments",
      "Deep understanding of vector databases and RAG architectures",
      "Previous experience in high-growth Fintech or HFT is a plus"
    ]
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link href="/roles" className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2">
            ← Back to Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-8 items-start">
          
          {/* Left Column: Role Details */}
          <div className="space-y-6">
            <section className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full border mb-4 inline-block ${
                    role.type === 'RecX Direct' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                  }`}>
                    {role.type}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold">{role.title}</h1>
                  <p className="text-gray-400 mt-2 font-medium">{role.loc} • {role.industry}</p>
                </div>
              </div>

              <div className="space-y-6 mt-8 pt-8 border-t border-white/5">
                <div>
                  <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-3">Role Summary</h3>
                  <p className="text-gray-300 leading-relaxed">{role.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-3">Core Requirements</h3>
                  <ul className="space-y-3">
                    {role.requirements.map((req, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-500 font-bold">/</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Commercials & CTA */}
          <div className="space-y-6 lg:sticky lg:top-32">
            
            {/* Commercial Card */}
            <section className="glass-card p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Estimated Split Fee</span>
                <span className="text-4xl font-bold gradient-text">{role.split}</span>
              </div>
              
              <div className="space-y-4 mb-8 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Package Range</span>
                  <span className="text-white font-medium">{role.salary}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Ref ID</span>
                  <span className="text-white font-medium">{role.id}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Posted</span>
                  <span className="text-white font-medium">{role.posted}</span>
                </div>
              </div>

              <a 
                href="https://app.recxchange.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all"
              >
                Open in RecXchange
              </a>
              <p className="text-[9px] text-gray-500 text-center mt-4 leading-relaxed">
                Clicking will open the RecXchange platform in a new tab where you can submit candidates or request collaboration.
              </p>
            </section>

            {/* Protection Reminder */}
            <section className="glass-card p-6 rounded-2xl border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Deal Protection Active</h4>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Submissions for this role are timestamped and protected by our standard Split Fee Agreement.
              </p>
              <Link href="/deal-protection" className="text-[10px] text-blue-400 mt-2 inline-block font-bold hover:underline">Learn more →</Link>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
