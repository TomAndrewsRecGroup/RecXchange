import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'RecXchange - Recruiter Collaboration Platform';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00f0ff 0%, #ff00ff 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            RecXchange
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#a0a0a0',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            15,000+ recruiters splitting fees on placements
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#00f0ff',
              marginTop: '20px',
            }}
          >
            Access 270M candidates • $750K+ in live fees
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
