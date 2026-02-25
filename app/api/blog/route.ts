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

interface SocialPost {
  id: string;
  content: string;
  publishedAt: string;
  platform: string;
  category?: string;
  mediaUrl?: string;
  tags: string[];
}

// Transform GHL social post to our format
function transformGHLPost(ghlPost: any): SocialPost {
  // Extract category from tags or default
  const tags = ghlPost.tags || [];
  const category = tags[0] || 'General';
  
  return {
    id: ghlPost.id,
    content: ghlPost.content || ghlPost.title,
    publishedAt: ghlPost.scheduledDate || new Date().toISOString(),
    platform: ghlPost.platform || 'LinkedIn',
    category,
    mediaUrl: ghlPost.mediaUrl,
    tags: tags,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // For development/testing: Return mock social media posts if no API key configured
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.warn('GHL API credentials not configured. Returning mock social posts.');
      
      const mockPosts: SocialPost[] = [
        {
          id: '1',
          content: `🚀 RecXchange hits 15,000+ recruiters worldwide!\n\nThat's 15,000 partners ready to help you fill roles and place candidates.\n\n✨ What's possible with this network:\n• Access to 270M candidate profiles\n• $750k in live placement fees\n• Average fee: $7,000 per placement\n• Split fees up to 70% on RecX Direct\n\n💰 Zero platform fees. You keep 100% of your split.\n\nReady to partner? Link in bio 👆`,
          publishedAt: '2026-02-25T10:00:00Z',
          platform: 'LinkedIn',
          category: 'Platform Updates',
          tags: ['milestone', 'network', 'growth'],
        },
        {
          id: '2',
          content: `📊 Real numbers from Sarah, a healthcare recruiter:\n\nMonth 1 on RecXchange:\n✅ 3 placements made\n✅ $15,200 earned\n✅ 50/50, 60/40, and 70% splits\n\nHer secret? She upgraded to Pro ($250/month) for instant access to RecX Direct roles.\n\nOne placement paid for 5 months of membership.\n\nThe ROI speaks for itself 💯`,
          publishedAt: '2026-02-24T14:30:00Z',
          platform: 'LinkedIn',
          category: 'Success Stories',
          tags: ['success-story', 'earnings', 'healthcare'],
        },
        {
          id: '3',
          content: `💡 Split fee comparison on a $10,000 placement:\n\n50/50 split: You earn $5,000\n60/40 split: You earn $6,000\n70% RecX Direct: You earn $7,000\n\nThat's a $2,000 difference between standard and RecX Direct.\n\nPro members get instant access to RecX Direct roles.\nLite members wait 7 days.\nEntry members wait 30 days.\n\nSpeed = earnings in recruitment 🏃‍♂️💨`,
          publishedAt: '2026-02-23T11:00:00Z',
          platform: 'LinkedIn',
          category: 'Recruitment Tips',
          tags: ['fee-splits', 'strategy', 'recx-direct'],
        },
        {
          id: '4',
          content: `🤝 Why recruiters love RecXchange:\n\n"I was skeptical about sharing fees. But I've made MORE money by partnering than working alone." - Mark, Tech Recruiter\n\n"The candidates submitted to my roles are higher quality than what I find myself." - Lisa, Finance Recruiter\n\n"I filled a role in 48 hours that I'd been stuck on for 2 months." - David, Engineering Recruiter\n\nPartnership > Competition 🚀`,
          publishedAt: '2026-02-22T09:15:00Z',
          platform: 'LinkedIn',
          category: 'Success Stories',
          tags: ['testimonials', 'community', 'partnership'],
        },
        {
          id: '5',
          content: `🎯 Top 5 highest-earning niches on RecXchange:\n\n1. Engineering - Average fee: $8,500\n2. Healthcare - Average fee: $7,800\n3. Tech/Software - Average fee: $9,200\n4. Finance - Average fee: $7,500\n5. Sales Leadership - Average fee: $8,000\n\nAll niches available across UK, USA, Europe, Middle East, Africa, and Australia.\n\n100+ live RecX Direct roles right now 📈`,
          publishedAt: '2026-02-21T16:45:00Z',
          platform: 'LinkedIn',
          category: 'Industry News',
          tags: ['niches', 'fees', 'opportunities'],
        },
        {
          id: '6',
          content: `⚡ Quick wins with RecXchange:\n\nDay 1: Post your hardest-to-fill role\nDay 2: Receive 3-5 candidate submissions\nDay 3: Screen and shortlist top 2\nWeek 2: Client interviews\nWeek 3: Offer made\nWeek 4: Candidate starts, fee splits 50/50\n\nAverage time from post to placement: 21 days.\n\nThat's 3x faster than solo recruiting 🚀\n\nStart your free trial: $1 for the first month`,
          publishedAt: '2026-02-20T13:20:00Z',
          platform: 'LinkedIn',
          category: 'Platform Updates',
          tags: ['quick-wins', 'timeline', 'process'],
        },
        {
          id: '7',
          content: `🔒 Client protection on RecXchange:\n\n❌ Company name hidden until you approve\n❌ Contact details private\n❌ Hiring manager name masked\n❌ No direct access for other recruiters\n\n✅ You control ALL information sharing\n✅ Legal contracts signed BEFORE details shared\n✅ Timestamp protection on submissions\n✅ Your client relationships stay yours\n\nPartnership doesn't mean giving up control 💪`,
          publishedAt: '2026-02-19T10:30:00Z',
          platform: 'LinkedIn',
          category: 'Platform Updates',
          tags: ['protection', 'privacy', 'security'],
        },
        {
          id: '8',
          content: `💰 RecXchange pricing breakdown:\n\nEntry: $1/month (5 tokens) - Test the waters\nLite: $99/month (150 tokens) - Serious recruiters\nPro: $250/month (400 tokens) - Instant RecX Direct access\nTeams: Custom - 5+ recruiters\n\n1 token = Post 1 role OR Submit 1 candidate\n\nZero platform fees. Zero hidden costs. Zero surprises.\n\nOne placement pays for 3-12 months of membership 📊`,
          publishedAt: '2026-02-18T15:00:00Z',
          platform: 'LinkedIn',
          category: 'Platform Updates',
          tags: ['pricing', 'value', 'roi'],
        },
      ];
      
      // Filter by category if specified
      const filteredPosts = category
        ? mockPosts.filter(post => post.category?.toLowerCase() === category.toLowerCase())
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
    const posts: SocialPost[] = data.events?.map(transformGHLPost) || [];
    
    // Filter by category if specified
    const filteredPosts = category
      ? posts.filter(post => post.category?.toLowerCase() === category.toLowerCase())
      : posts;
    
    return NextResponse.json({
      posts: filteredPosts,
      total: filteredPosts.length,
      mock: false,
    });
    
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social posts', details: error },
      { status: 500 }
    );
  }
}
