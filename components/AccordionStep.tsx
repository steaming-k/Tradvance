import { ReactNode } from "react";
import { CheckIcon } from "./icons";

interface Props {
  stepNumber: number;
  title: string;
  status: "done" | "active";
  children: ReactNode;
}

export function AccordionStep({ stepNumber, title, status, children }: Props) {
  const isDone = status === "done";

  return (
    <div
      className={
        isDone
          ? "border-l-4 border-gray-200 bg-gray-50 rounded-lg p-4 transition-all duration-200"
          : "border-l-4 border-purple-500 bg-purple-50 rounded-lg p-4 transition-all duration-200"
      }
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800">
          {stepNumber}. {title}
        </h3>
        {isDone && (
          <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
            <CheckIcon className="h-4 w-4" />
            완료
          </span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
