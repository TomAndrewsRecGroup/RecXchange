/**
 * Internal Linking Utility
 * 
 * Centralized link mapping for consistent internal linking across the site.
 * Helps with:
 * - SEO (distributes page authority)
 * - User navigation
 * - Consistent link structure
 * - Easy updates if URLs change
 */

export const internalLinks = {
  // Main navigation
  home: '/',
  recruiter: '/recruiter',
  hiringManager: '/hiring-manager-home',
  pricing: '/pricing',
  faq: '/faq',
  contact: '/contact',
  blog: '/blog',
  
  // Recruiter journey
  recruiterRoles: '/recruiter-roles',
  recruiterCandidates: '/recruiters-with-candidates',
  collaboration: '/collaboration',
  whyRecXchange: '/why-recxchange',
  dealProtection: '/deal-protection',
  roles: '/roles',
  
  // Hiring manager journey
  hiringManagerLive: '/hiring-manager-live',
  hiringManagerStrategic: '/hiring-manager-strategic',
  accountManagement: '/account-management',
  research: '/research',
  
  // Platform
  platformRegister: 'https://app.recxchange.io/register',
  platformLogin: 'https://app.recxchange.io/login',
  platformDashboard: 'https://app.recxchange.io',
  
  // Social/External
  linkedin: 'https://www.linkedin.com/company/recxchange',
  twitter: 'https://twitter.com/RecXchange',
  youtube: 'https://youtube.com/@recxchange',
  
  // Legal
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
  cookiePolicy: '/cookie-policy',
};

/**
 * Contextual link suggestions for each page
 * Use these to add relevant internal links in content
 */
export const contextualLinks = {
  recruiter: [
    { text: 'See our pricing tiers', href: internalLinks.pricing },
    { text: 'Learn how collaboration works', href: internalLinks.collaboration },
    { text: 'Understand deal protection', href: internalLinks.dealProtection },
    { text: 'Browse live roles', href: internalLinks.roles },
    { text: 'Why choose RecXchange', href: internalLinks.whyRecXchange },
  ],
  pricing: [
    { text: 'For recruiters', href: internalLinks.recruiter },
    { text: 'How collaboration works', href: internalLinks.collaboration },
    { text: 'Frequently asked questions', href: internalLinks.faq },
    { text: 'Contact sales', href: internalLinks.contact },
  ],
  collaboration: [
    { text: 'Browse live roles', href: internalLinks.roles },
    { text: 'See pricing', href: internalLinks.pricing },
    { text: 'Deal protection details', href: internalLinks.dealProtection },
    { text: 'Get started as a recruiter', href: internalLinks.recruiter },
  ],
  whyRecXchange: [
    { text: 'See our pricing', href: internalLinks.pricing },
    { text: 'How it works', href: internalLinks.collaboration },
    { text: 'Read success stories', href: internalLinks.blog },
    { text: 'Get started now', href: internalLinks.platformRegister },
  ],
  faq: [
    { text: 'View pricing tiers', href: internalLinks.pricing },
    { text: 'Learn about collaboration', href: internalLinks.collaboration },
    { text: 'Contact support', href: internalLinks.contact },
    { text: 'For recruiters', href: internalLinks.recruiter },
  ],
};

/**
 * Helper function to get contextual links for a page
 */
export function getContextualLinks(page: keyof typeof contextualLinks) {
  return contextualLinks[page] || [];
}

/**
 * Anchor text suggestions for common keywords
 * Use these for natural-sounding internal links in content
 */
export const anchorTextSuggestions = {
  pricing: [
    'pricing tiers',
    'see pricing',
    'membership options',
    'RecX Entry, Lite, or Pro tiers',
  ],
  recXDirect: [
    'RecX Direct premium roles',
    'exclusive RecX Direct access',
    'roles with 70% commission',
    'premium tier opportunities',
  ],
  collaboration: [
    'how split fee recruitment works',
    'collaboration process',
    'partner with other recruiters',
    'split fee model',
  ],
  dealProtection: [
    'timestamp protection',
    'automated contracts',
    'deal protection system',
    'secure submissions',
  ],
  platform: [
    'get started',
    'create your account',
    'join RecXchange',
    'access the platform',
  ],
};
