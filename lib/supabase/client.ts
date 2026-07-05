import { createClient } from "@supabase/supabase-js";

// docs/supabase-info.md 값을 그대로 사용한다.
// publishable(anon) 키는 클라이언트 번들에 노출되는 것을 전제로 발급되는 키이며,
// 실제 접근 제어는 Supabase의 RLS 정책(database/schema.sql)이 담당한다.
const SUPABASE_PROJECT_ID = "xyhovlzdunlfjqmskrmq";
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_h1omtl8jlxrUgJZe15FTvg_wWYniag2";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
