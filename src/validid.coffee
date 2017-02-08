###
Validid is open source in:
https://github.com/Edditoria/validid

under MIT license:
https://github.com/Edditoria/validid/blob/master/LICENSE.md
###

class Validid

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

    isCharValid = (id) ->
      # isFormatValid() includes this checking
      # but will be useful for providing error msg
      /[a-zA-Z0-9]/.test(id)

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

    id = id.toUpperCase()
    isLengthValid(id) and isCharValid(id) and isFormatValid(id) and isChecksumValid(id)

validid = new Validid()

if module? and module.exports
  module.exports = validid
if window?
  window.validid = validid
