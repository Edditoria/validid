import test from '../shared/main'
import data from '../shared/data'

unless window?
	console.warn 'Suppose this test runs on a browser'
	throw new Error('Process exit now.')

# Suppose window.validid is available
unless validid?
	throw new Error('Cannot find validid')

window.results = test(data, validid) # return {errors, summary}

console.log results.summary
document.getElementById('summary').innerHTML = results.summary

if results.errors.length is 0
	document.getElementById('summary').className = 'success'
else
	console.log 'Here are the errors:'
	console.log results.errors
	document.getElementById('summary').className = 'error'
	# Show error message by removing the class "hidden"
	document.getElementById('error-message').className = 'error'
