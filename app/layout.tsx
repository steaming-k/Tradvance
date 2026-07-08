import type { Metadata } from "next";
import "./globals.css";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";

export const metadata: Metadata = {
  title: "Tradvance — 해외 바이어 문의 응대 도우미",
  description: "위험 구간 체크리스트가 포함된 바이어 문의 응대 초안 생성 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
