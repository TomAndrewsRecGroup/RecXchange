/**
 * How It Works - Recruiter Email Template
 * Comprehensive guide for recruiters explaining RecXchange platform
 */

export const generateHowItWorksRecruiterEmail = (firstName: string): string => {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  const TOTAL_BOUNTY = '$750,000'; // TODO: Fetch from database
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How RecXchange Works - Recruiter Guide</title>
  <style>
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding: 20px 16px !important; }
      .mobile-text { font-size: 22px !important; }
      .stat-box { width: 100% !important; display: block !important; margin-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px;">
          
          <tr>
            <td style="padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;" class="mobile-padding">
              <img src="${LOGO_URL}" alt="RecXchange" width="180" style="margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;">How RecXchange Works</h1>
              <p style="margin: 12px 0 0 0; color: #888; font-size: 15px;">Everything you need to know${firstName ? `, ${firstName}` : ''}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 24px;" class="mobile-padding">
              
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #e5e5e5; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">Thanks for requesting the RecXchange explainer${firstName ? `, ${firstName}` : ''}! This email covers everything: what we do, how it works, pricing options, real success stories, and answers to common questions.</p>
                    <p style="color: #888; font-size: 14px; margin: 0;"><em>Reading time: 8 minutes. Bookmark this for future reference.</em></p>
                  </td>
                </tr>
              </table>

              <!-- SECTION 1: What is RecXchange -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 16px 0; text-transform: uppercase;">🔵 What is RecXchange?</h2>
                    <p style="color: #e5e5e5; font-size: 16px; line-height: 1.8; margin: 0 0 16px 0; font-weight: 600;">RecXchange is a global recruiter collaboration platform where recruitment professionals work together to fill roles and place candidates faster than they could working alone.</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">Think of it like this: You have a role you can't fill, or a candidate you can't place. Instead of letting them sit in your database gathering dust, you post them to RecXchange. Our AI-powered Xchange Engine instantly matches your role to recruiters who have perfect candidates, or matches your candidate to recruiters who have perfect roles.</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">When a match is made and a placement happens, you split the fee. Automated contracts, secure payments backed by smart contracts, and full transparency throughout.</p>
                  </td>
                </tr>
              </table>

              <!-- Platform Stats -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td width="32%" style="padding: 0 6px 0 0;" class="stat-box">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px;">
                      <tr>
                        <td style="padding: 22px 16px; text-align: center;">
                          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 10px 0;">Global Network</p>
                          <p style="color: rgb(168, 85, 247); font-size: 28px; font-weight: 900; margin: 0 0 6px 0;">15,000+</p>
                          <p style="color: #888; font-size: 12px; margin: 0;">Vetted Recruiters</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="32%" style="padding: 0 6px;" class="stat-box">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 14px;">
                      <tr>
                        <td style="padding: 22px 16px; text-align: center;">
                          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 10px 0;">Live Placement Fees</p>
                          <p style="color: rgb(59, 130, 246); font-size: 28px; font-weight: 900; margin: 0 0 6px 0;">${TOTAL_BOUNTY}+</p>
                          <p style="color: #888; font-size: 12px; margin: 0;">Available Right Now</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="32%" style="padding: 0 0 0 6px;" class="stat-box">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px;">
                      <tr>
                        <td style="padding: 22px 16px; text-align: center;">
                          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 10px 0;">Candidate Database</p>
                          <p style="color: rgb(168, 85, 247); font-size: 28px; font-weight: 900; margin: 0 0 6px 0;">270M+</p>
                          <p style="color: #888; font-size: 12px; margin: 0;">Searchable Profiles</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- SECTION 2: How It Works -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase;">⚡ How It Works (3 Simple Steps)</h2>
                    
                    <!-- Step 1 - number centred in circle -->
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
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">📤 Post Your Role or Candidate</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Upload a role you're struggling to fill, or a candidate you can't place. It takes 2 minutes. Include key details like location, salary, required skills, and any deal-breakers.</p>
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
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">🤖 AI Finds Perfect Matches in Seconds</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Our Xchange Engine instantly scans 15,000+ recruiters and 270M+ candidates to find matches. Relevant partners get instant alerts. You'll typically see matches within 24-48 hours.</p>
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
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">💰 Split the Fee &amp; Get Paid Automatically</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">When a placement happens, an automated Split Fee Agreement (SFA) is generated. Default split is 50/50, but you can negotiate 60/40 or even 70/30 for premium roles. When your candidate starts their new role and passes probation, funds are released as per the Smart Contract. No chasing invoices. No payment disputes.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Platform Features -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase;">🚀 Platform Features</h2>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Verified Recruiter Network</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Join a network of pre-vetted professional recruiters. We verify business credentials and monitor placement quality to maintain high standards.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ 270M+ Candidate Database</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Access our aggregated database with advanced search filters for skills, location, salary, and availability. Candidates sourced from LinkedIn, Indeed, and partner networks.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ AI-Powered Matching (Xchange Engine)</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Our AI analyzes role requirements and candidate profiles to find perfect matches instantly. Matching based on skills, location, salary expectations, and industry specialization.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Automated Split Fee Agreements (SFAs)</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Digital contracts generated automatically when candidates are submitted. Locks in fee split terms, payment schedule, and guarantees. Signed digitally by both parties—no paperwork required.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Secure Payments Backed by Smart Contracts</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">When your candidate starts their new role and passes probation, funds are released as per the Smart Contract. Transparent, secure, and eliminates payment disputes.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Circle of Trust (Private Network)</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Create your own private network with recruiters you know and trust. Perfect for confidential C-suite searches or exclusive mandates.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0;">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Real-Time Dashboard &amp; Analytics</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Track all your roles, candidates, matches, and earnings in one unified dashboard. See interview progress, placement status, and revenue projections in real-time.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- RecX Direct Section -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <p style="color: rgb(168, 85, 247); font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">💎 Premium Feature</p>
                    <h2 style="color: rgb(168, 85, 247); font-size: 24px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase;">What is RecX Direct?</h2>
                    
                    <p style="color: #fff; font-size: 17px; line-height: 1.8; margin: 0 0 16px 0; font-weight: 700;">RecX Direct gives recruiters access to a pool of Live Roles from Live Clients with guaranteed Bounty payments for successful placements.</p>
                    
                    <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;"><strong style="color: #fff;">The Old Way:</strong> Spend 50% of your time on cold calling and chasing clients. Only 50% actually placing candidates and earning fees.</p>
                    
                    <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;"><strong style="color: #fff;">The RecX Direct Way:</strong> We handle client acquisition. Access 100+ Live Roles from verified clients. Spend 100% of your time sourcing candidates and earning Bounties.</p>

                    <!-- Bounty Display -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                      <tr>
                        <td style="text-align: center; padding: 24px;">
                          <p style="color: #888; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">🏆 Current Active Bounty</p>
                          <p style="color: rgb(168, 85, 247); font-size: 48px; font-weight: 900; margin: 0 0 8px 0;">${TOTAL_BOUNTY}</p>
                          <p style="color: #aaa; font-size: 14px; margin: 0;">Updated weekly &bull; Available to all RecX Direct subscribers</p>
                        </td>
                      </tr>
                    </table>

                    <!-- How Bounties Work -->
                    <h3 style="color: rgb(168, 85, 247); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">How Does the Bounty Work?</h3>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 16px 0;">Every Live Role on RecX Direct comes with a guaranteed Bounty—the placement fee you receive when you successfully fill the role. Bounties range from $3,000 to $25,000+ depending on seniority and industry.</p>

                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;"><strong style="color: #fff;">Example:</strong> You're paying $99/month for Lite tier. You fill 2 roles in one quarter with Bounties of $6,000, $5,000, and $7,500. <strong style="color: rgb(168, 85, 247);">Total earnings: $18,500. ROI: 6,129%.</strong></p>
                  </td>
                </tr>
              </table>

              <!-- Pricing -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase;">💷 Pricing Tiers</h2>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟧 Entry Tier - $1/month</p>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Perfect for solo recruiters testing the platform. Post 1 role OR 1 candidate. Access to full network. 50/50 fee splits.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgb(59, 130, 246); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🔵 Lite Tier - $99/month</p>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For active recruiters making 1-2 placements/month. Post up to 5 roles + 10 candidates. AI matching priority. 50/50 or 60/40 split options.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟧 Pro Tier - $249/month</p>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For agencies and high-volume recruiters. Unlimited roles + candidates. 70/30 split options on premium roles. RecX Direct Bounty access.</p>
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: rgb(59, 130, 246); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🔵 Teams Tier - Custom Pricing</p>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For recruitment agencies with 5+ consultants. Everything in Pro + team collaboration tools, white-label options, API access.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Final CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px;">
                <tr>
                  <td style="padding: 40px 28px; text-align: center;">
                    <h3 style="color: #fff; font-size: 26px; font-weight: 800; margin: 0 0 16px 0;">Ready to Transform Your Recruitment?</h3>
                    <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0 0 28px 0;">Join 15,000+ recruiters already earning more by working together. <strong style="color: rgb(168, 85, 247);">Start at $1/month</strong> with zero long-term commitments.</p>
                    
                    <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: inline-block; background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 18px 48px; border-radius: 10px; text-transform: uppercase;">Join RecXchange Now</a>
                    
                    <p style="color: #888; font-size: 13px; margin: 20px 0 0 0;">✅ No credit card required for Entry tier &bull; ✅ Cancel anytime</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer with Social Icons -->
          <tr>
            <td style="text-align: center; padding: 36px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 8px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">book a call with our team</a></p>
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
  `;
};
