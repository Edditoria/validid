import test from '../shared/main.mjs';
import data from '../shared/data.mjs';
import validid from '../../index.coffee';

const results = test(data, validid); // return { errors, summary }

console.log(results.summary);
if (results.errors.length !== 0) {
	console.log(results.errors);
	throw new Error('Test fail. Process exit now.');
}
