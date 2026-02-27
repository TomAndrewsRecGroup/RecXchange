"use client";
import React from "react";
import { UserCheck, MessageSquare, Users, ShieldCheck, Trophy, Handshake } from "lucide-react";
import { motion } from 'framer-motion';

const supportSteps = [
  {
    Icon: MessageSquare,
    color: "text-[#312fd7]",
    title: "Expert Role Briefing",
    description: "Your dedicated Account Manager meets with you to understand the technical requirements, cultural fit, and strategic goals of your roles."
  },
  {
    Icon: Users,
    color: "text-[#c71df1]",
    title: "Global Recruiter Management",
    description: "We manage the 15,000+ specialist recruiters on the platform, directing their sourcing efforts so you don't have to deal with multiple agencies."
  },
  {
    Icon: Trophy,
    color: "text-white",
    title: "Elite Candidate Filtering",
    description: "The Xchange Engine performs semantic matching, and your Account Manager manually vets the results to ensure only the top 1% of candidates reach your desk."
  },
  {
    Icon: Handshake,
    color: "text-[#312fd7]",
    title: "End-to-End Support",
    description: "From scheduling interviews to managing offers and onboarding, your Account Manager acts as an extension of your internal HR team."
  }
];

export default function AccountManagement() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-x-hidden">
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        {/* Hero Section */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
              Partnership at Scale
            </span>
            <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
              Your Dedicated Account Manager
            </h1>
            <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
              Hiring at speed shouldn't mean sacrificing quality. Every client is assigned a specialist Account Manager to navigate the Xchange Engine and manage the global recruiter community for you.
            </p>
          </motion.div>
        </header>

        {/* Process Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {supportSteps.map((step, index) => {
            const IconComponent = step.Icon;
            return (
              <div key={index} className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl hover:border-[#c71df1]/50 transition-colors group">
                <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${step.color}`} />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-2.5 md:mb-3">{step.title}</h4>
                <p className="text-gray-500 text-[13px] sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* High-Impact Stat Section */}
        <section className="w-full glass-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#312fd7] via-[#c71df1] to-[#312fd7]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 mt-2 sm:mt-3 md:mt-4">One Point of Contact. 15,000+ Recruiters.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-12">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">100%</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-500 font-bold">Role Ownership</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#c71df1] mb-1 sm:mb-2">Top 1%</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-500 font-bold">Candidate Quality</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#312fd7] mb-1 sm:mb-2">24/7</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-gray-500 font-bold">Engine Monitoring</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
            <ShieldCheck className="text-green-500 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2.5 sm:mb-3 md:mb-4">Ready to brief your Account Manager?</h3>
          <p className="text-gray-500 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 px-2">
            Experience the efficiency of the Xchange Engine backed by the expertise of a dedicated recruitment partner.
          </p>
          <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all">
            Schedule Your Briefing
          </button>
        </section>
      </div>
    </main>
  );
}
