/**
 * Dummy data for validating South Korea Resident Registration Number.
 */
export const krid = [
	{
		id: '781030-5668081',
		cardType: 'krid',
		expect: true,
	},
	{
		id: '951103-5438151',
		cardType: 'krid',
		expect: true,
	},
	{
		id: '700623-2711917',
		cardType: 'krid',
		expect: true,
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: '781030-566805',
		cardType: 'krid',
		expect: false,
	},
	{
		id: '781030-56680810',
		cardType: 'krid',
		expect: false,
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: 'YYMMDD-0123456',
		cardType: 'krid',
		expect: false,
	},
	{
		id: '010101-S123456',
		cardType: 'krid',
		expect: false,
	},
	{
		id: '010101-0bbbb56',
		cardType: 'krid',
		expect: false,
	},
	{
		id: '010101-01234N6',
		cardType: 'krid',
		expect: false,
	},
	{
		id: '010101-012345C',
		cardType: 'krid',
		expect: false,
	},
	/*
	Fail test: date and future date
	-------------------------------
	*/
	{
		// TODO: Update yearly: age 17 in 2023
		id: '060101-3234563',
		cardType: 'krid',
		expect: true,
	},
	{
		// TODO: Update yearly: age 16 in 2023
		id: '061231-3234569',
		cardType: 'krid',
		expect: false,
	},
	{
		// Date before 1899-11-29
		id: '991128-9123457',
		cardType: 'krid',
		expect: false,
	},
	{
		// Date before 1899-11-29
		id: '991129-9123451',
		cardType: 'krid',
		expect: true,
	},
	{
		// False year, 2017
		id: '190101-3234563',
		cardType: 'krid',
		expect: false,
	},
	{
		// False year, future date
		id: '191231-3234569',
		cardType: 'krid',
		expect: false,
	},
	{
		// False month
		id: '990001-1234568',
		cardType: 'krid',
		expect: false,
	},
	{
		// False month
		id: '991301-1234561',
		cardType: 'krid',
		expect: false,
	},
	{
		// False day
		id: '990100-1234560',
		cardType: 'krid',
		expect: false,
	},
	{
		// False day
		id: '990132-1234561',
		cardType: 'krid',
		expect: false,
	},
	/*
	Fail test: checksum
	-------------------
	*/
	{
		id: '980123-1234567',
		cardType: 'krid',
		expect: false,
	},
];
