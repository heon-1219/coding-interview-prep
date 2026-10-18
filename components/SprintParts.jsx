"use client";
// Pieces shared by the two Google sprints (OA + Interview): problem badges,
// meters, the tab strip and the Topics / Reported / Format & tips views.
import { useEffect, useState } from "react";
import { WEEKDAYS } from "@/lib/i18n";
import { GS_PROBS } from "@/lib/sprint";

export const GS_TABS = ["plan", "topics", "reported", "format"];
const FKEY = "ctt-gs-filters"; // Topics filters, remembered per device

export const fmtDate = (dt, lang) => {
  const wd = WEEKDAYS[lang][dt.getDay()];
  return lang === "ko"
    ? `${dt.getMonth() + 1}월 ${dt.getDate()}일 (${wd})`
    : `${wd}, ${dt.toLocaleString("en-US", { month: "short" })} ${dt.getDate()}`;
};

// ~time · #number · Reported · Premium · Google-tag heat · day tag (Topics view)
export function Meta({ p, t, lang, mins, tag }) {
  const on = t.gsHeatLbl.filter((_, k) => p.heat[k] === "1");
  const heatTitle = on.length ? t.gsHeatTitle(on.join(", ")) : t.gsHeatOld;
  return (
    <div className="gsmeta">
      {mins ? <span className="tpill" title={t.ivEstTitle}>{t.ivMin(mins)}</span> : null}
      <span className="gsnum">#{p.num}</span>
      {p.rep && <span className="gpill rep">{t.gsPillRep}</span>}
      {p.pr && <span className="gpill prem">{t.gsPillPrem}</span>}
      <span className="heat" role="img" title={heatTitle} aria-label={heatTitle}>
        {[0, 1, 2].map((k) => <i key={k} className={p.heat[k] === "1" ? "on" : ""} />)}
      </span>
      {tag && <span className="gpill dayt">{tag[lang]}</span>}
    </div>
  );
}

export function Meter({ label, a, b }) {
  return (
    <div className="gsmeter">
      <span className="gsmeter__lbl">{label}</span>
      <div className="gsmeter__track"><div className="gsmeter__fill" style={{ width: (b ? (100 * a) / b : 0) + "%" }} /></div>
      <span className="gsmeter__n"><b>{a}</b> / {b}</span>
    </div>
  );
}

export function Tabs({ t, tab, setTab, label }) {
  return (
    <div className="gstabs" role="tablist" aria-label={label}>
      {GS_TABS.map((k) => (
        <button key={k} role="tab" aria-selected={tab === k} className={"gstab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
          {t.gsTabs[k]}
        </button>
      ))}
    </div>
  );
}

// Topic bank with difficulty / free / solved filters and a title-or-#number search
export function TopicsView({ t, lang, topics, tags, collapsed, flip, done, row }) {
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

  const ql = q.trim().toLowerCase();
  const qNum = /^#\d+$/.test(ql) ? Number(ql.slice(1)) : null; // "#54" = exactly problem 54
  const match = (p) => (F.d === "all" || p.lv === F.d) && !(F.free && p.pr) && !(F.hide && done(p))
    && (qNum !== null ? p.num === qNum : !ql || `${p.num} ${p.t}`.toLowerCase().includes(ql));
  const cards = topics.map((tp) => {
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
        {!col && <div className="dbody">{vis.map((p) => row(p, null, tags[p.id]))}</div>}
      </div>
    );
  }).filter(Boolean);

  return (
    <>
      <div className="gsfilters" role="group" aria-label={t.filterLabel}>
        <div className="gsfilters__grp">
          {["all", "E", "M", "H"].map((k) => (
            <button key={k} className={"pfbtn lv-" + k + (F.d === k ? " on" : "")} aria-pressed={F.d === k} onClick={() => patchF({ d: k })}>
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
      {cards.length ? cards : <div className="gsempty">{t.gsEmpty}</div>}
    </>
  );
}

// What candidates said they were asked → closest LeetCode practice
export function ReportedView({ t, lang, note, reports, done }) {
  return (
    <>
      <p className="gsnote">{note}</p>
      <div className="reports">
        {reports.map((r, k) => (
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
  );
}

export function FormatView({ t, lang, blocks, sources }) {
  return (
    <div className="fmt">
      {blocks.map((b, k) => {
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
          {sources.map(([name, url]) => (
            <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name} <span className="ext">↗</span></a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
