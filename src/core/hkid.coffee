export default (id) ->
	# format of HKID: X123456(A) or XY123456(A)

	getLetterValue = (letter) ->
		# charCode = { A: 65, B: 66... Z: 90 }
		# HKID     = { A: 10, B: 11... Z: 35 }
		# diff = 55
		letter.charCodeAt(0) - 55

	isLetter = (char) ->
		/[a-zA-Z]/.test(char)

	isLengthValid = (id) ->
		id.length is 8 or id.length is 9

	isFormatValid = (id) ->
		/^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)

	isChecksumValid = (id) ->
		# check digit algorithm is variation of the ISBN-10 check digit algorithm
		# for each character (except the last digit): character * weight
		# weight from largest to smallest (1)
		# if ID is 8 character long, a space is added to the beginning
		# value of space is 36, hence 36 * 9 = 324
		weight = id.length
		weightedSum = if weight is 8 then 324 else 0
		identifier = id.slice(0, -1)
		checkDigit = if id.slice(-1) is 'A' then 10 else +id.slice(-1)
		for char in identifier
			charValue = if isLetter(char) then getLetterValue(char) else +char
			weightedSum += charValue * weight
			weight--
		remainder = (weightedSum + checkDigit) % 11
		remainder is 0

	id = @tools.normalize(id)
	isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
