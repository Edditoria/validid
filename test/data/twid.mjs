/**
 * Dummy data for validating Taiwan National Identification Card.
 */
export const twid = [
	{
		id: 'A123456789',
		cardType: 'twid',
		expect: true,
	},
	{
		id: 'M115187864',
		cardType: 'twid',
		expect: true,
	},
	{
		id: 'Z256783650',
		cardType: 'twid',
		expect: true,
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: 'A12345678',
		cardType: 'twid',
		expect: false,
	},
	{
		id: 'A1234567890',
		cardType: 'twid',
		expect: false,
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: 'A12345678X',
		cardType: 'twid',
		expect: false,
	},
	{
		id: 'AXXXXXXXX9',
		cardType: 'twid',
		expect: false,
	},
	{
		id: '0123456789',
		cardType: 'twid',
		expect: false,
	},
	/*
	Fail test: gender
	-----------------
	2nd character has to be 1 or 2
	*/
	{
		id: 'D012345678',
		cardType: 'twid',
		expect: false,
	},
	{
		id: 'C987654321',
		cardType: 'twid',
		expect: false,
	},
	{
		id: 'E345678901',
		cardType: 'twid',
		expect: false,
	},
	/*
	Fail test: checksum
	*/
	{
		// Source: Apple Daily TW
		id: 'A234567890',
		cardType: 'twid',
		expect: false,
	},
];
