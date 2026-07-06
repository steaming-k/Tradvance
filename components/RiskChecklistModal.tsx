"use client";

import { useState } from "react";
import { RiskItem } from "@/lib/types";
import { CloseIcon } from "./icons";
import { InlineTranslatedQuote } from "./InlineTranslatedQuote";

interface Props {
  riskItems: RiskItem[];
  checkedRiskIds: Set<string>;
  onToggle: (riskId: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function RiskChecklistModal({
  riskItems,
  checkedRiskIds,
  onToggle,
  onClose,
  onConfirm,
}: Props) {
  const [attemptedConfirm, setAttemptedConfirm] = useState(false);
  const allChecked = riskItems.every((item) => checkedRiskIds.has(item.id));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="rounded-lg bg-white shadow-lg p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">위험 구간 확인</h2>
            <p className="mt-1 text-sm text-gray-500">
              아래 항목은 아직 내부적으로 확정되지 않은 내용입니다. 각 항목을 확인한 뒤 체크해 주세요.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-gray-500 hover:text-gray-800 transition-all duration-150"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {riskItems.map((item) => {
            const checked = checkedRiskIds.has(item.id);
            return (
              <label
                key={item.id}
                className="flex items-start gap-3 border border-gray-200 rounded-lg p-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                  className="mt-1 h-4 w-4 accent-indigo-600"
                />
                <div>
                  <span className="rounded-full px-2 py-0.5 text-sm bg-indigo-100 text-indigo-700">
                    {item.categoryLabel}
                  </span>
                  <p className="mt-1 font-medium text-gray-800">&ldquo;{item.quote}&rdquo;</p>
                  <InlineTranslatedQuote text={item.quote} />
                  <p className="mt-1 text-sm font-medium text-pink-800">{item.reason}</p>
                </div>
              </label>
            );
          })}
        </div>

        {attemptedConfirm && !allChecked && (
          <p className="mt-3 text-sm font-medium text-pink-800">
            모든 위험 구간을 확인해야 계속할 수 있습니다.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition-all duration-150"
          >
            나중에 확인
          </button>
          <button
            type="button"
            onClick={() => {
              if (allChecked) {
                onConfirm();
              } else {
                setAttemptedConfirm(true);
              }
            }}
            className={
              allChecked
                ? "bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
                : "bg-gray-200 text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
            }
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
}
