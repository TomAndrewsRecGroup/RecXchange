import { extractVisitorFromText } from '@/lib/groq/telegram';

describe('extractVisitorFromText', () => {
  it('extracts core visitor fields from a handover message', () => {
    const msg = [
      '🔔 Chat Handover — RecXchange',
      '🔗 ref:abc123_DEF-456',
      '',
      '👤 Name: Jane Doe',
      '📧 Email: jane@example.com',
      '🎯 Type: Recruiter',
      '📍 Page: Pricing',
      '',
      '💬 Last user message:',
      'Hello!',
    ].join('\n');

    expect(extractVisitorFromText(msg)).toEqual({
      name: 'Jane Doe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      persona: 'recruiter',
      companyName: undefined,
      pageContext: 'Pricing',
      conversationId: 'abc123_DEF-456',
    });
  });

  it('handles HTML-tagged variants and missing optional fields', () => {
    const msg = [
      '🔔 <b>Chat Handover — RecXchange</b>',
      '🔗 ref:xyz789',
      '',
      '👤 <b>Name:</b> Not provided',
      '📧 <b>Email:</b> sam@acme.com',
      '🎯 <b>Type:</b> Hiring Manager',
      '🏢 <b>Company:</b> ACME Ltd',
      '📍 <b>Page:</b> /hiring-manager-home',
    ].join('\n');

    expect(extractVisitorFromText(msg)).toEqual({
      name: undefined,
      firstName: undefined,
      lastName: undefined,
      email: 'sam@acme.com',
      persona: 'hiring-manager',
      companyName: 'ACME Ltd',
      pageContext: '/hiring-manager-home',
      conversationId: 'xyz789',
    });
  });
});

