import { assert } from './assert';
import './rules';


describe('assert.isBoolean', () => {
    it('should be a function that properly recognises a Boolean type', () => {
        expect(typeof assert.isBoolean).toBe('function');
        expect(assert.isBoolean(true)).toBeTruthy();
    });
});

describe('assert.isNumber', () => {
    it('should be a function that properly recognises a Number type', () => {
        expect(typeof assert.isNumber).toBe('function');
        expect(assert.isNumber(1)).toBeTruthy();
    });
});

describe('assert.isString', () => {
    it('should be a function that properly recognises a String type', () => {
        expect(typeof assert.isString).toBe('function');
        expect(assert.isString('foo')).toBeTruthy();
    });
});

describe('assert.isObject', () => {
    it('should be a function that properly recognises a Object type', () => {
        expect(typeof assert.isObject).toBe('function');
        expect(assert.isObject({ foo: 1 })).toBeTruthy();
    });
});

describe('assert.isArray', () => {
    it('should be a function that properly recognises a Array type', () => {
        expect(typeof assert.isArray).toBe('function');
        expect(assert.isArray([1])).toBeTruthy();
    });
});

describe('assert.isFunction', () => {
    it('should be a function that properly recognises a Function type', () => {
        function foo() {
        }

        const bar = function b() {
        };
        const baz = () => {
        };

        expect(typeof assert.isFunction).toBe('function');
        expect(assert.isFunction(foo)).toBeTruthy();
        expect(assert.isFunction(bar)).toBeTruthy();
        expect(assert.isFunction(baz)).toBeTruthy();
    });
});

describe('assert.isInstanceof', () => {
    it('should be a function that properly recognises the user-defined type it is passed', () => {
        const MyType = function MyType() {
        };
        const myInstance = new MyType();

        expect(typeof assert.isInstanceof).toBe('function');
        expect(assert.isInstanceof(MyType)(myInstance)).toBeTruthy();
    });
});
