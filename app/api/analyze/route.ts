import { NextRequest, NextResponse } from "next/server";
import { analyzeInquiry } from "@/lib/analyzeInquiry";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text : "";

  if (!text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const result = analyzeInquiry(text);
  return NextResponse.json(result);
}
