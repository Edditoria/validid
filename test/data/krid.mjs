/**
 * Dummy data for validating South Korea Resident Registration Number.
 */
export const kridData = [
	{
		id: '781030-5668081',
		expect: {
			id: '7810305668081',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '951103-5438151',
		expect: {
			id: '9511035438151',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '700623-2711917',
		expect: {
			id: '7006232711917',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '781030-566805',
		expect: {
			id: '781030566805',
			type: 'KRID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: '781030-56680810',
		expect: {
			id: '78103056680810',
			type: 'KRID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: 'YYMMDD-0123456',
		expect: {
			id: 'YYMMDD0123456',
			type: 'KRID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '010101-S123456',
		expect: {
			id: '010101S123456',
			type: 'KRID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '010101-0bbbb56',
		expect: {
			id: '0101010BBBB56',
			type: 'KRID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '010101-01234N6',
		expect: {
			id: '01010101234N6',
			type: 'KRID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '010101-012345C',
		expect: {
			id: '010101012345C',
			type: 'KRID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	/*
	Fail test: date and future date
	-------------------------------
	*/
	{
		// TODO: Update yearly: age 17 in 2024
		id: '070101-3234561',
		expect: {
			id: '0701013234561',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// TODO: Update yearly: age 16 in 2024
		id: '071231-3234566',
		expect: {
			id: '0712313234566',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	// TODO: Review: Suppressed for package upgrade:
	// {
	// 	// Date before 1899-11-29
	// 	id: '991128-9123457',
	// 	cardType: 'krid',
	// 	expect: false,
	// },
	{
		// Date before 1899-11-29
		id: '991129-9123451',
		expect: {
			id: '9911299123451',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// False year, 2017
		id: '190101-3234563',
		expect: {
			id: '1901013234563',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	{
		// False year, future date
		id: '191231-3234569',
		expect: {
			id: '1912313234569',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	{
		// False month
		id: '990001-1234568',
		expect: {
			id: '9900011234568',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	{
		// False month
		id: '991301-1234561',
		expect: {
			id: '9913011234561',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	{
		// False day
		id: '990100-1234560',
		expect: {
			id: '9901001234560',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	{
		// False day
		id: '990132-1234561',
		expect: {
			id: '9901321234561',
			type: 'KRID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	/*
	Fail test: checksum
	-------------------
	*/
	// TODO: Optionally validate checksum.
	// {
	// 	id: '980123-1234567',
	// 	expect: {
	// 		id: '9801231234567',
	// 		type: 'KRID',
	// 		ok: false,
	// 		status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
	// 	},
	// },
	{
		id: '980123-1234567',
		expect: {
			id: '9801231234567',
			type: 'KRID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
];
