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
// Warm pathway email configs (02–15)
// ---------------------------------------------------------------------------


const emails = [

  // W02 — Real Result, Real Numbers
  {
    num: 2,
    title: 'RecXchange: A recruiter earned $6,300 last week.',
    preheader: 'You know what RecXchange does. Here is what it looks like in real money.',
    imageId: '1579621970563-994dde03b523',
    imageAlt: 'Professional celebrating a successful placement result',
    pill: 'REAL RESULTS | LAST WEEK',
    h1: 'A recruiter placed last week. Here is exactly what they earned.',
    sub: 'You know what RecXchange does. This is what it looks like in real money.',
    bodyParas: [
      'Last week, a recruiter inside RecXchange submitted a candidate for a technology leadership role. The placement fee was $9,000. They had never met the client. They found the role on the platform, matched it to someone in their network, and submitted.',
      'The candidate got the job. The recruiter earned $6,300 at 70%.',
      'Total cost to make that happen: $0.20. One credit. One submission.',
    ],
    panelHtml: statsPanel(
      [
        { number: '$9,000', label: 'Total Placement Fee' },
        { number: '$6,300', label: 'Earned by the Recruiter at 70%' },
        { number: '$0.20', label: 'Cost of One Credit Used' },
      ],
      'Based on a real platform placement. Individual results will vary.'
    ),
    showPricing: true,
    ctaText: 'See the Roles Available Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start for $1. Your first 5 credits are included.',
  },

  // W03 — The ROI Is Impossible to Ignore
  {
    num: 3,
    title: 'RecXchange: You spend $1. You can earn $6,300.',
    preheader: 'No other platform in recruitment comes close to this return.',
    imageId: '1611974789855-9c2a0a7236a3',
    imageAlt: 'Strong financial returns shown clearly',
    pill: 'THE ROI',
    h1: 'You spend $1. You can earn $6,300. That is the maths.',
    sub: 'No other platform in recruitment comes close to this return.',
    bodyParas: [
      'The Entry plan is $1 a month. That gives you 5 credits. Each credit costs $0.20.',
      'Use one credit to submit a candidate. If they place at 70% of a $9,000 fee, you earn $6,300.',
      'Even if only one in five submissions leads to a placement, the return is still extraordinary. There is no recruitment platform with a better ROI than this.',
    ],
    panelHtml: statsPanel(
      [
        { number: '$0.20', label: 'Cost Per Submission' },
        { number: '$6,300', label: 'Average Earn at 70%' },
        { number: '630,000%', label: 'ROI on One Credit' },
      ],
      'ROI calculated on one $0.20 credit vs a $6,300 earn. Your results will vary.'
    ),
    showPricing: true,
    ctaText: 'Get Your First 5 Credits for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io',
  },

  // W04 — Collaboration Story
  {
    num: 4,
    title: 'RecXchange: One job. Three recruiters. Everyone earned.',
    preheader: 'This is how RecXchange collaboration works in practice.',
    imageId: '1529156069898-49953e39b3ac',
    imageAlt: 'Three professionals collaborating and celebrating a win',
    pill: 'COLLABORATION STORY',
    h1: 'One job. Three recruiters involved. Everyone came out ahead.',
    sub: 'This is how RecXchange collaboration works in practice.',
    bodyParas: [
      'A recruiter posted a $12,000 finance role on RecXchange. They needed the right candidate fast and opened it to the network.',
      'Two other recruiters submitted candidates. One candidate got the job. The placement happened in 11 days.',
      'The recruiter who submitted the winning candidate earned $8,400. The recruiter who posted the job earned $3,600. The client got their hire. Everyone won.',
    ],
    panelHtml: stepsPanel('How it played out:', [
      { title: 'Day 1', desc: 'Finance role posted on RecXchange with a $12,000 fee. Open to all recruiters on the platform.' },
      { title: 'Day 4', desc: 'Two candidate submissions received from recruiters in the network.' },
      { title: 'Day 11', desc: 'Offer made and accepted. Fee split automatically. $8,400 to the submitter. $3,600 to the poster.' },
    ]),
    showPricing: true,
    ctaText: 'See How You Can Join This',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start collaborating for $1 a month.',
  },

  // W05 — Speed Story: Interview in 48 Hours
  {
    num: 5,
    title: 'RecXchange: The interview was booked in 48 hours.',
    preheader: 'When the right candidate meets the right role, things move fast.',
    imageId: '1568992687947-868a62a9f521',
    imageAlt: 'Professional moving fast and getting results',
    pill: '48 HOURS',
    h1: 'The interview was booked 48 hours after submission.',
    sub: 'When the right candidate meets the right role, things move fast.',
    bodyParas: [
      'A recruiter submitted a candidate for a sales leadership role on a Tuesday morning. By Thursday, the client had reviewed the submission and booked an interview.',
      'The candidate got the job. The placement fee was $8,000. The recruiter who submitted earned $5,600.',
      'From submission to interview: 48 hours. That is the speed RecXchange is built for.',
    ],
    panelHtml: checklistPanel('The timeline:', [
      'Submitted Tuesday morning',
      'Client reviewed and booked interview by Thursday',
      'Offer made within two weeks',
      '$5,600 earned by the submitting recruiter',
      'Total cost of submission: $0.20',
    ]),
    showPricing: true,
    ctaText: 'Submit Your First Candidate',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ live roles waiting. Start for $1.',
  },

  // W06 — Billing Without Clients
  {
    num: 6,
    title: 'RecXchange: Billing $50,000 without a single new client.',
    preheader: 'They are not working harder. They are using other people\'s client relationships.',
    imageId: '1573496799652-5b48d63d4bef',
    imageAlt: 'Confident professional achieving results independently',
    pill: 'NO CLIENTS NEEDED',
    h1: 'Recruiters are billing $50,000 and more without a single new client.',
    sub: 'They are not working harder. They are using other people\'s client relationships.',
    bodyParas: [
      'The traditional model says: find a client, win the brief, fill the job, get paid. That works. But it is slow and expensive.',
      'RecXchange removes the client development step entirely. The clients are already there. The jobs are already posted. You bring the candidates.',
      'Recruiters who use this model are billing $50,000, $100,000 and more per year through the platform. No cold calls. No business development spend. No waiting months for a relationship to pay off.',
    ],
    panelHtml: checklistPanel('What changes when you join:', [
      'No client development needed. The jobs are already there.',
      'Browse 100+ live roles with fees shown',
      'Submit candidates and earn up to 70%',
      'Scale your billings without scaling your business',
      'Keep the majority of every fee you help create',
    ]),
    showPricing: true,
    ctaText: 'See the Live Job Board',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ open roles. Start for $1.',
  },

  // W07 — Your Network Has Value
  {
    num: 7,
    title: 'RecXchange: That candidate could be worth $6,000 today.',
    preheader: 'Most recruiters have great people sitting unused. RecXchange fixes that.',
    imageId: '1472099645785-5658abf4ff4e',
    imageAlt: 'Confident professional realising the value of their connections',
    pill: 'YOUR NETWORK HAS VALUE',
    h1: 'That candidate you spoke to last month could be worth $6,000 to you today.',
    sub: 'Most recruiters have great people sitting unused in their network. RecXchange fixes that.',
    bodyParas: [
      'Think about the last three people you had a strong conversation with. People who are good at what they do. People who might be open to the right role.',
      'Inside RecXchange, there are over 100 jobs those people could be right for. Each one has a fee. You earn up to 70% when your candidate gets placed.',
      'Your network is not just useful for your own roles. On RecXchange, it is an asset on every single job posted by 17,000 other recruiters.',
    ],
    panelHtml: statsPanel([
      { number: '100+', label: 'Live Jobs Your Candidates Could Fit' },
      { number: '$7,000', label: 'Average Fee Per Placement' },
      { number: '70%', label: 'Maximum Share You Keep' },
    ]),
    showPricing: true,
    ctaText: 'Match Your Candidates to Live Jobs',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Search the board from day one.',
  },

  // W08 — Success Story: Monday to Placement
  {
    num: 8,
    title: 'RecXchange: She joined Monday. Placed 16 days later.',
    preheader: 'From a candidate she already knew. On a role she found that morning.',
    imageId: '1519389950473-47ba0277781c',
    imageAlt: 'Recruiter achieving a great result from their home setup',
    pill: 'SUCCESS STORY',
    h1: 'She joined on a Monday. She made a placement 16 days later.',
    sub: 'From a candidate she already knew. On a role she found that morning.',
    bodyParas: [
      'A recruiter in Australia joined RecXchange on a Monday. She browsed the jobs board and found a technology management role that matched someone she had placed two years before.',
      'She called him. He was open to moving. She submitted him on Wednesday.',
      'The client fast-tracked an interview on Friday. Two weeks later, he accepted an offer. She earned $7,200.',
      'Monday to placement: 16 days. Using a candidate she already had in her network.',
    ],
    panelHtml: stepsPanel('Her story:', [
      { title: 'Monday', desc: 'Joined RecXchange. Found a matching role on the jobs board within the hour.' },
      { title: 'Wednesday', desc: 'Called a candidate from her existing network. Submitted him for the role.' },
      { title: '16 days later', desc: 'Placement confirmed. Offer accepted. $7,200 earned.' },
    ]),
    showPricing: true,
    ctaText: 'Find Your First Match',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '100+ open roles. Start for $1.',
  },

  // W09 — Live Platform Numbers
  {
    num: 9,
    title: 'RecXchange: $850,000 in fees. All available to you.',
    preheader: 'These are not projections. These are the real numbers from inside the platform.',
    imageId: '1551288049-b1f366c92d8f',
    imageAlt: 'Live data dashboard showing strong platform activity',
    pill: 'LIVE PLATFORM DATA',
    h1: '$850,000 in fees. 17,000 recruiters. 100+ live jobs. All available to you.',
    sub: 'These are not projections. These are the real numbers from inside the platform right now.',
    bodyParas: [
      'RecXchange is not a startup promise. It is a working platform with active recruiters and live fees.',
      'Over $850,000 in placement fees are available right now. 17,000 recruiters are using the platform. New jobs are posted every week from clients all over the world.',
      'You have been watching from the outside. This is what is on the inside.',
    ],
    panelHtml: statsPanel([
      { number: '$850K+', label: 'Total Fees Available on the Platform' },
      { number: '17,000+', label: 'Active Recruiters Inside' },
      { number: '270M', label: 'Candidate Profiles to Search' },
    ]),
    showPricing: true,
    ctaText: 'Access the Platform for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Everything above is available from day one.',
  },

  // W10 — The $1 Is Not the Point
  {
    num: 10,
    title: 'RecXchange: Forget the $1. Think about what is behind it.',
    preheader: 'The entry price is small. The opportunity behind it is not.',
    imageId: '1598257688879-56dd1d6c3bb3',
    imageAlt: 'Professional making a confident and considered decision',
    pill: 'THE REAL VALUE',
    h1: 'Forget the $1. Think about what is on the other side of it.',
    sub: 'The entry price is small. The opportunity behind it is not.',
    bodyParas: [
      'We charge $1 a month for the Entry plan. We know that seems low. Some people wonder if it is serious.',
      'The $1 is not the product. The product is access to $850,000 in live fees, 17,000 recruiters ready to collaborate, and 270 million candidate profiles.',
      'You are not paying $1 for a tool. You are paying $1 for a seat at the table where the real earnings happen.',
    ],
    panelHtml: checklistPanel('What $1 a month gets you:', [
      '$850,000+ in live fees available to work',
      '17,000+ recruiters to collaborate with',
      '270 million candidate profiles to search',
      'Up to 70% of every fee you help create',
      'No long contract. Cancel any time.',
    ]),
    showPricing: true,
    ctaText: 'Get Your Seat for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. No contract. No catch.',
  },

  // W11 — Answer the Real Objections
  {
    num: 11,
    title: 'RecXchange: What is actually stopping you?',
    preheader: 'We hear the same reasons. Here is the honest answer to each one.',
    imageId: '1543269664-56d93a37a6c9',
    imageAlt: 'Professional working through a decision with confidence',
    pill: 'LET US BE DIRECT',
    h1: 'You have seen what RecXchange offers. What is stopping you?',
    sub: 'We hear the same reasons. Here is the honest answer to each one.',
    bodyParas: [
      'Most recruiters who have not joined yet have one of three reasons. Here is what we hear, and what we say back.',
    ],
    panelHtml: faqPanel([
      { q: 'I do not have time to learn a new platform.', a: 'The setup takes 2 minutes. Most recruiters submit their first candidate within 24 hours of joining. There is no long onboarding process.' },
      { q: 'I am not sure my candidates will match the roles.', a: 'Browse the full jobs board before you commit. If you see a match, join and submit. If not, cancel. You risk $1.' },
      { q: 'I tried something similar before and it did not work.', a: 'RecXchange is built specifically for fee-sharing between recruiters. Fees are agreed upfront. Splits are fixed. All payments go through the platform. Nothing is left informal.' },
    ]),
    showPricing: true,
    ctaText: 'Join and See for Yourself',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '$1 to access everything. Cancel any time.',
  },

  // W12 — From Doubt to Placement
  {
    num: 12,
    title: 'RecXchange: He was not sure. Then he earned $5,400.',
    preheader: 'Most recruiters feel unsure before they join. Most change their mind fast.',
    imageId: '1504384119817-d8b7a6b13756',
    imageAlt: 'Recruiter who took the step and got results',
    pill: 'FROM DOUBT TO PLACEMENT',
    h1: 'He was not sure it would work. Then he earned $5,400.',
    sub: 'Most recruiters feel unsure before they join. Most change their mind fast.',
    bodyParas: [
      'A recruiter in the UK had been watching RecXchange for a few weeks. He had never shared a fee before and was not sure collaboration would work for him.',
      'He joined on a Friday and spent an hour on the platform. He found three roles that matched candidates he had spoken to in the past six months.',
      'He submitted one. It placed three weeks later. He earned $5,400.',
      'He has made four more placements through the platform since then. His monthly cost: $1.',
    ],
    panelHtml: checklistPanel('His results:', [
      'Joined on a Friday. Submitted his first candidate that evening.',
      'First placement in 3 weeks. Earned $5,400.',
      'Four more placements since then.',
      'Total spent on membership: $12 in the first year.',
    ]),
    showPricing: true,
    ctaText: 'Start Your Own Story',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Your first result could be sooner than you think.',
  },

  // W13 — The Maths That Makes It Simple
  {
    num: 13,
    title: 'RecXchange: One placement. 408 years of membership covered.',
    preheader: 'We are not exaggerating. Here is the breakdown.',
    imageId: '1505373877841-8d25f7d46678',
    imageAlt: 'Professional reviewing clear and compelling numbers',
    pill: 'THE MATHS',
    h1: 'One placement pays for over 400 years of RecXchange membership.',
    sub: 'We are not exaggerating. Here is the breakdown.',
    bodyParas: [
      'The Entry plan costs $1 a month. That is $12 a year.',
      'One placement at 70% of a $7,000 fee earns you $4,900. Divide $4,900 by $12 and you get 408 years of membership covered by a single placement.',
      'Even if your first placement takes six months to happen, you will have spent $6. You will have earned $4,900. The question is not whether it is worth it. The question is how many placements you want to make.',
    ],
    panelHtml: statsPanel(
      [
        { number: '$12', label: 'Cost Per Year on Entry Plan' },
        { number: '$4,900', label: 'Earned From One Placement at 70%' },
        { number: '408', label: 'Years of Membership From One Placement' },
      ],
      'Based on a $7,000 average fee at 70%. Your results will vary.'
    ),
    showPricing: true,
    ctaText: 'Make It the Best $1 You Spend',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. Join today.',
  },

  // W14 — See It Live
  {
    num: 14,
    title: 'RecXchange: See it live this Tuesday.',
    preheader: 'Real jobs. Real fees. Real submissions. Live on YouTube. Free to join.',
    imageId: '1524178232363-1fb2b075b655',
    imageAlt: 'Live professional session with an engaged audience',
    pill: 'LIVE THIS TUESDAY',
    h1: 'Come and see RecXchange working live. This Tuesday at 10:30am GMT.',
    sub: 'Not a webinar. Not a pitch. Just the platform open on screen with real jobs and real fees.',
    bodyParas: [
      'Every Tuesday, Tom Andrews goes live on YouTube. He opens RecXchange and shows everything in real time.',
      'Real jobs on the board. Real fees shown clearly. A live candidate submission walked through step by step. Then open Q and A.',
      'If you have been on the fence, this session usually settles it. No account needed. Just show up.',
    ],
    panelHtml: checklistPanel('What happens in the session:', [
      'The live jobs board shown on screen with fees',
      'A real candidate submission completed step by step',
      'How the fee split works, demonstrated live',
      'Open Q and A at the end. Any question welcome.',
      'Free to attend. No sign-up needed. Just join on YouTube.',
    ]),
    showPricing: false,
    ctaText: 'Join This Tuesday',
    ctaUrl: 'https://www.youtube.com/watch?v=a6rjcP43t18',
    ctaSubtext: 'Every Tuesday at 10:30am GMT. Free on YouTube.',
  },

  // W15 — Personal Close From Tom
  {
    num: 15,
    title: 'RecXchange: A personal message from Tom.',
    preheader: 'I am going to keep this short. But I wanted to say one thing first.',
    imageId: '1537511446880-65695f3cb2ac',
    imageAlt: 'Founder making a personal and direct connection',
    pill: 'FROM TOM ANDREWS',
    h1: 'I am going to keep this short.',
    sub: 'A personal message from the founder.',
    bodyParas: [
      'You have seen what RecXchange does. You have seen the fees. You have seen what other recruiters are earning.',
      'I built this because I believe recruiters work better together than apart. The jobs are real. The fees are real. The people inside are real.',
      'If there is still something stopping you, come and talk to me live on Tuesday. Or just try it for $1 and see for yourself.',
      'I hope the next placement you make is with us.',
    ],
    panelHtml: checklistPanel('Everything waiting for you inside:', [
      '$850,000+ in live fees on the platform',
      '17,000+ recruiters ready to collaborate',
      '270 million candidate profiles to search',
      'Up to 70% of every fee you help create',
      'Your first month: $1',
    ]),
    showPricing: true,
    ctaText: 'Join RecXchange for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. This is the last email in this sequence.',
  },

];

// ---------------------------------------------------------------------------
// Generate files
// ---------------------------------------------------------------------------

emails.forEach(cfg => {
  const filename = `warm-email-${String(cfg.num).padStart(2, '0')}.html`;
  const filepath  = path.join(OUT_DIR, filename);
  const html      = emailTemplate(cfg);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`Written: ${filename}`);
});

console.log(`\nDone. ${emails.length} files generated in ${OUT_DIR}`);
