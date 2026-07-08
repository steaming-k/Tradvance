'use client';

import Image from "next/image";
import Link from "next/link";
import { TransitionLink } from "@/components/TransitionLink";
import { NoticeBar } from "@/components/NoticeBar";
import { LandingHeaderLogo } from "@/components/LandingHeaderLogo";
import { TypingHeroHeadline } from "@/components/TypingHeroHeadline";
import { HeroBackgroundSlideshow } from "@/components/HeroBackgroundSlideshow";
import { CheckIcon } from "@/components/icons";
import { StatCard } from "@/components/StatCard";
import { AnimatedElement } from "@/components/AnimatedElement";

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
    icon: "📋",
  },
  {
    n: 2,
    title: "확인 항목 분류 · 영어 초안 생성",
    desc: "7개 카테고리로 확인 항목을 자동 분류하고, 바로 보낼 수 있는 영어 답변 초안을 만듭니다.",
    icon: "🏷️",
  },
  {
    n: 3,
    title: "위험 구간 확인 후 복사",
    desc: "확정되지 않은 정보를 짚어주고, 전부 확인해야 복사가 열립니다. 발송은 담당자 몫입니다.",
    icon: "✅",
  },
];

const STATS = [
  { value: "89%", label: "완전 자동화가 아닌 사람 개입을 선호한 응답자" },
  { value: "67%", label: "AI 답변 과신을 가장 큰 우려로 꼽은 응답자" },
  { value: "7개", label: "인터뷰에서 도출한 확인 항목 카테고리", items: CATEGORY_LABELS },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <LandingHeaderLogo />
          <TransitionLink
            href="/tool"
            className="bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
          >
            사용해보기
          </TransitionLink>
        </div>
      </header>

      <NoticeBar />

      <section className="relative w-full h-[380px] overflow-hidden">
        <HeroBackgroundSlideshow />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <TypingHeroHeadline />
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Image
            src="/logo.png"
            alt="Tradvance"
            width={800}
            height={250}
            priority
            unoptimized
            className="mx-auto mb-4 h-[100px] w-auto -translate-x-[15px]"
          />
          <h2 className="mt-3 text-2xl font-semibold leading-loose text-gray-900 sm:text-3xl" style={{ fontFamily: 'Presentation', fontWeight: 600, lineHeight: '1.5' }}>
            해외 바이어 문의, 확인 항목과 위험 구간까지
            <br />
            짚어주는 영어 응대 초안
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            소규모 제조업체를 위해, 바이어 문의 원문을 붙여넣으면 확인 항목을 분류하고
            <br />
            확정되지 않은 정보를 짚어주는 영어 답변 초안을 만들어 드립니다.
          </p>

          <AnimatedElement>
            <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-gray-200 bg-white p-5 text-left" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
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

            <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-xs text-gray-500 mb-2">한국어 번역 (자동 번역) — 내용을 수정한 뒤 반영하면 영문 초안이 바뀝니다</p>
              <p className="text-sm text-gray-700">
                최소 주문 수량(MOQ)의 경우 현재 주문당{" "}
                <span className="font-medium text-gray-900">500개</span>를 제공할 수 있습니다. 리드타임은 주문 확인 후 약{" "}
                <span className="font-medium text-gray-900">30일</span>입니다.
              </p>
            </div>

            <div className="mt-4 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="flex h-4 w-4 items-center justify-center rounded border border-pink-400 text-pink-800">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-sm bg-indigo-100 text-indigo-700">
                    납기
                  </span>
                </div>
                <div>
                  <p className="mt-1 font-medium text-gray-800">
                    &ldquo;approximately 30 days from order confirmation&rdquo;
                  </p>
                  <p className="mt-1 text-sm text-red-700 font-medium">
                    리드타임은 생산 일정에 따라 변동될 수 있어, 확정된 납기처럼
                    전달하면 오안내로 이어질 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-base font-medium text-red-600 text-center">
              위험 구간을 모두 확인해야 복사가 열립니다.
            </p>
            </div>
          </AnimatedElement>
          <AnimatedElement delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <TransitionLink
              href="/tool"
              className="bg-[rgb(98_80_237/77%)] text-white rounded-lg px-5 py-2.5 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
            >
              지금 사용해보기
            </TransitionLink>
            <Link
              href="#features"
              className="border border-gray-300 text-gray-700 rounded-lg px-5 py-2.5 font-medium hover:bg-gray-50 transition-all duration-150"
            >
              기능 살펴보기
            </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section id="features" className="bg-white border-t border-gray-200 scroll-mt-5">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Presentation', lineHeight: '1.5' }}>핵심 기능</h2>
          <p className="mt-1 text-sm text-gray-500">
            발송까지 자동화하지 않습니다. 담당자가 더 빠르고 안전하게 판단하도록
            돕습니다.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3 items-stretch">
            <AnimatedElement delay={0.3}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 h-full" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              <span className="rounded-full px-2 py-0.5 text-sm bg-gray-100 text-gray-700">
                분류 기능
              </span>
              <h3 className="mt-3 text-lg font-medium text-gray-800">
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
                    className="rounded-full px-3 py-1 text-sm bg-indigo-50 text-indigo-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={0.4}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 h-full" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              <span className="rounded-full px-2 py-0.5 text-sm bg-pink-100 text-pink-800">
                핵심 기능
              </span>
              <h3 className="mt-3 text-lg font-medium text-gray-800">
                위험 구간 체크리스트
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                가격·납기·사양처럼 확정되지 않은 정보를 초안에서 하이라이트하고,
                항목별 이유와 함께 체크리스트로 보여줍니다. 전부 확인하기 전에는
                복사할 수 없습니다.
              </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={0.5}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 h-full" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              <span className="rounded-full px-2 py-0.5 text-sm bg-gray-100 text-gray-700">
                초안 작업
              </span>
              <h3 className="mt-3 text-lg font-medium text-gray-800">
                최종 판단은 담당자가
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                AI는 초안까지만 만듭니다. 발송 기능은 없고 클립보드 복사까지만
                지원해, 마지막 확인과 발송은 사람이 직접 합니다.
              </p>
              <p className="mt-4 flex items-center gap-1 text-sm font-medium text-green-600">
                <CheckIcon className="h-4 w-4" />
                발송 자동화 없음 · 복사까지만
              </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section id="how" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Presentation', lineHeight: '1.5' }}>동작 순서</h2>

          <div className="mt-8 flex items-stretch justify-between gap-4">
            {STEPS.map((step, i) => (
              <div key={step.n} className="flex items-center gap-4 flex-1">
                <AnimatedElement delay={i * 0.1}>
                  <div
                    className="border border-gray-200 bg-white p-5 rounded-lg flex flex-col items-center justify-start flex-1 h-full"
                    style={{
                      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  >
                  <div className={i === 2 ? "text-2xl" : "text-3xl"} style={i === 2 ? { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont' } : undefined}>
                    {step.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-800 text-center">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">{step.desc}</p>
                  </div>
                </AnimatedElement>
                {i < STEPS.length - 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Presentation', lineHeight: '1.5' }}>
            왜 사람 개입 구조인가
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            수출 실무자 인터뷰에서 확인한 결과가 이 서비스의 설계 근거입니다.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} items={stat.items} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="text-sm text-gray-500">
            Tradvance · 입력한 문의는 분석 용도로만 사용되며, 원문은 서버에
            저장되지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
