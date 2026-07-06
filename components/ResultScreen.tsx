import { CategoryId, DraftSegment, RiskItem } from "@/lib/types";
import { AccordionStep } from "./AccordionStep";
import { CategoryTags } from "./CategoryTags";
import { DraftViewer } from "./DraftViewer";
import { TranslatedOriginalText } from "./TranslatedOriginalText";
import { EditableDraftTranslation } from "./EditableDraftTranslation";
import { CheckIcon } from "./icons";

interface Props {
  originalText: string;
  mentionedCategoryIds: CategoryId[];
  draftSegments: DraftSegment[];
  riskItems: RiskItem[];
  checkedRiskIds: Set<string>;
  onOpenRiskModal: () => void;
  onCopy: () => void;
  onReset: () => void;
  onApplyTranslatedDraft: (newEnglishText: string) => void;
}

export function ResultScreen({
  originalText,
  mentionedCategoryIds,
  draftSegments,
  riskItems,
  checkedRiskIds,
  onOpenRiskModal,
  onCopy,
  onReset,
  onApplyTranslatedDraft,
}: Props) {
  const hasRisk = riskItems.length > 0;
  const allChecked = riskItems.every((item) => checkedRiskIds.has(item.id));
  const canCopy = !hasRisk || allChecked;
  const draftPlainText = draftSegments.map((segment) => segment.text).join("");

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-4">
      <AccordionStep stepNumber={1} title="원문 확인" status="done">
        <p className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-base text-gray-800">
          &ldquo;{originalText}&rdquo;
        </p>
        <TranslatedOriginalText text={originalText} />
      </AccordionStep>

      <AccordionStep stepNumber={2} title="문의 항목 분류" status="done">
        <CategoryTags mentionedCategoryIds={mentionedCategoryIds} />
      </AccordionStep>

      <AccordionStep stepNumber={3} title="답변 초안 생성" status="done">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <DraftViewer segments={draftSegments} checkedRiskIds={checkedRiskIds} />
        </div>
        <EditableDraftTranslation draftText={draftPlainText} onApply={onApplyTranslatedDraft} />
      </AccordionStep>

      <AccordionStep
        stepNumber={4}
        title="위험 구간 확인"
        status={canCopy ? "done" : "active"}
      >
        {!hasRisk && (
          <p className="text-sm text-gray-500">
            이 초안에서는 위험 구간이 발견되지 않았습니다. 바로 복사할 수 있습니다.
          </p>
        )}
        {hasRisk && !allChecked && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-pink-800">
              위험 구간 {riskItems.length}건이 발견되었습니다. 확인 후 복사할 수 있습니다.
            </p>
            <button
              type="button"
              onClick={onOpenRiskModal}
              className="bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
            >
              위험 구간 확인하기
            </button>
          </div>
        )}
        {hasRisk && allChecked && (
          <p className="flex items-center gap-1 text-sm font-medium text-green-600">
            <CheckIcon className="h-4 w-4" />
            위험 구간 {riskItems.length}건을 모두 확인했습니다.
          </p>
        )}
      </AccordionStep>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-800 transition-all duration-150"
        >
          처음으로
        </button>
        <button
          type="button"
          disabled={!canCopy}
          onClick={() => canCopy && onCopy()}
          className={
            canCopy
              ? "bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
              : "bg-gray-200 text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
          }
        >
          초안 복사하기
        </button>
      </div>
    </div>
  );
}
