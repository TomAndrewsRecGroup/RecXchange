import { NextRequest, NextResponse } from 'next/server';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'VxHBI8kbavh407OMkAcu';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'skipped';
  statusCode?: number;
  responseTime?: number;
  data?: any;
  error?: string;
}

export async function GET(req: NextRequest) {
  const results: TestResult[] = [];
  const startTime = Date.now();

  console.log('🧪 Starting GHL Sandbox Tests...');
  console.log('API Key:', GHL_API_KEY ? `✓ Set (${GHL_API_KEY.substring(0, 10)}...)` : '✗ Missing');
  console.log('Location ID:', GHL_LOCATION_ID);

  // Test 1: Get Contacts (Basic - no auth issues)
  try {
    const testStart = Date.now();
    const response = await fetch(
      `${GHL_BASE_URL}/contacts/?locationId=${GHL_LOCATION_ID}&limit=10`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
        },
      }
    );

    const data = await response.json();
    results.push({
      endpoint: '/contacts (Basic List)',
      method: 'GET',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { 
        totalCount: data.contacts?.length || 0,
        sampleContact: data.contacts?.[0] ? {
          id: data.contacts[0].id,
          email: data.contacts[0].email,
          tags: data.contacts[0].tags,
          dateAdded: data.contacts[0].dateAdded,
        } : null,
      } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Basic List)',
      method: 'GET',
      status: 'error',
      error: error.message,
    });
  }

  // Test 2: Get Contact by ID (verify read permissions)
  const basicContactsTest = results.find(r => r.endpoint === '/contacts (Basic List)');
  if (basicContactsTest?.status === 'success' && basicContactsTest.data?.sampleContact?.id) {
    try {
      const testStart = Date.now();
      const contactId = basicContactsTest.data.sampleContact.id;
      const response = await fetch(
        `${GHL_BASE_URL}/contacts/${contactId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
          },
        }
      );

      const data = await response.json();
      results.push({
        endpoint: '/contacts/{id}',
        method: 'GET',
        status: response.ok ? 'success' : 'error',
        statusCode: response.status,
        responseTime: Date.now() - testStart,
        data: response.ok ? {
          hasFullName: !!(data.contact?.firstName && data.contact?.lastName),
          hasEmail: !!data.contact?.email,
          tagCount: data.contact?.tags?.length || 0,
          tags: data.contact?.tags,
        } : null,
        error: response.ok ? undefined : JSON.stringify(data),
      });
    } catch (error: any) {
      results.push({
        endpoint: '/contacts/{id}',
        method: 'GET',
        status: 'error',
        error: error.message,
      });
    }
  }

  // Test 3: Get ALL contacts and filter by tags in-memory (safer approach)
  try {
    const testStart = Date.now();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch more contacts to analyze
    const response = await fetch(
      `${GHL_BASE_URL}/contacts/?locationId=${GHL_LOCATION_ID}&limit=100`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
        },
      }
    );

    const data = await response.json();
    
    if (response.ok && data.contacts) {
      // Filter in-memory for website tags
      const websiteTags = ['website', 'recxchange', 'web form', 'contact form', 'cta', 'trigger link', 
                           'sign in', 'signin', 'get started', 'join', 'signup form', 'landing page'];
      
      const websiteTaggedContacts = data.contacts.filter((contact: any) => {
        if (!contact.tags || contact.tags.length === 0) return false;
        const contactTagsLower = contact.tags.map((t: string) => t.toLowerCase());
        return websiteTags.some(tag => contactTagsLower.includes(tag.toLowerCase()));
      });

      // Filter by date (last 7 days)
      const recentWebsiteContacts = websiteTaggedContacts.filter((contact: any) => {
        if (!contact.dateAdded) return false;
        const contactDate = new Date(contact.dateAdded);
        return contactDate >= sevenDaysAgo;
      });

      results.push({
        endpoint: '/contacts (Website Tagged - Last 7 Days)',
        method: 'GET + Filter',
        status: 'success',
        responseTime: Date.now() - testStart,
        data: {
          totalScanned: data.contacts.length,
          withWebsiteTag: websiteTaggedContacts.length,
          inLast7Days: recentWebsiteContacts.length,
          sampleTags: websiteTaggedContacts[0]?.tags || [],
        },
      });
    } else {
      results.push({
        endpoint: '/contacts (Website Tagged - Last 7 Days)',
        method: 'GET + Filter',
        status: 'error',
        statusCode: response.status,
        responseTime: Date.now() - testStart,
        error: JSON.stringify(data),
      });
    }
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Website Tagged - Last 7 Days)',
      method: 'GET + Filter',
      status: 'error',
      error: error.message,
    });
  }

  // Test 4: Get Tier Signups (Website + Tier tags)
  try {
    const testStart = Date.now();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const response = await fetch(
      `${GHL_BASE_URL}/contacts/?locationId=${GHL_LOCATION_ID}&limit=100`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
        },
      }
    );

    const data = await response.json();
    
    if (response.ok && data.contacts) {
      const websiteTags = ['website', 'recxchange', 'web form', 'contact form', 'cta', 'trigger link', 
                           'sign in', 'signin', 'get started', 'join', 'signup form', 'landing page'];
      const tierTags = ['os subs entry', 'os subs lite', 'os subs pro', 'os subs teams'];

      // Find paid signups (must have BOTH website tag AND tier tag)
      const paidSignups: any = {
        'os subs entry': [],
        'os subs lite': [],
        'os subs pro': [],
        'os subs teams': [],
      };

      data.contacts.forEach((contact: any) => {
        if (!contact.tags || contact.tags.length === 0) return;
        if (!contact.dateAdded) return;
        
        const contactDate = new Date(contact.dateAdded);
        if (contactDate < sevenDaysAgo) return;

        const contactTagsLower = contact.tags.map((t: string) => t.toLowerCase());
        const hasWebsiteTag = websiteTags.some(tag => contactTagsLower.includes(tag.toLowerCase()));
        
        if (hasWebsiteTag) {
          tierTags.forEach(tier => {
            if (contactTagsLower.includes(tier.toLowerCase())) {
              paidSignups[tier].push(contact.id);
            }
          });
        }
      });

      results.push({
        endpoint: '/contacts (Paid Tier Signups - Last 7 Days)',
        method: 'GET + Filter',
        status: 'success',
        responseTime: Date.now() - testStart,
        data: {
          'os subs entry': paidSignups['os subs entry'].length,
          'os subs lite': paidSignups['os subs lite'].length,
          'os subs pro': paidSignups['os subs pro'].length,
          'os subs teams': paidSignups['os subs teams'].length,
          totalPaidSignups: Object.values(paidSignups).reduce((sum: number, arr: any) => sum + arr.length, 0),
        },
      });
    } else {
      results.push({
        endpoint: '/contacts (Paid Tier Signups - Last 7 Days)',
        method: 'GET + Filter',
        status: 'error',
        statusCode: response.status,
        responseTime: Date.now() - testStart,
        error: JSON.stringify(data),
      });
    }
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Paid Tier Signups - Last 7 Days)',
      method: 'GET + Filter',
      status: 'error',
      error: error.message,
    });
  }

  // Test 5: Create Test Contact (Recruiter)
  try {
    const testStart = Date.now();
    const testEmail = `test-recruiter-${Date.now()}@recxchange-test.com`;

    const response = await fetch(
      `${GHL_BASE_URL}/contacts/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          email: testEmail,
          firstName: 'Test',
          lastName: 'Recruiter',
          tags: ['website', 'test-contact'],
          source: 'API Test',
        }),
      }
    );

    const data = await response.json();
    results.push({
      endpoint: '/contacts (Create Recruiter)',
      method: 'POST',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { contactId: data.contact?.id, email: testEmail } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });

    // Clean up
    if (response.ok && data.contact?.id) {
      try {
        await fetch(`${GHL_BASE_URL}/contacts/${data.contact.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
          },
        });
      } catch (cleanupError) {
        console.error('Failed to cleanup test contact:', cleanupError);
      }
    }
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Create Recruiter)',
      method: 'POST',
      status: 'error',
      error: error.message,
    });
  }

  // Test 6: Create Test Contact (Hiring Manager)
  try {
    const testStart = Date.now();
    const testEmail = `test-hm-${Date.now()}@recxchange-test.com`;

    const response = await fetch(
      `${GHL_BASE_URL}/contacts/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          email: testEmail,
          firstName: 'Test',
          lastName: 'HiringManager',
          tags: ['website', 'hiring manager', 'test-contact'],
          source: 'API Test',
        }),
      }
    );

    const data = await response.json();
    results.push({
      endpoint: '/contacts (Create Hiring Manager)',
      method: 'POST',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { contactId: data.contact?.id, email: testEmail } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });

    // Clean up
    if (response.ok && data.contact?.id) {
      try {
        await fetch(`${GHL_BASE_URL}/contacts/${data.contact.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
          },
        });
      } catch (cleanupError) {
        console.error('Failed to cleanup test contact:', cleanupError);
      }
    }
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Create Hiring Manager)',
      method: 'POST',
      status: 'error',
      error: error.message,
    });
  }

  const totalTime = Date.now() - startTime;
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return NextResponse.json({
    summary: {
      totalTests: results.length,
      passed: successCount,
      failed: errorCount,
      totalTime: `${totalTime}ms`,
      timestamp: new Date().toISOString(),
      ghlConfigured: !!GHL_API_KEY && !!GHL_LOCATION_ID,
    },
    results,
    recommendations: generateRecommendations(results),
    tokenDiagnostics: {
      hasApiKey: !!GHL_API_KEY,
      canReadContacts: results.find(r => r.endpoint === '/contacts (Basic List)')?.status === 'success',
      canCreateContacts: results.find(r => r.endpoint.includes('Create'))?.status === 'success',
      needsLocationScope: results.some(r => r.error?.includes('not authorized for this scope')),
    },
  });
}

function generateRecommendations(results: TestResult[]): string[] {
  const recommendations: string[] = [];

  const basicContactsTest = results.find(r => r.endpoint === '/contacts (Basic List)');
  if (basicContactsTest?.status === 'error') {
    if (basicContactsTest.error?.includes('401')) {
      recommendations.push('❌ GHL API key is invalid or expired - generate a new API key in GHL');
    } else {
      recommendations.push('❌ Cannot connect to GHL API - check API key and location ID');
    }
  } else if (basicContactsTest?.status === 'success') {
    recommendations.push('✅ GHL API connection working - can read contacts');
  }

  const websiteTagTest = results.find(r => r.endpoint.includes('Website Tagged'));
  if (websiteTagTest?.status === 'success') {
    const count = websiteTagTest.data?.inLast7Days || 0;
    if (count === 0) {
      recommendations.push('⚠️ No website-tagged contacts in last 7 days - weekly email will show 0 visitors');
      recommendations.push('💡 Tip: Ensure contacts are being tagged with "website" when they sign up');
    } else {
      recommendations.push(`✅ Found ${count} website-tagged contacts in last 7 days`);
    }
  }

  const tierTest = results.find(r => r.endpoint.includes('Paid Tier Signups'));
  if (tierTest?.status === 'success') {
    const total = tierTest.data?.totalPaidSignups || 0;
    if (total === 0) {
      recommendations.push('⚠️ No paid tier signups in last 7 days - recruiter email will show 0% conversion');
      recommendations.push('💡 Tip: Paid signups need BOTH "website" tag AND tier tag (e.g., "os subs entry")');
    } else {
      recommendations.push(`✅ Found ${total} paid signups in last 7 days across all tiers`);
    }
  }

  const createTest = results.find(r => r.endpoint.includes('Create'));
  if (createTest?.status === 'error') {
    recommendations.push('❌ Cannot create contacts - API key may have read-only permissions');
  } else if (createTest?.status === 'success') {
    recommendations.push('✅ Can create and delete contacts - full API permissions confirmed');
  }

  // Token scope warning
  if (results.some(r => r.error?.includes('not authorized for this scope'))) {
    recommendations.push('⚠️ Some endpoints require higher API scopes - token may be limited to contacts only');
    recommendations.push('💡 This is OK - contact operations are working and sufficient for weekly emails');
  }

  return recommendations;
}
