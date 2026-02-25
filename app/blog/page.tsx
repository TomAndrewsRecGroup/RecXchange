"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  author: string;
  imageUrl?: string;
  tags: string[];
}

interface BlogResponse {
  posts: BlogPost[];
  total: number;
  mock?: boolean;
}

const categories = ['All Posts', 'Platform Updates', 'Success Stories', 'Recruitment Tips', 'Industry News'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory === 'All Posts' ? '' : `?category=${encodeURIComponent(selectedCategory)}`;
      const response = await fetch(`/api/blog${categoryParam}`);
      const data: BlogResponse = await response.json();
      setPosts(data.posts);
      setIsMockData(data.mock || false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

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

        {/* Category Filter */}
        <div className="flex gap-3 mb-12 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                  : 'border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mock Data Notice */}
        {isMockData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm text-center"
          >
            ℹ️ <strong>Demo Mode:</strong> Showing sample posts. Configure GHL_API_KEY and GHL_LOCATION_ID in environment variables to connect to GHL Social Planner.
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-all group"
              >
                <Link href={`/blog/${post.slug}`}>
                  {post.imageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
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
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="text-cyan-400 group-hover:text-white transition-colors">Read more →</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">No Posts Found</h2>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              {selectedCategory === 'All Posts'
                ? 'No blog posts available yet. Check back soon!'
                : `No posts in the "${selectedCategory}" category yet.`}
            </p>
            <button
              onClick={() => setSelectedCategory('All Posts')}
              className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold text-sm"
            >
              View All Posts
            </button>
          </div>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
            Get the latest recruitment insights, platform updates, and success stories delivered weekly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="https://youtube.com/@recxchange"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm"
            >
              🎥 Subscribe on YouTube
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold text-sm"
            >
              Read FAQs
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all text-sm"
            >
              Join RecXchange
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
