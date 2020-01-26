import normalize from '../utils/normalize'

###*
Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers)
@module core/twrc
@param {string} id
@return {boolean}

Format of the id: AB12345678

In Taiwan, there is another system called National Identification Card
@see module:core/twid
###
export default (id) ->

	isLengthValid = (id) -> id.length is 10

	isFormatValid = (id) -> /^[A-Z][A-D][0-9]{8}$/.test(id)

	isChecksumValid = (id) ->
		idLen = id.length
		# Each letter represents a value from [10..35]
		letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
		letterIndex = letters.indexOf(id[0])
		weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1)
		weightedSum += letters.indexOf(id[1]) * (idLen - 2)
		idTail = id.slice(2) # Drop the letters
		weight = idLen - 3 # Minus letter digit and check digit
		for char in idTail
			weightedSum += +char * weight
			weight--
		remainder = (weightedSum + +id.slice(-1)) % 10
		return remainder is 0

	id = normalize(id)
	return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
