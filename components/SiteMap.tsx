'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SiteMapLink {
  title: string;
  href: string;
  description?: string;
}

interface SiteMapSection {
  category: string;
  links: SiteMapLink[];
}

const siteStructure: SiteMapSection[] = [
  {
    category: 'Platform',
    links: [
      { title: 'Home', href: '/', description: 'RecXchange platform overview' },
      { title: 'For Recruiters', href: '/recruiter', description: 'Split fee collaboration for recruiters' },
      { title: 'For Hiring Managers', href: '/hiring-manager-home', description: 'Hire with 15,000+ recruiters' },
      { title: 'Why RecXchange', href: '/why-recxchange', description: 'Benefits and success stories' },
    ],
  },
  {
    category: 'Pricing & Plans',
    links: [
      { title: 'Pricing', href: '/pricing', description: 'View all pricing tiers' },
      { title: 'RecX Entry', href: '/pricing#recx-entry', description: '$1/month starter plan' },
      { title: 'RecX Lite', href: '/pricing#recx-lite', description: '$99/month with RecX Direct' },
      { title: 'RecX Pro', href: '/pricing#recx-pro', description: '$250/month with 70% splits' },
    ],
  },
  {
    category: 'Resources',
    links: [
      { title: 'Blog', href: '/blog', description: 'Recruitment insights and tips' },
      { title: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      { title: 'How It Works', href: '/how-it-works', description: 'Platform walkthrough' },
      { title: 'Success Stories', href: '/success-stories', description: 'Client testimonials' },
    ],
  },
  {
    category: 'Company',
    links: [
      { title: 'About Us', href: '/about', description: 'Our mission and team' },
      { title: 'Contact', href: '/contact', description: 'Get in touch' },
      { title: 'Careers', href: '/careers', description: 'Join our team' },
      { title: 'Partners', href: '/partners', description: 'Partnership opportunities' },
    ],
  },
  {
    category: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
      { title: 'Terms of Service', href: '/terms', description: 'Platform terms and conditions' },
      { title: 'Cookie Policy', href: '/cookies', description: 'Cookie usage information' },
    ],
  },
];

export default function SiteMap() {
  return (
    <nav className="w-full py-16 px-4" aria-label="Site map">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"
            style={{
              textShadow: '0 0 40px rgba(0,240,255,0.2)'
            }}
          >
            Site Map
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Explore all pages and resources on RecXchange
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, idx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative backdrop-blur-xl bg-black/40 p-6 rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-xl font-black text-cyan-300 mb-4 uppercase tracking-wider">
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link block"
                      >
                        <span className="text-white font-semibold group-hover/link:text-cyan-300 transition-colors">
                          {link.title}
                        </span>
                        {link.description && (
                          <span className="block text-sm text-gray-500 mt-1 group-hover/link:text-gray-400 transition-colors">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO-friendly list for crawlers */}
        <div className="sr-only">
          <h2>Complete Site Navigation</h2>
          <ul>
            {siteStructure.map((section) => (
              <li key={section.category}>
                <span>{section.category}</span>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
