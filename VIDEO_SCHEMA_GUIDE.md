# VideoObject Schema Guide for RecXchange

> **Purpose**: This guide provides comprehensive VideoObject structured data implementation for RecXchange video content to optimize for Google Video Search, YouTube SEO, and AI Overview/GEO visibility.

---

## When to Use VideoObject Schema

Implement VideoObject schema when you have:
- Platform demo videos
- Tutorial/walkthrough videos
- Recruiter testimonial videos
- Feature explanation videos
- Webinar recordings
- Customer success story videos
- Product announcement videos

---

## Basic VideoObject Schema Template

### For YouTube Videos Embedded on RecXchange

```typescript
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to Split Recruitment Fees on RecXchange - Complete Tutorial",
  "description": "Learn the step-by-step process of collaborating with other recruiters and splitting placement fees on RecXchange. This tutorial covers partnership requests, contract signing, and fee distribution.",
  "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "uploadDate": "2026-02-01T08:00:00Z",
  "duration": "PT8M30S", // 8 minutes 30 seconds in ISO 8601 format
  "contentUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "publisher": {
    "@type": "Organization",
    "name": "RecXchange",
    "logo": {
      "@type": "ImageObject",
      "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      "width": 512,
      "height": 512
    }
  },
  "author": {
    "@type": "Person",
    "name": "Tom Andrews",
    "jobTitle": "CEO, RecXchange"
  },
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WatchAction",
    "userInteractionCount": 1250 // Update with actual view count
  },
  "videoQuality": "HD",
  "transcript": "Welcome to RecXchange. Today I'll show you how to split recruitment fees...", // Optional but HIGHLY recommended for SEO
  "hasPart": [ // Optional: Video chapters for long videos
    {
      "@type": "Clip",
      "name": "Introduction to Split Fees",
      "startOffset": 0,
      "endOffset": 120,
      "url": "https://www.youtube.com/watch?v=VIDEO_ID&t=0s"
    },
    {
      "@type": "Clip",
      "name": "Finding a Partnership",
      "startOffset": 120,
      "endOffset": 300,
      "url": "https://www.youtube.com/watch?v=VIDEO_ID&t=120s"
    }
  ]
}
```

---

## Duration Format (ISO 8601)

**Format**: `PT[hours]H[minutes]M[seconds]S`

**Examples**:
- 30 seconds: `PT30S`
- 2 minutes: `PT2M`
- 2 minutes 30 seconds: `PT2M30S`
- 1 hour 5 minutes 20 seconds: `PT1H5M20S`
- 8 minutes 30 seconds: `PT8M30S`

**JavaScript Helper Function**:

```typescript
function secondsToISO8601Duration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;
  
  return duration;
}

// Usage:
const duration = secondsToISO8601Duration(510); // "PT8M30S"
```

---

## Video Schema for Different Content Types

### 1. Platform Demo Video

```typescript
const platformDemoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "RecXchange Platform Demo - See How 15,000+ Recruiters Collaborate",
  "description": "Full platform walkthrough showing how recruiters post roles, submit candidates, sign contracts, and split fees on RecXchange. Watch the AI-powered matching engine in action.",
  "thumbnailUrl": "https://img.youtube.com/vi/DEMO_VIDEO_ID/maxresdefault.jpg",
  "uploadDate": "2026-02-15T10:00:00Z",
  "duration": "PT12M45S",
  "contentUrl": "https://www.youtube.com/watch?v=DEMO_VIDEO_ID",
  "embedUrl": "https://www.youtube.com/embed/DEMO_VIDEO_ID",
  "publisher": {
    "@type": "Organization",
    "name": "RecXchange"
  },
  "genre": "Technology",
  "isFamilyFriendly": true,
  "inLanguage": "en-GB",
  "teaches": "How to use the RecXchange recruitment collaboration platform"
}
```

### 2. Customer Testimonial Video

```typescript
const testimonialSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Sarah Jones Made £37,000 in 3 Months on RecXchange | Recruiter Success Story",
  "description": "UK recruiter Sarah Jones shares how she earned £37,000 in her first quarter using RecXchange to collaborate on placements. Learn her strategy for finding high-value partnerships.",
  "thumbnailUrl": "https://img.youtube.com/vi/TESTIMONIAL_ID/maxresdefault.jpg",
  "uploadDate": "2026-02-20T14:00:00Z",
  "duration": "PT6M15S",
  "contentUrl": "https://www.youtube.com/watch?v=TESTIMONIAL_ID",
  "embedUrl": "https://www.youtube.com/embed/TESTIMONIAL_ID",
  "publisher": {
    "@type": "Organization",
    "name": "RecXchange"
  },
  "mentions": [
    {
      "@type": "Person",
      "name": "Sarah Jones",
      "jobTitle": "Independent Recruiter"
    },
    {
      "@type": "SoftwareApplication",
      "name": "RecXchange",
      "url": "https://recxchange.io"
    }
  ],
  "about": {
    "@type": "Thing",
    "name": "Split Fee Recruitment Success"
  }
}
```

### 3. Tutorial Video Series

```typescript
const tutorialSeriesSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "RecXchange Masterclass Part 1: Finding Perfect Partnerships",
  "description": "Part 1 of our 5-part masterclass series. Learn advanced strategies for finding high-quality recruiter partnerships on RecXchange. Includes filtering techniques, profile evaluation, and partnership request best practices.",
  "thumbnailUrl": "https://img.youtube.com/vi/MASTERCLASS_1/maxresdefault.jpg",
  "uploadDate": "2026-02-10T09:00:00Z",
  "duration": "PT15M20S",
  "contentUrl": "https://www.youtube.com/watch?v=MASTERCLASS_1",
  "embedUrl": "https://www.youtube.com/embed/MASTERCLASS_1",
  "publisher": {
    "@type": "Organization",
    "name": "RecXchange"
  },
  "partOfSeries": {
    "@type": "CreativeWorkSeries",
    "name": "RecXchange Masterclass Series",
    "numberOfEpisodes": 5
  },
  "educationalLevel": "Intermediate",
  "teaches": "Finding and evaluating recruiter partnerships",
  "hasPart": [
    {
      "@type": "Clip",
      "name": "Advanced Search Filters",
      "startOffset": 0,
      "endOffset": 180,
      "url": "https://www.youtube.com/watch?v=MASTERCLASS_1&t=0s"
    },
    {
      "@type": "Clip",
      "name": "Evaluating Recruiter Ratings",
      "startOffset": 180,
      "endOffset": 480,
      "url": "https://www.youtube.com/watch?v=MASTERCLASS_1&t=180s"
    },
    {
      "@type": "Clip",
      "name": "Writing Effective Partnership Requests",
      "startOffset": 480,
      "endOffset": 920,
      "url": "https://www.youtube.com/watch?v=MASTERCLASS_1&t=480s"
    }
  ]
}
```

---

## Implementation Examples

### React Component with Video Schema

```typescript
// components/video-player.tsx
import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
  durationSeconds: number;
  viewCount?: number;
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  uploadDate,
  durationSeconds,
  viewCount = 0
}: VideoPlayerProps) {
  
  // Convert seconds to ISO 8601 duration
  const durationISO = secondsToISO8601Duration(durationSeconds);
  
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    "uploadDate": uploadDate,
    "duration": durationISO,
    "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
    "publisher": {
      "@type": "Organization",
      "name": "RecXchange",
      "logo": {
        "@type": "ImageObject",
        "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      }
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": viewCount
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      
      <div className="relative aspect-video rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </>
  );
}

function secondsToISO8601Duration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;
  
  return duration;
}
```

### Usage Example

```typescript
// app/demo/page.tsx
import VideoPlayer from '@/components/video-player';

export default function DemoPage() {
  return (
    <main className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold mb-8">Platform Demo</h1>
        
        <VideoPlayer
          videoId="YOUR_YOUTUBE_VIDEO_ID"
          title="RecXchange Platform Demo - See How 15,000+ Recruiters Collaborate"
          description="Full platform walkthrough showing how recruiters post roles, submit candidates, sign contracts, and split fees."
          uploadDate="2026-02-15T10:00:00Z"
          durationSeconds={765} // 12 minutes 45 seconds
          viewCount={1250}
        />
      </div>
    </main>
  );
}
```

---

## Advanced: Video Sitemaps

For sites with multiple videos, create a dedicated video sitemap:

### File: `app/video-sitemap.xml/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const videos = [
    {
      url: 'https://recxchange.io/demo',
      title: 'RecXchange Platform Demo',
      description: 'Full platform walkthrough',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg',
      contentUrl: 'https://www.youtube.com/watch?v=VIDEO_ID_1',
      duration: 765, // seconds
      uploadDate: '2026-02-15T10:00:00Z'
    },
    // Add more videos...
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videos.map(video => `
  <url>
    <loc>${video.url}</loc>
    <video:video>
      <video:title>${video.title}</video:title>
      <video:description>${video.description}</video:description>
      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>
      <video:content_loc>${video.contentUrl}</video:content_loc>
      <video:duration>${video.duration}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

Then reference it in your main `robots.txt`:

```txt
Sitemap: https://recxchange.io/sitemap.xml
Sitemap: https://recxchange.io/video-sitemap.xml
```

---

## Testing VideoObject Schema

**Tools**:
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema Markup Validator](https://validator.schema.org/)
3. [YouTube Video Schema Validator](https://developers.google.com/search/docs/appearance/structured-data/video)

**What to Check**:
- [ ] `name` is compelling and includes target keywords
- [ ] `description` is 50-150 words
- [ ] `thumbnailUrl` is high quality (at least 1280x720)
- [ ] `duration` is in ISO 8601 format
- [ ] `uploadDate` is accurate
- [ ] `contentUrl` and `embedUrl` are valid
- [ ] `interactionStatistic` updates regularly (view count)
- [ ] `hasPart` chapters align with actual video timestamps
- [ ] No validation errors in Rich Results Test

---

## SEO Best Practices for Video Content

### 1. Video Title Optimization
- Include primary keyword in first 5 words
- Keep under 60 characters
- Make it compelling and clickable

**Examples**:
- ✅ "Split Recruitment Fees: Complete RecXchange Tutorial (2026)"
- ❌ "Tutorial Video About How to Use Our Platform"

### 2. Video Description Optimization
- First 2 sentences are most important (appear in previews)
- Include target keywords naturally
- Add timestamps for chapters
- Link to relevant pages

**Example**:
```
Learn how to split recruitment fees on RecXchange in this complete 2026 tutorial. 
This guide shows the exact 8-step process used by 15,000+ recruiters to earn 
an average of £7,000 per placement.

What you'll learn:
0:00 - Introduction
0:45 - Finding partnerships
2:30 - Signing contracts
5:15 - Splitting fees

Get started: https://recxchange.io/pricing
Read the FAQ: https://recxchange.io/faq
```

### 3. Thumbnail Optimization
- Minimum 1280x720 resolution
- Include text overlay (5-7 words max)
- Use brand colors (cyan #00FFFF, fuchsia #FF00FF)
- Show human faces when possible (increases CTR)
- Test multiple thumbnails

### 4. Transcript/Captions
- Add full transcript to video description
- Upload accurate .SRT captions file
- Helps SEO and accessibility
- AI can extract more context

---

## Common Mistakes to Avoid

❌ **Wrong Duration Format**
```json
"duration": "8:30" // WRONG - not ISO 8601
"duration": "PT8M30S" // CORRECT
```

❌ **Missing Thumbnail**
```json
"thumbnailUrl": "" // WRONG - required field
"thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" // CORRECT
```

❌ **Invalid Upload Date**
```json
"uploadDate": "2026-02-15" // WRONG - missing time
"uploadDate": "2026-02-15T10:00:00Z" // CORRECT - ISO 8601 with timezone
```

❌ **Both contentUrl and embedUrl Point to Same URL**
```json
"contentUrl": "https://www.youtube.com/embed/VIDEO_ID", // WRONG
"embedUrl": "https://www.youtube.com/embed/VIDEO_ID"

// CORRECT:
"contentUrl": "https://www.youtube.com/watch?v=VIDEO_ID", // Watch page
"embedUrl": "https://www.youtube.com/embed/VIDEO_ID" // Embed URL
```

---

## Maintenance Schedule

**Weekly**:
- Update `interactionStatistic.userInteractionCount` with current view counts
- Monitor video performance in Google Search Console

**Monthly**:
- Add new videos with proper schema
- Update video descriptions with latest links
- Check for broken embedUrls

**Quarterly**:
- Review video SEO performance
- Update thumbnails for underperforming videos
- Add new chapter timestamps to long videos
- Test schema with Rich Results Test

---

## Contact

For questions about video schema implementation:
- Technical Lead: Tom Andrews
- Marketing Site: https://recxchange.io
- Support: support@recxchange.io

---

**Last Updated**: February 28, 2026
**Document Version**: 1.0
**Next Review Date**: May 28, 2026
