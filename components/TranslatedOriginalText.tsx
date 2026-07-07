"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
}

type Status = "loading" | "done" | "error";

export function TranslatedOriginalText({ text }: Props) {
  const [translated, setTranslated] = useState("");
  const [status, setStatus] = useState<Status>("loading");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setTranslated("");

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (typeof data.translated === "string" && data.translated.trim()) {
          setTranslated(data.translated);
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
  }, [text]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [status, translated]);

  const displayValue =
    status === "loading"
      ? "번역 중..."
      : status === "error"
        ? "번역을 불러오지 못했습니다. (네트워크 연결을 확인해 주세요)"
        : translated;

  return (
    <div className="mt-3">
      <p className="text-sm text-gray-500">한국어 번역 (참고용, 자동 번역)</p>
      <textarea
        ref={textareaRef}
        readOnly
        value={displayValue}
        rows={3}
        className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-base text-gray-800 cursor-default focus:outline-none overflow-hidden"
      />
    </div>
  );
}
