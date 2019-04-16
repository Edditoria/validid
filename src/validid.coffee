###
Validid is open source in:
https://github.com/Edditoria/validid

under MIT license:
https://github.com/Edditoria/validid/blob/master/LICENSE.md
###

class Validid

  #
  #  #####  ####   ####  #       ####
  #    #   #    # #    # #      #
  #    #   #    # #    # #       ####
  #    #   #    # #    # #           #
  #    #   #    # #    # #      #    #
  #    #    ####   ####  ######  ####

  tools:
    normalize: (id) ->
      # make id toUpperCase
      # remove '-' and '/' at any position
      # remove whitespace
      # remove '(' and ')' at the end of the string
      re = /[-\/\s]/g
      id = id.toUpperCase().replace(re, '')
      re = /\([A-Z0-9]\)$/
      if re.test(id) then id = id.replace(/[\(\)]/g, '')
      id

    isDateValid: (idDate, minDate = 'default', maxDate = 'today') ->
      # idDate, minDate should be in format 'YYYYMMDD'
      # maxDate can be 'YYYYMMDD' or a Date()
      # process:
      # - check day and month
      # - is not a future date
      # - is between minDate and maxDate
      # - any step is false, will interrupt and return false
      # !important note about the default minDate:
      # - assumed that only a living person can register for something
      # - providing ID number for a dead person is NOT the case
      # - so, minDate is the birth date of world's "living" person verified
      # - NOT a dead person who does not act on internet
      # - source: https://en.wikipedia.org/wiki/Oldest_people

      if minDate is 'default' or minDate is '' then minDate = '18991129'

      # 1. check and parse idDate and minDate
      isFormatValid = (date) ->
        typeof date is 'string' and /^[0-9]{8}$/.test(date)
      if !isFormatValid(idDate) then return false
      if !isFormatValid(minDate) then return false

      parseDate = (input) ->
        # input is string 'YYYYMMDD'
        # return false asap, else return a Date obj
        startIndex = 0
        year = +input.substring(startIndex, startIndex += 4) # number
        month = input.substring(startIndex, startIndex += 2) # string
        day = +input.substring(startIndex, startIndex += 2) # number
        date = new Date(year, +month - 1, day) # a Date object

        # 2. is day valid?
        maxDay = # do not use Array.indexOf() because of suck IE
          if '01,03,05,07,08,10,12'.indexOf(month) >= 0 then 31
          else if '04,06,09,11'.indexOf(month) >= 0 then 30
          else
            isLeapYear = (year % 4 is 0 and year % 100 isnt 0) or (year % 400 is 0)
            if isLeapYear then 29
            else 28
        isDayValid = day > 0 and day <= maxDay
        if !isDayValid then return false

        # 3. is month valid?
        isMonthValid = +month > 0 and +month <= 12
        if !isMonthValid then return false

        # 4. is date a future date?
        isFutureDate = new Date() < date
        if isFutureDate then return false

        # else case
        return date # Date object

      idDate = parseDate(idDate)
      if idDate is false then return false
      minDate = parseDate(minDate)
      if minDate is false then return false
      maxDate =
        if maxDate is 'today' then new Date()
        else if typeof maxDate is 'string' then parseDate(maxDate)
        else maxDate
      if maxDate is false then return false

      # 5. finally, check if the idDate falls between minDate and maxDate
      (idDate >= minDate) and (idDate <= maxDate)

    getMaxDate: (yearsOld) ->
      # yearsOld should be a whole number
      # return Date() object
      # useful for puting maxDate in isDateValid()
      now = new Date()
      year = now.getFullYear() - yearsOld
      new Date(year, now.getMonth(), now.getDate())

  #   #####  #     # ### ######
  #  #     # ##    #  #  #     #
  #  #       # #   #  #  #     #
  #  #       #  #  #  #  #     #
  #  #       #   # #  #  #     #
  #  #     # #    ##  #  #     #
  #   #####  #     # ### ######

  cnid: (id) ->
    # the 2nd generation of China ID Card
    # format of card ID: LLLLLLYYYYMMDD000X

    isLengthValid = (id) ->
      id.length is 18

    isFormatValid = (id) ->
      /^[0-9]{17}[0-9X]$/.test(id)

    # assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
    # source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
    isDateValid = => @tools.isDateValid(id.substring(6,14), '18860625')

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
    isLengthValid(id) and isFormatValid(id) and isDateValid() and isChecksumValid(id)


  #
  #  ##### #    # # #####
  #    #   #    # # #    #
  #    #   #    # # #    #
  #    #   # ## # # #    #
  #    #   ##  ## # #    #
  #    #   #    # # #####

  twid: (id) ->
    # format of Taiwan ID: A123456789

    isLengthValid = (id) ->
      id.length is 10

    isFormatValid = (id) ->
      /^[A-Z][12][0-9]{8}$/.test(id)

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


  #
  #  #    # #    # # #####
  #  #    # #   #  # #    #
  #  ###### ####   # #    #
  #  #    # #  #   # #    #
  #  #    # #   #  # #    #
  #  #    # #    # # #####

  hkid: (id) ->
    # format of HKID: X123456(A) or XY123456(A)

    getLetterValue = (letter) ->
      # charCode = { A: 65, B: 66... Z: 90 }
      # HKID     = { A: 10, B: 11... Z: 35 }
      # diff = 55
      letter.charCodeAt(0) - 55

    isLetter = (char) ->
      /[a-zA-Z]/.test(char)

    isLengthValid = (id) ->
      id.length is 8 or id.length is 9

    isFormatValid = (id) ->
      /^[A-MP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)

    isChecksumValid = (id) ->
      # check digit algorithm is variation of the ISBN-10 check digit algorithm
      # for each character (except the last digit): character * weight
      # weight from largest to smallest (1)
      # if ID is 8 character long, a space is added to the beginning
      # value of space is 36, hence 36 * 9 = 324
      weight = id.length
      weightedSum = if weight is 8 then 324 else 0
      identifier = id.slice(0, -1)
      checkDigit = if id.slice(-1) is 'A' then 10 else +id.slice(-1)
      for char in identifier
        charValue = if isLetter(char) then getLetterValue(char) else +char
        weightedSum += charValue * weight
        weight--
      remainder = (weightedSum + checkDigit) % 11
      remainder is 0

    id = @tools.normalize(id)
    isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)


  #
  #  #    # #####  # #####
  #  #   #  #    # # #    #
  #  ####   #    # # #    #
  #  #  #   #####  # #    #
  #  #   #  #   #  # #    #
  #  #    # #    # # #####

  krid: (id) ->
    # format of South Korea ID card: YYMMDD-SBBBBNC

    isLengthValid = (id) ->
      id.length is 13

    isFormatValid = (id) ->
      /^[0-9]{13}$/.test(id)

    isDateValid = (id) =>
      # parse the date into 'YYYYMMDD' according to 'S' digit
      sDigit = id.substring(6,7)
      yearPrefix = switch sDigit
        when '1','2','5','6' then '19'
        when '3','4','7','8' then '20'
        else '18'
      date = yearPrefix + id.substring(0,6)
      maxDate = @tools.getMaxDate(17) # 17 years old to register for an ID
      @tools.isDateValid(date, 'default', maxDate)

    isChecksumValid = (id) ->
      weight = [2,3,4,5,6,7,8,9,2,3,4,5,0] # add 0 for check digit
      weightedSum = 0
      index = 0
      for char in id
        weightedSum += +char * weight[index]
        index++
      remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1)
      remainder is 0

    id = @tools.normalize(id)
    isLengthValid(id) and isFormatValid(id) and isDateValid(id) and isChecksumValid(id)


#
#  ###### #    # #####   ####  #####  #####
#  #       #  #  #    # #    # #    #   #
#  #####    ##   #    # #    # #    #   #
#  #        ##   #####  #    # #####    #
#  #       #  #  #      #    # #   #    #
#  ###### #    # #       ####  #    #   #

validid = new Validid()

if module? and module.exports
  module.exports = validid
if window?
  window.validid = validid
