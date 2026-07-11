import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { kv, stateKey, settingsKey } from "@/lib/redis";
import { buildNotes } from "@/lib/plan";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function buildPrompt(notes, lang) {
  if (lang === "ko") {
    return `너는 코딩 인터뷰 스터디 코치야. 아래는 학습자가 NeetCode 150을 풀며 날짜별로 남긴 노트야. "걸어다니면서 소리로 들으며 복습"하기 좋은 하나의 자료로 합쳐줘.

규칙:
- 한국어로 작성.
- 알고리즘 패턴별로 묶어 핵심 요약.
- [HARD] 표시나 실수 메모는 "주의 포인트"로 강조.
- 귀로 듣기 좋은 짧고 완결된 문장으로. 코드 블록 금지.
- 마크다운(#, *) 금지. 섹션 제목은 대괄호 [ ]로.
- 맨 끝 [한 줄 암기카드] 섹션에 핵심 패턴 5~8문장.

노트:
${notes}`;
  }
  return `You are a coding-interview study coach. Below are a learner's day-by-day notes from working through NeetCode 150. Consolidate them into ONE review script that is pleasant to LISTEN to while walking.

Rules:
- Write in English.
- Group by algorithm pattern and summarize the key ideas.
- Anything marked [HARD] or noted as a mistake goes under "Watch out" emphasis.
- Short, complete sentences that sound natural when read aloud. No code blocks.
- No markdown (#, *). Mark section titles with square brackets [ ].
- End with a [One-line flashcards] section: 5-8 one-sentence pattern reminders.

Notes:
${notes}`;
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });

  let lang = "en";
  try { const b = await req.json(); if (b?.lang === "ko") lang = "ko"; } catch {}

  let state, settings;
  try {
    state = (await kv().get(stateKey(email))) || {};
    settings = (await kv().get(settingsKey(email))) || {};
  } catch (e) {
    const msg = e?.message === "STORAGE_NOT_CONFIGURED"
      ? "Storage is not configured. Add Upstash Redis env vars (see README)."
      : "Storage error.";
    return Response.json({ error: msg }, { status: 500 });
  }

  if (!settings.geminiKey)
    return Response.json({ error: "NO_KEY" }, { status: 400 });

  const notes = buildNotes(state, lang);
  if (!notes.trim())
    return Response.json({ error: "NO_NOTES" }, { status: 400 });

  const model = settings.geminiModel || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(settings.geminiKey)}`;

  let r;
  try {
    r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(notes, lang) }] }],
        generationConfig: { maxOutputTokens: 2048, temperature: 0.4 },
      }),
    });
  } catch {
    return Response.json({ error: "Could not reach Gemini. Try again." }, { status: 502 });
  }

  if (!r.ok) {
    let detail = "";
    try { const j = await r.json(); detail = j?.error?.message || ""; } catch {}
    let hint = "";
    if (r.status === 400 || r.status === 404) hint = " Check the model name in API Settings.";
    if (r.status === 401 || r.status === 403) hint = " Check your API key in API Settings.";
    if (r.status === 429) hint = " Rate limit hit — wait a bit and retry.";
    return Response.json({ error: `Gemini ${r.status}: ${detail}${hint}` }, { status: 502 });
  }

  const j = await r.json();
  const cand = j?.candidates?.[0];
  const text = cand?.content?.parts?.map((p) => p.text || "").join("") || "";
  if (!text) return Response.json({ error: "Gemini returned an empty response. Retry." }, { status: 502 });

  return Response.json({ text });
}
