"use client";
import { useEffect, useState } from "react";

export default function SettingsModal({ t, onClose }) {
  const [hasKey, setHasKey] = useState(false);
  const [model, setModel] = useState("gemini-2.0-flash");
  const [keyInput, setKeyInput] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((j) => {
      setHasKey(!!j.hasKey);
      if (j.model) setModel(j.model);
    }).catch(() => {});
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = async () => {
    setBusy(true); setMsg("");
    try {
      const body = { model };
      if (keyInput.trim()) body.key = keyInput.trim();
      const r = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "error");
      setHasKey(!!j.hasKey); setKeyInput(""); setMsg(t.keySaved);
    } catch (e) { setMsg(e.message); }
    finally { setBusy(false); }
  };

  const removeKey = async () => {
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/settings", { method: "DELETE" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "error");
      setHasKey(false); setMsg(t.keyDeleted);
    } catch (e) { setMsg(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2>{t.settingsTitle}</h2>
          <button className="x" onClick={onClose} aria-label={t.close}>✕</button>
        </div>
        <p className="modal__sub">{t.settingsSub}</p>
        <div className="aifield">
          <label>{t.keyLabel}</label>
          <input type="password" value={keyInput} autoComplete="off" spellCheck={false}
            placeholder={hasKey ? t.keySavedPh : t.keyPh}
            onChange={(e) => setKeyInput(e.target.value)} />
        </div>
        <div className="aihint" style={{ margin: "6px 0 12px" }}>{t.getKeyHint}</div>
        <div className="aifield">
          <label>{t.modelLabel}</label>
          <input type="text" value={model} spellCheck={false} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="aiactions" style={{ marginTop: 14 }}>
          <button className="btn primary" onClick={save} disabled={busy}>{t.save}</button>
          {hasKey && <button className="btn sm danger" onClick={removeKey} disabled={busy}>{t.deleteKey}</button>}
        </div>
        {msg && <div className="aistatus" style={{ marginTop: 10 }}>{msg}</div>}
      </div>
    </div>
  );
}
