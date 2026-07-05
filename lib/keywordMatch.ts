function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 단순 substring 포함 검사는 "recent" 안의 "ce" 처럼 오탐을 유발하므로
// 단어 경계(\b) 기준으로 키워드가 실제로 하나의 단어/구로 등장하는지 확인한다.
export function includesKeyword(lowerText: string, keyword: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegExp(keyword.toLowerCase())}\\b`, "i");
  return pattern.test(lowerText);
}

export function includesAnyKeyword(lowerText: string, keywords: string[]): boolean {
  return keywords.some((k) => includesKeyword(lowerText, k));
}
