import { createArrayFromLength } from './array';

describe('createArrayFromLength', () => {
    it('should create an array with correct length', () => {
        expect(createArrayFromLength(10)).toHaveLength(10);
    });

    it('should create the correct number of iterable array elements', () => {
        const elementCount = createArrayFromLength(10).reduce(acc => acc + 1, 0);
        expect(elementCount).toBe(10);
    });

    it('should throw on negative length values', () => {
        expect(() => createArrayFromLength(-1)).toThrow('`length` Must not be negative');
    });
});
