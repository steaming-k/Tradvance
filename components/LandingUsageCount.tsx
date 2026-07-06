"use client";

import { useEffect, useState } from "react";
import { fetchParticipantCount, subscribeParticipantInserts } from "@/lib/supabase/participants";

export function LandingUsageCount() {
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

  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
      <span className="inline-block h-2 w-2 rounded-full bg-blue-600" aria-hidden />
      지금까지{" "}
      <span className="font-semibold text-purple-600">
        {count === null ? "-" : count.toLocaleString()}
      </span>
      명이 응대 초안을 완성했습니다
    </div>
  );
}
