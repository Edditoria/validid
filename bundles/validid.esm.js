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
  var isChecksumValid, isFormatValid, isLengthValid, isThisDateValid;

  isLengthValid = function isLengthValid(id) {
    return id.length === 18;
  };

  isFormatValid = function isFormatValid(id) {
    return /^[0-9]{17}[0-9X]$/.test(id);
  }; // Assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
  // Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive


  isThisDateValid = function isThisDateValid(id) {
    return isDateValid(id.substring(6, 14), '18860625');
  }; // Adapts ISO 7064:1983.MOD 11-2


  isChecksumValid = function isChecksumValid(id) {
    var _char, checkDigit, getWeight, i, identifier, index, len, remainder, weightedSum;

    identifier = id.slice(0, -1);
    checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1);

    getWeight = function getWeight(n) {
      return Math.pow(2, n - 1) % 11;
    };

    weightedSum = 0;
    index = id.length;

    for (i = 0, len = identifier.length; i < len; i++) {
      _char = identifier[i];
      weightedSum += +_char * getWeight(index);
      index--;
    }

    remainder = (12 - weightedSum % 11) % 11 - checkDigit;
    return remainder === 0;
  };

  id = normalize(id);
  return isLengthValid(id) && isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
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
  var isChecksumValid, isFormatValid, isLengthValid;

  isLengthValid = function isLengthValid(id) {
    return id.length === 10;
  };

  isFormatValid = function isFormatValid(id) {
    return /^[A-Z][12][0-9]{8}$/.test(id);
  };

  isChecksumValid = function isChecksumValid(id) {
    var _char, i, idLen, idTail, len, letterIndex, letters, remainder, weight, weightedSum;

    idLen = id.length; // Each letter represents a value from [10..35]

    letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
    letterIndex = letters.indexOf(id[0]);
    weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1);
    idTail = id.slice(1); // Drop the letter

    weight = idLen - 2; // Minus letter digit and check digit

    for (i = 0, len = idTail.length; i < len; i++) {
      _char = idTail[i];
      weightedSum += +_char * weight;
      weight--;
    } // Note: the check digit of 'id' is weighted 0


    remainder = (weightedSum + +id.slice(-1)) % 10;
    return remainder === 0;
  };

  id = normalize(id);
  return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
}

/**
Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers)
@module core/twrc
@param {string} id
@return {boolean}

Format of the id: AB12345678

In Taiwan, there is another system called National Identification Card
@see module:core/twid
*/

function twrc (id) {
  var isChecksumValid, isFormatValid, isLengthValid;

  isLengthValid = function isLengthValid(id) {
    return id.length === 10;
  };

  isFormatValid = function isFormatValid(id) {
    return /^[A-Z][A-D][0-9]{8}$/.test(id);
  };

  isChecksumValid = function isChecksumValid(id) {
    var _char, i, idLen, idTail, len, letterIndex, letters, remainder, weight, weightedSum;

    idLen = id.length; // Each letter represents a value from [10..35]

    letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
    letterIndex = letters.indexOf(id[0]);
    weightedSum = Math.floor(letterIndex / 10 + 1) + letterIndex * (idLen - 1);
    weightedSum += letters.indexOf(id[1]) * (idLen - 2);
    idTail = id.slice(2); // Drop the letters

    weight = idLen - 3; // Minus letter digit and check digit

    for (i = 0, len = idTail.length; i < len; i++) {
      _char = idTail[i];
      weightedSum += +_char * weight;
      weight--;
    }

    remainder = (weightedSum + +id.slice(-1)) % 10;
    return remainder === 0;
  };

  id = normalize(id);
  return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
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
  var getLetterValue, isChecksumValid, isFormatValid, isLengthValid, isLetter;

  getLetterValue = function getLetterValue(letter) {
    return letter.charCodeAt(0) - 55;
  };

  isLetter = function isLetter(_char) {
    return /[a-zA-Z]/.test(_char);
  };

  isLengthValid = function isLengthValid(id) {
    return id.length === 8 || id.length === 9;
  };

  isFormatValid = function isFormatValid(id) {
    return /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id);
  };

  isChecksumValid = function isChecksumValid(id) {
    var _char2, charValue, checkDigit, i, identifier, len, remainder, weight, weightedSum;

    weight = id.length;
    weightedSum = weight === 8 ? 324 : 0;
    identifier = id.slice(0, -1);
    checkDigit = id.slice(-1) === 'A' ? 10 : +id.slice(-1);

    for (i = 0, len = identifier.length; i < len; i++) {
      _char2 = identifier[i];
      charValue = isLetter(_char2) ? getLetterValue(_char2) : +_char2;
      weightedSum += charValue * weight;
      weight--;
    }

    remainder = (weightedSum + checkDigit) % 11;
    return remainder === 0;
  };

  id = normalize(id);
  return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
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
  var isChecksumValid, isFormatValid, isLengthValid, isThisDateValid;

  isLengthValid = function isLengthValid(id) {
    return id.length === 13;
  };

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
    var _char, i, index, len, remainder, weight, weightedSum;

    weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 0 // 0 is added for check digit
    ];
    weightedSum = 0;
    index = 0;

    for (i = 0, len = id.length; i < len; i++) {
      _char = id[i];
      weightedSum += +_char * weight[index];
      index++;
    }

    remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1);
    return remainder === 0;
  };

  id = normalize(id);
  return isLengthValid(id) && isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
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
  getMaxDate: getMaxDate
}; //todo: Remove in v3

validid.tools = {
  normalize: depreciatedError,
  isDateValid: depreciatedError,
  getMaxDate: depreciatedError
};
validid.cnid = cnid;
validid.twid = twid;
validid.twrc = twrc;
validid.hkid = hkid;
validid.krid = krid;
var validid$1 = validid;

export default validid$1;
