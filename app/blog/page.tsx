"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

// This page will be configured later to pull from GHL Social Planner
// For now, it's a placeholder structure

export default function BlogPage() {
  // Placeholder - will be replaced with GHL Social Planner API integration
  const placeholderPosts = [
    {
      id: 1,
      title: "Coming Soon: RecXchange Insights",
      excerpt: "We're setting up our blog to share recruitment insights, platform updates, and success stories from our community.",
      date: "2026-02-25",
      category: "Platform Updates"
    }
  ];

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Insights & Updates
          </span>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
            RecXchange Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Recruitment insights, platform updates, and success stories from 15,000+ recruiters worldwide.
          </p>
        </motion.header>

        {/* Category Filter - Placeholder */}
        <div className="flex gap-3 mb-12 justify-center flex-wrap">
          {['All Posts', 'Platform Updates', 'Success Stories', 'Recruitment Tips', 'Industry News'].map((cat, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                i === 0
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                  : 'border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {placeholderPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-all group cursor-pointer"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[9px] font-bold uppercase tracking-widest mb-4">
                {post.category}
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="text-cyan-400 group-hover:text-white transition-colors">Read more →</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Configuration Notice */}
        <div className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Blog Configuration In Progress</h2>
          <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
            This blog page will automatically pull posts from our GHL Social Planner. Our team is currently configuring the integration. Check back soon for recruitment insights, platform updates, and success stories!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="https://youtube.com/@recxchange"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm"
            >
              🎥 Watch Our YouTube Content
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold text-sm"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
