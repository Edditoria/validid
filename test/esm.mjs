import { allData } from './data/index.mjs';
import validid from '../esm/index.mjs';

function reporter(testData, validid) {
	const results = [];
	const errors = [];

	testData.forEach((data) => {
		const result = validid[data.cardType](data.id) === data.expect;
		results.push(result);
		if (!result) {
			errors.push(data);
		}
	});

	const summary = `\
- Total ${results.length} test(s)
- Contains ${errors.length} error(s)\
`;

	return { errors, summary };
}

const results = reporter(allData, validid); // return { errors, summary }

console.log(results.summary);
if (results.errors.length !== 0) {
	console.log(results.errors);
	throw new Error('Test fail. Process exit now.');
}
