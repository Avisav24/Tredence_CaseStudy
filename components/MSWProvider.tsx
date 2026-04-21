'use client';
import { useEffect } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV === 'development') {
      import('../api/mocks/handlers').then(({ handlers }) => {
        import('msw/browser').then(({ setupWorker }) => {
          const worker = setupWorker(...handlers);
          worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
        });
      });
    }
  }, []);

  return <>{children}</>;
}
