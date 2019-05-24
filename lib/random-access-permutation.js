/**
 * Functions for handling Random Access Permutations
 */

'use strict';

const JSBI = require('jsbi');

/**
 * Slow division of Big Integers.
 * @param {JSBI.BigInt} dividend
 * @param {JSBI.BigInt} divisor
 * @return {JSBI.BigInt} dividend / divisor
 */
function slowDivide(dividend, divisor) {
  let res = JSBI.BigInt(0);
  while (dividend > 0) {
    dividend = JSBI.subtract(dividend, divisor);
    res = JSBI.add(res, 1);
  }
  return res;
}

/**
 * Calculates the n-th lexicographical permutation of the items in the array.
 * Does not take into account repeated permutations.
 * Complexity: O(k|arr|<sup>2</sup>), where k represents the time to carry out
 * bigint operations.
 * @param {array} arr A sorted array to find the permutation of
 * @param {JSBI.BigInt} n The number of the permutation to find (0-based)
 * @return {array} The n-th lexicographical permutation, counting repeats.
 */
function RAPNonUnique(arr, n) {
  let len = arr.length;
  let factorials = [JSBI.BigInt(1)];
  for (let i = 1; i <= len; ++i) {
    factorials.push(JSBI.multiply(factorials[i - 1], JSBI.BigInt(i)));
  }

  if (JSBI.LT(n, 0)) throw 'n is too small';
  if (JSBI.GE(n, factorials[len])) throw 'n is too big';

  let res = [];
  for (let i = len; i >= 1; --i) {
    let index = slowDivide(n, factorials[i - 1]);
    res.push(arr.splice(JSBI.toNumber(index), 1)[0]);
    n = JSBI.subtract(n, JSBI.multiply(index, factorials[i - 1]));
  }

  return res;
}

exports.RAPNonUnique = RAPNonUnique;
