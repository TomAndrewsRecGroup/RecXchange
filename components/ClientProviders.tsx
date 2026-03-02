'use client';

import { Suspense } from 'react';
import ModalController from './ModalController';

/**
 * Client-side providers wrapper.
 * Handles URL-based modal opening from AI chat smart links.
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Suspense boundary required for useSearchParams */}
      <Suspense fallback={null}>
        <ModalController />
      </Suspense>
    </>
  );
}
