import normalize from './utils/normalize'

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

	isLengthValid = (id) -> id.length is 10

	isFormatValid = (id) -> /^[A-Z][12][0-9]{8}$/.test(id)

	isChecksumValid = (id) ->
		idLen = id.length
		# Each letter represents a value from [10..35]
		letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
		letterIndex = letters.indexOf(id[0])
		weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1)
		idTail = id.slice(1) # Drop the letter
		weight = idLen - 2 # Minus letter digit and check digit
		for char in idTail
			weightedSum += +char * weight
			weight--
		# Note: the check digit of 'id' is weighted 0
		remainder = (weightedSum + +id.slice(-1)) % 10
		return remainder is 0

	id = normalize(id)
	return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
