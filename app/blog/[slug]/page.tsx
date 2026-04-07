"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      // Fetch all posts
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      // Find the post by slug
      const foundPost = data.posts.find((p: BlogPost) => p.slug === slug);
      setPost(foundPost || null);
      
      // Get related posts (same category, exclude current)
      if (foundPost) {
        const related = data.posts
          .filter((p: BlogPost) => p.category === foundPost.category && p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate Article schema for each blog post
  const getArticleSchema = (post: BlogPost) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl || "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "RecXchange",
      "logo": {
        "@type": "ImageObject",
        "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
        "width": 512,
        "height": 512
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://recxchange.io/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "about": {
      "@type": "Thing",
      "name": "Split Fee Recruitment"
    },
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "name": "RecXchange",
        "url": "https://app.recxchange.io"
      }
    ]
  });

  if (loading) {
    return (
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading post...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="glass-card p-12 rounded-3xl border-cyan-400/10 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              href="/blog"
              className="inline-block px-8 py-4 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(post)) }}
      />
      
      <main className="min-h-screen py-20 px-6">
        <article className="max-w-[1200px] mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold"
            >
              ← Back to Blog
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              {post.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="font-bold text-cyan-400">{post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </motion.header>

          {/* Featured Image */}
          {post.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 rounded-2xl overflow-hidden"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-3xl border-cyan-400/10 mb-12"
          >
            <div 
              className="prose prose-invert prose-cyan max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                prose-strong:text-white prose-strong:font-bold
                prose-ul:text-gray-400 prose-ul:my-4
                prose-ol:text-gray-400 prose-ol:my-4
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-400/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h2>
            <p className="text-gray-400 mb-6 max-w-3xl mx-auto">
              Join 15,000+ recruiters partnering on placements. Split fees up to 70% with zero platform fees.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                View Pricing
              </Link>
              <Link
                href="/faq"
                className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="glass-card p-6 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-all group"
                  >
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[9px] font-bold uppercase tracking-widest mb-3">
                      {relatedPost.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </article>
      </main>
    </>
  );
}
