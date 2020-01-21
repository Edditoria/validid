export default (id) ->
	# format of South Korea ID card: YYMMDD-SBBBBNC

	isLengthValid = (id) ->
		id.length is 13

	isFormatValid = (id) ->
		/^[0-9]{13}$/.test(id)

	isDateValid = (id) =>
		# parse the date into 'YYYYMMDD' according to 'S' digit
		sDigit = id.substring(6,7)
		yearPrefix = switch sDigit
			when '1','2','5','6' then '19'
			when '3','4','7','8' then '20'
			else '18'
		date = yearPrefix + id.substring(0,6)
		maxDate = @tools.getMaxDate(17) # 17 years old to register for an ID
		@tools.isDateValid(date, 'default', maxDate)

	isChecksumValid = (id) ->
		weight = [2,3,4,5,6,7,8,9,2,3,4,5,0] # add 0 for check digit
		weightedSum = 0
		index = 0
		for char in id
			weightedSum += +char * weight[index]
			index++
		remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1)
		remainder is 0

	id = @tools.normalize(id)
	isLengthValid(id) and isFormatValid(id) and isDateValid(id) and isChecksumValid(id)
