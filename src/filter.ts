// Filters candidates using a score based on LCS length.
// Extracted and modified from our https://github.com/qualified/lsps project.
export const filtered = (
  items: [seq: string, sym: string][],
  typed: string,
  maxItems: number = 10
) => {
  const scores = items.reduce((o, item) => {
    o[item[0]] = lcsScore(item[0], typed);
    return o;
  }, {} as { [k: string]: number });

  return items
    .slice()
    .sort((a, b) => scores[b[0]] - scores[a[0]])
    .slice(0, maxItems);
};

// Similarity score between strings based on the length of the longest common subsequence.
const lcsScore = (item: string, typed: string): number => {
  if (item.length === 0 || typed.length === 0) return 0;
  // Prefer shorter item if it includes typed word. Boost if it starts with it.
  if (item.includes(typed)) {
    return typed.length + 1 / item.length + (item.startsWith(typed) ? 1 : 0);
  }

  const lcs =
    item.length < typed.length
      ? lcsLength(typed, item)
      : lcsLength(item, typed);
  // Boost if the first character matches.
  if (item[0].toLowerCase() === typed[0].toLowerCase()) {
    // Another boost if matching case.
    return lcs + 1 + (item[0] === typed[0] ? 1 : 0);
  }
  return lcs;
};

// Returns LCS length.
// Uses single array of size min(x.length, y.length) + 1 for look up.
// Assumes x.length >= y.length > 0.
//
// For X = AGCAT, Y = GAC, L changes like the following:
//
//      Ø  G  A  C
//   Ø  0  0  0  0
//   A  0  0 *1  1
//   G  0 *1  1  1
//   C  0  1  1 *2
//   A  0  1 *2  2
//   T  0  1  2  2
//
// where * denotes a match that incremented the value from previous column/row.
const lcsLength = (x: string, y: string): number => {
  const m = x.length;
  const n = y.length;
  const L = [0];
  for (let i = 1; i <= n; ++i) L[i] = 0;
  for (let i = 1; i <= m; ++i) {
    // prev is the value from previous column/row
    for (let j = 1, prev = L[0]; j <= n; ++j) {
      const tmp = L[j];
      L[j] = x[i - 1] === y[j - 1] ? prev + 1 : Math.max(L[j - 1], L[j]);
      prev = tmp;
    }
  }
  return L[n];
};
