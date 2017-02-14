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

    isLengthValid = (id) ->
      id.length is 18

    isFormatValid = (id) ->
      /^[0-9]{17}[0-9X]$/.test(id)

    isDateValid = (id) ->

      # check day, month and overall date ('YYYYMMDD')
      # any step is false, will interrupt and return false

      startIndex = 6
      # idDate = {year: YYYY, month: MM, day: DD} (the values are numbers)
      # removed because it is too long
      idYear = +id.substring(startIndex, startIndex += 4) # number
      idMonth = id.substring(startIndex, startIndex += 2) # string
      idDay = +id.substring(startIndex, startIndex += 2) # number
      idDate = new Date(idYear, +idMonth - 1, idDay) # a Date object

      # 1. Check idDay first
      maxDay = # do not use Array.indexOf() because of suck IE
        if '01,03,05,07,08,10,12'.indexOf(idMonth) >= 0 then 31
        else if '04,06,09,11'.indexOf(idMonth) >= 0 then 30
        else
          isLeapYear = (idYear % 4 is 0 and idYear % 100 isnt 0) or (idYear % 400 is 0)
          if isLeapYear then 29
          else 28
      isDayValid = idDay > 0 and idDay <= maxDay
      if !isDayValid then return false

      # 2. Check idMonth
      isMonthValid = +idMonth > 0 and +idMonth <= 12
      if !isMonthValid then return false

      # 3. Check if the date is not from future
      isFutureDate = Date.now() < idDate
      #todo: test in IE
      if isFutureDate then return false

      # 4. Check if the date is not too small
      # assume the oldest Chinese was born in 1885 and he had an ID card
      # source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
      oldestDate = new Date(1885, 7 - 1, 9) # birth date of Luo Meizhen
      #todo: test in IE
      if idDate < oldestDate then return false

      return true # finally, return true

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

    id = @tools.normalize(id)
    isLengthValid(id) and isFormatValid(id) and isDateValid(id) and isChecksumValid(id)


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
