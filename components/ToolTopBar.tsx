import Link from "next/link";
import { NoticeBar } from "./NoticeBar";

export function ToolTopBar() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-3xl items-baseline gap-2">
        <Link href="/" className="inline-flex items-baseline gap-1 group hover:text-indigo-600 transition-all duration-150">
          <span className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            Tradvance
          </span>
          <span className="hidden text-xs text-gray-500 sm:inline group-hover:text-indigo-600">
            해외 바이어 문의 응대 도우미
          </span>
        </Link>
      </div>
    </header>
  );
}

export function ToolShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToolTopBar />
      <NoticeBar />
      {children}
    </div>
  );
}
