"use client";
import React from 'react';
import { Mail, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side: Brand Value */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#c71df1] mb-6">Global Hub</h3>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 italic leading-tight">
            Connect with the <br/>
            <span className="gradient-text">Engineers of Talent.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
            Whether you are scaling a team in California or sourcing from London, our team provides the human oversight for our AI-driven Xchange.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-8 glass-card rounded-[2.5rem] border-white/5 bg-gradient-to-r from-white/[0.03] to-transparent">
              <div className="w-14 h-14 rounded-2xl bg-[#312fd7]/10 flex items-center justify-center text-[#312fd7] shadow-inner"><Mail /></div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Direct Liaison</p>
                <p className="text-xl font-medium text-white">support@recxchange.com</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 glass-card rounded-[2.5rem] border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-[#c71df1]/10 flex items-center justify-center text-[#c71df1]"><Globe /></div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Operational HQ</p>
                <p className="text-sm font-medium text-gray-300">Dubai Silicon Oasis, <br/>Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Lead Funnel Form */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[#312fd7]/5 blur-[100px] rounded-full" />
          <form className="relative glass-card p-10 md:p-12 rounded-[3.5rem] border-white/10 space-y-8 bg-black/40 backdrop-blur-3xl">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Inquiry Type</label>
              <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-300 focus:border-[#c71df1] outline-none transition-all cursor-pointer appearance-none">
                <option className="bg-black">I am looking to Hire (Employer)</option>
                <option className="bg-black">I am a Recruiter (Agency Partner)</option>
                <option className="bg-black">Technical Support / Integration</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Full Name</label>
                <input type="text" placeholder="Jane Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#c71df1] outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Business Email</label>
                <input type="email" placeholder="jane@company.com" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#c71df1] outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Message</label>
              <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#c71df1] outline-none transition-all resize-none"></textarea>
            </div>

            <button className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-[#c71df1] hover:text-white transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl">
              Initialize Dispatch <ArrowRight size={16} />
            </button>

            <div className="pt-6 border-t border-white/5 flex items-center gap-3 justify-center">
              <ShieldCheck size={16} className="text-gray-600" />
              <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Secure AES-256 Encrypted Communication</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
