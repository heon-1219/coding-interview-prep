import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { kv, settingsKey } from "@/lib/redis";

export const dynamic = "force-dynamic";

async function requireEmail() {
  const session = await getServerSession(authOptions);
  return session?.user?.email || null;
}

// Returns whether a key is saved and the model — NEVER the key itself.
export async function GET() {
  const email = await requireEmail();
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const s = (await kv().get(settingsKey(email))) || {};
    return Response.json({ hasKey: !!s.geminiKey, model: s.geminiModel || "gemini-2.0-flash" });
  } catch {
    return Response.json({ hasKey: false, model: "gemini-2.0-flash" });
  }
}

export async function PUT(req) {
  const email = await requireEmail();
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "bad json" }, { status: 400 }); }
  try {
    const cur = (await kv().get(settingsKey(email))) || {};
    if (typeof body.key === "string" && body.key.trim()) cur.geminiKey = body.key.trim();
    if (typeof body.model === "string" && body.model.trim()) cur.geminiModel = body.model.trim();
    await kv().set(settingsKey(email), cur);
    return Response.json({ ok: true, hasKey: !!cur.geminiKey, model: cur.geminiModel || "gemini-2.0-flash" });
  } catch (e) {
    const msg = e?.message === "STORAGE_NOT_CONFIGURED"
      ? "Storage is not configured. Add Upstash Redis env vars (see README)."
      : "Storage error.";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const email = await requireEmail();
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const cur = (await kv().get(settingsKey(email))) || {};
    delete cur.geminiKey;
    await kv().set(settingsKey(email), cur);
    return Response.json({ ok: true, hasKey: false });
  } catch {
    return Response.json({ error: "Storage error." }, { status: 500 });
  }
}
