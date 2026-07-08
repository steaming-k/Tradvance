'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

const EXIT_DURATION_MS = 200;

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    setPhase('in');
  }, [pathname]);

  function navigate(href: string) {
    if (href === pathname) return;
    pendingHref.current = href;
    setPhase('out');
  }

  useEffect(() => {
    if (phase !== 'out') return;
    const timer = setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);
        pendingHref.current = null;
      }
    }, EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase, router]);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      <div className={phase === 'out' ? 'animate-page-fade-out' : 'animate-page-fade-in'}>
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}
