'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
  color?: 'cyan' | 'fuchsia' | 'purple';
  showBadge?: boolean;
  badgeLabel?: string;
}

// Client component — handles accordion open/close state only.
// Schema injection is handled by the parent FAQSection server component.
export default function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle,
  faqs,
  color = 'purple',
  showBadge = true,
  badgeLabel = "COMMON QUESTIONS"
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full" aria-labelledby="faq-title">
      <HolographicCard color={color} variant="content">
        {showBadge && <StatusBadge label={badgeLabel} color={color} size="sm" />}
        
        <h2 
          id="faq-title"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 mt-4"
        >
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8">
            {subtitle}
          </p>
        )}

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden bg-black/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/5 transition-colors group"
              >
                <span className="text-white font-semibold text-sm sm:text-base pr-4 group-hover:text-cyan-400 transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-cyan-400">
                  {openIndex === index ? (
                    <ChevronUp size={20} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={20} aria-hidden="true" />
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0"
                >
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Still have questions?{' '}
            <a 
              href="/contact" 
              className="text-cyan-400 hover:text-white transition-colors underline"
            >
              Contact our support team
            </a>
            {' '}or visit our{' '}
            <a 
              href="/faq" 
              className="text-cyan-400 hover:text-white transition-colors underline"
            >
              comprehensive FAQ page
            </a>
            .
          </p>
        </div>
      </HolographicCard>
    </section>
  );
}
