'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Map of paths to human-readable names
const pathNames: Record<string, string> = {
  '': 'Home',
  'recruiter': 'For Recruiters',
  'hiring-manager-home': 'For Hiring Managers',
  'pricing': 'Pricing',
  'faq': 'FAQ',
  'blog': 'Blog',
  'about': 'About Us',
  'contact': 'Contact',
  'why-recxchange': 'Why RecXchange',
  'how-it-works': 'How It Works',
  'success-stories': 'Success Stories',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service',
  'cookies': 'Cookie Policy',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  // Build breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: pathNames[segment] || segment.replace(/-/g, ' '),
      href: currentPath,
    });
  });

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="w-full py-4 px-4 bg-black/20 backdrop-blur-sm border-b border-cyan-400/10"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {!isFirst && (
                  <ChevronRightIcon className="w-4 h-4 text-gray-600 mx-2" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-cyan-300 font-semibold flex items-center gap-1.5"
                    aria-current="page"
                    itemProp="name"
                  >
                    {isFirst && <HomeIcon className="w-4 h-4" aria-hidden="true" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium"
                    itemProp="item"
                  >
                    {isFirst && <HomeIcon className="w-4 h-4" aria-hidden="true" />}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
