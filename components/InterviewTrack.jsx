"use client";
// Google Interview sprint: ten ~3-hour days after the OA, dated from a Day 1
// you pick. Each day = learn first → redo → core → follow-up → interview rep
// (→ mock / STAR story) with stretch problems tucked away at the end.
import {
  IV_DAYS, IV_TOPICS, IV_BANK, IV_DAYTAG, IV_PLAN_IDS, IV_SKILLS, IV_REPORTED, IV_FORMAT, IV_SOURCES,
  ivDayParts, ivDayItems, ivDate, ivDayNum, ivDayAt, ivDefaultStart,
} from "@/lib/sprint";
import { Meta, Meter, Tabs, TopicsView, ReportedView, FormatView, fmtDate } from "@/components/SprintParts";

const FIRST = IV_DAYS[0], LAST = IV_DAYS[IV_DAYS.length - 1];

function Part({ kind, name, sub, mins, timer, children }) {
  return (
    <section className={"part " + kind}>
      <div className="part__head">
        <span className="part__name">{name}{sub && <span className="part__sub">{sub}</span>}</span>
        {timer ? <span className="part__timer">{timer}</span> : mins ? <span className="part__min">{mins}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Skill({ s, lang }) {
  return (
    <div className="skill">
      <div className="skill__name">{s.name[lang]}{s.days && <span className="skill__days">{s.days[lang]}</span>}</div>
      <div className="sbar" role="img" aria-label={`${s.now} / 100`}><i style={{ width: Math.max(s.now, 2) + "%" }} /></div>
      <div className="skill__v">{s.now}</div>
    </div>
  );
}

export default function InterviewTrack({ t, lang, state, tab, setTab, collapsed, setCollapsed, showToday, setShowToday, renderItem, onSetStart, setDayNote, pick, setPick, onOpenDay }) {
  const start = state.ivStart || ivDefaultStart();
  const n = ivDayNum(start);
  const cur = ivDayAt(n);
  const before = n < FIRST.n, after = n > LAST.n;
  const dateOf = (d) => fmtDate(ivDate(start, d.n), lang);
  const pace = before ? { cls: "ahead", text: t.ivStartsIn(FIRST.n - n) }
    : after ? { cls: "done", text: t.ivPlanDone }
    : { cls: "ontrack", text: t.ivDayOf(n, LAST.n) };

  const done = (p) => !!state.items[p.id]?.done;
  const row = (p, mins, tag) => renderItem(p, <Meta p={p} t={t} lang={lang} mins={mins} tag={tag} />, true); // + Study notes
  const partRow = (x) => row(x.p, x.m);
  const flip = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));
  const mins = (m) => t.gsMin(m);

  const planDone = IV_PLAN_IDS.filter((id) => state.items[id]?.done).length;
  const bankDone = IV_BANK.filter(done).length;
  // earlier days with unchecked plan problems — they carry into today's redo slot
  const catchUp = cur || after
    ? IV_DAYS.filter((d) => d.n < n).map((d) => ({ d, items: ivDayParts(d).filter((x) => !done(x.p)) })).filter((g) => g.items.length)
    : [];
  // redo list = problems marked 🔴 hard (the page's "Needed help" flag)
  const redo = IV_BANK.filter((p) => state.items[p.id]?.diff === "h");
  const redoRows = redo.length ? redo.map((p) => row(p)) : <p className="part__text muted">{t.ivRedoEmpty}</p>;

  // the day open in the Plan tab: the one picked, else today's, else the first unfinished
  const sel = IV_DAYS.find((d) => d.key === pick) || cur
    || IV_DAYS.find((d) => ivDayItems(d).some((p) => !done(p))) || LAST;
  const selItems = ivDayItems(sel);
  const selDone = selItems.filter(done).length;

  return (
    <>
      <section className="today">
        <button className="today__head" onClick={() => setShowToday((v) => !v)} aria-expanded={showToday}>
          <span className="today__badge">{t.todayTitle}</span>
          <span className="today__sub">
            {before ? t.gsStarts(dateOf(FIRST)) : cur ? cur.short[lang] : t.ivAfterTitle}
          </span>
          <span className={"pacepill " + pace.cls}>{pace.text}</span>
          <span className="caret" style={{ transform: showToday ? "" : "rotate(-90deg)" }}>▾</span>
        </button>
        {showToday && (
          <div className="today__body">
            {before && <p className="today__empty">{t.ivTodayBefore(dateOf(FIRST))}</p>}
            {after && <p className="today__empty">{t.ivTodayAfter}</p>}
            {cur && (
              <div className="today__study">
                <h3 className="today__h">{t.studyToday}</h3>
                <p className="today__hint">{cur.focus[lang]}</p>
                {ivDayParts(cur).map(partRow)}
                <button className="linkbtn" onClick={() => onOpenDay(cur.key)}>{t.ivOpenDay(cur.n)}</button>
              </div>
            )}
            {catchUp.length > 0 && (
              <div className="today__review catch">
                <h3 className="today__h">{t.gsCatchUp}</h3>
                <p className="today__hint">{t.ivCatchUpHint}</p>
                {catchUp.map((g) => (
                  <div className="today__grp" key={g.d.key}>
                    <div className="today__grplbl">{g.d.label[lang]} · {g.d.short[lang]}</div>
                    {g.items.map(partRow)}
                  </div>
                ))}
              </div>
            )}
            {(redo.length > 0 || after) && (
              <div className="today__review redo">
                <h3 className="today__h">{t.ivRedoList}</h3>
                <p className="today__hint">{t.ivRedoHint}</p>
                {redo.length ? redo.map((p) => row(p)) : <p className="today__empty">{t.gsMissLogEmpty}</p>}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="hero">
        <p className="hero__k">{t.ivKicker}</p>
        <h1>{t.ivTitle}</h1>
        <p><b>{t.ivLedeLead}</b> {t.ivLede}</p>
        <div className="panel">
          <div className="field">
            <label htmlFor="iv-start">{t.ivStart}</label>
            <input type="date" id="iv-start" value={start} onChange={(e) => onSetStart(e.target.value)} />
          </div>
          <div className="gsdates">
            <span>{t.ivEndOn(dateOf(LAST))}</span>
            <span className="gsdates__redo">{t.ivMeterRedo} <b>{redo.length}</b></span>
          </div>
          <div className="gsmeters">
            <Meter label={t.gsMeterPlan} a={planDone} b={IV_PLAN_IDS.length} />
            <Meter label={t.gsMeterAll} a={bankDone} b={IV_BANK.length} />
          </div>
        </div>
      </section>

      <Tabs t={t} tab={tab} setTab={setTab} label={t.ivTitle} />

      <main>
        {tab === "plan" && (
          <>
            <div className="ready">
              <div className="ready__top">
                <h2 className="ready__h">{t.ivReadyTitle}</h2>
                <div className="score" role="img" aria-label={t.ivReadyAria(IV_SKILLS.now, IV_SKILLS.goal)}>
                  <b>{IV_SKILLS.now}</b><small>/100</small>
                  <span className="score__to" aria-hidden="true">→</span>
                  <b className="score__goal">~{IV_SKILLS.goal}</b><small>{t.ivReadyAfter}</small>
                </div>
              </div>
              <div className="ready__cols">
                <div className="ready__col weak">
                  <div className="ready__lbl">{t.ivWeak}</div>
                  {IV_SKILLS.weak.map((s) => <Skill key={s.name.en} s={s} lang={lang} />)}
                </div>
                <div className="ready__col strong">
                  <div className="ready__lbl">{t.ivStrong}</div>
                  {IV_SKILLS.strong.map((s) => <Skill key={s.name.en} s={s} lang={lang} />)}
                </div>
              </div>
              <p className="ready__foot">{t.ivReadyFoot}</p>
            </div>

            <p className="gsnote">{t.ivPlanNote}</p>

            <div className="daygrid" role="group" aria-label={t.ivDaysAria}>
              {IV_DAYS.map((d) => {
                const items = ivDayItems(d);
                const dn = items.filter(done).length;
                const cls = "dchip" + (sel === d ? " on" : "") + (cur === d ? " today" : "") + (dn === items.length ? " full" : "");
                return (
                  <button key={d.key} className={cls} aria-pressed={sel === d} onClick={() => setPick(d.key)}
                    aria-label={`${d.label[lang]} · ${d.short[lang]} · ${dn}/${items.length}`}>
                    <span className="dchip__n">{d.label[lang]}</span>
                    <span className="dchip__f">{d.short[lang]}</span>
                    <span className="dchip__m"><span className="dchip__time">~{t.ivHm(d.mins)}</span><span>{dn}/{items.length}</span></span>
                    <span className="dchip__bar"><i style={{ width: (100 * dn) / items.length + "%" }} /></span>
                  </button>
                );
              })}
            </div>

            <article id="iv-detail" className={"day ivday" + (cur === sel ? " today" : "")}>
              <div className="ivday__head">
                <div className="ivday__lbl">{sel.label[lang]} · {dateOf(sel)}{cur === sel && <span className="todaytag">{t.today}</span>}</div>
                <div className="ivday__time"><b>~{t.ivHm(sel.mins)}</b><span className={"dprog" + (selDone === selItems.length ? " full" : "")}><b>{selDone}</b>/{selItems.length}</span></div>
                <h2 className="ivday__focus">{sel.focus[lang]}</h2>
                <p className="ivday__why">{sel.why[lang]}</p>
              </div>
              <Part kind="learn" name={t.ivPart.learn} mins={mins(sel.learn.m)}><p className="part__text">{sel.learn.text[lang]}</p></Part>
              {sel.redo && <Part kind="redo" name={t.ivPart.redo} sub={t.ivRedoSub} mins={mins(15)}>{redoRows}</Part>}
              <Part kind="core" name={t.ivPart.core}>{sel.core.map(partRow)}</Part>
              {sel.follow && <Part kind="follow" name={t.ivPart.follow} sub={t.ivFollowSub} mins={mins(sel.follow.m)}><p className="part__text">{sel.follow.text[lang]}</p></Part>}
              {sel.keep && <Part kind="keep" name={t.ivPart.keep} sub={`${sel.keep.topic[lang]} · ${t.ivKeepNote}`}>{partRow(sel.keep)}</Part>}
              {sel.mock && (
                <Part kind="mock" name={t.ivPart.mock} sub={sel.mock.name[lang]} timer={`${sel.mock.mins} + ${mins(sel.mock.review)}`}>
                  <p className="part__text muted">{sel.mock.note[lang]}</p>
                  {sel.mock.items.map(partRow)}
                </Part>
              )}
              {sel.star && <Part kind="star" name={t.ivPart.star} sub={t.ivStarSub} mins={mins(sel.star.m)}><p className="part__text">{sel.star.text[lang]}</p></Part>}
              {sel.stretch.length > 0 && (
                <details className="part stretch" key={sel.key}>
                  <summary className="part__head">
                    <span className="part__name">{t.ivPart.stretch}<span className="part__sub">{t.ivStretchSub}</span></span>
                    <span className="part__min">{mins(sel.stretch.reduce((a, x) => a + x.m, 0))}</span>
                  </summary>
                  {sel.stretch.map(partRow)}
                </details>
              )}
              <div className="daynote">
                <label>{t.dayNoteLabel}</label>
                <textarea value={state.dayNotes[sel.key] || ""} placeholder={t.dayNotePh}
                  onChange={(e) => setDayNote(sel.key, e.target.value)} rows={2} />
              </div>
            </article>

            <div className="ivnote after">
              <h3>{t.ivAfterTitle}</h3>
              <p>{t.ivAfter}</p>
            </div>
            <div className="ivnote rules">
              <h3>{t.ivRulesTitle}</h3>
              <ol>{t.ivRules.map((r, k) => <li key={k}>{r}</li>)}</ol>
            </div>
          </>
        )}
        {tab === "topics" && (
          <TopicsView t={t} lang={lang} topics={IV_TOPICS} tags={IV_DAYTAG} collapsed={collapsed} flip={flip} done={done} row={row} />
        )}
        {tab === "reported" && <ReportedView t={t} lang={lang} note={t.ivRepNote} reports={IV_REPORTED} done={done} />}
        {tab === "format" && <FormatView t={t} lang={lang} blocks={IV_FORMAT} sources={IV_SOURCES} />}
      </main>
    </>
  );
}
