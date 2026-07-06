import { InfoIcon } from "./icons";

interface Props {
  onRetry: () => void;
}

export function ExceptionScreen({ onRetry }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 flex flex-col items-center text-center">
        <InfoIcon className="h-10 w-10 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">바이어 문의로 인식하지 못했습니다</h2>
        <p className="mt-2 text-base text-gray-800 max-w-md">
          입력하신 내용에서 가격·MOQ·납기 등 문의 관련 정보를 찾지 못했습니다. 바이어 문의 원문을 다시 확인해 붙여넣어 주세요.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 bg-[rgb(98_80_237/77%)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[rgb(98_80_237/100%)] transition-all duration-150"
        >
          다시 입력하기
        </button>
      </div>
    </div>
  );
}
