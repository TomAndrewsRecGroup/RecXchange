/**
 * How It Works - Hiring Manager Email Template
 * 
 * Purpose: Explain RecX Direct benefits to hiring managers who click "How Does It Work?"
 * Focus: No upfront costs, dedicated account manager, easy platform login, fast results, lower cost than standard agency fees
 * Trigger: User clicks "How Does It Work?" button on hiring-manager-home page
 */

export function generateHowItWorksHiringManagerEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How RecX Direct Works for Hiring Managers</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2;">How RecX Direct Works</h1>
              <p style="margin: 12px 0 0 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.5;">Your complete guide to hiring with zero upfront costs</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 30px 30px 30px;">
              <p style="margin: 0; color: #111827; font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
              <p style="margin: 16px 0 0 0; color: #374151; font-size: 16px; line-height: 1.6;">Thank you for your interest in RecX Direct. Here's exactly how our platform makes hiring faster, easier, and more cost-effective than traditional agencies.</p>
            </td>
          </tr>

          <!-- Key Benefit 1: No Upfront Costs -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: #10b981; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 24px;">💰</span>
                    </div>
                    <h2 style="margin: 0 0 12px 0; color: #065f46; font-size: 20px; font-weight: 700;">Zero Upfront Costs</h2>
                    <p style="margin: 0; color: #047857; font-size: 15px; line-height: 1.6;">No retainers. No exclusivity fees. No monthly subscriptions. You only pay when you successfully hire a candidate through our platform.</p>
                    <div style="margin-top: 16px; padding: 12px; background-color: rgba(16, 185, 129, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600;">✓ Post unlimited roles for free</p>
                      <p style="margin: 8px 0 0 0; color: #065f46; font-size: 14px; font-weight: 600;">✓ Set your own fee structure (12-20% standard)</p>
                      <p style="margin: 8px 0 0 0; color: #065f46; font-size: 14px; font-weight: 600;">✓ Cancel anytime, no penalties</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Benefit 2: Dedicated Account Manager -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: #f59e0b; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 24px;">👤</span>
                    </div>
                    <h2 style="margin: 0 0 12px 0; color: #92400e; font-size: 20px; font-weight: 700;">One Account Manager, Not 400+ Recruiters</h2>
                    <p style="margin: 0; color: #b45309; font-size: 15px; line-height: 1.6;">Forget juggling emails from dozens of agencies. You get a single point of contact who manages all recruiter interactions, candidate submissions, and interview coordination.</p>
                    <div style="margin-top: 16px; padding: 12px; background-color: rgba(245, 158, 11, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">✓ One email thread for all communications</p>
                      <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px; font-weight: 600;">✓ Pre-vetted candidates only (no spam)</p>
                      <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px; font-weight: 600;">✓ Direct line to your dedicated manager</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Benefit 3: Easy Platform Access -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 24px;">🖥️</span>
                    </div>
                    <h2 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 20px; font-weight: 700;">Simple Platform Login</h2>
                    <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6;">Post roles in 3 minutes. Review candidates in real-time. Track pipeline progress. All from one intuitive dashboard—no training required.</p>
                    <div style="margin-top: 16px; padding: 12px; background-color: rgba(59, 130, 246, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #1e3a8a; font-size: 14px; font-weight: 600;">✓ Mobile and desktop optimized</p>
                      <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 14px; font-weight: 600;">✓ Real-time candidate tracking</p>
                      <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 14px; font-weight: 600;">✓ AI-powered candidate matching</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Benefit 4: Fast Results -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: #ec4899; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 24px;">⚡</span>
                    </div>
                    <h2 style="margin: 0 0 12px 0; color: #831843; font-size: 20px; font-weight: 700;">First Candidates in 48 Hours</h2>
                    <p style="margin: 0; color: #9f1239; font-size: 15px; line-height: 1.6;">Post your role once and 15,000+ recruiters see it instantly. Our AI matches your requirements to their networks, delivering vetted shortlists within 2 days.</p>
                    <div style="margin-top: 16px; padding: 12px; background-color: rgba(236, 72, 153, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #831843; font-size: 14px; font-weight: 600;">✓ 15,000+ recruiters competing for your role</p>
                      <p style="margin: 8px 0 0 0; color: #831843; font-size: 14px; font-weight: 600;">✓ Access to 270M candidate profiles</p>
                      <p style="margin: 8px 0 0 0; color: #831843; font-size: 14px; font-weight: 600;">✓ Average time-to-hire: 14-21 days</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Benefit 5: Lower Costs -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: #6366f1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 24px;">📊</span>
                    </div>
                    <h2 style="margin: 0 0 12px 0; color: #312e81; font-size: 20px; font-weight: 700;">Lower Fees Than Traditional Agencies</h2>
                    <p style="margin: 0; color: #3730a3; font-size: 15px; line-height: 1.6;">Standard agency fees are 20-30%. With RecX Direct, you set your fee (12-20% standard) and recruiters compete to earn it. More competition = better candidates at lower cost.</p>
                    <div style="margin-top: 16px; padding: 12px; background-color: rgba(99, 102, 241, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #312e81; font-size: 14px;"><strong>Traditional Agency:</strong> 25% fee on £60k = £15,000</p>
                      <p style="margin: 8px 0 0 0; color: #312e81; font-size: 14px;"><strong>RecX Direct:</strong> 15% fee on £60k = £9,000</p>
                      <p style="margin: 12px 0 0 0; color: #4338ca; font-size: 16px; font-weight: 700;">💰 Save £6,000 per hire</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- How It Works Process -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: 700; text-align: center;">Your Hiring Journey in 4 Steps</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-left: 4px solid #00ffff; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #00ffff, #c71df1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                              <span style="color: #ffffff; font-weight: 700; font-size: 16px;">1</span>
                            </div>
                            <div>
                              <h3 style="margin: 0 0 6px 0; color: #111827; font-size: 16px; font-weight: 700;">Post Your Role (Free)</h3>
                              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Create your job posting in 3 minutes. Set your fee. Click publish. 15,000+ recruiters see it instantly.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-left: 4px solid #00ffff; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #00ffff, #c71df1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                              <span style="color: #ffffff; font-weight: 700; font-size: 16px;">2</span>
                            </div>
                            <div>
                              <h3 style="margin: 0 0 6px 0; color: #111827; font-size: 16px; font-weight: 700;">Recruiters Compete</h3>
                              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Your account manager coordinates with recruiters. They search 270M profiles, pre-vet candidates, and submit only the best.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-left: 4px solid #00ffff; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #00ffff, #c71df1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                              <span style="color: #ffffff; font-weight: 700; font-size: 16px;">3</span>
                            </div>
                            <div>
                              <h3 style="margin: 0 0 6px 0; color: #111827; font-size: 16px; font-weight: 700;">Review & Interview</h3>
                              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Log in to your dashboard to review shortlisted candidates. Request interviews. Track progress in real-time.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td>
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                              <span style="color: #ffffff; font-weight: 700; font-size: 16px;">4</span>
                            </div>
                            <div>
                              <h3 style="margin: 0 0 6px 0; color: #111827; font-size: 16px; font-weight: 700;">Hire & Pay Once</h3>
                              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Make your offer. Pay one fee to the winning recruiter. Your account manager handles all paperwork and onboarding coordination.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 30px 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 32px; text-align: center;">
                    <h2 style="margin: 0 0 12px 0; color: #ffffff; font-size: 24px; font-weight: 700;">Ready to Post Your First Role?</h2>
                    <p style="margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.5;">No upfront costs. No retainers. Pay only when you hire.</p>
                    <a href="https://recxchange.io/hiring-manager-live" style="display: inline-block; background-color: #ffffff; color: #c71df1; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Post a Role For Free</a>
                    <p style="margin: 24px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Or <a href="https://recxchange.io/book-meeting" style="color: #ffffff; text-decoration: underline;">book a 15-minute demo call</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Questions Section -->
          <tr>
            <td style="padding: 0 30px 40px 30px; border-top: 1px solid #e5e7eb;">
              <h3 style="margin: 30px 0 16px 0; color: #111827; font-size: 18px; font-weight: 700;">Have Questions?</h3>
              <p style="margin: 0 0 12px 0; color: #374151; font-size: 15px; line-height: 1.6;">We're here to help. Simply reply to this email or:</p>
              <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.8;">
                <li>📅 <a href="https://recxchange.io/book-meeting" style="color: #c71df1; text-decoration: none;">Book a 15-minute demo</a></li>
                <li>💬 <a href="mailto:tom@recxchange.io" style="color: #c71df1; text-decoration: none;">Email us directly</a></li>
                <li>📞 Call us at +44 20 1234 5678</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #111827; font-size: 16px; font-weight: 600;">The RecXchange Team</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Connecting you with 15,000+ recruiters and 270M candidates worldwide</p>
              <div style="margin-top: 20px;">
                <a href="https://recxchange.io" style="color: #c71df1; text-decoration: none; font-size: 14px; margin: 0 12px;">Website</a>
                <a href="https://recxchange.io/hiring-manager-home" style="color: #c71df1; text-decoration: none; font-size: 14px; margin: 0 12px;">For Clients</a>
                <a href="https://recxchange.io/pricing" style="color: #c71df1; text-decoration: none; font-size: 14px; margin: 0 12px;">Pricing</a>
              </div>
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
