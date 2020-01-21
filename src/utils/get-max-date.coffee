export default (yearsOld) ->
	# yearsOld should be a whole number
	# return Date() object
	# useful for puting maxDate in isDateValid()
	now = new Date()
	year = now.getFullYear() - yearsOld
	new Date(year, now.getMonth(), now.getDate())
