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
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
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
