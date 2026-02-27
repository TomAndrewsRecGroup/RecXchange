# Modal Standardization Guide

## Overview
All modals across the RecXchange platform have been standardized using a reusable `ModalWrapper` component that ensures consistent design, behavior, and responsive sizing across mobile, tablet, and desktop devices.

## ModalWrapper Component

### Location
`components/ModalWrapper.tsx`

### Features
- ✅ **Responsive Design**: Adapts padding, font sizes, and spacing across breakpoints
- ✅ **Scroll Lock**: Prevents body scrolling when modal is open
- ✅ **Header/Footer Respect**: Positioned below header (64px) and above footer
- ✅ **Smooth Animations**: Framer Motion animations for open/close
- ✅ **Backdrop Click**: Closes modal when clicking outside (can be disabled)
- ✅ **Escape Key**: Supports keyboard navigation
- ✅ **Consistent Styling**: Gradient header, dark background, cyan border

### Props
```typescript
interface ModalWrapperProps {
  isOpen: boolean;            // Controls modal visibility
  onClose: () => void;        // Close handler
  title: string;              // Modal title (gradient styled)
  subtitle?: string;          // Optional description below title
  children: ReactNode;        // Modal content
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';  // Max width (default: 'xl')
  preventClose?: boolean;     // Disable closing during form submission
  className?: string;         // Additional custom classes
}
```

### Responsive Breakpoints
- **Mobile**: Base styles, padding: 16px (p-4)
- **Tablet (sm: 640px)**: padding: 24px (p-6), larger text
- **Desktop (md: 768px)**: padding: 32-40px (p-8/p-10), full size

### Max Width Options
- `sm`: 384px (24rem) - Small modals
- `md`: 448px (28rem) - Medium modals
- `lg`: 512px (32rem) - Large modals  
- `xl`: 576px (36rem) - Extra large (default)
- `2xl`: 672px (42rem) - Very large forms

## Migration Status

### ✅ Completed
1. **Send Me 3 Roles** (`components/send-roles-form.tsx`)
   - Uses ModalWrapper
   - Fully responsive
   - Prevents close during form submission

### 🔄 Needs Migration

2. **Learn About RecX Direct** (`components/recx-direct-form.tsx`)
   - Replace custom modal wrapper with ModalWrapper
   - Set `maxWidth="2xl"`
   - Keep form logic, replace UI structure

3. **Contact Us Live Chat** (`components/FloatingChat.tsx`)
   - This is a floating chat widget, NOT a modal
   - Keep existing design as it has unique behavior
   - **DO NOT** migrate to ModalWrapper

4. **How Does It Work** (in `app/hiring-manager-home/page.tsx`)
   - Likely an inline modal or section
   - Migrate to ModalWrapper if it's a popup
   - Investigate structure first

5. **Quick Action Forms** (`components/quick-action-form.tsx`)
   - Multiple forms in one component
   - Migrate each form type to use ModalWrapper
   - Keep shared form state logic

## Implementation Guide

### Step 1: Import ModalWrapper
```typescript
import ModalWrapper from './ModalWrapper';
```

### Step 2: Replace Modal Structure
**Before:**
```typescript
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90">
    <motion.div className="w-full max-w-2xl p-10 rounded-[2.5rem]">
      {/* Header */}
      <button onClick={onClose}><X /></button>
      <h2>Title</h2>
      {/* Content */}
    </motion.div>
  </div>
)}
```

**After:**
```typescript
<ModalWrapper
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
  subtitle="Description"
  maxWidth="2xl"
  preventClose={isSubmitting}
>
  {/* Content only - no header or close button needed */}
</ModalWrapper>
```

### Step 3: Update Content Styles
- Remove padding from content wrapper (ModalWrapper handles it)
- Use responsive text sizes: `text-xs sm:text-sm md:text-base`
- Use responsive spacing: `space-y-4 sm:space-y-6`
- Use responsive padding: `px-3 py-2.5 sm:px-4 sm:py-3`

### Step 4: Update Buttons
- Mobile-first sizing: `py-2.5 sm:py-3 md:py-4`
- Responsive text: `text-xs sm:text-sm`
- Responsive border radius: `rounded-xl sm:rounded-2xl`

## Design Tokens

### Colors
- **Background**: `#0a0a0a`
- **Border**: `rgba(0, 255, 255, 0.2)` (cyan-400/20)
- **Title Gradient**: `linear-gradient(135deg, #00ffff, #c71df1)`
- **Backdrop**: `bg-black/90`

### Spacing
- **Modal Padding (Mobile)**: 24px (p-6)
- **Modal Padding (Tablet)**: 32px (p-8)
- **Modal Padding (Desktop)**: 40px (p-10)
- **Content Gap**: 16-24px (gap-4 sm:gap-6)

### Border Radius
- **Mobile**: 16px (rounded-2xl)
- **Tablet**: 24px (rounded-3xl)
- **Desktop**: 40px (rounded-[2.5rem])

## Testing Checklist

For each migrated modal, test:

### Mobile (< 640px)
- [ ] Modal fills screen with proper padding
- [ ] Text is readable
- [ ] Buttons are tappable (min 44px height)
- [ ] Forms are scrollable if content overflows
- [ ] Close button is accessible

### Tablet (640px - 768px)
- [ ] Modal is centered with breathing room
- [ ] Font sizes increase appropriately
- [ ] Layout adjusts for wider viewport

### Desktop (> 768px)
- [ ] Modal reaches max-width and centers
- [ ] All spacing is comfortable
- [ ] Hover states work correctly

### All Devices
- [ ] Body scroll is locked when open
- [ ] Modal doesn't overlap header
- [ ] Modal doesn't overlap footer
- [ ] Backdrop click closes modal (if not prevented)
- [ ] X button closes modal (if not prevented)
- [ ] Form submission prevents close
- [ ] Success states display correctly

## Examples

### Simple Modal
```typescript
<ModalWrapper
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Simple Modal"
  subtitle="This is a basic example"
  maxWidth="md"
>
  <p className="text-sm text-gray-400">Content goes here</p>
</ModalWrapper>
```

### Form Modal
```typescript
<ModalWrapper
  isOpen={isOpen}
  onClose={handleClose}
  title="Submit Form"
  subtitle="Fill out the form below"
  maxWidth="xl"
  preventClose={isSubmitting}
>
  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
    <input
      type="text"
      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-xl"
      placeholder="Name"
    />
    <button
      type="submit"
      className="w-full py-3 sm:py-4 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
</ModalWrapper>
```

## Notes

- The `FloatingChat` component should **NOT** be migrated as it has unique positioning and behavior
- The header top offset (64px) should be updated if the header height changes
- All form inputs should use the same responsive padding pattern
- Success/error messages should use motion animations from Framer Motion

## Next Steps

1. Migrate RecX Direct form
2. Migrate Quick Action forms
3. Investigate and migrate "How Does It Work" modal
4. Test all modals on real devices
5. Update any remaining custom modals found during testing
