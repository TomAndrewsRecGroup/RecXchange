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
          stage: 'CONVERSION PATH: Completing signup form',
          percentage: 42.3
        },
        topConversionTriggers: [
          'fake_engine_signup_clicked',
          'calculator_cta_clicked',
          'hero_cta_clicked'
        ]
      },
      stages: [
        {
          stage: 'arrival',
          description: 'WHERE: Initial arrival on site',
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
          description: 'WHAT ROUTE: Exploring the platform',
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
          description: 'WHAT PROBLEMS: Understanding pain points',
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
          description: 'WHAT ANSWERS: Seeing how RecXchange solves their problems',
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
          description: 'WHAT CONVERTED: Decision to sign up',
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
          description: 'CONVERSION PATH: Completing signup form',
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
          description: 'SUCCESS: Account created',
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
          description: 'ACTIVATION: Active platform usage',
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
          stage: 'CONVERSION PATH: Booking the call via Calendly',
          percentage: 38.5
        },
        topConversionTriggers: [
          'book_call_cta_clicked',
          'hero_cta_clicked',
          'pricing_details_viewed'
        ]
      },
      stages: [
        {
          stage: 'arrival',
          description: 'WHERE: Initial arrival on site',
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
          description: 'WHAT ROUTE: Understanding the service',
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
          description: 'WHAT PROBLEMS: Researching recruitment solutions',
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
          description: 'WHAT ANSWERS: Understanding how RecXchange helps',
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
          description: 'WHAT CONVERTED: Decision to book a call',
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
          description: 'CONVERSION PATH: Booking the call via Calendly',
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
          description: 'SUCCESS: Call booked',
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
          description: 'ACTIVATION: Call attended and account created',
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
      background: #111;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #222;
    }
    .header {
      background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%);
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #000;
      font-size: 32px;
      font-weight: 800;
    }
    .header p {
      margin: 8px 0 0 0;
      color: #000;
      opacity: 0.7;
      font-size: 14px;
    }
    .test-badge {
      background: #ff4444;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      margin-top: 10px;
      display: inline-block;
    }
    .content {
      padding: 40px;
    }
    .funnel {
      margin-bottom: 60px;
    }
    .funnel-header {
      margin-bottom: 30px;
    }
    .funnel h2 {
      color: #00ffff;
      font-size: 24px;
      margin: 0 0 8px 0;
    }
    .funnel-description {
      color: #888;
      font-size: 14px;
      margin: 0;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      padding: 25px;
      background: #0a0a0a;
      border-radius: 12px;
      border: 1px solid #222;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .insights {
      padding: 20px;
      background: #1a1a1a;
      border-radius: 12px;
      border-left: 4px solid #c71df1;
      margin-bottom: 30px;
    }
    .insights h3 {
      color: #c71df1;
      font-size: 16px;
      margin: 0 0 15px 0;
    }
    .insight-item {
      font-size: 13px;
      color: #aaa;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .insight-item strong {
      color: #fff;
    }
    .stage {
      position: relative;
      margin-bottom: 25px;
      padding: 25px;
      background: #0a0a0a;
      border-radius: 12px;
      border-left: 4px solid #00ffff;
    }
    .stage-number {
      position: absolute;
      top: 25px;
      left: -15px;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 800;
      font-size: 14px;
    }
    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-left: 20px;
    }
    .stage-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
    .stage-count {
      font-size: 28px;
      font-weight: 800;
      color: #00ffff;
    }
    .stage-bar {
      height: 10px;
      background: #222;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .stage-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00ffff, #c71df1);
      border-radius: 5px;
      transition: width 0.3s ease;
    }
    .stage-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      margin-bottom: 12px;
    }
    .drop-off {
      color: #ff4444;
      font-weight: 600;
    }
    .stage-questions {
      background: #1a1a1a;
      padding: 15px;
      border-radius: 8px;
      margin-top: 12px;
    }
    .stage-questions-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      margin-bottom: 8px;
    }
    .stage-questions ul {
      margin: 0;
      padding-left: 20px;
      list-style: none;
    }
    .stage-questions li {
      font-size: 12px;
      color: #bbb;
      margin-bottom: 4px;
      position: relative;
    }
    .stage-questions li:before {
      content: '•';
      color: #00ffff;
      position: absolute;
      left: -15px;
    }
    .top-events {
      font-size: 11px;
      color: #777;
      margin-top: 8px;
    }
    .top-events span {
      color: #00ffff;
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
      <h1>📈 Weekly Funnel Report</h1>
      <p>${recruiterMetrics.period.start.toLocaleDateString()} - ${recruiterMetrics.period.end.toLocaleDateString()}</p>
      <span class="test-badge">TEST EMAIL - SAMPLE DATA</span>
    </div>
    
    <div class="content">
      ${generateFunnelHTML(recruiterMetrics)}
      ${generateFunnelHTML(hiringManagerMetrics)}
    </div>
    
    <div class="footer">
      <p><strong>RecXchange Analytics</strong> • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateFunnelHTML(metrics: FunnelMetrics): string {
  const stagesHTML = metrics.stages.map((stage, index) => `
    <div class="stage">
      <div class="stage-number">${index + 1}</div>
      <div class="stage-header">
        <div class="stage-title">${stage.description}</div>
        <div class="stage-count">${stage.count}</div>
      </div>
      <div class="stage-bar">
        <div class="stage-bar-fill" style="width: ${stage.percentage}%"></div>
      </div>
      <div class="stage-meta">
        <span>${stage.percentage}% of total users</span>
        ${stage.dropOffPercentage > 0 ? `<span class="drop-off">↓ ${stage.dropOffPercentage}% drop-off (${stage.dropOff} users)</span>` : '<span style="color: #22c55e;">✓ All users progressed</span>'}
      </div>
      ${stage.topEvents.length > 0 ? `
        <div class="top-events">
          Top events: <span>${stage.topEvents.map(e => `${e.event} (${e.count})`).join(', ')}</span>
        </div>
      ` : ''}
      <div class="stage-questions">
        <div class="stage-questions-title">Key Questions:</div>
        <ul>
          ${stage.keyQuestions.map(q => `<li>${q}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  return `
    <div class="funnel">
      <div class="funnel-header">
        <h2>${metrics.funnel}</h2>
        <p class="funnel-description">${metrics.description}</p>
      </div>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-label">Total Users</div>
          <div class="stat-value">${metrics.totalUsers}</div>
        </div>
        <div class="stat">
          <div class="stat-label">Conversion Rate</div>
          <div class="stat-value">${metrics.conversionRate}%</div>
        </div>
        <div class="stat">
          <div class="stat-label">Converted</div>
          <div class="stat-value">${metrics.stages[metrics.stages.length - 1]?.count || 0}</div>
        </div>
      </div>
      
      <div class="insights">
        <h3>🔍 Key Insights</h3>
        <div class="insight-item">
          <strong>Biggest Drop-off:</strong> ${metrics.insights.biggestDropOff.stage} (${metrics.insights.biggestDropOff.percentage}% loss)
        </div>
        <div class="insight-item">
          <strong>Top Conversion Triggers:</strong> ${metrics.insights.topConversionTriggers.join(', ')}
        </div>
      </div>
      
      ${stagesHTML}
    </div>
  `;
}
