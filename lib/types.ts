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

// 문의 보드(칸반) 목업 데이터 모델
export type BoardStatus = "new" | "needs_review" | "drafting" | "reviewed";

export type Priority = "high" | "medium" | "low";

export interface Assignee {
  initial: string;
  name: string;
  color: "blue" | "green" | "amber" | "gray";
}

export interface MockInquiry {
  id: string;
  company: string;
  country: string;
  subject: string;
  status: BoardStatus;
  priority: Priority;
  assignees: Assignee[];
  nextAction: string;
  originalText: string;
  receivedLabel: string;
}
