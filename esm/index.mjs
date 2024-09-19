import cnid from './cnid.mjs';
import hkid from './hkid.mjs';
import krid from './krid.mjs';
import twid from './twid.mjs';
import twrc from './twrc.mjs';
import twrcLegacy from './twrc-legacy.mjs';

import normalize from './utils/normalize.mjs';
import isDateValid from './utils/is-date-valid.mjs';
import getMaxDate from './utils/get-max-date.mjs';
import getTwrcFormat from './utils/get-twrc-format.mjs';
import isTwidChecksumValid from './utils/is-twid-checksum-valid.mjs';

/**
 * @file This file will be removed eventually.
 * Please update your code ASAP.
 * For details, read the `@deprecated` note in each function that you are using.
 */

/**
 * Default export for this package.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export from individual modules, e.g. `{ validateHkid }`.
 */
const validid = {
	cnid,
	hkid,
	krid,
	twid,
	twrc,
	twrcLegacy,
	utils: {
		normalize,
		isDateValid,
		getMaxDate,
		isTwidChecksumValid,
		getTwrcFormat,
	},
};

export default validid;
