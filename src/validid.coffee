###*
Validid is a Javascript library to validate ID Card numbers of China, Taiwan, Hong Kong and South Korea.
Validid is open source in:
https://github.com/Edditoria/validid

@author Edditoria
@license MIT
Code released under the MIT license:
https://github.com/Edditoria/validid/blob/master/LICENSE.txt
###

import cnid from './core/cnid'
import twid from './core/twid'
import twrc from './core/twrc'
import hkid from './core/hkid'
import krid from './core/krid'

import normalize from './utils/normalize'
import isDateValid from './utils/is-date-valid'
import getMaxDate from './utils/get-max-date'

class Validid

	tools:
		normalize: normalize
		isDateValid: isDateValid
		getMaxDate: getMaxDate

	cnid: cnid
	twid: twid
	twrc: twrc
	hkid: hkid
	krid: krid

validid = new Validid()

export default validid
