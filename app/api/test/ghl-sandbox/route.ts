import { NextRequest, NextResponse } from 'next/server';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'VxHBI8kbavh407OMkAcu';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'success' | 'error';
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

  // Test 1: Get Location Info
  try {
    const testStart = Date.now();
    const response = await fetch(`${GHL_BASE_URL}/locations/${GHL_LOCATION_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
      },
    });

    const data = await response.json();
    results.push({
      endpoint: `/locations/${GHL_LOCATION_ID}`,
      method: 'GET',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { name: data.location?.name, id: data.location?.id } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });
  } catch (error: any) {
    results.push({
      endpoint: `/locations/${GHL_LOCATION_ID}`,
      method: 'GET',
      status: 'error',
      error: error.message,
    });
  }

  // Test 2: Search for Contacts (Website Tagged - Last 7 Days)
  try {
    const testStart = Date.now();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

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
      endpoint: '/contacts (Recent)',
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
        } : null,
      } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });
  } catch (error: any) {
    results.push({
      endpoint: '/contacts (Recent)',
      method: 'GET',
      status: 'error',
      error: error.message,
    });
  }

  // Test 3: Get Tags
  try {
    const testStart = Date.now();
    const response = await fetch(
      `${GHL_BASE_URL}/locations/${GHL_LOCATION_ID}/tags`,
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
      endpoint: '/locations/{id}/tags',
      method: 'GET',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { 
        totalTags: data.tags?.length || 0,
        relevantTags: data.tags?.filter((t: any) => 
          t.name.toLowerCase().includes('website') ||
          t.name.toLowerCase().includes('tier') ||
          t.name.toLowerCase().includes('quick-action') ||
          t.name.toLowerCase().includes('os subs')
        ).map((t: any) => t.name),
      } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });
  } catch (error: any) {
    results.push({
      endpoint: '/locations/{id}/tags',
      method: 'GET',
      status: 'error',
      error: error.message,
    });
  }

  // Test 4: Get Contacts with Website Tag (Last 7 Days)
  try {
    const testStart = Date.now();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const response = await fetch(
      `${GHL_BASE_URL}/contacts/search?locationId=${GHL_LOCATION_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filters: [
            {
              field: 'tags',
              operator: 'contains',
              value: 'website',
            },
            {
              field: 'dateAdded',
              operator: 'after',
              value: sevenDaysAgo.toISOString(),
            },
          ],
        }),
      }
    );

    const data = await response.json();
    results.push({
      endpoint: '/contacts/search (Website Tagged)',
      method: 'POST',
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime: Date.now() - testStart,
      data: response.ok ? { 
        count: data.total || 0,
        sampleIds: data.contacts?.slice(0, 3).map((c: any) => c.id),
      } : null,
      error: response.ok ? undefined : JSON.stringify(data),
    });
  } catch (error: any) {
    results.push({
      endpoint: '/contacts/search (Website Tagged)',
      method: 'POST',
      status: 'error',
      error: error.message,
    });
  }

  // Test 5: Get Contacts with Tier Tags (Paid Signups)
  try {
    const testStart = Date.now();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const tierTags = ['os subs entry', 'os subs lite', 'os subs pro', 'os subs teams'];
    const tierResults: any = {};

    for (const tier of tierTags) {
      try {
        const tierResponse = await fetch(
          `${GHL_BASE_URL}/contacts/search?locationId=${GHL_LOCATION_ID}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filters: [
                {
                  field: 'tags',
                  operator: 'contains',
                  value: tier,
                },
                {
                  field: 'dateAdded',
                  operator: 'after',
                  value: sevenDaysAgo.toISOString(),
                },
              ],
            }),
          }
        );

        const tierData = await tierResponse.json();
        tierResults[tier] = tierData.total || 0;
      } catch (err) {
        tierResults[tier] = 'error';
      }
    }

    results.push({
      endpoint: '/contacts/search (All Tiers)',
      method: 'POST',
      status: 'success',
      responseTime: Date.now() - testStart,
      data: tierResults,
    });
  } catch (error: any) {
    results.push({
      endpoint: '/contacts/search (All Tiers)',
      method: 'POST',
      status: 'error',
      error: error.message,
    });
  }

  // Test 6: Create Test Contact (Recruiter Flow)
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

    // Clean up test contact
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

  // Test 7: Create Test Contact (Hiring Manager Flow)
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

    // Clean up test contact
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
  });
}

function generateRecommendations(results: TestResult[]): string[] {
  const recommendations: string[] = [];

  const locationTest = results.find(r => r.endpoint.includes('/locations/'));
  if (locationTest?.status === 'error') {
    recommendations.push('❌ GHL API credentials are invalid or location ID is incorrect');
  }

  const contactsTest = results.find(r => r.endpoint === '/contacts (Recent)');
  if (contactsTest?.status === 'success' && contactsTest.data?.totalCount === 0) {
    recommendations.push('⚠️ No contacts found in GHL - may need to import or create test data');
  }

  const websiteTagTest = results.find(r => r.endpoint.includes('Website Tagged'));
  if (websiteTagTest?.status === 'success' && websiteTagTest.data?.count === 0) {
    recommendations.push('⚠️ No contacts with "website" tag in last 7 days - weekly email will show 0 visitors');
  }

  const tierTest = results.find(r => r.endpoint.includes('All Tiers'));
  if (tierTest?.status === 'success') {
    const totalTierSignups = Object.values(tierTest.data || {}).reduce((sum: number, val: any) => 
      sum + (typeof val === 'number' ? val : 0), 0
    );
    if (totalTierSignups === 0) {
      recommendations.push('⚠️ No paid tier signups in last 7 days - GHL section in recruiter email will show 0%');
    }
  }

  const createRecruiterTest = results.find(r => r.endpoint.includes('Create Recruiter'));
  const createHMTest = results.find(r => r.endpoint.includes('Create Hiring Manager'));
  if (createRecruiterTest?.status === 'error' || createHMTest?.status === 'error') {
    recommendations.push('❌ Cannot create contacts in GHL - check API permissions');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ All GHL integrations are working correctly!');
  }

  return recommendations;
}
