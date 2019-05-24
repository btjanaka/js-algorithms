/**
 * Functions for handling Random Access Permutations
 */

/**
 * Calculates the n-th lexicographical permutation of the items in the array.
 * Does not take into account repeated permutations.
 * Complexity: O(k|arr|<sup>2</sup>), where k represents the time to carry out
 * bigint operations.
 * @warning Only works when |arr| <= 18
 * @param {array} arr A sorted array to find the permutation of
 * @param {JSBI.BigInt} n The number of the permutation to find (0-based)
 * @return {array} The n-th lexicographical permutation, counting repeats.
 */
function RAPNonUnique(arr, n) {
  let len = arr.length;
  let factorials = [1];
  for (let i = 1; i <= len; ++i) {
    factorials.push(factorials[i - 1] * i);
  }

  if (n < 0) throw { msg: "n is too small" };
  if (n >= factorials[len]) throw { msg: "n is too big" };

  let res = [];
  for (let i = len; i >= 1; --i) {
    let index = Math.floor(n / factorials[i - 1]);
    console.log(index);
    res.push(arr.splice(index, 1)[0]);
    n -= index * factorials[i - 1];
  }

  return res;
}

exports.RAPNonUnique = RAPNonUnique;
