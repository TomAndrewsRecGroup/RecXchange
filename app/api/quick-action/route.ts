import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  getSecurityHeaders 
} from '@/lib/security';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
  industries?: string[]; // Optional industries for match_candidate
  marketingConsent?: boolean; // GDPR marketing consent
}

// TODO: Replace with actual API call to live roles database
// This should pull from Manatal ATS or your live roles data source
const INDUSTRY_ROLES: Record<string, Array<{
  title: string; 
  company: string; 
  location: string; 
  workMode: string; 
  salary: string; 
  type: string;
  keySkills: string[];
  description: string;
}>> = {
  'Technology': [
    { 
      title: 'Senior Full-Stack Engineer', 
      company: 'FinTech Innovations Ltd', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£75,000 - £95,000', 
      type: 'Permanent',
      keySkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
      description: 'Build scalable fintech platforms with modern tech stack. Lead technical decisions and mentor junior developers.'
    },
    { 
      title: 'Lead DevOps Engineer', 
      company: 'CloudScale Systems', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£80,000 - £100,000', 
      type: 'Permanent',
      keySkills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
      description: 'Design and maintain cloud infrastructure. Automate deployment pipelines and ensure system reliability.'
    },
    { 
      title: 'Principal Software Architect', 
      company: 'Digital Dynamics PLC', 
      location: 'Edinburgh', 
      workMode: 'Hybrid', 
      salary: '£90,000 - £120,000', 
      type: 'Permanent',
      keySkills: ['System Design', 'Microservices', 'Java', 'Python', 'Azure'],
      description: 'Define technical strategy and architecture for enterprise systems. Lead cross-functional engineering teams.'
    },
  ],
  'Finance': [
    { 
      title: 'Senior Financial Analyst', 
      company: 'Sterling Capital Partners', 
      location: 'London', 
      workMode: 'Office', 
      salary: '£65,000 - £85,000', 
      type: 'Permanent',
      keySkills: ['Financial Modelling', 'Excel', 'SQL', 'Bloomberg', 'Valuation'],
      description: 'Conduct financial analysis and due diligence. Build complex financial models for investment decisions.'
    },
    { 
      title: 'Investment Banking Associate', 
      company: 'Apex Investment Group', 
      location: 'London', 
      workMode: 'Office', 
      salary: '£80,000 - £110,000', 
      type: 'Permanent',
      keySkills: ['M&A', 'DCF', 'Excel', 'PowerPoint', 'Deal Execution'],
      description: 'Execute M&A transactions and capital raises. Prepare pitch books and financial presentations.'
    },
    { 
      title: 'Portfolio Manager', 
      company: 'Meridian Wealth Management', 
      location: 'Leeds', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £95,000', 
      type: 'Permanent',
      keySkills: ['Asset Allocation', 'Risk Management', 'CFA', 'Bloomberg', 'Research'],
      description: 'Manage multi-asset portfolios. Develop investment strategies and conduct market research.'
    },
  ],
  'Healthcare': [
    { 
      title: 'Senior Clinical Pharmacist', 
      company: 'NHS Trust - Greater Manchester', 
      location: 'Manchester', 
      workMode: 'Office', 
      salary: '£50,000 - £65,000', 
      type: 'Permanent',
      keySkills: ['Clinical Pharmacy', 'Prescribing', 'Patient Care', 'BNF', 'Medicines Management'],
      description: 'Provide expert pharmaceutical care. Review prescriptions and advise medical teams on medication.'
    },
    { 
      title: 'Consultant Radiologist', 
      company: 'Royal Medical Centre', 
      location: 'Birmingham', 
      workMode: 'Office', 
      salary: '£85,000 - £110,000', 
      type: 'Permanent',
      keySkills: ['MRI', 'CT Scans', 'X-Ray', 'Diagnostic Imaging', 'GMC Registered'],
      description: 'Interpret medical images and provide diagnostic reports. Subspecialty in MSK or neuro preferred.'
    },
    { 
      title: 'Head of Nursing Operations', 
      company: 'Cambridge Healthcare Group', 
      location: 'Cambridge', 
      workMode: 'Office', 
      salary: '£60,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['Nursing Leadership', 'CQC', 'Staff Management', 'Quality Improvement', 'NMC Pin'],
      description: 'Lead nursing teams across multiple sites. Ensure CQC compliance and drive quality improvements.'
    },
  ],
  'Engineering': [
    { 
      title: 'Senior Mechanical Engineer', 
      company: 'Precision Engineering Co', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£55,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['CAD', 'SolidWorks', 'FEA', 'Product Design', 'Manufacturing'],
      description: 'Design mechanical systems and components. Lead projects from concept through to production.'
    },
    { 
      title: 'Principal Civil Engineer', 
      company: 'Infrastructure Solutions Ltd', 
      location: 'Bristol', 
      workMode: 'Office', 
      salary: '£70,000 - £90,000', 
      type: 'Permanent',
      keySkills: ['Civil 3D', 'Structural Design', 'Project Management', 'ICE Chartership', 'AutoCAD'],
      description: 'Lead infrastructure projects including bridges and highways. Manage multidisciplinary teams.'
    },
    { 
      title: 'Lead Electrical Engineer', 
      company: 'PowerTech Industries', 
      location: 'Sheffield', 
      workMode: 'Hybrid', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Power Systems', 'PLC', 'AutoCAD Electrical', 'HV/LV', 'IET Regs'],
      description: 'Design electrical distribution systems. Ensure compliance with regulations and standards.'
    },
  ],
  'Marketing': [
    { 
      title: 'Senior Digital Marketing Manager', 
      company: 'Growth Marketing Agency', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£55,000 - £70,000', 
      type: 'Permanent',
      keySkills: ['SEO', 'PPC', 'Google Analytics', 'Content Strategy', 'Social Media'],
      description: 'Develop and execute digital marketing campaigns. Optimize conversion rates and ROI.'
    },
    { 
      title: 'Head of Content Strategy', 
      company: 'BrandVision Media', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Content Marketing', 'Copywriting', 'SEO', 'Editorial', 'Brand Strategy'],
      description: 'Lead content strategy across all channels. Build and manage content team.'
    },
    { 
      title: 'Performance Marketing Lead', 
      company: 'Digital Commerce Group', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£65,000 - £85,000', 
      type: 'Permanent',
      keySkills: ['Paid Media', 'Google Ads', 'Facebook Ads', 'Analytics', 'Attribution'],
      description: 'Drive customer acquisition through paid channels. Optimize campaigns and budgets.'
    },
  ],
  'Sales': [
    { 
      title: 'Enterprise Sales Director', 
      company: 'SaaS Solutions UK', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £90,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'Salesforce', 'Account Management'],
      description: 'Close enterprise deals with major UK brands. Build strategic relationships with C-level buyers.'
    },
    { 
      title: 'Senior Account Executive', 
      company: 'Global Tech Distributors', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£50,000 - £65,000 + Commission', 
      type: 'Permanent',
      keySkills: ['B2B Sales', 'Pipeline Management', 'CRM', 'Prospecting', 'Closing'],
      description: 'Generate new business and manage sales pipeline. Achieve quarterly revenue targets.'
    },
    { 
      title: 'Head of Business Development', 
      company: 'Enterprise Cloud Services', 
      location: 'Manchester', 
      workMode: 'Hybrid', 
      salary: '£75,000 - £95,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Business Development', 'Partnerships', 'Strategic Sales', 'Negotiation', 'Contracts'],
      description: 'Identify and close strategic partnerships. Lead BD team and set growth strategy.'
    },
  ],
  'Default': [
    { 
      title: 'Senior Software Engineer', 
      company: 'Tech Innovations Ltd', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £90,000', 
      type: 'Permanent',
      keySkills: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile'],
      description: 'Develop modern web applications. Collaborate with product and design teams.'
    },
    { 
      title: 'Project Manager', 
      company: 'Business Solutions PLC', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£55,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['Project Management', 'Agile', 'Stakeholder Management', 'PRINCE2', 'Jira'],
      description: 'Deliver projects on time and within budget. Coordinate cross-functional teams.'
    },
    { 
      title: 'Senior Business Analyst', 
      company: 'Consulting Partners UK', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Business Analysis', 'Requirements', 'SQL', 'Stakeholder Engagement', 'Process Improvement'],
      description: 'Analyze business processes and gather requirements. Bridge gap between business and IT.'
    },
  ],
};

const generateRoleCard = (role: {
  title: string; 
  company: string; 
  location: string; 
  workMode: string; 
  salary: string; 
  type: string;
  keySkills: string[];
  description: string;
}, index: number) => `
  <div style="background: #111; border: 1px solid #222; border-radius: 16px; padding: 24px; margin-bottom: 20px;">
    <!-- Role Header -->
    <div style="margin-bottom: 20px;">
      <h3 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;">${role.title}</h3>
      <p style="color: #888; font-size: 15px; margin: 0;">${role.company}</p>
    </div>
    
    <!-- Role Details Grid -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #222;">
      <div>
        <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">📍 Location</p>
        <p style="color: #e5e5e5; font-size: 14px; font-weight: 600; margin: 0;">${role.location}</p>
      </div>
      <div>
        <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">💼 Work Mode</p>
        <p style="color: #e5e5e5; font-size: 14px; font-weight: 600; margin: 0;">${role.workMode}</p>
      </div>
      <div>
        <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">📋 Type</p>
        <p style="color: #e5e5e5; font-size: 14px; font-weight: 600; margin: 0;">${role.type}</p>
      </div>
    </div>
    
    <!-- Salary -->
    <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
      <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">💰 Salary Range</p>
      <p style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 700; margin: 0;">${role.salary}</p>
    </div>
    
    <!-- Description -->
    <div style="margin-bottom: 20px;">
      <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0;">${role.description}</p>
    </div>
    
    <!-- Key Skills -->
    <div style="margin-bottom: 20px;">
      <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">🎯 Key Skills Required</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${role.keySkills.map(skill => `
          <span style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 6px; padding: 6px 12px; color: rgb(59, 130, 246); font-size: 12px; font-weight: 600;">${skill}</span>
        `).join('')}
      </div>
    </div>
    
    <!-- CTA Button -->
    <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: block; text-align: center; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 14px 28px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Work This Role</a>
  </div>
`;

const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'Website - QA 3 roles',
    autoResponseSubject: '3 Matching Live Roles For You',
    autoResponseTemplate: (firstName: string, industries?: string[]) => {
      // Select roles based on industries
      let selectedRoles: Array<{title: string; company: string; location: string; workMode: string; salary: string; type: string; keySkills: string[]; description: string;}> = [];
      
      if (industries && industries.length > 0) {
        for (const industry of industries) {
          if (INDUSTRY_ROLES[industry]) {
            selectedRoles = INDUSTRY_ROLES[industry];
            break;
          }
        }
      }
      
      if (selectedRoles.length === 0) {
        selectedRoles = INDUSTRY_ROLES['Default'];
      }
      
      const industryText = industries && industries.length > 0 ? industries.join(', ') : 'multiple sectors';
      const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
      
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your 3 Matching Live Roles</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
          <div style="max-width: 680px; margin: 0 auto;">
            <!-- Header with Logo -->
            <div style="background: #0a0a0a; padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;">
              <img src="${LOGO_URL}" alt="RecXchange Logo" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;">Your 3 Matching Live Roles</h1>
              <div style="margin: 16px 0 0 0; color: rgb(59, 130, 246); font-size: 16px; font-weight: 600;">${industryText}</div>
              <p style="margin: 8px 0 0 0; color: #888; font-size: 14px;">Curated for ${firstName || 'you'}</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 24px;">
              <!-- Intro Message -->
              <div style="background: #111; border: 1px solid #222; border-radius: 16px; padding: 28px; margin-bottom: 32px;">
                <h2 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Thanks for your interest${firstName ? `, ${firstName}` : ''}! 🎯</h2>
                <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;">We've curated 3 live roles from our network that match your industry focus. These are real opportunities from verified hiring managers.</p>
                <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0;">All roles below are part of our <strong style="color: rgb(59, 130, 246);">RecXchange</strong> network where recruiters collaborate and split fees 50/50.</p>
              </div>

              <!-- Role Cards -->
              ${selectedRoles.map((role, index) => generateRoleCard(role, index)).join('')}

              <!-- CTA Section -->
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 32px 24px; text-align: center; margin-top: 32px;">
                <h3 style="color: #fff; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">Ready to Access All Live Roles?</h3>
                <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">Join RecXchange and unlock 100+ live roles with AI-powered matching. Collaborate with pre-vetted recruiters and split fees on every placement.</p>
                <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: inline-block; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 16px 40px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Get Started Now</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 32px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 8px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">contact our team</a></p>
              <p style="margin: 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>
              <p style="margin: 8px 0 0 0; font-size: 11px;">Generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    },
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'RecX Direct - Explainer & Fee Pool',
    autoResponseTemplate: (firstName: string) => {
      const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
      
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
          <div style="max-width: 680px; margin: 0 auto;">
            <div style="background: #0a0a0a; padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;">
              <img src="${LOGO_URL}" alt="RecXchange Logo" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;">RecX Direct Explainer</h1>
              <p style="margin: 8px 0 0 0; color: #888; font-size: 14px;">For ${firstName || 'you'}</p>
            </div>
            
            <div style="padding: 40px 24px;">
              <div style="background: #111; border: 1px solid #222; border-radius: 16px; padding: 28px; margin-bottom: 24px;">
                <h3 style="color: rgb(59, 130, 246); margin: 0 0 12px 0; font-size: 18px;">What is RecX Direct?</h3>
                <p style="color: #888; line-height: 1.6; margin: 0; font-size: 15px;">RecX Direct is our revolutionary fee pooling model that makes premium recruitment accessible at any scale. Instead of paying traditional 15-20% fees, you pay a transparent monthly subscription and access a shared fee pool.</p>
              </div>
              
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 28px; margin-bottom: 24px; text-align: center;">
                <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 12px 0;">Current Active Pool</p>
                <p style="color: rgb(59, 130, 246); font-size: 36px; font-weight: 900; margin: 0 0 8px 0;">£XXX,XXX</p>
                <p style="color: #888; margin: 0; font-size: 13px;">Updated weekly</p>
              </div>
              
              <div style="background: #111; border: 1px solid #222; border-radius: 16px; padding: 28px; margin-bottom: 24px;">
                <h3 style="color: rgb(59, 130, 246); margin: 0 0 16px 0; font-size: 18px;">How It Works</h3>
                <ol style="color: #888; line-height: 1.8; padding-left: 20px; margin: 0; font-size: 15px;">
                  <li style="margin-bottom: 12px;">Subscribe to your tier (Entry, Lite, Pro, or Teams)</li>
                  <li style="margin-bottom: 12px;">Post roles and access our candidate network</li>
                  <li style="margin-bottom: 12px;">Make hires from the shared fee pool</li>
                  <li>Pay only your subscription - no per-hire fees</li>
                </ol>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://recxchange.io/pricing" style="display: inline-block; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 16px 40px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em;">View Pricing Tiers</a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin: 24px 0 0 0; font-size: 13px; text-align: center;">Questions? Reply to this email or book a call with our team.</p>
            </div>
            
            <div style="text-align: center; padding: 32px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `;
    },
  },
};

/**
 * POST /api/quick-action
 * 
 * Handles quick action form submissions
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    const clientIP = getClientIP(request);
    const ipRateLimit = checkRateLimit(clientIP, 'form');
    
    if (!ipRateLimit.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetIn: Math.ceil(ipRateLimit.resetIn / 1000)
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': String(Math.ceil(ipRateLimit.resetIn / 1000)),
          }
        }
      );
    }

    const body: QuickActionRequest = await request.json();
    const { actionType, source, industries, marketingConsent } = body;

    let sanitizedData;
    try {
      sanitizedData = validateFormData(body);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input data' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { firstName, lastName, email } = sanitizedData;

    if (!actionType || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: securityHeaders }
      );
    }

    const emailRateLimit = checkRateLimit(`email:${email}`, 'email');
    if (!emailRateLimit.success) {
      return NextResponse.json(
        { 
          error: 'Too many submissions from this email. Please try again later.',
          resetIn: Math.ceil(emailRateLimit.resetIn / 1000)
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': String(Math.ceil(emailRateLimit.resetIn / 1000)),
          }
        }
      );
    }

    const config = ACTION_CONFIG[actionType];
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400, headers: securityHeaders }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'tom@recxchange.io';

    // Create/update GHL contact
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const tags = [config.ghlTag, 'website', 'quick-action'];
        
        if (industries && industries.length > 0) {
          const sanitizedIndustries = industries
            .filter(ind => typeof ind === 'string')
            .map(ind => ind.substring(0, 50))
            .slice(0, 10);
          tags.push(...sanitizedIndustries);
        }

        if (marketingConsent === true) {
          tags.push('marketing-consent-given');
        } else if (marketingConsent === false) {
          tags.push('marketing-consent-declined');
        }

        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            locationId: GHL_LOCATION_ID,
            tags,
            source: `RecXchange Quick Action - ${source}`,
            customFields: {
              action_type: actionType,
              source_page: source,
              action_date: new Date().toISOString(),
              industries: industries && industries.length > 0 ? industries.join(', ') : '',
              marketing_consent: marketingConsent === true ? 'yes' : marketingConsent === false ? 'no' : 'not_asked',
              marketing_consent_date: marketingConsent !== undefined ? new Date().toISOString() : '',
            }
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to create GHL contact:', error);
      }
    }

    // Send auto-response email
    if (SENDGRID_API_KEY) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email, name: `${firstName} ${lastName}` }],
              subject: config.autoResponseSubject
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: actionType === 'match_candidate' 
                ? config.autoResponseTemplate(firstName, industries)
                : config.autoResponseTemplate(firstName)
            }]
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to send auto-response:', error);
      }
    }

    // Track analytics
    try {
      trackEvent('quick_action_form_submitted', {
        action_type: actionType,
        page: source,
        industries: industries && industries.length > 0 ? industries.join(', ') : 'none',
        marketing_consent: marketingConsent === true ? 'given' : marketingConsent === false ? 'declined' : 'not_asked',
      }, { bypassConsent: true });
    } catch (error) {
      console.error('[Quick Action] Failed to track event:', error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Quick action processed successfully',
      },
      { headers: securityHeaders }
    );
  } catch (error) {
    console.error('[Quick Action] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    );
  }
}
