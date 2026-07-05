# Tradvance

바이어 문의 원문을 붙여넣으면 확인 항목(7개 카테고리)을 분류하고, 위험 구간(확정되지 않은 가격·납기·사양 등)을 체크리스트로 표시한 뒤에만 복사를 허용하는 영어 답변 초안 생성 도구입니다. `docs/requirements.md`, `docs/design-guide.md` 기준으로 구현했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속. 입력 화면의 "샘플로 시작하기" 버튼으로 QA용 샘플 3종(MOQ/납기/인증 중심)을 바로 불러올 수 있습니다.

## 구조

- `app/page.tsx` — 입력 → 로딩 → 분석 결과(아코디언) → 예외 상태를 관리하는 단일 흐름 상태 머신
- `app/api/analyze/route.ts` — 분석 API
- `lib/analyzeInquiry.ts` — 문의 인식 → 카테고리 분류 → 초안 생성 → 위험 구간 탐지 오케스트레이션
- `lib/riskDetection.ts` — 숫자·통화·기간 정규식 기반 위험 구간 탐지
- `lib/explainRisk.ts` — 위험 사유 설명 생성(현재는 규칙 기반; 이후 실제 LLM 키가 생기면 이 모듈만 교체하면 됨)
- `lib/draftGenerator.ts` — 카테고리별 영어 답변 초안 템플릿
- `lib/supabase/client.ts` — Supabase 클라이언트 (프로젝트 URL/publishable key 하드코딩)
- `lib/supabase/logEvent.ts` — 측정 이벤트(분석 시작/모달 오픈/체크 완료/복사 완료) 로깅
- `lib/supabase/participants.ts` — 참여자 적재 + 누적 참여자 수 조회/실시간 구독
- `app/api/participants/route.ts` — 참여자 적재(POST)·카운트 조회(GET) API
- `components/ParticipantCounter.tsx` — 메인 화면의 실시간 누적 참여자 수 표시
- `database/schema.sql` — Supabase `events`, `participants` 테이블 스키마 + Realtime 발행 설정

## Supabase 연동 방법

1. Supabase 프로젝트(대시보드)의 **SQL Editor**를 열고 `database/schema.sql` 내용을 그대로 실행한다. (`events`, `participants` 테이블 생성 + `participants`를 `supabase_realtime` publication에 등록)
2. 위 SQL을 실행하기 전까지는 "분석 시작", "복사 완료" 등 이벤트 적재와 "누적 참여자 수"가 0으로 표시되며, 콘솔에는 아무 영향 없이 조용히 실패한다(사용 흐름을 막지 않도록 의도한 동작).
3. 프로젝트 URL과 publishable key는 `docs/supabase-info.md` 값을 `lib/supabase/client.ts`에 직접 문자열로 넣어두었다. 별도의 `.env` 파일은 사용하지 않는다.

## 참고

- 위험 구간 "AI 설명"은 실제 LLM API 키 없이도 동작하도록 카테고리별 규칙 기반 설명으로 구현했습니다. 추후 LLM 키를 연동하려면 `lib/explainRisk.ts`만 교체하면 됩니다.
- "누적 참여자 수"는 사용자가 "초안 복사하기"로 테스트를 완주할 때마다 `participants` 테이블에 한 행씩 적재되고, Supabase Realtime(`postgres_changes`)을 구독해 새로고침 없이 화면에 즉시 반영됩니다.
