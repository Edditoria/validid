testData = [
  {id: 'G123456A', cardType: 'hkid', expect: true}
  {id: 'A5555550', cardType: 'hkid', expect: true}
  {id: 'AB9876542', cardType: 'hkid', expect: true}
  {id: 'A123456789', cardType: 'twid', expect: true}
  {id: 'M115187864', cardType: 'twid', expect: true}
  {id: 'Z256783650', cardType: 'twid', expect: true}
  {id: '11010120170210193X', cardType: 'cnid', expect: true}
  {id: '120103198806018241', cardType: 'cnid', expect: true}
  {id: '310101200001013948', cardType: 'cnid', expect: true}
  {id: '781030-5668081', cardType: 'krid', expect: true}
  {id: '951103-5438151', cardType: 'krid', expect: true}
  {id: '700623-2711917', cardType: 'krid', expect: true}
  # fail test: length
  {id: '98765432101234567', cardType: 'cnid', expect: false}
  {id: '9876543210123456789', cardType: 'cnid', expect: false}
  # fail test: characters and format
  {id: '110102YYYYMMDD888X', cardType: 'cnid', expect: false}
  {id: '98765432101234567A', cardType: 'cnid', expect: false}
  {id: 'A87654321012345678', cardType: 'cnid', expect: false}
  # fail test: date and future date
  {id: '110101188606258888', cardType: 'cnid', expect: true}
  {id: '110101188606248882', cardType: 'cnid', expect: false}
  {id: '110101201701018886', cardType: 'cnid', expect: true} #todo to be dynamic
  {id: '110101201712128888', cardType: 'cnid', expect: false} #todo to be dynamic
  # fail test: checksum
  {id: '110102197810272321', cardType: 'cnid', expect: false}
]

if module? and module.exports
  module.exports = testData
if window?
  window.testData = testData
