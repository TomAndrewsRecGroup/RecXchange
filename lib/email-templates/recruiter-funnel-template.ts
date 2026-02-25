/**
 * Recruiter Funnel Email Template
 * 
 * HTML email template for weekly recruiter funnel reports.
 * Includes GHL conversion data, funnel metrics, and ASCII visualization.
 */

import { FunnelMetrics } from '@/lib/funnel';
import { GHLConversionData } from '@/lib/ghl-client';
import { BRANDING } from '@/lib/constants';

interface RecruiterFunnelTemplateData {
  recruiterMetrics: FunnelMetrics;
  ghlData: GHLConversionData | null;
  quickActionCount: number;
  date: string;
}

/**
 * Generate recruiter funnel email HTML
 */
export function generateRecruiterFunnelEmail(
  data: RecruiterFunnelTemplateData
): string {
  const { recruiterMetrics, ghlData, quickActionCount, date } = data;

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
    .header .subtitle { margin: 12px 0 0 0; color: ${BRANDING.COLORS.PRIMARY}; font-size: 18px; font-weight: 600; }
    .header p { margin: 8px 0 0 0; color: #888; font-size: 16px; }
    .content { padding: 40px; }
    .ghl-section { background: #111; border-radius: 16px; padding: 30px; margin-bottom: 40px; border: 2px solid ${BRANDING.COLORS.PRIMARY}; }
    .ghl-section h2 { color: ${BRANDING.COLORS.PRIMARY}; font-size: 24px; margin: 0 0 20px 0; text-align: center; }
    .ghl-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .ghl-stat { background: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 20px; text-align: center; }
    .ghl-stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #666; margin-bottom: 10px; font-weight: 600; }
    .ghl-stat-value { font-size: 42px; font-weight: 900; color: ${BRANDING.COLORS.PRIMARY}; line-height: 1; }
    .ghl-stat-subtext { font-size: 13px; color: #666; margin-top: 8px; }
    .tier-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .tier-card { background: linear-gradient(135deg, #0a0a0a, #111); border: 2px solid #222; border-radius: 12px; padding: 20px; }
    .tier-card.has-signups { border-color: ${BRANDING.COLORS.SUCCESS}; }
    .tier-name { font-size: 14px; color: #888; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .tier-count { font-size: 36px; font-weight: 900; background: linear-gradient(135deg, ${BRANDING.COLORS.PRIMARY}, ${BRANDING.COLORS.SECONDARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .tier-card.has-signups .tier-count { background: linear-gradient(135deg, ${BRANDING.COLORS.SUCCESS}, ${BRANDING.COLORS.PRIMARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .funnel { margin-bottom: 60px; background: #111; border-radius: 16px; padding: 30px; border: 1px solid #222; }
    .funnel-header { margin-bottom: 30px; text-align: center; }
    .funnel h2 { color: #fff; font-size: 28px; margin: 0 0 8px 0; }
    .funnel-description { color: #888; font-size: 15px; margin: 0; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
    .summary-card { background: linear-gradient(135deg, #0a0a0a, #111); border: 2px solid #222; border-radius: 12px; padding: 20px; text-align: center; }
    .summary-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #666; margin-bottom: 10px; font-weight: 600; }
    .summary-value { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, ${BRANDING.COLORS.PRIMARY}, ${BRANDING.COLORS.SECONDARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
    .summary-subtext { font-size: 13px; color: #666; margin-top: 8px; }
    .alert-box { background: linear-gradient(135deg, ${BRANDING.COLORS.ERROR}, #ff0066); border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center; }
    .alert-box h3 { margin: 0 0 10px 0; font-size: 16px; color: #fff; font-weight: 700; }
    .alert-box p { margin: 0; font-size: 14px; color: #fff; opacity: 0.9; }
    .stage-row { display: flex; align-items: center; margin-bottom: 20px; gap: 15px; }
    .stage-number { flex-shrink: 0; width: 40px; height: 40px; background: linear-gradient(135deg, ${BRANDING.COLORS.PRIMARY}, ${BRANDING.COLORS.SECONDARY}); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 900; font-size: 18px; }
    .stage-content { flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 20px; }
    .stage-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .stage-title { font-size: 18px; font-weight: 700; color: #fff; }
    .stage-count { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, ${BRANDING.COLORS.PRIMARY}, ${BRANDING.COLORS.SECONDARY}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .progress-bar-container { background: #1a1a1a; height: 12px; border-radius: 6px; overflow: hidden; margin-bottom: 10px; }
    .progress-bar { height: 100%; background: linear-gradient(90deg, ${BRANDING.COLORS.PRIMARY}, ${BRANDING.COLORS.SECONDARY}); border-radius: 6px; }
    .stage-stats { display: flex; justify-content: space-between; font-size: 13px; color: #888; }
    .drop-off-warning { background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); border-radius: 8px; padding: 10px 15px; margin-top: 10px; }
    .drop-off-text { color: ${BRANDING.COLORS.ERROR}; font-weight: 700; font-size: 14px; }
    .success-badge { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: ${BRANDING.COLORS.SUCCESS}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .quick-action-stat { background: rgba(199, 29, 241, 0.1); border: 1px solid rgba(199, 29, 241, 0.3); border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center; }
    .quick-action-stat strong { color: ${BRANDING.COLORS.SECONDARY}; font-size: 24px; }
    .footer { text-align: center; padding: 40px; color: #666; font-size: 12px; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${BRANDING.LOGO_URL}" alt="RecXchange Logo" class="logo" />
      <h1>Weekly Funnel Report</h1>
      <div class="subtitle">💼 Recruiter Funnel</div>
      <p>${date}</p>
    </div>

    <div class="content">
      ${ghlData ? generateGHLSection(ghlData) : ''}
      ${generateFunnelSection(recruiterMetrics)}
      ${quickActionCount > 0 ? generateQuickActionSection(quickActionCount) : ''}
    </div>

    <div class="footer">
      <p>RecXchange Analytics &bull; Automated Weekly Report</p>
      <p style="margin-top: 10px;">
        <a href="https://recxchange.io" style="color: ${BRANDING.COLORS.PRIMARY}; text-decoration: none;">recxchange.io</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateGHLSection(ghlData: GHLConversionData): string {
  // Extract tier counts from tieredSignups array
  const getTierCount = (tierName: string): number => {
    const tier = ghlData.tieredSignups.find(t => t.tier.includes(tierName));
    return tier?.count || 0;
  };

  const entryCount = getTierCount('entry');
  const liteCount = getTierCount('lite');
  const proCount = getTierCount('pro');
  const teamsCount = getTierCount('teams');
  const totalSignups = ghlData.totalTieredSignups;

  return `
    <div class="ghl-section">
      <h2>📊 GHL Tier Signups (Last 7 Days)</h2>
      
      <div class="ghl-summary">
        <div class="ghl-stat">
          <div class="ghl-stat-label">Total Signups</div>
          <div class="ghl-stat-value">${totalSignups}</div>
          <div class="ghl-stat-subtext">All tiers combined</div>
        </div>
        <div class="ghl-stat">
          <div class="ghl-stat-label">Conversion Rate</div>
          <div class="ghl-stat-value">${ghlData.conversionRate.toFixed(1)}%</div>
          <div class="ghl-stat-subtext">From page view to signup</div>
        </div>
        <div class="ghl-stat">
          <div class="ghl-stat-label">Revenue Impact</div>
          <div class="ghl-stat-value">💰</div>
          <div class="ghl-stat-subtext">Estimated MRR growth</div>
        </div>
      </div>

      <div class="tier-grid">
        <div class="tier-card ${entryCount > 0 ? 'has-signups' : ''}">
          <div class="tier-name">RecX Entry ($1)</div>
          <div class="tier-count">${entryCount}</div>
        </div>
        <div class="tier-card ${liteCount > 0 ? 'has-signups' : ''}">
          <div class="tier-name">RecX Lite ($99)</div>
          <div class="tier-count">${liteCount}</div>
        </div>
        <div class="tier-card ${proCount > 0 ? 'has-signups' : ''}">
          <div class="tier-name">RecX Pro ($250)</div>
          <div class="tier-count">${proCount}</div>
        </div>
        <div class="tier-card ${teamsCount > 0 ? 'has-signups' : ''}">
          <div class="tier-name">RecX Teams (Custom)</div>
          <div class="tier-count">${teamsCount}</div>
        </div>
      </div>
    </div>
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
        <h2>🛤️ Recruiter Signup Funnel</h2>
        <p class="funnel-description">Weekly performance metrics</p>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-label">Total Users</div>
          <div class="summary-value">${metrics.totalUsers}</div>
          <div class="summary-subtext">Unique visitors</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Conversions</div>
          <div class="summary-value">${metrics.stages[metrics.stages.length - 1].count}</div>
          <div class="summary-subtext">Completed signups</div>
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

function generateQuickActionSection(count: number): string {
  return `
    <div class="quick-action-stat">
      <p style="margin: 0 0 10px 0; color: #e5e5e5; font-size: 14px;">⚡ Quick Actions Submitted</p>
      <p style="margin: 0;"><strong>${count}</strong> <span style="color: #888; font-size: 14px;">match candidate requests</span></p>
    </div>
  `;
}
