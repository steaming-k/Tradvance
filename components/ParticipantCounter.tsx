"use client";

import { useEffect, useState } from "react";
import { fetchParticipantCount, subscribeParticipantInserts } from "@/lib/supabase/participants";

export function ParticipantCounter() {
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
    <p className="text-sm text-gray-500 countPeople">
      누적 참여자 수{" "}
      <span className="font-semibold text-indigo-600">
        {count === null ? "-" : count.toLocaleString()}
      </span>
      명
    </p>
  );
}
