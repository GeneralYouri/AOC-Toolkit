// import { format } from 'util';
//
// const assert = (value, name, rules) => {
//     for (const rule of rules) {
//         const isValid = rule(value);
//         if (!isValid) {
//             throw new Error(`${name} ${isValid}`);
//         }
//     }
// };
//
// assert.addRule = (ruleName, cb, msg) => {
//     assert[ruleName] = (input) => {
//         return cb(input);
//     };
// };
//
// assert.addRule('isNumber', value => [typeof value === 'number'], '%s must be of type number');
// assert.addRule(
//     'greaterThanOrEqual',
//     input => value => value >= input,
//     '%s must be greater than or equal to %s',
// );

import { wrap } from './number';

/**
 * Create an iterable array of the given length
 * @param {number} length - The length of the desired array
 * @returns {number[]}
 */
export const createArrayFromLength = (length) => {
    // assert(length, 'length', [assert.isNumber, assert.greaterThanOrEqual(0)]);
    // assert(arg2, 'arg2', [assert.isNumber, assert.greaterThanOrEqual(0)]);

    if (length < 0) {
        throw new Error('`length` Must be non-negative');
    }
    return Array.from(Array(length)).map(Number);
};

/**
 * Wrap an index number around the length of the given array
 * @param {array} array - The array providing the length to wrap around
 * @param {number} index - The index number to wrap
 * @returns {number}
 */
export const wrapIndex = (array, index) => {
    if (array.length === 0) {
        throw new Error('Array length of 0 makes index wrapping impossible');
    }
    return wrap(index, array.length);
};
