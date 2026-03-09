'use client';

import React from "react";
import { Check, HelpCircle } from "lucide-react";
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';
import RecXDirectForm from '@/components/recx-direct-form';
import FAQSection from '@/components/FAQSection';
import LastUpdated from '@/components/LastUpdated';
import { pricingFAQs } from '@/data/faqs/recruiter-faqs';
import { internalLinks } from '@/lib/internal-links';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: "Entry",
    price: "1",
    period: "/month",
    description: "For recruiters trying the platform",
    tokens: "5 tokens/month",
    recxDirectAccess: "30-day delay",
    features: [
      "Up to 30 CVs stored",
      "5 tokens per month",
      "30-day delay on RecX Direct roles",
      "Basic search & match",
      "Standard support",
    ],
    color: "cyan" as const,
    highlighted: false,
  },
  {
    name: "Lite",
    price: "99",
    period: "/month",
    description: "For growing independent recruiters",
    tokens: "150 tokens/month",
    recxDirectAccess: "7-day delay",
    features: [
      "Up to 300 CVs stored",
      "150 tokens per month",
      "7-day delay on RecX Direct roles",
      "AI-powered candidate search",
      "Advanced matching algorithms",
      "Email & in-app support",
    ],
    color: "purple" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "249",
    period: "/month",
    description: "For power recruiters & boutique firms",
    tokens: "400 tokens/month",
    recxDirectAccess: "Instant access",
    features: [
      "Huge CV storage allowance",
      "400 tokens per month",
      "Instant access to RecX Direct roles",
      "All AI & search features",
      "Priority matching",
      "Dedicated account manager",
      "Priority support",
    ],
    color: "fuchsia" as const,
    highlighted: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Teams",
    price: "Custom",
    period: "",
    description: "For agencies with 5+ recruiters",
    tokens: "Scaled tokens",
    recxDirectAccess: "Instant access",
    features: [
      "Custom CV storage",
      "Scaled token allocation",
      "Instant RecX Direct access",
      "Team performance dashboard",
      "Shared candidate pools",
      "White-label options",
      "API access",
      "Custom integrations",
    ],
    color: "emerald" as const,
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 md:mb-12 mt-6"
          >
            <StatusBadge label="PRICING" color="purple" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6">
              Pay Monthly, <span className="text-white">Split Fees Forever</span>
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              No placement fees. No hidden charges. Just monthly membership and 100% of your split fee.
            </p>
          </motion.header>

          {/* ... rest of pricing page content remains the same ... */}

          <div className="mt-8 sm:mt-10 md:mt-12">
            <LastUpdated date="2025-01-27" />
          </div>
        </div>
      </div>
    </main>
  );
}
