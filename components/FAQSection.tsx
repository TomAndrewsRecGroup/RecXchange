// Server component wrapper — emits FAQPage JSON-LD schema then renders the
// client accordion. This means every page using <FAQSection> automatically
// gets structured data eligible for Google FAQ rich results and AI citation,
// with zero changes required on the calling page.

import FAQAccordion from '@/components/FAQAccordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
  color?: 'cyan' | 'fuchsia' | 'purple';
  showBadge?: boolean;
  badgeLabel?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle,
  faqs,
  color = 'purple',
  showBadge = true,
  badgeLabel = "COMMON QUESTIONS"
}: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQAccordion
        title={title}
        subtitle={subtitle}
        faqs={faqs}
        color={color}
        showBadge={showBadge}
        badgeLabel={badgeLabel}
      />
    </>
  );
}
