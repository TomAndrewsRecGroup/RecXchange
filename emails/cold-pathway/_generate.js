/**
 * RecXchange Cold Email Generator
 * Generates cold-email-01.html through cold-email-20.html
 * Run: node emails/cold-pathway/_generate.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const OUT_DIR = __dirname;

// ---------------------------------------------------------------------------
// Panel renderers
// ---------------------------------------------------------------------------

function stepsPanel(title, steps) {
  // steps: array of { title, desc }
  // Circle colours: 1=gold, 2=blue, 3=green
  const circleColors = ['#F59E0B', '#2563EB', '#22C55E'];
  const textColors   = ['#000000', '#ffffff', '#ffffff'];

  let rows = '';
  steps.forEach((step, i) => {
    const bg  = circleColors[i] || '#F59E0B';
    const tc  = textColors[i]   || '#000000';
    const num = i + 1;
    const isLast = i === steps.length - 1;

    rows += `
              <!-- Step ${num} -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:6px;">
                <tr>
                  <td width="30" valign="top">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td width="26" height="26" bgcolor="${bg}" style="border-radius:50%;text-align:center;font-size:13px;font-weight:bold;color:${tc};font-family:Arial,Helvetica,sans-serif;line-height:26px;">${num}</td>
                      </tr>
                    </table>
                  </td>
                  <td valign="top" style="padding-left:14px;">
                    <p style="margin:0 0 3px;font-size:15px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">${step.title}</p>
                    <p style="margin:0;font-size:13px;color:#64748B;font-family:Arial,Helvetica,sans-serif;line-height:1.5;">${step.desc}</p>
                  </td>
                </tr>
              </table>`;

    if (!isLast) {
      rows += `
              <!-- Connector line -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 6px 12px;">
                <tr><td width="2" height="16" bgcolor="#1E2D45" style="font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>`;
    }
  });

  return `
    <!-- STEPS PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              <p style="margin:0 0 22px;font-size:12px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">${title}</p>
              ${rows}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function checklistPanel(title, items) {
  let rows = items.map(item => `
                <tr><td style="padding-bottom:10px;font-size:14px;color:#CBD5E1;font-family:Arial,Helvetica,sans-serif;line-height:1.5;"><span style="color:#22C55E;font-weight:bold;">&#10003;</span>&nbsp; ${item}</td></tr>`).join('');

  return `
    <!-- CHECKLIST PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              <p style="margin:0 0 18px;font-size:12px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">${title}</p>
              <table cellpadding="0" cellspacing="0" role="presentation">${rows}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function faqPanel(faqs) {
  // faqs: array of { q, a }
  let rows = '';
  faqs.forEach((faq, i) => {
    if (i > 0) {
      rows += `
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:14px 0;">
                <tr><td height="1" bgcolor="#1E2D45" style="font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>`;
    }
    rows += `
              <p style="margin:0 0 6px;font-size:14px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">${faq.q}</p>
              <p style="margin:0;font-size:13px;color:#94A3B8;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">${faq.a}</p>`;
  });

  return `
    <!-- FAQ PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              ${rows}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function statsPanel(stats, note) {
  // stats: array of { number, label }  (2 or 3)
  const colW = stats.length === 2 ? '48%' : '31%';

  let cells = '';
  stats.forEach((s, i) => {
    if (i > 0) cells += `<td width="2%">&nbsp;</td>`;
    cells += `
            <td width="${colW}" align="center" bgcolor="#0B1829" style="border-radius:12px;padding:20px 10px;border:1px solid #1E2D45;">
              <p style="margin:0 0 5px;font-size:26px;font-weight:bold;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;line-height:1;">${s.number}</p>
              <p style="margin:0;font-size:10px;color:#64748B;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:1px;line-height:1.4;">${s.label}</p>
            </td>`;
  });

  const noteHtml = note ? `
              <tr>
                <td colspan="${stats.length * 2 - 1}" align="center" style="padding-top:16px;font-size:11px;color:#475569;font-family:Arial,Helvetica,sans-serif;line-height:1.5;">${note}</td>
              </tr>` : '';

  return `
    <!-- STATS PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>${cells}</tr>${noteHtml}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function quotePanel(quotes) {
  // quotes: array of { text, attribution }
  let rows = '';
  quotes.forEach((q, i) => {
    if (i > 0) {
      rows += `
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:16px 0;">
                <tr><td height="1" bgcolor="#1E2D45" style="font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>`;
    }
    rows += `
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <!--[if mso]>
                  <td width="3" bgcolor="#F59E0B" style="font-size:0;line-height:0;">&nbsp;</td>
                  <![endif]-->
                  <!--[if !mso]><!-->
                  <td width="3" bgcolor="#F59E0B" style="border-radius:2px;font-size:0;line-height:0;">&nbsp;</td>
                  <!--<![endif]-->
                  <td style="padding-left:14px;">
                    <p style="margin:0 0 8px;font-size:14px;color:#CBD5E1;font-family:Arial,Helvetica,sans-serif;line-height:1.65;font-style:italic;">"${q.text}"</p>
                    <p style="margin:0;font-size:12px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;">${q.attribution}</p>
                  </td>
                </tr>
              </table>`;
  });

  return `
    <!-- QUOTE PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              ${rows}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function rolesPanel(roles) {
  // roles: array of { role, sector, fee }
  let rows = '';
  roles.forEach((r, i) => {
    if (i > 0) {
      rows += `
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:10px 0;">
                <tr><td height="1" bgcolor="#1E2D45" style="font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>`;
    }
    rows += `
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td valign="top">
                    <p style="margin:0 0 2px;font-size:14px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">${r.role}</p>
                    <p style="margin:0;font-size:12px;color:#64748B;font-family:Arial,Helvetica,sans-serif;">${r.sector}</p>
                  </td>
                  <td valign="top" align="right" style="white-space:nowrap;">
                    <p style="margin:0;font-size:13px;font-weight:bold;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;">${r.fee}</p>
                  </td>
                </tr>
              </table>`;
  });

  return `
    <!-- ROLES PANEL -->
    <tr>
      <td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0B1829" style="border-radius:14px;border:1px solid #1E2D45;" role="presentation">
          <tr>
            <td style="padding:26px 24px;">
              <p style="margin:0 0 18px;font-size:12px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Live Roles: Sample</p>
              ${rows}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function pricingBox() {
  return `
    <!-- PRICING BOX -->
    <tr>
      <td style="padding:0 36px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td width="46%" bgcolor="#0B1829" valign="top" style="border-radius:12px 0 0 12px;padding:22px 18px;border-top:1px solid #F59E0B;border-bottom:1px solid #F59E0B;border-left:1px solid #F59E0B;border-right:none;">
              <p style="margin:0 0 2px;font-size:11px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Entry Plan</p>
              <p style="margin:0 0 6px;font-size:32px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;line-height:1.1;">$1<span style="font-size:14px;font-weight:normal;color:#475569;">/month</span></p>
              <p style="margin:0;font-size:13px;color:#64748B;font-family:Arial,Helvetica,sans-serif;line-height:1.5;">No long contract.<br />Cancel any time.</p>
            </td>
            <td width="54%" bgcolor="#050C18" valign="top" style="border-radius:0 12px 12px 0;padding:22px 18px;border-top:1px solid #F59E0B;border-bottom:1px solid #F59E0B;border-right:1px solid #F59E0B;border-left:none;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr><td style="padding-bottom:10px;font-size:13px;color:#22C55E;font-family:Arial,Helvetica,sans-serif;">&#10003;&nbsp; 5 credits every month</td></tr>
                <tr><td style="padding-bottom:10px;font-size:13px;color:#22C55E;font-family:Arial,Helvetica,sans-serif;">&#10003;&nbsp; 100+ open jobs to work</td></tr>
                <tr><td style="padding-bottom:10px;font-size:13px;color:#22C55E;font-family:Arial,Helvetica,sans-serif;">&#10003;&nbsp; 270 million candidate profiles</td></tr>
                <tr><td style="font-size:13px;color:#22C55E;font-family:Arial,Helvetica,sans-serif;">&#10003;&nbsp; Earn up to 70% of every fee</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function divider(padTop, padBottom) {
  const pt = padTop    !== undefined ? padTop    : 28;
  const pb = padBottom !== undefined ? padBottom : 0;
  return `
    <tr>
      <td style="padding:${pt}px 36px ${pb}px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td height="1" bgcolor="#1E2D45" style="font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>`;
}

// ---------------------------------------------------------------------------
// Main template builder
// ---------------------------------------------------------------------------

function emailTemplate(cfg) {
  const {
    num,
    title,
    preheader,
    imageId,
    imageAlt,
    pill,
    h1,
    sub,
    bodyParas,
    panelHtml,
    showPricing,
    ctaText,
    ctaUrl,
    ctaSubtext,
  } = cfg;

  const defaultCtaUrl = 'https://app.recxchange.io';
  const href = ctaUrl || defaultCtaUrl;

  // Body paragraphs
  const parasHtml = bodyParas.map((p, i) => {
    const isLast = i === bodyParas.length - 1;
    return `<p style="margin:0${isLast ? '' : ' 0 14px'};font-size:16px;line-height:1.75;color:#CBD5E1;font-family:Arial,Helvetica,sans-serif;">${p}</p>`;
  }).join('\n        ');

  const pricingHtml = showPricing ? pricingBox() : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--[if mso]>
<noscript>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
</noscript>
<![endif]-->
<style>
  body, #bodyTable { margin:0;padding:0;background-color:#000000;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  table { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  img { border:0;display:block;outline:none;-ms-interpolation-mode:bicubic; }
  a { text-decoration:none; }
  .container { max-width:620px; }
  @media only screen and (max-width:640px) {
    .container { width:100% !important; }
    .h1 { font-size:26px !important; }
    .inner-pad { padding:24px 18px !important; }
    .stat-td { display:block !important;width:100% !important;margin-bottom:8px !important; }
    .spacer-td { display:none !important; }
    .hero-img { height:auto !important; }
    .split-left,.split-right { display:block !important;width:100% !important;border-radius:12px !important; }
  }
</style>
</head>

<body bgcolor="#000000">

<!-- PREHEADER -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
  ${preheader}&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;
</div>

<table id="bodyTable" width="100%" bgcolor="#000000" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="padding:28px 12px;">

  <table class="container" width="620" cellpadding="0" cellspacing="0" bgcolor="#060D1C" style="border-radius:18px;overflow:hidden;" role="presentation">

    <!-- TOP GOLD BAR -->
    <!--[if mso]>
    <tr><td height="5" bgcolor="#F59E0B" style="font-size:0;line-height:0;">&nbsp;</td></tr>
    <![endif]-->
    <!--[if !mso]><!-->
    <tr><td height="5" bgcolor="#F59E0B" style="font-size:0;line-height:0;">&nbsp;</td></tr>
    <!--<![endif]-->

    <!-- LOGO -->
    <tr>
      <td align="center" bgcolor="#060D1C" style="padding:30px 36px 24px;">
        <img src="https://assets.cdn.filesafe.space/VxHBI8kbavh407OMkAcu/media/693419dfe0f0920b8ff63b72.png" width="240" alt="RecXchange" style="display:block;margin:0 auto;" />
      </td>
    </tr>

    <!-- HERO IMAGE -->
    <tr>
      <td bgcolor="#060D1C" style="font-size:0;line-height:0;padding:0;border-bottom:3px solid #F59E0B;">
        <img
          src="https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=620&q=80"
          width="620"
          alt="${imageAlt}"
          class="hero-img"
          style="display:block;width:580px;max-width:100%;height:210px;object-fit:cover;object-position:center center;"
        />
      </td>
    </tr>

    <!-- HEADLINE -->
    <tr>
      <td align="center" bgcolor="#060D1C" style="padding:32px 36px 8px;">

        <!-- Pill -->
        <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:20px;" role="presentation">
          <tr>
            <td bgcolor="#0B1829" style="border-radius:999px;padding:6px 20px;border:1px solid #F59E0B;">
              <span style="font-size:11px;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:1.8px;text-transform:uppercase;">${pill}</span>
            </td>
          </tr>
        </table>

        <h1 class="h1" style="margin:0 0 14px;font-size:30px;line-height:1.2;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:bold;text-align:center;">
          ${h1}
        </h1>

        <p style="margin:0;font-size:17px;line-height:1.65;color:#94A3B8;font-family:Arial,Helvetica,sans-serif;text-align:center;">
          ${sub}
        </p>

      </td>
    </tr>

    ${divider(28, 0)}

    <!-- 3 STAT BOXES -->
    <tr>
      <td style="padding:24px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="stat-td" width="32%" align="center" bgcolor="#0B1829" style="border-radius:12px;padding:18px 10px;border:1px solid #F59E0B;">
              <p style="margin:0 0 5px;font-size:28px;font-weight:bold;color:#F59E0B;font-family:Arial,Helvetica,sans-serif;line-height:1;">17,000+</p>
              <p style="margin:0;font-size:11px;color:#64748B;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:1px;">Recruiters Inside</p>
            </td>
            <td class="spacer-td" width="2%">&nbsp;</td>
            <td class="stat-td" width="32%" align="center" bgcolor="#0B1829" style="border-radius:12px;padding:18px 10px;border:1px solid #2563EB;">
              <p style="margin:0 0 5px;font-size:28px;font-weight:bold;color:#60A5FA;font-family:Arial,Helvetica,sans-serif;line-height:1;">$850K+</p>
              <p style="margin:0;font-size:11px;color:#64748B;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:1px;">Fees Available Now</p>
            </td>
            <td class="spacer-td" width="2%">&nbsp;</td>
            <td class="stat-td" width="32%" align="center" bgcolor="#0B1829" style="border-radius:12px;padding:18px 10px;border:1px solid #1E2D45;">
              <p style="margin:0 0 5px;font-size:28px;font-weight:bold;color:#22C55E;font-family:Arial,Helvetica,sans-serif;line-height:1;">70%</p>
              <p style="margin:0;font-size:11px;color:#64748B;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:1px;">Max Fee Share</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- BODY COPY -->
    <tr>
      <td style="padding:0 36px 28px;">
        ${parasHtml}
      </td>
    </tr>

    ${panelHtml}

    ${pricingHtml}

    ${divider(0, 0)}

    <!-- CTA -->
    <tr>
      <td align="center" style="padding:32px 36px 10px;">
        <table cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td bgcolor="#F59E0B" style="border-radius:999px;">
              <a href="${href}" style="display:inline-block;padding:17px 56px;font-size:16px;font-weight:bold;color:#000000;font-family:Arial,Helvetica,sans-serif;text-decoration:none;">
                <!--[if mso]><font color="#000000"><![endif]-->
                ${ctaText} &#8594;
                <!--[if mso]></font><![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:12px;color:#475569;font-family:Arial,Helvetica,sans-serif;text-align:center;">
          ${ctaSubtext}
        </p>
      </td>
    </tr>

    ${divider(28, 0)}

    <!-- SIGN-OFF -->
    <tr>
      <td style="padding:24px 36px 8px;">
        <p style="margin:0 0 2px;font-size:16px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:bold;">Tom Andrews</p>
        <p style="margin:0;font-size:13px;color:#475569;font-family:Arial,Helvetica,sans-serif;">CEO &amp; Founder, RecXchange</p>
      </td>
    </tr>

    <!-- SOCIAL LINKS -->
    <tr>
      <td align="center" style="padding:16px 36px 10px;">
        <table cellpadding="0" cellspacing="0" align="center" role="presentation">
          <tr>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.linkedin.com/company/recxchange" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->LinkedIn<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://whatsapp.com/channel/0029VbAmXWG7z4ki7lMZ9e0S" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->WhatsApp<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.instagram.com/recxchange" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->Instagram<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.facebook.com/recxchange" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->Facebook<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.twitter.com/recxchangeuk" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->Twitter<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="padding-right:8px;font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.youtube.com/@recxchange" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->YouTube<!--[if mso]></font><![endif]--></a></td>
            <td style="padding-right:8px;font-size:12px;color:#1E2D45;font-family:Arial,Helvetica,sans-serif;">|</td>
            <td style="font-size:12px;font-family:Arial,Helvetica,sans-serif;"><a href="https://www.tiktok.com/@recxchange" target="_blank" style="color:#475569;text-decoration:none;"><!--[if mso]><font color="#475569"><![endif]-->TikTok<!--[if mso]></font><![endif]--></a></td>
          </tr>
        </table>
      </td>
    </tr>

    ${divider(8, 0)}

    <!-- FOOTER -->
    <tr>
      <td style="padding:18px 36px 26px;" align="center">
        <p style="margin:0 0 8px;font-size:11px;color:#334155;font-family:Arial,Helvetica,sans-serif;line-height:1.65;text-align:center;">
          You are receiving this email because you interacted with RecXchange online.<br />
          Andrews Recruitment Group Limited t/a RecXchange, a UK registered company.
        </p>
        <p style="margin:0;font-size:11px;font-family:Arial,Helvetica,sans-serif;text-align:center;">
          <a href="{{unsubscribe_url}}" style="color:#334155;text-decoration:underline;">
            <!--[if mso]><font color="#334155"><![endif]-->Unsubscribe<!--[if mso]></font><![endif]-->
          </a>
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Email configs
// ---------------------------------------------------------------------------

const emails = [

  // 01 — The Hook
  {
    num: 1,
    title: 'RecXchange: More jobs. More money.',
    preheader: '100+ jobs open right now. Work them. Earn from them. Start for $1.',
    imageId: '1521737604893-d14cc237f11d',
    imageAlt: 'Recruiters collaborating in an office',
    pill: 'JOIN 17,000 RECRUITERS | $1/MONTH',
    h1: 'More jobs to work. More money to earn.',
    sub: 'RecXchange connects recruiters around the world.<br /><strong style="color:#ffffff;">Work each other\'s jobs. Share the fee.</strong>',
    bodyParas: [
      'Right now, over <strong style="color:#F59E0B;">100 jobs are open</strong> inside RecXchange, posted by other recruiters who need your help to fill them.',
      'You find the right person for one of those jobs. They get placed. <strong style="color:#ffffff;">You earn up to 70% of the fee.</strong>',
      'It does not matter where you are. It does not matter which sector you work in. If you know the right person, there is money to earn.',
    ],
    panelHtml: stepsPanel('3 Steps. That Is All.', [
      { title: 'Join for $1 a month', desc: 'Get access to everything. 5 credits included. Cancel any time.' },
      { title: 'Pick a job to work', desc: 'Browse 100+ open jobs. Filter by sector, country and fee size.' },
      { title: 'Send us the right person and earn', desc: 'When they get the job, you earn up to 70% of the fee. Paid fast.' },
    ]),
    showPricing: true,
    ctaText: 'See the Open Jobs',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io &nbsp;&#183;&nbsp; Start for $1. No commitment.',
  },

  // 02 — What Is RecXchange
  {
    num: 2,
    title: 'RecXchange: One platform. Every recruiter.',
    preheader: 'Here is the short answer on what RecXchange is and how it works.',
    imageId: '1522202176988-66273c2fd55f',
    imageAlt: 'Professional team in discussion',
    pill: 'WHAT IS RECXCHANGE',
    h1: 'One platform. Every recruiter. Every job.',
    sub: 'Here is the short answer.',
    bodyParas: [
      'RecXchange is a platform for recruiters. It lets you work on jobs posted by other recruiters, and share candidates with them too.',
      'When a placement happens, the fee is split. You keep the biggest share. The platform handles the rest.',
      'Over 17,000 recruiters are already inside. They work together. They earn together.',
    ],
    panelHtml: checklistPanel('Three things RecXchange gives you:', [
      'Browse 100+ live jobs posted by other recruiters',
      'Share your candidates and earn when they get placed',
      'Keep up to 70% of every fee you help create',
    ]),
    showPricing: true,
    ctaText: 'Join RecXchange',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start for $1. Cancel any time.',
  },

  // 03 — The Candidate Angle
  {
    num: 3,
    title: 'RecXchange: Your candidates have value.',
    preheader: 'Every CV in your database is an asset. RecXchange helps you use it.',
    imageId: '1573496359142-b8d87734a5a2',
    imageAlt: 'Professional recruiter working at laptop',
    pill: 'YOUR CANDIDATES HAVE VALUE',
    h1: 'You have candidates. Other recruiters have the jobs. Let us connect you.',
    sub: 'Every CV in your database is an asset. RecXchange helps you use it.',
    bodyParas: [
      'You already have candidates. People you placed before. People you spoke to last month. People in your network who are looking.',
      'Inside RecXchange, other recruiters post jobs every day. Jobs they need to fill. Jobs that match the people you know.',
      'Share your candidate for one of those jobs. If they get placed, you earn. It is that simple.',
    ],
    panelHtml: stepsPanel('How it works for candidates:', [
      { title: 'Find a matching job', desc: 'Find a job inside RecXchange that matches someone you know.' },
      { title: 'Use one credit to share them', desc: 'Use one credit to share that person for the role.' },
      { title: 'Earn when they get placed', desc: 'If they get placed, you earn up to 70% of the fee.' },
    ]),
    showPricing: true,
    ctaText: 'See the Open Jobs',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '270 million candidate profiles inside. Start for $1.',
  },

  // 04 — The Fee Example
  {
    num: 4,
    title: 'RecXchange: A £7,000 fee. Two recruiters. Both earn.',
    preheader: 'Here is what a RecXchange placement looks like in real money.',
    imageId: '1507003211169-0a1dd7228f2d',
    imageAlt: 'Confident professional ready to close a deal',
    pill: 'REAL NUMBERS',
    h1: 'A £7,000 fee. Two recruiters. Both earn.',
    sub: 'Here is what a RecXchange placement looks like in real money.',
    bodyParas: [
      'A recruiter posts a job on RecXchange. The fee for placing someone is £7,000.',
      'You find the right person. They get the job.',
      'The fee is split. At 70%, you earn £4,900. The recruiter who posted the job earns £2,100. Both win.',
    ],
    panelHtml: statsPanel(
      [
        { number: '£7,000', label: 'Total Fee' },
        { number: '£4,900', label: 'Your Share at 70%' },
        { number: '£2,100', label: 'The Other Recruiter' },
      ],
      'These numbers are based on a standard placement. Fees vary by role and tier.'
    ),
    showPricing: true,
    ctaText: 'See Roles With Fees',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ live roles inside. Start for $1.',
  },

  // 05 — The Database
  {
    num: 5,
    title: 'RecXchange: 270 million candidates. All yours.',
    preheader: 'RecXchange members get access to 270 million candidate profiles from day one.',
    imageId: '1560472354-b33ff0c44a43',
    imageAlt: 'Business professionals making a deal',
    pill: '270 MILLION CANDIDATES',
    h1: 'The biggest candidate database in recruitment. And it is yours.',
    sub: 'RecXchange members get access to 270 million candidate profiles from day one.',
    bodyParas: [
      'Finding the right person for a job is the hard part. RecXchange makes it easier.',
      'Inside the platform, there are 270 million candidate profiles. Search them. Find the match. Submit them for a live role.',
      'Every profile is a chance to earn. Every job is waiting to be filled.',
    ],
    panelHtml: checklistPanel('What the database gives you:', [
      'Search by job title, skills, location and sector',
      'Filter active candidates who are open to new roles',
      'Submit directly to any live job on the platform',
      'Earn up to 70% when your candidate gets placed',
    ]),
    showPricing: true,
    ctaText: 'Search the Database',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start for $1. Access from day one.',
  },

  // 06 — First Role Walkthrough
  {
    num: 6,
    title: 'RecXchange: Work your first job. Step by step.',
    preheader: 'From login to submission. Most recruiters submit within 24 hours of joining.',
    imageId: '1486312338219-ce68d2c6f44d',
    imageAlt: 'Recruiter working at laptop',
    pill: 'YOUR FIRST ROLE',
    h1: 'Here is how to work your first job on RecXchange.',
    sub: 'From login to submission. Step by step.',
    bodyParas: [
      'Most recruiters make their first submission within 24 hours of joining.',
      'Here is exactly how it works.',
    ],
    panelHtml: stepsPanel('Your first job on RecXchange:', [
      { title: 'Log in and go to the jobs board', desc: 'You will see 100+ live roles with fees shown clearly.' },
      { title: 'Filter by your sector', desc: 'Find a role that matches someone in your network or database.' },
      { title: 'Submit your candidate', desc: 'Use one credit to submit. Add their details and a short note. That is it.' },
    ]),
    showPricing: true,
    ctaText: 'Start Your First Role',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Your first 5 credits are included.',
  },

  // 07 — Speed / Easy Setup
  {
    num: 7,
    title: 'RecXchange: Set up in 2 minutes.',
    preheader: 'There is no long form. No complicated onboarding. Just access.',
    imageId: '1554774853-aae0a22c8aa4',
    imageAlt: 'Relaxed professional at their desk',
    pill: '2 MINUTES TO START',
    h1: 'It takes 2 minutes to get set up. That is not an exaggeration.',
    sub: 'There is no long form. No complicated onboarding. Just access.',
    bodyParas: [
      'We built RecXchange to be fast. You should spend your time placing people, not setting up software.',
      'Here is what getting started actually looks like.',
    ],
    panelHtml: checklistPanel('Your 2-minute setup:', [
      'Click the sign-up link and enter your email',
      'Choose your plan. Entry is $1 a month.',
      'Set your sector so you see the right jobs first',
      'Browse the live jobs board. Submit your first candidate.',
    ]),
    showPricing: false,
    ctaText: 'Get Started in 2 Minutes',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io &nbsp;&#183;&nbsp; No commitment. Cancel any time.',
  },

  // 08 — Every Sector
  {
    num: 8,
    title: 'RecXchange: Whatever sector you work in.',
    preheader: 'RecXchange has live roles across more than 20 sectors right now.',
    imageId: '1517245386807-bb43f82c33c4',
    imageAlt: 'Diverse team of professionals',
    pill: 'EVERY SECTOR. EVERY COUNTRY.',
    h1: 'Whatever sector you work in, there are jobs for you.',
    sub: 'RecXchange has live roles across more than 20 sectors right now.',
    bodyParas: [
      'We often hear: I work in a niche sector. Will there be anything for me?',
      'The answer is yes. RecXchange has live roles across technology, finance, healthcare, engineering, sales, legal and more.',
      'And because 17,000 recruiters from over 50 countries are inside, new jobs are posted every day.',
    ],
    panelHtml: checklistPanel('Sectors with live jobs right now:', [
      'Technology and Software',
      'Finance and Banking',
      'Healthcare and Life Sciences',
      'Engineering and Manufacturing',
      'Sales and Business Development',
      'Legal and Compliance',
      'And more added every week',
    ]),
    showPricing: true,
    ctaText: 'See Roles in Your Sector',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Filter by sector inside the platform. Start for $1.',
  },

  // 09 — Credits Explained
  {
    num: 9,
    title: 'RecXchange: What does a credit cost you?',
    preheader: 'Twenty cents. That is all. Here is why it matters.',
    imageId: '1542744173-8e7e53415bb0',
    imageAlt: 'Professional reviewing data at a meeting',
    pill: 'HOW CREDITS WORK',
    h1: 'What does a credit actually cost you?',
    sub: 'Twenty cents. That is all. Here is why it matters.',
    bodyParas: [
      'RecXchange uses credits. You use one credit every time you submit a candidate for a job.',
      'On the Entry plan at $1 a month, you get 5 credits. That is 20 cents per submission.',
      'If just one of those submissions turns into a placement at 70%, you earn thousands. The maths speaks for itself.',
    ],
    panelHtml: statsPanel(
      [
        { number: '$0.20', label: 'Cost Per Submission' },
        { number: '£4,900+', label: 'Average Fee at 70%' },
        { number: '1 in 5', label: 'Submissions to Break Even' },
      ],
      'Based on a £7,000 average fee. Your results will vary.'
    ),
    showPricing: true,
    ctaText: 'Get 5 Credits for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join the Entry plan. Cancel any time.',
  },

  // 10 — Live Activity This Week
  {
    num: 10,
    title: 'RecXchange: What is happening inside right now.',
    preheader: 'Live numbers. Real activity. Updated this week.',
    imageId: '1516321318423-f06f85e504b3',
    imageAlt: 'Professional using a tablet device',
    pill: 'THIS WEEK ON THE PLATFORM',
    h1: 'Here is what is happening inside RecXchange right now.',
    sub: 'Live numbers. Real activity. Updated this week.',
    bodyParas: [
      'RecXchange is not a quiet platform. Recruiters are active every day.',
      'Here is a snapshot of what is happening inside right now.',
    ],
    panelHtml: statsPanel(
      [
        { number: '100+', label: 'Jobs Posted and Open' },
        { number: '$850K+', label: 'In Fees Available' },
        { number: '17,000', label: 'Recruiters Looking for Partners' },
      ],
      'Numbers updated weekly. Join to see the full picture.'
    ),
    showPricing: false,
    ctaText: 'See What Is Live',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Access everything from day one.',
  },

  // 11 — Top FAQ
  {
    num: 11,
    title: 'RecXchange: Your questions answered.',
    preheader: 'Recruiters ask us the same things before they join. Here are the straight answers.',
    imageId: '1524178232363-1fb2b075b655',
    imageAlt: 'Professional speaking and presenting confidently',
    pill: 'YOUR QUESTIONS ANSWERED',
    h1: 'The question we get asked the most.',
    sub: 'And the honest answer.',
    bodyParas: [
      'Recruiters ask us the same things before they join. We get it. A new platform takes trust.',
      'Here are the questions we hear most, and the straight answers.',
    ],
    panelHtml: faqPanel([
      { q: 'Do I need clients or my own jobs to earn?', a: 'No. You earn by placing people into other recruiters jobs. You do not need your own clients to start.' },
      { q: 'How do I know I will get paid?', a: 'All fees go through RecXchange. The split is agreed upfront and handled by the platform.' },
      { q: 'What if my candidate does not get placed?', a: 'You only use one credit per submission. There is no extra charge if the placement does not happen.' },
    ]),
    showPricing: true,
    ctaText: 'Join and Start Earning',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start for $1. Your questions answered inside.',
  },

  // 12 — Social Proof
  {
    num: 12,
    title: 'RecXchange: What 17,000 recruiters already know.',
    preheader: 'They joined. They started earning. Here is what they found.',
    imageId: '1531482615714-37ea4a4f0f7c',
    imageAlt: 'Recruiters in a positive team discussion',
    pill: '17,000 RECRUITERS INSIDE',
    h1: 'What 17,000 recruiters already know that you do not.',
    sub: 'They joined. They started earning. Here is what they found.',
    bodyParas: [
      'When RecXchange launched, it had one goal: let recruiters earn more by working together.',
      '17,000 recruiters later, the platform is growing every week. Here is what they say makes the difference.',
    ],
    panelHtml: quotePanel([
      { text: 'I made my first placement within three weeks. The process was straightforward and the fee was paid on time.', attribution: 'Recruiter, UK' },
      { text: 'I had candidates sitting in my database who were not being used. RecXchange gave me somewhere to put them.', attribution: 'Recruiter, Australia' },
      { text: 'The $1 entry price felt too good to be true. Three months in, I am still paying $1 and still earning.', attribution: 'Recruiter, UAE' },
    ]),
    showPricing: true,
    ctaText: 'Join Them',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '17,000 recruiters and growing. Start for $1.',
  },

  // 13 — Tuesday Session
  {
    num: 13,
    title: 'RecXchange: See it live. This Tuesday.',
    preheader: 'Every Tuesday at 10:30am GMT. Real jobs. Real fees. Real questions answered.',
    imageId: '1553877522-43269d4ea984',
    imageAlt: 'Professional working at their computer with focus',
    pill: 'JOIN US LIVE',
    h1: 'See RecXchange working. Live. This Tuesday.',
    sub: 'Every Tuesday at 10:30am GMT, we run a live session for recruiters.',
    bodyParas: [
      'This is not a webinar. It is not a sales pitch.',
      'Every Tuesday at 10:30am GMT, Tom Andrews and the team go live inside RecXchange. They show real jobs, real fees and real submissions happening on the platform.',
      'Then they take questions. You can ask anything.',
    ],
    panelHtml: checklistPanel('What happens in the session:', [
      'Live jobs shown on screen with fees',
      'Real candidate submissions in real time',
      'How the fee split works, shown step by step',
      'Open Q&amp;A at the end. Any question welcome.',
    ]),
    showPricing: false,
    ctaText: 'Join This Tuesday',
    ctaUrl: 'https://www.youtube.com/watch?v=a6rjcP43t18',
    ctaSubtext: 'Every Tuesday at 10:30am GMT. Free to join.',
  },

  // 14 — Is It Right For You
  {
    num: 14,
    title: 'RecXchange: Is it right for you?',
    preheader: 'Here is an honest look at who gets the most from RecXchange.',
    imageId: '1499750310822-8f5b6a8c3c40',
    imageAlt: 'Professional working from a relaxed home setup',
    pill: 'IS THIS FOR YOU',
    h1: 'RecXchange is not for every recruiter. Is it for you?',
    sub: 'Here is an honest look at who gets the most from it.',
    bodyParas: [
      'We would rather you join knowing it is the right fit. So here is a straight answer on who RecXchange works best for.',
    ],
    panelHtml: checklistPanel('RecXchange works well if you:', [
      'Have candidates in your network or database who need placing',
      'Want to earn from jobs without having to find your own clients',
      'Work independently or in a small team',
      'Are open to collaborating with other recruiters',
      'Want to keep up to 70% of every fee you help create',
    ]),
    showPricing: true,
    ctaText: 'See If It Fits',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Try it. Cancel any time.',
  },

  // 15 — Why $1
  {
    num: 15,
    title: 'RecXchange: Why does it cost just $1?',
    preheader: 'It is not a trick. Here is the honest reason.',
    imageId: '1556742049-0cfed4f6a45d',
    imageAlt: 'Modern bright professional office',
    pill: 'WHY DOES IT COST $1',
    h1: 'Why does RecXchange cost just $1 a month?',
    sub: 'It is not a trick. Here is the honest reason.',
    bodyParas: [
      'When people see the $1 price, they ask if there is a catch. There is not.',
      'RecXchange earns from the platform fees when placements happen. The $1 is not how we make money. It is how we keep serious recruiters from the people who are just browsing.',
      'If you place even one person, the $1 pays for itself thousands of times over.',
    ],
    panelHtml: faqPanel([
      { q: 'Is there a free trial?', a: 'The Entry plan at $1 is effectively your trial. Join, look around and if it is not for you, cancel. No questions asked.' },
      { q: 'What do higher plans cost?', a: 'Lite is $99 a month with 150 credits. Pro is $249 with 400 credits. More credits means more submissions.' },
      { q: 'Can I upgrade later?', a: 'Yes. Start on Entry and upgrade any time inside your account.' },
    ]),
    showPricing: true,
    ctaText: 'Start for $1 Today',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'No contract. No catch. Cancel any time.',
  },

  // 16 — Roles in Your Sector
  {
    num: 16,
    title: 'RecXchange: Roles open in your sector right now.',
    preheader: 'Here are some examples of what is live on the platform this week.',
    imageId: '1600880292203-757bb62b4baf',
    imageAlt: 'Professional workspace with clear desk setup',
    pill: 'ROLES OPEN RIGHT NOW',
    h1: 'Jobs in your sector are open inside RecXchange right now.',
    sub: 'Here are some examples of what is live on the platform this week.',
    bodyParas: [
      'Every week, hundreds of roles are posted inside RecXchange by recruiters who need help filling them.',
      'Here is a sample of what is typically available. Fees shown are indicative.',
    ],
    panelHtml: rolesPanel([
      { role: 'Senior Software Engineer', sector: 'Technology', fee: '£8,000 to £12,000' },
      { role: 'Finance Manager', sector: 'Financial Services', fee: '£6,000 to £9,000' },
      { role: 'Head of Sales', sector: 'SaaS', fee: '£10,000 to £17,000' },
      { role: 'Operations Director', sector: 'Healthcare', fee: '£7,000 to £11,000' },
    ]),
    showPricing: true,
    ctaText: 'See All Live Roles',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ jobs open right now. Start for $1.',
  },

  // 17 — FOMO
  {
    num: 17,
    title: 'RecXchange: Every day you are not inside, this happens.',
    preheader: 'Other recruiters are filling the jobs you could be working.',
    imageId: '1565464027194-7bea3b8f7a09',
    imageAlt: 'Team celebrating a successful result together',
    pill: 'WHAT YOU ARE MISSING',
    h1: 'Every day you are not inside, this happens.',
    sub: 'Other recruiters are filling the jobs you could be working.',
    bodyParas: [
      'Right now, inside RecXchange, another recruiter is looking at a job that matches someone in your network.',
      'They will submit a candidate. If it places, they earn. You earn nothing, because you were not there.',
      'The jobs are not waiting for you. They are being filled every day.',
    ],
    panelHtml: checklistPanel('While you are waiting, others are:', [
      'Browsing 100+ live roles in your sector',
      'Submitting candidates and earning up to 70%',
      'Building relationships with other recruiters',
      'Growing their income without finding their own clients',
    ]),
    showPricing: false,
    ctaText: 'Stop Missing Out',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. See what is live right now.',
  },

  // 18 — Second Session Invite
  {
    num: 18,
    title: 'RecXchange: Join us live. See the fees.',
    preheader: 'Tuesday at 10:30am GMT. It is free. It takes one hour.',
    imageId: '1474631245212-32dc3c8310c6',
    imageAlt: 'Modern professional building and workspace',
    pill: 'LIVE THIS TUESDAY',
    h1: 'Join us live. See the fees. See the jobs. Ask anything.',
    sub: 'Tuesday at 10:30am GMT. It is free. It takes one hour.',
    bodyParas: [
      'The best way to understand RecXchange is to see it working. Not a recording. Live.',
      'Every Tuesday, Tom runs a session where he shows real jobs, real submissions and real earnings happening on the platform.',
      'You can join on YouTube. No account needed. Just show up and watch.',
    ],
    panelHtml: stepsPanel('What happens in the session:', [
      { title: 'Tom opens the platform live', desc: 'He shows the jobs board with real fees. You see exactly what is available.' },
      { title: 'He walks through a live submission', desc: 'You see exactly what happens step by step.' },
      { title: 'Open Q and A', desc: 'Ask anything. Get a straight answer.' },
    ]),
    showPricing: false,
    ctaText: 'Join This Tuesday',
    ctaUrl: 'https://www.youtube.com/watch?v=a6rjcP43t18',
    ctaSubtext: 'Tuesday at 10:30am GMT. Free on YouTube. No sign-up needed.',
  },

  // 19 — Scarcity
  {
    num: 19,
    title: 'RecXchange: These roles will not wait.',
    preheader: 'When a role is filled, it is gone. Over 100 jobs open right now.',
    imageId: '1582213782957-a34ecab5fd4a',
    imageAlt: 'Diverse group of business professionals',
    pill: 'THESE ROLES WILL NOT WAIT',
    h1: 'The jobs inside RecXchange do not stay open for long.',
    sub: 'When a role is filled, it is gone. Here is why that matters to you.',
    bodyParas: [
      'A recruiter posts a job on RecXchange. Other recruiters submit candidates. The best match gets placed. The job closes.',
      'That fee is gone. That opportunity is gone. The recruiter who moved fast earned.',
      'There are over 100 jobs open right now. Each one has a fee attached. How many will still be there next week?',
    ],
    panelHtml: faqPanel([
      { q: 'How long do jobs stay open?', a: 'It varies. Some roles are filled within days. Others take longer. But every day you wait is a day someone else could be earning from that role.' },
      { q: 'Can I see the jobs before I join?', a: 'A limited preview is available. But to see the full board with fees and submit candidates, you need to be inside.' },
    ]),
    showPricing: true,
    ctaText: 'See the Open Roles Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ live jobs. Start for $1 before they are filled.',
  },

  // 20 — Personal Close From Tom
  {
    num: 20,
    title: 'RecXchange: One last thing from Tom.',
    preheader: 'I built RecXchange because I saw too many good recruiters working alone.',
    imageId: '1493119508497-2b00fd57b5d1',
    imageAlt: 'A professional handshake sealing a deal',
    pill: 'FROM TOM ANDREWS',
    h1: 'One last thing from me.',
    sub: 'This is a personal note. Not a template.',
    bodyParas: [
      'I built RecXchange because I saw too many good recruiters working alone when they did not have to.',
      'The jobs are there. The candidates are there. The fees are there. The only thing missing is the connection between recruiters.',
      'That is what we built. And you can access all of it for $1 a month.',
      'If you have been thinking about joining and have not yet, I would ask you one thing. Just look inside. See the jobs. See the fees. If it is not for you, leave. But you will not know until you look.',
    ],
    panelHtml: checklistPanel('What is inside RecXchange:', [
      '100+ live jobs from recruiters who need your help',
      '270 million candidate profiles to search',
      'Up to 70% fee share on every placement you help make',
      'A network of 17,000 recruiters to partner with',
    ]),
    showPricing: true,
    ctaText: 'Look Inside RecXchange',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '$1 a month. Join today.',
  },

];

// ---------------------------------------------------------------------------
// Generate files
// ---------------------------------------------------------------------------

emails.forEach(cfg => {
  const filename = `cold-email-${String(cfg.num).padStart(2, '0')}.html`;
  const filepath  = path.join(OUT_DIR, filename);
  const html      = emailTemplate(cfg);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`Written: ${filename}`);
});

console.log(`\nDone. ${emails.length} files generated in ${OUT_DIR}`);
