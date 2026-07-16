import { safeJsonLd } from '@/lib/seo/jsonld';
// SpeakableSchema - server component, injected in layout <head>.
// Invisible to users. Read only by Google Assistant, AI crawlers, and TTS engines.
// Marks the most answer-worthy passages on the site for generative engine citation.
// https://schema.org/speakable

export default function SpeakableSchema() {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/#webpage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "h1",
        "h2",
        "[data-speakable]",
        ".speakable"
      ],
      "xpath": [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content"
      ]
    },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "RecXchange",
          "item": "https://recxchange.io"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(speakableSchema) }}
    />
  );
}
