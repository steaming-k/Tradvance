import Link from "next/link";
import { BackofficeShell } from "@/components/backoffice/BackofficeShell";
import { CheckIcon } from "@/components/icons";
import {
  MOCK_INQUIRIES,
  PRIORITY_LABELS,
  PRIORITY_STYLES,
  STATUS_COLUMNS,
} from "@/lib/mockInquiries";

interface ChecklistItem {
  label: string;
  done: boolean;
  href?: string;
  cta?: string;
}

const CHECKLIST: ChecklistItem[] = [
  { label: "회사 제품 카탈로그 등록", done: true },
  { label: "이메일 포워딩 주소 설정", done: false, href: "/settings", cta: "포워딩 설정 보기" },
  { label: "첫 문의 답변 초안 검토하기", done: false, href: "/tool", cta: "샘플 문의로 시작하기" },
];

export default function DashboardPage() {
  const doneCount = CHECKLIST.filter((item) => item.done).length;
  const percent = Math.round((doneCount / CHECKLIST.length) * 100);
  const recentInquiries = MOCK_INQUIRIES.slice(0, 3);

  return (
    <BackofficeShell>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-xl font-semibold text-gray-900">안녕하세요, 대성정밀 님</h1>
        <p className="mt-1 text-sm text-gray-500">
          해외 바이어 문의에 답변 초안을 만들어 드려요
        </p>

        {/* 온보딩 체크리스트 */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-800">
              첫 문의 응대를 시작하기 전에
            </h2>
            <span className="text-sm text-gray-500">
              {doneCount}/{CHECKLIST.length} 완료 · {percent}%
            </span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-purple-600 transition-all duration-200"
              style={{ width: `${percent}%` }}
            />
          </div>

          <ul className="mt-4 divide-y divide-gray-100">
            {CHECKLIST.map((item) => (
              <li key={item.label} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  {item.done ? (
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                  <span className="text-base text-gray-800">{item.label}</span>
                </div>
                {item.done ? (
                  <span className="text-sm font-medium text-blue-600">완료</span>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700 transition-all duration-150"
                  >
                    {item.cta}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* 최근 문의 */}
        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-800">최근 문의</h2>
            <Link
              href="/board"
              className="text-sm text-purple-600 hover:text-purple-700 transition-all duration-150"
            >
              문의 보드에서 전체 보기
            </Link>
          </div>

          <ul className="mt-3 divide-y divide-gray-100">
            {recentInquiries.map((inquiry) => {
              const column = STATUS_COLUMNS.find((c) => c.id === inquiry.status);
              return (
                <li key={inquiry.id}>
                  <Link
                    href={`/board/${inquiry.id}`}
                    className="flex items-center justify-between py-3 hover:bg-gray-50 transition-all duration-150 -mx-2 px-2 rounded-lg"
                  >
                    <div>
                      <p className="text-base text-gray-800">
                        {inquiry.company}{" "}
                        <span className="text-sm text-gray-500">· {inquiry.country}</span>
                      </p>
                      <p className="text-sm text-gray-500">{inquiry.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-sm ${PRIORITY_STYLES[inquiry.priority]}`}
                      >
                        {PRIORITY_LABELS[inquiry.priority]}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <span className={`h-2 w-2 rounded-full ${column?.dot}`} />
                        {column?.label}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </BackofficeShell>
  );
}
