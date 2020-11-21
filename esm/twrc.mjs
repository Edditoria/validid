import normalize from './utils/normalize.mjs';

import isChecksumValid from './utils/is-twid-checksum-valid.mjs';

/**
Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers)
@module core/twrc
@param {string} id
@return {boolean}

Format of the id: AB12345678

In Taiwan, there is another system called National Identification Card
@see module:core/twid
*/
export default function (id) {
	var isFormatValid;
	// isLengthValid = (id) -> id.length is 10
	isFormatValid = function (id) {
		return /^[A-Z][A-D][0-9]{8}$/.test(id);
	};
	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id, 2)
	return isFormatValid(id) && isChecksumValid(id, 2);
}
