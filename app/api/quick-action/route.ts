import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  getSecurityHeaders 
} from '@/lib/security';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
  industries?: string[]; // Optional industries for match_candidate
  marketingConsent?: boolean; // GDPR marketing consent
}

// Action configurations remain the same...
const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'Website - QA 3 roles',
    autoResponseSubject: '3 Matching Live Roles For You',
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'How RecXchange Works - Your Complete Guide',
  },
};

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  
  // Rate limiting check
  const rateLimitResult = checkRateLimit(ip, 'form');
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.resetIn 
      },
      { status: 429, headers: getSecurityHeaders() }
    );
  }

  try {
    const body: QuickActionRequest = await request.json();

    // Validate form data - validateFormData throws error if validation fails
    try {
      validateFormData(body);
    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: validationError instanceof Error ? validationError.message : 'Invalid form data' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const { firstName, lastName, email, actionType, source, industries, marketingConsent } = body;

    // Get action configuration
    const config = ACTION_CONFIG[actionType];
    if (!config) {
      return NextResponse.json(
        { success: false, error: 'Invalid action type' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Track analytics event - use correct event name from analytics.ts
    trackEvent('quick_action_form_submitted', {
      form_type: actionType,
      source,
    });

    // TODO: Send to GoHighLevel
    // TODO: Send auto-response email via SendGrid

    console.log('Quick action processed:', {
      email,
      actionType,
      ghlTag: config.ghlTag,
      subject: config.autoResponseSubject,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Request processed successfully. Check your email for details!',
      },
      { status: 200, headers: getSecurityHeaders() }
    );

  } catch (error) {
    console.error('Quick action error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred processing your request. Please try again.' 
      },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: getSecurityHeaders() }
  );
}
