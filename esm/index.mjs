import cnid from './cnid.mjs';
import hkid from './hkid.mjs';
import krid from './krid.mjs';
import twid, { TwidType, identifyTwidType } from './twid.mjs';
import twrc from './twrc.mjs';
import twrcLegacy from './twrc-legacy.mjs';

import { normalize } from './utils/normalize.mjs';
import isDateValid from './utils/is-date-valid.mjs';
import getMaxDate from './utils/get-max-date.mjs';
import getTwrcFormat from './utils/get-twrc-format.mjs';
import isTwidChecksumValid from './utils/is-twid-checksum-valid.mjs';

const validid = () => null;

validid.utils = {
	normalize,
	isDateValid,
	getMaxDate,
	isTwidChecksumValid,
	getTwrcFormat,
};

validid.cnid = cnid;
validid.hkid = hkid;
validid.krid = krid;
validid.twid = twid;
validid.twrc = twrc;
validid.twrcLegacy = twrcLegacy;
validid.TwidType = TwidType;
validid.identifyTwidType = identifyTwidType;

export { validid };

/**
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export `{ validid }`.
 */
const deprecated = validid;
export default deprecated;
