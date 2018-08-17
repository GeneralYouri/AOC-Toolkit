/**
 * Split the given string on the carriage return + line feed character combo (CRLF)
 * @param {string} input - The string to split up
 * @returns {string[]}
 */
export const splitCRLF = input => input.split(/\r\n/g);

/**
 * Split the given string on the line feed character (LF)
 * @param {string} input - The string to split up
 * @returns {string[]}
 */
export const splitLF = input => input.split(/\n/g);

/**
 * Split the given string on the tab character
 * @param {string} input - The string to split up
 * @returns {string[]}
 */
export const splitTab = input => input.split(/\t/g);
