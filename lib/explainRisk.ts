import { CategoryId } from "./types";

/**
 * "정규식 + AI 설명" 하이브리드 중 AI 설명 파트.
 * 실제 LLM API 키가 연동되면 이 함수 내부만 교체하면 되도록 시그니처를 분리해 두었다.
 * 키가 없는 현재는 카테고리별 근거 있는 규칙 기반 설명으로 대체한다.
 */
const REASON_TEMPLATES: Record<CategoryId, string> = {
  price:
    "정확한 단가는 원가·환율 확인이 끝나지 않은 상태입니다. 확정 견적처럼 전달하면 이후 정정 시 신뢰도가 떨어질 수 있습니다.",
  moq: "최소주문수량(MOQ)은 생산 계획과 재고 상황에 따라 달라질 수 있어, 내부 확인 전 확정 표현은 위험합니다.",
  leadtime:
    "리드타임은 생산 일정과 재고 상황에 따라 변동될 수 있어, 확정된 납기처럼 전달하면 오안내로 이어질 수 있습니다.",
  spec: "기술 사양은 번역 과정에서 오역 가능성이 있고 엔지니어링 확인이 필요한 값이라 원문 대조가 필요합니다.",
  logistics:
    "배송·포장 조건은 물류사 견적 확인 전 단계로, 확정된 조건처럼 안내하면 이후 변경 시 신뢰 문제가 생길 수 있습니다.",
  certification:
    "인증·품질 기준 충족 여부는 품질팀 확인이 필요한 사안이라, 담당자 확인 없이 단정적으로 답변하면 안 됩니다.",
  payment:
    "결제 조건은 재무팀 승인이 필요한 항목으로, 사전 확인 없이 확정된 조건처럼 전달하면 계약상 위험이 발생할 수 있습니다.",
};

export function explainRisk(categoryId: CategoryId): string {
  return REASON_TEMPLATES[categoryId];
}
