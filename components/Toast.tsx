"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  onDone: () => void;
}

export function Toast({ message, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-lg px-4 py-2 text-sm shadow-sm">
      {message}
    </div>
  );
}
