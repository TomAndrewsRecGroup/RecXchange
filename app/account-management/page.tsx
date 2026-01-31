"use client";
import React from "react";
import { UserCheck, MessageSquare, Users, ShieldCheck, Trophy, Handshake } from "lucide-react";

const supportSteps = [
  {
    icon: <MessageSquare className="text-[#312fd7]" size={32} />,
    title: "Expert Role Briefing",
    description: "Your dedicated Account Manager meets with you to understand the technical requirements, cultural fit, and strategic goals of your roles."
  },
  {
    icon: <Users className="text-[#c71df1]" size={32} />,
    title: "Global Recruiter Management",
    description: "We manage the 15,000+ specialist recruiters on the platform, directing their sourcing efforts so you don't have to deal with multiple agencies."
  },
  {
    icon: <Trophy className="text-white" size={32} />,
    title: "Elite Candidate Filtering",
    description: "The Xchange Engine performs semantic matching, and your Account Manager manually vets the results to ensure only the top 1% of candidates reach your desk."
  },
  {
    icon: <Handshake className="text-[#312fd7]" size={32} />,
    title: "End-to-End Support",
    description: "From scheduling interviews to managing offers and onboarding, your Account Manager acts as an extension of your internal HR team."
  }
];

export default function AccountManagement() {
  return (
    <div className="w-full pb-20 pt-10 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c71df1] mb-4">
          Partnership at Scale
        </h3>
        <h1 className="text-5xl font-bold mb-6">
          Your Dedicated <span className="gradient-text">Account Manager</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Hiring at speed shouldn't mean sacrificing quality. Every client is assigned a specialist Account Manager to navigate the Xchange Engine and manage the global recruiter community for you.
        </p>
      </div>

      {/* Process Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {supportSteps.map((step, index) => (
          <div key={index} className="glass-card p-10 rounded-3xl hover:border-[#c71df1]/50 transition-colors group">
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{step.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* High-Impact Stat Section */}
      <div className="max-w-6xl mx-auto glass-card rounded-[3rem] p-12 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#312fd7] via-[#c71df1] to-[#312fd7]" />
        <h2 className="text-3xl font-bold mb-8">One Point of Contact. 15,000+ Recruiters.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Role Ownership</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#c71df1] mb-2">Top 1%</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Candidate Quality</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#312fd7] mb-2">24/7</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Engine Monitoring</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto mt-24 text-center">
        <ShieldCheck className="mx-auto text-green-500 mb-6" size={48} />
        <h3 className="text-2xl font-bold mb-4">Ready to brief your Account Manager?</h3>
        <p className="text-gray-500 mb-8">
          Experience the efficiency of the Xchange Engine backed by the expertise of a dedicated recruitment partner.
        </p>
        <button className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Schedule Your Briefing
        </button>
      </div>
    </div>
  );
}
