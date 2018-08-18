import { wrap } from './number';
import { assert } from './assert';

/**
 * Create an iterable array of the given length
 * @param {number} length - The length of the desired array
 * @returns {number[]}
 */
export const createArrayFromLength = (length) => {
    assert(length, 'length', [assert.greaterThanOrEqual(0)]);

    return Array.from(Array(length));
};

/**
 * Wrap an index number around the length of the given array
 * @param {array} array - The array providing the length to wrap around
 * @param {number} index - The index number to wrap
 * @returns {number}
 */
export const wrapIndex = (array, index) => {
    assert(array.length, 'array length', [assert.greaterThanOrEqual(0)]);

    return wrap(index, array.length);
};
