/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
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
export default (function(idDate, minDate, maxDate) {

	if (minDate == null) { minDate = 'default'; }
	if (maxDate == null) { maxDate = 'today'; }
	if ((minDate === 'default') || (minDate === '')) { minDate = '18991129'; }

	// 1. Check and parse idDate and minDate
	const isFormatValid = date => (typeof date === 'string') && /^[0-9]{8}$/.test(date);
	if (!isFormatValid(idDate)) { return false; }
	if (!isFormatValid(minDate)) { return false; }

	/**
	Check if the date is valid. Also will return false if it is a future date.
	@param {string} input - In format of 'YYYYMMDD'
	@return {Object|boolean} Return false asap, else return a Date obj
	*/
	const parseDate = function(input) {
		let startIndex = 0;
		const year = +input.substring(startIndex, (startIndex += 4)); // number
		const month = input.substring(startIndex, (startIndex += 2)); // string
		const day = +input.substring(startIndex, (startIndex += 2)); // number
		const date = new Date(year, +month - 1, day); // a Date object

		// 2. Is day valid?
		const maxDay = // Do not use Array.indexOf() because of the suck IE
			(() => {
			if ('01,03,05,07,08,10,12'.indexOf(month) >= 0) { return 31;
			} else if ('04,06,09,11'.indexOf(month) >= 0) { return 30;
			} else {
				const isLeapYear = (((year % 4) === 0) && ((year % 100) !== 0)) || ((year % 400) === 0);
				if (isLeapYear) { return 29;
				} else { return 28; }
			}
		})();
		const isDayValid = (day > 0) && (day <= maxDay);
		if (!isDayValid) { return false; }

		// 3. Is month valid?
		const isMonthValid = (+month > 0) && (+month <= 12);
		if (!isMonthValid) { return false; }

		// 4. Is date a future date?
		const isFutureDate = new Date() < date;
		if (isFutureDate) { return false; }

		// else case
		return date; // Date object
	};

	idDate = parseDate(idDate);
	if (idDate === false) { return false; }
	minDate = parseDate(minDate);
	if (minDate === false) { return false; }
	maxDate =
		maxDate === 'today' ? new Date()
		: typeof maxDate === 'string' ? parseDate(maxDate)
		: maxDate;
	if (maxDate === false) { return false; }

	// 5. Finally, check if the idDate falls between minDate and maxDate
	return (idDate >= minDate) && (idDate <= maxDate);
});
