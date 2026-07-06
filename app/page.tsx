import Link from "next/link";
import { NoticeBar } from "@/components/NoticeBar";
import { LandingUsageCount } from "@/components/LandingUsageCount";
import { LandingHeaderLogo } from "@/components/LandingHeaderLogo";
import { CheckIcon } from "@/components/icons";

const CATEGORY_LABELS = [
  "가격/견적",
  "MOQ",
  "납기",
  "기술 사양",
  "포장/물류",
  "인증/품질 기준",
  "결제 조건",
];

const STEPS = [
  {
    n: 1,
    title: "바이어 문의 붙여넣기",
    desc: "받은 이메일 원문을 그대로 붙여넣습니다. 로그인도, 별도 연동도 필요 없습니다.",
  },
  {
    n: 2,
    title: "확인 항목 분류 · 영어 초안 생성",
    desc: "7개 카테고리로 확인 항목을 자동 분류하고, 바로 보낼 수 있는 영어 답변 초안을 만듭니다.",
  },
  {
    n: 3,
    title: "위험 구간 확인 후 복사",
    desc: "확정되지 않은 정보를 짚어주고, 전부 확인해야 복사가 열립니다. 발송은 담당자 몫입니다.",
  },
];

const STATS = [
  { value: "8 / 9", label: "완전 자동화가 아닌 “사람 개입 구조”를 선호한 응답자" },
  { value: "6 / 9", label: "“AI 답변 과신”을 가장 큰 우려로 꼽은 응답자 (1위)" },
  { value: "7개", label: "인터뷰에서 도출한 확인 항목 카테고리" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <LandingHeaderLogo />
          <Link
            href="/dashboard"
            className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700 transition-all duration-150"
          >
            사용해보기
          </Link>
        </div>
      </header>

      <NoticeBar />

      {/* 히어로 */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-purple-600">
              산업재 수출 · 바이어 문의 응대
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-snug text-gray-900 sm:text-4xl">
              해외 바이어 문의,
              <br />
              확인 항목과 위험 구간까지
              <br />
              짚어주는 영어 응대 초안
            </h1>
            <p className="mt-4 max-w-xl text-base text-gray-500">
              수출 담당자가 부족한 소규모 제조업체를 위해, 바이어 문의 원문을
              붙여넣으면 확인 항목을 분류하고 확정되지 않은 정보를 짚어주는 영어
              답변 초안을 만들어 드립니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="bg-purple-600 text-white rounded-lg px-5 py-2.5 font-medium hover:bg-purple-700 transition-all duration-150"
              >
                지금 사용해보기
              </Link>
              <Link
                href="#features"
                className="border border-gray-300 text-gray-700 rounded-lg px-5 py-2.5 font-medium hover:bg-gray-50 transition-all duration-150"
              >
                기능 살펴보기
              </Link>
            </div>

            <div className="mt-6">
              <LandingUsageCount />
            </div>
          </div>

          {/* 위험 구간 쇼케이스 (시각적 우선순위 1위) */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">답변 초안 미리보기</p>
            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 text-base leading-relaxed text-gray-800">
              As for the minimum order quantity (MOQ), we can currently offer{" "}
              <mark className="bg-pink-100 text-pink-900 px-1 rounded underline decoration-pink-400">
                500 units
              </mark>{" "}
              per order. Lead time is approximately{" "}
              <mark className="bg-pink-100 text-pink-900 px-1 rounded underline decoration-pink-400">
                30 days
              </mark>{" "}
              from order confirmation.
            </div>

            <div className="mt-4 border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded border border-pink-400 text-pink-800">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <div>
                  <span className="rounded-full px-2 py-0.5 text-sm bg-purple-100 text-purple-700">
                    납기
                  </span>
                  <p className="mt-1 font-medium text-gray-800">
                    &ldquo;approximately 30 days from order confirmation&rdquo;
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    리드타임은 생산 일정에 따라 변동될 수 있어, 확정된 납기처럼
                    전달하면 오안내로 이어질 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm font-medium text-pink-800">
              위험 구간을 모두 확인해야 복사가 열립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <section id="features" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900">핵심 기능</h2>
          <p className="mt-1 text-sm text-gray-500">
            발송까지 자동화하지 않습니다. 담당자가 더 빠르고 안전하게 판단하도록
            돕습니다.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* 1. 확인 항목 분류 */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-base font-medium text-gray-800">
                7개 확인 항목 자동 분류
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                문의에서 언급된 확인 항목을 카테고리로 즉시 정리해, 무엇부터
                확인해야 할지 헤매는 시간을 줄입니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORY_LABELS.map((label) => (
                  <span
                    key={label}
                    className="rounded-full px-3 py-1 text-sm bg-purple-100 text-purple-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 위험 구간 체크리스트 (핵심 차별점 — amber 강조) */}
            <div className="rounded-lg border border-pink-400 bg-white shadow-sm p-6">
              <span className="rounded-full px-2 py-0.5 text-sm bg-pink-100 text-pink-800">
                핵심 기능
              </span>
              <h3 className="mt-3 text-base font-medium text-gray-800">
                위험 구간 체크리스트
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                가격·납기·사양처럼 확정되지 않은 정보를 초안에서 하이라이트하고,
                항목별 이유와 함께 체크리스트로 보여줍니다. 전부 확인하기 전에는
                복사할 수 없습니다.
              </p>
            </div>

            {/* 3. 사람 개입 구조 */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
              <h3 className="text-base font-medium text-gray-800">
                최종 판단은 담당자가
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                AI는 초안까지만 만듭니다. 발송 기능은 없고 클립보드 복사까지만
                지원해, 마지막 확인과 발송은 사람이 직접 합니다.
              </p>
              <p className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600">
                <CheckIcon className="h-4 w-4" />
                발송 자동화 없음 · 복사까지만
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 방법 */}
      <section id="how" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900">이렇게 동작합니다</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="rounded-lg border border-gray-200 bg-white shadow-sm p-6"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-sm font-semibold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 text-base font-medium text-gray-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터 근거 */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900">
            왜 &ldquo;사람 개입 구조&rdquo;인가
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            수출 실무자 인터뷰(9명)에서 확인한 결과가 이 서비스의 설계 근거입니다.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-white shadow-sm p-6"
              >
                <p className="text-3xl font-semibold text-purple-600">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 마무리 CTA */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-lg border border-gray-200 bg-purple-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              바이어 문의, 지금 바로 정리해보세요
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              문의 원문을 붙여넣기만 하면 됩니다. 샘플 문의로도 바로 체험할 수
              있습니다.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="inline-block bg-purple-600 text-white rounded-lg px-5 py-2.5 font-medium hover:bg-purple-700 transition-all duration-150"
              >
                지금 사용해보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-sm text-gray-500">
            Tradvance · 입력한 문의는 분석 용도로만 사용되며, 원문은 서버에
            저장되지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
