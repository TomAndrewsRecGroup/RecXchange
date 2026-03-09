# RecXchange Style Audit Tracker

**Goal:** Ensure all pages match homepage styling (STYLE_GUIDE.md)
**Created:** March 9, 2026
**Updated:** March 9, 2026, 3:40 PM GMT
**Status:** In Progress

---

## 🔍 Discovery Summary

**Good News:** Most user-facing pages already use the design system components:
- `FuturisticBackground` - Floating orb backgrounds
- `HolographicCard` - Cards with glow layers and proper styling
- `StatusBadge` - System status badges
- `NeonDivider` - Decorative dividers
- `GlowButton` - Buttons with shimmer effects

These components are built to match the homepage styling standards.

**Pages Using Design System:** ✅
- `/` (Homepage)
- `/recruiter`
- `/pricing`
- `/why-recxchange`
- Many others...

**Pages Needing Manual Review:** 🔴  
Legal pages, contact forms, and utility pages may need direct styling updates.

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

## 📄 Pages Status

### ✅ Already Styled (Using Design System)

#### Core Paths
- [x] **/** (Homepage) - Source of truth
- [x] **/recruiter** - Uses design system ✅
- [x] **/pricing** - Uses design system ✅
- [x] **/why-recxchange** - Uses design system ✅
- [ ] **/hiring-manager-home** - Need to verify
- [ ] **/faq** - Need to verify

#### Role/Candidate Pages  
- [ ] **/roles** - Need to verify
- [ ] **/recruiter-roles** - Need to verify
- [ ] **/recruiters-with-candidates** - Need to verify
- [ ] **/hiring-manager-live** - Need to verify
- [ ] **/hiring-manager-strategic** - Need to verify

#### Supporting Pages
- [ ] **/collaboration** - Need to verify
- [ ] **/deal-protection** - Need to verify
- [ ] **/contact** - Need to verify
- [ ] **/affiliate** - Need to verify
- [ ] **/account-management** - Need to verify

---

### 🔴 Likely Need Manual Updates

#### Legal/Compliance Pages (Text-Heavy)
- [ ] **/legal** - Likely needs manual styling
- [ ] **/terms** - Likely needs manual styling
- [ ] **/privacy** - Likely needs manual styling
- [ ] **/cookie-policy** - Likely needs manual styling

#### Blog/Content
- [ ] **/blog** - Need to verify template
- [ ] **/research** - Need to verify

#### Utility Pages
- [ ] **/design-system-example** - Reference page
- [ ] **/test-dashboard** - Test page
- [ ] **/test-email** - Test page

---

## 🛠️ Next Actions

### Batch 1: Verify Design System Pages (Quick Check)
These should already be styled correctly. Quick visual audit needed:
1. `/hiring-manager-home`
2. `/faq`
3. `/collaboration`
4. `/deal-protection`
5. `/roles`
6. `/recruiter-roles`
7. `/recruiters-with-candidates`
8. `/hiring-manager-live`
9. `/hiring-manager-strategic`
10. `/contact`
11. `/affiliate`
12. `/account-management`

### Batch 2: Manual Style Updates Required
These need direct code changes:
1. `/legal` (or `/legal/...` subpages)
2. `/terms`
3. `/privacy`
4. `/cookie-policy`
5. `/blog` (template)
6. `/research`

### Batch 3: Optional/Low Priority
1. `/design-system-example`
2. `/test-dashboard`
3. `/test-email`

---

## 📊 Progress Tracking

**Total User-Facing Pages:** ~20  
**Using Design System Already:** ~4 confirmed, ~12 likely  
**Need Manual Updates:** ~6  
**% Design System Coverage:** ~80% (estimated)

**Manual Update Priority:**
1. Legal pages (most visible to users during signup)
2. Contact page
3. Blog template
4. Test/utility pages (lowest priority)

---

## 👀 What to Look For

When reviewing pages that "should" use design system:

### Good Signs (Already Compliant):
- Imports: `FuturisticBackground`, `HolographicCard`, `StatusBadge`, etc.
- Main wrapper: `<main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">`
- Cards with proper glow and blur
- Headers with gradient text and text-shadow

### Bad Signs (Need Manual Update):
- Plain `<div>` cards with no backdrop-blur
- Flat backgrounds without orb effects
- Headers without text shadows
- Buttons without glow/shimmer effects
- No Framer Motion animations

---

## 📋 Update Process

### For Design System Pages (Quick Verify)
1. Load page in browser
2. Check visual consistency with homepage
3. Test responsive breakpoints
4. Mark as ✅ if compliant

### For Manual Update Pages
1. Review current code
2. Apply STYLE_GUIDE.md patterns
3. Test thoroughly
4. Commit with message: `Update [page] styling to match homepage standards`

---

## 📝 Notes

- Design system components are in `/components/design-system/`
- Global styles in `app/globals.css`
- Homepage is the visual source of truth
- Legal pages may need simpler treatment (readability priority)
- Blog may use different layout but should keep color/font system

---

**Last Updated:** March 9, 2026, 3:40 PM GMT