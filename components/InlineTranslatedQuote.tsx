"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
}

type Status = "loading" | "done" | "error";

export function InlineTranslatedQuote({ text }: Props) {
  const [translated, setTranslated] = useState("");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

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

  return (
    <p className="mt-1 text-sm text-gray-500">
      {status === "loading" && "번역 중..."}
      {status === "error" && "번역을 불러오지 못했습니다."}
      {status === "done" && translated}
    </p>
  );
}
