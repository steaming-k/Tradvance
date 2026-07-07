import { supabase } from "./client";

// requirements.md 5장 "측정 이벤트" 4종
export type EventName =
  | "analysis_started"
  | "risk_modal_opened"
  | "risk_check_completed"
  | "draft_copied";

// events 테이블이 없는 환경(스키마 미적용)에서 매 이벤트마다 실패 요청이
// 반복되는 것을 막기 위해, 한 번 실패하면 이후 전송을 건너뛴다.
let telemetryDisabled = false;

export async function logEvent(
  eventName: EventName,
  payload: Record<string, unknown> = {}
) {
  if (telemetryDisabled) return;

  try {
    // supabase insert는 HTTP 오류 시 throw하지 않고 { error }를 반환하므로
    // 반환값을 직접 확인해야 한다.
    const { error } = await supabase.from("events").insert({
      event_name: eventName,
      payload,
    });
    if (error) {
      // 테이블 미존재 등으로 실패하면 이후 전송을 비활성화한다.
      telemetryDisabled = true;
    }
  } catch {
    // 네트워크 예외 등도 사용 흐름을 막으면 안 되므로 비활성화 후 무시한다.
    telemetryDisabled = true;
  }
}
