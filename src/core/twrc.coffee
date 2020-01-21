export default (id) ->
	# format of Taiwan Resident Certificate: AB12345678

	isLengthValid = (id) ->
		id.length is 10

	isFormatValid = (id) ->
		/^[A-Z][A-D][0-9]{8}$/.test(id)

	isChecksumValid = (id) ->
		idLen = id.length
		# each letter represents value from [10..35]
		letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
		letterIndex = letters.indexOf(id[0])
		weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1)
		weightedSum += letters.indexOf(id[1]) * (idLen - 2)
		idTail = id.slice(2) # drop the letters
		weight = idLen - 3 # minus letter digit and check digit
		for char in idTail
			weightedSum += +char * weight
			weight--
		remainder = (weightedSum + +id.slice(-1)) % 10
		remainder is 0

	id = @tools.normalize(id)
	isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
