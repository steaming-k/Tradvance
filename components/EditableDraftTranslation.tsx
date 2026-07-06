"use client";

import { useEffect, useState } from "react";

interface Props {
  draftText: string;
  onApply: (newEnglishText: string) => void;
}

type Status = "loading" | "done" | "error";

export function EditableDraftTranslation({ draftText, onApply }: Props) {
  const [koreanText, setKoreanText] = useState("");
  const [status, setStatus] = useState<Status>("loading");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setApplyError(false);

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: draftText, target: "ko" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (typeof data.translated === "string" && data.translated.trim()) {
          setKoreanText(data.translated);
          setStatus("done");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [draftText]);

  async function handleApply() {
    setApplying(true);
    setApplyError(false);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: koreanText, target: "en" }),
      });
      const data = await res.json();
      if (typeof data.translated === "string" && data.translated.trim()) {
        onApply(data.translated);
      } else {
        setApplyError(true);
      }
    } catch {
      setApplyError(true);
    } finally {
      setApplying(false);
    }
  }

  const displayValue =
    status === "loading"
      ? "번역 중..."
      : status === "error"
        ? "번역을 불러오지 못했습니다. (네트워크 연결을 확인해 주세요)"
        : koreanText;

  const rows = Math.min(10, Math.max(3, Math.ceil(displayValue.length / 60)));
  const canApply = status === "done" && !applying && koreanText.trim().length > 0;

  return (
    <div className="mt-3">
      <p className="text-sm text-gray-500">
        한국어 번역 (자동 번역) — 내용을 수정한 뒤 반영하면 영문 초안이 바뀝니다
      </p>
      <textarea
        value={displayValue}
        onChange={(e) => setKoreanText(e.target.value)}
        readOnly={status !== "done"}
        rows={rows}
        className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          disabled={!canApply}
          onClick={handleApply}
          className={
            canApply
              ? "border border-purple-300 text-purple-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-purple-50 transition-all duration-150"
              : "border border-gray-200 text-gray-400 rounded-lg px-3 py-1.5 text-sm cursor-not-allowed"
          }
        >
          {applying ? "반영 중..." : "이 번역으로 영문 초안 수정하기"}
        </button>
        {applyError && (
          <span className="text-sm font-medium text-pink-800">
            반영에 실패했습니다. 다시 시도해 주세요.
          </span>
        )}
      </div>
    </div>
  );
}
