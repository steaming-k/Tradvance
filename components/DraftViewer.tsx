import { DraftSegment } from "@/lib/types";

interface Props {
  segments: DraftSegment[];
  checkedRiskIds: Set<string>;
}

export function DraftViewer({ segments, checkedRiskIds }: Props) {
  return (
    <div className="whitespace-pre-wrap text-base text-gray-800 leading-relaxed">
      {segments.map((segment, index) => {
        if (!segment.riskId) {
          return <span key={index}>{segment.text}</span>;
        }
        const checked = checkedRiskIds.has(segment.riskId);
        return (
          <mark
            key={index}
            className={
              checked
                ? "bg-green-50 text-green-700 px-1 rounded"
                : "bg-pink-100 text-pink-900 px-1 rounded underline decoration-pink-400"
            }
          >
            {segment.text}
          </mark>
        );
      })}
    </div>
  );
}
