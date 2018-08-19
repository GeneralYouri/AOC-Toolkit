import { addRule } from './assert';


/**
 * Create a function that can check whether a value is of the given type
 * @param {*} type - The desired type of the value
 * @returns {Function}
 */
export const createIsType = (type) => {
    switch (type) {
        case Boolean:
            return value => typeof value === 'boolean';
        case Number:
            return value => typeof value === 'number';
        case String:
            return value => typeof value === 'string';
        case Object:
            return value => typeof value === 'object' || typeof value === 'function';
        case Array:
            return value => Array.isArray(value);
        case Function:
            return value => typeof value === 'function';
        default:
            return value => value instanceof type;
    }
};

/**
 * Assert that a value is of the given type
 * @var {Function} assert.isType
 * @param {*} type - The desired type of the value
 */
addRule('isType', createIsType, '%s must be of type %s');

/**
 * @var {Function} assert.isBoolean
 * @param {*} type - The desired type of the value
 */
addRule('isBoolean', createIsType(Boolean), '%s must be of type Boolean');

/**
 * @var {Function} assert.isNumber
 * @param {*} type - The desired type of the value
 */
addRule('isNumber', createIsType(Number), '%s must be of type Number');

/**
 * @var {Function} assert.isString
 * @param {*} type - The desired type of the value
 */
addRule('isString', createIsType(String), '%s must be of type String');

/**
 * @var {Function} assert.isObject
 * @param {*} type - The desired type of the value
 */
addRule('isObject', createIsType(Object), '%s must be of type Object');

/**
 * @var {Function} assert.isArray
 * @param {*} type - The desired type of the value
 */
addRule('isArray', createIsType(Array), '%s must be of type Array');

/**
 * @var {Function} assert.isFunction
 * @param {*} type - The desired type of the value
 */
addRule('isFunction', createIsType(Function), '%s must be of type Function');

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
