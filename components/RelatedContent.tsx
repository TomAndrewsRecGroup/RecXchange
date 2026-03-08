'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface RelatedLink {
  title: string;
  href: string;
  description: string;
  category: string;
}

interface RelatedContentProps {
  currentPage: string;
  limit?: number;
}

// Define related content for each page
const relatedContentMap: Record<string, RelatedLink[]> = {
  '/': [
    { title: 'Pricing', href: '/pricing', description: 'View all pricing plans and features', category: 'Get Started' },
    { title: 'How It Works', href: '/how-it-works', description: 'Learn how RecXchange works', category: 'Learn More' },
    { title: 'FAQ', href: '/faq', description: 'Common questions answered', category: 'Support' },
  ],
  '/recruiter': [
    { title: 'Pricing', href: '/pricing', description: 'Choose your RecX plan', category: 'Get Started' },
    { title: 'Success Stories', href: '/success-stories', description: 'See how recruiters succeed', category: 'Social Proof' },
    { title: 'FAQ', href: '/faq', description: 'Recruiter FAQs', category: 'Support' },
    { title: 'Blog', href: '/blog', description: 'Recruitment tips and insights', category: 'Resources' },
  ],
  '/hiring-manager-home': [
    { title: 'Pricing', href: '/pricing', description: 'View hiring manager pricing', category: 'Get Started' },
    { title: 'Contact Us', href: '/contact', description: 'Speak to our team', category: 'Support' },
    { title: 'How It Works', href: '/how-it-works', description: 'The hiring process explained', category: 'Learn More' },
  ],
  '/pricing': [
    { title: 'For Recruiters', href: '/recruiter', description: 'See what recruiters get', category: 'Features' },
    { title: 'Why RecXchange', href: '/why-recxchange', description: 'Platform benefits', category: 'Learn More' },
    { title: 'FAQ', href: '/faq', description: 'Pricing questions answered', category: 'Support' },
  ],
  '/faq': [
    { title: 'Pricing', href: '/pricing', description: 'View detailed pricing', category: 'Get Started' },
    { title: 'Contact Us', href: '/contact', description: 'Still have questions?', category: 'Support' },
    { title: 'Blog', href: '/blog', description: 'Detailed guides and tips', category: 'Resources' },
  ],
  '/blog': [
    { title: 'For Recruiters', href: '/recruiter', description: 'Start recruiting on RecXchange', category: 'Get Started' },
    { title: 'Success Stories', href: '/success-stories', description: 'Real recruiter results', category: 'Social Proof' },
    { title: 'FAQ', href: '/faq', description: 'Common questions', category: 'Support' },
  ],
};

export default function RelatedContent({ currentPage, limit = 3 }: RelatedContentProps) {
  const relatedLinks = relatedContentMap[currentPage] || relatedContentMap['/'];
  const displayLinks = relatedLinks.slice(0, limit);

  if (displayLinks.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-transparent to-black/20" aria-labelledby="related-content-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 
            id="related-content-heading"
            className="text-2xl md:text-3xl font-black text-white mb-3"
            style={{
              textShadow: '0 0 40px rgba(0,240,255,0.2)'
            }}
          >
            Continue Exploring
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Here's what you might want to check out next
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayLinks.map((link, idx) => (
            <motion.article
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <Link href={link.href} className="block relative">
                <div className="relative backdrop-blur-xl bg-black/40 p-6 rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300 h-full">
                  {/* Category badge */}
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 mb-4">
                    {link.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    {link.title}
                    <ArrowRightIcon className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  
                  <p className="text-gray-400 text-sm">
                    {link.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
