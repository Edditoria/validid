import test from '../shared/main.coffee'
import data from '../shared/data.coffee'
import validid from '../../index.coffee'

results = test(data, validid) # return {errors, summary}

console.log results.summary
if results.errors.length isnt 0
	console.log results.errors
	throw new Error("Test fail. Process exit now.")
