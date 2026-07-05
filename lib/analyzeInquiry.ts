import { CATEGORIES, CATEGORY_KEYWORDS, INQUIRY_SIGNAL_KEYWORDS } from "./categories";
import { buildDraftText } from "./draftGenerator";
import { explainRisk } from "./explainRisk";
import { includesAnyKeyword } from "./keywordMatch";
import { detectRisks } from "./riskDetection";
import { AnalyzeResponse, CategoryId, DraftSegment, RiskItem } from "./types";

const MIN_LENGTH = 15;

export function isInquiry(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < MIN_LENGTH) return false;

  const lower = trimmed.toLowerCase();
  const hasCategoryKeyword = Object.values(CATEGORY_KEYWORDS).some((keywords) =>
    includesAnyKeyword(lower, keywords)
  );
  const hasSignal =
    includesAnyKeyword(lower, INQUIRY_SIGNAL_KEYWORDS) || trimmed.includes("?");

  return hasCategoryKeyword || hasSignal;
}

export function getMentionedCategoryIds(text: string): CategoryId[] {
  const lower = text.toLowerCase();
  return CATEGORIES.filter((category) =>
    includesAnyKeyword(lower, CATEGORY_KEYWORDS[category.id])
  ).map((category) => category.id);
}

const CATEGORY_LABEL_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;

export function analyzeInquiry(text: string): AnalyzeResponse {
  if (!isInquiry(text)) {
    return { recognized: false };
  }

  const mentionedCategoryIds = getMentionedCategoryIds(text);
  const draftText = buildDraftText(text, mentionedCategoryIds);
  const detected = detectRisks(draftText);

  const riskItems: RiskItem[] = detected.map((d, index) => ({
    id: `risk-${index}`,
    categoryId: d.categoryId,
    categoryLabel: CATEGORY_LABEL_MAP[d.categoryId],
    quote: d.quote,
    reason: explainRisk(d.categoryId),
  }));

  const draftSegments: DraftSegment[] = [];
  let cursor = 0;
  detected.forEach((d, index) => {
    if (d.match.start > cursor) {
      draftSegments.push({ text: draftText.slice(cursor, d.match.start), riskId: null });
    }
    draftSegments.push({ text: d.match.text, riskId: `risk-${index}` });
    cursor = d.match.end;
  });
  if (cursor < draftText.length) {
    draftSegments.push({ text: draftText.slice(cursor), riskId: null });
  }

  return {
    recognized: true,
    mentionedCategoryIds,
    draftSegments,
    riskItems,
  };
}
