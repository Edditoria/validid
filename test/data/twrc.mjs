/**
 * Dummy data for validating Taiwan Resident Certificate.
 */
export const twrc = [
	/*
	New UID format from 2021
	------------------------
	*/
	{
		// Source: immigration.gov.tw
		id: 'A800000014',
		cardType: 'twrc',
		expect: true,
	},
	{
		// Random generated ID
		id: 'A823456783',
		cardType: 'twrc',
		expect: true,
	},
	{
		// Random generated ID
		id: 'A923456785',
		cardType: 'twrc',
		expect: true,
	},
	/*
	Legacy UID format before 2021 but still valid
	---------------------------------------------
	*/
	{
		id: 'AB12345677',
		cardType: 'twrc',
		expect: true,
	},
	{
		id: 'AC12345679',
		cardType: 'twrc',
		expect: true,
	},
	{
		// From repo PR4
		id: 'AB00207171',
		cardType: 'twrc',
		expect: true,
	},
	{
		// From repo PR4
		id: 'AC03095424',
		cardType: 'twrc',
		expect: true,
	},
	{
		// From repo PR4
		id: 'BD01300667',
		cardType: 'twrc',
		expect: true,
	},
	{
		// Source: Wikimedia Commons
		id: 'CC00151114',
		cardType: 'twrc',
		expect: true,
	},
	{
		// From repo PR4
		id: 'HD02717288',
		cardType: 'twrc',
		expect: true,
	},
	{
		// From repo PR4
		id: 'TD00251124',
		cardType: 'twrc',
		expect: true,
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: 'AB1234566',
		cardType: 'twrc',
		expect: false,
	},
	{
		id: 'AB123456780',
		cardType: 'twrc',
		expect: false,
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: 'A12345678X',
		cardType: 'twrc',
		expect: false,
	},
	{
		id: 'AB1234567X',
		cardType: 'twrc',
		expect: false,
	},
	{
		id: 'ABC1234567',
		cardType: 'twrc',
		expect: false,
	},
	/*
	Fail test: gender (2nd character has to be [A-D])
	-------------------------------------------------
	*/
	{
		id: 'AE12345673',
		cardType: 'twrc',
		expect: false,
	},
	{
		// Source: Taiwan News
		id: 'YZ50000001',
		cardType: 'twrc',
		expect: false,
	},
	/*
	Fail test: checksum
	-------------------
	*/
	{
		id: 'AB12345670',
		cardType: 'twrc',
		expect: false,
	},
	{
		// Source: Wikipedia
		id: 'AD12345678',
		cardType: 'twrc',
		expect: false,
	},
	{
		// Source: Taiwan News
		id: 'HC12345678',
		cardType: 'twrc',
		expect: false,
	},
];
