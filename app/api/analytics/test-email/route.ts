import { NextRequest, NextResponse } from 'next/server';
import { FunnelMetrics } from '@/lib/funnel';
import { GHLConversionData } from '@/lib/ghl-client';

/**
 * GET /api/analytics/test-email
 * 
 * Sends a test funnel email with dummy data
 */
export async function GET(request: NextRequest) {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const EMAIL_TO = process.env.FUNNEL_EMAIL_TO || 'tom@andrewsrecruitmentgroup.com';
    const EMAIL_FROM = process.env.SENDGRID_FROM_EMAIL || 'analytics@recxchange.com';

    if (!SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: 'SendGrid API key not configured' },
        { status: 500 }
      );
    }

    // Create dummy GHL conversion data
    const ghlData: GHLConversionData = {
      totalContacts: 89,
      websiteSignups: 42,
      tieredSignups: [
        { tier: 'os subs entry', count: 8, contacts: [] },
        { tier: 'os subs lite', count: 12, contacts: [] },
        { tier: 'os subs pro', count: 7, contacts: [] },
        { tier: 'os subs teams', count: 4, contacts: [] }
      ],
      period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      }
    };

    // Create dummy recruiter funnel data (continued from previous file...)
    // [keeping all existing code from lines 25-368 of the original file]

const recruiterMetrics: FunnelMetrics = {
      funnel: 'Recruiter Signup Funnel',
      description: 'Tracks recruiters from first visit to active platform usage',
      period: ghlData.period,
      totalUsers: 247,
      conversionRate: 12.5,
      insights: {
        biggestDropOff: {
          stage: 'Completing signup form',
          percentage: 41.6
        },
        topConversionTriggers: [
          'Fake Engine Demo',
          'Calculator Result',
          'Hero CTA'
        ]
      },
      stages: [
        { stage: 'arrival', description: 'Arrived on Site', keyQuestions: ['What brought them here?', 'Which page did they land on?', 'What was their referral source?'], count: 247, percentage: 100, dropOff: 0, dropOffPercentage: 0, topEvents: [{ event: 'page_viewed', count: 247 }, { event: 'search_engine_visit', count: 142 }, { event: 'social_media_visit', count: 68 }] },
        { stage: 'discovery', description: 'Explored Platform', keyQuestions: ['What pages did they visit?', 'How deep did they scroll?', 'Which features caught their attention?'], count: 189, percentage: 76.5, dropOff: 58, dropOffPercentage: 23.5, topEvents: [{ event: 'scroll_depth_50', count: 156 }, { event: 'nav_link_clicked', count: 98 }, { event: 'features_section_viewed', count: 87 }] },
        { stage: 'problem_identification', description: 'Researched Questions', keyQuestions: ['What questions did they have?', 'What concerns were they researching?', 'Which FAQs did they open?'], count: 156, percentage: 63.2, dropOff: 33, dropOffPercentage: 17.5, topEvents: [{ event: 'calculator_viewed', count: 112 }, { event: 'faq_item_clicked', count: 67 }, { event: 'pricing_page_viewed', count: 54 }] },
        { stage: 'solution_exploration', description: 'Saw Value Proposition', keyQuestions: ['What convinced them this works?', 'Which proof points resonated?', 'What value did they calculate?'], count: 134, percentage: 54.3, dropOff: 22, dropOffPercentage: 14.1, topEvents: [{ event: 'calculator_completed', count: 98 }, { event: 'fake_engine_result_shown', count: 76 }, { event: 'demo_video_played', count: 43 }] },
        { stage: 'intent', description: 'Clicked to Sign Up', keyQuestions: ['What triggered the signup intent?', 'Which CTA did they click?', 'What was the conversion trigger?'], count: 89, percentage: 36.0, dropOff: 45, dropOffPercentage: 33.6, topEvents: [{ event: 'fake_engine_signup_clicked', count: 52 }, { event: 'calculator_cta_clicked', count: 34 }, { event: 'hero_cta_clicked', count: 23 }] },
        { stage: 'conversion_attempt', description: 'Started Signup Form', keyQuestions: ['Did they complete the form?', 'Where did they get stuck?', 'What errors did they encounter?'], count: 52, percentage: 21.1, dropOff: 37, dropOffPercentage: 41.6, topEvents: [{ event: 'signup_form_started', count: 89 }, { event: 'signup_form_field_completed', count: 67 }, { event: 'form_field_error', count: 23 }] },
        { stage: 'conversion_complete', description: 'Account Created ✓', keyQuestions: ['How long did signup take?', 'Did they complete it in one session?'], count: 42, percentage: 17.0, dropOff: 10, dropOffPercentage: 19.2, topEvents: [{ event: 'signup_completed', count: 42 }, { event: 'account_created', count: 42 }] },
        { stage: 'activation', description: 'Became Active User', keyQuestions: ['Did they complete onboarding?', 'Did they upload a candidate?', 'Are they actively using the platform?'], count: 31, percentage: 12.5, dropOff: 11, dropOffPercentage: 26.2, topEvents: [{ event: 'onboarding_completed', count: 31 }, { event: 'first_candidate_uploaded', count: 18 }, { event: 'first_match_received', count: 12 }] }
      ]
    };

    const hiringManagerMetrics: FunnelMetrics = {
      funnel: 'Hiring Manager Call Booking Funnel',
      description: 'Tracks hiring managers from first visit to booking a 30-minute consultation',
      period: ghlData.period,
      totalUsers: 163,
      conversionRate: 18.4,
      insights: { biggestDropOff: { stage: 'Booking via Calendly', percentage: 38.5 }, topConversionTriggers: ['Book Call CTA', 'Pricing Page', 'Demo Video'] },
      stages: [
        { stage: 'arrival', description: 'Arrived on Site', keyQuestions: ['What brought them here?', 'Which hiring manager page did they land on?', 'What was their referral source?'], count: 163, percentage: 100, dropOff: 0, dropOffPercentage: 0, topEvents: [{ event: 'page_viewed', count: 163 }, { event: 'direct_visit', count: 87 }, { event: 'search_engine_visit', count: 54 }] },
        { stage: 'discovery', description: 'Explored Service', keyQuestions: ['What pages did they visit?', 'How engaged were they?', 'Which sections did they spend time on?'], count: 134, percentage: 82.2, dropOff: 29, dropOffPercentage: 17.8, topEvents: [{ event: 'scroll_depth_75', count: 98 }, { event: 'time_on_page_60s', count: 76 }, { event: 'features_section_viewed', count: 65 }] },
        { stage: 'problem_identification', description: 'Researched Solutions', keyQuestions: ['What concerns did they research?', 'What questions did they have about pricing?', 'Which FAQs did they click?'], count: 112, percentage: 68.7, dropOff: 22, dropOffPercentage: 16.4, topEvents: [{ event: 'pricing_page_viewed', count: 98 }, { event: 'faq_item_clicked', count: 54 }, { event: 'comparison_table_viewed', count: 43 }] },
        { stage: 'solution_exploration', description: 'Understood Benefits', keyQuestions: ['Did they watch the demo?', 'Which benefits resonated?', 'What proof points convinced them?'], count: 87, percentage: 53.4, dropOff: 25, dropOffPercentage: 22.3, topEvents: [{ event: 'demo_video_played', count: 56 }, { event: 'benefits_section_viewed', count: 67 }, { event: 'case_study_viewed', count: 34 }] },
        { stage: 'intent', description: 'Clicked to Book Call', keyQuestions: ['What triggered the booking intent?', 'Which CTA convinced them?', 'What was the final push?'], count: 65, percentage: 39.9, dropOff: 22, dropOffPercentage: 25.3, topEvents: [{ event: 'book_call_cta_clicked', count: 52 }, { event: 'hero_cta_clicked', count: 23 }, { event: 'mid_page_cta_clicked', count: 18 }] },
        { stage: 'conversion_attempt', description: 'Opened Calendly', keyQuestions: ['Did they select a time?', 'Where did they drop off?', 'What prevented completion?'], count: 40, percentage: 24.5, dropOff: 25, dropOffPercentage: 38.5, topEvents: [{ event: 'calendly_widget_opened', count: 65 }, { event: 'calendly_date_selected', count: 48 }, { event: 'calendly_time_selected', count: 40 }] },
        { stage: 'conversion_complete', description: 'Call Booked ✓', keyQuestions: ['How long did booking take?', 'What time/date did they choose?', 'How far in advance did they book?'], count: 35, percentage: 21.5, dropOff: 5, dropOffPercentage: 12.5, topEvents: [{ event: 'call_booking_confirmed', count: 35 }, { event: 'calendar_invite_sent', count: 35 }] },
        { stage: 'activation', description: 'Attended Call & Joined', keyQuestions: ['Did they attend the call?', 'Did they create an account after?', 'Are they active on the platform?'], count: 30, percentage: 18.4, dropOff: 5, dropOffPercentage: 14.3, topEvents: [{ event: 'call_reminder_clicked', count: 30 }, { event: 'account_created', count: 22 }, { event: 'first_role_viewed', count: 18 }] }
      ]
    };

    // Use the same HTML email generator from the production funnel
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px; margin: 0; }
    .container { max-width: 900px; margin: 0 auto; background: #0a0a0a; border-radius: 20px; overflow: hidden; }
    .header { background: #000; padding: 40px; text-align: center; border-bottom: 1px solid #222; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
    .header h1 { margin: 0; color: #fff; font-size: 32px; font-weight: 800; }
    .header p { margin: 12px 0 0 0; color: #888; font-size: 16px; }
    .test-badge { background: linear-gradient(135deg, #ff4444, #ff0066); color: white; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-top: 15px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 40px; }
    .ghl-section { background: #111; border-radius: 16px; padding: 30px; margin-bottom: 40px; border: 2px solid #00ffff; }
    .ghl-section h2 { color: #00ffff; font-size: 24px; margin: 0 0 20px 0; text-align: center; }
    .ghl-summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
    .ghl-stat { background: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 20px; text-align: center; }
    .ghl-stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #666; margin-bottom: 10px; font-weight: 600; }
    .ghl-stat-value { font-size: 42px; font-weight: 900; color: #00ffff; line-height: 1; }
    .tier-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .tier-card { background: linear-gradient(135deg, #0a0a0a, #111); border: 2px solid #222; border-radius: 12px; padding: 20px; }
    .tier-card.has-signups { border-color: #22c55e; }
    .tier-name { font-size: 14px; color: #888; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .tier-count { font-size: 36px; font-weight: 900; background: linear-gradient(135deg, #00ffff, #c71df1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .tier-card.has-signups .tier-count { background: linear-gradient(135deg, #22c55e, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w" alt="RecXchange Logo" class="logo" />
      <h1>Weekly Funnel Report</h1>
      <p>${ghlData.period.start.toLocaleDateString('en-GB')} - ${ghlData.period.end.toLocaleDateString('en-GB')}</p>
      <span class="test-badge">Test Email - Sample Data</span>
    </div>
    <div class="content">
      <div class="ghl-section">
        <h2>💎 Actual Signups (from CRM)</h2>
        <div class="ghl-summary">
          <div class="ghl-stat"><div class="ghl-stat-label">Website Visitors Tagged</div><div class="ghl-stat-value">${ghlData.websiteSignups}</div></div>
          <div class="ghl-stat"><div class="ghl-stat-label">Paid Tier Signups</div><div class="ghl-stat-value">${ghlData.tieredSignups.reduce((sum, t) => sum + t.count, 0)}</div></div>
        </div>
        <div class="tier-grid">
          ${ghlData.tieredSignups.map(tier => `<div class="tier-card ${tier.count > 0 ? 'has-signups' : ''}"><div class="tier-name">${tier.tier}</div><div class="tier-count">${tier.count}</div></div>`).join('')}
        </div>
      </div>
      <p style="color: #888; text-align: center; margin: 40px 0;">Note: Funnels would appear below in production email</p>
    </div>
    <div class="footer" style="text-align: center; padding: 40px; color: #666; font-size: 12px; border-top: 1px solid #222;">
      <p><strong>RecXchange Analytics</strong> • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString('en-GB')}</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send via SendGrid
    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: EMAIL_TO }],
          subject: `💎 [TEST] RecXchange CRM Signup Data - ${new Date().toLocaleDateString()}`
        }],
        from: { email: EMAIL_FROM, name: 'RecXchange Analytics' },
        content: [{ type: 'text/html', value: htmlContent }]
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('[Test Email] SendGrid error:', errorText);
      return NextResponse.json({ error: 'Failed to send email', details: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Test email sent to ${EMAIL_TO}`, ghlData, recruiterMetrics, hiringManagerMetrics });
  } catch (error) {
    console.error('[Test Email] Error:', error);
    return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 });
  }
}
