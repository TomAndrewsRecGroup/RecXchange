'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send to Google Analytics, Vercel Analytics, or custom endpoint
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });

      // Example: Send to custom analytics endpoint
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/vitals', body);
      } else {
        fetch('/api/vitals', {
          body,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        }).catch(console.error);
      }
    }
  });

  return null;
}
