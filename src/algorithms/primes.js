// A low-level primality check that simply iterates all possible divisors
export const isPrime = (n) => {
    if (n === 2 || n === 3 || n === 5) {
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

// An infinite generator for the collection of prime numbers
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
