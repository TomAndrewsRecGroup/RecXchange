/**
 * Hiring Manager Funnel Email Template
 * 
 * HTML email template for weekly hiring manager funnel reports.
 * Includes demo request and booking funnel metrics.
 */

import { FunnelMetrics } from '@/lib/funnel';
import { BRANDING } from '@/lib/constants';

interface HiringManagerFunnelTemplateData {
  metrics: FunnelMetrics;
  date: string;
}

/**
 * Generate hiring manager funnel email HTML
 */
export function generateHiringManagerFunnelEmail(
  data: HiringManagerFunnelTemplateData
): string {
  const { metrics, date } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px; margin: 0; }
    .container { max-width: 900px; margin: 0 auto; background: #0a0a0a; border-radius: 20px; overflow: hidden; }
    .header { background: #000; padding: 40px; text-align: center; border-bottom: 1px solid #222; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
    .header h1 { margin: 0; color: #fff; font-size: 32px; font-weight: 800; }
    .header .subtitle { margin: 12px 0 0 0; color: ${BRANDING.COLORS.SECONDARY}; font-size: 18px; font-weight: 600; }
    .header p { margin: 8px 0 0 0; color: #888; font-size: 16px; }
    .content { padding: 40px; }
    .funnel { margin-bottom: 60px; background: #111; border-radius: 16px; padding: 30px; border: 1px solid #222; }
    .funnel-header { margin-bottom: 30px; text-align: center; }
    .funnel h2 { color: #fff; font-size: 28px; margin: 0 0 8px 0; }
    .funnel-description { color: #888; font-size: 15px; margin: 0; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
    .summary-card { background: linear-gradient(135deg, #0a0a0a, #111); border: 2px solid #222; border-radius: 12px; padding: 20px; text-align: center; }
    .summary-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #666; margin-bottom: 10px; font-weight: 600; }
    .summary-value { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, ${BRANDING.COLORS.SECONDARY}, ${BRANDING.COLORS.PRIMARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
    .summary-subtext { font-size: 13px; color: #666; margin-top: 8px; }
    .stage-row { display: flex; align-items: center; margin-bottom: 20px; gap: 15px; }
    .stage-number { flex-shrink: 0; width: 40px; height: 40px; background: linear-gradient(135deg, ${BRANDING.COLORS.SECONDARY}, ${BRANDING.COLORS.PRIMARY}); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 900; font-size: 18px; }
    .stage-content { flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 20px; }
    .stage-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .stage-title { font-size: 18px; font-weight: 700; color: #fff; }
    .stage-count { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, ${BRANDING.COLORS.SECONDARY}, ${BRANDING.COLORS.PRIMARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .progress-bar-container { background: #1a1a1a; height: 12px; border-radius: 6px; overflow: hidden; margin-bottom: 10px; }
    .progress-bar { height: 100%; background: linear-gradient(90deg, ${BRANDING.COLORS.SECONDARY}, ${BRANDING.COLORS.PRIMARY}); border-radius: 6px; }
    .stage-stats { display: flex; justify-content: space-between; font-size: 13px; color: #888; }
    .drop-off-text { color: ${BRANDING.COLORS.ERROR}; font-weight: 700; }
    .footer { text-align: center; padding: 40px; color: #666; font-size: 12px; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${BRANDING.LOGO_URL}" alt="RecXchange Logo" class="logo" />
      <h1>Weekly Funnel Report</h1>
      <div class="subtitle">🎯 Hiring Manager Funnel</div>
      <p>${date}</p>
    </div>

    <div class="content">
      ${generateFunnelSection(metrics)}
    </div>

    <div class="footer">
      <p>RecXchange Analytics &bull; Automated Weekly Report</p>
      <p style="margin-top: 10px;">
        <a href="https://recxchange.io" style="color: ${BRANDING.COLORS.SECONDARY}; text-decoration: none;">recxchange.io</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateFunnelSection(metrics: FunnelMetrics): string {
  const stagesHtml = metrics.stages
    .map(
      (stage, index) => `
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
          <span>${stage.percentage.toFixed(1)}% of total</span>
          ${stage.dropOffPercentage > 0 ? `<span class="drop-off-text">${stage.dropOffPercentage.toFixed(1)}% drop-off</span>` : ''}
        </div>
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="funnel">
      <div class="funnel-header">
        <h2>💼 Hiring Manager Booking Funnel</h2>
        <p class="funnel-description">Demo request to booking completion</p>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-label">Total Visitors</div>
          <div class="summary-value">${metrics.totalUsers}</div>
          <div class="summary-subtext">Unique managers</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Bookings</div>
          <div class="summary-value">${metrics.stages[metrics.stages.length - 1].count}</div>
          <div class="summary-subtext">Demos scheduled</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Conversion Rate</div>
          <div class="summary-value">${metrics.conversionRate.toFixed(1)}%</div>
          <div class="summary-subtext">Overall funnel</div>
        </div>
      </div>

      ${stagesHtml}
    </div>
  `;
}
