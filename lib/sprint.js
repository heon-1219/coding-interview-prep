// ─── Google OA + Interview Sprint (optional track) ───────────────────────
// Ported from the "Google OA + Interview Sprint" page: 60 problems over four
// days, from a 123-problem Google-tagged bank + recent candidate reports
// (numbers, titles and links cross-checked on Oct 10, 2026).
// Problem ids are LeetCode slugs — the same ids the NeetCode plan uses — so a
// problem solved in either track is solved in both (notes + solutions too).

// Q = LeetCode problem: number, slug, title, level, Google-tag heat as
//     "30 days / 3 months / 6 months" flags (e.g. "011"), Premium
const Q = (num, slug, t, lv, heat, pr) =>
  ({ id: slug, type: "p", num, t, lv, heat, pr: !!pr, url: `https://leetcode.com/problems/${slug}/` });
const txt = (en, ko) => ({ en, ko });
const T = (key, en, ko, items) => ({ key, name: txt(en, ko), items });

// Topic bank. Meeting Rooms II is Premium on LeetCode, so it reuses the
// NeetCode plan's free NeetCode page and id.
export const GS_TOPICS = [
  T("gs-hash", "Arrays & Hashing", "Arrays & Hashing", [
    Q(1, "two-sum", "Two Sum", "E", "111"),
    Q(49, "group-anagrams", "Group Anagrams", "M", "111"),
    Q(128, "longest-consecutive-sequence", "Longest Consecutive Sequence", "M", "111"),
    Q(238, "product-of-array-except-self", "Product of Array Except Self", "M", "111"),
    Q(560, "subarray-sum-equals-k", "Subarray Sum Equals K", "M", "111"),
    Q(525, "contiguous-array", "Contiguous Array", "M", "011"),
    Q(41, "first-missing-positive", "First Missing Positive", "H", "111"),
    Q(54, "spiral-matrix", "Spiral Matrix", "M", "111"),
    Q(2364, "count-number-of-bad-pairs", "Count Number of Bad Pairs", "M", "001"),
  ]),
  T("gs-twoptr", "Two Pointers", "Two Pointers", [
    Q(15, "3sum", "3Sum", "M", "111"),
    Q(11, "container-with-most-water", "Container With Most Water", "M", "111"),
    Q(42, "trapping-rain-water", "Trapping Rain Water", "H", "111"),
    Q(31, "next-permutation", "Next Permutation", "M", "111"),
    Q(75, "sort-colors", "Sort Colors", "M", "111"),
    Q(680, "valid-palindrome-ii", "Valid Palindrome II", "E", "111"),
  ]),
  T("gs-window", "Sliding Window", "Sliding Window", [
    Q(3, "longest-substring-without-repeating-characters", "Longest Substring Without Repeating Characters", "M", "111"),
    Q(424, "longest-repeating-character-replacement", "Longest Repeating Character Replacement", "M", "111"),
    Q(904, "fruit-into-baskets", "Fruit Into Baskets", "M", "111"),
    Q(340, "longest-substring-with-at-most-k-distinct-characters", "Longest Substring with At Most K Distinct Characters", "M", "000", 1),
    Q(1004, "max-consecutive-ones-iii", "Max Consecutive Ones III", "M", "111"),
    Q(1423, "maximum-points-you-can-obtain-from-cards", "Maximum Points You Can Obtain from Cards", "M", "011"),
    Q(76, "minimum-window-substring", "Minimum Window Substring", "H", "111"),
    Q(239, "sliding-window-maximum", "Sliding Window Maximum", "H", "111"),
  ]),
  T("gs-bsearch", "Binary Search", "Binary Search", [
    Q(33, "search-in-rotated-sorted-array", "Search in Rotated Sorted Array", "M", "111"),
    Q(875, "koko-eating-bananas", "Koko Eating Bananas", "M", "111"),
    Q(162, "find-peak-element", "Find Peak Element", "M", "111"),
    Q(34, "find-first-and-last-position-of-element-in-sorted-array", "Find First and Last Position of Element in Sorted Array", "M", "111"),
    Q(410, "split-array-largest-sum", "Split Array Largest Sum", "H", "111"),
    Q(4, "median-of-two-sorted-arrays", "Median of Two Sorted Arrays", "H", "111"),
  ]),
  T("gs-stack", "Stack & Monotonic Stack", "Stack & 모노토닉 스택", [
    Q(20, "valid-parentheses", "Valid Parentheses", "E", "111"),
    Q(394, "decode-string", "Decode String", "M", "111"),
    Q(739, "daily-temperatures", "Daily Temperatures", "M", "111"),
    Q(853, "car-fleet", "Car Fleet", "M", "011"),
    Q(84, "largest-rectangle-in-histogram", "Largest Rectangle in Histogram", "H", "111"),
    Q(1944, "number-of-visible-people-in-a-queue", "Number of Visible People in a Queue", "H", "111"),
    Q(224, "basic-calculator", "Basic Calculator", "H", "011"),
  ]),
  T("gs-intervals", "Intervals, Sorting & Greedy", "Intervals · 정렬 · Greedy", [
    Q(56, "merge-intervals", "Merge Intervals", "M", "111"),
    Q(57, "insert-interval", "Insert Interval", "M", "111"),
    Q(435, "non-overlapping-intervals", "Non-overlapping Intervals", "M", "111"),
    { ...Q(253, "meeting-rooms-ii", "Meeting Rooms II", "M", "111"), id: "nc-meeting-schedule-ii", url: "https://neetcode.io/problems/meeting-schedule-ii", nc: true },
    Q(1094, "car-pooling", "Car Pooling", "M", "111"),
    Q(759, "employee-free-time", "Employee Free Time", "H", "001", 1),
    Q(55, "jump-game", "Jump Game", "M", "111"),
    Q(846, "hand-of-straights", "Hand of Straights", "M", "001"),
  ]),
  T("gs-heap", "Heap / Top-K", "Heap / Top-K", [
    Q(347, "top-k-frequent-elements", "Top K Frequent Elements", "M", "111"),
    Q(215, "kth-largest-element-in-an-array", "Kth Largest Element in an Array", "M", "111"),
    Q(692, "top-k-frequent-words", "Top K Frequent Words", "M", "001"),
    Q(621, "task-scheduler", "Task Scheduler", "M", "011"),
    Q(23, "merge-k-sorted-lists", "Merge k Sorted Lists", "H", "011"),
    Q(295, "find-median-from-data-stream", "Find Median from Data Stream", "H", "111"),
    Q(2402, "meeting-rooms-iii", "Meeting Rooms III", "H", "011"),
  ]),
  T("gs-linked", "Linked List", "Linked List", [
    Q(206, "reverse-linked-list", "Reverse Linked List", "E", "111"),
    Q(21, "merge-two-sorted-lists", "Merge Two Sorted Lists", "E", "111"),
    Q(2, "add-two-numbers", "Add Two Numbers", "M", "111"),
    Q(19, "remove-nth-node-from-end-of-list", "Remove Nth Node From End of List", "M", "111"),
    Q(138, "copy-list-with-random-pointer", "Copy List with Random Pointer", "M", "111"),
    Q(25, "reverse-nodes-in-k-group", "Reverse Nodes in k-Group", "H", "011"),
  ]),
  T("gs-tree", "Trees", "Trees", [
    Q(102, "binary-tree-level-order-traversal", "Binary Tree Level Order Traversal", "M", "011"),
    Q(543, "diameter-of-binary-tree", "Diameter of Binary Tree", "E", "111"),
    Q(98, "validate-binary-search-tree", "Validate Binary Search Tree", "M", "011"),
    Q(236, "lowest-common-ancestor-of-a-binary-tree", "Lowest Common Ancestor of a Binary Tree", "M", "111"),
    Q(863, "all-nodes-distance-k-in-binary-tree", "All Nodes Distance K in Binary Tree", "M", "111"),
    Q(2096, "step-by-step-directions-from-a-binary-tree-node-to-another", "Step-By-Step Directions From a Binary Tree Node to Another", "M", "111"),
    Q(1110, "delete-nodes-and-return-forest", "Delete Nodes And Return Forest", "M", "111"),
    Q(222, "count-complete-tree-nodes", "Count Complete Tree Nodes", "M", "111"),
    Q(124, "binary-tree-maximum-path-sum", "Binary Tree Maximum Path Sum", "H", "011"),
    Q(297, "serialize-and-deserialize-binary-tree", "Serialize and Deserialize Binary Tree", "H", "011"),
  ]),
  T("gs-graph", "Graphs: BFS/DFS & Grids", "Graphs: BFS/DFS · 격자", [
    Q(200, "number-of-islands", "Number of Islands", "M", "111"),
    Q(994, "rotting-oranges", "Rotting Oranges", "M", "111"),
    Q(1091, "shortest-path-in-binary-matrix", "Shortest Path in Binary Matrix", "M", "001"),
    Q(417, "pacific-atlantic-water-flow", "Pacific Atlantic Water Flow", "M", "111"),
    Q(133, "clone-graph", "Clone Graph", "M", "011"),
    Q(2101, "detonate-the-maximum-bombs", "Detonate the Maximum Bombs", "M", "000"),
    Q(127, "word-ladder", "Word Ladder", "H", "111"),
    Q(827, "making-a-large-island", "Making A Large Island", "H", "011"),
    Q(1293, "shortest-path-in-a-grid-with-obstacles-elimination", "Shortest Path in a Grid with Obstacles Elimination", "H", "001"),
  ]),
  T("gs-graph2", "Graphs: Topo Sort, Union-Find, Shortest Path", "Graphs: 위상정렬 · 유니온-파인드 · 최단 경로", [
    Q(207, "course-schedule", "Course Schedule", "M", "111"),
    Q(210, "course-schedule-ii", "Course Schedule II", "M", "011"),
    Q(2115, "find-all-possible-recipes-from-given-supplies", "Find All Possible Recipes from Given Supplies", "M", "000"),
    Q(547, "number-of-provinces", "Number of Provinces", "M", "011"),
    Q(721, "accounts-merge", "Accounts Merge", "M", "001"),
    Q(399, "evaluate-division", "Evaluate Division", "M", "011"),
    Q(743, "network-delay-time", "Network Delay Time", "M", "111"),
    Q(1631, "path-with-minimum-effort", "Path With Minimum Effort", "M", "111"),
    Q(787, "cheapest-flights-within-k-stops", "Cheapest Flights Within K Stops", "M", "011"),
    Q(2812, "find-the-safest-path-in-a-grid", "Find the Safest Path in a Grid", "M", "111"),
  ]),
  T("gs-backtrack", "Backtracking", "Backtracking", [
    Q(78, "subsets", "Subsets", "M", "011"),
    Q(46, "permutations", "Permutations", "M", "111"),
    Q(39, "combination-sum", "Combination Sum", "M", "111"),
    Q(17, "letter-combinations-of-a-phone-number", "Letter Combinations of a Phone Number", "M", "111"),
    Q(22, "generate-parentheses", "Generate Parentheses", "M", "111"),
    Q(79, "word-search", "Word Search", "M", "111"),
    Q(131, "palindrome-partitioning", "Palindrome Partitioning", "M", "111"),
    Q(51, "n-queens", "N-Queens", "H", "111"),
    Q(282, "expression-add-operators", "Expression Add Operators", "H", "001"),
  ]),
  T("gs-dp", "Dynamic Programming", "Dynamic Programming", [
    Q(198, "house-robber", "House Robber", "M", "111"),
    Q(322, "coin-change", "Coin Change", "M", "111"),
    Q(300, "longest-increasing-subsequence", "Longest Increasing Subsequence", "M", "111"),
    Q(139, "word-break", "Word Break", "M", "011"),
    Q(1143, "longest-common-subsequence", "Longest Common Subsequence", "M", "111"),
    Q(72, "edit-distance", "Edit Distance", "M", "111"),
    Q(62, "unique-paths", "Unique Paths", "M", "111"),
    Q(416, "partition-equal-subset-sum", "Partition Equal Subset Sum", "M", "111"),
    Q(5, "longest-palindromic-substring", "Longest Palindromic Substring", "M", "111"),
    Q(354, "russian-doll-envelopes", "Russian Doll Envelopes", "H", "011"),
    Q(329, "longest-increasing-path-in-a-matrix", "Longest Increasing Path in a Matrix", "H", "011"),
    Q(1235, "maximum-profit-in-job-scheduling", "Maximum Profit in Job Scheduling", "H", "001"),
  ]),
  T("gs-design", "Design / OOP (class design)", "설계 / OOP (클래스 설계)", [
    Q(146, "lru-cache", "LRU Cache", "M", "111"),
    Q(380, "insert-delete-getrandom-o1", "Insert Delete GetRandom O(1)", "M", "111"),
    Q(981, "time-based-key-value-store", "Time Based Key-Value Store", "M", "111"),
    Q(1146, "snapshot-array", "Snapshot Array", "M", "001"),
    Q(2034, "stock-price-fluctuation", "Stock Price Fluctuation", "M", "001"),
    Q(933, "number-of-recent-calls", "Number of Recent Calls", "E", "111"),
    Q(359, "logger-rate-limiter", "Logger Rate Limiter", "E", "111", 1),
    Q(2353, "design-a-food-rating-system", "Design a Food Rating System", "M", "000"),
    Q(1825, "finding-mk-average", "Finding MK Average", "H", "000"),
  ]),
  T("gs-trie", "Trie, Strings & Bits", "Trie · 문자열 · 비트", [
    Q(14, "longest-common-prefix", "Longest Common Prefix", "E", "111"),
    Q(208, "implement-trie-prefix-tree", "Implement Trie (Prefix Tree)", "M", "111"),
    Q(1268, "search-suggestions-system", "Search Suggestions System", "M", "000"),
    Q(212, "word-search-ii", "Word Search II", "H", "001"),
    Q(421, "maximum-xor-of-two-numbers-in-an-array", "Maximum XOR of Two Numbers in an Array", "M", "111"),
    Q(68, "text-justification", "Text Justification", "H", "011"),
    Q(8, "string-to-integer-atoi", "String to Integer (atoi)", "M", "111"),
  ]),
];

// Named in candidate reports only (not in the topic bank)
const REPORT_ONLY = [
  Q(325, "maximum-size-subarray-sum-equals-k", "Maximum Size Subarray Sum Equals k", "M", "000", 1),
  Q(490, "the-maze", "The Maze", "M", "000", 1),
];

// Added to the bank by the Interview Sprint's 10-day plan (checked Oct 18, 2026)
const IV_ADDED = [
  Q(141, "linked-list-cycle", "Linked List Cycle", "E", "111"),
  Q(104, "maximum-depth-of-binary-tree", "Maximum Depth of Binary Tree", "E", "111"),
  Q(226, "invert-binary-tree", "Invert Binary Tree", "E", "111"),
  Q(110, "balanced-binary-tree", "Balanced Binary Tree", "E", "011"),
  Q(100, "same-tree", "Same Tree", "E", "011"),
  Q(199, "binary-tree-right-side-view", "Binary Tree Right Side View", "M", "011"),
  Q(230, "kth-smallest-element-in-a-bst", "Kth Smallest Element in a BST", "M", "011"),
  Q(695, "max-area-of-island", "Max Area of Island", "M", "011"),
  Q(684, "redundant-connection", "Redundant Connection", "M", "000"),
  Q(70, "climbing-stairs", "Climbing Stairs", "E", "111"),
  Q(91, "decode-ways", "Decode Ways", "M", "111"),
  Q(136, "single-number", "Single Number", "E", "111"),
  Q(211, "design-add-and-search-words-data-structure", "Design Add and Search Words Data Structure", "M", "000"),
];

export const GS_PROBS = {}; // by LeetCode number
export const GS_ITEMS = {}; // by item id
[...GS_TOPICS.flatMap((tp) => tp.items), ...REPORT_ONLY, ...IV_ADDED].forEach((p) => { GS_PROBS[p.num] = p; GS_ITEMS[p.id] = p; });

const MINI = (ids) => ({
  name: txt("Mini OA", "미니 OA"), mins: 60, ids,
  note: txt("Two unseen problems, one timer, no hints.", "처음 보는 2문제, 타이머 하나, 힌트 없이."),
});

// off = days from the OA date (Day 1 is four days before it)
export const GS_DAYS = [
  { key: "gs-d1", off: -4, label: txt("Day 1", "Day 1"),
    focus: txt("Arrays & Hashing · Two Pointers · Sliding Window", "Arrays & Hashing · Two Pointers · Sliding Window"),
    why: txt("The OA core. Reports for the 2027 cycle describe array, string and hashing work.",
      "OA의 핵심이에요. 2027 시즌 후기들은 배열·문자열·해싱 문제를 말해요."),
    ids: [1, 49, 128, 238, 560, 525, 15, 11, 42, 3, 904, 76], drill: MINI([54, 1423]) },
  { key: "gs-d2", off: -3, label: txt("Day 2", "Day 2"),
    focus: txt("Binary Search · Stack · Intervals · Heap", "Binary Search · Stack · Intervals · Heap"),
    why: txt("Interview staples that show up as follow-ups once the first version works.",
      "첫 풀이가 돌아가고 나면 후속 질문으로 나오는 면접 단골 주제예요."),
    ids: [33, 875, 410, 394, 739, 1944, 56, 57, 1094, 692, 295, 2], drill: MINI([162, 621]) },
  { key: "gs-d3", off: -2, label: txt("Day 3", "Day 3"),
    focus: txt("Trees · Graphs", "Trees · Graphs"),
    why: txt("Candidates moving past the OA report trees, graphs and recursion in the interviews.",
      "OA를 통과한 지원자들은 면접에서 트리·그래프·재귀 문제를 받았다고 해요."),
    ids: [236, 863, 2096, 1110, 124, 200, 994, 1091, 2101, 207, 721, 1631], drill: MINI([98, 399]) },
  { key: "gs-d4", off: -1, label: txt("Day 4", "Day 4"),
    focus: txt("Dynamic Programming · Backtracking · Design / OOP", "Dynamic Programming · Backtracking · 설계 / OOP"),
    why: txt("Ends with a full OA rehearsal at the common two-in-90 setting.",
      "마지막은 가장 흔한 설정인 90분 2문제로 실전 OA 리허설이에요."),
    ids: [322, 300, 139, 1143, 354, 329, 78, 79, 146, 981, 2034, 1146],
    drill: { name: txt("Full OA simulation", "실전 OA 시뮬레이션"), mins: 90, ids: [421, 2364],
      note: txt("Write your own test cases. Save the last 15 minutes for edge cases.",
        "테스트 케이스를 직접 작성하세요. 마지막 15분은 엣지 케이스용으로 남겨두세요.") } },
  { key: "gs-oa", off: 0, label: txt("OA day", "OA 당일"),
    focus: txt("Warm up, take the OA, then rehearse the interview", "워밍업 → OA 응시 → 면접 리허설"),
    why: txt("The interview is the next day, so the evening goes to a mock in a plain doc.",
      "면접이 바로 다음 날이라 저녁에는 빈 문서로 모의 면접을 해요."),
    ids: [20, 14],
    drill: { name: txt("Mock interview, 2 × 45 min in a plain doc", "모의 면접 — 빈 문서에서 45분 × 2"),
      short: txt("Mock interview", "모의 면접"), mins: 90, ids: [416, 2115],
      note: txt("Talk out loud, no running code, then write 3 STAR stories.",
        "소리 내어 설명하고 코드는 실행하지 마세요. 끝나면 STAR 스토리 3개를 쓰세요.") } },
  { key: "gs-iv", off: 1, label: txt("Interview day", "면접 당일"),
    focus: txt("Light warm-up only", "가벼운 워밍업만"),
    why: txt("Re-solve one problem from your miss log in a plain doc, out loud, in 30 minutes.",
      "오답 노트에서 한 문제를 골라 빈 문서에 말하면서 30분 안에 다시 풀어요."),
    ids: [], drill: null },
];

const GD = "Glassdoor", PH = "PracHub", EXP = "Exponent guide", LCD = "LeetCode Discuss";
const GD_FR = "https://www.glassdoor.fr/Entretien/Google-Entretien-E9079-RVW98135076.htm";
const EXP_URL = "https://www.aced.io/guides/google-software-engineer-intern-interview";
const LCD_URL = "https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf";
const OA = txt("OA", "OA"), PHONE = txt("Phone screen", "전화 스크린"), TECH = txt("Technical screen", "기술 스크린");
const INTERN = txt("Intern interview", "인턴 면접"), IVW = txt("Interview", "면접"), Y24 = txt("2024", "2024");
const R = (what, round, when, src, url, ids) => ({ what, round, when, src, url, ids });

// What candidates said they were asked → closest LeetCode practice
export const GS_REPORTED = [
  R(txt("Max XOR of any two values in an array", "배열에서 두 값의 XOR 최댓값"), OA, txt("Jul 2026", "2026년 7월"), GD,
    "https://www.glassdoor.es/Entrevista/Google-Entrevista-E9079-RVW102372322.htm", [421]),
  R(txt("Longest substring with at most K distinct characters", "서로 다른 문자가 최대 K개인 가장 긴 부분 문자열"), OA, null, GD, GD_FR, [340, 904]),
  R(txt("Rate-limiting algorithm for an API", "API 레이트 리미팅 알고리즘"), OA, null, GD, GD_FR, [359, 933]),
  R(txt("Shortest path through a 0/1 maze grid", "0/1 미로 격자의 최단 경로"), PHONE, null, GD, GD_FR, [1091, 490]),
  R(txt("Longest subarray whose sum is zero", "합이 0인 가장 긴 부분 배열"), OA, null, GD,
    "https://www.glassdoor.com.ar/Entrevista/Google-Entrevista-E9079-RVW89948822.htm", [525, 325]),
  R(txt("Count islands in a grid", "격자에서 섬 개수 세기"), txt("Intern phone screen", "인턴 전화 스크린"), null, PH,
    "https://prachub.com/coding-questions/solve-grid-and-counting-problems", [200]),
  R(txt("Count index pairs that meet parity conditions", "패리티 조건을 만족하는 인덱스 쌍 세기"), TECH, null, PH,
    "https://prachub.com/coding-questions/count-special-index-pairs", [2364]),
  R(txt("Logger that returns the top-K messages", "상위 K개 메시지를 돌려주는 로거"), TECH, null, PH,
    "https://prachub.com/coding-questions/design-a-logger-that-returns-top-k-messages", [692, 359]),
  R(txt("Restaurant waitlist with cancellations (class design)", "취소가 되는 식당 대기 명단 (클래스 설계)"), TECH, null, PH,
    "https://prachub.com/coding-questions/design-a-restaurant-waitlist-system", [2353, 2034]),
  R(txt("Russian Doll Envelopes", "Russian Doll Envelopes"), INTERN, txt("Oct 2025", "2025년 10월"), GD,
    "https://www.glassdoor.sg/Interview/Google-Interview-E9079-RVW100881169.htm", [354]),
  R(txt("Median of a data stream, variant over all subarrays", "데이터 스트림의 중앙값 — 모든 부분 배열로 넓힌 변형"), INTERN, txt("Aug 2025", "2025년 8월"), GD,
    "https://www.glassdoor.fr/Entretien/Google-Entretien-E9079-RVW99291454.htm", [295]),
  R(txt("Process a stream of intervals, merging overlaps", "구간 스트림을 처리하며 겹치는 구간 병합"), INTERN, null, EXP, EXP_URL, [57, 56]),
  R(txt("Priority queue keyed by tag, with in-place updates", "태그를 키로 쓰고 제자리 갱신이 되는 우선순위 큐"), INTERN, null, EXP, EXP_URL, [2034, 2353]),
  R(txt("Class that caches stream entries and batch-processes them", "스트림 항목을 캐시해 두었다가 한꺼번에 처리하는 클래스"), INTERN, null, EXP, EXP_URL, [146, 981]),
  R(txt("Variant of Spiral Matrix", "Spiral Matrix 변형"), IVW, null, GD,
    "https://fr.glassdoor.ch/Entretien/Google-Entretien-E9079-RVW104162213.htm", [54]),
  R(txt("Decode String", "Decode String"), txt("Onsite", "온사이트"), Y24, LCD, LCD_URL, [394]),
  R(txt("Expression Add Operators", "Expression Add Operators"), PHONE, Y24, LCD, LCD_URL, [282]),
  R(txt("Partition Equal Subset Sum, modified", "Partition Equal Subset Sum 변형"), IVW, Y24, LCD, LCD_URL, [416]),
  R(txt("Job scheduling", "작업 스케줄링"), txt("Screen", "스크린"), Y24, LCD, LCD_URL, [1235]),
  R(txt("Employee Free Time · Find All Possible Recipes · Safest Path in a Grid · Finding MK Average",
    "Employee Free Time · Find All Possible Recipes · Safest Path in a Grid · Finding MK Average"), IVW, Y24, LCD, LCD_URL, [759, 2115, 2812, 1825]),
];

export const GS_FORMAT = [
  { title: txt("The OA", "OA"), list: [
    txt("Summer 2027 reports from Jul–Aug 2026 describe an easy to easy-medium screen: arrays, strings, hashing.",
      "2026년 7~8월에 올라온 2027 여름 인턴 후기를 보면 OA는 Easy~Easy-Medium 수준의 배열·문자열·해싱 문제예요."),
    txt("Question count and timer vary. Plan for two questions in 90 minutes; reports range from 45 to 90 minutes. Your invitation sets the rules.",
      "문제 수와 제한 시간은 그때그때 달라요. 90분에 2문제를 기준으로 준비하세요. 후기마다 45~90분으로 다르고, 정확한 규칙은 초대 메일에 나와요."),
    txt("Some candidates had to write their own test cases. Test minimal inputs, duplicates and upper-bound sizes either way.",
      "테스트 케이스를 직접 써야 했다는 후기도 있어요. 어느 쪽이든 최소 입력·중복·최대 크기 입력은 꼭 테스트하세요."),
    txt("Use no AI, notes or other tabs unless the invitation allows them.",
      "초대 메일에서 허용하지 않는 한 AI·노트·다른 탭은 쓰지 마세요."),
  ] },
  { title: txt("The interviews", "면접"), list: [
    txt("Usually two back-to-back 45-minute coding rounds.", "보통 45분짜리 코딩 라운드 2개를 연달아 봐요."),
    txt("You type in a shared Google Doc. No autocomplete and no running code.",
      "공유된 Google Doc에 코드를 써요. 자동 완성도, 코드 실행도 없어요."),
    txt("Reports from Sep–Oct 2026: an easy or medium problem that grows through follow-ups, plus a few STAR questions.",
      "2026년 9~10월 후기: Easy나 Medium 한 문제가 후속 질문으로 점점 커지고, STAR 질문이 몇 개 붙어요."),
    txt("Google's candidate guide says using AI to answer interview questions can lead to disqualification.",
      "구글 지원자 가이드에 따르면 면접 질문에 AI로 답하면 실격될 수 있어요."),
  ] },
  { title: txt("The 2026 pilot round", "2026 시범 라운드"), list: [
    txt("Since the second half of 2026, some junior and mid-level US teams replace one coding round with a Gemini-assisted code comprehension round.",
      "2026년 하반기부터 미국의 일부 주니어·미드 레벨 팀은 코딩 라운드 하나를 Gemini 보조 코드 이해 라운드로 바꿔요."),
    txt("You read, debug and speed up an existing codebase of a few hundred lines, and you are scored on checking the AI's output.",
      "수백 줄짜리 기존 코드베이스를 읽고, 디버깅하고, 더 빠르게 만들어요. AI의 출력을 얼마나 잘 검증하는지로 평가받아요."),
    txt("Guides do not confirm it for interns. Ask your recruiter which format each round uses.",
      "인턴에게도 적용되는지는 가이드에서 확인되지 않아요. 라운드별 형식은 리크루터에게 물어보세요."),
  ] },
  { title: txt("How a coding round is scored", "코딩 라운드 채점 방식"), ordered: true, list: [
    txt("Ask about input size, edge cases and expected output before coding.", "코딩 전에 입력 크기·엣지 케이스·기대 출력을 물어보세요."),
    txt("Say the brute force and its cost, then improve it.", "브루트포스와 그 비용을 먼저 말하고, 그다음 개선하세요."),
    txt("Write readable code with clear names.", "이름이 분명하고 읽기 쉬운 코드를 쓰세요."),
    txt("Walk through your own test case line by line before the interviewer does.",
      "면접관이 하기 전에 직접 만든 테스트 케이스로 한 줄씩 따라가 보세요."),
    txt("State time and space complexity.", "시간·공간 복잡도를 말하세요."),
    txt("Keep talking, and treat follow-ups as part of the problem.", "계속 말하고, 후속 질문도 문제의 일부로 받아들이세요."),
  ] },
  { title: txt("About this list", "이 목록에 대해"), wide: true, body: txt(
    "LeetCode's Google tag is crowd-reported and leans toward popular problems, so treat it as pattern coverage. Problem numbers, titles, difficulty and Premium status were checked against four public datasets: two Google company-tag lists (updated Aug 16, 2026) and two full LeetCode catalogs (updated Oct 7 and Oct 10, 2026). 36 of the links, including every Premium one, were also opened live on Oct 10, 2026.",
    "LeetCode의 Google 태그는 사용자 제보 기반이라 인기 문제 쪽으로 치우쳐 있어요. 그러니 패턴을 고루 익히는 용도로 쓰세요. 문제 번호·제목·난이도·프리미엄 여부는 공개 데이터셋 네 곳과 대조했어요: Google 회사 태그 목록 두 개(2026년 8월 16일 갱신)와 LeetCode 전체 카탈로그 두 개(2026년 10월 7일·10일 갱신). 프리미엄 문제를 모두 포함한 링크 36개는 2026년 10월 10일에 직접 열어서도 확인했어요.") },
];

export const GS_SOURCES = [
  ["PracHub · Google SWE Intern OA 2027 (Aug 2026)", "https://prachub.com/resources/google-swe-intern-oa-2027-questions-difficulty-timeline-and-what-happens-next"],
  ["Exponent · Google SWE intern interview guide", "https://www.aced.io/guides/google-software-engineer-intern-interview"],
  ["Exponent · Google SWE interview guide (2026 pilot)", "https://www.tryexponent.com/guides/google-software-engineer-interview"],
  ["techinterview.org · Google code comprehension round", "https://www.techinterview.org/post/3233477234/meta-google-ai-enabled-coding-interview/"],
  ["Prepfully · Google phone screen guide", "https://prepfully.com/interview-guides/google-software-engineer-technical-phone-screen"],
  ["1point3acres · Summer 2026 intern OA report", "https://www.1point3acres.com/interview/thread/1150637"],
  ["Glassdoor · SWE intern reviews, Sep–Oct 2026", "https://www.glassdoor.sg/Interview/Google-Interview-E9079-RVW100881169.htm"],
  ["Glassdoor · SWE intern reviews, 2025–2026", "https://www.glassdoor.fr/Entretien/Google-Entretien-E9079-RVW99291454.htm"],
  ["Glassdoor · intern OA and interviews, Jul 2026", "https://www.glassdoor.es/Entrevista/Google-Entrevista-E9079-RVW102372322.htm"],
  ["LeetCode Discuss · 2024 Google interview questions compilation", "https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf"],
  ["liquidslr/interview-company-wise-problems (Google lists)", "https://github.com/liquidslr/interview-company-wise-problems"],
  ["snehasishroy/leetcode-companywise-interview-questions", "https://github.com/snehasishroy/leetcode-companywise-interview-questions"],
  ["doocs/leetcode (catalog, Premium flags)", "https://github.com/doocs/leetcode"],
  ["kamyu104/LeetCode-Solutions (catalog)", "https://github.com/kamyu104/LeetCode-Solutions"],
];

// resolve numbers → problems, then derive the "Reported" pill and the
// Topics-view day tag (first use wins, e.g. "Day 1 · Mini OA"). Tags live in
// a map per sprint because both sprints share the same problem objects.
const pick = (ids) => ids.map((n) => GS_PROBS[n]);
const tagAs = (map, p, label) => { if (!map[p.id]) map[p.id] = label; };
export const GS_DAYTAG = {}; // item id → { en, ko }
GS_DAYS.forEach((d) => {
  d.items = pick(d.ids);
  d.items.forEach((p) => tagAs(GS_DAYTAG, p, d.label));
  if (!d.drill) return;
  d.drill.items = pick(d.drill.ids);
  const s = d.drill.short || d.drill.name;
  d.drill.items.forEach((p) => tagAs(GS_DAYTAG, p, txt(`${d.label.en} · ${s.en}`, `${d.label.ko} · ${s.ko}`)));
});
GS_REPORTED.forEach((r) => r.ids.forEach((n) => { GS_PROBS[n].rep = true; }));

export const gsDayItems = (d) => (d.drill ? [...d.items, ...d.drill.items] : d.items);
export const GS_BANK = GS_TOPICS.flatMap((tp) => tp.items);
export const GS_PLAN_IDS = [...new Set(GS_DAYS.flatMap((d) => gsDayItems(d).map((p) => p.id)))];

// ── schedule: anchored to the OA date (local calendar days) ──
const parseISO = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
const toISO = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
// default OA is four days out, so Day 1 is today
export const gsDefaultOA = () => { const d = midnight(); d.setDate(d.getDate() + 4); return toISO(d); };
export const gsDate = (oa, off) => { const d = parseISO(oa); d.setDate(d.getDate() + off); return d; };
// today relative to the OA: -4 = Day 1 … 0 = OA day, 1 = interview day
export const gsOffset = (oa) => Math.round((midnight() - parseISO(oa)) / 86400000);
export const gsDayAt = (off) => GS_DAYS.find((d) => d.off === off) || null;
// where "Today" jumps: today's sprint day, else Day 1 before it / interview day after it
export const gsFocusDay = (oa) => {
  const off = gsOffset(oa);
  return gsDayAt(off) || (off < GS_DAYS[0].off ? GS_DAYS[0] : GS_DAYS[GS_DAYS.length - 1]);
};

// ─── Google Interview Sprint (optional, once the OA is passed) ───────────
// Ported from the "Google Interview Sprint" page (Oct 18, 2026): ten days of
// about 3 hours, aimed at the interview only and weighted toward the weakest
// topics. Its bank is the OA bank plus the 13 IV_ADDED problems. Plan problems
// = core + interview rep + mock (39); stretch problems are extra.

// topics whose order differs from the OA bank (the new problems slot in)
const IV_ORDER = {
  "gs-linked": [206, 21, 141, 2, 19, 138, 25],
  "gs-tree": [104, 226, 110, 100, 543, 102, 199, 98, 230, 236, 863, 2096, 1110, 222, 124, 297],
  "gs-graph": [200, 695, 994, 1091, 417, 133, 2101, 127, 827, 1293],
  "gs-graph2": [207, 210, 2115, 547, 684, 721, 399, 743, 1631, 787, 2812],
  "gs-dp": [70, 198, 322, 300, 139, 91, 1143, 72, 62, 416, 5, 354, 329, 1235],
  "gs-trie": [14, 136, 208, 211, 1268, 212, 421, 68, 8],
};
export const IV_TOPICS = GS_TOPICS.map((tp) => ({
  key: tp.key.replace(/^gs-/, "iv-"), name: tp.name,
  items: IV_ORDER[tp.key] ? pick(IV_ORDER[tp.key]) : tp.items,
}));
export const IV_BANK = IV_TOPICS.flatMap((tp) => tp.items);

// C = problem number + estimated minutes at the current pace
const C = (n, m) => ({ n, m });
const KEEP = (n, en, ko) => ({ n, m: 25, topic: txt(en, ko) });
const MOCK = (n, en, ko, ids, noteEn, noteKo) => ({ name: txt(en, ko), mins: 90, review: 15, ids, note: txt(noteEn, noteKo) });

export const IV_DAYS = [
  { n: 1, mins: 185, redo: false,
    short: txt("Trees · recursion", "트리 · 재귀"),
    focus: txt("Trees I: recursion", "트리 I: 재귀"),
    why: txt("Trees are at 10/100 for you, so the day opens with three Easies that each use one idea: a function that returns something about a subtree. Lowest Common Ancestor is the one Medium, and it is Google-tagged in all three recent windows.",
      "트리는 지금 10/100이라 Easy 세 문제로 하루를 열어요. 셋 다 한 가지 아이디어를 써요: 서브트리에 대한 무언가를 돌려주는 함수. Medium은 Lowest Common Ancestor 하나뿐이고, 최근 세 기간 모두 Google 태그가 붙어 있어요."),
    learn: { m: 20, text: txt("Recursive DFS: decide what the function returns for one subtree, handle null, then combine the left and right answers. Diameter adds one twist: return the height, and record the best diameter on the side.",
      "재귀 DFS: 서브트리 하나에 대해 함수가 무엇을 돌려줄지 정하고, null을 처리한 뒤, 왼쪽과 오른쪽 답을 합쳐요. Diameter에는 한 가지가 더 있어요: 높이를 돌려주면서, 가장 긴 지름은 따로 기록해요.") },
    core: [C(104, 20), C(226, 20), C(543, 30), C(236, 50)],
    keep: KEEP(424, "Sliding window", "슬라이딩 윈도우"),
    follow: { m: 5, text: txt("After Lowest Common Ancestor: what if each node also has a parent pointer? What if p or q might not be in the tree?",
      "Lowest Common Ancestor 다음: 노드마다 부모 포인터도 있다면? p나 q가 트리에 없을 수도 있다면?") },
    star: { m: 15, text: txt("Story 1: a hard technical problem you solved in one of your projects. Situation in two sentences, what you did, the result with a number.",
      "스토리 1: 내 프로젝트에서 해결한 어려운 기술 문제. 상황은 두 문장으로, 내가 한 일, 그리고 숫자로 보여주는 결과.") },
    stretch: [C(110, 20), C(100, 15)] },
  { n: 2, mins: 180, redo: true,
    short: txt("Trees · BFS & BST", "트리 · BFS & BST"),
    focus: txt("Trees II: level order and BST bounds", "트리 II: 레벨 순회와 BST 범위"),
    why: txt("Same recursion as Day 1, plus a queue. Level Order gives you the BFS template, and Right Side View reuses it in about half the time. Validate BST checks whether you pass bounds down instead of only comparing a node with its children.",
      "Day 1과 같은 재귀에 큐 하나를 더해요. Level Order로 BFS 템플릿을 익히고, Right Side View는 그걸 재사용해서 절반쯤의 시간에 풀어요. Validate BST는 노드를 자식과만 비교하지 않고 범위를 아래로 넘겨주는지 확인해요."),
    learn: { m: 20, text: txt("BFS by level: in each round, process exactly queue.size() nodes. BST: every node must sit inside a (low, high) range set by its ancestors.",
      "레벨별 BFS: 매 라운드마다 정확히 queue.size()개의 노드만 처리해요. BST: 모든 노드는 조상들이 정한 (low, high) 범위 안에 있어야 해요.") },
    core: [C(102, 45), C(199, 25), C(98, 45)],
    keep: KEEP(34, "Binary search", "이진 탐색"),
    follow: { m: 5, text: txt("After Level Order: return the levels in zigzag order. After Validate BST: do it without recursion, using your own stack.",
      "Level Order 다음: 레벨을 지그재그 순서로 돌려주세요. Validate BST 다음: 재귀 없이, 직접 만든 스택으로 풀어보세요.") },
    stretch: [C(230, 30), C(297, 60)] },
  { n: 3, mins: 195, redo: true,
    short: txt("Graphs · grids", "그래프 · 격자"),
    focus: txt("Graphs I: grids", "그래프 I: 격자"),
    why: txt("Graphs are your biggest gap (5/100) and one of Google's most-asked areas. Start with grids, because you already wrote a directions array for Spiral Matrix. Shortest Path in Binary Matrix matches a reported Google phone-screen question.",
      "그래프는 가장 큰 약점(5/100)이면서 구글이 가장 많이 묻는 분야 중 하나예요. Spiral Matrix에서 이미 방향 배열을 써봤으니 격자부터 시작해요. Shortest Path in Binary Matrix는 후기에 나온 구글 전화 스크린 문제와 같아요."),
    learn: { m: 20, text: txt("Grid DFS: directions array, bounds check first, mark visited before you move on. Multi-source BFS: put every starting cell in the queue before the loop, and count steps by level.",
      "격자 DFS: 방향 배열, 경계 검사 먼저, 다음으로 넘어가기 전에 방문 표시. 다중 출발점 BFS: 루프 전에 모든 시작 칸을 큐에 넣고, 레벨 단위로 걸음 수를 세요.") },
    core: [C(200, 50), C(994, 45), C(1091, 35)],
    keep: KEEP(739, "Monotonic stack", "모노토닉 스택"),
    follow: { m: 5, text: txt("After Number of Islands: land is added one cell at a time, and you report the island count after each addition. Sketch an idea now; Day 5 gives you the tool for it.",
      "Number of Islands 다음: 땅이 한 칸씩 추가되고, 추가될 때마다 섬 개수를 알려줘야 해요. 지금은 아이디어만 스케치해 두세요. 그 도구는 Day 5에서 배워요.") },
    stretch: [C(695, 25), C(417, 45)] },
  { n: 4, mins: 190, redo: true,
    short: txt("Graphs · topo sort", "그래프 · 위상 정렬"),
    focus: txt("Graphs II: adjacency lists and topological sort", "그래프 II: 인접 리스트와 위상 정렬"),
    why: txt("Most graph problems don't arrive as a grid. Today you build the graph yourself from an edge list, then order it. Course Schedule II is Course Schedule plus one list, so it should take about half the time.",
      "대부분의 그래프 문제는 격자로 주어지지 않아요. 오늘은 간선 목록으로 그래프를 직접 만들고 순서를 매겨요. Course Schedule II는 Course Schedule에 리스트 하나만 더하면 되니 절반쯤의 시간이면 돼요."),
    learn: { m: 25, text: txt("Build List<List<Integer>> from the edges. In Clone Graph, a HashMap from old node to new node doubles as the visited set. Kahn's algorithm: count in-degrees, start the queue with every 0, and there is a cycle if fewer than n nodes come out.",
      "간선으로 List<List<Integer>>를 만들어요. Clone Graph에서는 기존 노드 → 새 노드 HashMap이 방문 집합 역할도 해요. Kahn 알고리즘: 진입 차수를 세고, 차수가 0인 노드를 모두 큐에 넣고 시작해요. 나온 노드가 n개보다 적으면 사이클이 있어요.") },
    core: [C(133, 45), C(207, 50), C(210, 25)],
    keep: KEEP(435, "Intervals", "구간"),
    follow: { m: 5, text: txt("After Course Schedule: there are a million courses. Explain why Kahn's queue version is safer than recursive DFS.",
      "Course Schedule 다음: 강의가 백만 개라면? Kahn의 큐 방식이 재귀 DFS보다 안전한 이유를 설명해 보세요.") },
    stretch: [C(2115, 40), C(399, 50)] },
  { n: 5, mins: 185, redo: true,
    short: txt("Union-find · Mock 1", "유니온-파인드 · 모의 1"),
    focus: txt("Graphs III: union-find, then Mock 1", "그래프 III: 유니온-파인드, 그다음 모의 면접 1"),
    why: txt("One new tool, then your first full mock. The mock pairs a strong topic with a tree problem you have not seen, so you find out how this week holds up under a timer.",
      "새 도구 하나를 배우고 첫 실전 모의 면접을 봐요. 강한 토픽 한 문제와 처음 보는 트리 문제 하나로 짝지어져 있어서, 이번 주에 익힌 게 타이머 앞에서도 버티는지 알 수 있어요."),
    learn: { m: 20, text: txt("Union-find: a parent array, find with path compression, union by size. Count components by subtracting one for every successful union.",
      "유니온-파인드: parent 배열, 경로 압축을 쓰는 find, 크기 기준 union. 컴포넌트 수는 union이 성공할 때마다 하나씩 빼서 세요.") },
    core: [C(547, 40)],
    mock: MOCK(5, "Mock interview 1", "모의 면접 1", [238, 863],
      "Two 45-minute rounds in a plain doc. Talk out loud and don't run code. Then spend 15 minutes writing down where you got stuck.",
      "빈 문서에서 45분 라운드 두 번. 소리 내어 설명하고 코드는 실행하지 마세요. 끝나면 15분 동안 막혔던 지점을 적어요."),
    follow: { m: 5, text: txt("After Number of Provinces: the friendships arrive one at a time as a stream. Why does union-find handle that better than re-running BFS?",
      "Number of Provinces 다음: 친구 관계가 스트림으로 하나씩 들어온다면? 유니온-파인드가 BFS를 다시 돌리는 것보다 나은 이유는?") },
    stretch: [C(743, 50), C(684, 35)] },
  { n: 6, mins: 180, redo: true,
    short: txt("Linked lists · design", "연결 리스트 · 설계"),
    focus: txt("Linked lists and class design", "연결 리스트와 클래스 설계"),
    why: txt("Linked lists are at 35/100 and design at 15/100. Four of the questions candidates reported from Google screens and intern interviews were class-design problems, so this day leans on design. LRU Cache is a doubly linked list with sentinel nodes inside a class, and Time Based Key-Value Store adds binary search to a class.",
      "연결 리스트는 35/100, 설계는 15/100이에요. 지원자들이 구글 스크린과 인턴 면접에서 받았다고 한 문제 중 네 개가 클래스 설계라서, 이날은 설계에 무게를 둬요. LRU Cache는 클래스 안에 센티널 노드가 있는 이중 연결 리스트이고, Time Based Key-Value Store는 클래스에 이진 탐색을 더한 거예요."),
    learn: { m: 15, text: txt("Design problems: list the operations and the time each one must take, pick one data structure per operation, then write the class. LRU Cache is a HashMap from key to node plus a doubly linked list with two sentinel nodes, most recent at the front.",
      "설계 문제: 연산 목록과 각 연산에 허용되는 시간을 적고, 연산마다 자료구조를 하나씩 고른 뒤 클래스를 써요. LRU Cache는 키 → 노드 HashMap과 센티널 노드 두 개가 있는 이중 연결 리스트예요. 가장 최근 항목이 맨 앞에 와요.") },
    core: [C(206, 20), C(146, 60), C(981, 40)],
    keep: KEEP(128, "Hashing", "해싱"),
    follow: { m: 5, text: txt("After LRU Cache: give every entry a time-to-live, or make the cache safe for two threads. Talk through what changes.",
      "LRU Cache 다음: 항목마다 만료 시간(TTL)을 주거나, 두 스레드에서 안전하게 쓰이도록 만들어 보세요. 무엇이 바뀌는지 말로 짚어 보세요.") },
    stretch: [C(21, 20), C(19, 35)] },
  { n: 7, mins: 190, redo: true,
    short: txt("DP · one dimension", "DP · 1차원"),
    focus: txt("Dynamic programming I: one dimension", "DP I: 1차원"),
    why: txt("DP is at 20/100. Three problems, each one step harder: a plain recurrence, choose-or-skip, then unlimited choices. Write the recursion first, add a memo, then turn it into a table.",
      "DP는 20/100이에요. 세 문제가 한 단계씩 어려워져요: 단순 점화식, 고르거나 건너뛰기, 그리고 무제한 선택. 재귀를 먼저 쓰고, 메모를 더한 다음, 테이블로 바꿔요."),
    learn: { m: 25, text: txt("Say what dp[i] means in one sentence before you write code. Then write the base cases, the transition, and the order you fill the table in.",
      "코드를 쓰기 전에 dp[i]가 무슨 뜻인지 한 문장으로 말해요. 그다음 기저 사례, 전이식, 테이블을 채우는 순서를 써요.") },
    core: [C(70, 20), C(198, 35), C(322, 50)],
    keep: KEEP(215, "Heap and quickselect", "힙과 퀵셀렉트"),
    follow: { m: 5, text: txt("After Coin Change: return the coins you used, not only how many.",
      "Coin Change 다음: 개수만이 아니라 사용한 동전도 돌려주세요.") },
    star: { m: 15, text: txt("Story 2: a time you disagreed with someone or got critical feedback, and what you changed afterwards.",
      "스토리 2: 누군가와 의견이 달랐거나 날카로운 피드백을 받았던 때, 그리고 그 뒤에 무엇을 바꿨는지.") },
    stretch: [C(300, 45), C(91, 40)] },
  { n: 8, mins: 195, redo: true,
    short: txt("DP · two dimensions", "DP · 2차원"),
    focus: txt("Dynamic programming II: grids and strings", "DP II: 격자와 문자열"),
    why: txt("Same method as Day 7, on a 2-D table. Fill a small table by hand before coding, because most bugs here are in the first row and column.",
      "Day 7과 같은 방법을 2차원 테이블에 써요. 여기서 버그는 대부분 첫 행과 첫 열에서 나오니, 코딩 전에 작은 테이블을 손으로 채워 보세요."),
    learn: { m: 20, text: txt("dp[i][j] usually comes from the cell above, the cell to the left, or the diagonal. Fill a 3 × 4 table on paper first.",
      "dp[i][j]는 보통 위 칸, 왼쪽 칸, 또는 대각선에서 와요. 먼저 종이에 3 × 4 테이블을 채워 보세요.") },
    core: [C(62, 30), C(1143, 50), C(139, 50)],
    keep: KEEP(162, "Binary search", "이진 탐색"),
    follow: { m: 5, text: txt("After Unique Paths: some cells are blocked (that is #63). Then cut the memory to a single row.",
      "Unique Paths 다음: 막힌 칸이 있다면(#63이에요)? 그다음 메모리를 한 행으로 줄여 보세요.") },
    stretch: [C(416, 45), C(72, 50)] },
  { n: 9, mins: 195, redo: true,
    short: txt("Backtracking", "백트래킹"),
    focus: txt("Backtracking", "백트래킹"),
    why: txt("Backtracking is at 25/100, but you have already read the template in Generate Parentheses. Subsets and Permutations drill the choose, explore, undo shape. Word Search combines it with the grid moves from Day 3.",
      "백트래킹은 25/100이지만, Generate Parentheses에서 이미 템플릿을 읽어봤어요. Subsets와 Permutations로 고르기, 탐색하기, 되돌리기의 형태를 익혀요. Word Search는 이걸 Day 3의 격자 이동과 합쳐요."),
    learn: { m: 15, text: txt("Choose, explore, undo. The undo line is the backtracking. Before coding, decide when a partial answer is complete and when a branch can't work.",
      "고르고, 탐색하고, 되돌려요. 되돌리는 그 한 줄이 백트래킹이에요. 코딩 전에 부분 답이 언제 완성되는지, 어떤 가지가 안 되는지 정해 두세요.") },
    core: [C(78, 35), C(46, 35), C(79, 50)],
    keep: KEEP(49, "Hashing", "해싱"),
    follow: { m: 5, text: txt("After Subsets: the input has duplicates. What do you change so the same subset never appears twice?",
      "Subsets 다음: 입력에 중복이 있다면? 같은 부분집합이 두 번 나오지 않게 하려면 무엇을 바꿔야 할까요?") },
    star: { m: 15, text: txt("Story 3: a time you had to learn something fast or work with unclear requirements. Then say all three out loud, about two minutes each.",
      "스토리 3: 무언가를 빨리 배워야 했거나 요구사항이 불분명한 채로 일해야 했던 때. 그다음 세 스토리를 각각 2분 정도로 소리 내어 말해 보세요.") },
    stretch: [C(39, 40), C(17, 30)] },
  { n: 10, mins: 180, redo: true,
    short: txt("Trie · Mock 2", "트라이 · 모의 2"),
    focus: txt("Trie, then Mock 2", "트라이, 그다음 모의 면접 2"),
    why: txt("Trie is at 0/100, and prefix search is a common Google theme. Learn it with one problem, then take the final mock: one class-design problem like those reported from recent screens, and one graph problem you have not seen.",
      "트라이는 0/100이고, 접두사 검색은 구글에서 자주 나오는 주제예요. 한 문제로 익힌 뒤 마지막 모의 면접을 봐요: 최근 스크린 후기에 나온 것 같은 클래스 설계 문제 하나와 처음 보는 그래프 문제 하나."),
    learn: { m: 15, text: txt("A trie node holds children[26] and an isEnd flag. Insert and search both walk one character at a time, so each costs O(length of the word).",
      "트라이 노드는 children[26]과 isEnd 플래그를 가져요. 삽입과 검색 모두 한 글자씩 내려가니, 각각 O(단어 길이)예요.") },
    core: [C(208, 40)],
    mock: MOCK(10, "Mock interview 2", "모의 면접 2", [2353, 2101],
      "Same rules as Mock 1. Compare your notes with Mock 1: the mistakes that repeat are what to fix before the interview.",
      "모의 면접 1과 같은 규칙이에요. 모의 면접 1의 메모와 비교하세요: 반복되는 실수가 면접 전에 고칠 것들이에요."),
    follow: { m: 5, text: txt("After the trie: return the top three words for a prefix, like a search box (that is #1268).",
      "트라이 다음: 검색창처럼 접두사에 맞는 상위 세 단어를 돌려주세요(#1268이에요).") },
    stretch: [C(1268, 45), C(2034, 45)] },
];

// resolve numbers → problems; Topics-view tags read "Day 9 · interview rep" etc.
export const IV_DAYTAG = {}; // item id → { en, ko }
const at = (x) => ({ ...x, p: GS_PROBS[x.n] });
IV_DAYS.forEach((d) => {
  d.key = "iv-d" + d.n;
  d.label = txt(`Day ${d.n}`, `Day ${d.n}`);
  d.core = d.core.map(at);
  d.stretch = d.stretch.map(at);
  d.keep = d.keep ? at(d.keep) : null;
  d.mock = d.mock || null;
  if (d.mock) d.mock.items = d.mock.ids.map((n) => at(C(n, 45)));
  d.follow = d.follow || null;
  d.star = d.star || null;
  const tag = (en, ko) => (x) => tagAs(IV_DAYTAG, x.p, en ? txt(`Day ${d.n} · ${en}`, `Day ${d.n} · ${ko}`) : d.label);
  d.core.forEach(tag());
  if (d.keep) tag("interview rep", "면접 연습")(d.keep);
  if (d.mock) d.mock.items.forEach(tag("mock", "모의 면접"));
  d.stretch.forEach(tag("stretch", "스트레치"));
});

// what counts toward a day and toward the plan (stretch is extra)
export const ivDayParts = (d) => [...d.core, ...(d.keep ? [d.keep] : []), ...(d.mock ? d.mock.items : [])];
export const ivDayItems = (d) => ivDayParts(d).map((x) => x.p);
export const IV_PLAN_IDS = [...new Set(IV_DAYS.flatMap((d) => ivDayItems(d).map((p) => p.id)))];

// readiness from the problems worked through since July (0–100)
const SK = (en, ko, now, daysEn, daysKo) => ({ name: txt(en, ko), now, days: daysEn ? txt(daysEn, daysKo) : null });
export const IV_SKILLS = {
  now: 45, goal: 70,
  weak: [
    SK("Graphs", "그래프", 5, "Days 3–5", "Day 3–5"),
    SK("Trees", "트리", 10, "Days 1–2", "Day 1–2"),
    SK("Trie", "트라이", 0, "Day 10", "Day 10"),
    SK("Class design", "클래스 설계", 15, "Days 6, 10", "Day 6, 10"),
    SK("Dynamic programming", "DP", 20, "Days 7–8", "Day 7–8"),
    SK("Backtracking", "백트래킹", 25, "Day 9", "Day 9"),
    SK("Linked lists", "연결 리스트", 35, "Day 6", "Day 6"),
  ],
  strong: [
    SK("Sliding window", "슬라이딩 윈도우", 80),
    SK("Two pointers", "투 포인터", 80),
    SK("Hashing and prefix sums", "해싱 · 누적 합", 75),
    SK("Binary search", "이진 탐색", 75),
    SK("Stacks", "스택", 75),
    SK("Heaps and intervals", "힙 · 구간", 75),
  ],
};

// interview-round reports only (the OA-only ones are left out)
export const IV_REPORTED = GS_REPORTED.filter((r) => r.round !== OA);

export const IV_FORMAT = [
  GS_FORMAT[1],
  { title: txt("Behavioral questions", "행동 질문"), list: [
    txt("Recent intern reports describe a few STAR questions inside the coding rounds, not a separate round.",
      "최근 인턴 후기를 보면 STAR 질문 몇 개가 별도 라운드가 아니라 코딩 라운드 안에서 나와요."),
    txt("Prepare three stories: a hard technical problem, a disagreement or piece of critical feedback, and learning something fast. The plan writes them on Days 1, 7 and 9.",
      "스토리 세 개를 준비하세요: 어려운 기술 문제, 의견 충돌이나 날카로운 피드백, 무언가를 빨리 배운 경험. 플랜에서는 Day 1, 7, 9에 써요."),
    txt("Keep each to about two minutes: the situation in two sentences, what you did, and the result with a number.",
      "각각 2분 정도로: 상황은 두 문장, 내가 한 일, 그리고 숫자로 보여주는 결과."),
  ] },
  GS_FORMAT[2],
  GS_FORMAT[3],
  { title: GS_FORMAT[4].title, wide: true, body: txt(
    "LeetCode's Google tag is crowd-reported and leans toward popular problems, so treat it as pattern coverage. Problem numbers, titles, difficulty and Premium status were checked against four public datasets: two Google company-tag lists (updated Aug 16, 2026) and two full LeetCode catalogs (updated Oct 7 and Oct 10, 2026). 36 of the links, including every Premium one, were also opened live on Oct 10, 2026. On Oct 18, 2026 the 13 problems added for the 10-day plan were checked against a current LeetCode catalog and the Google tag list, and three of their links were opened live. None of the plan problems needs Premium. Time estimates are for your current pace, not LeetCode averages. On Oct 18, 2026 the plan was refocused on the interview: bit manipulation and OA-only reports were dropped, and class design gained time.",
    "LeetCode의 Google 태그는 사용자 제보 기반이라 인기 문제 쪽으로 치우쳐 있어요. 그러니 패턴을 고루 익히는 용도로 쓰세요. 문제 번호·제목·난이도·프리미엄 여부는 공개 데이터셋 네 곳과 대조했어요: Google 회사 태그 목록 두 개(2026년 8월 16일 갱신)와 LeetCode 전체 카탈로그 두 개(2026년 10월 7일·10일 갱신). 프리미엄 문제를 모두 포함한 링크 36개는 2026년 10월 10일에 직접 열어서도 확인했어요. 2026년 10월 18일에는 10일 플랜용으로 추가한 13문제를 최신 LeetCode 카탈로그와 Google 태그 목록으로 확인했고, 그중 링크 세 개를 직접 열어 봤어요. 플랜 문제 중 프리미엄이 필요한 건 없어요. 예상 시간은 LeetCode 평균이 아니라 지금 페이스 기준이에요. 같은 날 플랜을 면접에 맞게 다시 짰어요: 비트 조작과 OA에서만 나온 후기는 빼고, 클래스 설계에 시간을 더 줬어요.") },
];
export const IV_SOURCES = GS_SOURCES.filter(([name]) => !/OA 2027|1point3acres/.test(name));

// ── schedule: Day 1 is a date you pick (local calendar days) ──
export const ivDefaultStart = () => toISO(midnight()); // Day 1 = today
export const ivDate = (start, n) => { const d = parseISO(start); d.setDate(d.getDate() + n - 1); return d; };
// today's plan day: 1–10 during the plan, < 1 before it, > 10 after it
export const ivDayNum = (start) => Math.round((midnight() - parseISO(start)) / 86400000) + 1;
export const ivDayAt = (n) => IV_DAYS.find((d) => d.n === n) || null;
// where "Today" jumps: today's day, else Day 1 before the plan / Day 10 after it
export const ivFocusDay = (start) => ivDayAt(Math.max(1, Math.min(IV_DAYS.length, ivDayNum(start))));
