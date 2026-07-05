"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { NoticeBar } from "@/components/NoticeBar";
import { InquiryInputScreen } from "@/components/InquiryInputScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ExceptionScreen } from "@/components/ExceptionScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { RiskChecklistModal } from "@/components/RiskChecklistModal";
import { Toast } from "@/components/Toast";
import { AnalysisResult } from "@/lib/types";
import { logEvent } from "@/lib/supabase/logEvent";

type Screen = "input" | "loading" | "result" | "exception";

const MIN_LOADING_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [checkedRiskIds, setCheckedRiskIds] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  async function handleSubmit(text: string) {
    setScreen("loading");
    logEvent("analysis_started", { textLength: text.trim().length });

    const [response] = await Promise.all([
      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }),
      sleep(MIN_LOADING_MS),
    ]);

    const result = await response.json();
    setCheckedRiskIds(new Set());
    setModalOpen(false);

    if (!result.recognized) {
      setAnalysis(null);
      setScreen("exception");
      return;
    }

    setAnalysis(result as AnalysisResult);
    setScreen("result");
  }

  function handleOpenRiskModal() {
    logEvent("risk_modal_opened", { riskCount: analysis?.riskItems.length ?? 0 });
    setModalOpen(true);
  }

  function handleToggleRisk(riskId: string) {
    setCheckedRiskIds((prev) => {
      const next = new Set(prev);
      if (next.has(riskId)) {
        next.delete(riskId);
      } else {
        next.add(riskId);
      }
      return next;
    });
  }

  function handleConfirmModal() {
    logEvent("risk_check_completed", { riskCount: analysis?.riskItems.length ?? 0 });
    setModalOpen(false);
  }

  async function handleCopy() {
    if (!analysis) return;
    const plainText = analysis.draftSegments.map((s) => s.text).join("");
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // 클립보드 권한이 없는 환경에서도 흐름이 끊기지 않도록 무시한다.
    }
    logEvent("draft_copied", {});
    fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mentionedCategories: analysis.mentionedCategoryIds,
        riskCount: analysis.riskItems.length,
      }),
    }).catch(() => {
      // 참여자 수 적재 실패가 사용자 흐름을 막으면 안 되므로 무시한다.
    });
    setToastMessage("초안이 복사되었습니다.");
  }

  function handleReset() {
    setAnalysis(null);
    setCheckedRiskIds(new Set());
    setModalOpen(false);
    setScreen("input");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <NoticeBar />

      {screen === "input" && <InquiryInputScreen onSubmit={handleSubmit} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "exception" && <ExceptionScreen onRetry={handleReset} />}
      {screen === "result" && analysis && (
        <ResultScreen
          mentionedCategoryIds={analysis.mentionedCategoryIds}
          draftSegments={analysis.draftSegments}
          riskItems={analysis.riskItems}
          checkedRiskIds={checkedRiskIds}
          onOpenRiskModal={handleOpenRiskModal}
          onCopy={handleCopy}
          onReset={handleReset}
        />
      )}

      {modalOpen && analysis && (
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
