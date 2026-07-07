import { redirect } from "next/navigation";

// 이번 MVP 범위는 로그인/대시보드 없는 단일 흐름(문의 대응)으로 확정되어
// 대시보드 화면은 제외했다 (docs/requirements.md 8장 참고). 기존 링크·북마크가
// 깨지지 않도록 안내 화면 대신 바로 리다이렉트한다.
export default function DashboardRedirectPage() {
  redirect("/tool");
}
