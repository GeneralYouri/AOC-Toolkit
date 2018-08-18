import { makeObjectIterable } from './object';

describe('makeObjectIterable', () => {
    it('should return an object with an iterator property', () => {
        expect(typeof makeObjectIterable({})[Symbol.iterator]).toBe('function');
    });

    it('should properly yield the key-values of an object', () => {
        const result = [...makeObjectIterable({ a: 1, 2: 3 })];
        expect(result).toContainEqual(['a', 1]);
        expect(result).toContainEqual(['2', 3]);
    });
});
