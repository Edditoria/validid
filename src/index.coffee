###*
Validid is a Javascript library to validate ID Card numbers of China, Taiwan, Hong Kong and South Korea.
Validid is open source in:
https://github.com/Edditoria/validid

@author Edditoria
@license MIT
Code released under the MIT license:
https://github.com/Edditoria/validid/blob/master/LICENSE.txt
###

import cnid from './cnid'
import twid from './twid'
import twrc from './twrc'
import hkid from './hkid'
import krid from './krid'

import normalize from './utils/normalize'
import isDateValid from './utils/is-date-valid'
import getMaxDate from './utils/get-max-date'

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
