import { format } from 'util';

/**
 * Attempts to assert whether a value satisfies the given rules
 * @param {*} value - The value to test
 * @param {string} name - An identifier for the value
 * @param {Function[]} rules - The rules that must be satisfied
 * @throws {Error} Assertion failed
 */
export const assert = (value, name, rules) => {
    for (const rule of rules) {
        const isValid = rule(value);
        if (!isValid) {
            const message = format(rule.template, `'${name}'`, ...rule.options);
            throw new Error(message);
        }
    }
};

/**
 * Create a new rule
 * @param {Function} fn - The callback function to apply the rule logic
 * @param {string} template - The error message template in case the rule assertion fails
 * @returns {Function}
 */
export const ruleFactory = (fn, template) => {
    const rule = (...options) => {
        const result = fn(...options);
        if (typeof result === 'function') {
            result.template = template;
            result.options = options;
        }
        return result;
    };

    rule.template = template;
    rule.options = [];
    return rule;
};

/**
 * Create and register a new rule
 * @param {string} ruleName - The name of the new rule
 * @param {Function} fn - The callback function to apply the rule logic
 * @param {string} template - The error message template incase the rule assertion fails
 * @throws {Error} Rule already exists
 */
export const addRule = (ruleName, fn, template) => {
    if (assert[ruleName]) {
        throw new Error(`Rule '${ruleName}' already exists`);
    }

    assert[ruleName] = ruleFactory(fn, template);
};
