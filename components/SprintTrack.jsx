"use client";
// Google OA sprint: Day 1–4, OA day and interview day, dated back from the OA.
import {
  GS_DAYS, GS_TOPICS, GS_BANK, GS_DAYTAG, GS_REPORTED, GS_FORMAT, GS_SOURCES, GS_PLAN_IDS,
  gsDayItems, gsDate, gsOffset, gsDayAt, gsDefaultOA,
} from "@/lib/sprint";
import { Meta, Meter, Tabs, TopicsView, ReportedView, FormatView, fmtDate } from "@/components/SprintParts";

const FIRST = GS_DAYS[0], LAST = GS_DAYS[GS_DAYS.length - 1];

function Drill({ drill, t, lang, row }) {
  return (
    <div className="drill">
      <div className="drill__head">
        <span className="drill__name">{drill.name[lang]}</span>
        <span className="drill__timer">{t.gsMin(drill.mins)}</span>
      </div>
      <p className="drill__note">{drill.note[lang]}</p>
      {drill.items.map((p) => row(p))}
    </div>
  );
}

export default function SprintTrack({ t, lang, state, tab, setTab, collapsed, setCollapsed, showToday, setShowToday, renderItem, onSetOA, setDayNote }) {
  const oa = state.gsOA || gsDefaultOA();
  const off = gsOffset(oa);
  const cur = gsDayAt(off);
  const before = off < FIRST.off, after = off > LAST.off;
  const dateOf = (d) => fmtDate(gsDate(oa, d.off), lang);
  const pace = after ? { cls: "done", text: t.gsOver }
    : { cls: "ahead", text: off < 0 ? t.gsOaIn(-off) : off === 0 ? t.gsOaToday : t.gsIvToday };

  const done = (p) => !!state.items[p.id]?.done;
  const row = (p, mins, tag) => renderItem(p, <Meta p={p} t={t} lang={lang} mins={mins} tag={tag} />);
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
              <div className="today__review catch">
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
              <div className="today__review redo">
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

      <Tabs t={t} tab={tab} setTab={setTab} label={t.gsTitle} />

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
          <TopicsView t={t} lang={lang} topics={GS_TOPICS} tags={GS_DAYTAG} collapsed={collapsed} flip={flip} done={done} row={row} />
        )}
        {tab === "reported" && <ReportedView t={t} lang={lang} note={t.gsRepNote} reports={GS_REPORTED} done={done} />}
        {tab === "format" && <FormatView t={t} lang={lang} blocks={GS_FORMAT} sources={GS_SOURCES} />}
      </main>
    </>
  );
}
