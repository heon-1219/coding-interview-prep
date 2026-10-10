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

export const GS_PROBS = {}; // by LeetCode number
export const GS_ITEMS = {}; // by item id
[...GS_TOPICS.flatMap((tp) => tp.items), ...REPORT_ONLY].forEach((p) => { GS_PROBS[p.num] = p; GS_ITEMS[p.id] = p; });

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
// Topics-view day tag (first use wins, e.g. "Day 1 · Mini OA")
const pick = (ids) => ids.map((n) => GS_PROBS[n]);
GS_DAYS.forEach((d) => {
  d.items = pick(d.ids);
  d.items.forEach((p) => { p.day = p.day || d.label; });
  if (!d.drill) return;
  d.drill.items = pick(d.drill.ids);
  const s = d.drill.short || d.drill.name;
  d.drill.items.forEach((p) => { p.day = p.day || txt(`${d.label.en} · ${s.en}`, `${d.label.ko} · ${s.ko}`); });
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
