"use client";
import { itemTitle } from "@/lib/plan";
import { IconBook } from "@/components/Icons";

function DiffButtons({ st, onSet }) {
  return (
    <div className="diff" role="group" aria-label="felt difficulty">
      {["e", "o", "h"].map((d) => (
        <button key={d} className={`dbtn ${d}${st?.diff === d ? " on" : ""}`} onClick={() => onSet(d)} aria-label={d}><i /></button>
      ))}
    </div>
  );
}

// One checkable row (problem or task). `meta` renders under the title (track-specific badges).
// `onStudy` adds the Study notes button; `studySolved` = a solution is saved, so its full notes are earned.
export default function ItemRow({ i, t, lang, st, solCount, noteOpen, onToggleNote, onDone, onDiff, onNote, onSolutions, onStudy, studySolved, meta }) {
  const isProb = i.type === "p";
  // "implement …" tasks are code you write, so they get difficulty + solutions too
  const codeTask = i.type === "t" && /implement/i.test(i.t?.en || "");
  const showControls = isProb || codeTask;
  const lv = isProb ? i.lv : (codeTask ? "C" : "T");
  return (
    <div className={"item" + (st?.done ? " checked" : "")}>
      <input type="checkbox" className="cbox" checked={!!st?.done} onChange={onDone} aria-label="done" />
      <span className={"lv " + lv}>{isProb ? i.lv : (codeTask ? "{}" : "✓")}</span>
      <div className="item__main">
        {i.url
          ? <a className="item__t" href={i.url} target="_blank" rel="noopener noreferrer">{itemTitle(i, lang)}<span className="ext">↗</span></a>
          : <span className="item__t">{itemTitle(i, lang)}</span>}
        {i.nc && <span className="ncbadge">{t.ncFree}</span>}
        {meta}
      </div>
      <div className="item__right">
        {onStudy && (
          <button className={"studybtn" + (studySolved ? " solved" : "")} onClick={onStudy} title={t.studyBtn}>
            <IconBook size={14} />{t.studyBtn}
          </button>
        )}
        {showControls && (
          <button className={"solbtn" + (solCount ? " has" : "")} onClick={onSolutions} title={t.solutionsBtn}>
            {"</>"}{solCount ? <span className="solcnt">{solCount}</span> : null}
          </button>
        )}
        {showControls && <DiffButtons st={st} onSet={onDiff} />}
        <button className={"notebtn" + (st?.note?.trim() ? " has" : "")} onClick={onToggleNote} title={t.noteBtn}>✎</button>
      </div>
      {noteOpen && (
        <div className="notewrap open">
          <textarea value={st?.note || ""} placeholder={t.notePh} rows={2} onChange={(e) => onNote(e.target.value)} />
        </div>
      )}
    </div>
  );
}
