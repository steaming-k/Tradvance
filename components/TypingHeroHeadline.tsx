"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "바이어 문의 응대, 더 빠르고 안전하게",
  "확인은 AI가, 판단은 사람이",
  "놓치기 쉬운 위험까지 미리 짚어드립니다",
];

// 모바일(375px)에서만 각 문구를 두 줄로 나누기 위한 분기 지점(문자 인덱스).
// sm 이상에서는 br이 숨겨져 원래 한 줄 문구와 완전히 동일하게 렌더링된다.
const MOBILE_BREAK_INDEXES = [10, 8, 11];

const TYPING_SPEED_MS = 80;
const PAUSE_AFTER_TYPED_MS = 2000;

export function TypingHeroHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    if (displayedText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, TYPING_SPEED_MS);
      return () => clearTimeout(timeout);
    }

    const pause = setTimeout(() => {
      setDisplayedText("");
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, PAUSE_AFTER_TYPED_MS);
    return () => clearTimeout(pause);
  }, [displayedText, phraseIndex]);

  const breakIndex = MOBILE_BREAK_INDEXES[phraseIndex];
  const beforeBreak = displayedText.slice(0, breakIndex);
  const afterBreak = displayedText.length > breakIndex ? displayedText.slice(breakIndex) : null;

  return (
    <h1
      className="text-3xl font-semibold text-white sm:text-4xl"
      aria-label={PHRASES[phraseIndex]}
      style={{ fontFamily: 'Presentation' }}
    >
      <span aria-hidden="true">
        {beforeBreak}
        {afterBreak !== null && (
          <>
            <br className="sm:hidden" />
            {afterBreak}
          </>
        )}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1em] w-[2px] align-middle bg-white animate-pulse"
      />
    </h1>
  );
}
