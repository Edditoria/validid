export default (testData, validid) ->
	results = []
	errors = []

	for obj in testData
		result = validid[obj.cardType](obj.id) is obj.expect
		results.push(result)
		if !result then errors.push(obj)

	summary = """
		- Total #{results.length} test(s)
		- Contains #{errors.length} error(s)
	"""

	return { errors: errors, summary: summary }
