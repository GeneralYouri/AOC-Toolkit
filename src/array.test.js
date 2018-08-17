import { createArrayFromLength, wrapIndex } from './array';

describe('createArrayFromLength', () => {
    it('should create an array with correct length', () => {
        expect(createArrayFromLength(10)).toHaveLength(10);
    });

    it('should create the correct number of iterable array elements', () => {
        const elementCount = createArrayFromLength(10).reduce(acc => acc + 1, 0);
        expect(elementCount).toBe(10);
    });

    it('should throw when length is negative', () => {
        expect(() => createArrayFromLength(-1)).toThrow('`length` Must be non-negative');
    });
});

describe('wrapIndex', () => {
    it('should return the input index when the input index is < the array length', () => {
        expect(wrapIndex([0, 1, 2, 3], 2)).toBe(2);
    });

    it('should return the wrapped input index when the input index is >= the array length', () => {
        expect(wrapIndex([0, 1, 2, 3], 5)).toBe(1);
    });

    it('should throw when the wrap limit is === 0', () => {
        expect(() => wrapIndex([], 2)).toThrow('Array length of 0 makes index wrapping impossible');
    });
});
