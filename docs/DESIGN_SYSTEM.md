# RecXchange Design System

## Overview
This design system provides reusable futuristic UI components extracted from the RecXchange homepage. All components feature holographic effects, neon glows, animated scan lines, and energy orbs that create a cohesive sci-fi aesthetic across the entire platform.

---

## 🎨 Color Palette

### Primary Colors
- **Cyan**: `#00f0ff` - Primary accent, links, CTAs
- **Fuchsia**: `#ff00ff` - Secondary accent, highlights
- **Purple**: `#a855f7` - Tertiary accent, gradients
- **Emerald**: `#10b981` - Success states, positive indicators

### Neutrals
- **Background**: `#0a0a0f` - Main background
- **Card Background**: `rgba(0, 0, 0, 0.4)` - Glass morphism cards
- **Text Primary**: `#ffffff` - Headings and important text
- **Text Secondary**: `#d1d5db` (gray-300) - Body text
- **Text Tertiary**: `#9ca3af` (gray-400) - Muted text

---

## 📦 Components

### 1. FuturisticBackground

Creates animated background with floating energy orbs and scan lines.

#### Usage
```tsx
import FuturisticBackground from '@/components/design-system/FuturisticBackground';

<section className="relative min-h-screen">
  <FuturisticBackground 
    variant="default" 
    showScanLines={true} 
    showOrbs={true} 
  />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'minimal' \| 'intense'` | `'default'` | Controls orb opacity |
| `showScanLines` | `boolean` | `true` | Show animated scan line effect |
| `showOrbs` | `boolean` | `true` | Show floating energy orbs |

#### Variants
- **default**: Standard opacity (0.15)
- **minimal**: Subtle background (0.08)
- **intense**: High contrast (0.25)

---

### 2. HolographicCard

Glass morphism card with holographic effects and animated glow.

#### Usage
```tsx
import HolographicCard from '@/components/design-system/HolographicCard';

<HolographicCard 
  color="cyan"
  variant="content"
  showStatusIndicator={true}
  glowIntensity="medium"
  href="/pricing"
>
  <h3 className="text-2xl font-black text-white mb-4">Card Title</h3>
  <p className="text-gray-300">Card content goes here</p>
</HolographicCard>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Card content |
| `color` | `'cyan' \| 'fuchsia' \| 'purple' \| 'emerald'` | `'cyan'` | Accent color |
| `href` | `string` | `undefined` | Makes card clickable with Next.js Link |
| `onClick` | `() => void` | `undefined` | Click handler |
| `variant` | `'stat' \| 'content' \| 'feature'` | `'content'` | Padding preset |
| `className` | `string` | `''` | Additional CSS classes |
| `showStatusIndicator` | `boolean` | `false` | Animated dot in top-left |
| `glowIntensity` | `'low' \| 'medium' \| 'high'` | `'medium'` | Outer glow strength |

#### Variants
- **stat**: Compact padding (p-3 sm:p-5) - For data panels
- **content**: Standard padding (p-6 sm:p-8) - For content cards
- **feature**: Medium padding (p-6) - For feature blocks

#### Color Examples
```tsx
{/* Cyan - Primary accent */}
<HolographicCard color="cyan">...</HolographicCard>

{/* Fuchsia - Pricing, premium features */}
<HolographicCard color="fuchsia">...</HolographicCard>

{/* Purple - Stats, analytics */}
<HolographicCard color="purple">...</HolographicCard>

{/* Emerald - Success, confirmation */}
<HolographicCard color="emerald">...</HolographicCard>
```

---

### 3. GlowButton

Animated CTA button with triple-layer glow effect.

#### Usage
```tsx
import GlowButton from '@/components/design-system/GlowButton';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

<GlowButton 
  variant="primary"
  size="md"
  href="/pricing"
  icon={<ArrowRightIcon className="w-5 h-5" />}
>
  Get Started
</GlowButton>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Button text |
| `href` | `string` | `undefined` | Link destination |
| `onClick` | `() => void` | `undefined` | Click handler |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `className` | `string` | `''` | Additional classes |
| `icon` | `ReactNode` | `undefined` | Icon element |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

#### Variants
- **primary**: Full gradient with triple glow (main CTAs)
- **secondary**: Outlined with border glow (secondary actions)
- **ghost**: Transparent with subtle hover (tertiary actions)

#### Sizes
- **sm**: `px-4 py-2 text-xs`
- **md**: `px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base`
- **lg**: `px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg`

---

### 4. StatusBadge

Animated status indicator with pulsing dot.

#### Usage
```tsx
import StatusBadge from '@/components/design-system/StatusBadge';

<StatusBadge 
  label="SYSTEM ONLINE" 
  color="cyan" 
  animated={true}
  size="md"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | Badge text |
| `color` | `'cyan' \| 'emerald' \| 'fuchsia' \| 'purple'` | `'cyan'` | Accent color |
| `animated` | `boolean` | `true` | Enable entrance animation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |

#### Use Cases
- System status indicators
- Live data badges
- Platform health displays
- Feature availability flags

---

### 5. NeonDivider

Animated horizontal divider with energy dots.

#### Usage
```tsx
import NeonDivider from '@/components/design-system/NeonDivider';

<NeonDivider 
  width="w-40" 
  height="h-[3px]" 
  animated={true}
  showDots={true}
  color="mixed"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'w-40'` | Tailwind width class |
| `height` | `string` | `'h-[3px]'` | Tailwind height class |
| `animated` | `boolean` | `true` | Enable scale-in animation |
| `showDots` | `boolean` | `true` | Show energy dots on ends |
| `color` | `'cyan' \| 'purple' \| 'fuchsia' \| 'mixed'` | `'mixed'` | Color scheme |

#### Color Variants
- **cyan**: Solid cyan line
- **purple**: Solid purple line
- **fuchsia**: Solid fuchsia line
- **mixed**: Cyan to fuchsia gradient (recommended)

---

### 6. InfoChip

Compact stat badge with animated pulse dot.

#### Usage
```tsx
import InfoChip from '@/components/design-system/InfoChip';

<InfoChip 
  text="15K+" 
  label="15,000+ recruiters" 
  color="emerald"
  href="/why-recxchange"
  description="Platform member count"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | Required | Display text |
| `label` | `string` | Required | ARIA label |
| `color` | `'emerald' \| 'cyan' \| 'fuchsia' \| 'purple'` | `'cyan'` | Accent color |
| `href` | `string` | `undefined` | Link destination |
| `description` | `string` | `undefined` | Tooltip text |

#### Use Cases
- Key statistics
- Platform metrics
- Feature highlights
- Social proof indicators

---

## 🎬 Animations

All animations are defined in `globals.css` and can be used with Tailwind classes.

### Available Animations

```css
/* Scan Line */
.animate-scan

/* Floating Orbs */
.animate-float
.animate-float-delayed

/* Pulsing Glow */
.animate-pulse-slow

/* Shimmer Effect */
.animate-shimmer

/* Glow Pulse */
.animate-glow-pulse
```

### Custom Animation Examples

```tsx
{/* Floating element */}
<div className="animate-float">
  <img src="/icon.png" alt="Floating icon" />
</div>

{/* Pulsing glow */}
<div className="animate-pulse-slow neon-glow-cyan">
  Live Indicator
</div>

{/* Scan line effect */}
<div className="relative overflow-hidden">
  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
</div>
```

---

## 🎨 Utility Classes

### Gradient Text
```tsx
<h1 className="gradient-text">
  Holographic Text
</h1>
```

### Neon Glow
```tsx
<div className="neon-glow-cyan">
  Cyan glow
</div>
<div className="neon-glow-fuchsia">
  Fuchsia glow
</div>
<div className="neon-glow-purple">
  Purple glow
</div>
```

### Glass Morphism
```tsx
<div className="glass-morphism p-6 rounded-xl">
  Frosted glass effect
</div>
```

### 3D Perspective
```tsx
<div className="perspective-2000">
  <div className="transform-style-3d">
    3D transformed content
  </div>
</div>
```

---

## 📋 Complete Page Template

```tsx
'use client';

import React from 'react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import InfoChip from '@/components/design-system/InfoChip';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ExamplePage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      {/* Futuristic Background */}
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <StatusBadge label="SYSTEM ONLINE" color="cyan" />
        </div>
        
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-center text-white mb-6">
          Welcome to RecXchange
        </h1>
        
        {/* Divider */}
        <NeonDivider color="mixed" />
        
        {/* Description */}
        <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Experience the future of recruitment collaboration
        </p>
        
        {/* Info Chips */}
        <div className="flex justify-center gap-4 mb-16">
          <InfoChip text="15K+" label="15,000+ recruiters" color="emerald" />
          <InfoChip text="270M" label="270M candidates" color="cyan" />
          <InfoChip text="70%" label="Up to 70% commission" color="fuchsia" />
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <HolographicCard color="cyan" variant="feature">
            <h3 className="text-xl font-bold text-white mb-2">Feature One</h3>
            <p className="text-gray-400 text-sm">Description of feature</p>
          </HolographicCard>
          
          <HolographicCard color="fuchsia" variant="feature">
            <h3 className="text-xl font-bold text-white mb-2">Feature Two</h3>
            <p className="text-gray-400 text-sm">Description of feature</p>
          </HolographicCard>
          
          <HolographicCard color="purple" variant="feature">
            <h3 className="text-xl font-bold text-white mb-2">Feature Three</h3>
            <p className="text-gray-400 text-sm">Description of feature</p>
          </HolographicCard>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <GlowButton 
            variant="primary" 
            size="lg" 
            href="/get-started"
            icon={<ArrowRightIcon className="w-5 h-5" />}
          >
            Get Started
          </GlowButton>
          
          <GlowButton variant="secondary" size="lg" href="/learn-more">
            Learn More
          </GlowButton>
        </div>
      </div>
    </main>
  );
}
```

---

## 🎯 Best Practices

### 1. Color Usage
- **Cyan**: Primary actions, links, main CTAs
- **Fuchsia**: Premium features, pricing, highlights
- **Purple**: Statistics, analytics, data visualization
- **Emerald**: Success states, positive metrics

### 2. Component Hierarchy
```
Page Container (bg-[#0a0a0f])
└── FuturisticBackground (absolute inset-0)
└── Content (relative z-10)
    ├── StatusBadge (top)
    ├── Heading + NeonDivider
    ├── InfoChips row
    ├── HolographicCard grid
    └── GlowButton CTAs (bottom)
```

### 3. Responsive Design
- All components are mobile-first responsive
- Use `sm:`, `md:`, `lg:` breakpoints consistently
- Cards should stack on mobile, grid on desktop
- Buttons should be full-width on mobile if needed

### 4. Accessibility
- All animations respect `prefers-reduced-motion`
- Status indicators have ARIA labels
- Focus states use cyan outline
- Color is never the only indicator

### 5. Performance
- Background orbs use CSS blur (hardware accelerated)
- Animations use `transform` and `opacity` (GPU)
- `backdrop-filter` gracefully degrades
- Framer Motion for complex animations only

---

## 🔧 Customization

### Extending Colors
Add new color variants to component config objects:

```tsx
const colorConfig = {
  // Existing colors...
  amber: {
    glow: 'from-amber-500/40 via-amber-600/30 to-amber-500/40',
    border: 'border-amber-400/40 hover:border-amber-300/60',
    // ... etc
  }
};
```

### Custom Animations
Add to `globals.css`:

```css
@keyframes your-animation {
  0% { /* start */ }
  100% { /* end */ }
}

.animate-your-animation {
  animation: your-animation 2s ease-in-out infinite;
}
```

### Component Variants
Extend variant props in component interfaces:

```tsx
interface HolographicCardProps {
  variant?: 'stat' | 'content' | 'feature' | 'custom';
  // Add custom styling logic
}
```

---

## 📚 Resources

- **Figma File**: [RecXchange Design System](link-to-figma)
- **Storybook**: [Component Library](link-to-storybook)
- **GitHub**: [Design System Repo](link-to-repo)

---

## 🆘 Support

For questions or issues with the design system:
- Open an issue on GitHub
- Contact the design team
- Check the examples page at `/design-system-example`

---

**Last Updated**: March 8, 2026  
**Version**: 1.0.0  
**Maintained By**: AMIVY Designs
