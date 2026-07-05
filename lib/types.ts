export type CategoryId =
  | "price"
  | "moq"
  | "leadtime"
  | "spec"
  | "logistics"
  | "certification"
  | "payment";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface RiskItem {
  id: string;
  categoryId: CategoryId;
  categoryLabel: string;
  quote: string;
  reason: string;
}

export interface DraftSegment {
  text: string;
  riskId: string | null;
}

export interface AnalysisResult {
  recognized: true;
  mentionedCategoryIds: CategoryId[];
  draftSegments: DraftSegment[];
  riskItems: RiskItem[];
}

export interface UnrecognizedResult {
  recognized: false;
}

export type AnalyzeResponse = AnalysisResult | UnrecognizedResult;
