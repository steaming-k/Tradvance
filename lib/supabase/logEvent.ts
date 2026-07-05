import { supabase } from "./client";

// requirements.md 5장 "측정 이벤트" 4종
export type EventName =
  | "analysis_started"
  | "risk_modal_opened"
  | "risk_check_completed"
  | "draft_copied";

export async function logEvent(
  eventName: EventName,
  payload: Record<string, unknown> = {}
) {
  try {
    await supabase.from("events").insert({
      event_name: eventName,
      payload,
    });
  } catch {
    // 측정 이벤트 실패가 사용 흐름을 막으면 안 되므로 무시한다.
  }
}
