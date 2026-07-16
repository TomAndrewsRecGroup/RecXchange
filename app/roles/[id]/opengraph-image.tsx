import { ImageResponse } from 'next/og';
import { getRoleById } from '@/lib/roles/fetch';
import { formatSalary, formatSplit } from '@/lib/roles/format';

/**
 * Dynamic Open Graph image for each role - the card people see when a role
 * is shared on LinkedIn, X, Slack, or WhatsApp. Title, salary, and the split
 * fee on the brand gradient.
 */

export const runtime = 'edge';
export const alt = 'Live split-fee role on RecXchange';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await getRoleById(id);

  const title = role ? role.title : 'Live split-fee roles';
  const salary = role
    ? formatSalary(role.salaryMin, role.salaryMax, role.salaryCurrency)
    : '';
  const split =
    role?.splitAmount && role?.splitCurrency
      ? formatSplit(role.splitAmount, role.splitCurrency)
      : '';
  const location = role ? role.location : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundColor: '#060312',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 80% 0%, rgba(139,92,246,0.45), transparent 60%), radial-gradient(ellipse 60% 55% at 10% 100%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(ellipse 40% 40% at 95% 85%, rgba(217,70,239,0.25), transparent 60%)',
          color: '#f0eefa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 800 }}>
            <span>Rec</span>
            <span style={{ color: '#a855f7' }}>X</span>
            <span>change</span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#a5a3c2',
            }}
          >
            Live split-fee role
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: title.length > 45 ? 52 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {location ? (
            <div style={{ fontSize: 28, color: '#a5a3c2' }}>{location}</div>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end' }}>
          {salary ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 20,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#6f6d8f',
                }}
              >
                Salary
              </div>
              <div style={{ fontSize: 40, fontWeight: 800 }}>{salary}</div>
            </div>
          ) : null}
          {split ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 20,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#6f6d8f',
                }}
              >
                Your split fee
              </div>
              <div
                style={{ fontSize: 40, fontWeight: 800, color: '#d946ef' }}
              >
                {split}
              </div>
            </div>
          ) : null}
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 24,
              color: '#a5a3c2',
            }}
          >
            recxchange.io/roles
          </div>
        </div>
      </div>
    ),
    size
  );
}
