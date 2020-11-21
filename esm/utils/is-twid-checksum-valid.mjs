/**
Validate checksum for TWID and TWRC.
@module utils/is-twid-checksum-valid
@param {string} id - The whole ID including checksum.
@param {string} letterNum - Manually put how many letter(s) in the ID: Either 1 or 2.
@return {boolean}
*/
export default function (id, letterNum) {
	var char,
		i,
		idLen,
		idLetters,
		idNumbers,
		len,
		letterIndex,
		letters,
		remainder,
		weight,
		weightedSum;
	idLetters = id.slice(0, letterNum);
	idNumbers = id.slice(letterNum);
	// ID in format of 'AA0000000C' or 'A00000000C'
	idLen = 10; // fixed
	// Each letter represents a value from [10..35]
	letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
	// weightedSum for idLetters
	letterIndex = letters.indexOf(idLetters[0]);
	weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1);
	if (letterNum === 2) {
		weightedSum += letters.indexOf(idLetters[1]) * (idLen - 2);
	}
	// weightedSum for idNumbers
	weight = idLen - idLetters.length - 1; // Minus letter digit and check digit
	for (i = 0, len = idNumbers.length; i < len; i++) {
		char = idNumbers[i];
		weightedSum += +char * weight;
		weight--;
	}
	// Note: the check digit of 'idNumbers' is weighted 0
	remainder = (weightedSum + +idNumbers.slice(-1)) % 10;
	return remainder === 0;
}
