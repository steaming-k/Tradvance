"use client";

import { useEffect, useState } from "react";
import { fetchParticipantCount, subscribeParticipantInserts } from "@/lib/supabase/participants";

interface Props {
  variant?: "default" | "onDark";
}

export function LandingUsageCount({ variant = "default" }: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetchParticipantCount().then((value) => {
      if (active) setCount(value);
    });

    const unsubscribe = subscribeParticipantInserts(() => {
      setCount((prev) => (prev === null ? 1 : prev + 1));
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const textClass = variant === "onDark" ? "text-gray-100" : "text-gray-500";
  const countClass = variant === "onDark" ? "text-white" : "text-indigo-600";

  return (
    <div className={`inline-flex items-center gap-2 text-sm ${textClass}`}>
      <span className="inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden />
      지금까지{" "}
      <span className={`font-semibold ${countClass}`}>
        {count === null ? "-" : count.toLocaleString()}
      </span>
      명이 응대 초안을 완성했습니다
    </div>
  );
}
