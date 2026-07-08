import { NextRequest, NextResponse } from "next/server";
import { OPENING, CLOSING, FALLBACK_PARAGRAPH } from "@/lib/draftGenerator";

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

// 초안의 인사말/마무리는 항상 같은 영어 고정 문구라서, 번역체가 가장 두드러지는
// 이 부분만큼은 자연스러운 한국어 문장으로 직접 대체하고 본문만 번역기를 거친다.
const DRAFT_OPENING_KO = "안녕하세요,\n\n문의해 주셔서 감사합니다. 아래에 항목별로 답변 드립니다.\n\n";
const DRAFT_CLOSING_KO =
  "\n추가로 궁금하신 점이 있으시면 언제든 말씀해 주세요. 답변 기다리겠습니다.\n\n감사합니다.";
const DRAFT_FALLBACK_KO =
  "문의해 주셔서 감사합니다. 정확한 안내를 도와드릴 수 있도록 가격, MOQ, 납기, 사양, 포장, 인증, 결제 조건 중 궁금하신 항목을 조금 더 자세히 알려주시겠어요?";

function naturalizeKorean(text: string): string {
  return text.replace(/[ \t]{2,}/g, " ").trim();
}

async function translateDraftToKorean(text: string): Promise<string | null> {
  let body = text;
  let prefix = "";
  let suffix = "";

  if (body.startsWith(OPENING)) {
    prefix = DRAFT_OPENING_KO;
    body = body.slice(OPENING.length);
  }
  if (body.endsWith(CLOSING)) {
    suffix = DRAFT_CLOSING_KO;
    body = body.slice(0, body.length - CLOSING.length);
  }

  if (!prefix && !suffix) return null;

  const trimmedBody = body.trim();
  if (!trimmedBody) return prefix + suffix;
  if (trimmedBody === FALLBACK_PARAGRAPH.trim()) {
    return prefix + DRAFT_FALLBACK_KO + suffix;
  }

  const translatedBody = await translateText(trimmedBody, "ko");
  if (!translatedBody) return null;

  return prefix + naturalizeKorean(translatedBody) + suffix;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text : "";
  const target = typeof body?.target === "string" ? body.target : "ko";

  if (!text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    if (target === "ko") {
      const naturalDraft = await translateDraftToKorean(text);
      if (naturalDraft) {
        return NextResponse.json({ translated: naturalDraft });
      }
    }

    const translated = await translateText(text, target);
    if (!translated) {
      return NextResponse.json({ translated: null }, { status: 502 });
    }
    return NextResponse.json({
      translated: target === "ko" ? naturalizeKorean(translated) : translated,
    });
  } catch {
    return NextResponse.json({ translated: null }, { status: 502 });
  }
}
