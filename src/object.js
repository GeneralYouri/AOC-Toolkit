/**
 * Creates an iterable from object
 * @param {Object} object - The object to create the iterator from
 */
export const makeObjectIterable = (object) => {
    return {
        * [Symbol.iterator]() {
            for (const key of Object.keys(object)) {
                const value = object[key];
                yield [key, value];
            }
        },
    };
};
