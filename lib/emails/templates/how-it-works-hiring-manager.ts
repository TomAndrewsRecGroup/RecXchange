/**
 * How It Works - Hiring Manager Email Template
 *
 * Purpose: Convert hiring managers to book a meeting through premium design and sales psychology
 * Focus: Risk reversal, social proof, scarcity, urgency, clear value proposition
 * Trigger: User clicks "How Does It Work?" button on hiring-manager-home page
 *
 * Design: Matches dark theme of how-it-works-recruiter.ts (bg #0a0a0a, purple/blue palette)
 */

export function generateHowItWorksHiringManagerEmail(firstName: string): string {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>How Top Companies Are Hiring 40% Faster</title>
  <!--[if mso]>
  <style type="text/css">
    * { font-family: sans-serif !important; }
  </style>
  <![endif]-->
  <!--[if !mso]><!-->
  <style>
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding: 20px 16px !important; }
      .mobile-text { font-size: 22px !important; }
    }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a; min-height: 100%;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px; background: #0a0a0a;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;" class="mobile-padding">
              <img src="${LOGO_URL}" alt="RecXchange" width="180" style="max-width: 180px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800; line-height: 1.2;" class="mobile-text">How Top Companies Are Hiring 40% Faster</h1>
              <p style="margin: 12px 0 0 0; color: rgb(168, 85, 247); font-size: 16px; font-weight: 600;">The executive guide to RecX Direct</p>
              <p style="margin: 8px 0 0 0; color: #888; font-size: 14px;">Personalised for ${firstName || 'you'}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 24px;" class="mobile-padding">

              <!-- Greeting -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Hi${firstName ? ` ${firstName}` : ''} 👋</h2>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;">You're evaluating whether RecX Direct is the right hiring solution for your organisation. Smart move. This decision will impact your team's performance for years to come.</p>
                    <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0;">Here's everything you need to make an informed decision in the next <strong style="color: rgb(59, 130, 246);">10 minutes</strong>.</p>
                  </td>
                </tr>
              </table>

              <!-- Social Proof Banner -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 6px 0;">🏆 <strong>247 companies</strong> have hired through RecX Direct in the last 90 days</p>
                    <p style="color: #888; font-size: 13px; margin: 0;">Average time-to-offer: <strong style="color: rgb(59, 130, 246);">12 days</strong> &nbsp;&bull;&nbsp; Average fee: <strong style="color: rgb(168, 85, 247);">14.5%</strong> (vs industry 25%+)</p>
                  </td>
                </tr>
              </table>

              <!-- The Problem -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase;">⚠️ Traditional Recruitment Is Costing You More Than You Think</h2>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 0 0 10px 0;">
                                <p style="color: #f87171; font-size: 15px; font-weight: 700; margin: 0 0 2px 0;">❌ 25–30% fees</p>
                                <p style="color: #888; font-size: 13px; margin: 0;">($25,000 on a $100k hire)</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 10px 0;">
                                <p style="color: #f87171; font-size: 15px; font-weight: 700; margin: 0 0 2px 0;">❌ 45–60 day hiring cycles</p>
                                <p style="color: #888; font-size: 13px; margin: 0;">(Lost productivity: $15,000+)</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 10px 0;">
                                <p style="color: #f87171; font-size: 15px; font-weight: 700; margin: 0 0 2px 0;">❌ Spam from 50+ agencies</p>
                                <p style="color: #888; font-size: 13px; margin: 0;">(Hours wasted screening)</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color: #f87171; font-size: 15px; font-weight: 700; margin: 0 0 2px 0;">❌ Exclusive retainers</p>
                                <p style="color: #888; font-size: 13px; margin: 0;">(Pay upfront, limited pool)</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0; font-style: italic;">For a company making 10 hires per year at $100k average salary, you're spending <strong style="color: #f87171;">$249,000 in recruitment fees alone</strong>. Plus lost productivity from slow fills.</p>
                  </td>
                </tr>
              </table>

              <!-- The Solution -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <p style="color: rgb(168, 85, 247); font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">💎 Smart Alternative</p>
                    <h2 style="color: #fff; font-size: 24px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase;">RecX Direct: Hire Smarter</h2>

                    <!-- Benefit 1 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="36" style="vertical-align: top; padding-right: 12px; font-size: 22px;">💰</td>
                              <td style="vertical-align: top;">
                                <p style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">12–18% fees (vs 25–30%)</p>
                                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Save $7,000 to $12,000 per hire. Set your own fee. Pay only on successful placement.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 2 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; margin-bottom: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="36" style="vertical-align: top; padding-right: 12px; font-size: 22px;">⚡</td>
                              <td style="vertical-align: top;">
                                <p style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">First candidates in 48 hours</p>
                                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">15,000+ recruiters compete for your role. Average time-to-offer: 12 days (vs 45–60 days).</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 3 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="36" style="vertical-align: top; padding-right: 12px; font-size: 22px;">🎯</td>
                              <td style="vertical-align: top;">
                                <p style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">One dedicated account manager</p>
                                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">No agency spam. No juggling emails. One point of contact manages everything.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Benefit 4 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="36" style="vertical-align: top; padding-right: 12px; font-size: 22px;">✅</td>
                              <td style="vertical-align: top;">
                                <p style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">Zero upfront costs</p>
                                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">No retainers. No subscriptions. No exclusivity. Post unlimited roles free. Cancel anytime.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ROI Calculator -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase;">💷 Your ROI in Real Numbers</h2>

                    <!-- Traditional -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 12px; margin-bottom: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="color: #f87171; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 8px 0;">Traditional Agency</p>
                          <p style="color: #e5e5e5; font-size: 15px; margin: 0 0 4px 0;">25% fee &times; $100k salary = <strong style="font-size: 18px; color: #f87171;">$25,000</strong></p>
                          <p style="color: #888; font-size: 13px; margin: 0;">+ 45 days time-to-offer</p>
                        </td>
                      </tr>
                    </table>

                    <!-- RecX Direct -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="color: rgb(168, 85, 247); font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 8px 0;">RecX Direct</p>
                          <p style="color: #e5e5e5; font-size: 15px; margin: 0 0 4px 0;">15% fee &times; $100k salary = <strong style="font-size: 18px; color: rgb(168, 85, 247);">$15,000</strong></p>
                          <p style="color: #888; font-size: 13px; margin: 0;">+ 12 days time-to-offer</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Savings callout -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%); border: 2px solid rgba(59, 130, 246, 0.4); border-radius: 12px;">
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <p style="color: #888; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px 0;">You save per hire</p>
                          <p style="color: rgb(59, 130, 246); font-size: 36px; font-weight: 900; margin: 0 0 6px 0;">$10,000</p>
                          <p style="color: #aaa; font-size: 14px; font-weight: 600; margin: 0;">10 hires per year = <strong style="color: rgb(168, 85, 247); font-size: 18px;">$100,000 saved</strong></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- How It Works -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase;">⚡ How It Works (3 Simple Steps)</h2>

                    <!-- Step 1 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" style="width: 40px; height: 40px;">
                            <tr>
                              <td style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(168, 85, 247), rgb(59, 130, 246)); border-radius: 50%; text-align: center; vertical-align: middle;">
                                <span style="color: #fff; font-weight: 900; font-size: 18px; line-height: 40px; display: block;">1</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 8px 0;">📅 Book a 15-Minute Strategy Call</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">We'll analyse your hiring needs, map your ideal candidate profile, and show you exactly how RecX Direct will save you time and money.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 2 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" style="width: 40px; height: 40px;">
                            <tr>
                              <td style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(59, 130, 246), rgb(168, 85, 247)); border-radius: 50%; text-align: center; vertical-align: middle;">
                                <span style="color: #fff; font-weight: 900; font-size: 18px; line-height: 40px; display: block;">2</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 8px 0;">📤 Post Your First Role (Free)</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Takes 3 minutes. Your dedicated account manager will immediately start coordinating with our 15,000+ recruiter network.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 3 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" style="width: 40px; height: 40px;">
                            <tr>
                              <td style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(168, 85, 247), rgb(59, 130, 246)); border-radius: 50%; text-align: center; vertical-align: middle;">
                                <span style="color: #fff; font-weight: 900; font-size: 18px; line-height: 40px; display: block;">3</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 8px 0;">✅ Review Pre-Vetted Candidates (48hrs)</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Get shortlisted candidates within 2 days. Interview the best. Hire your pick. Pay one fee when they start.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Risk Reversal -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px 28px; text-align: center;">
                    <p style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">🛡️ 100% Risk-Free Guarantee</p>
                    <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Post your first role completely free. If you don't receive qualified candidates within 48 hours, we'll personally source 3 candidates for you at no cost.</p>
                  </td>
                </tr>
              </table>

              <!-- Social Proof -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 20px; font-weight: 800; margin: 0 0 20px 0; text-align: center;">What Leaders Like You Are Saying</h2>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border-left: 3px solid rgb(168, 85, 247); border-radius: 0 12px 12px 0; margin-bottom: 14px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; font-style: italic; margin: 0 0 8px 0;">&ldquo;We went from offer to acceptance in 8 days. The senior recruiters we worked with really understood our technical requirements. Having 400+ recruiters working on our role gave us options no single agency could provide.&rdquo;</p>
                          <p style="color: rgb(168, 85, 247); font-size: 13px; font-weight: 700; margin: 0;">&mdash; Sarah Chen, VP Engineering at TechCorp</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid rgb(59, 130, 246); border-radius: 0 12px 12px 0; margin-bottom: 14px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; font-style: italic; margin: 0 0 8px 0;">&ldquo;The quality of candidates was exceptional. Every recruiter we dealt with was senior level and knew exactly what they were doing. We filled 3 roles at half the fee our previous agency charged.&rdquo;</p>
                          <p style="color: rgb(59, 130, 246); font-size: 13px; font-weight: 700; margin: 0;">&mdash; Michael Rodriguez, Head of Talent at GrowthLabs</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border-left: 3px solid rgb(168, 85, 247); border-radius: 0 12px 12px 0;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; font-style: italic; margin: 0 0 8px 0;">&ldquo;Our internal team and RPO could never match this level of market coverage. 400+ experienced recruiters competing on our roles means we see candidates within days, not weeks. Game changer.&rdquo;</p>
                          <p style="color: rgb(168, 85, 247); font-size: 13px; font-weight: 700; margin: 0;">&mdash; Amanda Park, Director of HR at FinanceFlow</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Primary CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 40px 28px; text-align: center;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto; background: rgba(168, 85, 247, 0.2); border-radius: 20px;">
                      <tr><td style="padding: 6px 16px;"><span style="color: rgb(168, 85, 247); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">⏰ LIMITED SPOTS AVAILABLE</span></td></tr>
                    </table>
                    <h2 style="margin: 0 0 14px 0; color: #fff; font-size: 24px; font-weight: 800; line-height: 1.3;">Book Your Free 15-Minute Strategy Call Today</h2>
                    <p style="margin: 0 0 28px 0; color: #aaa; font-size: 15px; line-height: 1.6;">See exactly how much time and money you'll save on your next 3 hires</p>
                    <a href="https://recxchange.io/book-meeting" style="display: inline-block; background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 16px; padding: 18px 40px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.05em;">📅 Book Your Strategy Call</a>
                    <p style="margin: 20px 0 0 0; color: #666; font-size: 13px;">⚡ Only <strong style="color: #888;">8 spots</strong> left this week &nbsp;&bull;&nbsp; 🎯 No sales pitch, just insights</p>
                  </td>
                </tr>
              </table>

              <!-- Secondary CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px 24px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #fff; font-size: 18px; font-weight: 700;">Not Ready for a Call Yet?</h3>
                    <p style="margin: 0 0 20px 0; color: #888; font-size: 14px; line-height: 1.6;">Post your first role for free and see how it works</p>
                    <a href="https://recxchange.io/hiring-manager-live" style="display: inline-block; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Post a Role (100% Free)</a>
                  </td>
                </tr>
              </table>

              <!-- Urgency -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.25); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px; text-align: center;">
                    <p style="color: #f87171; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">⏰ Time-Sensitive Opportunity</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; font-weight: 600; margin: 0;">We're currently onboarding <strong style="color: #fff;">8 new clients this month</strong>. After that, we'll have a waitlist to maintain service quality. <strong style="color: rgb(168, 85, 247);">Book your call now to skip the queue.</strong></p>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <h3 style="margin: 0 0 14px 0; color: #fff; font-size: 17px; font-weight: 700;">Have Questions?</h3>
                    <p style="margin: 0 0 14px 0; color: #888; font-size: 14px; line-height: 1.6;">I'm here to help. Simply reply to this email or:</p>
                    <p style="margin: 0 0 8px 0;"><a href="https://recxchange.io/book-meeting" style="color: rgb(59, 130, 246); text-decoration: none; font-size: 14px; font-weight: 600;">📅 Book a 15-minute strategy call</a></p>
                    <p style="margin: 0 0 8px 0;"><a href="mailto:tom@recxchange.io" style="color: rgb(59, 130, 246); text-decoration: none; font-size: 14px; font-weight: 600;">📧 Email me directly: tom@recxchange.io</a></p>
                    <p style="margin: 0;"><a href="https://recxchange.io/hiring-manager-home" style="color: rgb(59, 130, 246); text-decoration: none; font-size: 14px; font-weight: 600;">🌐 Learn more on our website</a></p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer with Social Icons -->
          <tr>
            <td style="text-align: center; padding: 36px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 8px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">contact our team</a></p>
              <p style="margin: 0 0 20px 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>

              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://youtube.com/@recxchange" target="_blank" style="display: inline-block; text-decoration: none;" title="YouTube">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(239,68,68,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#f87171" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.linkedin.com/company/recxchange" target="_blank" style="display: inline-block; text-decoration: none;" title="LinkedIn">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(34,211,238,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#22d3ee" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://twitter.com/RecXchange" target="_blank" style="display: inline-block; text-decoration: none;" title="Twitter / X">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(156,163,175,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#9ca3af" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://facebook.com/recxchange" target="_blank" style="display: inline-block; text-decoration: none;" title="Facebook">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(96,165,250,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#60a5fa" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://instagram.com/recxchange" target="_blank" style="display: inline-block; text-decoration: none;" title="Instagram">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(244,114,182,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#f472b6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://whatsapp.com/channel/0029VbAmXWG7z4ki7lMZ9e0S" target="_blank" style="display: inline-block; text-decoration: none;" title="WhatsApp">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: rgba(74,222,128,0.15); border-radius: 8px;">
                        <tr><td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                          <svg width="18" height="18" fill="#4ade80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer Links -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 12px auto;">
                <tr>
                  <td style="padding: 0 8px;"><a href="https://recxchange.io" style="color: #666; text-decoration: none; font-size: 11px;">Website</a></td>
                  <td style="color: #333; font-size: 11px;">|</td>
                  <td style="padding: 0 8px;"><a href="https://recxchange.io/pricing" style="color: #666; text-decoration: none; font-size: 11px;">Pricing</a></td>
                  <td style="color: #333; font-size: 11px;">|</td>
                  <td style="padding: 0 8px;"><a href="https://recxchange.io/recruiter" style="color: #666; text-decoration: none; font-size: 11px;">Recruiters</a></td>
                  <td style="color: #333; font-size: 11px;">|</td>
                  <td style="padding: 0 8px;"><a href="https://recxchange.io/hiring-manager-home" style="color: #666; text-decoration: none; font-size: 11px;">Hiring Managers</a></td>
                  <td style="color: #333; font-size: 11px;">|</td>
                  <td style="padding: 0 8px;"><a href="https://recxchange.io/contact" style="color: #666; text-decoration: none; font-size: 11px;">Contact</a></td>
                </tr>
              </table>

              <p style="margin: 8px 0 0 0; font-size: 11px; color: #444;">&copy; ${new Date().getFullYear()} RecXchange. All rights reserved.</p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #333;">Generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
