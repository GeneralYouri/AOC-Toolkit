// An abstract constructor for functions to get the value of any index in the given figurate sequence
export const createGetFigurate = function createGetFigurate(order) {
    // assert order >= 2
    return index => index * ((order - 2) * index + (4 - order)) / 2;
};

// Functions to get the value of a given index in some of the Figurate sequences
export const getNatural = createGetFigurate(2);
export const getTriangular = createGetFigurate(3);
export const getSquare = createGetFigurate(4);
export const getPentagonal = createGetFigurate(5);
export const getHexagonal = createGetFigurate(6);

// An abstract constructor for a Figurate Generator, allowing the generation of figurate sequences of various orders (such as triangular, square, pentagonal, etc)
export const createFigurateGenerator = function createFigurateGenerator(order = 3) {
    // assert order >= 2
    return function* figurateGenerator(limit = Number.POSITIVE_INFINITY) {
        let n = 1;
        let delta = 1;
        let delta2 = order - 2;
        while (n <= limit) {
            yield n;
            delta += delta2;
            n += delta;
        }
    }
};

// Infinite generators for some of the Figurate sequences
export const naturalGenerator = createFigurateGenerator(2);
export const triangularGenerator = createFigurateGenerator(3);
export const squareGenerator = createFigurateGenerator(4);
export const pentagonalGenerator = createFigurateGenerator(5);
export const hexagonalGenerator = createFigurateGenerator(6);

// TODO: Try and generalize these solutions into isFigurate(o, x)
export const isTriangular = (x) => {
    const n = (Math.sqrt(8 * x + 1) - 1) / 2;
    return Math.floor(n) === n;
};
export const isSquare = (x) => {
    const n = (Math.sqrt(1 * x + 0) + 0) / 1;
    return Math.floor(n) === n;
};
export const isPentagonal = (x) => {
    const n = (Math.sqrt(24 * x + 1) + 1) / 6;
    return Math.floor(n) === n;
};
export const isHexagonal = (x) => {
    const n = (Math.sqrt(8 * x + 1) + 1) / 4;
    return Math.floor(n) === n;
};
export const isHeptagonal = (x) => {
    const n = (Math.sqrt(40 * x + 9) + 3) / 10;
    return Math.floor(n) === n;
};
export const isOctagonal = (x) => {
    const n = (Math.sqrt(3 * x + 1) + 1) / 3;
    return Math.floor(n) === n;
};
export const isNonagonal = (x) => {
    const n = (Math.sqrt(56 * x + 25) + 5) / 14;
    return Math.floor(n) === n;
};


// An abstract constructor for functions to get the value of any index in the given simplex sequence
export const createGetSimplexN = function createGetSimplexN(order = 3) {
    // assert order >= 0
    return (index) => {
        let n = 1;
        let divider = 1;

        for (let o = 0; o < order; o += 1) {
            n *= index + o;
            divider *= o + 1;
        }

        return n / divider;
    };
};

// Functions to get the value of a given index in some of the Simplex sequences
// export const getOne = createGetSimplexN(0);
// export const getNatural = createGetSimplexN(1);
// export const getTriangular = createGetSimplexN(2);
export const getTetrahedral = createGetSimplexN(3);
export const getPentatope = createGetSimplexN(4);
export const getSimplex5 = createGetSimplexN(5);

// An abstract constructor for a Simplex Generator, allowing the generation of simplex sequences of various orders (such as triangular, tetrahedral, etc)
export const createSimplexNGenerator = function createSimplexNGenerator(order = 2) {
    // assert order >= 0
    return function* simplexNGenerator(limit = Number.POSITIVE_INFINITY) {
        const getSimplexN = createGetSimplexN(order);
        for (let i = 1; true; i += 1) {
            const n = getSimplexN(i);
            if (n >= limit) {
                return;
            }
            yield n;
        }
    };
};

// Infinite generators for some of the Simplex sequences
// export const oneGenerator = createSimplexNGenerator(0);
// export const naturalGenerator = createSimplexNGenerator(1);
// export const triangularGenerator = createSimplexNGenerator(2);
export const tetrahedralGenerator = createSimplexNGenerator(3);
export const pentatopeGenerator = createSimplexNGenerator(4);
export const simplex5Generator = createSimplexNGenerator(5);
