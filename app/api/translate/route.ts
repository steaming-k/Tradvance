import { NextRequest, NextResponse } from "next/server";

// 별도 번역 API 키 없이 동작하도록 비공식 Google 번역 엔드포인트를 사용한다.
// 실패 시(네트워크 차단, 엔드포인트 변경 등) 에러를 그대로 알려 화면에서 "번역 실패"로 표시한다.
async function translateText(text: string, target: string): Promise<string | null> {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(target)}&dt=t&q=` +
    encodeURIComponent(text);

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  const chunks = data?.[0];
  if (!Array.isArray(chunks)) return null;

  return chunks.map((chunk: unknown[]) => chunk[0]).join("");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text : "";
  const target = typeof body?.target === "string" ? body.target : "ko";

  if (!text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const translated = await translateText(text, target);
    if (!translated) {
      return NextResponse.json({ translated: null }, { status: 502 });
    }
    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ translated: null }, { status: 502 });
  }
}
