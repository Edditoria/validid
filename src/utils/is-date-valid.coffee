export default (idDate, minDate = 'default', maxDate = 'today') ->
	# idDate, minDate should be in format 'YYYYMMDD'
	# maxDate can be 'YYYYMMDD' or a Date()
	# process:
	# - check day and month
	# - is not a future date
	# - is between minDate and maxDate
	# - any step is false, will interrupt and return false
	# !important note about the default minDate:
	# - assumed that only a living person can register for something
	# - providing ID number for a dead person is NOT the case
	# - so, minDate is the birth date of world's "living" person verified
	# - NOT a dead person who does not act on internet
	# - source: https://en.wikipedia.org/wiki/Oldest_people

	if minDate is 'default' or minDate is '' then minDate = '18991129'

	# 1. check and parse idDate and minDate
	isFormatValid = (date) ->
		typeof date is 'string' and /^[0-9]{8}$/.test(date)
	if !isFormatValid(idDate) then return false
	if !isFormatValid(minDate) then return false

	parseDate = (input) ->
		# input is string 'YYYYMMDD'
		# return false asap, else return a Date obj
		startIndex = 0
		year = +input.substring(startIndex, startIndex += 4) # number
		month = input.substring(startIndex, startIndex += 2) # string
		day = +input.substring(startIndex, startIndex += 2) # number
		date = new Date(year, +month - 1, day) # a Date object

		# 2. is day valid?
		maxDay = # do not use Array.indexOf() because of suck IE
			if '01,03,05,07,08,10,12'.indexOf(month) >= 0 then 31
			else if '04,06,09,11'.indexOf(month) >= 0 then 30
			else
				isLeapYear = (year % 4 is 0 and year % 100 isnt 0) or (year % 400 is 0)
				if isLeapYear then 29
				else 28
		isDayValid = day > 0 and day <= maxDay
		if !isDayValid then return false

		# 3. is month valid?
		isMonthValid = +month > 0 and +month <= 12
		if !isMonthValid then return false

		# 4. is date a future date?
		isFutureDate = new Date() < date
		if isFutureDate then return false

		# else case
		return date # Date object

	idDate = parseDate(idDate)
	if idDate is false then return false
	minDate = parseDate(minDate)
	if minDate is false then return false
	maxDate =
		if maxDate is 'today' then new Date()
		else if typeof maxDate is 'string' then parseDate(maxDate)
		else maxDate
	if maxDate is false then return false

	# 5. finally, check if the idDate falls between minDate and maxDate
	(idDate >= minDate) and (idDate <= maxDate)
