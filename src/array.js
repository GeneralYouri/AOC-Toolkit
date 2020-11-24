import { wrap } from './number';
import { assert } from './assert';

/**
 * Create an iterable array of the given length
 * @param {number} length - The length of the desired array
 * @returns {number[]}
 */
export const createArrayFromLength = (length, defaultValue = undefined) => {
    assert(length, 'length', [assert.greaterThanOrEqual(0)]);

    const array = [];
    array[length - 1] = (typeof defaultValue === 'function') ? defaultValue() : defaultValue;
    return Array.from(array, () => (typeof defaultValue === 'function') ? defaultValue() : defaultValue);
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
