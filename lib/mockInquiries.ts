import { BoardStatus, MockInquiry } from "./types";

export const STATUS_COLUMNS: { id: BoardStatus; label: string; dot: string }[] = [
  { id: "new", label: "신규 문의", dot: "bg-gray-400" },
  { id: "needs_review", label: "확인 필요", dot: "bg-pink-500" },
  { id: "drafting", label: "초안 작성", dot: "bg-purple-500" },
  { id: "reviewed", label: "검토 완료", dot: "bg-blue-600" },
];

export const PRIORITY_LABELS: Record<MockInquiry["priority"], string> = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

export const PRIORITY_STYLES: Record<MockInquiry["priority"], string> = {
  high: "bg-pink-200 text-pink-900",
  medium: "bg-pink-100 text-pink-800",
  low: "bg-gray-100 text-gray-500",
};

export const ASSIGNEE_COLOR_STYLES: Record<MockInquiry["assignees"][number]["color"], string> = {
  blue: "bg-purple-600",
  green: "bg-blue-600",
  amber: "bg-pink-600",
  gray: "bg-gray-500",
};

// 문의 보드(칸반) 목업 데이터.
// 실제 서비스에서는 이메일 포워딩으로 들어온 문의가 채워지지만,
// 이번 미니 프로젝트에는 로그인/실사용자 데이터가 없어 와이어프레임과 동일한 샘플로 고정한다.
// originalText는 실제 분석 엔진(lib/analyzeInquiry)에 그대로 통과시켜 카드 상세 화면을 만든다.
export const MOCK_INQUIRIES: MockInquiry[] = [
  {
    id: "meridian",
    company: "Meridian Ind.",
    country: "미국",
    subject: "유압 커플링 500개 견적 문의",
    status: "new",
    priority: "medium",
    assignees: [
      { initial: "김", name: "김수출", color: "blue" },
      { initial: "이", name: "이무역", color: "green" },
    ],
    nextAction: "견적·납기 내부 확인",
    receivedLabel: "3분 전 수신",
    originalText:
      "Subject: Quotation Request – Hydraulic Couplings\n\nHi, we're interested in your hydraulic coupling series for a project in Hamburg. Could you send a quotation for 500 units? Also, what is your minimum order quantity, and what would the lead time be if we ordered today? Please also confirm if you can provide test certificates with the shipment.",
  },
  {
    id: "novak",
    company: "Novak s.r.o.",
    country: "체코",
    subject: "펌프 부품 견적 문의",
    status: "needs_review",
    priority: "high",
    assignees: [
      { initial: "김", name: "김수출", color: "blue" },
      { initial: "이", name: "이무역", color: "green" },
      { initial: "최", name: "최품질", color: "amber" },
      { initial: "정", name: "정재무", color: "gray" },
      { initial: "한", name: "한물류", color: "blue" },
    ],
    nextAction: "단가·인증 내부 확인",
    receivedLabel: "15분 전 수신",
    originalText:
      "We received your pump parts offer. Please confirm the unit price and required certifications (CE / ISO).",
  },
  {
    id: "klein",
    company: "Klein GmbH",
    country: "독일",
    subject: "부품 주문 결제조건 문의",
    status: "drafting",
    priority: "medium",
    assignees: [{ initial: "이", name: "이무역", color: "green" }],
    nextAction: "결제조건 재무팀 확인",
    receivedLabel: "1시간 전 수신",
    originalText:
      "We would like to place a bulk order for your components. What is your MOQ, and what payment terms do you accept — T/T or L/C?",
  },
  {
    id: "atlas",
    company: "Atlas Ltd.",
    country: "영국",
    subject: "베어링 샘플 및 인증 요청",
    status: "reviewed",
    priority: "low",
    assignees: [{ initial: "김", name: "김수출", color: "blue" }],
    nextAction: "완료 · 발송은 담당자가 진행",
    receivedLabel: "어제 수신",
    originalText:
      "Before placing a bulk order, we need to confirm CE and ISO certification for your bearing series, and would like to request 5 sample units for internal testing.",
  },
  {
    id: "sato",
    company: "Sato Trading",
    country: "일본",
    subject: "기어 시리즈 사양 문의",
    status: "new",
    priority: "low",
    assignees: [{ initial: "박", name: "박설계", color: "gray" }],
    nextAction: "기술 사양 확인",
    receivedLabel: "2일 전 수신",
    originalText:
      "Could you share the technical specifications and material details for your gear series? We are evaluating options for a new product line.",
  },
];

export function getMockInquiry(id: string): MockInquiry | undefined {
  return MOCK_INQUIRIES.find((inquiry) => inquiry.id === id);
}
