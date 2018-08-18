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
        case Function:
            return value => typeof value === 'function';
        case Object:
            return value => typeof value === 'object' || typeof value === 'function';
        case Array:
            return value => Array.isArray(value);
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
