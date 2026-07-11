import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { kv, stateKey } from "@/lib/redis";

export const dynamic = "force-dynamic";

async function requireEmail() {
  const session = await getServerSession(authOptions);
  return session?.user?.email || null;
}

export async function GET() {
  const email = await requireEmail();
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const state = await kv().get(stateKey(email));
    return Response.json({ state: state || null });
  } catch (e) {
    const msg = e?.message === "STORAGE_NOT_CONFIGURED"
      ? "Storage is not configured. Add Upstash Redis env vars (see README)."
      : "Storage error.";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req) {
  const email = await requireEmail();
  if (!email) return Response.json({ error: "unauthorized" }, { status: 401 });
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "bad json" }, { status: 400 }); }
  const state = body?.state;
  if (!state || typeof state !== "object")
    return Response.json({ error: "missing state" }, { status: 400 });
  const raw = JSON.stringify(state);
  if (raw.length > 900_000)
    return Response.json({ error: "Data too large (900KB limit). Trim old solutions." }, { status: 413 });
  try {
    await kv().set(stateKey(email), state);
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e?.message === "STORAGE_NOT_CONFIGURED"
      ? "Storage is not configured. Add Upstash Redis env vars (see README)."
      : "Storage error.";
    return Response.json({ error: msg }, { status: 500 });
  }
}
