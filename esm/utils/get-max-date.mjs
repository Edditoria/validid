/**
Calculate the expected birthday by providing year only
Useful for putting maxDate in isDateValid()

@module utils/get-max-date
@param {number} yearsOld - Should be a whole number
@return {Object} An Date() object
*/
export default function (yearsOld) {
	var now, year;
	now = new Date();
	year = now.getFullYear() - yearsOld;
	return new Date(year, now.getMonth(), now.getDate());
}
