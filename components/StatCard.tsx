"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  label: string;
  items?: string[];
  delay?: number;
}

export function StatCard({ value, label, items, delay = 0 }: Props) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }
            setIsVisible(true);
          } else {
            hideTimeout = setTimeout(() => {
              setIsVisible(false);
              setAnimatedValue(0);
            }, 200);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    let current = 0;
    const target = numValue;
    const step = target / 30;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedValue(target);
        clearInterval(interval);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value, isVisible]);

  const isPercentage = value.includes("%");

  return (
    <div
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white p-6 flex flex-col items-center ${isVisible ? "animate-slide-up" : "opacity-0"}`}
      style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)', animationDelay: `${delay}s` }}
    >
      {isPercentage ? (
        <div className="relative h-24 w-24 mb-4">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeDasharray={`${(animatedValue / 100) * 282.7} 282.7`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {animatedValue}%
            </span>
          </div>
        </div>
      ) : items ? (
        <div className="flex h-24 flex-wrap content-center gap-2 justify-center mb-4">
          {items.map((item, i) => (
            <span
              key={i}
              className="rounded-full px-3 py-1 text-sm bg-indigo-50 text-indigo-700 transition-all duration-300 opacity-0"
              style={{
                opacity: i < animatedValue ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-end justify-center gap-1.5 h-24 mb-4 w-full">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="bg-indigo-200 rounded-t transition-all duration-500 ease-out flex-grow"
              style={{
                height: `${i < animatedValue ? 100 : 30}%`,
              }}
            />
          ))}
        </div>
      )}
      <p className="text-sm text-gray-500 text-center">{label}</p>
    </div>
  );
}
