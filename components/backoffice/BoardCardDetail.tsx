"use client";

import Link from "next/link";
import { useState } from "react";
import { DraftViewer } from "@/components/DraftViewer";
import { RiskChecklistModal } from "@/components/RiskChecklistModal";
import { Toast } from "@/components/Toast";
import { TranslatedOriginalText } from "@/components/TranslatedOriginalText";
import { EditableDraftTranslation } from "@/components/EditableDraftTranslation";
import { CheckIcon } from "@/components/icons";
import { buildDraftAnalysis } from "@/lib/analyzeInquiry";
import { CATEGORIES } from "@/lib/categories";
import { PRIORITY_LABELS, STATUS_COLUMNS } from "@/lib/mockInquiries";
import { logEvent } from "@/lib/supabase/logEvent";
import { AnalysisResult, MockInquiry } from "@/lib/types";

const CATEGORY_LABEL_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

const STATUS_BADGE_STYLES: Record<MockInquiry["status"], string> = {
  new: "bg-gray-100 text-gray-600",
  needs_review: "bg-pink-100 text-pink-800",
  drafting: "bg-indigo-100 text-indigo-700",
  reviewed: "bg-green-50 text-green-600",
};

interface Props {
  inquiry: MockInquiry;
  analysis: AnalysisResult;
}

export function BoardCardDetail({ inquiry, analysis: initialAnalysis }: Props) {
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const [checkedRiskIds, setCheckedRiskIds] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hasRisk = analysis.riskItems.length > 0;
  const allChecked = analysis.riskItems.every((item) => checkedRiskIds.has(item.id));
  const canCopy = !hasRisk || allChecked;
  const statusLabel = STATUS_COLUMNS.find((c) => c.id === inquiry.status)?.label ?? "";
  const draftPlainText = analysis.draftSegments.map((segment) => segment.text).join("");

  function handleToggleRisk(riskId: string) {
    setCheckedRiskIds((prev) => {
      const next = new Set(prev);
      if (next.has(riskId)) next.delete(riskId);
      else next.add(riskId);
      return next;
    });
  }

  function handleOpenModal() {
    logEvent("risk_modal_opened", { riskCount: analysis.riskItems.length, source: "board" });
    setModalOpen(true);
  }

  function handleConfirmModal() {
    logEvent("risk_check_completed", { riskCount: analysis.riskItems.length, source: "board" });
    setModalOpen(false);
  }

  function handleApplyTranslatedDraft(newEnglishText: string) {
    const { draftSegments, riskItems } = buildDraftAnalysis(newEnglishText);
    setAnalysis((prev) => ({ ...prev, draftSegments, riskItems }));
    setCheckedRiskIds(new Set());
    setModalOpen(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draftPlainText);
    } catch {
      // 클립보드 권한이 없는 환경에서도 흐름이 끊기지 않도록 무시한다.
    }
    logEvent("draft_copied", { source: "board" });
    setToastMessage("초안이 복사되었습니다.");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <nav className="text-sm text-gray-500">
        <Link href="/board" className="hover:text-indigo-600 transition-all duration-150">
          문의 보드
        </Link>{" "}
        › {inquiry.company}
      </nav>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className={`rounded-full px-2 py-0.5 text-sm ${STATUS_BADGE_STYLES[inquiry.status]}`}>
          {statusLabel}
        </span>
        {inquiry.priority === "high" && (
          <span className="rounded-full px-2 py-0.5 text-sm bg-pink-200 text-pink-900">
            위험도 높음
          </span>
        )}
      </div>

      <h1 className="mt-2 text-xl font-semibold text-gray-900">
        {inquiry.company} · {inquiry.subject}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {inquiry.company} · {inquiry.country} · {inquiry.receivedLabel}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm text-gray-500">바이어 원문</p>
            <p className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-base text-gray-800">
              &ldquo;{inquiry.originalText}&rdquo;
            </p>
            <TranslatedOriginalText text={inquiry.originalText} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm text-gray-500">AI 분석</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {analysis.mentionedCategoryIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full px-3 py-1 text-sm bg-indigo-100 text-indigo-700"
                >
                  {CATEGORY_LABEL_MAP[id]}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm text-gray-500">답변 초안</p>
            <div className="mt-2 rounded-lg border border-gray-200 bg-white p-3">
              <DraftViewer segments={analysis.draftSegments} checkedRiskIds={checkedRiskIds} />
            </div>
            <EditableDraftTranslation draftText={draftPlainText} onApply={handleApplyTranslatedDraft} />

            {hasRisk && !allChecked && (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-medium text-pink-800">
                  위험 구간 {analysis.riskItems.length}건이 발견되었습니다. 확인 후 복사할 수 있습니다.
                </p>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
                >
                  초안 검토하기
                </button>
              </div>
            )}
            {hasRisk && allChecked && (
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-green-600">
                <CheckIcon className="h-4 w-4" />
                위험 구간 {analysis.riskItems.length}건을 모두 확인했습니다.
              </p>
            )}
            {!hasRisk && (
              <p className="mt-3 text-sm text-gray-500">
                이 초안에서는 위험 구간이 발견되지 않았습니다. 바로 복사할 수 있습니다.
              </p>
            )}

            <div className="mt-4 rounded-lg bg-pink-50 border border-pink-200 px-3 py-2 text-sm text-pink-800">
              이 초안은 자동 발송되지 않으며, 담당자 검토 후 사용됩니다.
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled={!canCopy}
                onClick={() => canCopy && handleCopy()}
                className={
                  canCopy
                    ? "bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
                    : "bg-gray-200 text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
                }
              >
                초안 복사하기
              </button>
              <Link
                href={`/tool?prefill=${inquiry.id}`}
                className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-50 transition-all duration-150"
              >
                수정해서 사용하기
              </Link>
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 h-fit space-y-4">
          <p className="text-sm text-gray-500">정보</p>
          <div>
            <p className="text-sm text-gray-500">거래처명</p>
            <p className="text-base font-medium text-gray-800">{inquiry.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">담당자</p>
            <p className="text-base text-gray-800">{inquiry.assignees[0]?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">국가</p>
            <p className="text-base text-gray-800">{inquiry.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">다음 행동</p>
            <p className="text-base font-medium text-indigo-600">{inquiry.nextAction}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">검토 상태</p>
            <span
              className={
                !hasRisk || allChecked
                  ? "inline-block mt-1 rounded-full px-2 py-0.5 text-sm bg-green-50 text-green-600"
                  : "inline-block mt-1 rounded-full px-2 py-0.5 text-sm bg-pink-100 text-pink-800"
              }
            >
              {!hasRisk || allChecked ? "검토 완료" : "검토 필요"}
            </span>
          </div>
        </aside>
      </div>

      {modalOpen && (
        <RiskChecklistModal
          riskItems={analysis.riskItems}
          checkedRiskIds={checkedRiskIds}
          onToggle={handleToggleRisk}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmModal}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDone={() => setToastMessage(null)} />
      )}
    </div>
  );
}
