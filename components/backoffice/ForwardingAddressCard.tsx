"use client";

import { useState } from "react";
import { Toast } from "@/components/Toast";

const DEFAULT_ADDRESS = "inquiry@tradvance.app";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForwardingAddressCard() {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [touched, setTouched] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isValid = EMAIL_PATTERN.test(address.trim());

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // 클립보드 권한이 없는 환경에서도 흐름이 끊기지 않도록 무시한다.
    }
    setToastMessage("주소가 복사되었습니다.");
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input type="checkbox" defaultChecked className="h-4 w-4 accent-purple-600" />
        다음 주소로 전달
      </label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={() => setTouched(true)}
        className={
          touched && !isValid
            ? "mt-2 w-full rounded-lg border border-pink-400 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            : "mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        }
      />
      {touched && !isValid && (
        <p className="mt-1 text-sm font-medium text-pink-800">올바른 메일 주소를 입력해주세요</p>
      )}
      <button
        type="button"
        disabled={!isValid}
        onClick={handleCopy}
        className={
          isValid
            ? "mt-2 w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-all duration-150"
            : "mt-2 w-full border border-gray-200 text-gray-400 rounded-lg px-4 py-2 text-sm cursor-not-allowed"
        }
      >
        주소 복사
      </button>

      {toastMessage && (
        <Toast message={toastMessage} onDone={() => setToastMessage(null)} />
      )}
    </div>
  );
}
