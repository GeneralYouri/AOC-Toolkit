import { assert } from './assert';
import './rules';

describe('assert.isType', () => {
    it('should exist as a function property on assert', () => {
        expect(assert).toHaveProperty('isType');
        expect(typeof assert.isType).toBe('function');
    });

    it('should return a function that properly recognises a Boolean type when Boolean is passed', () => {
        const fn = assert.isType(Boolean);
        expect(typeof fn).toBe('function');
        expect(() => fn(true)).not.toThrow();
    });

    it('should return a function that properly recognises a Number type when Number is passed', () => {
        const fn = assert.isType(Number);
        expect(typeof fn).toBe('function');
        expect(() => fn(1)).not.toThrow();
    });

    it('should return a function that properly recognises a String type when String is passed', () => {
        const fn = assert.isType(String);
        expect(typeof fn).toBe('function');
        expect(() => fn('foo')).not.toThrow();
    });

    it('should return a function that properly recognises a Object type when Object is passed', () => {
        const fn = assert.isType(Object);
        expect(typeof fn).toBe('function');
        expect(() => fn({ foo: 1 })).not.toThrow();
    });

    it('should return a function that properly recognises a Array type when Array is passed', () => {
        const fn = assert.isType(Array);
        expect(typeof fn).toBe('function');
        expect(() => fn([1])).not.toThrow();
    });

    it('should return a function that properly recognises a Function type when Function is passed', () => {
        const fn = assert.isType(Function);
        expect(typeof fn).toBe('function');

        function a() {}
        const b = function b() {};
        const c = () => {};
        expect(() => fn(a)).not.toThrow();
        expect(() => fn(b)).not.toThrow();
        expect(() => fn(c)).not.toThrow();
    });

    it('should return a function that properly recognises a user-defined type when the user-defined type is passed', () => {
        const MyType = function MyType() {};
        const myInstance = new MyType();
        const fn = assert.isType(MyType);
        expect(typeof fn).toBe('function');
        expect(() => fn(myInstance)).not.toThrow();
    });
});
