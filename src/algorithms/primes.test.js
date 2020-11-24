import { isPrime, primeGenerator, getPrimeFactorsMap } from './primes';

/** TODO:
 * isPrimeWheel30
 * powMod
 * isPrimeMR
 * primeGenerator
 * primeGeneratorLimit
 * PrimeSieve
 * getUniquePrimeFactors
 * getDivisorCount
 * getDivisorSum
 */

describe('isPrime', () => {
    it('should recognise primality when a prime is input', () => {
        expect(isPrime(2)).toBe(true);
        expect(isPrime(3)).toBe(true);
        expect(isPrime(5)).toBe(true);
        expect(isPrime(7)).toBe(true);
        expect(isPrime(11)).toBe(true);
        expect(isPrime(7919)).toBe(true); // #1k
        expect(isPrime(15485863)).toBe(true); // #1m
        expect(isPrime(2147483647)).toBe(true); // Mersenne #8: 2^31-1
        expect(isPrime(22801763489)).toBe(true); // #1b
        expect(isPrime(252097800623)).toBe(true); // #10b
    });

    it('should recognise the absence of primality when a non-prime is input', () => {
        expect(isPrime(-1)).toBe(false);
        expect(isPrime(0)).toBe(false);
        expect(isPrime(1)).toBe(false);
        expect(isPrime(4)).toBe(false);
        expect(isPrime(9)).toBe(false);
        expect(isPrime(Number.MAX_SAFE_INTEGER)).toBe(false);
    });
});

xdescribe('getPrimeFactorsMap', () => {
    it('should ', () => {
        const primeList = [];
        const primes = primeGenerator();
        let prime = primes.next().value;
        while (prime < 1000000) {
            primeList.push(prime);
            prime = primes.next().value;
        }

        let count = 0;
        for (let n = 0; n < 1000000; n += 1) {
            if (getPrimeFactorsMap(n, primeList).size === 1) {
                count += 1;
            }

        }
        // TODO
        // console.log(count);
        // expect(count).toBe(1280);
        // expect(count).toBe(9700);
        expect(count).toBe(78734);
    });
});
