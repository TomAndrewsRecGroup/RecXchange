/**
 * RecXchange Warm Email Generator
 * Generates warm-email-02.html through warm-email-15.html
 * (Email 01 is the shared cold pathway opener that everyone receives first)
 * Run: node emails/warm-pathway/_generate.js
 */

'use strict';

const fs   = require('fs');
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
    const bg    = circleColors[i] || '#F59E0B';
    const tc    = textColors[i]   || '#000000';
    const num   = i + 1;
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
                <tr><td style="font-size:13px;color:#22C55E;font-family:Arial,Helvetica,sans-serif;">&#10003;&nbsp; The fee shown on a role is what you earn</td></tr>
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
// Email configs (hot pathway, H01 through H14)
// ---------------------------------------------------------------------------

const emails = [

  // H01 — You looked inside RecXchange. Here is what to do next.
  {
    num: 1,
    title: 'RecXchange: You looked inside. Here is exactly what to do next.',
    preheader: 'You have seen the platform. The roles are still there. Here is the next step.',
    imageId: '1497366216548-37526070297c',
    imageAlt: 'Professional looking at a clear next step with confidence',
    pill: 'YOUR NEXT STEP',
    h1: 'You looked inside RecXchange. Here is what to do next.',
    sub: 'You have seen the platform. The roles are still there. Your first submission takes five minutes.',
    bodyParas: [
      'You clicked through. You saw the jobs board, the fees, the platform. Most people who do that are serious.',
      'The step between looking and earning is smaller than you think. It starts with one submission. One candidate. One role that fits.',
      'The fee on that role is your fee. Already worked out. No calculation needed. You submit, the candidate places, you get paid.',
    ],
    panelHtml: stepsPanel('Your three steps from here:', [
      { title: 'Step 1', desc: 'Join for $1. You get 5 credits included. No long setup.' },
      { title: 'Step 2', desc: 'Browse the jobs board. Find one role that matches someone in your network.' },
      { title: 'Step 3', desc: 'Submit the candidate. The fee shown on the role is paid to you when they place.' },
    ]),
    showPricing: true,
    ctaText: 'Complete Your Sign-Up Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Start for $1. Your first 5 credits are included.',
  },

  // H02 — The roles you looked at may still be open.
  {
    num: 2,
    title: 'RecXchange: The roles you looked at may still be open.',
    preheader: 'Live roles fill up. Check if yours are still there.',
    imageId: '1551288049-b1f366c92d8f',
    imageAlt: 'Professional checking live opportunities on a screen',
    pill: 'STILL LIVE',
    h1: 'The roles you looked at may still be open.',
    sub: 'Roles on RecXchange fill quickly. If you saw one that fits, now is the time.',
    bodyParas: [
      'When a candidate is placed, the role closes. The fee goes to the recruiter who submitted them. That recruiter is not you. Yet.',
      'If you found a role last time that looked right, it may still be there. Or there may be something better posted since you visited.',
      'Either way, the board refreshes regularly. What is there today will not all be there tomorrow.',
    ],
    panelHtml: statsPanel([
      { number: '100+',    label: 'Live Roles on the Board Right Now' },
      { number: '$850K+',  label: 'Total Fees Available to Recruiters' },
      { number: '$0.20',   label: 'Cost of One Candidate Submission' },
    ]),
    showPricing: true,
    ctaText: 'Check What Is Live Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Roles are closing. Start for $1.',
  },

  // H03 — You are five minutes away from your first live role.
  {
    num: 3,
    title: 'RecXchange: You are five minutes away from your first live role.',
    preheader: 'No long setup. No training. Just a sign-up and a search.',
    imageId: '1506784983877-45594efa4cbe',
    imageAlt: 'Professional completing a quick task with ease',
    pill: 'FIVE MINUTES',
    h1: 'You are five minutes away from your first live role.',
    sub: 'No long onboarding. No training course. Just a sign-up and a search of the live board.',
    bodyParas: [
      'We hear from recruiters who thought joining would take an hour of setup. It does not.',
      'You create an account. You are asked a few basic questions. Then you are on the jobs board.',
      'From there you search by sector, salary range, or location. You find a role. You submit a candidate. That is it.',
    ],
    panelHtml: checklistPanel('What happens the moment you join:', [
      'Immediate access to the full jobs board',
      '5 credits included with your first $1 payment',
      'No approval process. No waiting period.',
      'Browse all live roles and fees before you submit',
      'First submission in under an hour for most new members',
    ]),
    showPricing: true,
    ctaText: 'Sign Up in Five Minutes',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '$1 to start. Everything available from minute one.',
  },

  // H04 — While you are reading this, someone else is submitting.
  {
    num: 4,
    title: 'RecXchange: While you are reading this, someone else is submitting a candidate.',
    preheader: 'Every hour you wait is an hour another recruiter is getting ahead.',
    imageId: '1552664730-d307ca884978',
    imageAlt: 'Recruiter moving fast and staying ahead',
    pill: 'REAL TIME',
    h1: 'While you are reading this, someone else is submitting a candidate.',
    sub: 'Every hour you wait is an hour another recruiter is getting closer to your next placement fee.',
    bodyParas: [
      'Right now, inside RecXchange, recruiters are browsing the live board. Some are matching candidates. Some are submitting.',
      'When a role fills, it closes. The fee goes to whoever submitted the placed candidate. One submission. One result.',
      'You have seen what the platform looks like. The only thing between you and the next open role is the sign-up.',
    ],
    panelHtml: statsPanel([
      { number: '17,000+', label: 'Recruiters Active on the Platform' },
      { number: '100+',    label: 'Roles Live on the Board Right Now' },
      { number: '$0.20',   label: 'All It Costs to Submit' },
    ]),
    showPricing: true,
    ctaText: 'Join Before the Next Role Closes',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. Start for $1.',
  },

  // H05 — Here is exactly what you unlock the moment you join for $1.
  {
    num: 5,
    title: 'RecXchange: Here is exactly what you unlock the moment you join for $1.',
    preheader: 'Not a promise. A precise list of what is available from day one.',
    imageId: '1560472355-f3765ede46d2',
    imageAlt: 'Professional unlocking a new level of access and opportunity',
    pill: 'WHAT YOU GET',
    h1: 'Here is exactly what you unlock the moment you join for $1.',
    sub: 'No waiting. No approval. This is available to you from the moment your sign-up is complete.',
    bodyParas: [
      'Some platforms promise a lot and deliver slowly. We want to be specific about what you get on day one.',
      'The moment you complete your $1 sign-up, you have access to everything listed below. There is no gradual unlock. No hidden tier.',
    ],
    panelHtml: checklistPanel('Unlocked immediately on sign-up:', [
      'Full access to 100+ live roles and their fees',
      '5 submission credits included in your first $1',
      'Search across 270 million candidate profiles',
      'Collaborate with 17,000+ recruiters in the network',
      'The fee shown on every role is what you earn when you place',
    ]),
    showPricing: true,
    ctaText: 'Unlock Everything for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. Available from the moment you sign up.',
  },

  // H06 — Here is what your first week on RecXchange looks like.
  {
    num: 6,
    title: 'RecXchange: Here is what your first week looks like.',
    preheader: 'What most new members do in their first seven days.',
    imageId: '1507003211169-0a1dd7228f2d',
    imageAlt: 'Professional settling in and getting early results',
    pill: 'WEEK ONE',
    h1: 'Here is what your first week on RecXchange looks like.',
    sub: 'This is what most new members do in their first seven days on the platform.',
    bodyParas: [
      'We see the same pattern again and again. A recruiter joins, finds a match, submits. The first week moves quickly.',
      'By day seven, most active members have at least one submission in. Some have two or three. One credit per submission. $0.20 each.',
    ],
    panelHtml: stepsPanel('A typical first week:', [
      { title: 'Day 1',  desc: 'Join for $1. Browse the full jobs board. Find two or three roles that match your candidates.' },
      { title: 'Day 2',  desc: 'Call or message the candidates you have in mind. Check they are open to moving.' },
      { title: 'Day 3',  desc: 'Submit your first candidate. One credit used. Fee shown on the role is yours if they place.' },
      { title: 'Day 7',  desc: 'Most members have one to three submissions active. Some already have interview requests back.' },
    ]),
    showPricing: true,
    ctaText: 'Start Your First Week',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Your credits are waiting.',
  },

  // H07 — She looked at RecXchange twice before she joined. Then she earned $7,200.
  {
    num: 7,
    title: 'RecXchange: She looked twice before she joined. Then she earned $7,200.',
    preheader: 'A lot of our best members hesitated first. Here is one of their stories.',
    imageId: '1519389950473-47ba0277781c',
    imageAlt: 'Recruiter who made the decision and got a strong result',
    pill: 'SHE HESITATED TOO',
    h1: 'She looked at RecXchange twice before she joined. Then she earned $7,200.',
    sub: 'Many of our best members hesitated before signing up. Most say they wish they had joined sooner.',
    bodyParas: [
      'A recruiter in Sydney visited the platform twice. She read the emails, clicked through, looked at the board. She was not sure it was right for her.',
      'On her third visit she joined. She found a technology management role that matched a candidate she had placed two years before. She called him. He was open.',
      'She submitted on a Wednesday. The client booked an interview that Friday. Sixteen days later, he accepted the offer. She earned $7,200.',
      'She told us she only hesitated because it seemed too simple.',
    ],
    panelHtml: stepsPanel('Her timeline:', [
      { title: 'Monday',        desc: 'Joined for $1. Found a matching role within the hour.' },
      { title: 'Wednesday',     desc: 'Submitted a candidate from her existing network.' },
      { title: 'Friday',        desc: 'Client booked interview directly.' },
      { title: '16 days later', desc: 'Offer accepted. $7,200 earned.' },
    ]),
    showPricing: true,
    ctaText: 'Make This Your Story',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Your first match could be closer than you think.',
  },

  // H08 — Here is what is waiting for you on the other side of that sign-up.
  {
    num: 8,
    title: 'RecXchange: Here is what is waiting on the other side of the sign-up.',
    preheader: 'You have seen the outside. Here is a clear picture of what is on the inside.',
    imageId: '1560472354-3cbb3259b938',
    imageAlt: 'Professional stepping through to a new level of access',
    pill: 'ON THE INSIDE',
    h1: 'Here is what is waiting for you on the other side of that sign-up.',
    sub: 'You have seen the platform from the outside. Here is a clear picture of what you access the moment you join.',
    bodyParas: [
      'Over $850,000 in placement fees are live on the platform today. Each role shows you what you earn if your candidate gets placed. There is no guessing, no negotiation, no split discussion after the fact.',
      'You search the board, find a match, submit. If the candidate places, the fee shown is transferred to you.',
      'That is the inside. The only barrier between you and it is the sign-up.',
    ],
    panelHtml: statsPanel([
      { number: '$850K+',  label: 'In Live Fees Available Right Now' },
      { number: '17,000+', label: 'Recruiters Collaborating Inside' },
      { number: '270M',    label: 'Candidate Profiles to Search' },
    ]),
    showPricing: true,
    ctaText: 'Step Inside for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Everything above is available from the moment you sign up.',
  },

  // H09 — These roles are live right now. Your name is not on any of them. Yet.
  {
    num: 9,
    title: 'RecXchange: These roles are live right now. Your name is not on any of them. Yet.',
    preheader: 'Real fees. Real roles. Available to any recruiter who joins today.',
    imageId: '1573496799652-5b48d63d4bef',
    imageAlt: 'Live job board showing real open positions',
    pill: 'LIVE RIGHT NOW',
    h1: 'These roles are live right now. Your name is not on any of them. Yet.',
    sub: 'Every role below is open. Every fee is what you earn if you make the placement.',
    bodyParas: [
      'These are the types of roles on the board right now. Each one is open. Each one pays the fee shown to the recruiter who places the right candidate.',
      'Your name is not attached to any of them today. But it could be within the hour.',
    ],
    panelHtml: rolesPanel([
      { role: 'VP of Engineering',          sector: 'Technology',  location: 'Remote / US',    fee: '$9,800' },
      { role: 'Head of Sales',              sector: 'Commercial',  location: 'London, UK',     fee: '$7,350' },
      { role: 'Finance Director',           sector: 'Finance',     location: 'Singapore',      fee: '$8,400' },
      { role: 'Senior Data Scientist',      sector: 'Technology',  location: 'Remote / EU',    fee: '$6,300' },
      { role: 'Operations Manager',         sector: 'Operations',  location: 'Dubai, UAE',     fee: '$5,250' },
    ]),
    showPricing: true,
    ctaText: 'See All Live Roles',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. Browse the full board today.',
  },

  // H10 — You came this close. Do not let it be someone else's placement.
  {
    num: 10,
    title: 'RecXchange: You came this close. Do not let it be someone else\'s placement.',
    preheader: 'You clicked. You looked. You know this is real. What is the final reason?',
    imageId: '1504384119817-d8b7a6b13756',
    imageAlt: 'Professional at the moment of decision, close to the finish line',
    pill: 'THIS CLOSE',
    h1: 'You came this close. Do not let it be someone else\'s placement.',
    sub: 'You have already done the hard part: you looked at the platform and you know it is real.',
    bodyParas: [
      'You clicked through an email. You looked at the jobs board. You saw the fees. Most people who get that far know this is real.',
      'The role you looked at may still be open. The candidate you have in mind may still be available.',
      'Every day you wait is a day someone else could submit them first. The fee on that role goes to one recruiter. One submission.',
      'It could be yours.',
    ],
    panelHtml: checklistPanel('You have already confirmed:', [
      'RecXchange is a real platform with real fees',
      'The fee shown on any role is what you earn',
      'Joining costs $1 with 5 credits included',
      'Setup takes five minutes',
      'The roles you saw may still be live',
    ]),
    showPricing: true,
    ctaText: 'Complete Your Sign-Up Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: '$1 to start. Do not let the next fee go to someone else.',
  },

  // H11 — What would make this an easy yes?
  {
    num: 11,
    title: 'RecXchange: What would make this an easy yes for you?',
    preheader: 'We hear the same objections. Here is the honest answer to every one.',
    imageId: '1543269664-56d93a37a6c9',
    imageAlt: 'Professional having a clear and honest conversation',
    pill: 'HONEST ANSWERS',
    h1: 'What would make this an easy yes for you?',
    sub: 'You have seen the platform. Here are the honest answers to the things that make people pause.',
    bodyParas: [
      'You have clicked through at least once. That means something is close. Here are the most common reasons people pause, and our honest answers to each one.',
    ],
    panelHtml: faqPanel([
      { q: 'What if I join and do not find any matching roles?', a: 'Browse the jobs board before you commit to payment. If you can not see a match from the preview, do not join yet. Come back when you have a candidate in mind. You risk nothing.' },
      { q: 'What if the fee is not paid after a placement?', a: 'All fees are agreed upfront and managed through the platform. There is no informal arrangement. The payment process is built in. You do not chase anyone.' },
      { q: 'I do not know how to use a new platform.', a: 'The setup takes five minutes. Most members submit their first candidate within 24 hours. There is no training required. If you get stuck, support is one message away.' },
      { q: 'Is $1 really all it costs to start?', a: 'Yes. The Entry plan is $1 a month. It includes 5 submission credits. There is no hidden setup fee or minimum commitment. Cancel any time.' },
    ]),
    showPricing: true,
    ctaText: 'Join for $1 and See for Yourself',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Cancel any time. No long contract.',
  },

  // H12 — Tom here. Can I ask you something?
  {
    num: 12,
    title: 'RecXchange: Tom here. Can I ask you something?',
    preheader: 'A personal note from the founder. One question.',
    imageId: '1537511446880-65695f3cb2ac',
    imageAlt: 'Founder speaking directly and personally',
    pill: 'FROM TOM ANDREWS',
    h1: 'Tom here. Can I ask you something?',
    sub: 'A personal note from the founder of RecXchange.',
    bodyParas: [
      'You have clicked through at least once. That tells me you saw something in what we are building.',
      'My question is simple: what is the one thing that would make this an easy yes?',
      'If it is the fee structure, I want to explain it clearly. If it is trust in the platform, I want to show you exactly how payments work. If it is time, I want to show you this takes five minutes to set up.',
      'Or if you are just ready, the link below takes you straight to the sign-up. $1. Five credits. Everything live from minute one.',
      'Whatever the reason, I want to help you get to your first placement. That is what the platform is built for.',
    ],
    panelHtml: checklistPanel('Everything waiting for you right now:', [
      '$850,000+ in live fees on the board',
      '17,000+ recruiters ready to collaborate',
      '270 million candidate profiles to search',
      'The fee shown on every role is what you earn',
      'Your first month: $1',
    ]),
    showPricing: true,
    ctaText: 'Join RecXchange for $1',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. Tom and the team are here if you need anything.',
  },

  // H13 — Last reminder. These roles are live right now.
  {
    num: 13,
    title: 'RecXchange: These roles are live right now. This is your last reminder.',
    preheader: 'One final look at what is on the board. After this we will stop sending.',
    imageId: '1486312338219-ce68d2c6f44d',
    imageAlt: 'Professional reviewing final opportunity before a closing deadline',
    pill: 'LAST REMINDER',
    h1: 'These roles are live right now. This is your last reminder.',
    sub: 'We are sending one final message. These roles are on the board today. After this we will not follow up.',
    bodyParas: [
      'You have seen the platform. You know how it works. We are not going to keep sending emails to convince you.',
      'What we will do is show you one more time what is live on the board right now. If any of these roles match someone in your network, the next step is a $1 sign-up and a single submission.',
    ],
    panelHtml: rolesPanel([
      { role: 'Chief Technology Officer',   sector: 'Technology',  location: 'Remote / Global', fee: '$11,200' },
      { role: 'Commercial Director',        sector: 'Commercial',  location: 'New York, US',    fee: '$9,100' },
      { role: 'Head of Finance',            sector: 'Finance',     location: 'Amsterdam, NL',   fee: '$7,700' },
      { role: 'Senior Software Engineer',   sector: 'Technology',  location: 'Remote / APAC',   fee: '$5,600' },
      { role: 'HR Business Partner',        sector: 'HR',          location: 'London, UK',      fee: '$4,900' },
    ]),
    showPricing: true,
    ctaText: 'See All Live Roles Now',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'Join for $1. This is the last reminder we will send.',
  },

  // H14 — This is the last email.
  {
    num: 14,
    title: 'RecXchange: This is the last email. One thing before we go.',
    preheader: 'We will stop here. But the platform stays open.',
    imageId: '1524178232363-1fb2b075b655',
    imageAlt: 'Professional making a final clear decision',
    pill: 'FINAL MESSAGE',
    h1: 'This is the last email. One thing before we go.',
    sub: 'We will not send any more after this. The platform stays open whenever you are ready.',
    bodyParas: [
      'This is the last email in this sequence.',
      'If RecXchange is not right for you right now, that is fine. The door stays open. You can join any time at app.recxchange.io.',
      'If you are ready, the sign-up takes five minutes and costs $1. Five credits are included. The jobs board is live.',
      'Whatever you decide, thank you for the time you gave us.',
    ],
    panelHtml: checklistPanel('If you are ready, here is what happens next:', [
      'Sign up at app.recxchange.io for $1',
      'Get 5 submission credits immediately',
      'Browse 100+ live roles and their fees',
      'Submit a candidate. The fee shown is yours when they place.',
      'No contract. Cancel any time.',
    ]),
    showPricing: true,
    ctaText: 'Join RecXchange When You Are Ready',
    ctaUrl: 'https://app.recxchange.io',
    ctaSubtext: 'app.recxchange.io. The platform stays open.',
  },

];

// ---------------------------------------------------------------------------
// Generate files
// ---------------------------------------------------------------------------

emails.forEach(cfg => {
  const filename = `hot-email-${String(cfg.num).padStart(2, '0')}.html`;
  const filepath  = path.join(OUT_DIR, filename);
  const html      = emailTemplate(cfg);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`Written: ${filename}`);
});

console.log(`\nDone. ${emails.length} files generated in ${OUT_DIR}`);
