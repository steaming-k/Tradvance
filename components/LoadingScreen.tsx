import { ShipLoader } from "./ShipLoader";

export function LoadingScreen() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 flex flex-col items-center justify-center text-center">
      <ShipLoader />
      <p className="mt-4 text-base text-gray-800">문의 내용을 분석하고 있습니다...</p>
    </div>
  );
}
