// Implementations of DP algorithms

// Given a list of slices of pizza, where you and another player alternate
// between taking slices off of the end, what is the maximum difference between
// the amount of pizza you eat and the amount of pizza your friend eats?
function pizzaGame(slices) {
  let n = slices.length;
  let dp = [];
  for (let i = 0; i < n; ++i) dp.push(new Array(n));

  for (let delta = 0; delta < n; ++delta) {
    for (let i = 0; i < n - delta; ++i) {
      let j = i + delta;
      if (i == j) {
        dp[i][j] = slices[i];
      } else {
        dp[i][j] = Math.max(slices[i] - dp[i + 1][j], slices[j] - dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}

// Given a pile of stones, where you and a friend alternately remove a square
// (1,4,9,...) number of stones, can you be the person who removes the last
// stone?
function nStones(n) {
  let dp = new Array(n + 1);

  dp[0] = false;
  for (let j = 1; j <= n; ++j) {
    dp[j] = false;
    for (let i = 1; i * i <= j; ++i) {
      if (!dp[j - i * i]) {
        dp[j] = true;
        break;
      }
    }
  }

  return dp[n];
}

// Find the length of the longest common subsequence of two strings, as well as
// the actual subsequence.
function longestCommonSubsequence(a, b) {
  let an = a.length,
    bn = b.length;
  let dp = [];
  for (let i = 0; i <= an; ++i) dp.push(new Array(bn + 1));

  // Fill out the dp table with the lengths
  for (let i = 0; i <= an; ++i) {
    for (let j = 0; j <= bn; ++j) {
      if (i == 0 || j == 0) {
        dp[i][j] = 0;
      } else if (a[i - 1] == b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  // Backtrack through the table to find the actual string
  let i = an,
    j = bn;
  let chars = [];
  while (i > 0 && j > 0) {
    if (a[i - 1] == b[j - 1]) {
      chars.push(a[i - 1]);
      --i;
      --j;
    } else if (dp[i][j] == dp[i - 1][j]) {
      --i;
    } else {
      --j;
    }
  }
  chars.reverse();

  return {
    length: dp[an][bn],
    string: chars.join(''),
  };
}

exports.pizzaGame = pizzaGame;
exports.nStones = nStones;
exports.longestCommonSubsequence = longestCommonSubsequence;
