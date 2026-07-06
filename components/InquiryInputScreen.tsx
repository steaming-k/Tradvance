"use client";

import { useState } from "react";
import { SAMPLE_INQUIRIES } from "@/lib/sampleInquiries";
import { ParticipantCounter } from "./ParticipantCounter";

interface Props {
  onSubmit: (text: string) => void;
  initialText?: string;
}

export function InquiryInputScreen({ onSubmit, initialText = "" }: Props) {
  const [text, setText] = useState(initialText);
  const canSubmit = text.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">바이어 문의 원문 입력</h2>
            <p className="mt-1 text-sm text-gray-500">
              받으신 바이어 문의 이메일을 그대로 붙여넣으면, 확인 항목과 위험 구간이 표시된 영어 답변 초안을 만들어 드립니다.
            </p>
          </div>
          <ParticipantCounter />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="예) Hello, we are interested in your products. Could you share your MOQ, price, and lead time?"
          className="mt-4 w-full rounded-lg border border-gray-200 p-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 mr-1 self-center">샘플로 시작하기:</span>
          {SAMPLE_INQUIRIES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => setText(sample.text)}
              className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1 text-sm hover:bg-gray-50 transition-all duration-150"
            >
              {sample.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          입력하신 내용은 문의 분석 용도로만 사용되며, 원문은 서버에 저장되지 않습니다.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => canSubmit && onSubmit(text)}
            className={
              canSubmit
                ? "bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-purple-700 transition-all duration-150"
                : "bg-gray-200 text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
            }
          >
            분석 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
