'use client';

import React from 'react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import InfoChip from '@/components/design-system/InfoChip';
import { ArrowRightIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DesignSystemExample() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden font-[family-name:var(--font-lexend)]">
      {/* Futuristic Background */}
      <FuturisticBackground variant="default" showScanLines={true} showOrbs={true} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <StatusBadge label="DESIGN SYSTEM v1.0" color="cyan" size="md" />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-8 mb-6"
            style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}
          >
            RecXchange Design System
          </h1>
          
          <NeonDivider width="w-48" color="mixed" />
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-8 mb-10">
            All the futuristic UI components from the homepage, now reusable across your entire site.
          </p>
          
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm underline">
            ← Back to Home
          </Link>
        </div>

        {/* Status Badges Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Status Badges</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <StatusBadge label="SYSTEM ONLINE" color="cyan" />
            <StatusBadge label="ACTIVE" color="emerald" />
            <StatusBadge label="PREMIUM" color="fuchsia" />
            <StatusBadge label="ANALYTICS" color="purple" />
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <StatusBadge label="SMALL" color="cyan" size="sm" />
            <StatusBadge label="MEDIUM" color="cyan" size="md" />
            <StatusBadge label="LARGE" color="cyan" size="lg" />
          </div>
        </section>

        <NeonDivider width="w-full" color="mixed" />

        {/* Info Chips Section */}
        <section className="my-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Info Chips</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <InfoChip text="15K+" label="15,000 users" color="emerald" description="Total active users" />
            <InfoChip text="270M" label="270 million records" color="cyan" description="Database size" />
            <InfoChip text="70%" label="70% success rate" color="fuchsia" description="Conversion rate" />
            <InfoChip text="24/7" label="24/7 support" color="purple" description="Always available" />
          </div>
        </section>

        <NeonDivider width="w-full" color="mixed" />

        {/* Buttons Section */}
        <section className="my-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Glow Buttons</h2>
          
          {/* Primary Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Primary Variant</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton variant="primary" size="sm">
                Small Button
              </GlowButton>
              <GlowButton variant="primary" size="md" icon={<ArrowRightIcon className="w-5 h-5" />}>
                Medium with Icon
              </GlowButton>
              <GlowButton variant="primary" size="lg" icon={<RocketLaunchIcon className="w-6 h-6" />}>
                Large Button
              </GlowButton>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Secondary Variant</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton variant="secondary" size="sm">
                Small Button
              </GlowButton>
              <GlowButton variant="secondary" size="md" icon={<SparklesIcon className="w-5 h-5" />}>
                Medium with Icon
              </GlowButton>
              <GlowButton variant="secondary" size="lg">
                Large Button
              </GlowButton>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div>
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Ghost Variant</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton variant="ghost" size="sm">
                Small Button
              </GlowButton>
              <GlowButton variant="ghost" size="md">
                Medium Button
              </GlowButton>
              <GlowButton variant="ghost" size="lg">
                Large Button
              </GlowButton>
            </div>
          </div>
        </section>

        <NeonDivider width="w-full" color="mixed" />

        {/* Holographic Cards Section */}
        <section className="my-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Holographic Cards</h2>
          
          {/* Color Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <HolographicCard color="cyan" variant="feature" showStatusIndicator={true}>
              <h3 className="text-xl font-bold text-white mb-2">Cyan Card</h3>
              <p className="text-gray-400 text-sm">Primary accent color</p>
            </HolographicCard>
            
            <HolographicCard color="fuchsia" variant="feature" showStatusIndicator={true}>
              <h3 className="text-xl font-bold text-white mb-2">Fuchsia Card</h3>
              <p className="text-gray-400 text-sm">Secondary accent</p>
            </HolographicCard>
            
            <HolographicCard color="purple" variant="feature" showStatusIndicator={true}>
              <h3 className="text-xl font-bold text-white mb-2">Purple Card</h3>
              <p className="text-gray-400 text-sm">Tertiary accent</p>
            </HolographicCard>
            
            <HolographicCard color="emerald" variant="feature" showStatusIndicator={true}>
              <h3 className="text-xl font-bold text-white mb-2">Emerald Card</h3>
              <p className="text-gray-400 text-sm">Success state</p>
            </HolographicCard>
          </div>

          {/* Stat Card Example */}
          <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Stat Variant</h3>
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <HolographicCard color="cyan" variant="stat" showStatusIndicator={true}>
              <div className="text-[10px] uppercase tracking-wider font-bold text-cyan-400/80 mb-2">ACTIVE</div>
              <div className="text-3xl font-black text-white mb-1">1,247</div>
              <div className="text-xs text-cyan-400/80">USERS</div>
            </HolographicCard>
            
            <HolographicCard color="fuchsia" variant="stat" showStatusIndicator={true}>
              <div className="text-[10px] uppercase tracking-wider font-bold text-fuchsia-400/80 mb-2">REVENUE</div>
              <div className="text-3xl font-black text-white mb-1">$84K</div>
              <div className="text-xs text-fuchsia-400/80">THIS MONTH</div>
            </HolographicCard>
            
            <HolographicCard color="purple" variant="stat" showStatusIndicator={true}>
              <div className="text-[10px] uppercase tracking-wider font-bold text-purple-400/80 mb-2">AVERAGE</div>
              <div className="text-3xl font-black text-white mb-1">$6.7K</div>
              <div className="text-xs text-purple-400/80">PER DEAL</div>
            </HolographicCard>
          </div>

          {/* Content Card Example */}
          <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Content Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <HolographicCard color="cyan" variant="content" glowIntensity="high">
              <h3 className="text-2xl font-black text-white mb-4">Feature Title</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                This is a content card with more padding and space for detailed information. 
                Perfect for feature descriptions, blog post previews, or detailed explanations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>First feature point</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Second feature point</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Third feature point</span>
                </li>
              </ul>
            </HolographicCard>
            
            <HolographicCard color="fuchsia" variant="content" glowIntensity="high">
              <h3 className="text-2xl font-black text-white mb-4">Premium Feature</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                High-intensity glow makes this card stand out more. Use for premium features, 
                special announcements, or important information that needs extra attention.
              </p>
              <div className="flex gap-3">
                <GlowButton variant="secondary" size="sm">
                  Learn More
                </GlowButton>
                <GlowButton variant="ghost" size="sm">
                  Dismiss
                </GlowButton>
              </div>
            </HolographicCard>
          </div>
        </section>

        <NeonDivider width="w-full" color="mixed" />

        {/* Dividers Section */}
        <section className="my-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Neon Dividers</h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-center text-gray-400 mb-4 text-sm">Mixed (Gradient)</p>
              <NeonDivider width="w-64" color="mixed" />
            </div>
            
            <div>
              <p className="text-center text-gray-400 mb-4 text-sm">Cyan</p>
              <NeonDivider width="w-64" color="cyan" />
            </div>
            
            <div>
              <p className="text-center text-gray-400 mb-4 text-sm">Fuchsia</p>
              <NeonDivider width="w-64" color="fuchsia" />
            </div>
            
            <div>
              <p className="text-center text-gray-400 mb-4 text-sm">Purple</p>
              <NeonDivider width="w-64" color="purple" />
            </div>
            
            <div>
              <p className="text-center text-gray-400 mb-4 text-sm">Without Dots</p>
              <NeonDivider width="w-64" color="mixed" showDots={false} />
            </div>
          </div>
        </section>

        <NeonDivider width="w-full" color="mixed" />

        {/* Background Variants Section */}
        <section className="my-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Background Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-400/20">
              <FuturisticBackground variant="minimal" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Minimal</h3>
                  <p className="text-gray-400 text-sm">Subtle background</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-400/20">
              <FuturisticBackground variant="default" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Default</h3>
                  <p className="text-gray-400 text-sm">Standard opacity</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-400/20">
              <FuturisticBackground variant="intense" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Intense</h3>
                  <p className="text-gray-400 text-sm">High contrast</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center mt-20 pt-12 border-t border-cyan-400/10">
          <h2 className="text-3xl font-black text-white mb-6">Ready to Use?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Check out the full documentation at <code className="text-cyan-400">/docs/DESIGN_SYSTEM.md</code>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <GlowButton 
              variant="primary" 
              size="lg" 
              href="/"
              icon={<ArrowRightIcon className="w-5 h-5" />}
            >
              Back to Home
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              size="lg" 
              onClick={() => window.open('https://github.com/TomAndrewsRecGroup/RecXchange/blob/main/docs/DESIGN_SYSTEM.md', '_blank')}
            >
              View Documentation
            </GlowButton>
          </div>
        </div>
      </div>
    </main>
  );
}
