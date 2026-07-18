"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { DAYS, SECTIONS, ITEMS, ITEM_CORE, TOTAL, LAST_DAY, itemTitle } from "@/lib/plan";
import { STRINGS, WEEKDAYS } from "@/lib/i18n";
import SolutionsModal from "@/components/SolutionsModal";
import SettingsModal from "@/components/SettingsModal";
import SummaryModal from "@/components/SummaryModal";

const isoToday = () => new Date().toISOString().slice(0, 10);
// Fresh accounts start completely empty — nothing pre-checked.
const emptyState = () => ({ start: isoToday(), lang: "en", items: {}, dayNotes: {}, solutions: {}, summary: "", summaryDate: "" });
const FIRST_COMPANY_KEY = DAYS.find((d) => d.company)?.key;

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
  const [showToday, setShowToday] = useState(true);
  const [theme, setTheme] = useState("light");
  const [preFilter, setPreFilter] = useState("all"); // "Already done" difficulty filter

  // pick up the theme the pre-paint script already applied
  useEffect(() => {
    try { setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"); } catch {}
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try { document.documentElement.setAttribute("data-theme", next); localStorage.setItem("ctt-theme", next); } catch {}
      return next;
    });
  };

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
  const doneCount = useMemo(() => state ? Object.keys(state.items).filter((id) => ITEMS[id] && ITEM_CORE[id] && state.items[id].done).length : 0, [state]);
  const hardIds = useMemo(() => state ? Object.keys(state.items).filter((id) => ITEMS[id] && state.items[id].diff === "h") : [], [state]);
  const pct = TOTAL ? Math.round((doneCount / TOTAL) * 100) : 0;

  const todayIndex = useMemo(() => {
    if (!state) return 1;
    const [y, m, d] = state.start.split("-").map(Number);
    const s = new Date(y, m - 1, d); s.setHours(0, 0, 0, 0);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.floor((now - s) / 86400000) + 1;
  }, [state]);

  // ── adaptive pacing: the plan holds on the first dated day that isn't fully
  // checked off, and every later date shifts by however far behind you are.
  // Derived purely from `items`, so it re-computes live on every checkbox tap.
  const effectiveDay = useMemo(() => {
    if (!state) return 1;
    const dated = DAYS.filter((d) => d.dated).sort((a, b) => a.n - b.n);
    for (const d of dated) if (!d.items.every((i) => state.items[i.id]?.done)) return d.n;
    return LAST_DAY + 1;
  }, [state]);
  const planDone = effectiveDay > LAST_DAY;
  const lag = todayIndex >= 1 && !planDone ? todayIndex - effectiveDay : 0; // >0 behind, <0 ahead
  const shift = Math.max(0, lag);

  const dayDate = useCallback((n) => {
    const [y, m, d] = state.start.split("-").map(Number);
    const base = new Date(y, m - 1, d);
    base.setDate(base.getDate() + (n - 1) + (n >= effectiveDay ? shift : 0));
    const wd = WEEKDAYS[lang][base.getDay()];
    return lang === "ko"
      ? `${base.getMonth() + 1}월 ${base.getDate()}일 (${wd})`
      : `${wd}, ${base.toLocaleString("en-US", { month: "short" })} ${base.getDate()}`;
  }, [state, lang, effectiveDay, shift]);

  const paceCls = planDone ? "done" : lag > 0 ? "behind" : lag < 0 ? "ahead" : "ontrack";
  const paceText = !state ? "" : planDone ? t.paceDone : lag > 0 ? t.paceBehind(lag) : lag < 0 ? t.paceAhead(-lag) : t.paceOnTrack;

  // ── Today + spaced review (1 / 3 / 5 days ago), following the lagged schedule ──
  const datedDay = useCallback((n) => DAYS.find((d) => d.dated && d.n === n), []);
  const todayPos = Math.max(1, Math.min(LAST_DAY, effectiveDay));
  const todayDay = datedDay(todayPos);
  const reviewGroups = [1, 3, 5]
    .map((off) => ({ off, n: todayPos - off }))
    .filter((g) => g.n >= 1)
    .map((g) => ({ ...g, day: datedDay(g.n) }))
    .filter((g) => g.day);

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
    const n = todayIndex < 1 ? 1 : todayPos;
    document.getElementById("day-" + n)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCollapsed((c) => ({ ...c, [n]: false }));
  };
  const toggleAll = () => {
    const next = !allCollapsed; setAllCollapsed(next);
    const c = {}; DAYS.forEach((d) => { c[d.key] = next; }); setCollapsed(c);
  };

  // Reusable item row (shared by the Today panel).
  const renderItem = (i) => (
    <ItemRow key={i.id} i={i} t={t} lang={lang} st={state.items[i.id]}
      solCount={(state.solutions[i.id] || []).length}
      noteOpen={!!openNotes[i.id]}
      onToggleNote={() => setOpenNotes((o) => ({ ...o, [i.id]: !o[i.id] }))}
      onDone={() => toggleDone(i.id)} onDiff={(x) => setDiff(i.id, x)} onNote={(v) => setNote(i.id, v)}
      onSolutions={() => setSolFor(i.id)} />
  );

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

  let lastSec = null;
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
          </div>
          <span className={"saved" + (saveMsg ? " show" : "") + (saveMsg && saveMsg !== t.saved ? " err" : "")}>{saveMsg || t.saved}</span>
        </div>
      </div>

      <div className="wrap">
        <section className="today">
          <button className="today__head" onClick={() => setShowToday((v) => !v)} aria-expanded={showToday}>
            <span className="today__badge">{t.todayTitle}</span>
            <span className="today__sub">
              {todayIndex < 1
                ? t.todayNotStarted(dayDate(1))
                : planDone
                  ? t.paceDone
                  : <>{t.dayLabel} {todayPos}{todayDay ? <> · {todayDay.topic[lang]}</> : null}</>}
            </span>
            {todayIndex >= 1 && <span className={"pacepill " + paceCls}>{paceText}</span>}
            <span className="caret" style={{ transform: showToday ? "" : "rotate(-90deg)" }}>▾</span>
          </button>
          {showToday && (
            <div className="today__body">
              {todayIndex < 1 ? (
                <p className="today__empty">{t.todayNotStarted(dayDate(1))}</p>
              ) : (
                <>
                  {lag > 0 && <p className="pace__hint">{t.behindHint(lag)}</p>}
                  {lag < 0 && !planDone && <p className="pace__hint ahead">{t.aheadHint}</p>}
                  <div className="today__study">
                    <h3 className="today__h">{t.studyToday}</h3>
                    {planDone
                      ? <p className="today__empty">{t.todayAllReviewed}</p>
                      : todayDay?.items.map(renderItem)}
                  </div>
                  <div className="today__review">
                    <h3 className="today__h">{t.reviewToday}</h3>
                    <p className="today__hint">{t.reviewSpacedHint}</p>
                    {reviewGroups.length === 0 ? (
                      <p className="today__empty">{todayPos >= LAST_DAY ? t.todayAllReviewed : t.todayNothingReview}</p>
                    ) : (
                      reviewGroups.map((g) => (
                        <div className="today__grp" key={g.off}>
                          <div className="today__grplbl">{t.agoLabel(g.off)} · {t.dayLabel} {g.n} · {g.day.topic[lang]}</div>
                          {g.day.items.filter((i) => i.type === "p").map(renderItem)}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

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
            {todayIndex >= 1 && (
              <div className="pace">
                <span className={"pacepill " + paceCls}>{paceText}</span>
                {!planDone && <span className="pace__est">{t.estFinish(dayDate(LAST_DAY))}</span>}
              </div>
            )}
          </div>
        </section>

        <main>
          {DAYS.map((d) => {
            const sec = SECTIONS[d.sec];
            const header = d.sec !== lastSec ? (lastSec = d.sec, (
              <div className={"phase" + (sec.company ? " company" : "")} key={"sec-" + d.sec}>
                <span className="phase__n">{typeof sec.n === "string" ? sec.n : sec.n[lang]}</span>
                <h2>{sec.t[lang]}</h2>
                <span className="phase__span">{sec.span[lang]}</span>
              </div>
            )) : null;
            const dc = d.pre || !!d.company; // optional sections start collapsed
            return (
              <FragmentWithKey key={d.key}>
                {d.key === FIRST_COMPANY_KEY && <div className="companyintro">{t.companyIntro}</div>}
                {header}
                <DayCard
                  d={d} t={t} lang={lang} state={state}
                  isToday={d.dated && todayIndex >= 1 && !planDone && d.n === todayPos}
                  collapsed={collapsed[d.key] ?? dc}
                  onCollapse={() => setCollapsed((c) => ({ ...c, [d.key]: !(c[d.key] ?? dc) }))}
                  dayDate={dayDate}
                  openNotes={openNotes} setOpenNotes={setOpenNotes}
                  toggleDone={toggleDone} setDiff={setDiff} setNote={setNote} setDayNote={setDayNote}
                  onOpenSolutions={(pid) => setSolFor(pid)}
                  preFilter={preFilter} setPreFilter={setPreFilter}
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
          <div className="credit">{t.builtBy} <a href="https://davidseheonchang.xyz" target="_blank" rel="noopener noreferrer">David Seheon Chang <span className="ext">↗</span></a></div>
        </footer>
      </div>

      <div className="dock">
        <button className="dockbtn dockbtn--icon" onClick={toggleTheme} aria-label={t.themeToggle} title={t.themeToggle}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="dockbtn" onClick={toggleLang} aria-label={t.langBtn} title={t.langBtn}>
          <span aria-hidden="true">🌐</span><span className="dockbtn__lbl">{t.langBtn}</span>
        </button>
        <div className="dock__user" title={user?.email || ""}>
          {user?.image ? <img src={user.image} alt="" /> : <span className="userchip__dot" />}
          <button className="dockbtn" onClick={() => signOut()}>{t.signOut}</button>
        </div>
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

function DayCard({ d, t, lang, state, isToday, collapsed, onCollapse, dayDate, openNotes, setOpenNotes, toggleDone, setDiff, setNote, setDayNote, onOpenSolutions, preFilter, setPreFilter }) {
  const done = d.items.filter((i) => state.items[i.id]?.done).length;
  const tot = d.items.length;
  const full = done === tot;
  const shown = d.pre && preFilter !== "all"
    ? d.items.filter((i) => (state.items[i.id]?.diff || "") === preFilter)
    : d.items;
  return (
    <div className={"day" + (full ? " done" : "") + (isToday ? " today" : "") + (collapsed ? " collapsed" : "")} id={"day-" + d.key}>
      <button className="dhead" onClick={onCollapse}>
        {d.pre
          ? <div className="dnum pre"><small>{t.doneLabel}</small>✓</div>
          : <div className="dnum"><small>{t.dayLabel}</small>{String(d.n).padStart(2, "0")}</div>}
        <div className="dmeta">
          <div className="dhead__topic">{d.topic[lang]} {isToday && <span className="todaytag">{t.today}</span>}</div>
          {d.dated && <div className="dhead__date">{dayDate(d.n)}</div>}
          {d.hint && <div className="dhead__hint">{d.hint[lang]}</div>}
        </div>
        <div className={"dprog" + (full ? " full" : "")}><b>{done}</b>/{tot}</div>
        <span className="caret">▾</span>
      </button>
      {!collapsed && (
        <div className="dbody">
          {d.pre && (
            <div className="prefilter" role="group" aria-label={t.filterLabel}>
              <span className="prefilter__lbl">{t.filterLabel}</span>
              {["all", "e", "o", "h"].map((k) => {
                const count = k === "all" ? d.items.length : d.items.filter((i) => state.items[i.id]?.diff === k).length;
                return (
                  <button key={k} className={"pfbtn" + (preFilter === k ? " on" : "")}
                    onClick={() => setPreFilter(k)} aria-pressed={preFilter === k}>
                    {k === "all" ? <span>{t.filterAll}</span> : <i className={"ld " + k} />}
                    <span className="pfcount">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
          {shown.map((i) => (
            <ItemRow key={i.id} i={i} t={t} lang={lang} st={state.items[i.id]}
              solCount={(state.solutions[i.id] || []).length}
              noteOpen={!!openNotes[i.id]}
              onToggleNote={() => setOpenNotes((o) => ({ ...o, [i.id]: !o[i.id] }))}
              onDone={() => toggleDone(i.id)} onDiff={(x) => setDiff(i.id, x)} onNote={(v) => setNote(i.id, v)}
              onSolutions={() => onOpenSolutions(i.id)} />
          ))}
          {d.pre && shown.length === 0 && <div className="today__empty">{t.filterEmpty}</div>}
          {!d.pre && (
            <div className="daynote">
              <label>{t.dayNoteLabel}</label>
              <textarea value={state.dayNotes[d.key] || ""} placeholder={t.dayNotePh}
                onChange={(e) => setDayNote(d.key, e.target.value)} rows={2} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ItemRow({ i, t, lang, st, solCount, noteOpen, onToggleNote, onDone, onDiff, onNote, onSolutions }) {
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
      </div>
      <div className="item__right">
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
