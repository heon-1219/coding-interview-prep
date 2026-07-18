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

  // Code-editor behavior: auto-closing pairs, auto-indent, Tab/Shift+Tab.
  // Only touches the keystroke being typed — stored solution text is never rewritten.
  const PAIRS = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'", "`": "`" };
  const QUOTES = ['"', "'", "`"];
  const IND = "    ";
  const onCode = (e) => {
    const ta = e.target;
    const { selectionStart: s, selectionEnd: en, value } = ta;
    const apply = (nextVal, selS, selE = selS) => {
      e.preventDefault();
      patch(active, { code: nextVal });
      requestAnimationFrame(() => { ta.selectionStart = selS; ta.selectionEnd = selE; });
    };
    const before = value.slice(0, s), after = value.slice(en);
    const prevCh = value[s - 1], nextCh = value[en];

    if (e.key === "Tab") {
      if (e.shiftKey || value.slice(s, en).includes("\n")) {
        // indent / outdent every selected line
        const ls = value.lastIndexOf("\n", s - 1) + 1;
        const lines = value.slice(ls, en).split("\n");
        let dFirst = 0, dTotal = 0;
        const out = lines.map((ln, i) => {
          if (e.shiftKey) {
            const rm = Math.min(IND.length, (ln.match(/^ */)[0]).length);
            if (i === 0) dFirst = -rm;
            dTotal -= rm;
            return ln.slice(rm);
          }
          if (i === 0) dFirst = IND.length;
          dTotal += IND.length;
          return IND + ln;
        }).join("\n");
        return apply(value.slice(0, ls) + out + value.slice(en), Math.max(ls, s + dFirst), en + dTotal);
      }
      return apply(before + IND + after, s + IND.length);
    }

    if (e.key === "Enter") {
      // keep current indent; deepen after an opener or a trailing ":" (Python)
      const ls = value.lastIndexOf("\n", s - 1) + 1;
      const line = value.slice(ls, s);
      const indent = (line.match(/^[ \t]*/) || [""])[0];
      const opened = s === en && "([{".includes(prevCh);
      const deeper = indent + (opened || /:\s*$/.test(line) ? IND : "");
      if (opened && nextCh === PAIRS[prevCh])
        return apply(before + "\n" + deeper + "\n" + indent + after, s + 1 + deeper.length);
      return apply(before + "\n" + deeper + after, s + 1 + deeper.length);
    }

    if (e.key === "Backspace" && s === en && prevCh && PAIRS[prevCh] === nextCh)
      return apply(value.slice(0, s - 1) + value.slice(s + 1), s - 1); // delete empty pair

    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;

    if (s !== en && PAIRS[e.key])
      return apply(before + e.key + value.slice(s, en) + PAIRS[e.key] + after, s + 1, en + 1); // wrap selection

    if (s === en) {
      if ((")]}".includes(e.key) || QUOTES.includes(e.key)) && nextCh === e.key)
        { e.preventDefault(); ta.selectionStart = ta.selectionEnd = s + 1; return; } // type over closer
      if ("([{".includes(e.key))
        return apply(before + e.key + PAIRS[e.key] + after, s + 1);
      if (QUOTES.includes(e.key) && (!nextCh || /[\s)\]},;:]/.test(nextCh)) && !(prevCh && /[\w"'`]/.test(prevCh)))
        return apply(before + e.key + e.key + after, s + 1);
    }
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
                  spellCheck={false} autoCapitalize="off" autoCorrect="off" onKeyDown={onCode}
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
