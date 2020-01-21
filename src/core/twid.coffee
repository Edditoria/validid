export default (id) ->
	# format of Taiwan ID: A123456789

	isLengthValid = (id) ->
		id.length is 10

	isFormatValid = (id) ->
		/^[A-Z][12][0-9]{8}$/.test(id)

	isChecksumValid = (id) ->
		idLen = id.length
		# each letter represents value from [10..35]
		letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
		letterIndex = letters.indexOf(id[0])
		weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1)
		idTail = id.slice(1) # drop the letter
		weight = idLen - 2 # minus letter digit and check digit
		for char in idTail
			weightedSum += +char * weight
			weight--
		# note: the check digit of 'id' is weighted 0
		remainder = (weightedSum + +id.slice(-1)) % 10
		remainder is 0

	id = @tools.normalize(id)
	isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
