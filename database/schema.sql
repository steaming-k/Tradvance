-- Tradvance 데이터베이스 스키마
-- Supabase 대시보드 SQL Editor에서 실행한다.

-- ────────────────────────────────────────────
-- 1. events: 측정 이벤트 로그
-- requirements.md 5장 "측정 이벤트": 분석 시작, 위험 구간 확인 모달 오픈, 체크 완료, 복사 완료
-- ────────────────────────────────────────────

create table if not exists public.events (
  id bigint generated always as identity primary key,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "anon can insert events" on public.events;
create policy "anon can insert events"
  on public.events
  for insert
  to anon
  with check (true);

-- ────────────────────────────────────────────
-- 2. participants: 테스트를 완료(초안 복사)한 참여자 기록
-- 메인 화면의 "누적 참여자 수" 실시간 카운터의 원천 데이터
-- ────────────────────────────────────────────

create table if not exists public.participants (
  id bigint generated always as identity primary key,
  mentioned_categories text[] not null default '{}',
  risk_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.participants enable row level security;

-- 완주(복사 완료) 시점에 클라이언트/서버에서 익명으로 적재
drop policy if exists "anon can insert participants" on public.participants;
create policy "anon can insert participants"
  on public.participants
  for insert
  to anon
  with check (true);

-- 누적 참여자 수를 화면에 실시간으로 보여주려면 익명 조회도 허용해야 한다.
drop policy if exists "anon can read participants" on public.participants;
create policy "anon can read participants"
  on public.participants
  for select
  to anon
  using (true);

-- Supabase Realtime(postgres_changes)으로 INSERT 이벤트를 받기 위해
-- 테이블을 supabase_realtime publication에 등록한다. (재실행 안전하게 예외 처리)
do $$
begin
  alter publication supabase_realtime add table public.participants;
exception
  when duplicate_object then null;
end $$;
