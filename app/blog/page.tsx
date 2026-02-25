"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SocialPost {
  id: string;
  content: string;
  publishedAt: string;
  platform: string;
  category?: string;
  mediaUrl?: string;
  tags: string[];
}

interface BlogResponse {
  posts: SocialPost[];
  total: number;
  mock?: boolean;
}

const categories = ['All Posts', 'Platform Updates', 'Success Stories', 'Recruitment Tips', 'Industry News'];

export default function BlogPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return '💼';
      case 'twitter':
      case 'x':
        return '𝕏';
      case 'facebook':
        return '👥';
      default:
        return '📱';
    }
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
            Social Updates
          </span>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
            RecXchange Social Feed
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Latest updates, insights, and stories from our social media channels.
          </p>
          
          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <Link
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7330859663111901185"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 transition-all font-bold text-sm"
            >
              <span className="text-xl">📧</span>
              Subscribe to Our LinkedIn Newsletter
            </Link>
          </motion.div>
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
            ℹ️ <strong>Demo Mode:</strong> Showing sample posts. Configure GHL_API_KEY and GHL_LOCATION_ID to connect GHL Social Planner.
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
                {/* Category Badge */}
                {post.category && (
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[9px] font-bold uppercase tracking-widest mb-4">
                    {post.category}
                  </div>
                )}

                {/* Featured Image */}
                {post.mediaUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src={post.mediaUrl}
                      alt="Post media"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Post Content */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <span>{getPlatformIcon(post.platform)}</span>
                    <span>{post.platform}</span>
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-white/5 text-gray-500 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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
                ? 'No social posts available yet. Check back soon!'
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

        {/* Newsletter CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center mt-16 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">📧 Get Weekly Insights Delivered</h2>
          <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
            Subscribe to our LinkedIn Newsletter for exclusive recruitment insights, platform updates, and success stories every week.
          </p>
          <Link
            href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7330859663111901185"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 transition-all font-bold"
          >
            <span className="text-2xl">💼</span>
            Subscribe on LinkedIn
          </Link>
        </motion.section>

        {/* Additional CTAs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
            Join 15,000+ recruiters partnering on placements. Split fees up to 70% with zero platform fees.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all text-sm"
            >
              View Pricing
            </Link>
            <Link
              href="/faq"
              className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all text-sm"
            >
              Learn More
            </Link>
            <Link
              href="https://youtube.com/@recxchange"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm"
            >
              🎥 Watch Tutorials
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
