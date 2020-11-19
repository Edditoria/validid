import cnid from './cnid.coffee'
import twid from './twid.coffee'
import twrc from './twrc.coffee'
import hkid from './hkid.coffee'
import krid from './krid.coffee'

import normalize from './utils/normalize.coffee'
import isDateValid from './utils/is-date-valid.coffee'
import getMaxDate from './utils/get-max-date.coffee'
import isTwidChecksumValid from './utils/is-twid-checksum-valid.coffee'

###*
Throw an error when validid.tools is called. This is a temporarily function in v2.
###
depreciatedError = ->
	throw new Error('validid.tools is depreciated. Please use validid.utils instead')
	return null

validid = -> return null

validid.utils = {
	normalize: normalize
	isDateValid: isDateValid
	getMaxDate: getMaxDate
	isTwidChecksumValid: isTwidChecksumValid
}
#todo: Remove in v3
validid.tools = {
	normalize: depreciatedError
	isDateValid: depreciatedError
	getMaxDate: depreciatedError
	isTwidChecksumValid: depreciatedError
}

validid.cnid = cnid
validid.twid = twid
validid.twrc = twrc
validid.hkid = hkid
validid.krid = krid

export default validid
