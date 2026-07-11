"use client";
import { useEffect, useState } from "react";
import { STRINGS } from "@/lib/i18n";

// In-app browsers (webviews) where Google sign-in is blocked.
const IN_APP = /(instagram|linkedin|kakao|daum|fban|fbav|fb_iab|line\/|naver|whale|snapchat|musical_ly|tiktok|twitter|band\/|; wv\))/i;

function detect() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  if (!IN_APP.test(ua)) return null;
  return { isIOS: /iphone|ipad|ipod/i.test(ua), isAndroid: /android/i.test(ua) };
}

// URL that reopens the current page in the system browser.
function externalUrl(env, url) {
  if (env.isAndroid) {
    const clean = url.replace(/^https?:\/\//, "");
    return `intent://${clean}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`;
  }
  if (env.isIOS) return "x-safari-" + url; // opens Safari from most in-app browsers
  return url;
}

export default function OpenInBrowser() {
  const [env, setEnv] = useState(null);
  const [lang, setLang] = useState("en");
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const e = detect();
    setEnv(e);
    try { const l = localStorage.getItem("ctt-lang"); if (l === "ko" || l === "en") setLang(l); } catch {}
    // Android's intent:// is reliable (it carries a fallback URL), so try it once
    // automatically. iOS can't be auto-escaped reliably, so we wait for a tap there.
    if (e && e.isAndroid) {
      try {
        if (!sessionStorage.getItem("oib-tried")) {
          sessionStorage.setItem("oib-tried", "1");
          window.location.href = externalUrl(e, window.location.href);
        }
      } catch {}
    }
  }, []);

  if (!env || dismissed) return null;
  const t = STRINGS[lang];

  const open = () => { try { window.location.href = externalUrl(env, window.location.href); } catch {} };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="oib" role="dialog" aria-live="polite" aria-label={t.oibTitle}>
      <div className="oib__card">
        <button className="oib__x" onClick={() => setDismissed(true)} aria-label={t.oibDismiss}>✕</button>
        <div className="oib__txt">
          <b>{t.oibTitle}</b>
          <span>{t.oibBody}</span>
        </div>
        <div className="oib__actions">
          <button className="btn primary" onClick={open}>{t.oibOpen}</button>
          <button className="btn" onClick={copy}>{copied ? t.oibCopied : t.oibCopy}</button>
        </div>
        <div className="oib__hint">{t.oibHint}</div>
      </div>
    </div>
  );
}
