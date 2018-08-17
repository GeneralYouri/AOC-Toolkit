import { clamp, wrap } from './number';

describe('clamp', () => {
    it('should return the input number when the lower bound <= the input number <= the upper bound', () => {
        expect(clamp(123, 45, 678)).toBe(123);
    });

    it('should return the lower bound when the input number is <= the lower bound', () => {
        expect(clamp(12, 45, 678)).toBe(45);
    });

    it('should return the upper bound when the input number is >= the upper bound', () => {
        expect(clamp(1234, 45, 678)).toBe(678);
    });
});

describe('wrap', () => {
    it('should return the input number when the input number is < the wrap limit', () => {
        expect(wrap(123, 456)).toBe(123);
    });

    it('should return the wrapped input number when the input number is >= the wrap limit', () => {
        expect(wrap(123, 45)).toBe(33);
    });
});
