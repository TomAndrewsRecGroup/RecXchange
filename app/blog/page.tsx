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
    <main className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* UPDATED Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto px-2 sm:px-4"
        >
          <div className="space-y-4 md:space-y-6">
            {/* Badge */}
            <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-cyan-400/60 font-bold">
              Social Updates
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight px-2">
              RecXchange Social Feed
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Latest updates, insights, and stories from our social media channels.
            </p>
          </div>
          
          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <Link
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7330859663111901185"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 transition-all font-bold text-xs sm:text-sm"
            >
              <span className="text-lg sm:text-xl">📧</span>
              <span className="hidden sm:inline">Subscribe to Our LinkedIn Newsletter</span>
              <span className="sm:hidden">LinkedIn Newsletter</span>
            </Link>
          </motion.div>
        </motion.header>

        {/* Category Filter */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 justify-center flex-wrap px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[9px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all ${
                selectedCategory === cat
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                  : 'border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="hidden md:inline">{cat}</span>
              <span className="md:hidden">{cat.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block w-7 h-7 sm:w-8 sm:h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base">Loading posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{getPlatformIcon(post.platform)}</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{formatDate(post.publishedAt)}</span>
                </div>
                
                {post.category && (
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mb-3 sm:mb-4">
                    {post.category}
                  </span>
                )}
                
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-4 sm:mb-6 group-hover:text-gray-200 transition-colors">
                  {post.content}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-[8px] sm:text-[9px] text-gray-600 font-medium px-2 py-0.5 rounded bg-white/[0.02] border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="text-gray-500 text-sm sm:text-base">No posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
