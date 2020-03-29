import normalize from './utils/normalize.coffee'
import getMaxDate from './utils/get-max-date.coffee'
import isDateValid from './utils/is-date-valid.coffee'

###*
Validate ID card number of South Korea
@module core/krid
@param {string} id
@return {boolean}

Original name: Resident Registration Number (RRN)
Format of card id: YYMMDD-SBBBBNC
###
export default (id) ->

	isLengthValid = (id) -> id.length is 13

	isFormatValid = (id) -> /^[0-9]{13}$/.test(id)

	# Parse the date into 'YYYYMMDD' according to 'S' digit
	isThisDateValid = (id) ->
		sDigit = id.substring(6,7)
		yearPrefix = switch sDigit
			when '1','2','5','6' then '19'
			when '3','4','7','8' then '20'
			else '18'
		date = yearPrefix + id.substring(0,6)
		maxDate = getMaxDate(17) # 17 years old to register for an ID
		return isDateValid(date, 'default', maxDate)

	isChecksumValid = (id) ->
		weight = [2,3,4,5,6,7,8,9,2,3,4,5,0] # 0 is added for check digit
		weightedSum = 0
		index = 0
		for char in id
			weightedSum += +char * weight[index]
			index++
		remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1)
		return remainder is 0

	id = normalize(id)
	return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)
