"use client";
import React from 'react';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c71df1] mb-4">Direct Access</h3>
          <h1 className="text-5xl font-bold mb-6 italic">Contact <span className="gradient-text">the Engine.</span></h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Whether you are a Hiring Manager looking to scale or a Recruiter with a top-tier candidate pool, our Account Managers are ready to assist.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-6 glass-card rounded-3xl border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-[#312fd7]/10 flex items-center justify-center text-[#312fd7]"><Mail /></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">General Inquiries</p>
                <p className="font-medium text-white">support@recxchange.com</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 glass-card rounded-3xl border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-[#c71df1]/10 flex items-center justify-center text-[#c71df1]"><Shield /></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Partnership Security</p>
                <p className="font-medium text-white text-sm">All data is encrypted via Xchange Engine protocols.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Form */}
        <form className="glass-card p-10 rounded-[3rem] border-white/10 space-y-6 bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-gray-500">How can we help?</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c71df1] outline-none appearance-none">
              <option className="bg-black">I am a Hiring Manager / Employer</option>
              <option className="bg-black">I am a Recruiter / Agency</option>
              <option className="bg-black">General Support</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c71df1] outline-none" />
            <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c71df1] outline-none" />
          </div>
          <textarea rows={4} placeholder="Your message..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c71df1] outline-none"></textarea>
          <button className="w-full py-4 rounded-xl bg-white text-black font-black hover:bg-gray-200 transition-all uppercase text-xs tracking-widest shadow-xl">
            Dispatch Message
          </button>
        </form>
      </div>
    </main>
  );
}
