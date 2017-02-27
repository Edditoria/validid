testData = [
  {'id': 'G123456A', cardType: 'hkid', expect: true}
  {'id': 'A5555550', cardType: 'hkid', expect: true}
  {'id': 'AB9876542', cardType: 'hkid', expect: true}
]

if module? and module.exports
  module.exports = testData
if window?
  window.validid = testData
