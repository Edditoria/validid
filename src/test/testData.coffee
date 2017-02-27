testData = [
  {'id': 'G123456A', cardType: 'hkid', expect: true}
  {'id': 'A5555550', cardType: 'hkid', expect: true}
  {'id': 'AB9876542', cardType: 'hkid', expect: true}
  {'id': 'A123456789', cardType: 'twid', expect: true}
  {'id': 'M115187864', cardType: 'twid', expect: true}
  {'id': 'Z256783650', cardType: 'twid', expect: true}
  {'id': '11010120170210193X', cardType: 'cnid', expect: true}
  {'id': '310101200001013948', cardType: 'cnid', expect: true}
  {'id': '120103198806018241', cardType: 'cnid', expect: true}
  {'id': '120103198806018241', cardType: 'cnid', expect: true}
  {'id': '781030-5668081', cardType: 'krid', expect: true}
  {'id': '951103-5438151', cardType: 'krid', expect: true}
  {'id': '700623-2711917', cardType: 'krid', expect: true}
]

if module? and module.exports
  module.exports = testData
if window?
  window.testData = testData
