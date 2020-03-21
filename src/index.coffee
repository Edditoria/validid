import cnid from './cnid'
import twid from './twid'
import twrc from './twrc'
import hkid from './hkid'
import krid from './krid'

import normalize from './utils/normalize'
import isDateValid from './utils/is-date-valid'
import getMaxDate from './utils/get-max-date'

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
}
#todo: Remove in v3
validid.tools = {
	normalize: depreciatedError
	isDateValid: depreciatedError
	getMaxDate: depreciatedError
}

validid.cnid = cnid
validid.twid = twid
validid.twrc = twrc
validid.hkid = hkid
validid.krid = krid

export default validid
