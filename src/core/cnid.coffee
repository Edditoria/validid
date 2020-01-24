import normalize from '../utils/normalize'
import isDateValid from '../utils/is-date-valid'

export default (id) ->
	# the 2nd generation of China ID Card
	# format of card ID: LLLLLLYYYYMMDD000X

	isLengthValid = (id) ->
		id.length is 18

	isFormatValid = (id) ->
		/^[0-9]{17}[0-9X]$/.test(id)

	# assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
	# source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
	isThisDateValid = -> isDateValid(id.substring(6,14), '18860625')

	isChecksumValid = (id) ->
		# adapts ISO 7064:1983.MOD 11-2
		identifier = id.slice(0, -1)
		checkDigit = if id.slice(-1) is 'X' then 10 else +id.slice(-1)
		getWeight = (n) -> Math.pow(2, n - 1) % 11
		weightedSum = 0
		index = id.length
		for char in identifier
			weightedSum += +char * getWeight(index)
			index--
		remainder = (12 - weightedSum % 11) % 11 - checkDigit
		remainder is 0

	id = normalize(id)
	isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)
