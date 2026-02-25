import { NextResponse } from 'next/server';

// GHL Social Planner API configuration
// Replace these with your actual GHL credentials
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_URL = 'https://services.leadconnectorhq.com/calendars/events';

interface GHLPost {
  id: string;
  title: string;
  content: string;
  scheduledDate: string;
  status: string;
  platform: string;
  mediaUrl?: string;
  tags?: string[];
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  author: string;
  imageUrl?: string;
  tags: string[];
}

// Transform GHL post to blog post format
function transformGHLPost(ghlPost: any): BlogPost {
  // Extract category from tags or content
  const tags = ghlPost.tags || [];
  const category = tags[0] || 'Platform Updates';
  
  // Generate slug from title
  const slug = ghlPost.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Extract excerpt (first 150 chars of content)
  const excerpt = ghlPost.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 150) + '...';
  
  return {
    id: ghlPost.id,
    slug,
    title: ghlPost.title,
    excerpt,
    content: ghlPost.content,
    publishedAt: ghlPost.scheduledDate || new Date().toISOString(),
    category,
    author: 'RecXchange Team',
    imageUrl: ghlPost.mediaUrl,
    tags: tags,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // For development/testing: Return mock data if no API key configured
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.warn('GHL API credentials not configured. Returning mock data.');
      
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          slug: 'welcome-to-recxchange-blog',
          title: 'Welcome to the RecXchange Blog',
          excerpt: 'Discover how 15,000+ recruiters are partnering on placements and splitting fees automatically. Learn about platform features, success stories, and recruitment best practices.',
          content: `<h2>Welcome to RecXchange Insights</h2>\n\n<p>We're excited to launch the RecXchange blog – your go-to resource for recruitment collaboration, fee splitting strategies, and platform updates.</p>\n\n<h3>What You'll Find Here</h3>\n\n<p><strong>Platform Updates:</strong> Stay informed about new features, improvements, and enhancements to the RecXchange platform.</p>\n\n<p><strong>Success Stories:</strong> Read real stories from recruiters who've made successful placements through RecXchange partnerships.</p>\n\n<p><strong>Recruitment Tips:</strong> Learn best practices for candidate sourcing, client management, and fee negotiation.</p>\n\n<p><strong>Industry Insights:</strong> Get the latest trends and news from the recruitment industry worldwide.</p>\n\n<h3>Join 15,000+ Recruiters</h3>\n\n<p>RecXchange is the premier platform for recruiter collaboration. With access to 270M candidate profiles, $750,000 in live placement fees, and average placements of $7,000, there's never been a better time to join.</p>\n\n<ul>\n<li>Split fees 50/50, 60/40, or earn up to 70% on RecX Direct roles</li>\n<li>Zero platform fees on placements – keep 100% of your split</li>\n<li>Automated legal contracts with timestamp protection</li>\n<li>Rated and reviewed recruiter community</li>\n</ul>\n\n<p>Ready to start partnering? <a href=\"/pricing\">View our pricing</a> and join today.</p>`,
          publishedAt: '2026-02-25T00:00:00Z',
          category: 'Platform Updates',
          author: 'RecXchange Team',
          imageUrl: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
          tags: ['platform', 'welcome', 'getting-started'],
        },
        {
          id: '2',
          slug: 'how-to-maximize-fee-splits',
          title: 'How to Maximize Your Fee Splits on RecXchange',
          excerpt: 'Learn the strategies top recruiters use to consistently earn 60-70% splits on placements. Discover RecX Direct roles, build your rating, and optimize your profile for partnership success.',
          content: `<h2>Maximizing Your RecXchange Earnings</h2>\n\n<p>Top recruiters on RecXchange consistently earn $5,000-$7,000 per placement by following these proven strategies.</p>\n\n<h3>1. Upgrade to Pro for RecX Direct Access</h3>\n\n<p>Pro members ($250/month) get instant access to RecX Direct roles where you can earn up to 70% of the placement fee.</p>\n\n<p><strong>Example:</strong> On a $10,000 placement, 70% = $7,000 to you (vs $5,000 on a 50/50 split). That's $2,000 more per placement.</p>\n\n<h3>2. Build Your Rating to 4.5+ Stars</h3>\n\n<p>High-rated recruiters get more partnership requests and can negotiate better split percentages.</p>\n\n<ul>\n<li>Respond to messages within 24 hours</li>\n<li>Complete partnerships you agree to</li>\n<li>Pay splits on time (within 7 days)</li>\n<li>Leave honest reviews for your partners</li>\n</ul>\n\n<h3>3. Focus on High-Value Roles</h3>\n\n<p>Instead of posting 50 low-value roles, focus on 10-15 high-value placements ($10,000+ fees).</p>\n\n<p>Senior positions in Engineering, Healthcare, Finance, and Tech typically have higher placement fees.</p>\n\n<h3>4. Create Partnerships with Top Recruiters</h3>\n\n<p>Partner with recruiters who have:</p>\n\n<ul>\n<li>4+ star ratings</li>\n<li>10+ successful placements</li>\n<li>Positive reviews mentioning payment reliability</li>\n<li>Fast response times</li>\n</ul>\n\n<h3>5. Leverage the 270M Candidate Database</h3>\n\n<p>Use advanced search filters to find candidates that perfectly match high-value roles. The better the match, the faster the placement.</p>\n\n<p><strong>Pro Tip:</strong> Submit candidates within the first 48 hours of a role being posted. Early submissions have 3x higher placement rates.</p>\n\n<p>Ready to start earning more? <a href=\"/pricing\">Upgrade to Pro</a> for instant RecX Direct access.</p>`,
          publishedAt: '2026-02-24T00:00:00Z',
          category: 'Recruitment Tips',
          author: 'Tom Andrews',
          tags: ['strategy', 'fee-splits', 'earnings'],
        },
        {
          id: '3',
          slug: 'success-story-sarah-makes-15k-first-month',
          title: 'Success Story: Sarah Makes $15,000 in Her First Month',
          excerpt: 'Meet Sarah, a UK-based recruiter who made 3 placements in her first 30 days on RecXchange. Learn how she partnered with recruiters across Europe and earned $15,000 in split fees.',
          content: `<h2>From Skeptic to Top Earner</h2>\n\n<p>Sarah Johnson, a healthcare recruiter from London, was skeptical about fee-splitting platforms. "I thought I'd lose money sharing placements," she admits. "But after one month on RecXchange, I earned more than my previous three months combined."</p>\n\n<h3>The Numbers</h3>\n\n<ul>\n<li><strong>Placement 1:</strong> Senior Nurse, Manchester - $5,000 (50/50 split on $10,000 fee)</li>\n<li><strong>Placement 2:</strong> Medical Director, Berlin - $6,000 (60/40 split on $10,000 fee)</li>\n<li><strong>Placement 3:</strong> Healthcare Analyst, RecX Direct - $4,200 (70% split on $6,000 fee)</li>\n<li><strong>Total earned in 30 days:</strong> $15,200</li>\n</ul>\n\n<h3>How She Did It</h3>\n\n<p><strong>Week 1:</strong> Sarah upgraded to Pro ($250/month) for instant RecX Direct access. She posted 5 high-value healthcare roles she was struggling to fill.</p>\n\n<p><strong>Week 2:</strong> She received 12 candidate submissions from recruiters across UK and Europe. She screened them and shortlisted 4 strong matches.</p>\n\n<p><strong>Week 3:</strong> Her first candidate was hired! A recruiter from Manchester submitted a Senior Nurse that Sarah's client loved. They split the $10,000 fee 50/50.</p>\n\n<p><strong>Week 4:</strong> Two more placements closed. Sarah had built partnerships with recruiters in Germany and was accessing RecX Direct roles.</p>\n\n<h3>Sarah's Top Tips</h3>\n\n<blockquote>\n<p>"Don't be precious about 'your' roles. The candidates I received were better than what I could find alone. And I filled roles I'd been stuck on for 2 months."</p>\n</blockquote>\n\n<p><strong>Her advice for new recruiters:</strong></p>\n\n<ol>\n<li>Start with Pro membership – the $250 pays for itself with one placement</li>\n<li>Post your hardest-to-fill roles first</li>\n<li>Respond to candidate submissions within 24 hours</li>\n<li>Build relationships with 3-5 reliable partners</li>\n<li>Use RecX Direct for quick wins</li>\n</ol>\n\n<h3>What's Next for Sarah?</h3>\n\n<p>Sarah now has 7 active partnerships and has already made 2 more placements in her second month. "I'm on track to earn $25,000 this month," she says. "And I'm working less than before because my partners do half the work."</p>\n\n<p>Want to replicate Sarah's success? <a href=\"/pricing\">Join RecXchange today</a> and start partnering.</p>`,
          publishedAt: '2026-02-23T00:00:00Z',
          category: 'Success Stories',
          author: 'RecXchange Team',
          imageUrl: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
          tags: ['success-story', 'healthcare', 'earnings'],
        },
        {
          id: '4',
          slug: 'understanding-recx-direct-70-percent-splits',
          title: 'Understanding RecX Direct: How to Earn 70% Splits',
          excerpt: 'RecX Direct roles offer up to 70% fee splits – significantly higher than standard 50/50 partnerships. Learn what RecX Direct is, how to access it, and why it pays more.',
          content: `<h2>The Highest-Earning Opportunity on RecXchange</h2>\n\n<p>RecX Direct is RecXchange's own recruitment service where you can earn up to 70% of the placement fee – that's $7,000 on a $10,000 placement.</p>\n\n<h3>What Is RecX Direct?</h3>\n\n<p>RecX Direct connects hiring companies directly with RecXchange's network of 15,000+ recruiters. Companies post their roles for free, and recruiters submit candidates.</p>\n\n<p><strong>Key difference:</strong> The client relationship is managed by RecXchange Account Managers, so you don't need to do any business development or client servicing.</p>\n\n<h3>Why RecX Direct Pays More</h3>\n\n<p>You earn up to 70% because:</p>\n\n<ul>\n<li>You don't need to source the client (we provide the role)</li>\n<li>You don't manage client communication (our Account Managers do)</li>\n<li>You focus purely on finding the perfect candidate</li>\n<li>Multiple recruiters compete to fill the role (highest quality wins)</li>\n</ul>\n\n<h3>How to Access RecX Direct Roles</h3>\n\n<p><strong>Pro Members ($250/month):</strong> Instant access to all RecX Direct roles as soon as they're posted.</p>\n\n<p><strong>Lite Members ($99/month):</strong> Access RecX Direct roles 7 days after posting.</p>\n\n<p><strong>Entry Members ($1/month):</strong> Access RecX Direct roles 30 days after posting (if still open).</p>\n\n<h3>Real Example: $7,000 vs $5,000</h3>\n\n<p>Let's compare two $10,000 placements:</p>\n\n<p><strong>Standard 50/50 Partnership:</strong></p>\n<ul>\n<li>You source the client</li>\n<li>You manage all client communication</li>\n<li>You split 50/50 with the candidate recruiter</li>\n<li><strong>Your earnings: $5,000</strong></li>\n</ul>\n\n<p><strong>RecX Direct 70% Split:</strong></p>\n<ul>\n<li>Client provided by RecXchange</li>\n<li>Account Manager handles all client communication</li>\n<li>You focus only on finding the candidate</li>\n<li><strong>Your earnings: $7,000</strong></li>\n</ul>\n\n<p><strong>Result:</strong> You earn $2,000 more (40% increase) and do less client management work.</p>\n\n<h3>Current RecX Direct Opportunities</h3>\n\n<p>Right now there are 100+ live RecX Direct roles totaling $750,000 in placement fees across:</p>\n\n<ul>\n<li>Engineering (UK, USA, Europe)</li>\n<li>Healthcare (doctors, nurses, medical staff)</li>\n<li>Tech (software engineers, data scientists)</li>\n<li>Finance (accountants, CFOs, analysts)</li>\n<li>Sales (account executives, directors)</li>\n<li>HR (talent managers, recruiters)</li>\n</ul>\n\n<h3>Pro Tip: Speed Matters</h3>\n\n<p>Pro members see roles first and have a 3x higher fill rate because:</p>\n\n<ol>\n<li>They submit candidates before competition increases</li>\n<li>Clients often hire the first great match</li>\n<li>Early submissions get priority screening</li>\n</ol>\n\n<p>If you're serious about maximizing earnings, <a href=\"/pricing\">upgrade to Pro</a> for instant RecX Direct access.</p>`,
          publishedAt: '2026-02-22T00:00:00Z',
          category: 'Platform Updates',
          author: 'Tom Andrews',
          tags: ['recx-direct', 'earnings', 'strategy'],
        },
      ];
      
      // Filter by category if specified
      const filteredPosts = category
        ? mockPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
        : mockPosts;
      
      return NextResponse.json({
        posts: filteredPosts.slice(0, limit),
        total: filteredPosts.length,
        mock: true,
      });
    }
    
    // Production: Fetch from GHL Social Planner API
    const response = await fetch(`${GHL_API_URL}?locationId=${GHL_LOCATION_ID}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status}`);
    }
    
    const data = await response.json();
    const posts: BlogPost[] = data.events?.map(transformGHLPost) || [];
    
    // Filter by category if specified
    const filteredPosts = category
      ? posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
      : posts;
    
    return NextResponse.json({
      posts: filteredPosts,
      total: filteredPosts.length,
      mock: false,
    });
    
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error },
      { status: 500 }
    );
  }
}
