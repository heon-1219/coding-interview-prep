"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { DAYS, SECTIONS, ITEMS, ITEM_CORE, TOTAL, LAST_DAY } from "@/lib/plan";
import {
  GS_DAYS, GS_TOPICS, GS_BANK, GS_ITEMS, GS_PLAN_IDS, gsDefaultOA, gsFocusDay, gsOffset,
  IV_TOPICS, IV_BANK, IV_PLAN_IDS, ivDefaultStart, ivFocusDay,
} from "@/lib/sprint";
import { STRINGS, WEEKDAYS } from "@/lib/i18n";
import ItemRow from "@/components/ItemRow";
import SprintTrack from "@/components/SprintTrack";
import InterviewTrack from "@/components/InterviewTrack";
import { GS_TABS } from "@/components/SprintParts";
import { IconToday, IconHeadphones, IconFold, IconUnfold, IconGear, IconSun, IconMoon, IconGlobe, IconSignOut } from "@/components/Icons";
import SolutionsModal from "@/components/SolutionsModal";
import SettingsModal from "@/components/SettingsModal";
import SummaryModal from "@/components/SummaryModal";

const isoToday = () => new Date().toISOString().slice(0, 10);
// Fresh accounts start completely empty — nothing pre-checked.
const emptyState = () => ({ start: isoToday(), lang: "en", items: {}, dayNotes: {}, solutions: {}, summary: "", summaryDate: "" });
const FIRST_COMPANY_KEY = DAYS.find((d) => d.company)?.key;
// Tracks: the NeetCode 250 plan, or the optional Google sprint. `state.track`
// holds the user's default (missing = NeetCode); the switcher flips the view.
// The Google sprint has two halves: the OA sprint and, once the OA is passed,
// the 10-day Interview sprint (`state.gsSub`, synced with the account).
const NC = "nc250", GS = "gsprint";
const THEME_KEY = "ctt-sky"; // galaxy (dark) unless the user picked daylight
const THEME_BG = { dark: "#05061A", light: "#EEF0FA" };

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
  const [theme, setTheme] = useState("dark");
  const [preFilter, setPreFilter] = useState("all"); // "Already done" difficulty filter
  const [view, setView] = useState(null); // track on screen; opens on the user's default
  const [gsTab, setGsTabRaw] = useState("plan"); // sprint tab, remembered per device
  const [ivPick, setIvPick] = useState(null); // day open in the Interview plan (null = today's)

  // pick up the theme the pre-paint script already applied
  useEffect(() => {
    try { setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"); } catch {}
    try { const v = localStorage.getItem("ctt-gs-tab"); if (GS_TABS.includes(v)) setGsTabRaw(v); } catch {}
  }, []);
  const setGsTab = (v) => { setGsTabRaw(v); try { localStorage.setItem("ctt-gs-tab", v); } catch {} };
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        document.documentElement.setAttribute("data-theme", next);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BG[next]);
        localStorage.setItem(THEME_KEY, next);
      } catch {}
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
      setView((v) => v || (s.track === GS ? GS : NC));
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

  // ── tracks ──
  const isGs = view === GS;
  const defTrack = state?.track === GS ? GS : NC;
  const gsDone = useMemo(() => state ? GS_PLAN_IDS.filter((id) => state.items[id]?.done).length : 0, [state]);
  const gsHard = useMemo(() => state ? GS_BANK.filter((p) => state.items[p.id]?.diff === "h").length : 0, [state]);
  const gsPct = Math.round((gsDone / GS_PLAN_IDS.length) * 100);
  const ivDone = useMemo(() => state ? IV_PLAN_IDS.filter((id) => state.items[id]?.done).length : 0, [state]);
  const ivHard = useMemo(() => state ? IV_BANK.filter((p) => state.items[p.id]?.diff === "h").length : 0, [state]);
  const ivPct = Math.round((ivDone / IV_PLAN_IDS.length) * 100);
  // OA or Interview sprint; until picked, it's the Interview one once the OA sprint is over
  const gsSub = state?.gsSub || (state?.gsOA && gsOffset(state.gsOA) > GS_DAYS[GS_DAYS.length - 1].off ? "iv" : "oa");
  const isIv = isGs && gsSub === "iv";
  const gsTrackPct = gsSub === "iv" ? ivPct : gsPct;
  // top bar numbers follow the plan on screen
  const stat = !isGs ? { pct, done: doneCount, total: TOTAL, hard: hardIds.length }
    : isIv ? { pct: ivPct, done: ivDone, total: IV_PLAN_IDS.length, hard: ivHard }
    : { pct: gsPct, done: gsDone, total: GS_PLAN_IDS.length, hard: gsHard };

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
  const setDefaultTrack = (k) => update((s) => { s.track = k; return s; });
  const setOA = (v) => update((s) => { s.gsOA = v || gsDefaultOA(); return s; });
  const setIvStart = (v) => update((s) => { s.ivStart = v || ivDefaultStart(); return s; });
  const setGsSub = (k) => update((s) => { s.gsSub = k; return s; });
  // First visit to a sprint pins its dates (default: Day 1 = today) so the schedule stays put.
  useEffect(() => {
    if (view !== GS || !state) return;
    if (gsSub === "oa" && !state.gsOA) update((s) => { s.gsOA = gsDefaultOA(); return s; });
    if (gsSub === "iv" && !state.ivStart) update((s) => { s.ivStart = ivDefaultStart(); return s; });
  }, [view, gsSub, state, update]);
  const resetAll = async () => {
    if (!confirm(t.resetConfirm)) return;
    const fresh = emptyState(); fresh.lang = lang; fresh.start = state.start;
    // settings, not progress
    fresh.track = state.track; fresh.gsOA = state.gsOA; fresh.gsSub = state.gsSub; fresh.ivStart = state.ivStart;
    setState(fresh); stateRef.current = fresh; await saveNow();
  };

  // Interview plan: show a day's full plan (tab may only mount on this render)
  const openIvDay = (key) => {
    setGsTab("plan"); setIvPick(key);
    setTimeout(() => document.getElementById("iv-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const scrollToday = () => {
    if (isIv) return openIvDay(ivFocusDay(state.ivStart || ivDefaultStart()).key);
    if (isGs) {
      const key = gsFocusDay(state.gsOA || gsDefaultOA()).key;
      setGsTab("plan");
      setCollapsed((c) => ({ ...c, [key]: false }));
      // the Plan tab may only mount on this render — scroll once it's there
      setTimeout(() => document.getElementById("day-" + key)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      return;
    }
    const n = todayIndex < 1 ? 1 : todayPos;
    document.getElementById("day-" + n)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCollapsed((c) => ({ ...c, [n]: false }));
  };
  const toggleAll = () => {
    const next = !allCollapsed; setAllCollapsed(next);
    const c = {}; [...DAYS, ...GS_DAYS, ...GS_TOPICS, ...IV_TOPICS].forEach((d) => { c[d.key] = next; }); setCollapsed(c);
  };

  // Reusable item row (Today panels + the sprint track); `meta` = extra badges under the title.
  const renderItem = (i, meta) => (
    <ItemRow key={i.id} i={i} t={t} lang={lang} st={state.items[i.id]} meta={meta}
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
          <div className="topbar__bar"><div className="topbar__fill" style={{ width: stat.pct + "%" }} /></div>
          <span className="topbar__stat">{t.statDone} <b>{stat.done}</b>/{stat.total} · {t.statReview} <b>{stat.hard}</b></span>
          <div className="topbar__actions">
            <button className="tbtn cy" onClick={scrollToday}><IconToday /><span>{t.toToday}</span></button>
            <button className="tbtn hl" onClick={() => setShowSummary(true)}><IconHeadphones /><span>{t.reviewMaterial}</span></button>
            <button className="tbtn ic" onClick={toggleAll} title={allCollapsed ? t.expandAll : t.collapseAll} aria-label={allCollapsed ? t.expandAll : t.collapseAll}>
              {allCollapsed ? <IconUnfold /> : <IconFold />}
            </button>
            <button className="tbtn ic" onClick={() => setShowSettings(true)} title={t.settings} aria-label={t.settings}>
              <IconGear />
            </button>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="trackbar">
          <div className="tracksw" role="tablist" aria-label={t.trackAria}>
            {[[NC, t.trackNc, pct], [GS, t.trackGs, gsTrackPct]].map(([k, name, p]) => (
              <button key={k} role="tab" aria-selected={view === k} className={"tracksw__btn" + (view === k ? " on" : "")} onClick={() => setView(k)}>
                <span className="tracksw__name">{name}</span>
                <span className="tracksw__sub">{t.trackSub(p, defTrack === k)}</span>
              </button>
            ))}
          </div>
          {/* raised = tap to make the track on screen the default; sunk = it already is */}
          <button className={"deftog" + (view === defTrack ? " on" : "")} aria-pressed={view === defTrack} disabled={view === defTrack}
            onClick={() => setDefaultTrack(view)} title={view === defTrack ? t.trackIsDefault : t.trackMakeDefault}
            aria-label={view === defTrack ? t.trackIsDefault : t.trackMakeDefault}>
            <span className="deftog__star" aria-hidden="true">{view === defTrack ? "★" : "☆"}</span>
            <span className="deftog__lbl" aria-hidden="true">{t.trackDefault}</span>
          </button>
        </div>

        {isGs && (
          <div className="subsw" role="tablist" aria-label={t.gsSubAria}>
            {[["oa", gsPct], ["iv", ivPct]].map(([k, p]) => (
              <button key={k} role="tab" aria-selected={gsSub === k} className={"subsw__btn" + (gsSub === k ? " on" : "")} onClick={() => setGsSub(k)}>
                <span className="subsw__txt">
                  <span className="subsw__name">{t.gsSub[k]}</span>
                  <span className="subsw__len">{t.gsSubLen[k]}</span>
                </span>
                <span className="subsw__pct">{p}%</span>
              </button>
            ))}
          </div>
        )}

        {isIv ? (
          <InterviewTrack
            t={t} lang={lang} state={state}
            tab={gsTab} setTab={setGsTab}
            collapsed={collapsed} setCollapsed={setCollapsed}
            showToday={showToday} setShowToday={setShowToday}
            renderItem={renderItem} onSetStart={setIvStart} setDayNote={setDayNote}
            pick={ivPick} setPick={setIvPick} onOpenDay={openIvDay}
          />
        ) : isGs ? (
          <SprintTrack
            t={t} lang={lang} state={state}
            tab={gsTab} setTab={setGsTab}
            collapsed={collapsed} setCollapsed={setCollapsed}
            showToday={showToday} setShowToday={setShowToday}
            renderItem={renderItem} onSetOA={setOA} setDayNote={setDayNote}
          />
        ) : (
          <>
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
                          : todayDay?.items.map((i) => renderItem(i))}
                      </div>
                      <div className="today__review spaced">
                        <h3 className="today__h">{t.reviewToday}</h3>
                        <p className="today__hint">{t.reviewSpacedHint}</p>
                        {reviewGroups.length === 0 ? (
                          <p className="today__empty">{todayPos >= LAST_DAY ? t.todayAllReviewed : t.todayNothingReview}</p>
                        ) : (
                          reviewGroups.map((g) => (
                            <div className="today__grp" key={g.off}>
                              <div className="today__grplbl">{t.agoLabel(g.off)} · {t.dayLabel} {g.n} · {g.day.topic[lang]}</div>
                              {g.day.items.filter((i) => i.type === "p").map((i) => renderItem(i))}
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
          </>
        )}

        <footer>
          <b>{t.footTips}</b><br />
          · {t.foot1}<br />
          · {t.foot2}<br />
          {!isGs && <>· {t.foot3}<br /></>}
          · {t.foot4}
          <div className="reset"><button onClick={resetAll}>{t.resetTitle}</button></div>
          <div className="credit">{t.builtBy} <a href="https://davidseheonchang.xyz" target="_blank" rel="noopener noreferrer">David Seheon Chang <span className="ext">↗</span></a></div>
        </footer>
      </div>

      <span className={"saved" + (saveMsg ? " show" : "") + (saveMsg && saveMsg !== t.saved ? " err" : "")} role="status">{saveMsg || t.saved}</span>
      <div className="dock">
        <button className="dockbtn dockbtn--icon" onClick={toggleTheme} aria-label={t.themeToggle} title={t.themeToggle}>
          {theme === "dark" ? <IconSun size={17} /> : <IconMoon size={17} />}
        </button>
        <button className="dockbtn" onClick={toggleLang} aria-label={t.langBtn} title={t.langBtn}>
          <IconGlobe size={16} /><span className="dockbtn__lbl">{t.langBtn}</span>
        </button>
        <div className="dock__user" title={user?.email || ""}>
          {user?.image ? <img src={user.image} alt="" /> : <span className="userchip__dot" />}
          <button className="dockbtn" onClick={() => signOut()} title={t.signOut} aria-label={t.signOut}><IconSignOut size={16} /><span className="dockbtn__lbl">{t.signOut}</span></button>
        </div>
      </div>

      {solFor && (
        <SolutionsModal
          t={t} problem={ITEMS[solFor] || GS_ITEMS[solFor]} lang={lang}
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
