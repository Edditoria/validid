/**
 * Dummy data for validating Hong Kong ID.
 */
export const hkidData = [
	{
		id: 'G123456A',
		cardType: 'hkid',
		expect: true,
	},
	{
		id: 'A5555550',
		cardType: 'hkid',
		expect: true,
	},
	{
		// Modify from Caring and Sharing Scheme sample (2019)
		id: 'C5678909',
		cardType: 'hkid',
		expect: true,
	},
	{
		id: 'AB9876543',
		cardType: 'hkid',
		expect: true,
	},
	{
		// From repo PR5
		id: 'WX1234569',
		cardType: 'hkid',
		expect: true,
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: 'A123456',
		cardType: 'hkid',
		expect: false,
	},
	{
		id: 'AB12345678',
		cardType: 'hkid',
		expect: false,
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: '01234560',
		cardType: 'hkid',
		expect: false,
	},
	{
		id: 'A555555X',
		cardType: 'hkid',
		expect: false,
	},
	{
		id: 'AXXXXXX0',
		cardType: 'hkid',
		expect: false,
	},
	{
		id: 'A12345670',
		cardType: 'hkid',
		expect: false,
	},
	/*
	Fail test: checksum
	-------------------
	*/
	{
		// Source: SCMP
		id: 'C668668E',
		cardType: 'hkid',
		expect: false,
	},
	{
		// Case from Caring and Sharing Scheme sample (2019)
		id: 'C5678901',
		cardType: 'hkid',
		expect: false,
	},
	{
		// Source: Wikipedia
		id: 'Z6833655',
		cardType: 'hkid',
		expect: false,
	},
	{
		// Source: immd.gov.hk
		id: 'Z6833672',
		cardType: 'hkid',
		expect: false,
	},
	/*
	False test: other impossible ID
	-------------------------------
	e.g. Real world practice
	*/
	{
		// No ID starting with "O"
		id: 'O1234561',
		cardType: 'hkid',
		expect: false,
	},
];
