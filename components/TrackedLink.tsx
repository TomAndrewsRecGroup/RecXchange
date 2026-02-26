"use client";
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { ReactNode } from 'react';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  ctaText?: string;
  ctaLocation?: string;
  persona?: 'recruiter' | 'hiring-manager' | 'unknown';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

/**
 * TrackedLink - Automatically tracks all CTA clicks across the site
 * 
 * Usage:
 * <TrackedLink 
 *   href="/signup" 
 *   ctaText="Get Started" 
 *   ctaLocation="hero"
 *   persona="recruiter"
 * >
 *   Get Started
 * </TrackedLink>
 */
export default function TrackedLink({
  href,
  children,
  ctaText,
  ctaLocation,
  persona = 'unknown',
  variant = 'primary',
  className = '',
  onClick,
  external = false
}: TrackedLinkProps) {
  const handleClick = () => {
    // Track the CTA click
    trackEvent('cta_clicked', {
      cta_text: ctaText || (typeof children === 'string' ? children : 'Unknown CTA'),
      cta_location: ctaLocation || 'unknown',
      persona,
      variant,
      destination: href,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined
    });

    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }
  };

  if (external) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
