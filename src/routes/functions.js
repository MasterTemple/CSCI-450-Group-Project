// TODO: we should let the user set this
const MAX_LINE_LENGTH = 20;

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
	if (!shouldSplitLine(str))
		return [str];
	const middle = Math.floor(str.length / 2);
	let offset = 0;
	while (offset < str.length - middle) {
		if (DIVIDING_CHARACTERS.includes(str.charAt(middle + offset))) {
			// if(str.charAt(middle + offset) == " ") {
			return [str.slice(0, middle + offset), str.slice(middle + offset + 1)];
		}
		else if (DIVIDING_CHARACTERS.includes(str.charAt(middle - offset))) {
			// else if(str.charAt(middle - offset) == " ") {
			return [str.slice(0, middle - offset), str.slice(middle - offset + 1)];
		}
		offset++;
	}
	return [str];
}

/**
 * @template T
 * @param {T[]} arr
 * @param {T} value
 * @param {Number} index
 * @returns {T[]}
 */
export function insertAtIndex(arr, value, index) {
	let front = arr.slice(0, index);
	let back = arr.slice(index);
	return [...front, value, ...back];
}



/**
 * @template T
 * @param {T[]} arr
 * @param {Number} index
 * @returns {T[]}
 */
export function removeAtIndex(arr, index) {
	if (index == undefined)
		return arr;
	let front = arr.slice(0, index);
	let back = arr.slice(index + 1);
	return [...front, ...back];
}


/**
 * @param {Array<String>} lyricLines
 * @returns {Array<Array<String>>}
 */
export function convertLyricLinesToSlides(lyricLines) {
	let slides = [];
	let thisSlide = [];
	for (let line of lyricLines) {
		thisSlide.push(line.text);
		if (line.divider == true) {
			slides.push(thisSlide);
			thisSlide = [];
		}
	}
	if (thisSlide.length)
		slides.push(thisSlide);
	return slides;
}


export function max(a, b) {
	return a < b ? b : a;
}

export function min(a, b) {
	return a > b ? b : a;
}
