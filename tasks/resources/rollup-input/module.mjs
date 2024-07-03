import hkid from '../../../esm/hkid.mjs';
import twid from '../../../esm/twid.mjs';
import twrc from '../../../esm/twrc.mjs';
import twrcLegacy from '../../../esm/twrc-legacy.mjs';
import krid from '../../../esm/krid.mjs';
import cnid from '../../../esm/cnid.mjs';

import normalize from '../../../esm/utils/normalize.mjs';
import isDateValid from '../../../esm/utils/is-date-valid.mjs';
import getMaxDate from '../../../esm/utils/get-max-date.mjs';
import getTwrcFormat from '../../../esm/utils/get-twrc-format.mjs';
import isTwidChecksumValid from '../../../esm/utils/is-twid-checksum-valid.mjs';

import * as utils from './utils.mjs';

export * from '../../../esm/hkid.mjs';
export * from '../../../esm/twid.mjs';
export * from '../../../esm/krid.mjs';
export * from '../../../esm/cnid.mjs';

export * from '../../../esm/response.mjs';
export { utils };

/**
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export from individual modules, e.g. `{ validateHkid }`.
 */
const validid = {
	hkid,
	twid,
	twrc,
	twrcLegacy,
	krid,
	cnid,
	utils: {
		normalize,
		isDateValid,
		getMaxDate,
		isTwidChecksumValid,
		getTwrcFormat,
	},
};

export default validid;
