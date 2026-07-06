import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { analyzeInquiry } from "@/lib/analyzeInquiry";
import { ASSIGNEE_COLOR_STYLES, PRIORITY_LABELS, PRIORITY_STYLES } from "@/lib/mockInquiries";
import { MockInquiry } from "@/lib/types";

const CATEGORY_LABEL_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

interface Props {
  inquiry: MockInquiry;
}

export function InquiryCard({ inquiry }: Props) {
  const analysis = analyzeInquiry(inquiry.originalText);
  const tags = analysis.recognized
    ? analysis.mentionedCategoryIds.slice(0, 3).map((id) => CATEGORY_LABEL_MAP[id])
    : [];

  const visibleAssignees = inquiry.assignees.slice(0, 3);
  const overflow = inquiry.assignees.length - visibleAssignees.length;

  return (
    <Link
      href={`/board/${inquiry.id}`}
      className="block rounded-lg border border-gray-200 bg-white shadow-sm p-3 hover:border-indigo-300 transition-all duration-150"
    >
      <p className="font-medium text-gray-800">
        {inquiry.company} <span className="text-sm text-gray-500">· {inquiry.country}</span>
      </p>

      <div className="mt-2 flex flex-wrap gap-1">
        {inquiry.status === "reviewed" ? (
          <span className="rounded-full px-2 py-0.5 text-sm bg-green-50 text-green-600">
            복사됨
          </span>
        ) : (
          tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-sm bg-indigo-100 text-indigo-700"
            >
              {tag}
            </span>
          ))
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-sm ${PRIORITY_STYLES[inquiry.priority]}`}>
          {PRIORITY_LABELS[inquiry.priority]}
        </span>
        <div className="flex -space-x-3">
          {visibleAssignees.map((a) => (
            <span
              key={a.name}
              title={a.name}
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs text-white ${ASSIGNEE_COLOR_STYLES[a.color]}`}
            >
              {a.initial}
            </span>
          ))}
          {overflow > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs text-gray-600">
              +{overflow}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
