###*
Check if the date is reasonably valid

@module utils/is-date-valid
@param {string} idDate  - Should be in format of 'YYYYMMDD'
@param {string} minDate - Should be in format of 'YYYYMMDD'
@param {string} maxDate - Can be either 'YYYYMMDD' or a Date() object
@return {boolean}

Processes includes:
- Check day and month
- Is not a future date
- Is between minDate and maxDate
- Any step is false, will interrupt and return false

Note about the default minDate:
- Assuming that only a living person can register for something
- Providing ID number for a dead person is NOT the case
- So, minDate is the birth date of world's "living" person verified
- NOT a dead person who does not act on internet
- Source: https://en.wikipedia.org/wiki/Oldest_people
###
export default (idDate, minDate = 'default', maxDate = 'today') ->

	if minDate is 'default' or minDate is '' then minDate = '18991129'

	# 1. Check and parse idDate and minDate
	isFormatValid = (date) ->
		typeof date is 'string' and /^[0-9]{8}$/.test(date)
	if !isFormatValid(idDate) then return false
	if !isFormatValid(minDate) then return false

	###*
	Check if the date is valid. Also will return false if it is a future date.
	@param {string} input - In format of 'YYYYMMDD'
	@return {Object|boolean} Return false asap, else return a Date obj
	###
	parseDate = (input) ->
		startIndex = 0
		year = +input.substring(startIndex, startIndex += 4) # number
		month = input.substring(startIndex, startIndex += 2) # string
		day = +input.substring(startIndex, startIndex += 2) # number
		date = new Date(year, +month - 1, day) # a Date object

		# 2. Is day valid?
		maxDay = # Do not use Array.indexOf() because of the suck IE
			if '01,03,05,07,08,10,12'.indexOf(month) >= 0 then 31
			else if '04,06,09,11'.indexOf(month) >= 0 then 30
			else
				isLeapYear = (year % 4 is 0 and year % 100 isnt 0) or (year % 400 is 0)
				if isLeapYear then 29
				else 28
		isDayValid = day > 0 and day <= maxDay
		if !isDayValid then return false

		# 3. Is month valid?
		isMonthValid = +month > 0 and +month <= 12
		if !isMonthValid then return false

		# 4. Is date a future date?
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

	# 5. Finally, check if the idDate falls between minDate and maxDate
	return (idDate >= minDate) and (idDate <= maxDate)
