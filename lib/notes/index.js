// ─── Study notes (Google Interview sprint) ───────────────────────────────
// Pre-written notes for the Interview sprint's problems, keyed by item id.
// The Study notes modal imports this on first open, so the text ships as its
// own chunk instead of in the main bundle. Problems without a note yet show
// "Work in progress".
//   sum   the problem, restated           fam    pattern family
//   type  which variant of that family    ds     data structures
//   idea  key intuition (why it works)    trick  key trick (how to apply it)
//   cx    time · space                    pit    the classic bug or edge case
//   h     three escalating hints, shown before a solution is saved
// Every note has `en` and `ko` with the same fields; `code` spans in
// backticks render as inline code.
import arrays from "./arrays";
import searchStackIntervals from "./search-stack-intervals";
import heapListDesign from "./heap-list-design";
import treesTrie from "./trees-trie";
import graphs from "./graphs";
import backtrackDp from "./backtrack-dp";

export const NOTES = {
  ...arrays, ...searchStackIntervals, ...heapListDesign, ...treesTrie, ...graphs, ...backtrackDp,
};
