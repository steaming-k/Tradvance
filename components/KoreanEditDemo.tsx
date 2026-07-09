'use client';

import { useEffect, useState } from 'react';

const SCENARIOS = [
  { ko: '500개', en: '500 units' },
  { ko: '300개', en: '300 units' },
];

const CYCLE_MS = 3200;
const EDIT_DELAY_MS = 900;
const SETTLE_MS = 500;

export function KoreanEditDemo() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'editing' | 'applying'>('idle');

  useEffect(() => {
    const editTimer = setTimeout(() => setPhase('editing'), CYCLE_MS - EDIT_DELAY_MS - SETTLE_MS);
    const applyTimer = setTimeout(() => setPhase('applying'), CYCLE_MS - SETTLE_MS);
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % SCENARIOS.length);
      setPhase('idle');
    }, CYCLE_MS);

    return () => {
      clearTimeout(editTimer);
      clearTimeout(applyTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  const current = SCENARIOS[index];
  const highlightKo = phase === 'editing' || phase === 'applying';
  const highlightEn = phase === 'applying';

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
            한국어로 수정
          </p>
          <p className="text-sm text-gray-800">
            최소 주문 수량(MOQ)의 경우 현재 주문당{' '}
            <span
              className={`inline-block rounded px-1.5 py-0.5 font-medium transition-all duration-300 ${
                highlightKo
                  ? 'bg-amber-200 text-amber-900 scale-105'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {current.ko}
            </span>
            를 제공할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center justify-center md:flex-col">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-gray-400 flex-shrink-0 rotate-90 md:rotate-0 transition-all duration-300 ${
              phase === 'applying' ? 'text-indigo-500 scale-125' : ''
            }`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-pink-400" />
            영문 초안에 자동 반영
          </p>
          <p className="text-sm text-gray-800">
            we can currently offer{' '}
            <span
              className={`inline-block rounded px-1.5 py-0.5 font-medium transition-all duration-300 ${
                highlightEn
                  ? 'bg-amber-200 text-amber-900 scale-105'
                  : 'bg-pink-100 text-pink-900'
              }`}
            >
              {current.en}
            </span>{' '}
            per order.
          </p>
        </div>
      </div>
    </div>
  );
}
