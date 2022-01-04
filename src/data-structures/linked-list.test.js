import { LinkedList } from './linked-list';
import { primeGeneratorLimit } from 'src/algorithms';

describe('LinkedList.prototype.concat', () => {
    it('should add all new values of the given list at the end while keeping all existing values', () => {
        const list1 = LinkedList.from(Array.from(Array(12)).map((_, i) => i));
        const list2 = LinkedList.from(Array.from(Array(3)).map((_, i) => 10 * i));
        const list3 = LinkedList.from(Array.from(Array(3)).map((_, i) => 15 * i));
        const values = [...list1].concat([...list2]);
        const newList = list1.concat(list2);
        expect([...newList]).toEqual(values);
    });
    it('should accept multiple list type arguments', () => {
        const list1 = LinkedList.from([1, 2, 3]);
        const list2 = LinkedList.from([4, 5, 6]);
        const list3 = LinkedList.from([7, 8, 9]);
        const list4 = LinkedList.from([10, 11, 12]);
        const values = [...list1].concat([...list2], [...list3], [...list4]);
        const newList = list1.concat(list2, list3, list4);
        expect([...newList]).toEqual(values);
    });
    it('should accept value type arguments', () => {
        const list1 = LinkedList.from([1, 2, 3]);
        const value2 = 1337;
        const value3 = 42;
        const values = [...list1].concat(value2, value3);
        const newList = list1.concat(value2, value3);
        expect([...newList]).toEqual(values);
    });
    it('should allow mixing value and list type arguments', () => {
        const list1 = LinkedList.from([1, 2, 3]);
        const value2 = 42;
        const list3 = LinkedList.from([7, 8, 9]);
        const values = [...list1].concat(value2, [...list3]);
        const newList = list1.concat(value2, list3);
        expect([...newList]).toEqual(values);
    });
});

describe('LinkedList', () => {
    it('should ', () => {
        const primes = primeGeneratorLimit(10);
        const list = LinkedList.from(primes);
        // console.log(list);

        // expect({}).toBeUndefined();
    });
});
