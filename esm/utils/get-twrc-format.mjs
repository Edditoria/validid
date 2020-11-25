/**
Check if the format of TWRC is old (before 2021), new (from 2021) or invalid.
@param {string} id - Expect the ID is normalized.
@return {string|boolean} - Either 'old', 'new' or false.
*/
export default function (id) {
	if (/^[A-Z][A-D][0-9]{8}$/.test(id)) {
		return 'old';
	}
	if (/^[A-Z][89][0-9]{8}$/.test(id)) {
		return 'new';
	}
	return false;
}
