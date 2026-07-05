import { CATEGORIES } from "./categories";
import { CategoryId } from "./types";
import { detectRisks, RawMatch } from "./riskDetection";

function normalizeValue(raw: string): string {
  let v = raw.trim();
  const map: [RegExp, string][] = [
    [/달러/g, " USD"],
    [/위안/g, " CNY"],
    [/엔(?!지)/g, " JPY"],
    [/원(?!래)/g, " KRW"],
    [/개월/g, " months"],
    [/주일/g, " weeks"],
    [/개(?!월)/g, " units"],
    [/세트/g, " sets"],
    [/박스/g, " boxes"],
    [/주(?!일)/g, " weeks"],
    [/일(?!정)/g, " days"],
  ];
  for (const [re, rep] of map) v = v.replace(re, rep);
  return v.replace(/\s+/g, " ").trim();
}

function contextValueFor(
  categoryId: CategoryId,
  inputMatches: { categoryId: CategoryId; match: RawMatch }[]
): string | null {
  const found = inputMatches.find((m) => m.categoryId === categoryId);
  return found ? normalizeValue(found.match.text) : null;
}

const PARAGRAPH_BUILDERS: Record<CategoryId, (value: string | null) => string> = {
  price: (value) =>
    `Regarding pricing, based on the details you shared, our estimated unit price is around ${
      value ?? "USD 12 per unit"
    }. Please note this figure is a preliminary estimate and is still pending confirmation from our internal team before it can be finalized.`,
  moq: (value) =>
    `As for the minimum order quantity (MOQ), we can currently offer ${
      value ?? "500 units"
    } per order. This number is subject to confirmation with our production team based on current capacity.`,
  leadtime: (value) =>
    `Regarding lead time, production and shipping would take approximately ${
      value ?? "30 days"
    } from order confirmation. Please note this may vary depending on the current production schedule.`,
  spec: (value) =>
    `Regarding the technical specifications you mentioned, we would like to confirm the exact requirements before finalizing. Our current reference spec allows a tolerance of ${
      value ?? "5%"
    }, but this needs to be verified with our engineering team.`,
  logistics: (value) =>
    `On packaging and logistics, we typically ship via sea freight under FOB terms, with an estimated packing lead time of ${
      value ?? "7 days"
    }. Final terms will be confirmed with our logistics partner.`,
  certification: (value) =>
    `In terms of certification and quality standards, we will confirm compliance with the certification you requested. Please allow up to ${
      value ?? "14 days"
    } for our quality team to verify and issue the relevant documents.`,
  payment: (value) =>
    `Regarding payment terms, we generally work with T/T, with a ${
      value ?? "30%"
    } deposit and the balance before shipment. Final terms are subject to confirmation with our finance team.`,
};

const OPENING =
  "Dear Sir/Madam,\n\nThank you very much for your inquiry. Please find our response to each item below.\n\n";

const CLOSING =
  "\nPlease let us know if you need any further information. We look forward to your reply.\n\nBest regards,";

const FALLBACK_PARAGRAPH =
  "Thank you for reaching out to us. Could you kindly share a few more details on pricing, MOQ, lead time, specifications, packaging, certification, or payment terms so that we can assist you as accurately as possible?";

export function buildDraftText(
  text: string,
  mentionedCategoryIds: CategoryId[]
): string {
  const rawInputMatches = detectRisks(text).map((d) => ({
    categoryId: d.categoryId,
    match: d.match,
  }));

  if (mentionedCategoryIds.length === 0) {
    return OPENING + FALLBACK_PARAGRAPH + "\n" + CLOSING;
  }

  const paragraphs = CATEGORIES.filter((c) =>
    mentionedCategoryIds.includes(c.id)
  ).map((c) => {
    const value = contextValueFor(c.id, rawInputMatches);
    return PARAGRAPH_BUILDERS[c.id](value);
  });

  return OPENING + paragraphs.join("\n\n") + "\n" + CLOSING;
}
