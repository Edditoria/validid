if module? and module.exports
  validid = require './../lib/validid.js'
  testData = require './testData.js'
if window?
  validid = window.validid
  testData = window.testData

results = []
errors = []

for obj in testData
  result = validid[obj.cardType](obj.id) is obj.expect
  results.push(result)
  if !result then errors.push(obj)

console.log """
  - Total #{results.length} test(s)
  - Contains #{errors.length} error(s)
"""
if errors.length isnt 0
  console.log errors
