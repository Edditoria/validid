import normalize from './utils/normalize.mjs';

import getFormat from './utils/get-twrc-format.mjs';

import isChecksumValid from './utils/is-twid-checksum-valid.mjs';

/**
Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
@module core/twrc
@param {string} id
@return {boolean}

Format of the id:
- A123456789 (new ID in 2020)
- AB12345678 (legacy but still valid)

In Taiwan, there is another system called National Identification Card
@see module:core/twid
*/
export default function (id) {
	/** @type {string|boolean} - Either 'new', 'old' or false */
	var idFormat;
	// isLengthValid = (id) -> id.length is 10
	id = normalize(id);
	idFormat = getFormat(id);
	if (idFormat === 'old') {
		return isChecksumValid(id, 2);
	}
	if (idFormat === 'new') {
		return isChecksumValid(id, 1);
	}
	// else: idFormat is false
	return false;
}
