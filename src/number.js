/**
 * Clamp a number between lower and upper bounds
 * @param n {number} The number to clamp
 * @param min {number} The lower bound
 * @param max {number} The upper bound
 * @returns {number}
 */
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/**
 * Wrap a number around a limit
 * @param n {number} The number to wrap
 * @param limit {number} The upper limit, the modulo to wrap by
 * @returns {number}
 */
export const wrap = (n, limit) => {
    if (limit <= 0) {
        throw new Error('`limit` Must be greater than zero');
    }

    return n % limit;
};
