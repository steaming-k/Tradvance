import { supabase } from "./client";

export interface ParticipantPayload {
  mentionedCategories: string[];
  riskCount: number;
}

export async function insertParticipant(payload: ParticipantPayload) {
  await supabase.from("participants").insert({
    mentioned_categories: payload.mentionedCategories,
    risk_count: payload.riskCount,
  });
}

export async function fetchParticipantCount(): Promise<number> {
  const { count, error } = await supabase
    .from("participants")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}

export function subscribeParticipantInserts(onInsert: () => void) {
  const channel = supabase
    .channel("participants-count")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "participants" },
      () => onInsert()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
