import { NextRequest, NextResponse } from 'next/server';
import { FunnelMetrics } from '@/lib/funnel';

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

    // Create dummy recruiter funnel data
    const recruiterMetrics: FunnelMetrics = {
      funnel: 'Recruiter Signup Funnel',
      description: 'Tracks recruiters from first visit to active platform usage',
      period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
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
        {
          stage: 'arrival',
          description: 'Arrived on Site',
          keyQuestions: [
            'What brought them here?',
            'Which page did they land on?',
            'What was their referral source?'
          ],
          count: 247,
          percentage: 100,
          dropOff: 0,
          dropOffPercentage: 0,
          topEvents: [
            { event: 'page_viewed', count: 247 },
            { event: 'search_engine_visit', count: 142 },
            { event: 'social_media_visit', count: 68 }
          ]
        },
        {
          stage: 'discovery',
          description: 'Explored Platform',
          keyQuestions: [
            'What pages did they visit?',
            'How deep did they scroll?',
            'Which features caught their attention?'
          ],
          count: 189,
          percentage: 76.5,
          dropOff: 58,
          dropOffPercentage: 23.5,
          topEvents: [
            { event: 'scroll_depth_50', count: 156 },
            { event: 'nav_link_clicked', count: 98 },
            { event: 'features_section_viewed', count: 87 }
          ]
        },
        {
          stage: 'problem_identification',
          description: 'Researched Questions',
          keyQuestions: [
            'What questions did they have?',
            'What concerns were they researching?',
            'Which FAQs did they open?'
          ],
          count: 156,
          percentage: 63.2,
          dropOff: 33,
          dropOffPercentage: 17.5,
          topEvents: [
            { event: 'calculator_viewed', count: 112 },
            { event: 'faq_item_clicked', count: 67 },
            { event: 'pricing_page_viewed', count: 54 }
          ]
        },
        {
          stage: 'solution_exploration',
          description: 'Saw Value Proposition',
          keyQuestions: [
            'What convinced them this works?',
            'Which proof points resonated?',
            'What value did they calculate?'
          ],
          count: 134,
          percentage: 54.3,
          dropOff: 22,
          dropOffPercentage: 14.1,
          topEvents: [
            { event: 'calculator_completed', count: 98 },
            { event: 'fake_engine_result_shown', count: 76 },
            { event: 'demo_video_played', count: 43 }
          ]
        },
        {
          stage: 'intent',
          description: 'Clicked to Sign Up',
          keyQuestions: [
            'What triggered the signup intent?',
            'Which CTA did they click?',
            'What was the conversion trigger?'
          ],
          count: 89,
          percentage: 36.0,
          dropOff: 45,
          dropOffPercentage: 33.6,
          topEvents: [
            { event: 'fake_engine_signup_clicked', count: 52 },
            { event: 'calculator_cta_clicked', count: 34 },
            { event: 'hero_cta_clicked', count: 23 }
          ]
        },
        {
          stage: 'conversion_attempt',
          description: 'Started Signup Form',
          keyQuestions: [
            'Did they complete the form?',
            'Where did they get stuck?',
            'What errors did they encounter?'
          ],
          count: 52,
          percentage: 21.1,
          dropOff: 37,
          dropOffPercentage: 41.6,
          topEvents: [
            { event: 'signup_form_started', count: 89 },
            { event: 'signup_form_field_completed', count: 67 },
            { event: 'form_field_error', count: 23 }
          ]
        },
        {
          stage: 'conversion_complete',
          description: 'Account Created ✓',
          keyQuestions: [
            'How long did signup take?',
            'Did they complete it in one session?'
          ],
          count: 42,
          percentage: 17.0,
          dropOff: 10,
          dropOffPercentage: 19.2,
          topEvents: [
            { event: 'signup_completed', count: 42 },
            { event: 'account_created', count: 42 }
          ]
        },
        {
          stage: 'activation',
          description: 'Became Active User',
          keyQuestions: [
            'Did they complete onboarding?',
            'Did they upload a candidate?',
            'Are they actively using the platform?'
          ],
          count: 31,
          percentage: 12.5,
          dropOff: 11,
          dropOffPercentage: 26.2,
          topEvents: [
            { event: 'onboarding_completed', count: 31 },
            { event: 'first_candidate_uploaded', count: 18 },
            { event: 'first_match_received', count: 12 }
          ]
        }
      ]
    };

    // Create dummy hiring manager funnel data
    const hiringManagerMetrics: FunnelMetrics = {
      funnel: 'Hiring Manager Call Booking Funnel',
      description: 'Tracks hiring managers from first visit to booking a 30-minute consultation',
      period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      totalUsers: 163,
      conversionRate: 18.4,
      insights: {
        biggestDropOff: {
          stage: 'Booking via Calendly',
          percentage: 38.5
        },
        topConversionTriggers: [
          'Book Call CTA',
          'Pricing Page',
          'Demo Video'
        ]
      },
      stages: [
        {
          stage: 'arrival',
          description: 'Arrived on Site',
          keyQuestions: [
            'What brought them here?',
            'Which hiring manager page did they land on?',
            'What was their referral source?'
          ],
          count: 163,
          percentage: 100,
          dropOff: 0,
          dropOffPercentage: 0,
          topEvents: [
            { event: 'page_viewed', count: 163 },
            { event: 'direct_visit', count: 87 },
            { event: 'search_engine_visit', count: 54 }
          ]
        },
        {
          stage: 'discovery',
          description: 'Explored Service',
          keyQuestions: [
            'What pages did they visit?',
            'How engaged were they?',
            'Which sections did they spend time on?'
          ],
          count: 134,
          percentage: 82.2,
          dropOff: 29,
          dropOffPercentage: 17.8,
          topEvents: [
            { event: 'scroll_depth_75', count: 98 },
            { event: 'time_on_page_60s', count: 76 },
            { event: 'features_section_viewed', count: 65 }
          ]
        },
        {
          stage: 'problem_identification',
          description: 'Researched Solutions',
          keyQuestions: [
            'What concerns did they research?',
            'What questions did they have about pricing?',
            'Which FAQs did they click?'
          ],
          count: 112,
          percentage: 68.7,
          dropOff: 22,
          dropOffPercentage: 16.4,
          topEvents: [
            { event: 'pricing_page_viewed', count: 98 },
            { event: 'faq_item_clicked', count: 54 },
            { event: 'comparison_table_viewed', count: 43 }
          ]
        },
        {
          stage: 'solution_exploration',
          description: 'Understood Benefits',
          keyQuestions: [
            'Did they watch the demo?',
            'Which benefits resonated?',
            'What proof points convinced them?'
          ],
          count: 87,
          percentage: 53.4,
          dropOff: 25,
          dropOffPercentage: 22.3,
          topEvents: [
            { event: 'demo_video_played', count: 56 },
            { event: 'benefits_section_viewed', count: 67 },
            { event: 'case_study_viewed', count: 34 }
          ]
        },
        {
          stage: 'intent',
          description: 'Clicked to Book Call',
          keyQuestions: [
            'What triggered the booking intent?',
            'Which CTA convinced them?',
            'What was the final push?'
          ],
          count: 65,
          percentage: 39.9,
          dropOff: 22,
          dropOffPercentage: 25.3,
          topEvents: [
            { event: 'book_call_cta_clicked', count: 52 },
            { event: 'hero_cta_clicked', count: 23 },
            { event: 'mid_page_cta_clicked', count: 18 }
          ]
        },
        {
          stage: 'conversion_attempt',
          description: 'Opened Calendly',
          keyQuestions: [
            'Did they select a time?',
            'Where did they drop off?',
            'What prevented completion?'
          ],
          count: 40,
          percentage: 24.5,
          dropOff: 25,
          dropOffPercentage: 38.5,
          topEvents: [
            { event: 'calendly_widget_opened', count: 65 },
            { event: 'calendly_date_selected', count: 48 },
            { event: 'calendly_time_selected', count: 40 }
          ]
        },
        {
          stage: 'conversion_complete',
          description: 'Call Booked ✓',
          keyQuestions: [
            'How long did booking take?',
            'What time/date did they choose?',
            'How far in advance did they book?'
          ],
          count: 35,
          percentage: 21.5,
          dropOff: 5,
          dropOffPercentage: 12.5,
          topEvents: [
            { event: 'call_booking_confirmed', count: 35 },
            { event: 'calendar_invite_sent', count: 35 }
          ]
        },
        {
          stage: 'activation',
          description: 'Attended Call & Joined',
          keyQuestions: [
            'Did they attend the call?',
            'Did they create an account after?',
            'Are they active on the platform?'
          ],
          count: 30,
          percentage: 18.4,
          dropOff: 5,
          dropOffPercentage: 14.3,
          topEvents: [
            { event: 'call_reminder_clicked', count: 30 },
            { event: 'account_created', count: 22 },
            { event: 'first_role_viewed', count: 18 }
          ]
        }
      ]
    };

    // Generate HTML email
    const htmlContent = generateHTMLEmail(recruiterMetrics, hiringManagerMetrics);

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
          subject: `📈 [TEST] RecXchange Weekly Funnel Report - ${new Date().toLocaleDateString()}`
        }],
        from: { email: EMAIL_FROM, name: 'RecXchange Analytics' },
        content: [
          {
            type: 'text/html',
            value: htmlContent
          }
        ]
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('[Test Email] SendGrid error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${EMAIL_TO}`,
      recruiterMetrics,
      hiringManagerMetrics
    });
  } catch (error) {
    console.error('[Test Email] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}

function generateHTMLEmail(recruiterMetrics: FunnelMetrics, hiringManagerMetrics: FunnelMetrics): string {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #0a0a0a;
      border-radius: 20px;
      overflow: hidden;
    }
    .header {
      background: #000;
      padding: 40px;
      text-align: center;
      border-bottom: 1px solid #222;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #fff;
      font-size: 32px;
      font-weight: 800;
    }
    .header p {
      margin: 12px 0 0 0;
      color: #888;
      font-size: 16px;
    }
    .test-badge {
      background: linear-gradient(135deg, #ff4444, #ff0066);
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      margin-top: 15px;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px;
    }
    .funnel {
      margin-bottom: 60px;
      background: #111;
      border-radius: 16px;
      padding: 30px;
      border: 1px solid #222;
    }
    .funnel-header {
      margin-bottom: 30px;
      text-align: center;
    }
    .funnel h2 {
      color: #fff;
      font-size: 28px;
      margin: 0 0 8px 0;
    }
    .funnel-description {
      color: #888;
      font-size: 15px;
      margin: 0;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .summary-card {
      background: linear-gradient(135deg, #0a0a0a, #111);
      border: 2px solid #222;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .summary-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #666;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .summary-value {
      font-size: 48px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }
    .summary-subtext {
      font-size: 13px;
      color: #666;
      margin-top: 8px;
    }
    .alert-box {
      background: linear-gradient(135deg, #ff4444, #ff0066);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
    .alert-box h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
      color: #fff;
      font-weight: 700;
    }
    .alert-box p {
      margin: 0;
      font-size: 14px;
      color: #fff;
      opacity: 0.9;
    }
    .stage-visual {
      margin-bottom: 30px;
    }
    .stage-row {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      gap: 15px;
    }
    .stage-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 900;
      font-size: 18px;
    }
    .stage-content {
      flex: 1;
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 20px;
    }
    .stage-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .stage-title {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
    .stage-count {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .progress-bar-container {
      background: #1a1a1a;
      height: 12px;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #00ffff, #c71df1);
      border-radius: 6px;
      transition: width 0.3s ease;
    }
    .stage-stats {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #888;
      margin-bottom: 12px;
    }
    .drop-off-warning {
      background: rgba(255, 68, 68, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      padding: 10px 15px;
      margin-top: 10px;
    }
    .drop-off-text {
      color: #ff4444;
      font-weight: 700;
      font-size: 14px;
    }
    .success-badge {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #222;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="RecXchange Logo" class="logo" />
      <h1>Weekly Funnel Report</h1>
      <p>${recruiterMetrics.period.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${recruiterMetrics.period.end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      <span class="test-badge">Test Email - Sample Data</span>
    </div>
    
    <div class="content">
      ${generateFunnelHTML(recruiterMetrics)}
      ${generateFunnelHTML(hiringManagerMetrics)}
    </div>
    
    <div class="footer">
      <p><strong>RecXchange Analytics</strong> • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString('en-GB')}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateFunnelHTML(metrics: FunnelMetrics): string {
  const stagesHTML = metrics.stages.map((stage, index) => {
    const isDropOffHigh = stage.dropOffPercentage > 30;
    const hasNoDrop = stage.dropOffPercentage === 0;
    
    return `
    <div class="stage-row">
      <div class="stage-number">${index + 1}</div>
      <div class="stage-content">
        <div class="stage-title-row">
          <div class="stage-title">${stage.description}</div>
          <div class="stage-count">${stage.count}</div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${stage.percentage}%"></div>
        </div>
        <div class="stage-stats">
          <span><strong>${stage.percentage}%</strong> of all visitors</span>
          ${!hasNoDrop ? `<span><strong>${stage.dropOff}</strong> people left here</span>` : `<span class="success-badge">✓ Everyone continued</span>`}
        </div>
        ${isDropOffHigh ? `
          <div class="drop-off-warning">
            <div class="drop-off-text">⚠️ High Drop-off: ${stage.dropOffPercentage}% left at this stage</div>
          </div>
        ` : ''}
      </div>
    </div>
    `;
  }).join('');

  return `
    <div class="funnel">
      <div class="funnel-header">
        <h2>${metrics.funnel}</h2>
        <p class="funnel-description">${metrics.description}</p>
      </div>
      
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-label">Total Visitors</div>
          <div class="summary-value">${metrics.totalUsers}</div>
          <div class="summary-subtext">this week</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Conversion Rate</div>
          <div class="summary-value">${metrics.conversionRate}%</div>
          <div class="summary-subtext">signed up / booked</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Converted</div>
          <div class="summary-value">${metrics.stages[metrics.stages.length - 1]?.count || 0}</div>
          <div class="summary-subtext">new users</div>
        </div>
      </div>
      
      <div class="alert-box">
        <h3>🚨 Biggest Problem Area</h3>
        <p><strong>${metrics.insights.biggestDropOff.stage}</strong> - ${metrics.insights.biggestDropOff.percentage}% of people are leaving here</p>
      </div>
      
      <div class="stage-visual">
        ${stagesHTML}
      </div>
    </div>
  `;
}
