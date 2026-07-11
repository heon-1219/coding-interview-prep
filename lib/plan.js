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
  msft: "https://leetcode.com/company/microsoft/",
  aapl: "https://leetcode.com/company/apple/",
  nvda: "https://leetcode.com/company/nvidia/",
  dbx: "https://leetcode.com/company/databricks/",
  hr: "https://www.hackerrank.com/",
};

const D = (topicEn, topicKo, hintEn, hintKo, items, extra) => ({
  topic: { en: topicEn, ko: topicKo },
  hint: hintEn ? { en: hintEn, ko: hintKo } : null,
  items,
  ...(extra || {}),
});

export const DAYS = [
  // ═══ Already done (nothing pre-checked — users tick what they've done) ═══
  D("Arrays & Hashing", "Arrays & Hashing",
    "Check off the problems you've already solved — nothing is pre-checked.",
    "이미 푼 문제만 체크하세요 — 미리 체크된 건 없어요.",
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

  // ═══ Phase 2 · NeetCode 250 core ═══
  D("Two Pointers ①", "Two Pointers ①", "Sorted arrays, pointers from both ends.", "정렬된 배열·양끝 포인터 감각.",
    [
      P("valid-palindrome", "Valid Palindrome", "E"),
      P("valid-palindrome-ii", "Valid Palindrome II", "E"),
      P("reverse-string", "Reverse String", "E"),
      P("merge-sorted-array", "Merge Sorted Array", "E"),
      P("two-sum-ii-input-array-is-sorted", "Two Sum II", "M"),
      T("x-tp", "Two-pointer templates — opposite ends vs. fast & slow; when each applies", "투 포인터 템플릿 — 양끝 포인터 vs 빠른·느린 포인터, 각각 언제 쓰는지"),
    ]),
  D("Two Pointers ②", "Two Pointers ②", null, null,
    [
      P("move-zeroes", "Move Zeroes", "E"),
      P("remove-duplicates-from-sorted-array", "Remove Duplicates from Sorted Array", "E"),
      P("sort-array-by-parity", "Sort Array By Parity", "E"),
      P("3sum", "3Sum", "M"),
      P("3sum-closest", "3Sum Closest", "M"),
      P("container-with-most-water", "Container With Most Water", "M"),
    ]),
  D("Two Pointers ③ + Sliding Window ①", "Two Pointers ③ + Sliding Window ①", "The expand/shrink window template.", "창을 넓히고 좁히는 템플릿.",
    [
      P("trapping-rain-water", "Trapping Rain Water", "H"),
      P("best-time-to-buy-and-sell-stock", "Best Time to Buy and Sell Stock", "E"),
      P("contains-duplicate-ii", "Contains Duplicate II", "E"),
      P("maximum-average-subarray-i", "Maximum Average Subarray I", "E"),
      P("minimum-size-subarray-sum", "Minimum Size Subarray Sum", "M"),
      T("x-sw", "Sliding-window template — expand right, shrink left when the window is invalid", "슬라이딩 윈도우 템플릿 — 오른쪽 확장, 조건 위반 시 왼쪽 축소"),
    ]),
  D("Sliding Window ②", "Sliding Window ②", null, null,
    [
      P("longest-substring-without-repeating-characters", "Longest Substring Without Repeating", "M"),
      P("longest-repeating-character-replacement", "Longest Repeating Char Replacement", "M"),
      P("max-consecutive-ones-iii", "Max Consecutive Ones III", "M"),
      P("fruit-into-baskets", "Fruit Into Baskets", "M"),
      P("permutation-in-string", "Permutation in String", "M"),
    ]),
  D("Sliding Window ③ (Hard) + Arrays extras", "Sliding Window ③ (Hard) + 배열 추가", "Two hards up front, full focus.", "하드 2개 먼저, 집중.",
    [
      P("minimum-window-substring", "Minimum Window Substring", "H"),
      P("sliding-window-maximum", "Sliding Window Maximum", "H"),
      P("concatenation-of-array", "Concatenation of Array", "E"),
      P("majority-element", "Majority Element", "E"),
      P("is-subsequence", "Is Subsequence", "E"),
    ]),
  D("Review ① + Arrays & Hashing extras", "복습 ① + Arrays & Hashing 추가", "Review day = re-solve first.", "복습일 = 재풀이 우선.",
    [
      T("x-rv1", "Re-solve 2 problems you marked HARD (Two Pointers ~ Sliding Window)", "Two Pointers~Sliding Window 중 \"어려웠음\" 2개 재풀이"),
      P("remove-element", "Remove Element", "E"),
      P("length-of-last-word", "Length of Last Word", "E"),
      P("longest-common-prefix", "Longest Common Prefix", "E"),
      P("pascals-triangle", "Pascal's Triangle", "E"),
      P("unique-email-addresses", "Unique Email Addresses", "E"),
    ]),
  D("Hashing / Design + Stack ①", "해싱 / 설계 + Stack ①", null, null,
    [
      P("range-sum-query-immutable", "Range Sum Query - Immutable", "E"),
      P("design-hashset", "Design HashSet", "E"),
      P("design-hashmap", "Design HashMap", "E"),
      P("subarray-sum-equals-k", "Subarray Sum Equals K", "M"),
      P("valid-parentheses", "Valid Parentheses", "E"),
      T("x-stack", "Implement stack, queue, deque yourself (array / linked-list based)", "스택·큐·덱 직접 구현 (배열/연결리스트 기반)"),
    ]),
  D("Stack ②", "Stack ②", null, null,
    [
      P("min-stack", "Min Stack", "M"),
      P("baseball-game", "Baseball Game", "E"),
      P("implement-stack-using-queues", "Implement Stack using Queues", "E"),
      P("implement-queue-using-stacks", "Implement Queue using Stacks", "E"),
      P("evaluate-reverse-polish-notation", "Evaluate Reverse Polish Notation", "M"),
      P("min-add-to-make-parentheses-valid", "Minimum Add to Make Parentheses Valid", "M"),
    ]),
  D("Stack ③ (Monotonic)", "Stack ③ (모노토닉)", "Monotonic stack.", "모노토닉 스택.",
    [
      P("generate-parentheses", "Generate Parentheses", "M"),
      P("daily-temperatures", "Daily Temperatures", "M"),
      P("next-greater-element-i", "Next Greater Element I", "E"),
      P("online-stock-span", "Online Stock Span", "M"),
      P("car-fleet", "Car Fleet", "M"),
    ]),
  D("Stack ④", "Stack ④", null, null,
    [
      P("asteroid-collision", "Asteroid Collision", "M"),
      P("decode-string", "Decode String", "M"),
      P("simplify-path", "Simplify Path", "M"),
      P("next-greater-element-ii", "Next Greater Element II", "M"),
      P("largest-rectangle-in-histogram", "Largest Rectangle in Histogram", "H"),
      T("x-mono", "Monotonic stack — write the template and list when to use increasing vs. decreasing", "모노토닉 스택 — 템플릿 작성 + 증가/감소 스택 사용 시점 정리"),
    ]),
  D("Review ② + Binary Search ①", "복습 ② + Binary Search ①", null, null,
    [
      T("x-rv2", "Re-solve HARD-marked Stack problems", "Stack \"어려웠음\" 재풀이"),
      P("binary-search", "Binary Search", "E"),
      P("search-insert-position", "Search Insert Position", "E"),
      P("guess-number-higher-or-lower", "Guess Number Higher or Lower", "E"),
      P("sqrtx", "Sqrt(x)", "E"),
      P("first-bad-version", "First Bad Version", "E"),
    ]),
  D("Binary Search ②", "Binary Search ②", null, null,
    [
      P("search-a-2d-matrix", "Search a 2D Matrix", "M"),
      P("search-a-2d-matrix-ii", "Search a 2D Matrix II", "M"),
      P("find-peak-element", "Find Peak Element", "M"),
      P("single-element-in-a-sorted-array", "Single Element in a Sorted Array", "M"),
      P("koko-eating-bananas", "Koko Eating Bananas", "M"),
    ]),
  D("Binary Search ③ (on the answer)", "Binary Search ③ (정답 이분탐색)", "\"Binary search on the answer\" is the key pattern.", "\"정답 위에서 이분탐색\"이 핵심.",
    [
      P("find-minimum-in-rotated-sorted-array", "Find Minimum in Rotated Sorted Array", "M"),
      P("search-in-rotated-sorted-array", "Search in Rotated Sorted Array", "M"),
      P("capacity-to-ship-packages-within-d-days", "Capacity To Ship Packages Within D Days", "M"),
      P("split-array-largest-sum", "Split Array Largest Sum", "H"),
      P("time-based-key-value-store", "Time Based Key-Value Store", "M"),
      T("x-bs", "Binary search on the answer — how to spot the monotonic predicate", "정답 위에서 이분탐색 — 단조 조건(predicate) 찾는 법"),
    ]),
  D("Binary Search ④ (Hard) + Linked List ①", "Binary Search ④ (Hard) + Linked List ①", null, null,
    [
      P("median-of-two-sorted-arrays", "Median of Two Sorted Arrays", "H"),
      P("reverse-linked-list", "Reverse Linked List", "E"),
      P("middle-of-the-linked-list", "Middle of the Linked List", "E"),
      P("merge-two-sorted-lists", "Merge Two Sorted Lists", "E"),
      P("remove-duplicates-from-sorted-list", "Remove Duplicates from Sorted List", "E"),
      T("x-ll", "Implement a linked list yourself — node, insert, delete, reverse (no library)", "연결리스트 직접 구현 — 노드·삽입·삭제·역순 (라이브러리 없이)"),
    ]),
  D("Linked List ②", "Linked List ②", null, null,
    [
      P("palindrome-linked-list", "Palindrome Linked List", "E"),
      P("swap-nodes-in-pairs", "Swap Nodes in Pairs", "M"),
      P("odd-even-linked-list", "Odd Even Linked List", "M"),
      P("reorder-list", "Reorder List", "M"),
      P("remove-nth-node-from-end-of-list", "Remove Nth Node From End", "M"),
    ]),
  D("Review ③ + Linked List ③", "복습 ③ + Linked List ③", null, null,
    [
      T("x-rv3", "Re-solve HARD-marked Binary Search & Linked List problems", "Binary Search·Linked List \"어려웠음\" 재풀이"),
      P("linked-list-cycle", "Linked List Cycle", "E"),
      P("linked-list-cycle-ii", "Linked List Cycle II", "M"),
      P("find-the-duplicate-number", "Find the Duplicate Number", "M"),
      P("add-two-numbers", "Add Two Numbers", "M"),
      P("copy-list-with-random-pointer", "Copy List with Random Pointer", "M"),
    ]),
  D("Linked List ④ (Design + Hard)", "Linked List ④ (설계 + Hard)", "Two hards, full focus.", "하드 2개 집중.",
    [
      P("design-linked-list", "Design Linked List", "M"),
      P("design-browser-history", "Design Browser History", "M"),
      P("lru-cache", "LRU Cache", "M"),
      P("merge-k-sorted-lists", "Merge K Sorted Lists", "H"),
      P("reverse-nodes-in-k-group", "Reverse Nodes in K-Group", "H"),
    ]),
  D("Trees ① (Traversals)", "Trees ① (순회)", null, null,
    [
      T("x-tree", "Implement all 3 traversals (pre/in/post) recursive + iterative + BFS", "트리 순회 3종(전위·중위·후위) 재귀+반복 + BFS 직접 구현"),
      P("binary-tree-inorder-traversal", "Binary Tree Inorder Traversal", "E"),
      P("binary-tree-preorder-traversal", "Binary Tree Preorder Traversal", "E"),
      P("binary-tree-postorder-traversal", "Binary Tree Postorder Traversal", "E"),
      P("invert-binary-tree", "Invert Binary Tree", "E"),
      P("maximum-depth-of-binary-tree", "Maximum Depth of Binary Tree", "E"),
    ]),
  D("Trees ②", "Trees ②", null, null,
    [
      P("diameter-of-binary-tree", "Diameter of Binary Tree", "E"),
      P("balanced-binary-tree", "Balanced Binary Tree", "E"),
      P("same-tree", "Same Tree", "E"),
      P("symmetric-tree", "Symmetric Tree", "E"),
      P("subtree-of-another-tree", "Subtree of Another Tree", "E"),
      P("minimum-depth-of-binary-tree", "Minimum Depth of Binary Tree", "E"),
    ]),
  D("Trees ③ (Paths + BST)", "Trees ③ (경로 + BST)", null, null,
    [
      P("path-sum", "Path Sum", "E"),
      P("count-complete-tree-nodes", "Count Complete Tree Nodes", "E"),
      P("convert-sorted-array-to-binary-search-tree", "Convert Sorted Array to BST", "E"),
      P("lowest-common-ancestor-of-a-binary-search-tree", "Lowest Common Ancestor of a BST", "M"),
      P("lowest-common-ancestor-of-a-binary-tree", "Lowest Common Ancestor of a Binary Tree", "M"),
    ]),
  D("Review ④ + Trees ④ (BFS)", "복습 ④ + Trees ④ (BFS)", null, null,
    [
      T("x-rv4", "Re-solve HARD-marked Tree & Linked List problems", "Trees·Linked List \"어려웠음\" 재풀이"),
      P("binary-tree-level-order-traversal", "Binary Tree Level Order Traversal", "M"),
      P("binary-tree-zigzag-level-order-traversal", "Binary Tree Zigzag Level Order Traversal", "M"),
      P("average-of-levels-in-binary-tree", "Average of Levels in Binary Tree", "E"),
      P("binary-tree-right-side-view", "Binary Tree Right Side View", "M"),
      P("count-good-nodes-in-binary-tree", "Count Good Nodes in Binary Tree", "M"),
    ]),
  D("Trees ⑤ (BST ops)", "Trees ⑤ (BST 연산)", null, null,
    [
      P("validate-binary-search-tree", "Validate Binary Search Tree", "M"),
      P("kth-smallest-element-in-a-bst", "Kth Smallest Element in a BST", "M"),
      P("insert-into-a-binary-search-tree", "Insert into a Binary Search Tree", "M"),
      P("delete-node-in-a-bst", "Delete Node in a BST", "M"),
      P("construct-binary-tree-from-preorder-and-inorder-traversal", "Construct Tree from Preorder & Inorder", "M"),
    ]),
  D("Trees ⑥ (Hard) + C++ start", "Trees ⑥ (Hard) + C++ 시작", "Start the C++ track for Nvidia.", "엔비디아 대비 C++ 병행 시작.",
    [
      P("path-sum-ii", "Path Sum II", "M"),
      P("flatten-binary-tree-to-linked-list", "Flatten Binary Tree to Linked List", "M"),
      P("binary-tree-maximum-path-sum", "Binary Tree Maximum Path Sum", "H"),
      P("serialize-and-deserialize-binary-tree", "Serialize and Deserialize Binary Tree", "H"),
      T("x-cpp1", "Set up C++ + vector/string basics", "C++ 환경 세팅 + vector/string 기초", L.cpp),
    ]),
  D("Tries + Heap ①", "Tries + Heap ①", null, null,
    [
      P("implement-trie-prefix-tree", "Implement Trie (Prefix Tree)", "M"),
      P("design-add-and-search-words-data-structure", "Design Add and Search Words", "M"),
      P("word-search-ii", "Word Search II", "H"),
      P("kth-largest-element-in-a-stream", "Kth Largest Element in a Stream", "E"),
      P("last-stone-weight", "Last Stone Weight", "E"),
      T("x-heap", "Implement a binary heap yourself — sift-up / sift-down / build-heap / heap sort", "이진 힙 직접 구현 — sift-up/sift-down/build-heap/힙 정렬"),
    ]),
  D("Review ⑤ + Heap ②", "복습 ⑤ + Heap ②", null, null,
    [
      T("x-rv5", "Re-solve HARD-marked Tree & Trie problems", "Trees·Tries \"어려웠음\" 재풀이"),
      P("k-closest-points-to-origin", "K Closest Points to Origin", "M"),
      P("kth-largest-element-in-an-array", "Kth Largest Element in an Array", "M"),
      P("task-scheduler", "Task Scheduler", "M"),
      P("reorganize-string", "Reorganize String", "M"),
      P("car-pooling", "Car Pooling", "M"),
    ]),
  D("Heap ③ + Backtracking ①", "Heap ③ + Backtracking ①", null, null,
    [
      P("longest-happy-string", "Longest Happy String", "M"),
      P("design-twitter", "Design Twitter", "M"),
      P("find-median-from-data-stream", "Find Median from Data Stream", "H"),
      P("subsets", "Subsets", "M"),
      P("combinations", "Combinations", "M"),
      T("x-cpp2", "Re-write 2 solved Easy problems in C++", "이미 푼 Easy 2문제를 C++로 재작성"),
    ]),
  D("Backtracking ②", "Backtracking ②", "Choose → recurse → un-choose.", "선택 → 재귀 → 해제.",
    [
      P("combination-sum", "Combination Sum", "M"),
      P("combination-sum-ii", "Combination Sum II", "M"),
      P("permutations", "Permutations", "M"),
      P("permutations-ii", "Permutations II", "M"),
      P("subsets-ii", "Subsets II", "M"),
      T("x-bt", "Backtracking template — choose → recurse → un-choose; prune early", "백트래킹 템플릿 — 선택 → 재귀 → 해제, 가지치기"),
    ]),
  D("Backtracking ③", "Backtracking ③", null, null,
    [
      P("word-search", "Word Search", "M"),
      P("palindrome-partitioning", "Palindrome Partitioning", "M"),
      P("letter-combinations-of-a-phone-number", "Letter Combinations of a Phone Number", "M"),
      P("n-queens", "N-Queens", "H"),
      P("n-queens-ii", "N-Queens II", "H"),
    ]),
  D("Review ⑥ + Graphs ①", "복습 ⑥ + Graphs ①", null, null,
    [
      T("x-rv6", "Re-solve HARD-marked Backtracking problems", "Backtracking \"어려웠음\" 재풀이"),
      P("number-of-islands", "Number of Islands", "M"),
      P("max-area-of-island", "Max Area of Island", "M"),
      P("flood-fill", "Flood Fill", "E"),
      P("island-perimeter", "Island Perimeter", "E"),
      T("x-graph", "Graph representations (adj list/matrix) + write BFS/DFS templates", "그래프 표현(인접리스트·행렬) + BFS/DFS 템플릿 직접 작성"),
    ]),
  D("Graphs ② (BFS/DFS on grids)", "Graphs ② (격자 BFS/DFS)", null, null,
    [
      P("clone-graph", "Clone Graph", "M"),
      NC("islands-and-treasure", "Islands and Treasure (Walls and Gates)", "M"),
      P("rotting-oranges", "Rotting Oranges", "M"),
      P("01-matrix", "01 Matrix", "M"),
      P("shortest-path-in-binary-matrix", "Shortest Path in Binary Matrix", "M"),
    ]),
  D("Graphs ③", "Graphs ③", null, null,
    [
      P("pacific-atlantic-water-flow", "Pacific Atlantic Water Flow", "M"),
      P("surrounded-regions", "Surrounded Regions", "M"),
      P("number-of-provinces", "Number of Provinces", "M"),
      P("is-graph-bipartite", "Is Graph Bipartite?", "M"),
      P("open-the-lock", "Open the Lock", "M"),
      T("x-os1", "Pointers, memory, bit ops — concept notes", "포인터·메모리·비트 개념 정리", L.os),
    ]),
  D("Graphs ④ (Topo sort + Union-Find)", "Graphs ④ (위상정렬 + 유니온-파인드)", null, null,
    [
      P("course-schedule", "Course Schedule", "M"),
      P("course-schedule-ii", "Course Schedule II", "M"),
      NC("valid-tree", "Graph Valid Tree", "M"),
      NC("count-connected-components", "Number of Connected Components", "M"),
      P("redundant-connection", "Redundant Connection", "M"),
      T("x-topo", "Topological sort (Kahn's BFS + DFS) and Union-Find template", "위상정렬(Kahn BFS + DFS)과 유니온-파인드 템플릿"),
    ]),
  D("Graphs ⑤ (Hard) + Advanced ①", "Graphs ⑤ (Hard) + Advanced ①", "Dijkstra · MST.", "다익스트라·MST.",
    [
      P("word-ladder", "Word Ladder", "H"),
      P("reconstruct-itinerary", "Reconstruct Itinerary", "H"),
      P("min-cost-to-connect-all-points", "Min Cost to Connect All Points", "M"),
      P("network-delay-time", "Network Delay Time", "M"),
      P("path-with-minimum-effort", "Path With Minimum Effort", "M"),
      T("x-dij", "Dijkstra + Prim / Kruskal MST templates — say the complexity out loud", "다익스트라 + Prim/Kruskal MST 템플릿 — 복잡도 소리 내어 말하기"),
    ]),
  D("Review ⑦ + Advanced Graphs ②", "복습 ⑦ + Advanced Graphs ②", null, null,
    [
      T("x-rv7", "Re-solve HARD-marked Graph problems", "Graphs \"어려웠음\" 재풀이"),
      P("swim-in-rising-water", "Swim in Rising Water", "H"),
      NC("foreign-dictionary", "Alien Dictionary", "H"),
      P("cheapest-flights-within-k-stops", "Cheapest Flights Within K Stops", "M"),
      P("find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance", "Find the City With the Smallest Number of Neighbors", "M"),
      T("x-cpp3", "Re-write 1 Medium in C++", "Medium 1문제를 C++로 재작성"),
    ]),
  D("1-D DP ①", "1-D DP ①", "Practice writing the recurrence.", "점화식 세우기 연습.",
    [
      T("x-dp1", "Derive a DP recurrence out loud — memoization vs. tabulation", "DP 점화식을 소리 내어 세우기 — 메모이제이션 vs 타뷸레이션"),
      P("climbing-stairs", "Climbing Stairs", "E"),
      P("min-cost-climbing-stairs", "Min Cost Climbing Stairs", "E"),
      P("n-th-tribonacci-number", "N-th Tribonacci Number", "E"),
      P("house-robber", "House Robber", "M"),
      P("house-robber-ii", "House Robber II", "M"),
    ]),
  D("1-D DP ②", "1-D DP ②", null, null,
    [
      P("longest-palindromic-substring", "Longest Palindromic Substring", "M"),
      P("palindromic-substrings", "Palindromic Substrings", "M"),
      P("decode-ways", "Decode Ways", "M"),
      P("word-break", "Word Break", "M"),
      P("perfect-squares", "Perfect Squares", "M"),
    ]),
  D("1-D DP ③", "1-D DP ③", "Hardcore: five problems.", "하드코어 5문제.",
    [
      P("coin-change", "Coin Change", "M"),
      P("combination-sum-iv", "Combination Sum IV", "M"),
      P("delete-and-earn", "Delete and Earn", "M"),
      P("maximum-product-subarray", "Maximum Product Subarray", "M"),
      P("longest-increasing-subsequence", "Longest Increasing Subsequence", "M"),
    ]),
  D("Review ⑧ + 2-D DP ①", "복습 ⑧ + 2-D DP ①", null, null,
    [
      T("x-rv8", "Re-solve HARD-marked DP problems (repetition IS the answer for DP)", "DP \"어려웠음\" 재풀이 (DP는 반복이 답)"),
      P("partition-equal-subset-sum", "Partition Equal Subset Sum", "M"),
      P("unique-paths", "Unique Paths", "M"),
      P("unique-paths-ii", "Unique Paths II", "M"),
      P("minimum-path-sum", "Minimum Path Sum", "M"),
      P("longest-common-subsequence", "Longest Common Subsequence", "M"),
    ]),
  D("2-D DP ②", "2-D DP ②", null, null,
    [
      P("best-time-to-buy-and-sell-stock-with-cooldown", "Best Time to Buy/Sell with Cooldown", "M"),
      P("coin-change-ii", "Coin Change II", "M"),
      P("target-sum", "Target Sum", "M"),
      P("maximal-square", "Maximal Square", "M"),
      P("interleaving-string", "Interleaving String", "M"),
      T("x-dp2", "2-D DP — define the state and transition on a grid / two-string problem", "2차원 DP — 격자·두 문자열 문제에서 상태·전이 정의"),
    ]),
  D("2-D DP ③ (Hard)", "2-D DP ③ (Hard)", "Five hards — protect your stamina.", "하드 5문제 — 체력 관리.",
    [
      P("edit-distance", "Edit Distance", "M"),
      P("longest-increasing-path-in-a-matrix", "Longest Increasing Path in a Matrix", "H"),
      P("distinct-subsequences", "Distinct Subsequences", "H"),
      P("burst-balloons", "Burst Balloons", "H"),
      P("regular-expression-matching", "Regular Expression Matching", "H"),
    ]),
  D("Review ⑨ + Greedy ①", "복습 ⑨ + Greedy ①", null, null,
    [
      T("x-rv9", "Re-solve HARD-marked DP & Greedy problems", "DP·Greedy \"어려웠음\" 재풀이"),
      P("maximum-subarray", "Maximum Subarray", "M"),
      P("best-time-to-buy-and-sell-stock-ii", "Best Time to Buy and Sell Stock II", "M"),
      P("lemonade-change", "Lemonade Change", "E"),
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
  D("Intervals ①", "Intervals ①", "Sort first, then sweep.", "먼저 정렬, 그다음 스윕.",
    [
      P("insert-interval", "Insert Interval", "M"),
      P("merge-intervals", "Merge Intervals", "M"),
      P("non-overlapping-intervals", "Non-overlapping Intervals", "M"),
      NC("meeting-schedule", "Meeting Rooms", "E"),
      NC("meeting-schedule-ii", "Meeting Rooms II", "M"),
      P("minimum-number-of-arrows-to-burst-balloons", "Minimum Number of Arrows to Burst Balloons", "M"),
    ]),
  D("Intervals ② + Math & Geometry ① + ⏱ timed mode", "Intervals ② + Math & Geometry ① + ⏱타임어택 시작",
    "From today: timer per problem + think out loud.", "오늘부터 문제당 타이머 + 말하며 풀기.",
    [
      P("my-calendar-i", "My Calendar I", "M"),
      P("minimum-interval-to-include-each-query", "Minimum Interval to Include Each Query", "H"),
      P("rotate-image", "Rotate Image", "M"),
      P("spiral-matrix", "Spiral Matrix", "M"),
      P("set-matrix-zeroes", "Set Matrix Zeroes", "M"),
      T("x-math", "Number-theory basics — GCD (Euclid), Sieve of Eratosthenes, fast exponentiation", "수론 기초 — GCD(유클리드 호제법)·에라토스테네스의 체·빠른 거듭제곱"),
    ]),
  D("Review ⑩ + Math & Geometry ②", "복습 ⑩ + Math & Geometry ②", null, null,
    [
      T("x-rv10", "Re-solve HARD-marked Interval & Graph problems", "Intervals·Graphs \"어려웠음\" 재풀이"),
      P("happy-number", "Happy Number", "E"),
      P("plus-one", "Plus One", "E"),
      P("palindrome-number", "Palindrome Number", "E"),
      P("roman-to-integer", "Roman to Integer", "E"),
      P("integer-to-roman", "Integer to Roman", "M"),
    ]),
  D("Math & Geometry ③ + Bit ①", "Math & Geometry ③ + Bit ①", null, null,
    [
      P("count-primes", "Count Primes", "M"),
      P("powx-n", "Pow(x, n)", "M"),
      P("multiply-strings", "Multiply Strings", "M"),
      P("detect-squares", "Detect Squares", "M"),
      P("single-number", "Single Number", "E"),
      T("x-bit", "Bit tricks — XOR, masks, n&(n-1), set/clear/toggle a bit", "비트 트릭 — XOR·마스크·n&(n-1)·비트 set/clear/toggle"),
    ]),
  D("Bit Manipulation → NeetCode 250 complete 🎉", "Bit Manipulation → NeetCode 250 완주 🎉",
    "Eight problems to finish all 250.", "8문제로 250 마무리.",
    [
      P("number-of-1-bits", "Number of 1 Bits", "E"),
      P("counting-bits", "Counting Bits", "E"),
      P("reverse-bits", "Reverse Bits", "E"),
      P("missing-number", "Missing Number", "E"),
      P("add-binary", "Add Binary", "E"),
      P("single-number-ii", "Single Number II", "M"),
      P("sum-of-two-integers", "Sum of Two Integers", "M"),
      P("reverse-integer", "Reverse Integer", "M"),
    ]),
  D("Capstone review 🏁", "총정리 복습 🏁", "No new problems — consolidate.", "새 문제 금지 — 다지기.",
    [
      T("x-rvF", "Capstone — re-solve every problem still marked HARD across all 18 topics", "총정리 — 18개 토픽 전체에서 아직 \"어려웠음\"인 문제 전부 재풀이"),
      T("x-recap", "Re-derive the core templates from memory — BFS/DFS, binary-search-on-answer, backtracking, DP, monotonic stack", "핵심 템플릿 암기 재현 — BFS/DFS·정답이분탐색·백트래킹·DP·모노토닉 스택"),
    ]),

  // ═══ Company tracks (optional · pick the ones you're applying to) ═══
  // Each company is its own section, ≤5 days, numbered 1–5 (not on the calendar).

  // ── Google ──
  D("Coding — narrate brute → optimal", "코딩 — 브루트포스 → 최적화 설명",
    "Explain your optimization path out loud.", "최적화 과정을 소리 내어 설명.",
    [
      T("ggl1a", "3 Google-tagged Mediums, narrating the optimization path", "Google 태그 Medium 3문제, 최적화 과정 설명하며", L.ggl),
      T("ggl1b", "Solve 1 Medium in a blank doc with NO code execution", "코드 실행 없이 빈 문서에 Medium 1문제 풀기"),
    ], { company: "google" }),
  D("Harder problems + clarifying", "고난도 + 요구사항 확인",
    "Whiteboard style; state assumptions first.", "화이트보드식; 가정을 먼저 말하기.",
    [
      T("ggl2a", "2 Google-tagged Hards — talk through complexity trade-offs", "Google 태그 Hard 2문제 — 복잡도 트레이드오프 설명", L.ggl),
      T("ggl2b", "Practice asking clarifying questions before coding", "코딩 전 요구사항 확인 질문 연습"),
    ], { company: "google" }),
  D("Googleyness + behavioral", "Googleyness + 인성",
    null, null,
    [
      T("ggl3a", "Prepare stories: impact, working through ambiguity, collaboration", "스토리 준비: 임팩트·모호함 극복·협업"),
    ], { company: "google" }),

  // ── Meta ──
  D("Coding — strict output format", "코딩 — 엄격한 출력 형식",
    "Meta grades output format & edge cases hard.", "메타는 출력 형식·엣지케이스를 깐깐히 채점.",
    [
      T("meta1a", "3 Meta-tagged Mediums, strict output format, timed", "Meta(facebook) 태그 Medium 3문제, 출력 형식 엄격, 타이머", L.meta),
      T("meta1b", "Build an output-format / edge-case checklist", "출력 형식·엣지케이스 체크리스트 만들기"),
    ], { company: "meta" }),
  D("Meta favorites", "메타 단골 문제",
    "Re-solve their frequent tagged problems with the checklist.", "체크리스트로 단골 문제 재풀이.",
    [
      T("meta2a", "3 high-frequency Meta-tagged problems (timed), applying the checklist", "빈출 Meta 태그 3문제 (타이머), 체크리스트 적용", L.meta),
    ], { company: "meta" }),
  D("Behavioral + product sense", "인성 + 프로덕트 센스",
    null, null,
    [
      T("meta3a", "Stories: a project you drove, \"disagree & commit\", handling conflict", "스토리: 주도한 프로젝트·\"disagree & commit\"·갈등 해결"),
    ], { company: "meta" }),

  // ── Amazon ──
  D("Coding (timed)", "코딩 (타이머)",
    "Coding alone isn't enough — LPs are half the bar.", "코딩만으론 부족 — LP가 절반.",
    [
      T("amz1a", "3 Amazon-tagged Mediums, timed", "Amazon 태그 Medium 3문제, 타이머", L.amz),
      T("amz1b", "Review Amazon's common patterns (arrays, graphs, heaps)", "Amazon 빈출 패턴 정리 (배열·그래프·힙)", L.amz),
    ], { company: "amazon" }),
  D("Leadership Principles + STAR", "리더십 원칙 + STAR",
    "Write real stories, one per principle.", "원칙별로 실제 스토리 작성.",
    [
      T("amz2a", "Read all 16 Leadership Principles", "16 Leadership Principles 정독", L.lp),
      T("amz2b", "Write 8 STAR stories (Ownership, Customer Obsession, Deliver Results, …)", "STAR 스토리 8개 작성 (Ownership·Customer Obsession·Deliver Results 등)"),
    ], { company: "amazon" }),
  D("Work Simulation + rehearse", "Work Simulation + 리허설",
    null, null,
    [
      T("amz3a", "Understand the Work Simulation format (email triage + LP judgment)", "Work Simulation 형식 이해 (이메일 트리아지 + LP 판단)"),
      T("amz3b", "Rehearse 4 STAR stories out loud + 2 more Mediums", "STAR 스토리 4개 소리 내어 리허설 + Medium 2문제 추가"),
    ], { company: "amazon" }),

  // ── Microsoft ──
  D("Core coding", "핵심 코딩",
    "Well-rounded arrays / strings / trees.", "골고루 — 배열·문자열·트리.",
    [
      T("msft1a", "3 Microsoft-tagged Mediums (arrays, strings, trees)", "Microsoft 태그 Medium 3문제 (배열·문자열·트리)", L.msft),
    ], { company: "microsoft" }),
  D("Design & OOP", "설계 & OOP",
    "They like clean class design.", "깔끔한 클래스 설계를 선호.",
    [
      T("msft2a", "Reverse a linked list & build an LRU cache from memory", "연결리스트 뒤집기 & LRU 캐시 직접 구현"),
      T("msft2b", "Outline classes for one OOP design (parking lot / elevator)", "OOP 설계 1개 클래스 설계 (주차장/엘리베이터)"),
    ], { company: "microsoft" }),
  D("Behavioral", "인성",
    null, null,
    [
      T("msft3a", "\"Why Microsoft\" + growth-mindset stories", "\"왜 마이크로소프트\" + 성장 마인드셋 스토리"),
    ], { company: "microsoft" }),

  // ── Apple ──
  D("Coding", "코딩",
    "Strings & arrays, careful edge cases.", "문자열·배열, 엣지케이스 꼼꼼히.",
    [
      T("aapl1a", "3 Apple-tagged Mediums (strings, arrays)", "Apple 태그 Medium 3문제 (문자열·배열)", L.aapl),
    ], { company: "apple" }),
  D("Depth — clean code & memory", "깊이 — 클린 코드 & 메모리",
    "They probe details and trade-offs.", "디테일·트레이드오프를 파고듦.",
    [
      T("aapl2a", "2 problems focused on clean code, edge cases, memory use", "클린 코드·엣지케이스·메모리 중심 2문제"),
      T("aapl2b", "Talk through design trade-offs out loud", "설계 트레이드오프를 말로 설명"),
    ], { company: "apple" }),
  D("Behavioral", "인성",
    null, null,
    [
      T("aapl3a", "Passion / product-craft stories", "열정 / 제품 완성도 스토리"),
    ], { company: "apple" }),

  // ── Nvidia ──
  D("C++ warm-up", "C++ 워밍업",
    "C++ and low-level, concentrated.", "C++와 저수준을 몰아서.",
    [
      T("nvda1a", "Set up C++ and re-write 3 solved Mediums in C++", "C++ 환경 세팅 + 이미 푼 Medium 3문제 C++로 재작성", L.cpp),
      T("nvda1b", "vector / string / STL basics", "vector·string·STL 기초", L.cpp),
    ], { company: "nvidia" }),
  D("Bit & pointers in C++", "비트 & 포인터 (C++)",
    null, null,
    [
      T("nvda2a", "3 bit/pointer problems in C++ (Reverse Bits, Sum of Two Integers + 1 new)", "비트/포인터 3문제 C++로 (Reverse Bits·Sum of Two Integers + 새 1개)"),
      T("nvda2b", "Memory & pointer notes", "메모리·포인터 개념 정리", L.os),
    ], { company: "nvidia" }),
  D("OS deep-dive", "OS 심화",
    "Sync + memory are the interview core.", "동기화·메모리가 면접 핵심.",
    [
      T("nvda3a", "Sync — mutex, semaphore, scheduling, race conditions", "동기화 — 뮤텍스·세마포어·스케줄링·race condition", L.os),
      T("nvda3b", "Explain virtual memory & paging out loud", "가상 메모리·페이징을 말로 설명"),
    ], { company: "nvidia" }),

  // ── Databricks ──
  D("Harder coding", "고난도 코딩",
    "Databricks OAs run harder than average.", "Databricks OA는 평균보다 어려움.",
    [
      T("dbx1a", "3 Databricks-tagged problems — arrays / strings / intervals, big inputs", "Databricks 태그 3문제 — 배열·문자열·구간, 큰 입력", L.dbx),
      T("dbx1b", "For each, justify optimal time/space for large N", "각 문제 큰 N 기준 최적 시간/공간 근거 대기"),
    ], { company: "databricks" }),
  D("Data / scale flavor", "데이터 / 스케일 감각",
    null, null,
    [
      T("dbx2a", "2 problems on hashing / heaps / streaming", "해싱·힙·스트리밍 2문제"),
      T("dbx2b", "Reason about time & space for very large data", "대용량 데이터 시간·공간 추론"),
    ], { company: "databricks" }),
  D("Fundamentals + behavioral", "기초 + 인성",
    null, null,
    [
      T("dbx3a", "Light SQL / Spark familiarity (optional) + behavioral stories", "가벼운 SQL/Spark 익히기 (선택) + 인성 스토리"),
    ], { company: "databricks" }),

  // ── JP Morgan ──
  D("HackerRank + coding", "HackerRank + 코딩",
    "Moderate difficulty; time pressure is the boss.", "난이도 무난, 시간 압박이 관건.",
    [
      T("jpm1a", "Get used to the HackerRank interface", "HackerRank 인터페이스 적응", L.hr),
      T("jpm1b", "2 string / greedy problems, timed", "문자열/그리디 2문제, 타이머"),
    ], { company: "jpmorgan" }),
  D("Aptitude", "적성",
    null, null,
    [
      T("jpm2a", "30-min aptitude drills (logic, math)", "적성 문항 30분 (논리·수학)"),
      T("jpm2b", "2 more timed problems", "타이머 문제 2개 추가"),
    ], { company: "jpmorgan" }),
  D("Behavioral + finance", "인성 + 금융",
    null, null,
    [
      T("jpm3a", "\"Why finance / JPM\" stories", "\"왜 금융 / JPM\" 스토리"),
    ], { company: "jpmorgan" }),

  // ── Interview simulation (for everyone) ──
  D("⏱ Full OA simulation", "⏱ 풀 OA 시뮬레이션",
    "Real conditions, no comforts.", "실전 조건, 편의 없이.",
    [
      T("sim1a", "2 problems / 90 min (random tagged Medium/Hard)", "2문제 90분 (태그에서 랜덤 Medium/Hard)"),
      T("sim1b", "Write a wrong-answer log afterwards", "끝나고 오답노트 작성"),
    ], { company: "sim" }),
  D("⏱ Mock interview", "⏱ 목 인터뷰",
    null, null,
    [
      T("sim2a", "Google-style: 1 problem / 45 min, talking (Pramp / friend)", "Google식 1문제 45분 말하며 (Pramp/친구)"),
      T("sim2b", "Clear EVERYTHING left in the review queue", "복습 큐에 남은 문제 전부 클리어"),
    ], { company: "sim" }),
  D("Wrap-up", "마무리",
    "No new problems. Protect your condition.", "새 문제 금지, 컨디션 관리.",
    [
      T("sim3a", "Skim only your frequent-mistake patterns (no new problems)", "자주 틀린 유형만 훑기 (새 문제 X)"),
      T("sim3b", "Check your setup (webcam, network, IDE)", "환경 점검 (웹캠·네트워크·IDE)"),
      T("sim3c", "Sleep well 💤", "충분한 수면 💤"),
    ], { company: "sim" }),
];

// section / day-number assignment (auto)
// Core (Phase 1–2) days sit on the calendar and share one running Day number.
// Company / sim days are optional: numbered 1–N locally within their own section.
(function assign() {
  let dated = 0;
  const local = {};
  DAYS.forEach((d) => {
    if (d.pre) { d.dated = false; d.sec = "done"; d.n = 0; d.key = "pre"; return; }
    if (d.company) {
      d.dated = false;
      d.sec = d.company;
      local[d.company] = (local[d.company] || 0) + 1;
      d.n = local[d.company];
      d.key = d.company + "-" + d.n;
    } else {
      d.dated = true;
      d.n = ++dated;
      d.sec = d.n <= 3 ? "p1" : "p2";
      d.key = String(d.n);
    }
  });
})();

// last calendar-scheduled day (company / sim days are off-calendar)
export const LAST_DAY = Math.max(...DAYS.filter((d) => d.dated).map((d) => d.n));

export const SECTIONS = {
  done:       { n: "✓", t: { en: "Already done", ko: "이미 완료" }, span: { en: "check what you've already solved", ko: "이미 푼 것만 체크" } },
  p1:         { n: { en: "Phase 1", ko: "1단계" }, t: { en: "DSA Fundamentals", ko: "기초 DSA 다지기" }, span: { en: "Day 1–3", ko: "Day 1–3" } },
  p2:         { n: { en: "Phase 2", ko: "2단계" }, t: { en: "NeetCode 250 core (all problems)", ko: "NeetCode 250 코어 (전 문제)" }, span: { en: "Day 4–51", ko: "Day 4–51" } },
  google:     { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Google", ko: "구글" }, span: { en: "narrate · clarify", ko: "설명 · 요구사항 확인" } },
  meta:       { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Meta", ko: "메타" }, span: { en: "output format · edge cases", ko: "출력 형식 · 엣지케이스" } },
  amazon:     { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Amazon", ko: "아마존" }, span: { en: "coding + Leadership Principles", ko: "코딩 + 리더십 원칙" } },
  microsoft:  { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Microsoft", ko: "마이크로소프트" }, span: { en: "well-rounded + OOP", ko: "골고루 + OOP" } },
  apple:      { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Apple", ko: "애플" }, span: { en: "detail + low-level", ko: "디테일 + 저수준" } },
  nvidia:     { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Nvidia", ko: "엔비디아" }, span: { en: "C++ · OS · low-level", ko: "C++ · OS · 저수준" } },
  databricks: { company: true, n: { en: "Company", ko: "회사" }, t: { en: "Databricks", ko: "데이터브릭스" }, span: { en: "harder OA · scale", ko: "고난도 OA · 스케일" } },
  jpmorgan:   { company: true, n: { en: "Company", ko: "회사" }, t: { en: "JP Morgan", ko: "JP모건" }, span: { en: "HackerRank · aptitude", ko: "HackerRank · 적성" } },
  sim:        { company: true, n: { en: "Final", ko: "마무리" }, t: { en: "Interview Simulation", ko: "실전 시뮬레이션" }, span: { en: "for everyone", ko: "모두 공통" } },
};

export const ITEMS = {};
export const ITEM_DAY = {};   // display number: calendar day for core, 1–N local for company
export const ITEM_SEC = {};   // section key
export const ITEM_DATED = {}; // on the calendar?
export const ITEM_CORE = {};  // counts toward the headline progress (non-company)
DAYS.forEach((d) => d.items.forEach((i) => {
  ITEMS[i.id] = i; ITEM_DAY[i.id] = d.n; ITEM_SEC[i.id] = d.sec;
  ITEM_DATED[i.id] = !!d.dated; ITEM_CORE[i.id] = !d.company;
}));
// Headline progress counts the core curriculum only; company tracks are opt-in extras.
export const TOTAL = Object.keys(ITEMS).filter((id) => ITEM_CORE[id]).length;

export const sectionTitle = (sec, lang) => {
  const s = SECTIONS[sec];
  if (!s) return "";
  return typeof s.t === "string" ? s.t : s.t[lang] || s.t.en;
};

export const itemTitle = (item, lang) =>
  typeof item.t === "string" ? item.t : item.t[lang] || item.t.en;

// Notes text used by the AI summarize route (server-side).
export function buildNotes(state, lang) {
  const items = state?.items || {};
  const dayNotes = state?.dayNotes || {};
  const parts = [];
  DAYS.forEach((d) => {
    const dn = (dayNotes[d.key] || "").trim();
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
