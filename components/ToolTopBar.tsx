import { TransitionLink } from "./TransitionLink";
import { NoticeBar } from "./NoticeBar";

export function ToolTopBar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center">
        <TransitionLink href="/" className="inline-flex items-baseline gap-2 group hover:text-indigo-600 transition-all duration-150 -translate-x-[5px]">
          <span className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
            Tradvance
          </span>
          <span className="hidden text-sm text-gray-500 sm:inline group-hover:text-indigo-600">
            해외 바이어 문의 응대 도우미
          </span>
        </TransitionLink>
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
