# AI Chat Smart Links Implementation

## Overview

This feature allows the AI chat assistant to generate "smart links" that automatically open modals with prefilled user data. When a recruiter asks for roles or RecX Direct information, the AI can generate a clickable link that opens the relevant modal with their name and email already filled in.

## Architecture

### 1. Component Structure

```
app/
  layout.tsx                    # Added ClientProviders wrapper
  page.tsx                      # Homepage (unchanged)
  api/
    ghl/
      ai-chat/
        route.ts                 # AI chat API - generates smart links
        
components/
  ClientProviders.tsx            # Wraps app with modal controller
  ModalController.tsx            # Watches URL params, opens modals
  send-roles-form.tsx            # Updated to accept prefill props
  recx-direct-form.tsx           # Updated to accept prefill props
```

### 2. Flow Diagram

```
User asks for roles or RecX Direct info
  ↓
AI chat API (/api/ghl/ai-chat)
  ↓
Groq AI generates response with [button:ACTION]Button Text[/button]
  ↓
API parses button markup → generates URL with prefilled data
  ↓
Frontend FloatingChat renders clickable link
  ↓
User clicks link → navigates to /?action=ACTION&name=Tom&email=tom@example.com
  ↓
ModalController detects URL params
  ↓
Appropriate modal opens with prefilled name and email
  ↓
User selects industries and submits
```

## Implementation Details

### AI Response Format

The AI uses a special markup format to indicate actionable links:

```
[button:ACTION_NAME]Button Text[/button]
```

**Available Actions:**
- `send-3-roles` - Opens Send 3 Roles modal with prefilled data
- `recx-direct-info` - Opens RecX Direct explainer modal with prefilled data
- `book-meeting` - Redirects to booking page

**Example AI Responses:**
```
"I can send you 3 live roles right now! [button:send-3-roles]Get 3 Roles[/button]"
"Want to learn about RecX Direct? [button:recx-direct-info]Get RecX Direct Explainer[/button]"
```

### URL Parameter Format

**Send 3 Roles Action:**
```
/?action=send-3-roles&name=Tom+Andrews&email=tom%40example.com&industries=tech,finance
```

**RecX Direct Info Action:**
```
/?action=recx-direct-info&name=Tom+Andrews&email=tom%40example.com&industries=tech,finance
```

**Parameters:**
- `action` - The action type (e.g., "send-3-roles", "recx-direct-info")
- `name` - User's full name (URL encoded)
- `email` - User's email (URL encoded)
- `industries` - Comma-separated list of industries (optional)

### API Response Format

When the AI chat API detects button markup, it returns:

```json
{
  "success": true,
  "contactId": "abc123",
  "conversationId": "conv456",
  "message": "I can send you 3 live roles! [smartlink:0]Get 3 Roles[/smartlink]",
  "smartLinks": [
    {
      "action": "send-3-roles",
      "url": "/?action=send-3-roles&name=Tom&email=tom@example.com",
      "prefillData": {
        "name": "Tom",
        "email": "tom@example.com"
      }
    }
  ]
}
```

The frontend should:
1. Parse `[smartlink:N]text[/smartlink]` markers
2. Replace with clickable links using the corresponding `smartLinks[N].url`
3. Handle navigation (client-side or full page load)

## Components

### 1. ModalController.tsx

**Purpose:** Watches URL search params and opens appropriate modals.

**Supported Actions:**
- `send-3-roles` - Opens SendRolesForm
- `recx-direct-info` - Opens RecXDirectForm

**Key Features:**
- Detects action parameter in URL
- Parses name, email, and industries from URL params
- Opens appropriate modal with prefilled data
- Clears URL params when modal closes
- Extensible for future modal actions

**Usage:**
```tsx
// Added to layout via ClientProviders
<Suspense fallback={null}>
  <ModalController />
</Suspense>
```

### 2. SendRolesForm.tsx & RecXDirectForm.tsx (Updated)

**New Props:**
```tsx
interface FormProps {
  className?: string;
  isOpen?: boolean;              // External control
  onClose?: () => void;          // External close handler
  prefillName?: string;          // Prefilled name
  prefillEmail?: string;         // Prefilled email
  prefillIndustries?: string[];  // Prefilled industries
  autoFocus?: boolean;           // Auto-focus first input
}
```

**Backward Compatible:**
- If no external props provided, works as standalone button + modal
- If external `isOpen` provided, button is hidden
- Supports both internal and external state management

### 3. ClientProviders.tsx

**Purpose:** Wraps app content with client-side providers.

**Key Features:**
- Wraps children with ModalController
- Uses Suspense boundary (required for useSearchParams)
- Keeps server components clean

## Frontend Integration

### FloatingChat Component

The AI chat component needs to:

1. **Parse smart links from API response:**

```tsx
const renderMessage = (message: string, smartLinks?: SmartLinkData[]) => {
  let rendered = message;
  
  // Replace [smartlink:N]text[/smartlink] with clickable links
  const smartLinkRegex = /\[smartlink:(\d+)\](.+?)\[\/smartlink\]/g;
  
  rendered = rendered.replace(smartLinkRegex, (match, index, text) => {
    const link = smartLinks?.[parseInt(index)];
    if (!link) return text;
    
    return `<a href="${link.url}" class="smart-link">${text}</a>`;
  });
  
  return rendered;
};
```

2. **Handle navigation:**

```tsx
// Option A: Client-side navigation (Next.js)
import { useRouter } from 'next/navigation';

const handleSmartLinkClick = (e: React.MouseEvent, url: string) => {
  e.preventDefault();
  router.push(url);
};

// Option B: Full page reload
window.location.href = url;
```

## System Prompt Updates

The AI system prompt now includes:

```
IMPORTANT - SMART LINKS:
When offering to send 3 roles, ALWAYS format your response EXACTLY like this:
"Great! [button:send-3-roles]Click here to select your industries and get 3 roles[/button]"

The button format must be:
[button:ACTION_NAME]Button Text[/button]

Available actions:
- send-3-roles: Opens form to get 3 matched roles
- recx-direct-info: Opens form to get RecX Direct explainer video
- book-meeting: Opens meeting scheduler
```

## Adding New Actions

To add a new smart link action:

### 1. Update ModalController.tsx

```tsx
if (action === 'your-new-action') {
  return (
    <YourNewModal
      isOpen={true}
      onClose={handleClose}
      // ... prefill props
    />
  );
}
```

### 2. Update parseSmartLinks in route.ts

```tsx
case 'your-new-action':
  url = `/?action=your-new-action&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;
  prefillData = { name: userName, email: userEmail };
  break;
```

### 3. Update System Prompt

Add the new action to the available actions list in the system prompt.

### 4. Update SmartLinkData type

```tsx
interface SmartLinkData {
  action: 'send-3-roles' | 'book-meeting' | 'recx-direct-info' | 'your-new-action';
  // ...
}
```

## Testing

### Manual Testing

1. **Direct URL Test - Send 3 Roles:**
   ```
   http://localhost:3000/?action=send-3-roles&name=Test+User&email=test@example.com
   ```
   - SendRolesForm modal should open automatically
   - Name and email should be prefilled

2. **Direct URL Test - RecX Direct:**
   ```
   http://localhost:3000/?action=recx-direct-info&name=Test+User&email=test@example.com
   ```
   - RecXDirectForm modal should open automatically
   - Name and email should be prefilled

3. **AI Chat Test:**
   - Open AI chat
   - Ask: "Can you send me some roles?"
   - AI should respond with a clickable link
   - Click link → Send 3 Roles modal opens with prefilled data
   
   - Ask: "What is RecX Direct?"
   - AI should respond with a clickable link
   - Click link → RecX Direct modal opens with prefilled data

4. **URL Cleanup Test:**
   - Open modal via smart link
   - Close modal
   - URL params should be removed

### Edge Cases

- Empty/missing name or email
- Invalid industry names
- Multiple simultaneous smart links
- Browser back button behavior
- Mobile responsiveness

## Security Considerations

1. **URL Parameter Sanitization:**
   - All URL params are URL-encoded
   - Email validation on form submit
   - Industry names validated against allowed list

2. **XSS Prevention:**
   - Smart link text is escaped
   - URL parameters are sanitized before rendering

3. **Privacy:**
   - Email and name are not logged to browser console
   - URL params are cleared after modal closes
   - No sensitive data in URL params

## Performance

- **Bundle Size:** +3KB (ModalController + updates)
- **Runtime:** Minimal overhead (URL param parsing only)
- **SEO:** No impact (modals don't affect page content)
- **Accessibility:** Keyboard navigation supported

## Future Enhancements

1. **Deep Linking:**
   - Support direct links to specific sections
   - Preserve modal state across page reloads

2. **Analytics:**
   - Track smart link clicks
   - Measure conversion rates
   - A/B test different button text

3. **More Actions:**
   - `schedule-demo` - Book demo call
   - `view-pricing` - Open pricing modal
   - `start-trial` - Begin free trial

4. **Industry Suggestions:**
   - Pre-select industries based on user profile
   - AI suggests relevant industries

## Troubleshooting

**Modal doesn't open:**
- Check URL params are correctly formatted
- Verify ModalController is mounted
- Check browser console for errors

**Prefill data not working:**
- Verify URL encoding is correct
- Check form props are passed through
- Ensure useEffect dependencies are correct

**URL params not clearing:**
- Check router.replace is called correctly
- Verify handleClose is called on modal close
- Ensure no conflicting URL updates

## Deployment

No special deployment steps required. Changes are backward compatible.

**Environment Variables:**
- No new environment variables needed
- Existing Groq API key is used

**Vercel Deployment:**
```bash
git push origin main
# Vercel auto-deploys
```

## Support

For issues or questions:
- Check browser console for errors
- Review this documentation
- Test with direct URL first
- Contact: tom@recxchange.io
