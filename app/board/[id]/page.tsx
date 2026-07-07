import { redirect } from "next/navigation";

// 이번 MVP 범위는 로그인/대시보드 없는 단일 흐름(문의 대응)으로 확정되어
// 문의 보드 화면은 제외했다 (docs/requirements.md 8장 참고).
export default function BoardCardRedirectPage() {
  redirect("/tool");
}
