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
   - Uses ModalWrapper with `maxWidth="2xl"`
   - Fully responsive with industry selection
   - Prevents close during form submission
   - **Commit**: [0a7244b](https://github.com/TomAndrewsRecGroup/RecXchange/commit/0a7244b4e84afb5bdf454c66c0709ea015642957)

2. **Learn About RecX Direct** (`components/recx-direct-form.tsx`)
   - Uses ModalWrapper with `maxWidth="2xl"`
   - Fully responsive with industry selection
   - Fuchsia-themed button styling
   - **Commit**: [8973c9b](https://github.com/TomAndrewsRecGroup/RecXchange/commit/8973c9bcb608eee754a2780ae11bf0d5fe734f9d)

3. **How Does It Work** (`app/hiring-manager-home/page.tsx`)
   - Uses ModalWrapper with `maxWidth="lg"`
   - Fully responsive contact form
   - Video explainer request functionality
   - **Commit**: [18794a1](https://github.com/TomAndrewsRecGroup/RecXchange/commit/18794a17d3bdd12fc0f957a71154f30befe8eedb)

### ℹ️ Not Migrated (By Design)

4. **Contact Us Live Chat** (`components/FloatingChat.tsx`)
   - This is a floating chat widget, NOT a modal
   - Has unique positioning and multi-stage behavior
   - **Status**: Intentionally not migrated - keep existing design

5. **Quick Action Forms** (`components/quick-action-form.tsx`)
   - These are inline forms embedded in page content
   - Not modal-based components
   - **Status**: No migration needed - they're not modals

## Implementation Summary

### What Changed

All modal components now:
- Use the `ModalWrapper` component for consistent structure
- Have responsive padding, text sizes, and spacing
- Lock body scroll when open
- Support backdrop click to close (unless prevented)
- Show gradient headers with consistent styling
- Prevent closing during form submission
- Work seamlessly across mobile, tablet, and desktop

### Files Modified

| File | Lines Changed | Purpose |
|------|---------------|----------|
| `components/ModalWrapper.tsx` | +108 (new) | Reusable modal wrapper component |
| `components/send-roles-form.tsx` | ~250 | Migrated to use ModalWrapper |
| `components/recx-direct-form.tsx` | ~250 | Migrated to use ModalWrapper |
| `app/hiring-manager-home/page.tsx` | ~680 | Migrated How Does It Work modal |

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

All modals have been tested and verified:

### Mobile (< 640px)
- ✅ Modal fills screen with proper padding
- ✅ Text is readable
- ✅ Buttons are tappable (min 44px height)
- ✅ Forms are scrollable if content overflows
- ✅ Close button is accessible

### Tablet (640px - 768px)
- ✅ Modal is centered with breathing room
- ✅ Font sizes increase appropriately
- ✅ Layout adjusts for wider viewport

### Desktop (> 768px)
- ✅ Modal reaches max-width and centers
- ✅ All spacing is comfortable
- ✅ Hover states work correctly

### All Devices
- ✅ Body scroll is locked when open
- ✅ Modal doesn't overlap header
- ✅ Modal doesn't overlap footer
- ✅ Backdrop click closes modal (if not prevented)
- ✅ X button closes modal (if not prevented)
- ✅ Form submission prevents close
- ✅ Success states display correctly

## Usage Examples

### Simple Modal
```typescript
import ModalWrapper from '@/components/ModalWrapper';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Simple Modal"
      subtitle="This is a basic example"
      maxWidth="md"
    >
      <p className="text-sm text-gray-400">Content goes here</p>
    </ModalWrapper>
  );
}
```

### Form Modal with Validation
```typescript
import ModalWrapper from '@/components/ModalWrapper';

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit logic
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  return (
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
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 sm:py-4 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </ModalWrapper>
  );
}
```

### Modal with Success State
```typescript
import ModalWrapper from '@/components/ModalWrapper';

function SuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Action Complete"
      maxWidth="md"
    >
      {success ? (
        <div className="py-12 sm:py-16 md:py-20 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Success!</h3>
          <p className="text-gray-400 text-xs sm:text-sm">Your action was completed.</p>
        </div>
      ) : (
        <div>Form content here</div>
      )}
    </ModalWrapper>
  );
}
```

## Best Practices

### Responsive Form Inputs
Always use responsive sizing for form elements:
```tsx
<input
  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm"
  // Mobile: px-3 py-2.5
  // Tablet+: px-4 py-3
/>
```

### Responsive Buttons
Use responsive padding and text:
```tsx
<button
  className="py-3 sm:py-4 text-xs sm:text-sm rounded-xl sm:rounded-2xl"
  // Mobile: py-3, text-xs, rounded-xl
  // Tablet+: py-4, text-sm, rounded-2xl
>
  Button Text
</button>
```

### Loading States
Always disable close during submission:
```tsx
<ModalWrapper
  preventClose={isSubmitting}
  // ...
/>
```

### Success States
Show clear visual feedback:
```tsx
{success ? (
  <div className="py-12 sm:py-16 md:py-20 text-center">
    {/* Success content */}
  </div>
) : (
  <form>{/* Form content */}</form>
)}
```

## Maintenance Notes

- The header offset is set to 64px. If the header height changes, update the `top` style in `ModalWrapper.tsx`
- All form inputs should follow the same responsive padding pattern for consistency
- Success/error messages should use Framer Motion animations
- The gradient colors (`#00ffff` to `#c71df1`) should remain consistent across all modals

## Future Enhancements

Potential improvements for future iterations:
- Add keyboard navigation (Tab, Escape already supported)
- Add ARIA labels for better accessibility
- Support for multi-step forms within modals
- Optional footer section in ModalWrapper
- Animation variants (slide-up, fade, etc.)

## Related Files

- `components/ModalWrapper.tsx` - Main modal component
- `components/send-roles-form.tsx` - Send 3 Roles modal
- `components/recx-direct-form.tsx` - RecX Direct explainer modal
- `app/hiring-manager-home/page.tsx` - How Does It Work modal
- `components/FloatingChat.tsx` - Chat widget (not a modal)
- `components/quick-action-form.tsx` - Inline forms (not modals)
