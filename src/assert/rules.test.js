import { assert } from './assert';
import { createIsType } from './rules';

describe('createIsType', () => {
    it('should return a function that properly recognises a Boolean type when Boolean is passed', () => {
        const fn = createIsType(Boolean);
        expect(typeof fn).toBe('function');
        expect(fn(true)).toBeTruthy();
    });

    it('should return a function that properly recognises a Number type when Number is passed', () => {
        const fn = createIsType(Number);
        expect(typeof fn).toBe('function');
        expect(fn(1)).toBeTruthy();
    });

    it('should return a function that properly recognises a String type when String is passed', () => {
        const fn = createIsType(String);
        expect(typeof fn).toBe('function');
        expect(fn('foo')).toBeTruthy();
    });

    it('should return a function that properly recognises a Object type when Object is passed', () => {
        const fn = createIsType(Object);
        expect(typeof fn).toBe('function');
        expect(fn({ foo: 1 })).toBeTruthy();
    });

    it('should return a function that properly recognises a Array type when Array is passed', () => {
        const fn = createIsType(Array);
        expect(typeof fn).toBe('function');
        expect(fn([1])).toBeTruthy();
    });

    it('should return a function that properly recognises a Function type when Function is passed', () => {
        const fn = createIsType(Function);
        expect(typeof fn).toBe('function');

        function a() {}
        const b = function b() {};
        const c = () => {};
        expect(fn(a)).toBeTruthy();
        expect(fn(b)).toBeTruthy();
        expect(fn(c)).toBeTruthy();
    });

    it('should return a function that properly recognises a user-defined type when the user-defined type is passed', () => {
        const MyType = function MyType() {};
        const myInstance = new MyType();
        const fn = createIsType(MyType);
        expect(typeof fn).toBe('function');
        expect(fn(myInstance)).toBeTruthy();
    });
});

describe('assert.isType', () => {
    it('should exist as a function property on assert', () => {
        expect(assert).toHaveProperty('isType');
        expect(typeof assert.isType).toBe('function');
    });
});
