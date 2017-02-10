###
Validid is open source in:
https://github.com/Edditoria/validid

under MIT license:
https://github.com/Edditoria/validid/blob/master/LICENSE.md
###

class Validid

  tools:
    normalize: (id) ->
      # make id toUpperCase
      # remove '(' and ')' at the end of the string
      id = id.toUpperCase()
      re = /\([A-Z0-9]\)$/
      if re.test(id) then id = id.replace(/\(|\)/g, '')
      id

  cnid: (id) ->
    # the 2nd generation of China ID Card
    # format of card ID: LLLLLLYYYYMMDD000X
    isChecksumValid = (id) ->
      # adapts ISO 7064:1983.MOD 11-2
      identifier = id.slice(0, -1)
      checkDigit = if id.slice(-1) is 'X' then 10 else +id.slice(-1)
      getWeight = (n) -> Math.pow(2, n - 1) % 11
      weightedSum = 0
      index = id.length
      for char in identifier
        weightedSum += +char * getWeight(index)
        index--
      remainder = (12 - weightedSum % 11) % 11 - checkDigit
      remainder is 0
    isChecksumValid(id)


  hkid: (id) ->
    # format of HKID: X123456(A) or XY123456(A)

    getLetterValue = (letter) ->
      # charCode = { A: 65, B: 66... Z: 90 }
      # HKID:    = { A:  1, B:  2... Z: 26 }
      # diff = 64
      letter.charCodeAt(0) - 64

    isLetter = (char) ->
      /[a-zA-Z]/.test(char)

    isLengthValid = (id) ->
      id.length is 8 or id.length is 9

    isAllCharValid = (id) ->
      # isFormatValid() includes this checking
      # but will be useful for providing error msg
      # note: assume all characters are uppercase
      !/[^A-Z0-9]/.test(id)

    isFormatValid = (id) ->
      /^[A-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)

    isChecksumValid = (id) ->
      # check digit algorithm is variation of the ISBN-10 check digit algorithm
      # for each character (except the last digit): character * weight
      # weight from largest to smallest (1)
      weight = id.length
      weightedSum = 0
      identifier = id.slice(0, -1)
      checkDigit = if id.slice(-1) is 'A' then 10 else +id.slice(-1)
      for char in identifier
        charValue = if isLetter(char) then getLetterValue(char) else +char
        weightedSum += charValue * weight
        weight--
      remainder = (weightedSum + checkDigit) % 11
      remainder is 0

    id = @tools.normalize(id)
    isLengthValid(id) and isAllCharValid(id) and isFormatValid(id) and isChecksumValid(id)


  twid: (id) ->
    # format of Taiwan ID: A123456789

    isLengthValid = (id) ->
      id.length is 10

    isFormatValid = (id) ->
      /^[A-Z][0-9]{9}$/.test(id)

    isChecksumValid = (id) ->
      idLen = id.length
      # each letter represents value from [10..35]
      letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
      letterIndex = letters.indexOf(id[0]) + 10
      letterValue = Math.floor(letterIndex / 10) + (letterIndex % 10) * (idLen - 1)
      idTail = id.slice(1) # drop the letter
      weight = idLen - 2 # minus letter digit and check digit
      weightedSum = 0
      for char in idTail
        weightedSum += +char * weight
        weight--
      # note: the check digit of 'id' is weighted 0
      remainder = (letterValue + weightedSum + +id.slice(-1)) % 10
      remainder is 0

    id = @tools.normalize(id)
    isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)

validid = new Validid()

if module? and module.exports
  module.exports = validid
if window?
  window.validid = validid
