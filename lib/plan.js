// ─── Plan data (bilingual) ───────────────────────────────────────────────
// P  = LeetCode problem  |  NC = premium problem linked to NeetCode's free page
// T  = task (bilingual title)

const P = (slug, t, lv) => ({ id: slug, type: "p", t, lv, url: `https://leetcode.com/problems/${slug}/` });
const NC = (nc, t, lv) => ({ id: "nc-" + nc, type: "p", t, lv, url: `https://neetcode.io/problems/${nc}`, nc: true });
const T = (id, en, ko, url) => ({ id, type: "t", t: { en, ko }, url: url || null });

export const L = {
  bigo: "https://www.bigocheatsheet.com/",
  viz: "https://visualgo.net/en/sorting",
  cpp: "https://www.learncpp.com/",
  os: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
  lp: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles",
  amz: "https://leetcode.com/company/amazon/",
  meta: "https://leetcode.com/company/facebook/",
  ggl: "https://leetcode.com/company/google/",
  hr: "https://www.hackerrank.com/",
};

const D = (topicEn, topicKo, hintEn, hintKo, items, extra) => ({
  topic: { en: topicEn, ko: topicKo },
  hint: hintEn ? { en: hintEn, ko: hintKo } : null,
  items,
  ...(extra || {}),
});

export const DAYS = [
  // ═══ Already done: Arrays & Hashing (9) ═══
  D("Arrays & Hashing — already done", "Arrays & Hashing — 이미 완료",
    "You finished this section (through Sort an Array). Un-check anything you haven't actually solved.",
    "네가 정렬까지 끝낸 섹션. 아직 안 푼 게 있으면 체크 해제해.",
    [
      P("contains-duplicate", "Contains Duplicate", "E"),
      P("valid-anagram", "Valid Anagram", "E"),
      P("two-sum", "Two Sum", "E"),
      P("group-anagrams", "Group Anagrams", "M"),
      P("top-k-frequent-elements", "Top K Frequent Elements", "M"),
      NC("string-encode-and-decode", "Encode and Decode Strings", "M"),
      P("product-of-array-except-self", "Product of Array Except Self", "M"),
      P("valid-sudoku", "Valid Sudoku", "M"),
      P("longest-consecutive-sequence", "Longest Consecutive Sequence", "M"),
    ], { pre: true }),

  // ═══ Phase 1 · DSA Fundamentals (Day 1–3) ═══
  D("Complexity + Recursion basics", "복잡도 + 재귀 기초",
    "Implement by hand — no library shortcuts.", "라이브러리 없이 직접 짜보며 감 잡기.",
    [
      T("f1a", "Review Big-O time/space complexity (best·average·worst)", "Big-O·시간/공간 복잡도 정리 (best·average·worst)", L.bigo),
      T("f1b", "Recursion basics — implement factorial, Fibonacci, Tower of Hanoi; convert recursion ↔ iteration", "재귀 기초 — 팩토리얼·피보나치·하노이 직접 구현 + 재귀↔반복 변환"),
      P("fibonacci-number", "Fibonacci Number", "E"),
      T("f1c", "Get sorting & data-structure behavior into your eyes (VisuAlgo)", "정렬·자료구조 동작을 시각화로 눈에 익히기 (VisuAlgo)", L.viz),
    ]),
  D("Sorting ① — concepts + Merge Sort", "정렬 ① — 개념 + 머지 정렬",
    "Implement it yourself, don't call the library sort.", "라이브러리 sort 말고 직접 구현.",
    [
      T("f2a", "Compare bubble / selection / insertion / counting sort (idea + complexity)", "버블·선택·삽입·카운팅 정렬 개념과 복잡도 비교", L.viz),
      T("f2b", "Implement Merge Sort from scratch — divide & merge", "머지 정렬(Merge Sort) 직접 구현 — 분할·병합"),
      P("sort-an-array", "Sort an Array — solve with YOUR merge/quick sort", "M"),
      T("f2c", "One-liner: stable vs unstable sorting", "안정 정렬 vs 불안정 정렬 차이 한 줄 정리"),
    ]),
  D("Sorting ② (Quick·Heap) + core DS internals", "정렬 ② (퀵·힙) + 기본 자료구조 구현",
    "Quick-sort partition is today's core.", "퀵 정렬 파티션이 오늘의 핵심.",
    [
      T("f3a", "Implement Quick Sort from scratch — partition & pivot choice", "퀵 정렬(Quick Sort) 직접 구현 — 파티션·피벗 선택"),
      T("f3b", "Heap Sort concept + build-heap / heapify", "힙 정렬(Heap Sort) 개념 + build-heap / heapify"),
      P("sort-colors", "Sort Colors — 3-way partition (Dutch flag)", "M"),
      T("f3c", "How dynamic array·linked list·stack·queue·deque·hash table work internally", "동적배열·연결리스트·스택·큐·덱·해시테이블 동작 원리 정리"),
    ]),

  // ═══ Phase 2 · NeetCode 150 core (Day 4–43) ═══
  D("Two Pointers ①", "Two Pointers ①", "Sorted arrays, pointers from both ends.", "정렬된 배열·양끝 포인터 감각.",
    [
      P("valid-palindrome", "Valid Palindrome", "E"),
      P("two-sum-ii-input-array-is-sorted", "Two Sum II", "M"),
      P("3sum", "3Sum", "M"),
    ]),
  D("Two Pointers ② + Sliding Window ①", "Two Pointers ② + Sliding Window ①", null, null,
    [
      P("container-with-most-water", "Container With Most Water", "M"),
      P("trapping-rain-water", "Trapping Rain Water", "H"),
      P("best-time-to-buy-and-sell-stock", "Best Time to Buy and Sell Stock", "E"),
    ]),
  D("Sliding Window ②", "Sliding Window ②", "The expand/shrink template.", "창을 넓히고 좁히는 템플릿.",
    [
      P("longest-substring-without-repeating-characters", "Longest Substring Without Repeating", "M"),
      P("longest-repeating-character-replacement", "Longest Repeating Char Replacement", "M"),
      P("permutation-in-string", "Permutation in String", "M"),
      P("minimum-window-substring", "Minimum Window Substring", "H"),
    ]),
  D("Sliding Window ③ + Stack ①", "Sliding Window ③ + Stack ①", null, null,
    [
      P("sliding-window-maximum", "Sliding Window Maximum", "H"),
      P("valid-parentheses", "Valid Parentheses", "E"),
      P("min-stack", "Min Stack", "M"),
      P("evaluate-reverse-polish-notation", "Evaluate Reverse Polish Notation", "M"),
      T("impl-stack", "Implement stack, queue, deque yourself (array / linked-list based)", "스택·큐·덱 직접 구현 (배열/연결리스트 기반)"),
    ]),
  D("Stack ②", "Stack ②", "Monotonic stack.", "모노토닉 스택.",
    [
      P("generate-parentheses", "Generate Parentheses", "M"),
      P("daily-temperatures", "Daily Temperatures", "M"),
      P("car-fleet", "Car Fleet", "M"),
      P("largest-rectangle-in-histogram", "Largest Rectangle in Histogram", "H"),
    ]),
  D("Review ① + Binary Search ①", "복습 ① + Binary Search ①", "Review day = re-solve first.", "복습일 = 재풀이 우선.",
    [
      T("rv6", "Re-solve 2 problems you marked HARD (Two Pointers~Stack)", "Two Pointers~Stack 중 \"어려웠음\" 2개 재풀이"),
      P("binary-search", "Binary Search", "E"),
      P("search-a-2d-matrix", "Search a 2D Matrix", "M"),
    ]),
  D("Binary Search ②", "Binary Search ②", "\"Binary search on the answer\" is the key pattern.", "\"정답 위에서 이분탐색\"이 핵심.",
    [
      P("koko-eating-bananas", "Koko Eating Bananas", "M"),
      P("find-minimum-in-rotated-sorted-array", "Find Minimum in Rotated Sorted Array", "M"),
      P("search-in-rotated-sorted-array", "Search in Rotated Sorted Array", "M"),
    ]),
  D("Binary Search ③ + Linked List ①", "Binary Search ③ + Linked List ①", null, null,
    [
      P("time-based-key-value-store", "Time Based Key-Value Store", "M"),
      P("median-of-two-sorted-arrays", "Median of Two Sorted Arrays", "H"),
      P("reverse-linked-list", "Reverse Linked List", "E"),
      P("merge-two-sorted-lists", "Merge Two Sorted Lists", "E"),
      T("impl-ll", "Implement a linked list yourself — node, insert, delete, reverse (no library)", "연결리스트 직접 구현 — 노드 정의·삽입·삭제·역순 (라이브러리 없이)"),
    ]),
  D("Linked List ②", "Linked List ②", null, null,
    [
      P("reorder-list", "Reorder List", "M"),
      P("remove-nth-node-from-end-of-list", "Remove Nth Node From End", "M"),
      P("copy-list-with-random-pointer", "Copy List with Random Pointer", "M"),
      P("add-two-numbers", "Add Two Numbers", "M"),
    ]),
  D("Linked List ③", "Linked List ③", null, null,
    [
      P("linked-list-cycle", "Linked List Cycle", "E"),
      P("find-the-duplicate-number", "Find the Duplicate Number", "M"),
      P("lru-cache", "LRU Cache", "M"),
    ]),
  D("Linked List ④ (Hard)", "Linked List ④ (Hard)", "Two hards, full focus.", "하드 2개 집중.",
    [
      P("merge-k-sorted-lists", "Merge K Sorted Lists", "H"),
      P("reverse-nodes-in-k-group", "Reverse Nodes in K-Group", "H"),
    ]),
  D("Review ② + Trees ①", "복습 ② + Trees ①", null, null,
    [
      T("rv12", "Re-solve HARD-marked Linked List problems", "Linked List \"어려웠음\" 재풀이"),
      P("invert-binary-tree", "Invert Binary Tree", "E"),
      P("maximum-depth-of-binary-tree", "Maximum Depth of Binary Tree", "E"),
      P("diameter-of-binary-tree", "Diameter of Binary Tree", "E"),
      T("impl-tree", "Implement all 3 traversals (pre/in/post) recursive + iterative", "트리 순회 3종(전위·중위·후위) 재귀 + 반복 직접 구현"),
    ]),
  D("Trees ②", "Trees ②", null, null,
    [
      P("balanced-binary-tree", "Balanced Binary Tree", "E"),
      P("same-tree", "Same Tree", "E"),
      P("subtree-of-another-tree", "Subtree of Another Tree", "E"),
      P("lowest-common-ancestor-of-a-binary-search-tree", "Lowest Common Ancestor of a BST", "M"),
    ]),
  D("Trees ③ (BFS/BST)", "Trees ③ (BFS/BST)", null, null,
    [
      P("binary-tree-level-order-traversal", "Binary Tree Level Order Traversal", "M"),
      P("binary-tree-right-side-view", "Binary Tree Right Side View", "M"),
      P("count-good-nodes-in-binary-tree", "Count Good Nodes in Binary Tree", "M"),
      P("validate-binary-search-tree", "Validate Binary Search Tree", "M"),
    ]),
  D("Trees ④", "Trees ④", null, null,
    [
      P("kth-smallest-element-in-a-bst", "Kth Smallest Element in a BST", "M"),
      P("construct-binary-tree-from-preorder-and-inorder-traversal", "Construct Tree from Preorder & Inorder", "M"),
    ]),
  D("Trees ⑤ (Hard) + C++ start", "Trees ⑤ (Hard) + C++ 시작",
    "Start the C++ track for Nvidia.", "엔비디아 대비 C++ 병행 시작.",
    [
      P("binary-tree-maximum-path-sum", "Binary Tree Maximum Path Sum", "H"),
      P("serialize-and-deserialize-binary-tree", "Serialize and Deserialize Binary Tree", "H"),
      T("cpp16", "Set up C++ + vector/string basics", "C++ 환경 세팅 + vector/string 기초", L.cpp),
    ]),
  D("Tries", "Tries", null, null,
    [
      P("implement-trie-prefix-tree", "Implement Trie (Prefix Tree)", "M"),
      P("design-add-and-search-words-data-structure", "Design Add and Search Words", "M"),
      P("word-search-ii", "Word Search II", "H"),
    ]),
  D("Review ③ + Heap ①", "복습 ③ + Heap ①", null, null,
    [
      T("rv18", "Re-solve HARD-marked Tree problems", "Trees \"어려웠음\" 재풀이"),
      P("kth-largest-element-in-a-stream", "Kth Largest Element in a Stream", "E"),
      P("last-stone-weight", "Last Stone Weight", "E"),
    ]),
  D("Heap / Priority Queue ②", "Heap / Priority Queue ②", null, null,
    [
      P("k-closest-points-to-origin", "K Closest Points to Origin", "M"),
      P("kth-largest-element-in-an-array", "Kth Largest Element in an Array", "M"),
      P("task-scheduler", "Task Scheduler", "M"),
      P("design-twitter", "Design Twitter", "M"),
    ]),
  D("Heap ③ + Backtracking ①", "Heap ③ + Backtracking ①", null, null,
    [
      P("find-median-from-data-stream", "Find Median from Data Stream", "H"),
      P("subsets", "Subsets", "M"),
      P("combination-sum", "Combination Sum", "M"),
      T("cpp20", "Re-write 2 solved Easy problems in C++", "이미 푼 Easy 2문제를 C++로 재작성"),
      T("impl-heap", "Implement a heap yourself — build-heap / heapify / heap sort", "힙 직접 구현 — build-heap / heapify / 힙 정렬"),
    ]),
  D("Backtracking ②", "Backtracking ②", "Choose → recurse → un-choose.", "선택 → 재귀 → 해제.",
    [
      P("combination-sum-ii", "Combination Sum II", "M"),
      P("permutations", "Permutations", "M"),
      P("subsets-ii", "Subsets II", "M"),
      P("word-search", "Word Search", "M"),
    ]),
  D("Backtracking ③", "Backtracking ③", null, null,
    [
      P("palindrome-partitioning", "Palindrome Partitioning", "M"),
      P("letter-combinations-of-a-phone-number", "Letter Combinations of a Phone Number", "M"),
      P("n-queens", "N-Queens", "H"),
    ]),
  D("Review ④ + Graphs ①", "복습 ④ + Graphs ①", null, null,
    [
      T("rv23", "Re-solve HARD-marked Backtracking problems", "Backtracking \"어려웠음\" 재풀이"),
      P("number-of-islands", "Number of Islands", "M"),
      P("max-area-of-island", "Max Area of Island", "M"),
      T("impl-graph", "Graph representations (adj list/matrix) + write BFS/DFS templates", "그래프 표현(인접리스트·행렬) + BFS/DFS 템플릿 직접 작성"),
    ]),
  D("Graphs ② (BFS/DFS)", "Graphs ② (BFS/DFS)", null, null,
    [
      P("clone-graph", "Clone Graph", "M"),
      NC("islands-and-treasure", "Islands and Treasure (Walls and Gates)", "M"),
      P("rotting-oranges", "Rotting Oranges", "M"),
      P("pacific-atlantic-water-flow", "Pacific Atlantic Water Flow", "M"),
    ]),
  D("Graphs ③ (Topological sort) + OS start", "Graphs ③ (위상정렬) + OS 시작", null, null,
    [
      P("surrounded-regions", "Surrounded Regions", "M"),
      P("course-schedule", "Course Schedule", "M"),
      P("course-schedule-ii", "Course Schedule II", "M"),
      T("os25", "Pointers, memory, bit ops — concept notes", "포인터·메모리·비트 개념 정리", L.os),
    ]),
  D("Graphs ④", "Graphs ④", null, null,
    [
      NC("valid-tree", "Graph Valid Tree", "M"),
      NC("count-connected-components", "Number of Connected Components", "M"),
      P("redundant-connection", "Redundant Connection", "M"),
      P("word-ladder", "Word Ladder", "H"),
    ]),
  D("Advanced Graphs ①", "Advanced Graphs ①", "Dijkstra · MST.", "다익스트라·MST.",
    [
      P("reconstruct-itinerary", "Reconstruct Itinerary", "H"),
      P("min-cost-to-connect-all-points", "Min Cost to Connect All Points", "M"),
      P("network-delay-time", "Network Delay Time", "M"),
    ]),
  D("Advanced Graphs ② + C++", "Advanced Graphs ② + C++", null, null,
    [
      P("swim-in-rising-water", "Swim in Rising Water", "H"),
      NC("foreign-dictionary", "Alien Dictionary", "H"),
      P("cheapest-flights-within-k-stops", "Cheapest Flights Within K Stops", "M"),
      T("cpp28", "Re-write 1 Medium in C++", "Medium 1문제를 C++로 재작성"),
    ]),
  D("Review ⑤ + 1-D DP ①", "복습 ⑤ + 1-D DP ①", "Practice writing the recurrence.", "점화식 세우기.",
    [
      T("rv29", "Re-solve HARD-marked Graph problems", "Graphs \"어려웠음\" 재풀이"),
      P("climbing-stairs", "Climbing Stairs", "E"),
      P("min-cost-climbing-stairs", "Min Cost Climbing Stairs", "E"),
      P("house-robber", "House Robber", "M"),
    ]),
  D("1-D DP ②", "1-D DP ②", null, null,
    [
      P("house-robber-ii", "House Robber II", "M"),
      P("longest-palindromic-substring", "Longest Palindromic Substring", "M"),
      P("palindromic-substrings", "Palindromic Substrings", "M"),
      P("decode-ways", "Decode Ways", "M"),
    ]),
  D("1-D DP ③", "1-D DP ③", "Hardcore: five problems.", "하드코어 5문제.",
    [
      P("coin-change", "Coin Change", "M"),
      P("maximum-product-subarray", "Maximum Product Subarray", "M"),
      P("word-break", "Word Break", "M"),
      P("longest-increasing-subsequence", "Longest Increasing Subsequence", "M"),
      P("partition-equal-subset-sum", "Partition Equal Subset Sum", "M"),
    ]),
  D("2-D DP ①", "2-D DP ①", null, null,
    [
      P("unique-paths", "Unique Paths", "M"),
      P("longest-common-subsequence", "Longest Common Subsequence", "M"),
      P("best-time-to-buy-and-sell-stock-with-cooldown", "Best Time to Buy/Sell with Cooldown", "M"),
      P("coin-change-ii", "Coin Change II", "M"),
    ]),
  D("2-D DP ②", "2-D DP ②", null, null,
    [
      P("target-sum", "Target Sum", "M"),
      P("interleaving-string", "Interleaving String", "M"),
      P("longest-increasing-path-in-a-matrix", "Longest Increasing Path in a Matrix", "H"),
      P("distinct-subsequences", "Distinct Subsequences", "H"),
    ]),
  D("2-D DP ③ (Hard)", "2-D DP ③ (Hard)", null, null,
    [
      P("edit-distance", "Edit Distance", "M"),
      P("burst-balloons", "Burst Balloons", "H"),
      P("regular-expression-matching", "Regular Expression Matching", "H"),
    ]),
  D("Review ⑥ + Greedy ①", "복습 ⑥ + Greedy ①", null, null,
    [
      T("rv35", "Re-solve HARD-marked DP problems (repetition IS the answer for DP)", "DP \"어려웠음\" 재풀이 (DP는 반복이 답)"),
      P("maximum-subarray", "Maximum Subarray", "M"),
      P("jump-game", "Jump Game", "M"),
      P("jump-game-ii", "Jump Game II", "M"),
    ]),
  D("Greedy ②", "Greedy ②", "Five problems.", "5문제.",
    [
      P("gas-station", "Gas Station", "M"),
      P("hand-of-straights", "Hand of Straights", "M"),
      P("merge-triplets-to-form-target-triplet", "Merge Triplets to Form Target", "M"),
      P("partition-labels", "Partition Labels", "M"),
      P("valid-parenthesis-string", "Valid Parenthesis String", "M"),
    ]),
  D("Intervals (all)", "Intervals (전 문제)", "Six problems — short and fast.", "6문제 — 짧고 빠르게.",
    [
      P("insert-interval", "Insert Interval", "M"),
      P("merge-intervals", "Merge Intervals", "M"),
      P("non-overlapping-intervals", "Non-overlapping Intervals", "M"),
      NC("meeting-schedule", "Meeting Rooms", "E"),
      NC("meeting-schedule-ii", "Meeting Rooms II", "M"),
      P("minimum-interval-to-include-each-query", "Minimum Interval to Include Each Query", "H"),
    ]),
  D("Math & Geometry ① + ⏱ timed mode starts", "Math & Geometry ① + ⏱타임어택 시작",
    "From today: timer per problem + think out loud.", "오늘부터 문제당 타이머 + 말하며 풀기.",
    [
      P("rotate-image", "Rotate Image", "M"),
      P("spiral-matrix", "Spiral Matrix", "M"),
      P("set-matrix-zeroes", "Set Matrix Zeroes", "M"),
      P("happy-number", "Happy Number", "E"),
      P("plus-one", "Plus One", "E"),
      T("math-basics", "Number basics — GCD (Euclid), Sieve of Eratosthenes, fast exponentiation", "수 기초 — GCD(유클리드 호제법)·에라토스테네스의 체·빠른 거듭제곱"),
    ]),
  D("Math & Geometry ② + Bit ①", "Math & Geometry ② + Bit ①", null, null,
    [
      P("powx-n", "Pow(x, n)", "M"),
      P("multiply-strings", "Multiply Strings", "M"),
      P("detect-squares", "Detect Squares", "M"),
      P("single-number", "Single Number", "E"),
    ]),
  D("Bit Manipulation → NeetCode 150 complete 🎉", "Bit Manipulation → NeetCode 150 완주 🎉",
    "Six problems to finish all 150.", "6문제로 150 마무리.",
    [
      P("number-of-1-bits", "Number of 1 Bits", "E"),
      P("counting-bits", "Counting Bits", "E"),
      P("reverse-bits", "Reverse Bits", "E"),
      P("missing-number", "Missing Number", "E"),
      P("sum-of-two-integers", "Sum of Two Integers", "M"),
      P("reverse-integer", "Reverse Integer", "M"),
    ]),

  // ═══ Phase 3 · Company-specific (Day 44–53) ═══
  D("Nvidia C++/OS deep-dive", "엔비디아 C++/OS 집중", "C++ and low-level, concentrated.", "C++와 저수준을 몰아서.",
    [
      T("cpp41", "Re-write 3 solved Mediums in C++", "이미 푼 Medium 3문제를 C++로 재작성", L.cpp),
      T("os41", "Sync deep-dive — mutex, semaphore, scheduling, race conditions", "동기화 심화 — 뮤텍스·세마포어·스케줄링·race condition", L.os),
    ]),
  D("Amazon ①", "아마존 ①", "Coding alone is not enough — LPs matter.", "코딩만으론 부족 — LP 병행.",
    [
      T("amz42a", "3 Amazon-tagged Mediums on LeetCode (timed)", "LeetCode Amazon 태그 Medium 3문제 (타이머)", L.amz),
      T("amz42b", "Read all 16 Leadership Principles", "16 Leadership Principles 정독", L.lp),
    ]),
  D("Amazon ②", "아마존 ②", null, null,
    [
      T("amz43a", "Write 8 STAR stories (Ownership, Customer Obsession, Deliver Results, ...)", "STAR 스토리 8개 작성 (LP별: Ownership·Customer Obsession·Deliver Results 등)"),
      T("amz43b", "Understand the Work Simulation format (email triage + LP judgment)", "Work Simulation 형식 이해 (이메일 트리아지 + LP 판단)"),
    ]),
  D("Meta", "메타", "Output format & edge cases decide it.", "출력 형식·엣지케이스가 관건.",
    [
      T("meta44a", "3 Meta-tagged Mediums (strict output format, timed)", "LeetCode Meta(facebook) 태그 Medium 3문제 (출력 형식 엄격, 타이머)", L.meta),
      T("meta44b", "Build an output-format / edge-case checklist", "출력 형식·엣지케이스 체크리스트 만들기"),
    ]),
  D("Google", "구글", "Explain brute force → optimization out loud.", "브루트포스 → 최적화를 말로.",
    [
      T("ggl45a", "2-3 Google-tagged Mediums, narrating the optimization path", "LeetCode Google 태그 Medium 2~3문제, 최적화 과정 소리 내어 설명", L.ggl),
      T("ggl45b", "Solve 1 Medium in a blank doc with NO code execution", "코드 실행 없이 빈 문서에 Medium 1문제 풀기"),
    ]),
  D("Nvidia low-level", "엔비디아 저수준", null, null,
    [
      T("nv46a", "3 bit/pointer problems in C++ (re-write Reverse Bits & Sum of Two Integers + 1 new)", "비트/포인터 문제 3개를 C++로 (Reverse Bits·Sum of Two Integers 재작성 + 새 1개)"),
      T("nv46b", "OS check — synchronization & memory", "OS 개념 점검 (동기화·메모리)", L.os),
    ]),
  D("JP Morgan", "JP모건", "Moderate difficulty; time pressure is the boss.", "난이도 무난, 시간 압박이 관건.",
    [
      T("jpm47a", "Get used to the HackerRank interface", "HackerRank 인터페이스 적응", L.hr),
      T("jpm47b", "2 string/greedy problems, timed", "문자열/그리디 2문제 타이머"),
      T("jpm47c", "30 min aptitude drills (logic·math)", "적성 문항(논리·수학) 30분"),
    ]),
  D("⏱ Full OA simulation ①", "⏱ 풀 OA 시뮬레이션 ①", null, null,
    [
      T("sim48a", "Real conditions: 2 problems / 90 min (random tagged Medium/Hard)", "실전처럼 2문제 90분 (태그에서 랜덤 Medium/Hard)"),
      T("sim48b", "Write a wrong-answer log afterwards", "끝나고 오답노트 작성"),
    ]),
  D("⏱ Simulation ② + mock interview", "⏱ 시뮬 ② + 목인터뷰", null, null,
    [
      T("sim49a", "Google-style: 1 problem / 45 min, talking (Pramp / friend)", "Google식 1문제 45분 말하며 풀기 (Pramp/친구)"),
      T("sim49b", "Clear EVERYTHING left in the review queue", "복습 큐에 남은 문제 전부 클리어"),
    ]),
  D("Wrap-up", "마무리", "No new problems. Protect your condition.", "새 문제 금지, 컨디션 관리.",
    [
      T("fin50a", "Skim only your frequent-mistake patterns (no new problems)", "자주 틀린 유형만 훑기 (새 문제 X)"),
      T("fin50b", "Check your setup (webcam·network·IDE)", "환경 점검 (웹캠·네트워크·IDE)"),
      T("fin50c", "Sleep well 💤", "충분한 수면 💤"),
    ]),
];

// day numbers + phases (auto)
(function assign() {
  let n = 0;
  DAYS.forEach((d) => {
    d.n = d.pre ? 0 : ++n;
    d.ph = d.pre ? 0 : d.n <= 3 ? 1 : d.n <= 43 ? 2 : 3;
  });
})();

export const LAST_DAY = Math.max(...DAYS.filter((d) => !d.pre).map((d) => d.n));
export const PRE_DONE = DAYS.filter((d) => d.pre).flatMap((d) => d.items.map((i) => i.id));

export const PHASES = {
  0: { n: "✓", t: { en: "Already done · Arrays & Hashing", ko: "이미 완료 · Arrays & Hashing" }, span: { en: "your finished section", ko: "네가 푼 섹션" } },
  1: { n: { en: "Phase 1", ko: "1단계" }, t: { en: "DSA Fundamentals", ko: "기초 DSA 다지기" }, span: { en: "Day 1–3", ko: "Day 1–3" } },
  2: { n: { en: "Phase 2", ko: "2단계" }, t: { en: "NeetCode 150 core (all problems)", ko: "NeetCode 150 코어 (전 문제)" }, span: { en: "Day 4–43", ko: "Day 4–43" } },
  3: { n: { en: "Phase 3", ko: "3단계" }, t: { en: "Company-specific · Nvidia", ko: "회사별 실전 · 엔비디아" }, span: { en: "Day 44–53", ko: "Day 44–53" } },
};

export const ITEMS = {};
export const ITEM_DAY = {};
DAYS.forEach((d) => d.items.forEach((i) => { ITEMS[i.id] = i; ITEM_DAY[i.id] = d.n; }));
export const TOTAL = Object.keys(ITEMS).length;

export const itemTitle = (item, lang) =>
  typeof item.t === "string" ? item.t : item.t[lang] || item.t.en;

// Notes text used by the AI summarize route (server-side).
export function buildNotes(state, lang) {
  const items = state?.items || {};
  const dayNotes = state?.dayNotes || {};
  const parts = [];
  DAYS.forEach((d) => {
    const dn = (dayNotes[d.n] || "").trim();
    const pn = [];
    d.items.forEach((i) => {
      if (i.type !== "p") return;
      const s = items[i.id];
      if (!s) return;
      const nt = (s.note || "").trim();
      const hard = s.diff === "h";
      if (nt || hard) pn.push(`  - ${itemTitle(i, lang)}${hard ? " [HARD]" : ""}${nt ? ": " + nt : ""}`);
    });
    if (dn || pn.length) {
      const label = lang === "ko" ? "메모" : "Note";
      parts.push(`■ Day ${d.n} — ${d.topic[lang] || d.topic.en}${dn ? `\n  ${label}: ${dn}` : ""}${pn.length ? "\n" + pn.join("\n") : ""}`);
    }
  });
  return parts.join("\n\n");
}
