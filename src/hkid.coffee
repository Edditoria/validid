import normalize from './utils/normalize.coffee'

###*
Validate ID card number of Hong Kong
@module core/hkid
@param {string} id
@return {boolean}

Format of card id: X123456(A) or XY123456(A)
###
export default (id) ->

	###
	charCode = { A: 65, B: 66... Z: 90 }
	HKID     = { A: 10, B: 11... Z: 35 }
	Therefore, diff = 55
	###
	getLetterValue = (letter) -> letter.charCodeAt(0) - 55

	isLetter = (char) -> /[a-zA-Z]/.test(char)

	# isLengthValid = (id) -> id.length is 8 or id.length is 9

	isFormatValid = (id) -> /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)

	###
	Check digit algorithm is variation of the ISBN-10 check digit algorithm
	For each character (except the last digit): character * weight
	Weight from largest to smallest (1)
	If ID is 8 character long, a space is added to the beginning
	Value of space is 36, hence 36 * 9 = 324
	###
	isChecksumValid = (id) ->
		weight = id.length
		weightedSum = if weight is 8 then 324 else 0
		identifier = id.slice(0, -1)
		checkDigit = if id.slice(-1) is 'A' then 10 else +id.slice(-1)
		for char in identifier
			charValue = if isLetter(char) then getLetterValue(char) else +char
			weightedSum += charValue * weight
			weight--
		remainder = (weightedSum + checkDigit) % 11
		return remainder is 0

	id = normalize(id)
	# return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
	return isFormatValid(id) and isChecksumValid(id)
