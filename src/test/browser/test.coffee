import test from '../shared/main'
import data from '../shared/data'

# import validid from './validid.browser.coffee'

unless window?
	console.warn 'Suppose this test runs on a browser'
	throw new Error('Process exit now.')

unless validid?
	throw new Error('Cannot find validid')

results = test(data, validid) # return {errors, summary}

console.log results.summary
if results.errors.length isnt 0
	console.log 'Here are the errors:'
	console.log results.errors
