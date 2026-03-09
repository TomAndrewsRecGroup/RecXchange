# RecXchange Style Audit Tracker

**Goal:** Update all pages to match homepage styling (STYLE_GUIDE.md)
**Created:** March 9, 2026
**Status:** In Progress

---

## 🎯 Audit Checklist (Per Page)

For each page, verify:

- [ ] Background: `bg-[#0a0a0f]`
- [ ] Lexend font applied to main/wrapper
- [ ] Headers use proper text shadows (0 0 40px rgba...)
- [ ] Gradient text on subtitles/accents
- [ ] Cards have `backdrop-blur-xl` or `backdrop-blur-2xl`
- [ ] Cards have glow layer (absolute -inset-1 blur-xl)
- [ ] Card borders: `border-cyan-400/40` (or fuchsia/purple)
- [ ] Box shadows match style guide formulas
- [ ] Buttons have shimmer hover effect
- [ ] Pulsing indicators on live elements
- [ ] Bottom border accents on cards
- [ ] Labels: uppercase, tracking-[0.2em], font-black
- [ ] Numeric displays: tabular-nums, font-black
- [ ] Proper responsive sizing (sm:, md:, lg:)
- [ ] Framer Motion animations for reveals
- [ ] ARIA labels for accessibility

---

## 📄 Pages to Update

### ✅ Completed
- [x] **/** (Homepage) - Source of truth

---

### 🔄 High Priority User-Facing Pages

#### Core Paths
- [ ] **/recruiter** - Main recruiter landing page
- [ ] **/hiring-manager-home** - Main hiring manager landing
- [ ] **/pricing** - Pricing tiers
- [ ] **/why-recxchange** - Value proposition
- [ ] **/faq** - FAQ page

#### Role/Candidate Pages
- [ ] **/roles** - Roles marketplace
- [ ] **/recruiter-roles** - Post roles page
- [ ] **/recruiters-with-candidates** - Candidate sharing
- [ ] **/hiring-manager-live** - Live hiring flow
- [ ] **/hiring-manager-strategic** - Strategic hiring

#### Supporting Pages
- [ ] **/collaboration** - Collaboration info
- [ ] **/deal-protection** - Protection features
- [ ] **/contact** - Contact page
- [ ] **/affiliate** - Affiliate program
- [ ] **/account-management** - Account features

---

### 📝 Medium Priority Content Pages

- [ ] **/blog** - Blog listing/posts
- [ ] **/research** - Research content

---

### ⚖️ Legal/Compliance Pages

- [ ] **/legal/terms** - Terms of service
- [ ] **/terms** - Terms (if different)
- [ ] **/privacy** - Privacy policy
- [ ] **/cookie-policy** - Cookie policy

---

### 🧪 Test/Development Pages

- [ ] **/design-system-example** - Design system demo
- [ ] **/test-dashboard** - Test dashboard
- [ ] **/test-email** - Email testing

---

## 📋 Update Process

### Step 1: Pre-Update
1. Pull latest from main
2. Review current page styling
3. Note content elements to preserve
4. Reference STYLE_GUIDE.md

### Step 2: Update
1. Main wrapper: Add `bg-[#0a0a0f]` and font-lexend
2. Headers: Apply text shadows and gradients
3. Cards: Add glow layers, backdrop blur, proper borders
4. Buttons: Add shimmer effects
5. Badges/Labels: Apply uppercase tracking
6. Animations: Add Framer Motion reveals
7. Test responsive breakpoints

### Step 3: Verification
1. Visual inspection on desktop
2. Test mobile breakpoints (sm, md, lg)
3. Verify hover states
4. Check accessibility (ARIA labels)
5. Test animations
6. Compare side-by-side with homepage

### Step 4: Commit
- Commit message format: `Update [page] styling to match homepage standards`
- Reference style guide in commit body

---

## 🎨 Common Patterns to Apply

### Hero Section
```jsx
<section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20">
  {/* Floating orb backgrounds */}
  {/* Status badge */}
  {/* H1 with text-shadow */}
  {/* H2 gradient subtitle */}
  {/* Divider with dots */}
  {/* Body text */}
  {/* Stat cards (3-col grid) */}
  {/* Chip badges */}
</section>
```

### Feature Cards Section
```jsx
<section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
  {/* Section header with divider */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
    {/* Card with glow layer */}
    {/* Badge, H3, description, bullet points */}
    {/* CTA button with shimmer */}
  </div>
</section>
```

---

## 📊 Progress Tracking

**Total Pages:** 25+  
**Completed:** 1 (Homepage)  
**Remaining:** 24+  
**% Complete:** 4%

---

## 🚀 Next Steps

1. Start with **/recruiter** (highest traffic)
2. Move to **/hiring-manager-home**
3. Update **/pricing** and **/why-recxchange**
4. Complete all high-priority user-facing pages
5. Legal/compliance pages
6. Test/dev pages last

---

## 📝 Notes

- Preserve all content/copy - only update styling
- Keep existing component imports
- Maintain functionality/interactivity
- Test after each update
- Some pages may use design-system components that need global updates

---

**Last Updated:** March 9, 2026, 3:31 PM GMT