import { assert } from './assert';
import { createIsType } from './rules';

describe('createIsType', () => {
    function foo() {
    }

    const bar = function bar() {
    };
    const baz = () => {
    };

    const MyType = function MyType() {
    };
    const myInstance = new MyType();

    it.each([
        ['Boolean', Boolean, true],
        ['Number', Number, 1],
        ['String', String, 'foo'],
        ['Object', Object, { foo: 1 }],
        ['Array', Array, [1]],
        ['Function', Function, foo],
        ['Function', Function, bar],
        ['Function', Function, baz],
        ['MyType', MyType, myInstance],
    ])('should return a function that properly recognises a %s type when it is passed', (name, type, value) => {
        const fn = createIsType(type);
        expect(typeof fn).toBe('function');
        expect(fn(value)).toBeTruthy();
    });
});

describe('assert.isType', () => {
    it('should exist as a function property on assert', () => {
        expect(assert).toHaveProperty('isType');
        expect(typeof assert.isType).toBe('function');
    });
});
