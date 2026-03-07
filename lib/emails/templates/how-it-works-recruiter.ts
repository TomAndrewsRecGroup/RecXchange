/**
 * How It Works - Recruiter Email Template
 * Comprehensive guide for recruiters explaining RecXchange platform
 * ALL 9 CONTENT EDITS APPLIED
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
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">When a match is made and a placement happens, you split the fee 50/50. Automated contracts, secure payments backed by smart contracts, and full transparency throughout.</p>
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
                    
                    <!-- Step 1 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(168, 85, 247), rgb(59, 130, 246)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 18px;">1</div>
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
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(59, 130, 246), rgb(168, 85, 247)); border-radius: 50%; color: #fff; font-weight: 900; font-size: 18px; text-align: center; line-height: 40px;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">🤖 AI Finds Perfect Matches in Seconds</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Our Xchange Engine instantly scans 15,000+ recruiters and 270M+ candidates to find matches. Relevant partners get instant alerts. You'll typically see matches within 24-48 hours.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 3 - EDIT #1 APPLIED -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgb(168, 85, 247), rgb(59, 130, 246)); border-radius: 50%; color: #fff; font-weight: 900; font-size: 18px; text-align: center; line-height: 40px;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">💰 Split the Fee & Get Paid Automatically</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">When a placement happens, an automated Split Fee Agreement (SFA) is generated. Default split is 50/50, but you can negotiate 60/40 or even 70/30 for premium roles. When your candidate starts their new role and passes probation, funds are released as per the Smart Contract. No chasing invoices. No payment disputes.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Key Features - EDITS #2, #3, #4, #5, #6 APPLIED -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase;">🚀 Platform Features</h2>
                    
                    <!-- EDIT #2: Verified Recruiter Network -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Verified Recruiter Network</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Join a network of pre-vetted professional recruiters. We verify business credentials and monitor placement quality to maintain high standards.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- EDIT #3: Candidate Database -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ 270M+ Candidate Database</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Access our aggregated database with advanced search filters for skills, location, salary, and availability. Candidates sourced from LinkedIn, Indeed, and partner networks.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- EDIT #4: AI Matching -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ AI-Powered Matching (Xchange Engine)</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Our AI analyzes role requirements and candidate profiles to find perfect matches instantly. Matching based on skills, location, salary expectations, and industry specialization.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- EDIT #5: Split Fee Agreements -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Automated Split Fee Agreements (SFAs)</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Digital contracts generated automatically when candidates are submitted. Locks in fee split terms, payment schedule, and guarantees. Signed digitally by both parties—no paperwork required.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- EDIT #6: Smart Contract Payments -->
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
                          <p style="color: #e5e5e5; font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">✅ Real-Time Dashboard & Analytics</p>
                          <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin: 0;">Track all your roles, candidates, matches, and earnings in one unified dashboard. See interview progress, placement status, and revenue projections in real-time.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- RecX Direct Section - EDITS #7, #8, #9 APPLIED -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <p style="color: rgb(168, 85, 247); font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">💎 Premium Feature</p>
                    <h2 style="color: rgb(168, 85, 247); font-size: 24px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase;">What is RecX Direct?</h2>
                    
                    <!-- EDIT #7: RecX Direct intro -->
                    <p style="color: #fff; font-size: 17px; line-height: 1.8; margin: 0 0 16px 0; font-weight: 700;">RecX Direct gives recruiters access to a pool of Live Roles from Live Clients with guaranteed Bounty payments for successful placements.</p>
                    
                    <!-- EDIT #8: Old Way vs New Way -->
                    <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;"><strong style="color: #fff;">The Old Way:</strong> Spend 50% of your time on cold calling and chasing clients. Only 50% actually placing candidates and earning fees.</p>
                    
                    <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;"><strong style="color: #fff;">The RecX Direct Way:</strong> We handle client acquisition. Access 100+ Live Roles from verified clients. Spend 100% of your time sourcing candidates and earning Bounties.</p>

                    <!-- Bounty Display -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="color: #888; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">🏆 Current Active Bounty</p>
                          <p style="color: rgb(168, 85, 247); font-size: 48px; font-weight: 900; margin: 0 0 8px 0;">${TOTAL_BOUNTY}</p>
                          <p style="color: #aaa; font-size: 14px; margin: 0;">Updated weekly • Available to all RecX Direct subscribers</p>
                        </td>
                      </tr>
                    </table>

                    <!-- EDIT #9: Bounty explanation -->
                    <h3 style="color: rgb(168, 85, 247); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">How Does the Bounty Work?</h3>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 16px 0;">Every Live Role on RecX Direct comes with a guaranteed Bounty—the placement fee you receive when you successfully fill the role. Bounties range from $3,000 to $25,000+ depending on seniority and industry.</p>

                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;"><strong style="color: #fff;">Example:</strong> You're paying $249/month for Pro tier. You fill 3 roles in one month with Bounties of $7,000, $9,000, and $8,500. <strong style="color: rgb(168, 85, 247);">Total earnings: $24,500. ROI: 9,739%.</strong></p>
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
                          <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟯 Entry Tier - $1/month</p>
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
                          <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟯 Pro Tier - $249/month</p>
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
                    
                    <p style="color: #888; font-size: 13px; margin: 20px 0 0 0;">✅ No credit card required for Entry tier • ✅ Cancel anytime</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding: 36px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 12px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">book a call with our team</a></p>
              <p style="margin: 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>
              <p style="margin: 12px 0 0 0; font-size: 11px;">Generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
