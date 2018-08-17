import { addRule } from './assert';

/**
 * Asserts that a value is of type Number
 * @var {Function} assert.isNumber
 */
addRule('isNumber', value => typeof value === 'number', '%s must be of type number');

/**
 * Asserts that a number value is >= the given minimum value
 * @var {Function} assert.greaterThanOrEqual
 * @param {number} min - The minimum value to compare against
 */
addRule('greaterThanOrEqual', input => value => value >= input, '%s must be greater than or equal to %s');

/**
 * Asserts that a number value is >= the given minimum value
 * @var {Function} assert.greaterThan
 * @param {number} min - The minimum value to compare against
 */
addRule('greaterThan', input => value => value > input, '%s must be greater than to %s');
