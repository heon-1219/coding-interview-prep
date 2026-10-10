"use client";
import { useEffect, useState } from "react";
import { WEEKDAYS } from "@/lib/i18n";
import {
  GS_DAYS, GS_TOPICS, GS_BANK, GS_PROBS, GS_REPORTED, GS_FORMAT, GS_SOURCES, GS_PLAN_IDS,
  gsDayItems, gsDate, gsOffset, gsDayAt, gsDefaultOA,
} from "@/lib/sprint";

export const GS_TABS = ["plan", "topics", "reported", "format"];
const FKEY = "ctt-gs-filters"; // Topics filters, remembered per device
const FIRST = GS_DAYS[0], LAST = GS_DAYS[GS_DAYS.length - 1];

const fmtDate = (dt, lang) => {
  const wd = WEEKDAYS[lang][dt.getDay()];
  return lang === "ko"
    ? `${dt.getMonth() + 1}월 ${dt.getDate()}일 (${wd})`
    : `${wd}, ${dt.toLocaleString("en-US", { month: "short" })} ${dt.getDate()}`;
};

// #number · Reported · Premium · Google-tag heat (+ which sprint day uses it, in Topics)
function Meta({ p, t, lang, showDay }) {
  const on = t.gsHeatLbl.filter((_, k) => p.heat[k] === "1");
  const heatTitle = on.length ? t.gsHeatTitle(on.join(", ")) : t.gsHeatOld;
  return (
    <div className="gsmeta">
      <span className="gsnum">#{p.num}</span>
      {p.rep && <span className="gpill rep">{t.gsPillRep}</span>}
      {p.pr && <span className="gpill prem">{t.gsPillPrem}</span>}
      <span className="heat" role="img" title={heatTitle} aria-label={heatTitle}>
        {[0, 1, 2].map((k) => <i key={k} className={p.heat[k] === "1" ? "on" : ""} />)}
      </span>
      {showDay && p.day && <span className="gpill dayt">{p.day[lang]}</span>}
    </div>
  );
}

function Drill({ drill, t, lang, row }) {
  return (
    <div className="drill">
      <div className="drill__head">
        <span className="drill__name">{drill.name[lang]}</span>
        <span className="drill__timer">⏱ {t.gsMin(drill.mins)}</span>
      </div>
      <p className="drill__note">{drill.note[lang]}</p>
      {drill.items.map((p) => row(p))}
    </div>
  );
}

function Meter({ label, a, b }) {
  return (
    <div className="gsmeter">
      <span className="gsmeter__lbl">{label}</span>
      <div className="gsmeter__track"><div className="gsmeter__fill" style={{ width: (b ? (100 * a) / b : 0) + "%" }} /></div>
      <span className="gsmeter__n"><b>{a}</b> / {b}</span>
    </div>
  );
}

export default function SprintTrack({ t, lang, state, tab, setTab, collapsed, setCollapsed, showToday, setShowToday, renderItem, onSetOA, setDayNote }) {
  const [F, setF] = useState({ d: "all", free: false, hide: false });
  const [q, setQ] = useState("");
  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem(FKEY) || "null"); if (v) setF((f) => ({ ...f, ...v })); } catch {}
  }, []);
  const patchF = (p) => setF((f) => {
    const n = { ...f, ...p };
    try { localStorage.setItem(FKEY, JSON.stringify(n)); } catch {}
    return n;
  });

  // ── schedule: Day 1–4, OA day, interview day, dated back from the OA ──
  const oa = state.gsOA || gsDefaultOA();
  const off = gsOffset(oa);
  const cur = gsDayAt(off);
  const before = off < FIRST.off, after = off > LAST.off;
  const dateOf = (d) => fmtDate(gsDate(oa, d.off), lang);
  const pace = after ? { cls: "done", text: t.gsOver }
    : { cls: "ahead", text: off < 0 ? t.gsOaIn(-off) : off === 0 ? t.gsOaToday : t.gsIvToday };

  const done = (p) => !!state.items[p.id]?.done;
  const row = (p, showDay) => renderItem(p, <Meta p={p} t={t} lang={lang} showDay={showDay} />);
  const flip = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const planDone = GS_PLAN_IDS.filter((id) => state.items[id]?.done).length;
  const bankDone = GS_BANK.filter(done).length;
  // earlier sprint days that still have unchecked problems (until the OA — then it's warm-ups only)
  const catchUp = cur && off < 0
    ? GS_DAYS.filter((d) => d.off < off).map((d) => ({ d, items: gsDayItems(d).filter((p) => !done(p)) })).filter((g) => g.items.length)
    : [];
  // miss log = problems marked 🔴 hard (the interview-day warm-up draws from it)
  const missLog = GS_BANK.filter((p) => state.items[p.id]?.diff === "h");
  const missLogRows = missLog.length ? missLog.map((p) => row(p)) : <p className="today__empty">{t.gsMissLogEmpty}</p>;

  // ── Topics filters ──
  const ql = q.trim().toLowerCase();
  const qNum = /^#\d+$/.test(ql) ? Number(ql.slice(1)) : null; // "#54" = exactly problem 54
  const match = (p) => (F.d === "all" || p.lv === F.d) && !(F.free && p.pr) && !(F.hide && done(p))
    && (qNum !== null ? p.num === qNum : !ql || `${p.num} ${p.t}`.toLowerCase().includes(ql));
  const topicCards = GS_TOPICS.map((tp) => {
    const vis = tp.items.filter(match);
    if (!vis.length) return null;
    const dn = tp.items.filter(done).length;
    const full = dn === tp.items.length;
    const col = !ql && !!collapsed[tp.key]; // a search always shows its hits
    return (
      <div key={tp.key} id={"day-" + tp.key} className={"day" + (full ? " done" : "") + (col ? " collapsed" : "")}>
        <button className="dhead" onClick={() => flip(tp.key)} aria-expanded={!col}>
          <div className="dmeta"><div className="dhead__topic">{tp.name[lang]}</div></div>
          <div className={"dprog" + (full ? " full" : "")}><b>{dn}</b>/{tp.items.length}</div>
          <span className="caret">▾</span>
        </button>
        {!col && <div className="dbody">{vis.map((p) => row(p, true))}</div>}
      </div>
    );
  }).filter(Boolean);

  return (
    <>
      <section className="today">
        <button className="today__head" onClick={() => setShowToday((v) => !v)} aria-expanded={showToday}>
          <span className="today__badge">{t.todayTitle}</span>
          <span className="today__sub">
            {before ? t.gsStarts(dateOf(FIRST)) : cur ? <>{cur.label[lang]} · {cur.focus[lang]}</> : t.gsOver}
          </span>
          <span className={"pacepill " + pace.cls}>{pace.text}</span>
          <span className="caret" style={{ transform: showToday ? "" : "rotate(-90deg)" }}>▾</span>
        </button>
        {showToday && (
          <div className="today__body">
            {before && <p className="today__empty">{t.gsTodayBefore(dateOf(FIRST))}</p>}
            {after && <p className="today__empty">{t.gsTodayAfter}</p>}
            {cur && (
              <div className="today__study">
                <h3 className="today__h">{t.studyToday}</h3>
                {cur.items.length ? cur.items.map((p) => row(p)) : <p className="today__hint">{cur.why[lang]}</p>}
                {cur.drill && <Drill drill={cur.drill} t={t} lang={lang} row={row} />}
              </div>
            )}
            {catchUp.length > 0 && (
              <div className="today__review">
                <h3 className="today__h">{t.gsCatchUp}</h3>
                <p className="today__hint">{t.gsCatchUpHint}</p>
                {catchUp.map((g) => (
                  <div className="today__grp" key={g.d.key}>
                    <div className="today__grplbl">{g.d.label[lang]} · {g.d.focus[lang]}</div>
                    {g.items.map((p) => row(p))}
                  </div>
                ))}
              </div>
            )}
            {(missLog.length > 0 || cur === LAST || after) && (
              <div className="today__review">
                <h3 className="today__h">{t.gsMissLog}</h3>
                <p className="today__hint">{t.gsMissLogHint}</p>
                {missLogRows}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="hero">
        <p className="hero__k">{t.gsKicker}</p>
        <h1>{t.gsTitle}</h1>
        <p>{t.gsLede}</p>
        <div className="panel">
          <div className="field">
            <label htmlFor="gs-oa">{t.gsOaDate}</label>
            <input type="date" id="gs-oa" value={oa} onChange={(e) => onSetOA(e.target.value)} />
          </div>
          <div className="gsdates">
            <span>{t.gsDay1On(dateOf(FIRST))}</span>
            <span>{t.gsIvOn(dateOf(LAST))}</span>
          </div>
          <div className="gsmeters">
            <Meter label={t.gsMeterPlan} a={planDone} b={GS_PLAN_IDS.length} />
            <Meter label={t.gsMeterAll} a={bankDone} b={GS_BANK.length} />
          </div>
        </div>
      </section>

      <div className="gstabs" role="tablist" aria-label={t.gsTitle}>
        {GS_TABS.map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} className={"gstab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
            {t.gsTabs[k]}
          </button>
        ))}
      </div>

      <main>
        {tab === "plan" && (
          <>
            <p className="gsnote">{t.gsPlanNote}</p>
            {GS_DAYS.map((d) => {
              const items = gsDayItems(d);
              const dn = items.filter(done).length;
              const full = items.length > 0 && dn === items.length;
              const col = !!collapsed[d.key];
              const isToday = cur === d;
              return (
                <div key={d.key} id={"day-" + d.key} className={"day" + (full ? " done" : "") + (isToday ? " today" : "") + (col ? " collapsed" : "")}>
                  <button className="dhead" onClick={() => flip(d.key)} aria-expanded={!col}>
                    <div className="dmeta">
                      <div className="gsday__lbl">{d.label[lang]} · {dateOf(d)}{isToday && <span className="todaytag">{t.today}</span>}</div>
                      <div className="dhead__topic">{d.focus[lang]}</div>
                      <div className="dhead__hint">{d.why[lang]}</div>
                    </div>
                    {items.length > 0 && <div className={"dprog" + (full ? " full" : "")}><b>{dn}</b>/{items.length}</div>}
                    <span className="caret">▾</span>
                  </button>
                  {!col && (
                    <div className="dbody">
                      {d.items.map((p) => row(p))}
                      {d.drill && <Drill drill={d.drill} t={t} lang={lang} row={row} />}
                      {!items.length && (
                        <div className="gsmiss">
                          <h3 className="today__h">{t.gsMissLog}</h3>
                          {missLogRows}
                        </div>
                      )}
                      <div className="daynote">
                        <label>{t.dayNoteLabel}</label>
                        <textarea value={state.dayNotes[d.key] || ""} placeholder={t.dayNotePh}
                          onChange={(e) => setDayNote(d.key, e.target.value)} rows={2} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {tab === "topics" && (
          <>
            <div className="gsfilters" role="group" aria-label={t.filterLabel}>
              <div className="gsfilters__grp">
                {["all", "E", "M", "H"].map((k) => (
                  <button key={k} className={"pfbtn" + (F.d === k ? " on" : "")} aria-pressed={F.d === k} onClick={() => patchF({ d: k })}>
                    {t.gsFilterDiff[k]}
                  </button>
                ))}
              </div>
              <div className="gsfilters__grp">
                <button className={"pfbtn" + (F.free ? " on" : "")} aria-pressed={F.free} onClick={() => patchF({ free: !F.free })}>{t.gsFreeOnly}</button>
                <button className={"pfbtn" + (F.hide ? " on" : "")} aria-pressed={F.hide} onClick={() => patchF({ hide: !F.hide })}>{t.gsHideSolved}</button>
              </div>
              <input className="gssearch" type="search" value={q} placeholder={t.gsSearch} aria-label={t.gsSearch}
                onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="gslegend">
              <span><span className="heat"><i className="on" /><i className="on" /><i className="on" /></span>{t.gsLegendHeat}</span>
              <span><span className="gpill rep">{t.gsPillRep}</span>{t.gsLegendRep}</span>
              <span><span className="gpill prem">{t.gsPillPrem}</span>{t.gsLegendPrem}</span>
            </div>
            {topicCards.length ? topicCards : <div className="gsempty">{t.gsEmpty}</div>}
          </>
        )}

        {tab === "reported" && (
          <>
            <p className="gsnote">{t.gsRepNote}</p>
            <div className="reports">
              {GS_REPORTED.map((r, k) => (
                <div className="report" key={k}>
                  <div>
                    <div className="report__what">{r.what[lang]}</div>
                    <div className="report__meta">
                      {[r.round[lang], r.when?.[lang]].filter(Boolean).join(" · ")} · <a href={r.url} target="_blank" rel="noopener noreferrer">{r.src} <span className="ext">↗</span></a>
                    </div>
                  </div>
                  <div className="report__chips">
                    {r.ids.map((n) => {
                      const p = GS_PROBS[n];
                      return (
                        <a key={n} className={"pchip" + (done(p) ? " done" : "")} href={p.url} target="_blank" rel="noopener noreferrer">
                          <span className="pchip__n">#{n}</span>{p.t}
                          {p.pr && <span className="gpill prem">{t.gsPillPrem}</span>}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "format" && (
          <div className="fmt">
            {GS_FORMAT.map((b, k) => {
              const List = b.ordered ? "ol" : "ul";
              return (
                <div key={k} className={"fmtblk" + (b.wide ? " wide" : "")}>
                  <h3>{b.title[lang]}</h3>
                  {b.body ? <p>{b.body[lang]}</p> : <List>{b.list.map((x, j) => <li key={j}>{x[lang]}</li>)}</List>}
                </div>
              );
            })}
            <div className="fmtblk wide">
              <h3>{t.gsSources}</h3>
              <ul className="srcs">
                {GS_SOURCES.map(([name, url]) => (
                  <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name} <span className="ext">↗</span></a></li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
