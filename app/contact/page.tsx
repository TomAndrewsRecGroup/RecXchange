"use client";
import React, { useState } from 'react';
import { Mail, MessageCircle, Send, User, Building2, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [userType, setUserType] = useState<'recruiter' | 'hiring' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your existing webhook/API
    console.log('Form submitted:', { userType, ...formData });
    // Add your webhook/API call here
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative text-white" style={{
      backgroundColor: '#050508',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 255, 0.15) 0px, transparent 50%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 mb-6">Get In Touch</h3>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Connect with the <br />
            <span className="gradient-text">Engineers of Talent.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are scaling a team in California or sourcing from London, our team provides the human oversight for our AI-driven Xchange.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Email Card */}
            <div className="glass-card p-8 rounded-[2.5rem] border-purple-400/10 bg-gradient-to-r from-purple-400/[0.03] to-transparent">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20 shadow-inner flex-shrink-0">
                  <Mail />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Direct Liaison</p>
                  <a href="mailto:support@recxchange.io" className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
                    support@recxchange.io
                  </a>
                  <p className="text-sm text-gray-400 mt-2">We typically respond within 2-4 hours during business hours.</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="glass-card p-8 rounded-[2.5rem] border-cyan-400/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                  <MessageCircle size={20} />
                </div>
                Why Connect With Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Recruiters:</strong> Access RecX Direct roles, collaborate on shared positions, and earn protected split fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Hiring Managers:</strong> Broadcast roles to 15,000+ specialist recruiters with zero admin overhead</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300"><strong className="text-white">Platform Support:</strong> Technical integrations, API access, and dedicated account management</span>
                </li>
              </ul>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">15k+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Active Recruiters</p>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">270M+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Candidate Profiles</p>
              </div>
              <div className="glass-card p-4 rounded-2xl border-white/5 text-center">
                <p className="text-2xl font-bold gradient-text">24/7</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Platform Uptime</p>
              </div>
            </div>
          </div>

          {/* Right: Live Chat Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-purple-500/5 blur-[100px] rounded-full" />
            <div className="relative glass-card p-10 md:p-12 rounded-[3.5rem] border-purple-400/10 bg-black/40 backdrop-blur-3xl">
              
              {/* Chat Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-white/5 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center relative">
                  <MessageCircle className="text-white" size={24} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Start a Conversation</h3>
                  <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Our team is online now
                  </p>
                </div>
              </div>

              {/* User Type Selection */}
              {!userType ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 font-medium mb-6">I am a...</p>
                  
                  <button
                    onClick={() => setUserType('recruiter')}
                    className="w-full p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-white mb-1">Recruiter</p>
                        <p className="text-xs text-gray-500">Agency or independent recruiter</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/20 transition-all text-lg">
                        →
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType('hiring')}
                    className="w-full p-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 hover:bg-fuchsia-400/10 hover:border-fuchsia-400/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-white mb-1">Hiring Manager</p>
                        <p className="text-xs text-gray-500">Need to fill roles</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-400/10 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-400/20 transition-all text-lg">
                        →
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Type Badge */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <div className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest ${
                      userType === 'recruiter' 
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400'
                        : 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-400'
                    }`}>
                      {userType === 'recruiter' ? 'Recruiter' : 'Hiring Manager'}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setUserType(null)}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium"
                    >
                      Change
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Smith"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-purple-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        Business Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@company.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-purple-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Your Company Ltd"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-purple-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+44 7XXX XXXXXX"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-purple-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-gray-500" size={16} />
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us about your requirements..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-purple-400 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl"
                  >
                    <Send size={16} />
                    Start Conversation
                  </button>

                  <p className="text-center text-[9px] text-gray-600 uppercase font-bold tracking-widest">
                    Secure AES-256 Encrypted Communication
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
