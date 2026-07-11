"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { DAYS, PHASES, ITEMS, ITEM_DAY, TOTAL, PRE_DONE, LAST_DAY, itemTitle } from "@/lib/plan";
import { STRINGS, WEEKDAYS } from "@/lib/i18n";
import SolutionsModal from "@/components/SolutionsModal";
import SettingsModal from "@/components/SettingsModal";
import SummaryModal from "@/components/SummaryModal";

const isoToday = () => new Date().toISOString().slice(0, 10);
const emptyState = () => {
  const items = {};
  PRE_DONE.forEach((id) => (items[id] = { done: true, diff: null, note: "" }));
  return { start: isoToday(), lang: "en", items, dayNotes: {}, solutions: {}, summary: "", summaryDate: "" };
};

export default function Tracker({ user }) {
  const [state, setState] = useState(null);
  const [loadErr, setLoadErr] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [collapsed, setCollapsed] = useState({});
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [openNotes, setOpenNotes] = useState({});
  const [solFor, setSolFor] = useState(null); // problem id
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const stateRef = useRef(state);
  stateRef.current = state;
  const saveT = useRef(null);
  const msgT = useRef(null);

  // ── load ──
  const load = useCallback(async () => {
    setLoadErr("");
    try {
      const r = await fetch("/api/data");
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "load failed");
      let s = j.state;
      if (!s) {
        s = emptyState();
        try { s.lang = localStorage.getItem("ctt-lang") === "ko" ? "ko" : "en"; } catch {}
        await fetch("/api/data", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state: s }) });
      }
      s.items = s.items || {}; s.dayNotes = s.dayNotes || {}; s.solutions = s.solutions || {};
      if (!s.lang) s.lang = "en";
      if (!s.start) s.start = isoToday();
      setState(s);
    } catch (e) {
      setLoadErr(e.message || "load failed");
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  // ── save (debounced) ──
  const flashMsg = (m) => { setSaveMsg(m); clearTimeout(msgT.current); msgT.current = setTimeout(() => setSaveMsg(""), 1400); };
  const saveNow = useCallback(async () => {
    const s = stateRef.current; if (!s) return;
    try {
      const r = await fetch("/api/data", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state: s }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "save failed");
      flashMsg(STRINGS[s.lang].saved);
    } catch (e) {
      flashMsg(STRINGS[stateRef.current?.lang || "en"].saveFailed);
    }
  }, []);
  const scheduleSave = useCallback(() => { clearTimeout(saveT.current); saveT.current = setTimeout(saveNow, 800); }, [saveNow]);
  const update = useCallback((fn) => { setState((prev) => { const next = fn(structuredCloneSafe(prev)); return next; }); scheduleSave(); }, [scheduleSave]);

  const lang = state?.lang || "en";
  const t = STRINGS[lang];

  // ── derived ──
  const doneCount = useMemo(() => state ? Object.keys(state.items).filter((id) => ITEMS[id] && state.items[id].done).length : 0, [state]);
  const hardIds = useMemo(() => state ? Object.keys(state.items).filter((id) => ITEMS[id] && state.items[id].diff === "h") : [], [state]);
  const pct = TOTAL ? Math.round((doneCount / TOTAL) * 100) : 0;

  const todayIndex = useMemo(() => {
    if (!state) return 1;
    const [y, m, d] = state.start.split("-").map(Number);
    const s = new Date(y, m - 1, d); s.setHours(0, 0, 0, 0);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.floor((now - s) / 86400000) + 1;
  }, [state]);

  const dayDate = useCallback((n) => {
    const [y, m, d] = state.start.split("-").map(Number);
    const base = new Date(y, m - 1, d); base.setDate(base.getDate() + (n - 1));
    const wd = WEEKDAYS[lang][base.getDay()];
    return lang === "ko"
      ? `${base.getMonth() + 1}월 ${base.getDate()}일 (${wd})`
      : `${wd}, ${base.toLocaleString("en-US", { month: "short" })} ${base.getDate()}`;
  }, [state, lang]);

  // ── item mutations ──
  const getItem = (s, id) => { if (!s.items[id]) s.items[id] = { done: false, diff: null, note: "" }; return s.items[id]; };
  const toggleDone = (id) => update((s) => { const it = getItem(s, id); it.done = !it.done; return s; });
  const setDiff = (id, d) => update((s) => { const it = getItem(s, id); it.diff = it.diff === d ? null : d; return s; });
  const setNote = (id, v) => update((s) => { getItem(s, id).note = v; return s; });
  const setDayNote = (n, v) => update((s) => { s.dayNotes[n] = v; return s; });
  const setStart = (v) => update((s) => { s.start = v || isoToday(); return s; });
  const toggleLang = () => {
    update((s) => { s.lang = s.lang === "en" ? "ko" : "en"; try { localStorage.setItem("ctt-lang", s.lang); } catch {} return s; });
  };
  const setSolutions = (pid, list) => update((s) => { s.solutions[pid] = list; return s; });
  const setSummary = (text) => update((s) => { s.summary = text; s.summaryDate = new Date().toISOString(); return s; });
  const resetAll = async () => {
    if (!confirm(t.resetConfirm)) return;
    const fresh = emptyState(); fresh.lang = lang; fresh.start = state.start;
    setState(fresh); stateRef.current = fresh; await saveNow();
  };

  const scrollToday = () => {
    const n = Math.max(1, Math.min(LAST_DAY, todayIndex));
    document.getElementById("day-" + n)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCollapsed((c) => ({ ...c, [n]: false }));
  };
  const toggleAll = () => {
    const next = !allCollapsed; setAllCollapsed(next);
    const c = {}; DAYS.forEach((d) => { c[d.pre ? "pre" : d.n] = next; }); setCollapsed(c);
  };

  // ── render ──
  if (loadErr)
    return (
      <div className="splash">
        <div className="gate__card" style={{ textAlign: "center" }}>
          <p>{STRINGS.en.dataErr}</p>
          <p className="aihint">{loadErr}</p>
          <button className="btn primary" onClick={load}>{STRINGS.en.retry}</button>
        </div>
      </div>
    );
  if (!state) return <div className="splash"><div className="spinner big" /></div>;

  let lastPh = -1;
  return (
    <>
      <div className="topbar">
        <div className="topbar__in">
          <span className="brand"><b>{t.appName}</b></span>
          <div className="topbar__bar"><div className="topbar__fill" style={{ width: pct + "%" }} /></div>
          <span className="topbar__stat">{t.statDone} <b>{doneCount}</b>/{TOTAL} · {t.statReview} <b>{hardIds.length}</b></span>
          <div className="topbar__actions">
            <button className="tbtn hl" onClick={() => setShowSummary(true)}>{t.reviewMaterial}</button>
            <button className="tbtn" onClick={() => setShowSettings(true)}>{t.settings}</button>
            <button className="tbtn" onClick={scrollToday}>{t.toToday}</button>
            <button className="tbtn" onClick={toggleAll}>{allCollapsed ? t.expandAll : t.collapseAll}</button>
            <button className="tbtn" onClick={toggleLang}>{t.langBtn}</button>
          </div>
          <span className={"saved" + (saveMsg ? " show" : "") + (saveMsg && saveMsg !== t.saved ? " err" : "")}>{saveMsg || t.saved}</span>
          <div className="userchip" title={user?.email || ""}>
            {user?.image ? <img src={user.image} alt="" /> : <span className="userchip__dot" />}
            <button className="tbtn" onClick={() => signOut()}>{t.signOut}</button>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section className="hero">
          <p className="hero__k">{t.tagline}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <div className="chips">
            <span className="chip">{t.chip1}</span>
            <span className="chip">{t.chip2}</span>
            <span className="chip">{t.chip3}</span>
          </div>
          <div className="panel">
            <div className="field">
              <label htmlFor="start">{t.startDate}</label>
              <input type="date" id="start" value={state.start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="legend">
              <div className="legend__row lbl">{t.feltLabel}</div>
              <div className="legend__row">
                <span><i className="ld e" /> {t.feltEasy}</span>
                <span><i className="ld o" /> {t.feltOk}</span>
                <span><i className="ld h" /> {t.feltHard}</span>
              </div>
            </div>
            <div className="bigbar">
              <div className="bigbar__track"><div className="bigbar__fill" style={{ width: pct + "%" }} /></div>
              <div className="bigbar__lbl"><span>{t.pctDone(pct)}</span><span>{t.itemsCount(doneCount, TOTAL)}</span></div>
            </div>
          </div>
        </section>

        <section className="queue">
          <div className="queue__head">
            <h2>{t.reviewQueue}</h2>
            <span className={"queue__count" + (hardIds.length ? "" : " zero")}>{hardIds.length}</span>
            <span className="queue__sub">{t.reviewSub}</span>
          </div>
          <div className="queue__box">
            {hardIds.length === 0 ? (
              <div className="queue__empty">{t.reviewEmpty}</div>
            ) : (
              hardIds.map((id) => {
                const i = ITEMS[id]; const st = state.items[id];
                return (
                  <div className="qrow" key={id}>
                    <span className="qrow__day">Day {ITEM_DAY[id]}</span>
                    <input type="checkbox" className="cbox" checked={!!st.done} onChange={() => toggleDone(id)} aria-label="done" />
                    {i.url
                      ? <a className="qrow__t" href={i.url} target="_blank" rel="noopener noreferrer">{itemTitle(i, lang)} <span className="ext">↗</span></a>
                      : <span className="qrow__t">{itemTitle(i, lang)}</span>}
                    <DiffButtons st={st} onSet={(d) => setDiff(id, d)} />
                  </div>
                );
              })
            )}
          </div>
        </section>

        <main>
          {DAYS.map((d) => {
            const phaseHeader = d.ph !== lastPh ? (lastPh = d.ph, (
              <div className="phase" key={"ph" + d.ph}>
                <span className="phase__n">{typeof PHASES[d.ph].n === "string" ? PHASES[d.ph].n : PHASES[d.ph].n[lang]}</span>
                <h2>{PHASES[d.ph].t[lang]}</h2>
                <span className="phase__span">{PHASES[d.ph].span[lang]}</span>
              </div>
            )) : null;
            return (
              <FragmentWithKey key={d.pre ? "pre" : "d" + d.n}>
                {phaseHeader}
                <DayCard
                  d={d} t={t} lang={lang} state={state}
                  isToday={!d.pre && todayIndex === d.n}
                  collapsed={collapsed[d.pre ? "pre" : d.n] ?? !!d.pre}
                  onCollapse={() => setCollapsed((c) => ({ ...c, [d.pre ? "pre" : d.n]: !(c[d.pre ? "pre" : d.n] ?? !!d.pre) }))}
                  dayDate={dayDate}
                  openNotes={openNotes} setOpenNotes={setOpenNotes}
                  toggleDone={toggleDone} setDiff={setDiff} setNote={setNote} setDayNote={setDayNote}
                  onOpenSolutions={(pid) => setSolFor(pid)}
                />
              </FragmentWithKey>
            );
          })}
        </main>

        <footer>
          <b>{t.footTips}</b><br />
          · {t.foot1}<br />
          · {t.foot2}<br />
          · {t.foot3}<br />
          · {t.foot4}
          <div className="reset"><button onClick={resetAll}>{t.resetTitle}</button></div>
        </footer>
      </div>

      {solFor && (
        <SolutionsModal
          t={t} problem={ITEMS[solFor]} lang={lang}
          solutions={state.solutions[solFor] || []}
          onChange={(list) => setSolutions(solFor, list)}
          onClose={() => setSolFor(null)}
        />
      )}
      {showSettings && <SettingsModal t={t} onClose={() => setShowSettings(false)} />}
      {showSummary && (
        <SummaryModal
          t={t} lang={lang} summary={state.summary}
          beforeGenerate={saveNow}
          onResult={setSummary}
          onOpenSettings={() => { setShowSummary(false); setShowSettings(true); }}
          onClose={() => setShowSummary(false)}
        />
      )}
    </>
  );
}

function FragmentWithKey({ children }) { return <>{children}</>; }

function structuredCloneSafe(o) {
  try { return structuredClone(o); } catch { return JSON.parse(JSON.stringify(o)); }
}

function DiffButtons({ st, onSet }) {
  return (
    <div className="diff" role="group" aria-label="felt difficulty">
      {["e", "o", "h"].map((d) => (
        <button key={d} className={`dbtn ${d}${st?.diff === d ? " on" : ""}`} onClick={() => onSet(d)} aria-label={d}><i /></button>
      ))}
    </div>
  );
}

function DayCard({ d, t, lang, state, isToday, collapsed, onCollapse, dayDate, openNotes, setOpenNotes, toggleDone, setDiff, setNote, setDayNote, onOpenSolutions }) {
  const done = d.items.filter((i) => state.items[i.id]?.done).length;
  const tot = d.items.length;
  const full = done === tot;
  const key = d.pre ? "pre" : d.n;
  return (
    <div className={"day" + (full ? " done" : "") + (isToday ? " today" : "") + (collapsed ? " collapsed" : "")} id={d.pre ? "day-pre" : "day-" + d.n}>
      <button className="dhead" onClick={onCollapse}>
        {d.pre
          ? <div className="dnum pre"><small>{t.doneLabel}</small>✓</div>
          : <div className="dnum"><small>{t.dayLabel}</small>{String(d.n).padStart(2, "0")}</div>}
        <div className="dmeta">
          <div className="dhead__topic">{d.topic[lang]} {isToday && <span className="todaytag">{t.today}</span>}</div>
          {!d.pre && <div className="dhead__date">{dayDate(d.n)}</div>}
          {d.hint && <div className="dhead__hint">{d.hint[lang]}</div>}
        </div>
        <div className={"dprog" + (full ? " full" : "")}><b>{done}</b>/{tot}</div>
        <span className="caret">▾</span>
      </button>
      {!collapsed && (
        <div className="dbody">
          {d.items.map((i) => (
            <ItemRow key={i.id} i={i} t={t} lang={lang} st={state.items[i.id]}
              solCount={(state.solutions[i.id] || []).length}
              noteOpen={!!openNotes[i.id]}
              onToggleNote={() => setOpenNotes((o) => ({ ...o, [i.id]: !o[i.id] }))}
              onDone={() => toggleDone(i.id)} onDiff={(x) => setDiff(i.id, x)} onNote={(v) => setNote(i.id, v)}
              onSolutions={() => onOpenSolutions(i.id)} />
          ))}
          {!d.pre && (
            <div className="daynote">
              <label>{t.dayNoteLabel}</label>
              <textarea value={state.dayNotes[d.n] || ""} placeholder={t.dayNotePh}
                onChange={(e) => setDayNote(d.n, e.target.value)} rows={2} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ItemRow({ i, t, lang, st, solCount, noteOpen, onToggleNote, onDone, onDiff, onNote, onSolutions }) {
  const isProb = i.type === "p";
  const lv = isProb ? i.lv : "T";
  return (
    <div className={"item" + (st?.done ? " checked" : "")}>
      <input type="checkbox" className="cbox" checked={!!st?.done} onChange={onDone} aria-label="done" />
      <span className={"lv " + lv}>{isProb ? i.lv : "✓"}</span>
      <div className="item__main">
        {i.url
          ? <a className="item__t" href={i.url} target="_blank" rel="noopener noreferrer">{itemTitle(i, lang)}<span className="ext">↗</span></a>
          : <span className="item__t">{itemTitle(i, lang)}</span>}
        {i.nc && <span className="ncbadge">{t.ncFree}</span>}
      </div>
      <div className="item__right">
        {isProb && (
          <button className={"solbtn" + (solCount ? " has" : "")} onClick={onSolutions} title={t.solutionsBtn}>
            {"</>"}{solCount ? <span className="solcnt">{solCount}</span> : null}
          </button>
        )}
        {isProb && <DiffButtons st={st} onSet={onDiff} />}
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
