"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/tool", label: "문의 대응" },
  { href: "/board", label: "문의 보드" },
  { href: "/settings", label: "설정" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white px-4 py-6">
      <Link href="/" className="-ml-2 block pr-2">
        <Image
          src="/logo.png"
          alt="Tradvance"
          width={951}
          height={308}
          priority
          unoptimized
          className="h-12 w-auto"
        />
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "rounded-lg px-3 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 transition-all duration-150"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-150"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
