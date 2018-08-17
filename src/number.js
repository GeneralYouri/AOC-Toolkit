import { assert } from './assert';

/**
 * Clamp a number between lower and upper bounds
 * @param {number} n - The number to clamp
 * @param {number} min - The lower bound
 * @param {number} [max] - The upper bound
 * @returns {number}
 */
export const clamp = (n, min, max = n) => Math.max(min, Math.min(max, n));

/**
 * Wrap a number around a limit
 * @param {number} n - The number to wrap
 * @param {number} limit - The upper limit, the modulo to wrap by
 * @returns {number}
 */
export const wrap = (n, limit) => {
    assert(limit, 'limit', [assert.greaterThan(0)]);

    return n % limit;
};
