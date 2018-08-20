import { addRule } from './assert';


/**
 * Check whether a value is a Boolean
 * @var {Function} assert.isBoolean
 * @param {*} value - The value to test
 */
addRule('isBoolean', value => typeof value === 'boolean', '%s must be a Boolean');

/**
 * Check whether a value is a Number
 * @var {Function} assert.isNumber
 * @param {*} value - The value to test
 */
addRule('isNumber', value => typeof value === 'number', '%s must be a Number');

/**
 * Check whether a value is a String
 * @var {Function} assert.isString
 * @param {*} value - The value to test
 */
addRule('isString', value => typeof value === 'string', '%s must be a String');

/**
 * Check whether a value is an Object
 * @var {Function} assert.isObject
 * @param {*} value - The value to test
 */
addRule('isObject', value => typeof value === 'object' || typeof value === 'function', '%s must be an Object');

/**
 * Check whether a value is an Array
 * @var {Function} assert.isArray
 * @param {*} value - The value to test
 */
addRule('isArray', value => Array.isArray(value), '%s must be an Array');

/**
 * Check whether a value is a Function
 * @var {Function} assert.isFunction
 * @param {*} value - The value to test
 */
addRule('isFunction', value => typeof value === 'function', '%s must be a Function');

/**
 * Check whether a value is a user-defined type
 * @var {Function} assert.isInstanceof
 * @param {*} value - The value to test
 */
addRule('isInstanceof', type => value => value instanceof type, '%s must be a %s');


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
addRule('greaterThan', input => value => value > input, '%s must be greater than %s');
