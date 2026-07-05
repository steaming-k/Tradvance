import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const mentionedCategories = Array.isArray(body?.mentionedCategories)
    ? body.mentionedCategories
    : [];
  const riskCount = typeof body?.riskCount === "number" ? body.riskCount : 0;

  const { error } = await supabase.from("participants").insert({
    mentioned_categories: mentionedCategories,
    risk_count: riskCount,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { count, error } = await supabase
    .from("participants")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }
  return NextResponse.json({ count: count ?? 0 });
}
