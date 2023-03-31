import { cnid } from './cnid.mjs';
import { hkid } from './hkid.mjs';
import { krid } from './krid.mjs';
import { twid } from './twid.mjs';
import { twrc } from './twrc.mjs';
import { twrcLegacy } from './twrc-legacy.mjs';

import { normalize } from './utils/normalize.mjs';
import { isDateValid } from './utils/is-date-valid.mjs';
import { getMaxDate } from './utils/get-max-date.mjs';
import { getTWRCFormat } from './utils/get-twrc-format.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/**
 * Throw an error when validid.tools is called. This is a temporarily function in v2.
 */
const depreciatedError = function() {
	throw new Error('validid.tools is depreciated. Please use validid.utils instead');
};

const validid = () => null;

validid.utils = {
	normalize,
	isDateValid,
	getMaxDate,
	isTWIDChecksumValid,
	getTWRCFormat
};
//todo: Remove in v3
validid.tools = {
	normalize: depreciatedError,
	isDateValid: depreciatedError,
	getMaxDate: depreciatedError,
	isTWIDChecksumValid: depreciatedError,
	getTWRCFormat: depreciatedError
};

validid.cnid = cnid;
validid.hkid = hkid;
validid.krid = krid;
validid.twid = twid;
validid.twrc = twrc;
validid.twrcLegacy = twrcLegacy;

export { validid };
