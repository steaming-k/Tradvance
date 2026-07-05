import { CATEGORY_KEYWORDS } from "./categories";
import { includesAnyKeyword } from "./keywordMatch";
import { CategoryId } from "./types";

export interface RawMatch {
  text: string;
  start: number;
  end: number;
  kind: "currency" | "percentage" | "quantity" | "duration" | "date";
}

// 숫자·통화·기간 패턴 (정규식 기반 위험 구간 탐지)
const PATTERNS: { kind: RawMatch["kind"]; regex: RegExp }[] = [
  {
    kind: "currency",
    regex:
      /(US\$|USD|EUR|€|¥|JPY|KRW)\s?\d[\d,]*(\.\d+)?|\d[\d,]*(\.\d+)?\s?(달러|원|위안|엔|USD|EUR)/gi,
  },
  { kind: "percentage", regex: /\d+(\.\d+)?\s?%/g },
  {
    kind: "quantity",
    regex: /\d[\d,]*\s?(pcs|pieces|units?|개|세트|sets?|박스|boxes?|ea)\b/gi,
  },
  {
    kind: "duration",
    regex:
      /\d+\s?(일|주일|주|개월|months?|weeks?|days?|business\s?days?)\b/gi,
  },
  { kind: "date", regex: /\d{1,2}[/\-.]\d{1,2}([/\-.]\d{2,4})?/g },
];

function findRawMatches(text: string): RawMatch[] {
  const matches: RawMatch[] = [];
  for (const { kind, regex } of PATTERNS) {
    for (const m of text.matchAll(regex)) {
      if (m.index === undefined) continue;
      matches.push({
        text: m[0],
        start: m.index,
        end: m.index + m[0].length,
        kind,
      });
    }
  }
  // start 기준 정렬 후 겹치는 구간 제거 (먼저 매칭된 더 긴 구간 우선)
  matches.sort((a, b) => a.start - b.start || b.end - a.end);
  const deduped: RawMatch[] = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      deduped.push(m);
      lastEnd = m.end;
    }
  }
  return deduped;
}

// 매칭 종류별로 있을 법한 카테고리 후보만 우선 검사한다.
// (예: 수량 매칭 근처에 "quotation" 같은 가격 키워드가 우연히 있어도 가격으로 잘못 분류되지 않도록)
const KIND_CATEGORY_CANDIDATES: Record<RawMatch["kind"], CategoryId[]> = {
  currency: ["price", "payment"],
  percentage: ["payment", "price"],
  quantity: ["moq", "logistics", "spec"],
  duration: ["leadtime", "payment", "certification"],
  date: ["leadtime"],
};

function guessCategory(text: string, match: RawMatch): CategoryId {
  const windowStart = Math.max(0, match.start - 40);
  const windowEnd = Math.min(text.length, match.end + 40);
  const window = text.slice(windowStart, windowEnd).toLowerCase();

  const candidates = KIND_CATEGORY_CANDIDATES[match.kind];
  for (const categoryId of candidates) {
    if (includesAnyKeyword(window, CATEGORY_KEYWORDS[categoryId])) {
      return categoryId;
    }
  }

  // 후보 카테고리 키워드가 근처에 없으면 해당 매칭 종류의 기본 카테고리로 추정
  return candidates[0];
}

function extractSentence(text: string, match: RawMatch): string {
  const sentenceBoundary = /[.!?\n]/;
  let start = match.start;
  while (start > 0 && !sentenceBoundary.test(text[start - 1])) start--;
  let end = match.end;
  while (end < text.length && !sentenceBoundary.test(text[end])) end++;
  const sentence = text.slice(start, Math.min(end + 1, text.length)).trim();
  return sentence.length > 0 ? sentence : match.text;
}

export interface DetectedRisk {
  match: RawMatch;
  categoryId: CategoryId;
  quote: string;
}

export function detectRisks(text: string): DetectedRisk[] {
  const rawMatches = findRawMatches(text);
  return rawMatches.map((match) => ({
    match,
    categoryId: guessCategory(text, match),
    quote: extractSentence(text, match),
  }));
}
