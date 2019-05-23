/**
 * Divides two big integers (in a slow way).
 * @param {bigint} dividend
 * @param {bigint} divisor
 * @return {bigint} dividend / divisor
 */
function bigIntDivide(dividend, divisor) {
  let res = 0n;
  while (divisor < dividend) {
    dividend -= divisor;
    ++res;
  }
  return res;
}

/**
 * Calculates the n-th lexicographical permutation of the items in the array.
 * Does not take into account repeated permutations.
 * Complexity: O(k|arr|<sup>2</sup>), where k represents the time to carry out
 * bigint operations.
 * @param {array} arr Items to find the permutation of
 * @param {bigint} n The number of the permutation to find (1-based)
 * @return {array} The n-th lexicographical permutation, counting repeats.
 */
function RAPNonUnique(arr, n) {
  arr.sort((a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });

  let len = arr.length;
  let factorials = [1n];
  for (let i = 1n; i <= len; ++i) {
    factorials.push(factorials[i - 1n] * i);
  }

  if (n <= 0) throw "n is too small";
  if (n > factorials[len]) throw "n is too big";

  let res = [];
  for (let i = len; i > 1; --i) {
    let index = bigIntDivide(n, factorials[i - 1]);
    res.push(arr.splice(Number(index), 1)[0]);
    n -= index * factorials[i];
  }

  return res;
}

exports.RAPNonUnique = RAPNonUnique;
