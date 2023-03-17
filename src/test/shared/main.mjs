export default function (testData, validid) {
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
