"use client";

export function LandingHeaderLogo() {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button type="button" onClick={handleClick} className="inline-flex items-baseline gap-2 group">
      <span className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-all duration-150">
        Tradvance
      </span>
      <span className="hidden text-sm text-gray-500 sm:inline group-hover:text-purple-600 transition-all duration-150">
        해외 바이어 문의 응대 도우미
      </span>
    </button>
  );
}
