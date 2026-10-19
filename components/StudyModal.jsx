"use client";
// Study notes for one problem. Until a solution is saved they open in hint
// mode: the problem, then hints one at a time, with the rest locked. A saved
// solution (or a deliberate "show now") unlocks the full notes for review.
import { useEffect, useState } from "react";
import { itemTitle } from "@/lib/plan";
import { IconBook, IconLock } from "@/components/Icons";

const FULL = ["idea", "ds", "trick", "cx", "pit"]; // after the problem, in reading order

// `code` spans → <code>
const Rich = ({ text }) => text.split(/`([^`]+)`/).map((s, k) => (k % 2 ? <code key={k}>{s}</code> : s));

function Sec({ k, label, text }) {
  return (
    <section className={"sn__sec " + k}>
      <h3 className="sn__lbl">{label}</h3>
      <p className="sn__txt"><Rich text={text} /></p>
    </section>
  );
}

export default function StudyModal({ t, lang, problem, unlocked, peeked, hints, flagged, onHint, onReveal, onFlag, onOpenSolutions, onClose }) {
  const [notes, setNotes] = useState(null);
  const [err, setErr] = useState(false);
  const [arm, setArm] = useState(false); // "show now" takes two taps

  const load = () => {
    setErr(false);
    import("@/lib/notes").then((m) => setNotes(m.NOTES)).catch(() => setErr(true));
  };
  useEffect(load, []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffect(() => {
    if (!arm) return;
    const id = setTimeout(() => setArm(false), 4000);
    return () => clearTimeout(id);
  }, [arm]);

  const title = itemTitle(problem, lang);
  const n = notes?.[problem.id]?.[lang];
  const S = t.studySec;
  const shown = Math.max(1, hints); // opening the notes is the first hint
  const flag = (
    <button className={"sn__flag" + (flagged ? " on" : "")} aria-pressed={flagged} onClick={onFlag}>
      <i />{flagged ? t.studyFlagged : t.studyFlag}
    </button>
  );

  let body;
  if (!notes) {
    body = err
      ? <div className="sn__state"><p>{t.studyLoadErr}</p><button className="btn sm" onClick={load}>{t.retry}</button></div>
      : <div className="sn__state"><span className="spinner" /> {t.studyLoading}</div>;
  } else if (!n) {
    body = <div className="sn__state"><span className="sn__wip">{t.studyWip}</span><p>{t.studyWipSub}</p></div>;
  } else if (unlocked) {
    body = (
      <>
        <div className="sn__type">
          <h3 className="sn__lbl">{S.type}</h3>
          <div className="sn__typeline">
            <span className="sn__fam">{n.fam}</span>
            <span className="sn__variant"><Rich text={n.type} /></span>
          </div>
        </div>
        <Sec k="sum" label={S.sum} text={n.sum} />
        {FULL.map((k) => <Sec key={k} k={k} label={S[k]} text={n[k]} />)}
        {peeked && <div className="sn__peek"><span>{t.studyPeeked}</span>{flag}</div>}
      </>
    );
  } else {
    body = (
      <>
        <p className="sn__lead">{t.studyHintLead}</p>
        <Sec k="sum" label={S.sum} text={n.sum} />
        <ol className="sn__hints" aria-live="polite">
          {n.h.slice(0, shown).map((h, k) => (
            <li key={k} className="sn__hint">
              <span className="sn__hintn">{t.studyHint(k + 1)}</span>
              <p><Rich text={h} /></p>
            </li>
          ))}
        </ol>
        {shown < n.h.length && (
          <button className="sn__more" onClick={() => onHint(shown + 1)}>{t.studyNextHint(shown + 1)}</button>
        )}
        <div className="sn__flagrow"><span>{t.studyFlagHint}</span>{flag}</div>
        <div className="sn__locked">
          <div className="sn__lockhead"><IconLock size={15} />{t.studyLockedTitle}</div>
          <div className="sn__lockchips">{["type", ...FULL].map((k) => <span key={k}>{S[k]}</span>)}</div>
          <p>{t.studyLockedSub}</p>
          <div className="sn__lockactions">
            <button className="btn sm primary" onClick={onOpenSolutions}>{"</>"} {t.studyAddSol}</button>
            <button className={"btn sm" + (arm ? " armed" : "")} onClick={() => (arm ? onReveal() : setArm(true))}>
              {arm ? t.studyRevealSure : t.studyReveal}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card study" role="dialog" aria-modal="true" aria-label={`${t.studyTitle} — ${title}`}>
        <div className="modal__head sn__head">
          <div className="sn__titles">
            <span className="sn__kicker"><IconBook size={14} />{t.studyTitle}</span>
            <h2>{title}</h2>
          </div>
          <button className="x" onClick={onClose} aria-label={t.close}>✕</button>
        </div>
        <div className="sn__meta">
          <span className={"lv " + problem.lv}>{problem.lv}</span>
          {problem.num && <span className="gsnum">#{problem.num}</span>}
          {n && <span className={"sn__mode" + (unlocked && !peeked ? " open" : "")}>{unlocked ? t.studyFullMode : t.studyHintMode}</span>}
        </div>
        {body}
      </div>
    </div>
  );
}
