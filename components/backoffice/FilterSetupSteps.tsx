"use client";

import { useRef, useState } from "react";

const DEFAULT_FILTER = {
  from: "buyer@",
  subject: "inquiry / quotation",
  keywords: "MOQ, price",
};

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

export function FilterSetupSteps() {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const fromInputRef = useRef<HTMLInputElement>(null);

  function handleNewFilter() {
    setFilter({ from: "", subject: "", keywords: "" });
    fromInputRef.current?.focus();
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
            1
          </span>
          <h2 className="text-base font-medium text-gray-800">필터 및 차단된 주소 열기</h2>
        </div>
        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <p className="mb-2 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </p>
          <p className="text-gray-500">전체 설정</p>
          <p className="mt-1 text-gray-800">필터 및 차단된 주소</p>
          <button
            type="button"
            onClick={handleNewFilter}
            className="mt-2 text-purple-600 hover:text-purple-700 transition-all duration-150"
          >
            + 새 필터 만들기
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
            2
          </span>
          <h2 className="text-base font-medium text-gray-800">새 필터 조건 입력</h2>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <div>
            <label htmlFor="filter-from" className="text-gray-500">
              보낸 사람
            </label>
            <input
              id="filter-from"
              ref={fromInputRef}
              value={filter.from}
              onChange={(e) => setFilter((prev) => ({ ...prev, from: e.target.value }))}
              placeholder="buyer@"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="filter-subject" className="text-gray-500">
              제목
            </label>
            <input
              id="filter-subject"
              value={filter.subject}
              onChange={(e) => setFilter((prev) => ({ ...prev, subject: e.target.value }))}
              placeholder="inquiry / quotation"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="filter-keywords" className="text-gray-500">
              포함하는 단어
            </label>
            <input
              id="filter-keywords"
              value={filter.keywords}
              onChange={(e) => setFilter((prev) => ({ ...prev, keywords: e.target.value }))}
              placeholder="MOQ, price"
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>
    </>
  );
}
