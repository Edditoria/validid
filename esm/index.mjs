/**
Throw an error when validid.tools is called. This is a temporarily function in v2.
*/
var depreciatedError, validid;

import cnid from './cnid.mjs';

import twid from './twid.mjs';

import twrc from './twrc.mjs';

import twrcLegacy from './twrc-legacy.mjs';

import hkid from './hkid.mjs';

import krid from './krid.mjs';

import normalize from './utils/normalize.mjs';

import isDateValid from './utils/is-date-valid.mjs';

import getMaxDate from './utils/get-max-date.mjs';

import getTwrcFormat from './utils/get-twrc-format.mjs';

import isTwidChecksumValid from './utils/is-twid-checksum-valid.mjs';

depreciatedError = function () {
	throw new Error(
		'validid.tools is depreciated. Please use validid.utils instead'
	);
	return null;
};

validid = function () {
	return null;
};

validid.utils = {
	normalize: normalize,
	isDateValid: isDateValid,
	getMaxDate: getMaxDate,
	isTwidChecksumValid: isTwidChecksumValid,
	getTwrcFormat: getTwrcFormat,
};

//todo: Remove in v3
validid.tools = {
	normalize: depreciatedError,
	isDateValid: depreciatedError,
	getMaxDate: depreciatedError,
	isTwidChecksumValid: depreciatedError,
	getTwrcFormat: depreciatedError,
};

validid.cnid = cnid;

validid.twid = twid;

validid.twrc = twrc;

validid.hkid = hkid;

validid.krid = krid;

validid.twrcLegacy = twrcLegacy;

export default validid;
