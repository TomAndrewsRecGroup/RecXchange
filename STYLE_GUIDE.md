# RecXchange Style Guide - Source of Truth

**Based on:** `app/page.tsx` (Homepage)
**Purpose:** Ensure visual consistency across all pages
**Last Updated:** March 9, 2026

---

## 🎨 Core Visual Identity

### Background
- **Base:** `bg-[#0a0a0f]` (deep black with slight blue tint)
- **Font Family:** `font-[family-name:var(--font-lexend)]`
- **Overflow:** `overflow-x-hidden` on main wrapper

### Color Palette

#### Primary Colors
- **Cyan:** `#00f0ff` / `rgb(0,240,255)`
- **Fuchsia/Pink:** `#ff00ff` / `rgb(255,0,255)`
- **Purple:** `#a855f7` / `rgb(168,85,247)`

#### Supporting Colors
- **White:** `#ffffff` for primary text
- **Gray-300:** For secondary/body text
- **Gray-400:** For tertiary text
- **Gray-500:** For muted/metadata text
- **Emerald-400:** For success/live indicators

---

## 🌟 Glow & Shadow Effects

### Text Shadows (Headers)
```css
textShadow: '0 0 40px rgba(0,240,255,0.2), 0 0 60px rgba(255,0,255,0.15)'
```

### Text Shadows (Subheaders/Accented Text)
```css
textShadow: '0 0 20px rgba(0,240,255,0.2)'
textShadow: '0 0 15px rgba(0,240,255,0.3)'
textShadow: '0 0 30px rgba(0,240,255,0.15)'
```

### Box Shadows (Cards - Cyan)
```css
boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,240,255,0.15), 0 0 20px rgba(0,240,255,0.05)'
```

### Box Shadows (Cards - Fuchsia)
```css
boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,0,255,0.15), 0 0 20px rgba(255,0,255,0.05)'
```

### Box Shadows (Cards - Purple)
```css
boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(168,85,247,0.15), 0 0 20px rgba(168,85,247,0.05)'
```

### Box Shadows (Large Cards)
```css
boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(0,240,255,0.15), 0 0 30px rgba(0,240,255,0.05)'
```

### Box Shadows (Buttons)
```css
boxShadow: '0 2px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,240,255,0.1)'
```

### Glow Orb Shadows
```css
boxShadow: '0 0 8px rgba(0,240,255,0.6)' /* Small dot */
boxShadow: '0 0 6px rgba(0,240,255,0.8)' /* Tiny pulsing dot */
```

---

## 📐 Typography

### Hero Title (H1)
- **Size:** `text-5xl sm:text-7xl md:text-8xl lg:text-9xl`
- **Weight:** `font-black`
- **Tracking:** `-0.02em` (letterSpacing)
- **Color:** `text-white`
- **Shadow:** `0 0 40px rgba(0,240,255,0.2), 0 0 60px rgba(255,0,255,0.15)`
- **Line Height:** Default/tight

### Subtitle/Tagline (H2 under hero)
- **Size:** `text-lg sm:text-xl md:text-2xl`
- **Weight:** `font-semibold`
- **Tracking:** `tracking-wide`
- **Gradient:** 
  ```css
  background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
  ```
- **Shadow:** `0 0 20px rgba(0,240,255,0.2)`

### Section Headers (H2)
- **Size:** `text-4xl sm:text-5xl md:text-6xl`
- **Weight:** `font-black`
- **Color:** `text-white`
- **Tracking:** `tracking-tight`
- **Leading:** `leading-tight`
- **Shadow:** `0 0 30px rgba(0,240,255,0.15)`

### Card Titles (H3)
- **Size:** `text-2xl sm:text-3xl md:text-4xl`
- **Weight:** `font-black`
- **Color:** `text-white` with hover state to accent color
- **Shadow:** `0 0 20px rgba(0,240,255,0.2)`
- **Transition:** `transition-colors`

### Body Text (Paragraphs)
- **Size:** `text-sm sm:text-base md:text-lg` (hero/intro)
- **Size:** `text-xs sm:text-sm md:text-base` (card descriptions)
- **Color:** `text-gray-300`
- **Leading:** `leading-relaxed`
- **Weight:** `font-light` (for hero), default for cards

### List Items
- **Size:** `text-[11px] sm:text-xs md:text-sm`
- **Color:** `text-gray-400`

### Small Caps/Labels (System Text)
- **Size:** `text-[10px]` or `text-[9px] sm:text-[10px]`
- **Weight:** `font-black` or `font-bold`
- **Transform:** `uppercase`
- **Tracking:** `tracking-[0.2em]` or `tracking-[0.3em]`
- **Gradient (when accented):**
  ```css
  background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
  ```

### Numeric Data Display
- **Size:** `text-xl sm:text-3xl md:text-4xl` (stats cards)
- **Weight:** `font-black`
- **Color:** `text-white` with hover to accent
- **Variant:** `fontVariantNumeric: 'tabular-nums'`
- **Leading:** `leading-none`
- **Display:** `block`
- **Shadow:** `0 0 15px rgba(0,240,255,0.3)`

---

## 🎴 Card Components

### Stat Cards (Small - 3 across)
**Structure:**
```jsx
<article className="group relative isolate">
  {/* Outer glow */}
  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-cyan-600/15 to-cyan-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300" />
  
  {/* Card */}
  <div className="relative backdrop-blur-xl bg-black/40 p-3 sm:p-5 rounded-2xl border border-cyan-400/40 group-hover:border-cyan-300/60 transition-all"
    style={{
      boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,240,255,0.15), 0 0 20px rgba(0,240,255,0.05)'
    }}
  >
    {/* Pulsing indicator */}
    <div className="absolute top-2 left-2">
      <div className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" style={{
          boxShadow: '0 0 6px rgba(0,240,255,0.8)'
        }} />
      </div>
    </div>
    
    {/* Content */}
    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400/80 mb-2">LABEL</div>
    <data className="text-3xl font-black text-white">123</data>
    <div className="text-xs font-semibold text-cyan-400/80">SUBLABEL</div>
    
    {/* Bottom border accent */}
    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
  </div>
</article>
```

**Key Properties:**
- Background: `backdrop-blur-xl bg-black/40`
- Padding: `p-3 sm:p-5`
- Border: `border border-cyan-400/40` (adjust color per theme)
- Hover: `group-hover:border-cyan-300/60`
- Rounded: `rounded-2xl`

### Large Feature Cards (Path Selection)
**Structure:**
```jsx
<article className="group relative cursor-pointer isolate">
  {/* Outer glow - larger blur */}
  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 via-cyan-600/20 to-cyan-500/30 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />
  
  {/* Card */}
  <div className="relative backdrop-blur-2xl bg-black/50 p-6 sm:p-8 rounded-[3rem] min-h-[420px] sm:min-h-[460px] flex flex-col border border-cyan-400/30 group-hover:border-cyan-300/50 transition-all duration-500"
    style={{
      boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(0,240,255,0.15), 0 0 30px rgba(0,240,255,0.05)'
    }}
  >
    {/* Top right glow orb */}
    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full" style={{
      background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
      filter: 'blur(40px)'
    }} />
    
    {/* Badge */}
    <div className="inline-flex px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10 mb-6" style={{
      boxShadow: '0 0 12px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
    }}>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">LABEL</span>
    </div>
    
    {/* Content... */}
  </div>
</article>
```

**Key Properties:**
- Background: `backdrop-blur-2xl bg-black/50`
- Padding: `p-6 sm:p-8`
- Border: `border border-cyan-400/30` (adjust per theme)
- Rounded: `rounded-[3rem]`
- Min Height: `min-h-[420px] sm:min-h-[460px]`
- Layout: `flex flex-col`

---

## 🔘 Buttons & CTAs

### Primary Button (in cards)
```jsx
<button 
  className="relative w-full mt-auto py-3 sm:py-4 rounded-xl border border-cyan-400/40 bg-black/40 group/btn font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all hover:border-cyan-300/60"
  style={{
    boxShadow: '0 2px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,240,255,0.1)'
  }}
>
  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
  <span className="relative z-10 text-white flex items-center justify-center gap-2">
    BUTTON_TEXT
    <span className="text-cyan-400">→</span>
  </span>
  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
</button>
```

**Key Properties:**
- Width: `w-full`
- Padding: `py-3 sm:py-4`
- Border: `border border-cyan-400/40`
- Background: `bg-black/40`
- Text: `font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]`
- Rounded: `rounded-xl`

### Scroll/Action Prompts
```jsx
<button className="text-xs sm:text-sm text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group">
  <span>Start Here</span>
  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform">
    {/* Arrow icon */}
  </svg>
</button>
```

---

## 🏷️ Badges & Status Chips

### System Status Badge ("SYSTEM ONLINE")
```jsx
<div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full relative group"
  style={{
    background: 'linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(255,0,255,0.05) 100%)',
    border: '1px solid rgba(0,240,255,0.3)',
    boxShadow: '0 0 15px rgba(0,240,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
  }}
>
  {/* Pulsing indicator */}
  <div className="relative flex items-center justify-center w-3 h-3">
    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" style={{
      boxShadow: '0 0 8px rgba(0,240,255,0.6), 0 0 12px rgba(0,240,255,0.3)'
    }} />
  </div>
  <span className="text-xs font-bold text-cyan-300 tracking-[0.2em] uppercase">SYSTEM ONLINE</span>
  
  {/* Shimmer effect */}
  <div className="absolute inset-0 rounded-full overflow-hidden">
    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
  </div>
</div>
```

### Stat Chips ("15K+ Recruiters")
```jsx
<div className="group relative isolate">
  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-full blur opacity-30 group-hover:opacity-50 transition" />
  <div className="relative backdrop-blur-lg bg-black/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-400/30 group-hover:border-emerald-300/50 transition-all"
    style={{
      boxShadow: '0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
    }}
  >
    <span className="text-[10px] font-bold text-emerald-300 tracking-[0.15em] uppercase flex items-center gap-2">
      <span className="animate-pulse">●</span>
      15K+ Recruiters
    </span>
  </div>
</div>
```

### Card/Section Badge
```jsx
<div className="inline-flex px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10 mb-6"
  style={{
    boxShadow: '0 0 12px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
  }}
>
  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">LABEL</span>
</div>
```

---

## 🎭 Decorative Elements

### Horizontal Divider
```jsx
<div className="relative w-36 h-[3px] mx-auto mb-8">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-sm" />
</div>
```

### Divider with End Dots
```jsx
<div className="relative w-40 h-[3px] mx-auto mb-8">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 animate-pulse-slow" style={{
    filter: 'blur(4px)'
  }} />
  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400" style={{
    boxShadow: '0 0 8px rgba(0,240,255,0.6)'
  }} />
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-400" style={{
    boxShadow: '0 0 8px rgba(255,0,255,0.6)'
  }} />
</div>
```

### Bottom Border Accent (in cards)
```jsx
<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
```

### Floating Orbs (Background)
```jsx
<div className="absolute inset-0 pointer-events-none z-0">
  <motion.div 
    style={{ 
      y: y1, /* motion value from useTransform */
      background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.05) 40%, transparent 70%)',
      filter: 'blur(60px)'
    }}
    className="absolute top-[-15%] left-[5%] w-[50%] h-[50%] rounded-full animate-float"
  />
  <motion.div 
    style={{ 
      y: y2,
      background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, rgba(255,0,255,0.05) 40%, transparent 70%)',
      filter: 'blur(60px)'
    }}
    className="absolute bottom-[-15%] right-[5%] w-[50%] h-[50%] rounded-full animate-float-delayed"
  />
</div>
```

### Scanning Line Effect
```jsx
<div className="absolute inset-0 opacity-10">
  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
</div>
```

---

## 🎬 Animations

### Keyframes (add to style tag)
```css
@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}
@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-scan { animation: scan 4s linear infinite; }
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 2s; }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
```

### Framer Motion - Initial State
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
```

### Framer Motion - Scroll Reveal
```jsx
initial={{ opacity: 0, y: -10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
```

### Framer Motion - Hover (Cards)
```jsx
whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
style={{ transformStyle: 'preserve-3d' }}
```

---

## 📏 Spacing & Layout

### Section Spacing
- **Vertical Padding:** `py-20` or `pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20`
- **Horizontal Padding:** `px-4 sm:px-6`
- **Max Width Container:** `max-w-5xl` or `max-w-6xl mx-auto`

### Grid Layouts
- **2-Column:** `grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8`
- **3-Column Stats:** `grid grid-cols-3 gap-3 sm:gap-4`

### Card Gaps
- Small cards: `gap-3 sm:gap-4`
- Large cards: `gap-6 sm:gap-8`

---

## 🔗 Borders & Outlines

### Standard Card Border
- Cyan: `border border-cyan-400/40`
- Fuchsia: `border border-fuchsia-400/40`
- Purple: `border border-purple-400/40`

### Hover States
- Cyan: `group-hover:border-cyan-300/60`
- Fuchsia: `group-hover:border-fuchsia-300/60`
- Purple: `group-hover:border-purple-300/60`

---

## ♿ Accessibility

### Screen Reader Only Class
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### ARIA Labels
- Use `aria-label` on interactive elements
- Use `aria-hidden="true"` on decorative elements
- Use `aria-live="polite"` for status updates
- Use `role="region"` and `aria-labelledby` for sections

---

## 📱 Responsive Breakpoints

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px

### Common Responsive Patterns
- Text: `text-base sm:text-lg md:text-xl`
- Padding: `p-4 sm:p-6 md:p-8`
- Gap: `gap-4 sm:gap-6 md:gap-8`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 🎯 Summary Checklist

When creating/updating pages, ensure:

- [ ] Background is `bg-[#0a0a0f]`
- [ ] Lexend font is applied to main wrapper
- [ ] Headers use proper text shadows and gradients
- [ ] Cards have backdrop blur + glow layers
- [ ] Buttons include hover shimmer effects
- [ ] Color scheme uses cyan/fuchsia/purple consistently
- [ ] Pulsing indicators on live/active elements
- [ ] Bottom border accents on cards
- [ ] Proper responsive sizing (sm:, md:, lg:)
- [ ] Framer Motion animations for reveals
- [ ] ARIA labels for accessibility
- [ ] Uppercase tracking for labels ([0.2em])
- [ ] Tabular nums for numeric displays

---

**End of Style Guide**