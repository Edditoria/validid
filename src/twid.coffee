import normalize from './utils/normalize.coffee'
import isChecksumValid from './utils/is-twid-checksum-valid.coffee'

###*
Validate ID card number of Taiwan
@module core/twid
@param {string} id
@return {boolean}

Original name: National Identification Card of the Republic of China
Format of card id: A123456789

There is another system called Taiwan Resident Certificate (Uniform ID Numbers)
@see module:core/twrc
###
export default (id) ->
	# isLengthValid = (id) -> id.length is 10
	isFormatValid = (id) -> /^[A-Z][12][0-9]{8}$/.test(id)

	id = normalize(id)
	# return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id, 1)
	return isFormatValid(id) and isChecksumValid(id, 1)
