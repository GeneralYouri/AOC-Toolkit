// A low-level primality test by trial division; iterating all possible divisors, filtered using wheel-30 factorization
export const isPrimeWheel30 = (n) => {
    if ([2, 3, 5].includes(n)) {
        return true;
    }
    if (n < 2 || (n & 1) === 0 || n % 3 === 0 || n % 5 === 0) {
        return false;
    }

    const sqrt = Math.trunc(Math.sqrt(n));
    const deltas = [0, 4, 6, 10, 12, 16, 22, 24];

    for (let divisor = 7; divisor <= sqrt; divisor += 30) {
        for (let i = 0; i < deltas.length; i += 1) {
            if (n % (divisor + deltas[i]) === 0) {
                return false;
            }
        }
    }

    return true;
};

// c = (b^e) % m
const powMod = (a, b, m) => {
    if (m === 1) {
        return 0;
    }

    let c = 1;
    a %= m;
    while (b > 0) {
        if ((b & 1) === 1) {
            c = (c * a) % m;
        }
        a = (a * a) % m;
        b >>= 1;
    }
    return c;
};

// Miller-Rabin primality test
const A = [2, 7, 61];
export const isPrimeMR = (n) => {
    if (n < 3) {
        return n === 2;
    }
    if (A.includes(n)) {
        return true;
    }

    let r = 0;
    let d = n - 1;
    let newD = Math.trunc(d / 2);
    while (newD * 2 === d) {
        r += 1;
        d = newD;
        newD = Math.trunc(d / 2);
    }

    for (const a of A) {
        let x = powMod(a, d, n);
        if (x === 1 || x === n - 1) {
            continue;
        }

        let finished = true;
        for (let i = 0; i < r - 1; i += 1) {
            x = (x * x) % n;
            if (x === n - 1) {
                finished = false;
                break;
            }
        }
        if (finished) {
            return false;
        }
    }
    return true;
};

// TODO: Is this useful?
// BigInt version of Miller-Rabin primality test
//
// // c = (b^e) % m
// const powModBigInt = (a, b, m) => {
//     if (m === 1n) {
//         return 0n;
//     }
//
//     let c = 1n;
//     a %= m;
//     while (b > 0n) {
//         if ((b & 1n) === 1n) {
//             c = (c * a) % m;
//         }
//         a = (a * a) % m;
//         b >>= 1n;
//     }
//     return c;
// };
//
// // Miller-Rabin primality test
// const ABigInt = [2n, 7n, 61n];
// export const isPrimeMRBigInt = (n) => {
//     if (n < 3n) {
//         return n === 2n;
//     }
//
//     let r = 0;
//     let d = n - 1n;
//     let newD = d >> 1n;
//     while (newD << 1n === d) {
//         r += 1;
//         d = newD;
//         newD = d >> 1n;
//     }
//
//     for (const a of A) {
//         let x = powModBigInt(a, d, n);
//         if (x === 1n || x === n - 1n) {
//             continue;
//         }
//
//         let finished = true;
//         for (let i = 0; i < r - 1; i += 1) {
//             x = (x * x) % n;
//             if (x === n - 1n) {
//                 finished = false;
//                 break;
//             }
//         }
//         if (finished) {
//             return false;
//         }
//     }
//     return true;
// };

const lowerLimit = 100000;
const upperLimit = 94906265; // Math.trunc(Math.sqrt(Number.MAX_SAFE_INTEGER));
export const isPrime = (n, allowBigInt) => {
    if (n < lowerLimit) {
        return isPrimeWheel30(n);
    } else if (n < upperLimit) {
        return isPrimeMR(n);
    // } else if (allowBigInt) {
    //     return isPrimeMRBigInt(BigInt(n));
    } else {
        return isPrimeWheel30(n);
    }
};


// An infinite generator of prime numbers, using wheel-30 factorization with a simple primality check by trial division
export const primeGenerator = function* primeGenerator() {
    yield 2;
    yield 3;
    yield 5;

    const deltas = [0, 4, 6, 10, 12, 16, 22, 24];
    for (let base = 7; true; base += 30) {
        for (let i = 0; i < deltas.length; i += 1) {
            const candidate = base + deltas[i];
            if (isPrime(candidate)) {
                yield candidate;
            }
        }
    }
};

// A function returning only a given limited number of primes from the given generator
export const primeGeneratorLimit = (limit, primes = null) => {
    if (primes === null) {
        primes = primeGenerator();
    }

    const primeList = [];
    for (const prime of primes) {
        if (prime > limit) {
            return primeList;
        }
        primeList.push(prime);
    }
    return primeList;
};


// An implementation of the Sieve of Eratosthenes, to generate all prime numbers below a given limit
/** @see http://www.luschny.de/math/factorial/scala/FactorialScalaCsharp.htm */
export class PrimeSieve {
    constructor(n) {
        this.bitsPerInt = 32;
        this.mask = this.bitsPerInt - 1;
        this.log2Int = 5;
        this.sieveLen = 0;

        this.PrimesOnBits = [1762821248, 848611808, 3299549660, 2510511646];
        this.isComposite = null;
        this.init(n);
    }

    init(n) {
        this.sieveLen = n;
        if (n < 386) {
            this.isComposite = this.PrimesOnBits;
            return;
        }

        this.isComposite = Array.from(Array(Math.floor(n / (3 * this.bitsPerInt) + 1)));
        let d1 = 8;
        let d2 = 8;
        let p1 = 3;
        let p2 = 7;
        let s = 7;
        let s2 = 3;
        let l = 0;
        let c = 1;
        const max = Math.floor(n / 3);
        let inc = 0;
        let toggle = false;

        while (s < max) {
            if ((this.isComposite[l >> this.log2Int] & (1 << (l & this.mask))) === 0) {
                inc = p1 + p2;
                for (c = s; c < max; c += inc) {
                    this.isComposite[c >> this.log2Int] |= 1 << (c & this.mask);
                }
                for (c = s + s2; c < max; c += inc) {
                    this.isComposite[c >> this.log2Int] |= 1 << (c & this.mask);
                }
            }
            l += 1;
            toggle = !toggle;
            if (toggle) {
                s += d2;
                d1 += 16;
                p1 += 2;
                p2 += 2;
                s2 = p2;
            } else {
                s += d1;
                d2 += 8;
                p1 += 2;
                p2 += 6;
                s2 = p1;
            }
        }
    }

    iterator(min, max, visitor) {
        if (min < 2) {
            min = 2;
        }
        if (max > this.sieveLen) {
            throw new Error('Max larger than sieve.');
        }

        if (min <= 2 && max >= 2) {
            visitor(2);
        }
        if (min <= 3 && max >= 3) {
            visitor(3);
        }

        const absPos = Math.trunc((min + (min + 1) % 2) / 3 - 1);
        let index = Math.trunc(absPos / this.bitsPerInt);
        let bitPos = Math.trunc(absPos % this.bitsPerInt);
        let toggle = (bitPos & 1) === 1;
        let prime = 5 + 3 * (this.bitsPerInt * index + bitPos) - (bitPos & 1);

        while (prime <= max) {
            let bitField = this.isComposite[index] >> bitPos;
            index += 1;
            while (bitPos < this.bitsPerInt) {
                if ((bitField & 1) === 0) {
                    visitor(prime);
                }
                toggle = !toggle;
                prime += toggle ? 2 : 4;
                if (prime > max) {
                    return;
                }
                bitField >>= 1;
                bitPos += 1;
            }
            bitPos = 0;
        }
    }
}

// Returns a map with all prime factors of n
export const getPrimeFactorsMap = (n, primes = null) => {
    if (n < 2) {
        return new Map();
    }
    if (isPrime(n)) {
        return new Map([[n, 1]]);
    }

    if (primes === null) {
        primes = primeGenerator();
    }

    const factors = new Map();
    let remaining = n;
    for (const prime of primes) {
        if (remaining % prime === 0) {
            let hits = 0;
            do {
                remaining /= prime;
                hits += 1;
            } while (remaining % prime === 0);
            factors.set(prime, hits);

            if (remaining === 1) {
                break;
            }
        }
    }
    return factors;
};

// Returns an array with all unique prime factors of n
export const getUniquePrimeFactors = (n, primes = null) => {
    if (n < 2) {
        return [];
    }
    if (isPrime(n)) {
        return [n];
    }

    if (primes === null) {
        primes = primeGenerator();
    }

    const factors = [];
    let remaining = n;
    for (const prime of primes) {
        if (remaining % prime === 0) {
            do {
                remaining /= prime;
            } while (remaining % prime === 0);
            factors.push(prime);

            if (remaining === 1) {
                break;
            }
        }
    }

    if (remaining !== 1) {
        factors.push(remaining);
    }
    return factors;
};

// Returns the number of divisors of n
export const getDivisorCount = (n, primes = null) => {
    if (n < 2) {
        return 1;
    }
    // if (isPrime(n)) {
    //     return 2;
    // }

    if (primes === null) {
        primes = primeGenerator();
    }

    let count = 1;
    let remaining = n;

    for (const prime of primes) {
        if (remaining % prime === 0) {
            let hits = 0;
            do {
                remaining /= prime;
                hits += 1;
            } while (remaining % prime === 0);
            if (hits > 0) {
                count *= hits + 1;
            }

            if (remaining === 1) {
                break;
            }
        }
    }
    return count;
};

// TODO: Implement a smarter, faster approach
// Returns the sum of divisors of n
const getDivisorSum = (n) => {
    const sqrt = Math.sqrt(n);
    // If n has an integer sqrt, add it to the sum, but only once
    let sum = Math.ceil(sqrt) ** 2 === n ? sqrt : 0;

    // If n is odd, there are no even divisors
    const delta = n % 2 + 1;
    // Iterate all remaining divisors up to (but not including) sqrt
    for (let i = 2; i < sqrt; i += delta) {
        const div = n / i;
        if (Math.trunc(div) === div) {
            sum += i + div;
        }
    }

    // 1 and n are skipped, but we do want to count 1
    return sum + 1;
};

// TODO: Is this useful? May not be suited for JS
// A more complete implementation of powMod
//
// const maxBits = 16;
// const maxUint = 1 << maxBits - 1;
//
// // c = (a + b) % m
// const addMod = (a, b, m) => {
//     a %= m;
//     b %= m;
//     return (a >= m - b) ? a - (m - b) : a + b;
// };
//
// // c = (a - b) % m
// const subMod = (a, b, m) => {
//     a %= m;
//     b %= m;
//     return (a < b) ? a + (m - b) : a - b;
// };
//
// const lShift16Mod = (a, m) => {
//     a %= m;
//     const m0 = m & maxUint;
//     const m1 = m >> maxBits;
//     const q = a / (m1 + 1);
//     const q0 = q & maxUint;
//     const q1 = q >> maxBits;
//     const p = q0 * m0;
//     let p0 = p & maxUint;
//     const p1 = p >> maxBits;
//     a -= p1 + q0 * m1 + q1 * m0 + ((q1 * m1) << maxBits);
//     while (a > maxUint) {
//         p0 += m0;
//         a -= m1;
//     }
//     return subMod(a << maxBits, p0, m);
// };
//
// // c = (a * b) % m
// const mulMod = (a, b, m) => {
//     const a0 = a & maxUint;
//     const a1 = a >> maxBits;
//     const b0 = b & maxUint;
//     const b1 = b >> maxBits;
//     const p0 = a0 * b0;
//     const p1 = addMod(a0 * b1, a1 * b0, m);
//     const p2 = a1 * b1;
//     return addMod(p0, lShift16Mod(addMod(p1, lShift16Mod(p2, m), m), m), m);
// };
//
// // c = (b^e) % m
// const powMod = (a, b, m) => {
//     if (m === 1) {
//         return 0;
//     }
//
//     let c = 1;
//     a %= m;
//     while (b > 0) {
//         if ((b & 1) === 1) {
//             c = mulMod(c, a, m);
//         }
//         a = mulMod(a, a, m);
//         b >>= 1;
//     }
//     return c;
// };
