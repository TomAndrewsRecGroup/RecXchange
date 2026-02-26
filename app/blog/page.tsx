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

// Mock data fallback for when API fails
const mockPosts: SocialPost[] = [
  {
    id: '1',
    content: `🚀 RecXchange hits 15,000+ recruiters worldwide!\n\nThat's 15,000 partners ready to help you fill roles and place candidates.\n\n✨ What's possible with this network:\n• Access to 270M candidate profiles\n• $750k in live placement fees\n• Average fee: $7,000 per placement\n• Split fees up to 70% on RecX Direct\n\n💰 Zero platform fees. You keep 100% of your split.\n\nReady to partner? Link in bio 👆`,
    publishedAt: '2026-02-25T10:00:00Z',
    platform: 'LinkedIn',
    category: 'Platform Updates',
    tags: ['milestone', 'network', 'growth'],
  },
  {
    id: '2',
    content: `📊 Real numbers from Sarah, a healthcare recruiter:\n\nMonth 1 on RecXchange:\n✅ 3 placements made\n✅ $15,200 earned\n✅ 50/50, 60/40, and 70% splits\n\nHer secret? She upgraded to Pro ($250/month) for instant access to RecX Direct roles.\n\nOne placement paid for 5 months of membership.\n\nThe ROI speaks for itself 💯`,
    publishedAt: '2026-02-24T14:30:00Z',
    platform: 'LinkedIn',
    category: 'Success Stories',
    tags: ['success-story', 'earnings', 'healthcare'],
  },
  {
    id: '3',
    content: `💡 Split fee comparison on a $10,000 placement:\n\n50/50 split: You earn $5,000\n60/40 split: You earn $6,000\n70% RecX Direct: You earn $7,000\n\nThat's a $2,000 difference between standard and RecX Direct.\n\nPro members get instant access to RecX Direct roles.\nLite members wait 7 days.\nEntry members wait 30 days.\n\nSpeed = earnings in recruitment 🏃‍♂️💨`,
    publishedAt: '2026-02-23T11:00:00Z',
    platform: 'LinkedIn',
    category: 'Recruitment Tips',
    tags: ['fee-splits', 'strategy', 'recx-direct'],
  },
  {
    id: '4',
    content: `🤝 Why recruiters love RecXchange:\n\n"I was skeptical about sharing fees. But I've made MORE money by partnering than working alone." - Mark, Tech Recruiter\n\n"The candidates submitted to my roles are higher quality than what I find myself." - Lisa, Finance Recruiter\n\n"I filled a role in 48 hours that I'd been stuck on for 2 months." - David, Engineering Recruiter\n\nPartnership > Competition 🚀`,
    publishedAt: '2026-02-22T09:15:00Z',
    platform: 'LinkedIn',
    category: 'Success Stories',
    tags: ['testimonials', 'community', 'partnership'],
  },
  {
    id: '5',
    content: `🎯 Top 5 highest-earning niches on RecXchange:\n\n1. Engineering - Average fee: $8,500\n2. Healthcare - Average fee: $7,800\n3. Tech/Software - Average fee: $9,200\n4. Finance - Average fee: $7,500\n5. Sales Leadership - Average fee: $8,000\n\nAll niches available across UK, USA, Europe, Middle East, Africa, and Australia.\n\n100+ live RecX Direct roles right now 📈`,
    publishedAt: '2026-02-21T16:45:00Z',
    platform: 'LinkedIn',
    category: 'Industry News',
    tags: ['niches', 'fees', 'opportunities'],
  },
  {
    id: '6',
    content: `⚡ Quick wins with RecXchange:\n\nDay 1: Post your hardest-to-fill role\nDay 2: Receive 3-5 candidate submissions\nDay 3: Screen and shortlist top 2\nWeek 2: Client interviews\nWeek 3: Offer made\nWeek 4: Candidate starts, fee splits 50/50\n\nAverage time from post to placement: 21 days.\n\nThat's 3x faster than solo recruiting 🚀\n\nStart your free trial: $1 for the first month`,
    publishedAt: '2026-02-20T13:20:00Z',
    platform: 'LinkedIn',
    category: 'Platform Updates',
    tags: ['quick-wins', 'timeline', 'process'],
  },
  {
    id: '7',
    content: `🔒 Client protection on RecXchange:\n\n❌ Company name hidden until you approve\n❌ Contact details private\n❌ Hiring manager name masked\n❌ No direct access for other recruiters\n\n✅ You control ALL information sharing\n✅ Legal contracts signed BEFORE details shared\n✅ Timestamp protection on submissions\n✅ Your client relationships stay yours\n\nPartnership doesn't mean giving up control 💪`,
    publishedAt: '2026-02-19T10:30:00Z',
    platform: 'LinkedIn',
    category: 'Platform Updates',
    tags: ['protection', 'privacy', 'security'],
  },
  {
    id: '8',
    content: `💰 RecXchange pricing breakdown:\n\nEntry: $1/month (5 tokens) - Test the waters\nLite: $99/month (150 tokens) - Serious recruiters\nPro: $250/month (400 tokens) - Instant RecX Direct access\nTeams: Custom - 5+ recruiters\n\n1 token = Post 1 role OR Submit 1 candidate\n\nZero platform fees. Zero hidden costs. Zero surprises.\n\nOne placement pays for 3-12 months of membership 📊`,
    publishedAt: '2026-02-18T15:00:00Z',
    platform: 'LinkedIn',
    category: 'Platform Updates',
    tags: ['pricing', 'value', 'roi'],
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    
    try {
      const categoryParam = selectedCategory === 'All Posts' ? '' : `?category=${encodeURIComponent(selectedCategory)}`;
      const response = await fetch(`/api/blog${categoryParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const data: BlogResponse = await response.json();
      
      if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
      } else {
        setPosts(mockPosts);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      // Fallback to mock data on error
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
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

  const filteredPosts = selectedCategory === 'All Posts'
    ? posts
    : posts.filter(post => post.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Social Updates
          </span>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
            RecXchange Social Feed
          </h1>
          <div className="pulse-underline mb-8 mx-auto" />
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
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
                      onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                      }}
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
                    <span>{post.platform || 'LinkedIn'}</span>
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
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
        {!loading && filteredPosts.length === 0 && (
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
