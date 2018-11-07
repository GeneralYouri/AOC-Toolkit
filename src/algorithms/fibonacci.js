// An abstract constructor for a Fibonacci Generator, allowing variations in the starting numbers and the next number calculation
export const createFibonacciGenerator = function createFibonacciGenerator(baseA = 0, baseB = 1, next = (a, b) => a + b) {
    return function* fibonacciGenerator(limit = Number.POSITIVE_INFINITY) {
        let n1 = baseA;
        let n2 = baseB;

        while (n2 <= limit) {
            yield n2;

            ([n1, n2] = [n2, next(n1, n2)]);
        }
    };
};

// An infinite generator for the Fibonacci sequence
export const fibonacciGenerator = createFibonacciGenerator();

// A variant of the infinite generator for the Fibonacci sequence, returning only the even numbers
export const evenFibonacciGenerator = createFibonacciGenerator(0, 2, (a, b) => a + 4 * b);
