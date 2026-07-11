# Coding Test Tracker

A 53-day coding-interview tracker: DSA fundamentals + all of NeetCode 150 + company-specific prep (Google / Meta / Amazon / Nvidia / JP Morgan).

- 🔐 Google sign-in (30-day sessions — you stay logged in)
- ☁️ Progress, notes and solutions synced per account (Upstash Redis)
- ⌨️ Multiple saved solutions per problem (NeetCode-style tabs)
- 🎧 AI-consolidated audio review from your notes (your own Gemini key, stored server-side)
- 🌐 English default, Korean toggle · 📱 mobile friendly

## Stack

Next.js 14 (App Router) · NextAuth v4 (Google) · Upstash Redis · Vercel

---

## 1. Google OAuth credentials

1. Go to <https://console.cloud.google.com/> → create (or pick) a project.
2. **APIs & Services → OAuth consent screen**: External → fill app name + your email → save. Add yourself as a test user (or publish the app so anyone can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
4. Add these (you'll add the production ones again after the first deploy):
   - **Authorized JavaScript origins**
     - `http://localhost:3000`
     - `https://YOUR-APP.vercel.app`
   - **Authorized redirect URIs**
     - `http://localhost:3000/api/auth/callback/google`
     - `https://YOUR-APP.vercel.app/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**.

## 2. Upstash Redis (free)

Easiest path: after importing the repo in Vercel, go to your project → **Storage → Create → Upstash (Redis)**. Vercel injects the env vars automatically.

Manual path: create a database at <https://upstash.com> → copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

> The code accepts either naming: `UPSTASH_REDIS_REST_URL/TOKEN` or the marketplace's `KV_REST_API_URL/TOKEN`.

## 3. Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Var | Value |
|---|---|
| `GOOGLE_CLIENT_ID` | from step 1 |
| `GOOGLE_CLIENT_SECRET` | from step 1 |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` locally · your `https://…vercel.app` URL in production |
| `UPSTASH_REDIS_REST_URL` | from step 2 (skip if using Vercel Storage) |
| `UPSTASH_REDIS_REST_TOKEN` | from step 2 (skip if using Vercel Storage) |

## 4. Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. <https://vercel.com/new> → import the repo (defaults are fine).
3. Project → **Settings → Environment Variables** → add everything from the table above (set `NEXTAUTH_URL` to your production URL, e.g. `https://your-app.vercel.app`).
4. (If not done in step 2) **Storage → Upstash Redis** → connect.
5. **Deploy**, then go back to Google Cloud Credentials and make sure your real production domain is in both the origins and redirect URIs.

## Gemini API key (per user)

Each signed-in user adds their own key via **API Settings** in the top bar (free key: <https://aistudio.google.com> → *Get API key*). The key is stored server-side under that user's account and is **never returned to any browser**; summaries are generated on the server. Model name is editable in the same dialog in case Google renames models. If you ever see abnormal usage on your key, just delete/regenerate it in AI Studio — nothing in this app breaks.

## Notes & limits

- Per-user data is one JSON blob (max ~900 KB — roughly hundreds of solutions). If you hit the limit, delete old solutions.
- Two devices editing at once = last write wins.
- Reset button wipes checks/notes/solutions but keeps your account.
