'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }

    // Send to analytics in production
    // You can integrate with Google Analytics, Vercel Analytics, etc.
    // Example: window.gtag?.('event', metric.name, { value: metric.value });

    // For now, we'll just log important metrics
    const { name, value, rating } = metric;

    // Core Web Vitals thresholds
    const thresholds = {
      LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
      FID: { good: 100, needsImprovement: 300 },   // First Input Delay
      CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
      FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
      TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
      INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
    };

    // Performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      const threshold = thresholds[name as keyof typeof thresholds];
      if (threshold) {
        let status = '✅';
        if (value > threshold.needsImprovement) status = '❌';
        else if (value > threshold.good) status = '⚠️';

        console.log(`${status} ${name}: ${value.toFixed(2)}ms (${rating})`);
      }
    }
  });

  return null;
}
