export default (id) ->
	# make id toUpperCase
	# remove '-' and '/' at any position
	# remove whitespace
	# remove '(' and ')' at the end of the string
	re = /[-\/\s]/g
	id = id.toUpperCase().replace(re, '')
	re = /\([A-Z0-9]\)$/
	if re.test(id) then id = id.replace(/[\(\)]/g, '')
	id
