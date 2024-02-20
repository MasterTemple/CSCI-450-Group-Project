// TODO: we should let the user set this
const MAX_LINE_LENGTH = 12;

const DIVIDING_CHARACTERS = [..." ,;."];

/**
 * @param {String} str - Check if a line should be split in half
 * @returns {Boolean}
 */
export function shouldSplitLine(str) {
    return str.length > MAX_LINE_LENGTH;
}

/**
 * @param {String} str - Split a string into 2 strings as equally as possible
 * @returns {Array<String>}
 */
export function splitLine(str) {
    const middle = Math.floor(str.length / 2);
    let offset = 0;
    while(offset < str.length - middle) {
        if(DIVIDING_CHARACTERS.includes(str.charAt(middle + offset))) {
        // if(str.charAt(middle + offset) == " ") {
                return [str.slice(0, middle + offset), str.slice(middle + offset + 1)];
        }
        else if(DIVIDING_CHARACTERS.includes(str.charAt(middle - offset))) {
        // else if(str.charAt(middle - offset) == " ") {
                return [str.slice(0, middle + offset), str.slice(middle + offset + 1)];
        }
        offset++;
    }
    return [str];
}