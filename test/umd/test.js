/**
 * Validid is a Javascript library to validate ID Card numbers of China, Taiwan, Hong Kong and South Korea.
 * Validid is open source in:
 * https://github.com/Edditoria/validid
 * 
 * @author Edditoria
 * @license MIT
 * Code released under the MIT license:
 * https://github.com/Edditoria/validid/blob/master/LICENSE.txt
 * 
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function test (testData, validid) {
    var errors, i, len, obj, result, results, summary;
    results = [];
    errors = [];

    for (i = 0, len = testData.length; i < len; i++) {
      obj = testData[i];
      result = validid[obj.cardType](obj.id) === obj.expect;
      results.push(result);

      if (!result) {
        errors.push(obj);
      }
    }

    summary = "- Total ".concat(results.length, " test(s)\n- Contains ").concat(errors.length, " error(s)");
    return {
      errors: errors,
      summary: summary
    };
  }

  var data = [{
    // Hong Kong ID
    // ============
    id: 'G123456A',
    cardType: 'hkid',
    expect: true
  }, {
    id: 'A5555550',
    cardType: 'hkid',
    expect: true
  }, {
    id: 'C5678909',
    cardType: 'hkid',
    expect: true // modify from Caring and Sharing Scheme sample (2019)

  }, {
    id: 'AB9876543',
    cardType: 'hkid',
    expect: true
  }, {
    id: 'WX1234569',
    cardType: 'hkid',
    expect: true // from repo PR5

  }, {
    // fail test: length
    id: 'A123456',
    cardType: 'hkid',
    expect: false
  }, {
    id: 'AB12345678',
    cardType: 'hkid',
    expect: false
  }, {
    // fail test: characters and format
    id: '01234560',
    cardType: 'hkid',
    expect: false
  }, {
    id: 'A555555X',
    cardType: 'hkid',
    expect: false
  }, {
    id: 'AXXXXXX0',
    cardType: 'hkid',
    expect: false
  }, {
    id: 'A12345670',
    cardType: 'hkid',
    expect: false
  }, {
    // fail test: checksum
    id: 'C668668E',
    cardType: 'hkid',
    expect: false // src: SCMP

  }, {
    id: 'C5678901',
    cardType: 'hkid',
    expect: false // copy from Caring and Sharing Scheme sample (2019)

  }, {
    id: 'Z6833655',
    cardType: 'hkid',
    expect: false // src: Wikipedia

  }, {
    id: 'Z6833672',
    cardType: 'hkid',
    expect: false // src: immd.gov.hk

  }, {
    // false test: other impossible ID, e.g. according to practice
    id: 'O1234561',
    cardType: 'hkid',
    expect: false // no ID starting with "O"

  }, {
    // Taiwan National Identification Card
    // ===================================
    id: 'A123456789',
    cardType: 'twid',
    expect: true
  }, {
    id: 'M115187864',
    cardType: 'twid',
    expect: true
  }, {
    id: 'Z256783650',
    cardType: 'twid',
    expect: true
  }, {
    // fail test: length
    id: 'A12345678',
    cardType: 'twid',
    expect: false
  }, {
    id: 'A1234567890',
    cardType: 'twid',
    expect: false
  }, {
    // fail test: characters and format
    id: 'A12345678X',
    cardType: 'twid',
    expect: false
  }, {
    id: 'AXXXXXXXX9',
    cardType: 'twid',
    expect: false
  }, {
    id: '0123456789',
    cardType: 'twid',
    expect: false
  }, {
    // fail test: gender (2nd character has to be 1 or 2)
    id: 'D012345678',
    cardType: 'twid',
    expect: false
  }, {
    id: 'C987654321',
    cardType: 'twid',
    expect: false
  }, {
    id: 'E345678901',
    cardType: 'twid',
    expect: false
  }, {
    // fail test: checksum
    id: 'A234567890',
    cardType: 'twid',
    expect: false // src: Apple Daily TW

  }, {
    // Taiwan Resident Certificate
    // ===========================
    // New UID format from 2021
    id: 'A800000014',
    cardType: 'twrc',
    expect: true // immigration.gov.tw

  }, {
    id: 'A823456783',
    cardType: 'twrc',
    expect: true // self created ID

  }, {
    id: 'A923456785',
    cardType: 'twrc',
    expect: true // self created ID

  }, {
    // Legacy UID format before 2021 but still valid
    id: 'AB12345677',
    cardType: 'twrc',
    expect: true
  }, {
    id: 'AC12345679',
    cardType: 'twrc',
    expect: true
  }, {
    id: 'AB00207171',
    cardType: 'twrc',
    expect: true // from repo PR4

  }, {
    id: 'AC03095424',
    cardType: 'twrc',
    expect: true // from repo PR4

  }, {
    id: 'BD01300667',
    cardType: 'twrc',
    expect: true // from repo PR4

  }, {
    id: 'CC00151114',
    cardType: 'twrc',
    expect: true // src: Wikimedia Commons

  }, {
    id: 'HD02717288',
    cardType: 'twrc',
    expect: true // from repo PR4

  }, {
    id: 'TD00251124',
    cardType: 'twrc',
    expect: true // from repo PR4

  }, {
    // fail test: length
    id: 'AB1234566',
    cardType: 'twrc',
    expect: false
  }, {
    id: 'AB123456780',
    cardType: 'twrc',
    expect: false
  }, {
    // fail test: characters and format
    id: 'A12345678X',
    cardType: 'twrc',
    expect: false
  }, {
    id: 'AB1234567X',
    cardType: 'twrc',
    expect: false
  }, {
    id: 'ABC1234567',
    cardType: 'twrc',
    expect: false
  }, {
    // fail test: gender (2nd character has to be [A-D])
    id: 'AE12345673',
    cardType: 'twrc',
    expect: false
  }, {
    id: 'YZ50000001',
    cardType: 'twrc',
    expect: false // src: Taiwan News

  }, {
    // fail test: checksum
    id: 'AB12345670',
    cardType: 'twrc',
    expect: false
  }, {
    id: 'AD12345678',
    cardType: 'twrc',
    expect: false // src: Wikipedia

  }, {
    id: 'HC12345678',
    cardType: 'twrc',
    expect: false // src: Taiwan News

  }, {
    // China Resident Identity Card
    // ============================
    id: '11010120170210193X',
    cardType: 'cnid',
    expect: true
  }, {
    id: '120103198806018241',
    cardType: 'cnid',
    expect: true
  }, {
    id: '310101200001013948',
    cardType: 'cnid',
    expect: true
  }, {
    id: '810000199408230021',
    cardType: 'cnid',
    expect: true // src: Wikipedia

  }, {
    id: '830000199201300022',
    cardType: 'cnid',
    expect: true // src: Wikipedia

  }, {
    // fail test: length
    id: '98765432101234567',
    cardType: 'cnid',
    expect: false
  }, {
    id: '9876543210123456789',
    cardType: 'cnid',
    expect: false
  }, {
    // fail test: characters and format
    id: '110102YYYYMMDD888X',
    cardType: 'cnid',
    expect: false
  }, {
    id: '98765432101234567A',
    cardType: 'cnid',
    expect: false
  }, {
    id: 'A87654321012345678',
    cardType: 'cnid',
    expect: false
  }, {
    // fail test: date and future date
    id: '110101188606258888',
    cardType: 'cnid',
    expect: true
  }, {
    id: '110101188606248882',
    cardType: 'cnid',
    expect: false
  }, {
    id: '11010120200101888X',
    cardType: 'cnid',
    expect: true //todo update every year

  }, {
    id: '110101202012128881',
    cardType: 'cnid',
    expect: false //todo update every year

  }, {
    // fail test: checksum
    id: '110102197810272321',
    cardType: 'cnid',
    expect: false
  }, {
    // South Korea Resident Registration Number
    // ========================================
    id: '781030-5668081',
    cardType: 'krid',
    expect: true
  }, {
    id: '951103-5438151',
    cardType: 'krid',
    expect: true
  }, {
    id: '700623-2711917',
    cardType: 'krid',
    expect: true
  }, {
    // fail test: length
    id: '781030-566805',
    cardType: 'krid',
    expect: false
  }, {
    id: '781030-56680810',
    cardType: 'krid',
    expect: false
  }, {
    // fail test: characters and format
    id: 'YYMMDD-0123456',
    cardType: 'krid',
    expect: false
  }, {
    id: '010101-S123456',
    cardType: 'krid',
    expect: false
  }, {
    id: '010101-0bbbb56',
    cardType: 'krid',
    expect: false
  }, {
    id: '010101-01234N6',
    cardType: 'krid',
    expect: false
  }, {
    id: '010101-012345C',
    cardType: 'krid',
    expect: false
  }, {
    // fail test: date and future date
    id: '030101-3234561',
    cardType: 'krid',
    expect: true //todo age 17 in 2019 (update every year)

  }, {
    id: '031231-3234567',
    cardType: 'krid',
    expect: false //todo age 16 in 2019 (update every year)

  }, {
    id: '991128-9123457',
    cardType: 'krid',
    expect: false // date before 18991129

  }, {
    id: '991129-9123451',
    cardType: 'krid',
    expect: true // date before 18991129

  }, {
    id: '190101-3234563',
    cardType: 'krid',
    expect: false // false year, 2017

  }, {
    id: '191231-3234569',
    cardType: 'krid',
    expect: false // false year, future date

  }, {
    id: '990001-1234568',
    cardType: 'krid',
    expect: false // false month

  }, {
    id: '991301-1234561',
    cardType: 'krid',
    expect: false // false month

  }, {
    id: '990100-1234560',
    cardType: 'krid',
    expect: false // false day

  }, {
    id: '990132-1234561',
    cardType: 'krid',
    expect: false // false day

  }, {
    // fail test: checksum
    id: '980123-1234567',
    cardType: 'krid',
    expect: false
  }];

  /**
  Normalize an ID by:
  - id.toUpperCase()
  - Remove '-' and '/' at any position
  - Remove whitespace
  - Remove '(' and ')' at the end of the string, e.g. 'A123456(0)'

  @module utils/normalize
  @param {string} id
  @return {string} Normalized ID
  */
  function normalize (id) {
    var re;
    re = /[-\/\s]/g;
    id = id.toUpperCase().replace(re, '');
    re = /\([A-Z0-9]\)$/;

    if (re.test(id)) {
      id = id.replace(/[\(\)]/g, '');
    }

    return id;
  }

  /**
  Check if the date is reasonably valid

  @module utils/is-date-valid
  @param {string} idDate  - Should be in format of 'YYYYMMDD'
  @param {string} minDate - Should be in format of 'YYYYMMDD'
  @param {string} maxDate - Can be either 'YYYYMMDD' or a Date() object
  @return {boolean}

  Processes includes:
  - Check day and month
  - Is not a future date
  - Is between minDate and maxDate
  - Any step is false, will interrupt and return false

  Note about the default minDate:
  - Assuming that only a living person can register for something
  - Providing ID number for a dead person is NOT the case
  - So, minDate is the birth date of world's "living" person verified
  - NOT a dead person who does not act on internet
  - Source: https://en.wikipedia.org/wiki/Oldest_people
  */
  function isDateValid (idDate) {
    var minDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
    var maxDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'today';

    /**
    Check if the date is valid. Also will return false if it is a future date.
    @param {string} input - In format of 'YYYYMMDD'
    @return {Object|boolean} Return false asap, else return a Date obj
    */
    var isFormatValid, parseDate;

    if (minDate === 'default' || minDate === '') {
      minDate = '18991129';
    } // 1. Check and parse idDate and minDate


    isFormatValid = function isFormatValid(date) {
      return typeof date === 'string' && /^[0-9]{8}$/.test(date);
    };

    if (!isFormatValid(idDate)) {
      return false;
    }

    if (!isFormatValid(minDate)) {
      return false;
    }

    parseDate = function parseDate(input) {
      var date, day, isDayValid, isFutureDate, isLeapYear, isMonthValid, maxDay, month, startIndex, year;
      startIndex = 0;
      year = +input.substring(startIndex, startIndex += 4); // number

      month = input.substring(startIndex, startIndex += 2); // string

      day = +input.substring(startIndex, startIndex += 2); // number

      date = new Date(year, +month - 1, day); // a Date object
      // 2. Is day valid?

      maxDay = '01,03,05,07,08,10,12'.indexOf(month) >= 0 ? 31 : '04,06,09,11'.indexOf(month) >= 0 ? 30 : (isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0, isLeapYear ? 29 : 28); // Do not use Array.indexOf() because of the suck IE

      isDayValid = day > 0 && day <= maxDay;

      if (!isDayValid) {
        return false;
      } // 3. Is month valid?


      isMonthValid = +month > 0 && +month <= 12;

      if (!isMonthValid) {
        return false;
      } // 4. Is date a future date?


      isFutureDate = new Date() < date;

      if (isFutureDate) {
        return false;
      } // else case


      return date; // Date object
    };

    idDate = parseDate(idDate);

    if (idDate === false) {
      return false;
    }

    minDate = parseDate(minDate);

    if (minDate === false) {
      return false;
    }

    maxDate = maxDate === 'today' ? new Date() : typeof maxDate === 'string' ? parseDate(maxDate) : maxDate;

    if (maxDate === false) {
      return false;
    } // 5. Finally, check if the idDate falls between minDate and maxDate


    return idDate >= minDate && idDate <= maxDate;
  }

  /**
  Validate ID card number of China (2nd generation)
  @module core/cnid
  @param {string} id
  @return {boolean}

  Original name: Resident Identity Card of the People's Republic of China (PRC)
  Format of card id: LLLLLLYYYYMMDD000X
  */

  function cnid (id) {
    var isChecksumValid, isFormatValid, isThisDateValid; // isLengthValid = (id) -> id.length is 18

    isFormatValid = function isFormatValid(id) {
      return /^[0-9]{17}[0-9X]$/.test(id);
    }; // Assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
    // Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive


    isThisDateValid = function isThisDateValid(id) {
      return isDateValid(id.substring(6, 14), '18860625');
    }; // Adapts ISO 7064:1983.MOD 11-2


    isChecksumValid = function isChecksumValid(id) {
      var char, checkDigit, getWeight, i, identifier, index, len, remainder, weightedSum;
      identifier = id.slice(0, -1);
      checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1);

      getWeight = function getWeight(n) {
        return Math.pow(2, n - 1) % 11;
      };

      weightedSum = 0;
      index = id.length;

      for (i = 0, len = identifier.length; i < len; i++) {
        char = identifier[i];
        weightedSum += +char * getWeight(index);
        index--;
      }

      remainder = (12 - weightedSum % 11) % 11 - checkDigit;
      return remainder === 0;
    };

    id = normalize(id); // return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)

    return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
  }

  /**
  Validate checksum for TWID and TWRC.
  @module utils/is-twid-checksum-valid
  @param {string} id - The whole ID including checksum.
  @param {string} letterNum - Manually put how many letter(s) in the ID: Either 1 or 2.
  @return {boolean}
  */
  function isTwidChecksumValid (id, letterNum) {
    var char, i, idLen, idLetters, idNumbers, len, letterIndex, letters, remainder, weight, weightedSum;
    idLetters = id.slice(0, letterNum);
    idNumbers = id.slice(letterNum); // ID in format of 'AA0000000C' or 'A00000000C'

    idLen = 10; // fixed
    // Each letter represents a value from [10..35]

    letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'; // weightedSum for idLetters

    letterIndex = letters.indexOf(idLetters[0]);
    weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1);

    if (letterNum === 2) {
      weightedSum += letters.indexOf(idLetters[1]) * (idLen - 2);
    } // weightedSum for idNumbers


    weight = idLen - idLetters.length - 1; // Minus letter digit and check digit

    for (i = 0, len = idNumbers.length; i < len; i++) {
      char = idNumbers[i];
      weightedSum += +char * weight;
      weight--;
    } // Note: the check digit of 'idNumbers' is weighted 0


    remainder = (weightedSum + +idNumbers.slice(-1)) % 10;
    return remainder === 0;
  }

  /**
  Validate ID card number of Taiwan
  @module core/twid
  @param {string} id
  @return {boolean}

  Original name: National Identification Card of the Republic of China
  Format of card id: A123456789

  There is another system called Taiwan Resident Certificate (Uniform ID Numbers)
  @see module:core/twrc
  */

  function twid (id) {
    var isFormatValid; // isLengthValid = (id) -> id.length is 10

    isFormatValid = function isFormatValid(id) {
      return /^[A-Z][12][0-9]{8}$/.test(id);
    };

    id = normalize(id); // return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id, 1)

    return isFormatValid(id) && isTwidChecksumValid(id, 1);
  }

  /**
  Check if the format of TWRC is old (before 2021), new (from 2021) or invalid.
  @param {string} id - Expect the ID is normalized.
  @return {string|boolean} - Either 'old', 'new' or false.
  */
  function getTwrcFormat (id) {
    if (/^[A-Z][A-D][0-9]{8}$/.test(id)) {
      return 'old';
    }

    if (/^[A-Z][89][0-9]{8}$/.test(id)) {
      return 'new';
    }

    return false;
  }

  /**
  Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
  @module core/twrc
  @param {string} id
  @return {boolean}

  Format of the id:
  - A123456789 (new ID in 2020)
  - AB12345678 (legacy but still valid)

  In Taiwan, there is another system called National Identification Card
  @see module:core/twid
  */

  function twrc (id) {
    /** @type {string|boolean} - Either 'new', 'old' or false */
    var idFormat; // isLengthValid = (id) -> id.length is 10

    id = normalize(id);
    idFormat = getTwrcFormat(id);

    if (idFormat === 'old') {
      return isTwidChecksumValid(id, 2);
    }

    if (idFormat === 'new') {
      return isTwidChecksumValid(id, 1);
    } // else: idFormat is false


    return false;
  }

  /**
  Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
  Only validate ID in or before 2020.
  @module core/twrc
  @param {string} id
  @return {boolean}

  Format of the id: AB12345678

  In Taiwan, there is another system called National Identification Card
  @see module:core/twid-legacy
  */

  function twrcLegacy (id) {
    var isFormatValid; // isLengthValid = (id) -> id.length is 10

    isFormatValid = function isFormatValid(id) {
      return /^[A-Z][A-D][0-9]{8}$/.test(id);
    };

    id = normalize(id); // return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id, 2)

    return isFormatValid(id) && isTwidChecksumValid(id, 2);
  }

  /**
  Validate ID card number of Hong Kong
  @module core/hkid
  @param {string} id
  @return {boolean}

  Format of card id: X123456(A) or XY123456(A)
  */

  function hkid (id) {
    /*
    charCode = { A: 65, B: 66... Z: 90 }
    HKID     = { A: 10, B: 11... Z: 35 }
    Therefore, diff = 55
    */

    /*
    Check digit algorithm is variation of the ISBN-10 check digit algorithm
    For each character (except the last digit): character * weight
    Weight from largest to smallest (1)
    If ID is 8 character long, a space is added to the beginning
    Value of space is 36, hence 36 * 9 = 324
    */
    var getLetterValue, isChecksumValid, isFormatValid, isLetter;

    getLetterValue = function getLetterValue(letter) {
      return letter.charCodeAt(0) - 55;
    };

    isLetter = function isLetter(char) {
      return /[a-zA-Z]/.test(char);
    }; // isLengthValid = (id) -> id.length is 8 or id.length is 9


    isFormatValid = function isFormatValid(id) {
      return /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id);
    };

    isChecksumValid = function isChecksumValid(id) {
      var char, charValue, checkDigit, i, identifier, len, remainder, weight, weightedSum;
      weight = id.length;
      weightedSum = weight === 8 ? 324 : 0;
      identifier = id.slice(0, -1);
      checkDigit = id.slice(-1) === 'A' ? 10 : +id.slice(-1);

      for (i = 0, len = identifier.length; i < len; i++) {
        char = identifier[i];
        charValue = isLetter(char) ? getLetterValue(char) : +char;
        weightedSum += charValue * weight;
        weight--;
      }

      remainder = (weightedSum + checkDigit) % 11;
      return remainder === 0;
    };

    id = normalize(id); // return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)

    return isFormatValid(id) && isChecksumValid(id);
  }

  /**
  Calculate the expected birthday by providing year only
  Useful for putting maxDate in isDateValid()

  @module utils/get-max-date
  @param {number} yearsOld - Should be a whole number
  @return {Object} An Date() object
  */
  function getMaxDate (yearsOld) {
    var now, year;
    now = new Date();
    year = now.getFullYear() - yearsOld;
    return new Date(year, now.getMonth(), now.getDate());
  }

  /**
  Validate ID card number of South Korea
  @module core/krid
  @param {string} id
  @return {boolean}

  Original name: Resident Registration Number (RRN)
  Format of card id: YYMMDD-SBBBBNC
  */

  function krid (id) {
    var isChecksumValid, isFormatValid, isThisDateValid; // isLengthValid = (id) -> id.length is 13

    isFormatValid = function isFormatValid(id) {
      return /^[0-9]{13}$/.test(id);
    }; // Parse the date into 'YYYYMMDD' according to 'S' digit


    isThisDateValid = function isThisDateValid(id) {
      var date, maxDate, sDigit, yearPrefix;
      sDigit = id.substring(6, 7);

      yearPrefix = function () {
        switch (sDigit) {
          case '1':
          case '2':
          case '5':
          case '6':
            return '19';

          case '3':
          case '4':
          case '7':
          case '8':
            return '20';

          default:
            return '18';
        }
      }();

      date = yearPrefix + id.substring(0, 6);
      maxDate = getMaxDate(17); // 17 years old to register for an ID

      return isDateValid(date, 'default', maxDate);
    };

    isChecksumValid = function isChecksumValid(id) {
      var char, i, index, len, remainder, weight, weightedSum;
      weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 0 // 0 is added for check digit
      ];
      weightedSum = 0;
      index = 0;

      for (i = 0, len = id.length; i < len; i++) {
        char = id[i];
        weightedSum += +char * weight[index];
        index++;
      }

      remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1);
      return remainder === 0;
    };

    id = normalize(id); // return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)

    return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
  }

  /**
  Throw an error when validid.tools is called. This is a temporarily function in v2.
  */
  var depreciatedError, validid;

  depreciatedError = function depreciatedError() {
    throw new Error('validid.tools is depreciated. Please use validid.utils instead');
  };

  validid = function validid() {
    return null;
  };

  validid.utils = {
    normalize: normalize,
    isDateValid: isDateValid,
    getMaxDate: getMaxDate,
    isTwidChecksumValid: isTwidChecksumValid,
    getTwrcFormat: getTwrcFormat
  }; //todo: Remove in v3

  validid.tools = {
    normalize: depreciatedError,
    isDateValid: depreciatedError,
    getMaxDate: depreciatedError,
    isTwidChecksumValid: depreciatedError,
    getTwrcFormat: depreciatedError
  };
  validid.cnid = cnid;
  validid.twid = twid;
  validid.twrc = twrc;
  validid.hkid = hkid;
  validid.krid = krid;
  validid.twrcLegacy = twrcLegacy;
  var validid$1 = validid;

  var results;
  results = test(data, validid$1); // return {errors, summary}

  console.log(results.summary);

  if (results.errors.length !== 0) {
    console.log(results.errors);
    throw new Error("Test fail. Process exit now.");
  }

})));
