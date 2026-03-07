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
      salary: '$75,000 - $95,000', 
      type: 'Permanent',
      keySkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
      description: 'Build scalable fintech platforms with modern tech stack. Lead technical decisions and mentor junior developers.'
    },
    { 
      title: 'Lead DevOps Engineer', 
      company: 'CloudScale Systems', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$80,000 - $100,000', 
      type: 'Permanent',
      keySkills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
      description: 'Design and maintain cloud infrastructure. Automate deployment pipelines and ensure system reliability.'
    },
    { 
      title: 'Principal Software Architect', 
      company: 'Digital Dynamics PLC', 
      location: 'Edinburgh', 
      workMode: 'Hybrid', 
      salary: '$90,000 - $120,000', 
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
      salary: '$65,000 - $85,000', 
      type: 'Permanent',
      keySkills: ['Financial Modelling', 'Excel', 'SQL', 'Bloomberg', 'Valuation'],
      description: 'Conduct financial analysis and due diligence. Build complex financial models for investment decisions.'
    },
    { 
      title: 'Investment Banking Associate', 
      company: 'Apex Investment Group', 
      location: 'London', 
      workMode: 'Office', 
      salary: '$80,000 - $110,000', 
      type: 'Permanent',
      keySkills: ['M&A', 'DCF', 'Excel', 'PowerPoint', 'Deal Execution'],
      description: 'Execute M&A transactions and capital raises. Prepare pitch books and financial presentations.'
    },
    { 
      title: 'Portfolio Manager', 
      company: 'Meridian Wealth Management', 
      location: 'Leeds', 
      workMode: 'Hybrid', 
      salary: '$70,000 - $95,000', 
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
      salary: '$50,000 - $65,000', 
      type: 'Permanent',
      keySkills: ['Clinical Pharmacy', 'Prescribing', 'Patient Care', 'BNF', 'Medicines Management'],
      description: 'Provide expert pharmaceutical care. Review prescriptions and advise medical teams on medication.'
    },
    { 
      title: 'Consultant Radiologist', 
      company: 'Royal Medical Centre', 
      location: 'Birmingham', 
      workMode: 'Office', 
      salary: '$85,000 - $110,000', 
      type: 'Permanent',
      keySkills: ['MRI', 'CT Scans', 'X-Ray', 'Diagnostic Imaging', 'GMC Registered'],
      description: 'Interpret medical images and provide diagnostic reports. Subspecialty in MSK or neuro preferred.'
    },
    { 
      title: 'Head of Nursing Operations', 
      company: 'Cambridge Healthcare Group', 
      location: 'Cambridge', 
      workMode: 'Office', 
      salary: '$60,000 - $75,000', 
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
      salary: '$55,000 - $75,000', 
      type: 'Permanent',
      keySkills: ['CAD', 'SolidWorks', 'FEA', 'Product Design', 'Manufacturing'],
      description: 'Design mechanical systems and components. Lead projects from concept through to production.'
    },
    { 
      title: 'Principal Civil Engineer', 
      company: 'Infrastructure Solutions Ltd', 
      location: 'Bristol', 
      workMode: 'Office', 
      salary: '$70,000 - $90,000', 
      type: 'Permanent',
      keySkills: ['Civil 3D', 'Structural Design', 'Project Management', 'ICE Chartership', 'AutoCAD'],
      description: 'Lead infrastructure projects including bridges and highways. Manage multidisciplinary teams.'
    },
    { 
      title: 'Lead Electrical Engineer', 
      company: 'PowerTech Industries', 
      location: 'Sheffield', 
      workMode: 'Hybrid', 
      salary: '$60,000 - $80,000', 
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
      salary: '$55,000 - $70,000', 
      type: 'Permanent',
      keySkills: ['SEO', 'PPC', 'Google Analytics', 'Content Strategy', 'Social Media'],
      description: 'Develop and execute digital marketing campaigns. Optimize conversion rates and ROI.'
    },
    { 
      title: 'Head of Content Strategy', 
      company: 'BrandVision Media', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$60,000 - $80,000', 
      type: 'Permanent',
      keySkills: ['Content Marketing', 'Copywriting', 'SEO', 'Editorial', 'Brand Strategy'],
      description: 'Lead content strategy across all channels. Build and manage content team.'
    },
    { 
      title: 'Performance Marketing Lead', 
      company: 'Digital Commerce Group', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '$65,000 - $85,000', 
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
      salary: '$70,000 - $90,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'Salesforce', 'Account Management'],
      description: 'Close enterprise deals with major UK brands. Build strategic relationships with C-level buyers.'
    },
    { 
      title: 'Senior Account Executive', 
      company: 'Global Tech Distributors', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '$50,000 - $65,000 + Commission', 
      type: 'Permanent',
      keySkills: ['B2B Sales', 'Pipeline Management', 'CRM', 'Prospecting', 'Closing'],
      description: 'Generate new business and manage sales pipeline. Achieve quarterly revenue targets.'
    },
    { 
      title: 'Head of Business Development', 
      company: 'Enterprise Cloud Services', 
      location: 'Manchester', 
      workMode: 'Hybrid', 
      salary: '$75,000 - $95,000 + Commission', 
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
      salary: '$70,000 - $90,000', 
      type: 'Permanent',
      keySkills: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile'],
      description: 'Develop modern web applications. Collaborate with product and design teams.'
    },
    { 
      title: 'Project Manager', 
      company: 'Business Solutions PLC', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$55,000 - $75,000', 
      type: 'Permanent',
      keySkills: ['Project Management', 'Agile', 'Stakeholder Management', 'PRINCE2', 'Jira'],
      description: 'Deliver projects on time and within budget. Coordinate cross-functional teams.'
    },
    { 
      title: 'Senior Business Analyst', 
      company: 'Consulting Partners UK', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '$60,000 - $80,000', 
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
}, index: number) => {
  // Alternate colors: Card 1 (index 0) = Purple, Card 2 (index 1) = Blue, Card 3 (index 2) = Purple
  const isPurple = index % 2 === 0;
  const primaryColor = isPurple ? 'rgb(168, 85, 247)' : 'rgb(59, 130, 246)';
  const gradientStart = isPurple ? 'rgb(168, 85, 247)' : 'rgb(59, 130, 246)';
  const gradientEnd = isPurple ? 'rgb(59, 130, 246)' : 'rgb(168, 85, 247)';
  const bgOpacity = isPurple ? '0.08' : '0.08';
  const borderOpacity = isPurple ? '0.3' : '0.3';
  
  return `
  <div style=\"background: #111; border: 1px solid #222; border-radius: 16px; padding: 20px; margin-bottom: 20px;\">
    <!-- Role Header -->
    <div style=\"margin-bottom: 16px;\">
      <h3 style=\"color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;\">${role.title}</h3>
      <p style=\"color: #888; font-size: 15px; margin: 0;\">${role.company}</p>
    </div>
    
    <!-- Role Details Grid - Responsive -->
    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" style=\"margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #222;\">
      <tr>
        <td width=\"33%\" style=\"padding: 0 8px 0 0;\">
          <p style=\"color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;\">📍 Location</p>
          <p style=\"color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;\">${role.location}</p>
        </td>
        <td width=\"33%\" style=\"padding: 0 8px;\">
          <p style=\"color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;\">💼 Work Mode</p>
          <p style=\"color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;\">${role.workMode}</p>
        </td>
        <td width=\"33%\" style=\"padding: 0 0 0 8px;\">
          <p style=\"color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;\">📋 Type</p>
          <p style=\"color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;\">${role.type}</p>
        </td>
      </tr>
    </table>
    
    <!-- Salary -->
    <div style=\"background: rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, ${bgOpacity}); border: 1px solid rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, ${borderOpacity}); border-radius: 12px; padding: 14px; margin-bottom: 16px;\">
      <p style=\"color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;\">💰 Salary Range</p>
      <p style=\"color: ${primaryColor}; font-size: 20px; font-weight: 700; margin: 0; line-height: 1.2;\">${role.salary}</p>
    </div>
    
    <!-- Description -->
    <div style=\"margin-bottom: 16px;\">
      <p style=\"color: #888; font-size: 14px; line-height: 1.6; margin: 0;\">${role.description}</p>
    </div>
    
    <!-- Key Skills - Responsive wrap -->
    <div style=\"margin-bottom: 16px;\">
      <p style=\"color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px 0;\">🎯 Key Skills Required</p>
      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">
        <tr>
          <td>
            ${role.keySkills.map(skill => `<span style=\"display: inline-block; background: rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, 0.1); border: 1px solid rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, 0.3); border-radius: 6px; padding: 6px 10px; color: ${primaryColor}; font-size: 12px; font-weight: 600; margin: 0 6px 6px 0;\">${skill}</span>`).join('')}
          </td>
        </tr>
      </table>
    </div>
    
    <!-- CTA Button - VML for Outlook gradient fallback -->
    <!--[if mso]>
    <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC\" style=\"height:44px;v-text-anchor:middle;width:100%;\" arcsize=\"23%\" stroke=\"f\" fillcolor=\"${primaryColor}\">
      <w:anchorlock/>
      <center style=\"color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;\">Work This Role</center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a href=\"https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC\" style=\"display: block; text-align: center; background: linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%); background-color: ${primaryColor}; color: #fff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 14px 28px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;\">Work This Role</a>
    <!--<![endif]-->
  </div>
`;
};

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
      
      return `...EMAIL TEMPLATE TRUNCATED FOR BREVITY...`;
    },
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'How RecXchange Works - Your Complete Guide',
    autoResponseTemplate: (firstName: string) => {
      const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
      
      return `...EMAIL TEMPLATE TRUNCATED FOR BREVITY...`;
    },
  },
};

export async function POST(request: NextRequest) {
  // Implementation continues...
}
