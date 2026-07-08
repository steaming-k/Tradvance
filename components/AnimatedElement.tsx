'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

export function AnimatedElement({ children, delay = 0 }: Props) {
  // 관찰 대상(outer)과 실제로 transform이 걸리는 대상(inner)을 분리한다.
  // 같은 요소를 관찰하면서 동시에 움직이면, 애니메이션 도중 바뀌는 위치가
  // 다시 IntersectionObserver의 임계값을 넘나들어 애니메이션이 무한 재시작되는
  // 피드백 루프가 생길 수 있다.
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inner = innerRef.current;
          if (!inner) return;

          if (entry.isIntersecting) {
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }
            inner.classList.add('animate-slide-up');
          } else {
            hideTimeout = setTimeout(() => {
              inner.classList.remove('animate-slide-up');
            }, 200);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    if (outerRef.current) {
      observer.observe(outerRef.current);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (outerRef.current) {
        observer.unobserve(outerRef.current);
      }
    };
  }, []);

  return (
    <div ref={outerRef}>
      <div ref={innerRef} className="h-full opacity-0" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}
