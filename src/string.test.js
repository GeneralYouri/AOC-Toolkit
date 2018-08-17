import { splitCRLF, splitLF, splitTab } from './string';

describe('splitCRLF', () => {
    it('should split on the correct character (\\r\\n)', () => {
        expect(splitCRLF('a\r\nb\rc\nd\te')[0]).toHaveLength(1);
    });

    it('should split on every instance of the character when multiple instances exist in the input string', () => {
        expect(splitCRLF('foo\r\nbar\r\nbaz')).toHaveLength(3);
    });
});

describe('splitLF', () => {
    it('should split on the correct character (\\n)', () => {
        expect(splitLF('a\r\nb\rc\nd\te')[0]).toHaveLength(2);
    });

    it('should split on every instance of the character when multiple instances exist in the input string', () => {
        expect(splitLF('foo\nbar\nbaz')).toHaveLength(3);
    });
});

describe('splitTab', () => {
    it('should split on the correct character (\\t)', () => {
        expect(splitTab('a\r\nb\rc\nd\te')[0]).toHaveLength(8);
    });

    it('should split on every instance of the character when multiple instances exist in the input string', () => {
        expect(splitTab('foo\tbar\tbaz')).toHaveLength(3);
    });
});
