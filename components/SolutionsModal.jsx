"use client";
import { useEffect, useState } from "react";
import { itemTitle } from "@/lib/plan";

const LANGS = ["Java", "C++", "Python", "JavaScript", "Other"];
const uid = () => Math.random().toString(36).slice(2, 9);

export default function SolutionsModal({ t, problem, lang, solutions, onChange, onClose }) {
  const [list, setList] = useState(solutions);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const commit = (next) => { setList(next); onChange(next); };

  const add = () => {
    const next = [...list, { id: uid(), title: `Solution ${list.length + 1}`, lang: "Java", code: "", updatedAt: new Date().toISOString() }];
    commit(next); setActive(next.length - 1);
  };
  const patch = (idx, p) => {
    const next = list.map((s, i) => (i === idx ? { ...s, ...p, updatedAt: new Date().toISOString() } : s));
    commit(next);
  };
  const remove = (idx) => {
    if (!confirm(t.solDeleteConfirm)) return;
    const next = list.filter((_, i) => i !== idx);
    commit(next); setActive(Math.max(0, Math.min(active, next.length - 1)));
  };

  const onTab = (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const ta = e.target;
    const { selectionStart: s, selectionEnd: en, value } = ta;
    const next = value.slice(0, s) + "    " + value.slice(en);
    patch(active, { code: next });
    requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 4; });
  };

  const cur = list[active];

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card wide" role="dialog" aria-modal="true">
        <div className="modal__head">
          <h2>{"</>"} {t.solTitle} — {itemTitle(problem, lang)}</h2>
          <button className="x" onClick={onClose} aria-label={t.close}>✕</button>
        </div>

        {list.length === 0 ? (
          <div className="sol__empty">
            <p>{t.solEmpty}</p>
            <button className="btn primary" onClick={add}>{t.solAdd}</button>
          </div>
        ) : (
          <>
            <div className="sol__tabs">
              {list.map((s, i) => (
                <button key={s.id} className={"sol__tab" + (i === active ? " on" : "")} onClick={() => setActive(i)}>
                  {s.title || `Solution ${i + 1}`}
                </button>
              ))}
              <button className="sol__tab add" onClick={add}>{t.solAdd}</button>
            </div>

            {cur && (
              <div className="sol__editor">
                <div className="sol__meta">
                  <input className="sol__name" value={cur.title} placeholder={t.solNamePh}
                    onChange={(e) => patch(active, { title: e.target.value })} />
                  <select value={cur.lang} onChange={(e) => patch(active, { lang: e.target.value })} aria-label={t.solLang}>
                    {LANGS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                  <button className="btn sm danger" onClick={() => remove(active)}>{t.solDelete}</button>
                </div>
                <textarea className="sol__code" value={cur.code} placeholder={t.solCodePh}
                  spellCheck={false} onKeyDown={onTab}
                  onChange={(e) => patch(active, { code: e.target.value })} />
                <div className="sol__foot">
                  {cur.updatedAt && <span>{t.solUpdated}: {new Date(cur.updatedAt).toLocaleString(lang === "ko" ? "ko-KR" : "en-US")}</span>}
                  <span>{(cur.code || "").split("\n").length} lines</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
