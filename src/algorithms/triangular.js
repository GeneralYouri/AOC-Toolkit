// An abstract constructor for functions to get the value of any index in the given figurate sequence
export const createGetFigurate = function createGetFigurate(order) {
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
export const createGetSimplexN = createGetFigurate;

// Functions to get the value of a given index in some of the Figurate sequences
export const getOne = createGetFigurate(0);
export const getNatural = createGetFigurate(1);
export const getTriangular = createGetFigurate(2);
export const getTetrahedral = createGetFigurate(3);
export const getPentatope = createGetFigurate(4);
export const getSimplex5 = createGetSimplexN(5);

// An abstract constructor for a Figurate Generator, allowing the generation of figurate sequences of various orders (such as triangular, tetrahedral, etc)
export const createFigurateGenerator = function createFigurateGenerator(order = 3) {
    return function* triangularGenerator(limit = Number.POSITIVE_INFINITY) {
        const getFigurate = createGetFigurate(order);
        for (let i = 1; true; i += 1) {
            const n = getFigurate(i);
            if (n >= limit) {
                return;
            }
            yield n;
        }
    };
};
export const createSimplexNGenerator = createFigurateGenerator;

// Infinite generators for some of the Figurate sequences
export const oneGenerator = createFigurateGenerator(0);
export const naturalGenerator = createFigurateGenerator(1);
export const triangularGenerator = createFigurateGenerator(2);
export const tetrahedralGenerator = createFigurateGenerator(3);
export const pentatopeGenerator = createFigurateGenerator(4);
export const simplex5Generator = createSimplexNGenerator(5);
