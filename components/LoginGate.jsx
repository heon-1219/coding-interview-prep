"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { STRINGS } from "@/lib/i18n";

export default function LoginGate() {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    try {
      const l = localStorage.getItem("ctt-lang");
      if (l === "ko" || l === "en") setLang(l);
    } catch {}
  }, []);
  const t = STRINGS[lang];
  return (
    <div className="gate">
      <div className="gate__card">
        <p className="hero__k">{t.tagline}</p>
        <h1>{t.loginTitle}</h1>
        <p className="gate__body">{t.loginBody}</p>
        <ul className="gate__feats">
          <li>{t.loginFeat1}</li>
          <li>{t.loginFeat2}</li>
          <li>{t.loginFeat3}</li>
          <li>{t.loginFeat4}</li>
        </ul>
        <button className="btn primary gate__google" onClick={() => signIn("google")}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#fff" d="M21.35 11.1H12v2.9h5.35c-.5 2.4-2.55 3.9-5.35 3.9a6 6 0 1 1 0-12c1.5 0 2.87.55 3.93 1.45l2.15-2.15A9 9 0 1 0 12 21c5.2 0 8.85-3.65 8.85-8.8 0-.37-.03-.74-.1-1.1Z"/>
          </svg>
          {t.signIn}
        </button>
        <div className="gate__credit">
          {t.builtBy} <a href="https://davidseheonchang.xyz" target="_blank" rel="noopener noreferrer">David Seheon Chang ↗</a>
        </div>
      </div>
    </div>
  );
}
