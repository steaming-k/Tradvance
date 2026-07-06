# Tradvance — 진행 상황 요약

작성 기준일: 2026-07-06

---

## 1. 구현 완료된 화면/기능

### 랜딩 페이지 (`/`)
- 히어로: 배경 이미지 2장 크로스페이드 슬라이드쇼(`HeroBackgroundSlideshow`) + 어두운 오버레이 + 타이핑 애니메이션 헤드라인(문구 3종 순환, `TypingHeroHeadline`)
- 스크롤해도 고정되는 헤더, 로고 클릭 시 최상단으로 스크롤(`LandingHeaderLogo`)
- 소개 섹션: 로고 이미지 + 타이틀 + 설명 + CTA 버튼 + 실시간 누적 참여자 수(`LandingUsageCount`)
- 답변 초안 미리보기 카드(위험 구간 하이라이트 샘플)
- 핵심 기능 3카드, 동작 순서 3단계, 데이터 근거(인터뷰 통계 89%/67%/7개) 섹션
- 마무리 CTA + 푸터

### 백오피스 공통
- 좌측 고정 사이드바(`Sidebar`, 로고 이미지 + 대시보드/문의 대응/문의 보드/설정 내비게이션, 현재 경로 하이라이트)
- 상단 고정 안내 문구 배너(`NoticeBar`): "AI는 초안을 만들고, 최종 판단은 담당자가 합니다."

### `/dashboard` — 대시보드
- 온보딩 체크리스트(3단계, 진행률 바)
- 최근 문의 미리보기(목업 데이터 기반, 문의 보드로 연결)

### `/tool` — 문의 대응 (핵심 기능)
- 바이어 문의 원문 붙여넣기 → 분석 → 4단계 아코디언 결과 화면
  1. 원문 확인 + 한국어 자동 번역(읽기 전용)
  2. 문의 항목 7개 카테고리 자동 분류
  3. 영어 답변 초안 생성 + 한국어 번역(**편집 가능** — 번역을 수정해서 반영하면 영문 초안이 재생성됨)
  4. 위험 구간(확정 안 된 가격·납기·MOQ 등) 체크리스트 — 전부 확인해야 복사 가능
- 위험 구간 체크리스트 모달: 인용문 + 한국어 번역(읽기 전용) + 위험 사유(강조색)
- 예외 상태(문의 미인식) / 위험 구간 0건 상태 처리
- `?prefill=<mockId>` 쿼리로 보드 카드 원문을 채워서 진입 가능
- 클립보드 복사 완료 토스트

### `/board` — 문의 보드 (칸반)
- 4개 상태 컬럼(신규 문의/확인 필요/초안 작성/검토 완료), 가로 스크롤 없이 표시
- 카드: 거래처·국가, 실제 분석 엔진 기반 카테고리 태그, 우선순위, 담당자 아바타(겹침 스택 + 초과 인원 "+N")

### `/board/[id]` — 문의 카드 상세
- 실제 분석 엔진으로 만든 원문/번역/AI 분석/답변 초안(편집 가능한 번역 포함)
- 위험 구간 확인 모달 → 확인 완료 시 우측 "검토 상태" 실시간 반영
- "수정해서 사용하기"로 `/tool`에 원문을 채워 이동

### `/settings` — Gmail 포워딩 가이드
- 필터 조건 3개 입력창(실제 편집 가능), "+ 새 필터 만들기"로 초기화
- 전달 주소 입력(편집 가능) + 이메일 형식 유효성 검사(오류 시 안내 문구 + 복사 버튼 비활성화)
- "자동 연동이 아닌 가이드"임을 명시하는 안내 문구

### 핵심 로직 (`lib/`)
- 7개 카테고리 키워드 분류, 정규식(통화·수량·기간·날짜) + 카테고리별 규칙 기반 설명을 결합한 하이브리드 위험 탐지
- 영어 답변 초안 템플릿 생성 + 초안/위험 목록 재계산 함수(번역 수정 반영용)
- `/api/translate`: 별도 API 키 없이 비공식 Google 번역 엔드포인트로 한↔영 양방향 번역
- Supabase 연동: publishable key 하드코딩, 측정 이벤트 4종 로깅, 참여자 수 실시간 카운터(Realtime 구독)

### 디자인 시스템
- 3색 체계로 통일: 브랜드=인디고 계열(`indigo-*`, 주요 버튼은 `rgb(98 80 237)` 커스텀 값), 완료/성공=`green-*`, 위험=`pink-*`
- `docs/design-guide.md` 기준 반경(`rounded-lg` 이하)·그림자(`shadow-sm`)·전환(`duration-150~200`) 규칙 전체 화면에 일관 적용

### 최근 UI 다듬기
- 설정 페이지 1·2·3단계 번호 원이 제목 줄바꿈 여부와 상관없이 항상 첫 줄에 정렬되도록 수정
- 사이드바 로고 1.5배 확대 + 좌측 여백 축소로 위치 조정
- 문의 보드 컬럼 헤더(점·라벨·숫자) 간격 축소
- 랜딩 페이지 로고 위치 미세 조정(가운데 정렬 유지한 채 15px 좌측 이동)

---

## 2. 아직 미완성이거나 막힌 부분

- **배포 전 단계**: 로컬 Git 저장소 초기화 전이며(⁠`.git` 없음), GitHub 업로드·Vercel 배포 모두 아직 진행되지 않음 (5번 항목 참고)
- **Supabase 테이블 미생성**: `database/schema.sql`을 Supabase 대시보드 SQL Editor에서 아직 실행하지 않아, 이벤트 로깅과 "누적 참여자 수"가 현재는 0/"-"으로 조용히 폴백 중 (기능 자체는 정상 동작, 데이터만 안 쌓이는 상태)
- **AI 위험 사유 설명은 규칙 기반**: 실제 LLM API 키가 없어 `lib/explainRisk.ts`가 카테고리별 고정 문구를 반환. 실제 LLM 연동 시 이 모듈만 교체하면 되도록 분리해둠
- **Gmail 실연동 없음**: 요구사항 자체가 "자동 연동 아닌 가이드"라 의도된 설계이며 버그 아님
- **로컬 환경 한정 이슈**: 이 Windows 개발 환경에서 Next.js 내장 이미지 최적화 파이프라인이 깨져 있어 로고·히어로 이미지에 `unoptimized`를 적용한 상태. Vercel(리눅스 서버리스)에서는 이 문제가 재현되지 않을 것으로 예상되나, 실제 배포 후 `unoptimized`를 제거하고 정상 최적화가 되는지는 아직 실제 환경에서 확인하지 못함

---

## 3. 발생한 에러와 시도한 해결 방법

| 에러/문제 | 원인 | 해결 방법 |
|---|---|---|
| `npm install` 시 `next@15.0.3`↔`react@19.0.0` 피어 의존성 충돌 | Next 15.0.3이 React 19 정식판을 지원하지 않음 | Next를 `^15.1.6`으로 상향 |
| 브라우저에서 React Client Manifest / webpack 모듈 오류 | `npm run dev`와 `npm run build`를 동시에 실행해 `.next` 캐시 손상 | dev 서버 중지 → `.next` 삭제 → 재시작. 이후 빌드 전 항상 dev 서버를 먼저 멈추는 습관화 |
| 위험 구간이 엉뚱한 카테고리("500 units"가 "가격/견적"으로 분류)로 표시 | 근처에 있던 다른 카테고리 키워드("quotation")를 잘못 인식 | 정규식 매칭 종류(통화/수량/기간/날짜)별로 가능한 후보 카테고리를 제한하도록 `lib/riskDetection.ts` 수정 |
| "recent" 같은 단어가 인증(CE) 카테고리로 오탐 | 짧은 키워드("ce")의 단순 substring 매칭 | 단어 경계(`\b`) 기준 정규식 매칭으로 전환 (`lib/keywordMatch.ts`) |
| "delivery"만 있는 문의가 납기 카테고리로 분류 안 됨 | 키워드 목록에 "lead time"류만 있고 "delivery" 누락 | 납기 키워드에 "delivery"/"deliver" 추가 |
| Windows에서 `npm run dev` 실행 시 `spawn EINVAL` | `dev-launcher.js`의 `spawn()`에 `shell` 옵션 누락 | `shell: true` 옵션 추가 |
| 로고·히어로 이미지가 계속 빈 상태로 표시(`naturalWidth: 0`) | 이 로컬 환경의 Next.js 이미지 최적화 파이프라인이 깨짐(세션 내내 나타난 `@next/swc-win32-x64-msvc` 네이티브 바이너리 로딩 실패와 같은 계열의 문제로 추정) | `next/image`에 `unoptimized` 옵션을 추가해 최적화 파이프라인을 우회, 원본 파일을 직접 서빙 |
| 색상 통일(보라→인디고, 파랑→초록) 이후 문의 보드의 아바타·상태 점 색상이 전부 사라짐 | `tailwind.config.ts`의 `content` 스캔 범위가 `app/`, `components/`만 포함하고 `lib/`를 빠뜨려서, `lib/mockInquiries.ts`에 문자열로 정의된 Tailwind 클래스가 실제로는 우연히 다른 파일에 같은 클래스명이 있어야만 생성되던 상태였음. 리네임으로 그 우연한 겹침이 사라지자 CSS 자체가 생성되지 않음 | `tailwind.config.ts`의 `content`에 `./lib/**/*.{js,ts,jsx,tsx,mdx}` 추가 |
| 프리뷰 브라우저에서 클릭/이동 후 엉뚱한 이전 페이지가 보이는 현상 반복 | 이 세션의 자동화된 프리뷰 브라우저 탭 자체의 내비게이션 상태 동기화 문제로 확인(네트워크 로그상 실제 이동은 정상). 앱 코드 문제 아님 | 프리뷰 서버 재시작, 스크린샷 대신 DOM 속성(`naturalWidth`, `getBoundingClientRect`, 계산된 스타일)으로 직접 검증 |

---

## 4. 현재 파일 구조

```
Tradvance/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts          # 문의 분석 API
│   │   ├── participants/route.ts     # 참여자 수 적재/조회
│   │   └── translate/route.ts        # 한↔영 번역 API
│   ├── board/
│   │   ├── [id]/page.tsx             # 문의 카드 상세
│   │   └── page.tsx                  # 문의 보드(칸반)
│   ├── dashboard/page.tsx            # 대시보드
│   ├── settings/page.tsx             # Gmail 포워딩 가이드
│   ├── tool/page.tsx                 # 문의 대응 도구
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # 랜딩 페이지
├── components/
│   ├── backoffice/
│   │   ├── BackofficeShell.tsx       # 사이드바+공지바 공통 셸
│   │   ├── BoardCardDetail.tsx       # 보드 카드 상세 화면
│   │   ├── FilterSetupSteps.tsx      # 설정 1·2단계(필터 입력)
│   │   ├── ForwardingAddressCard.tsx # 설정 3단계(전달 주소)
│   │   ├── InquiryCard.tsx           # 보드 카드
│   │   └── Sidebar.tsx               # 좌측 내비게이션
│   ├── AccordionStep.tsx
│   ├── CategoryTags.tsx
│   ├── DraftViewer.tsx               # 답변 초안 위험 하이라이트 표시
│   ├── EditableDraftTranslation.tsx  # 편집 가능한 초안 번역
│   ├── ExceptionScreen.tsx
│   ├── HeroBackgroundSlideshow.tsx   # 랜딩 히어로 배경 슬라이드쇼
│   ├── icons.tsx
│   ├── InlineTranslatedQuote.tsx     # 위험 체크리스트 인용문 번역
│   ├── InquiryInputScreen.tsx
│   ├── LandingHeaderLogo.tsx
│   ├── LandingUsageCount.tsx
│   ├── LoadingScreen.tsx
│   ├── NoticeBar.tsx
│   ├── ParticipantCounter.tsx
│   ├── ResultScreen.tsx              # /tool 결과 화면(4단계 아코디언)
│   ├── RiskChecklistModal.tsx
│   ├── Toast.tsx
│   ├── TranslatedOriginalText.tsx    # 읽기 전용 번역 박스(원문용)
│   └── TypingHeroHeadline.tsx        # 랜딩 히어로 타이핑 애니메이션
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase 클라이언트(키 하드코딩)
│   │   ├── logEvent.ts               # 측정 이벤트 로깅
│   │   └── participants.ts           # 참여자 수 조회/실시간 구독
│   ├── analyzeInquiry.ts             # 분석 오케스트레이션
│   ├── categories.ts                 # 7개 카테고리 + 키워드
│   ├── draftGenerator.ts             # 영어 초안 템플릿
│   ├── explainRisk.ts                # 위험 사유 설명(규칙 기반)
│   ├── keywordMatch.ts               # 단어 경계 기준 키워드 매칭
│   ├── mockInquiries.ts              # 보드용 목업 데이터 + 색상 매핑
│   ├── riskDetection.ts              # 정규식 기반 위험 구간 탐지
│   ├── sampleInquiries.ts            # /tool 샘플 문의 3종
│   └── types.ts
├── database/
│   └── schema.sql                    # events, participants 테이블 DDL
├── docs/
│   ├── design-guide.md
│   ├── github-info.md
│   ├── requirements.md
│   ├── supabase-info.md
│   ├── progress-summary.md           # 이 문서
│   ├── logo.png
│   ├── 랜딩 페이지 이미지 1.png
│   └── 랜딩 페이지 이미지 2.png
├── public/
│   ├── hero-1.png
│   ├── hero-2.png
│   └── logo.png
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 5. GitHub / Vercel 배포 상태

- **로컬 Git 저장소**: 아직 초기화되지 않음 (`.git` 폴더 없음) — 커밋 이력 없음
- **GitHub**: `docs/github-info.md`에 등록된 저장소(`steaming-k/Tradvance`, https://github.com/steaming-k/Tradvance )로 아직 업로드되지 않음. 이전에 안내해 드린 웹 업로드 페이지: https://github.com/steaming-k/Tradvance/upload/main (저장소가 완전히 비어있다면 첫 화면에서 "uploading an existing file" 링크로 진입)
- **Vercel**: 배포 이력 없음 (`.vercel` 설정 없음), 실제 배포 URL 없음

즉, 지금까지는 **로컬 개발 환경(Next.js dev 서버)에서만** 기능을 구현하고 검증한 상태이며, GitHub 업로드와 Vercel 배포는 아직 진행 전 단계입니다.
