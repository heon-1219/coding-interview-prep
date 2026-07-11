"use client";
import { useEffect, useRef, useState } from "react";

export default function SummaryModal({ t, lang, summary, beforeGenerate, onResult, onOpenSettings, onClose }) {
  const [text, setText] = useState(summary || "");
  const [status, setStatus] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [needKey, setNeedKey] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const pick = () => {
        const vs = speechSynthesis.getVoices();
        voiceRef.current = vs.find((v) => (lang === "ko" ? /ko/i : /en/i).test(v.lang)) || null;
      };
      pick(); speechSynthesis.onvoiceschanged = pick;
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = () => { try { speechSynthesis.cancel(); } catch {} };

  const generate = async () => {
    setBusy(true); setErr(false); setNeedKey(false); setStatus(t.generating);
    try {
      await beforeGenerate();
      const r = await fetch("/api/summarize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang }) });
      const j = await r.json();
      if (!r.ok) {
        if (j.error === "NO_KEY") { setNeedKey(true); setStatus(t.noKey); setErr(true); return; }
        if (j.error === "NO_NOTES") { setStatus(t.noNotes); setErr(true); return; }
        throw new Error(j.error || "error");
      }
      setText(j.text); onResult(j.text); setStatus(t.genDoneMsg);
    } catch (e) { setStatus(e.message || "error"); setErr(true); }
    finally { setBusy(false); }
  };

  const speak = () => {
    if (!text) return;
    if (!("speechSynthesis" in window)) { setStatus(t.ttsUnsupported); setErr(true); return; }
    stop();
    const clean = text.replace(/[#*_`>]/g, "").replace(/[\[\]]/g, " ");
    clean.replace(/([.!?。…])\s+/g, "$1\n").split(/\n+/).map((s) => s.trim()).filter(Boolean)
      .forEach((c) => {
        const u = new SpeechSynthesisUtterance(c);
        u.lang = lang === "ko" ? "ko-KR" : "en-US";
        if (voiceRef.current) u.voice = voiceRef.current;
        speechSynthesis.speak(u);
      });
  };

  const copy = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setStatus(t.copied); setErr(false); }
    catch { setStatus(t.copyFail); setErr(true); }
  };
  const download = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = lang === "ko" ? "복습노트_요약.txt" : "review-notes.txt";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2>{t.modalTitle}</h2>
          <button className="x" onClick={onClose} aria-label={t.close}>✕</button>
        </div>
        <p className="modal__sub">{t.modalSub}</p>
        <div className="aiactions">
          <button className="btn primary" onClick={generate} disabled={busy}>
            {busy && <span className="spinner" />} {t.generate}
          </button>
          {needKey && <button className="btn sm" onClick={onOpenSettings}>{t.openSettings}</button>}
        </div>
        {status && <div className={"aistatus" + (err ? " err" : "")}>{status}</div>}
        {text && <div className="aiout">{text}</div>}
        {text && (
          <div className="aiactions" style={{ marginTop: 12 }}>
            <button className="btn sm" onClick={speak}>{t.play}</button>
            <button className="btn sm" onClick={stop}>{t.stop}</button>
            <button className="btn sm" onClick={copy}>{t.copy}</button>
            <button className="btn sm" onClick={download}>{t.download}</button>
          </div>
        )}
      </div>
    </div>
  );
}
