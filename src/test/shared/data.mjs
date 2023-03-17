export default [
	/*
	Hong Kong ID
	============
	*/
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
	/*
	Taiwan National Identification Card
	===================================
	*/
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
	/*
	Taiwan Resident Certificate
	===========================
	*/
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
	/*
	China Resident Identity Card
	============================
	*/
	{
		id: '11010120170210193X',
		cardType: 'cnid',
		expect: true,
	},
	{
		id: '120103198806018241',
		cardType: 'cnid',
		expect: true,
	},
	{
		id: '310101200001013948',
		cardType: 'cnid',
		expect: true,
	},
	{
		// Source: Wikipedia
		id: '810000199408230021',
		cardType: 'cnid',
		expect: true,
	},
	{
		// Source: Wikipedia
		id: '830000199201300022',
		cardType: 'cnid',
		expect: true,
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: '98765432101234567',
		cardType: 'cnid',
		expect: false,
	},
	{
		id: '9876543210123456789',
		cardType: 'cnid',
		expect: false,
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: '110102YYYYMMDD888X',
		cardType: 'cnid',
		expect: false,
	},
	{
		id: '98765432101234567A',
		cardType: 'cnid',
		expect: false,
	},
	{
		id: 'A87654321012345678',
		cardType: 'cnid',
		expect: false,
	},
	/*
	Fail test: date and future date
	-------------------------------
	*/
	{
		id: '110101188606258888',
		cardType: 'cnid',
		expect: true,
	},
	{
		id: '110101188606248882',
		cardType: 'cnid',
		expect: false,
	},
	{
		// TODO: Update yearly: born in 2023
		id: '110101202301018881',
		cardType: 'cnid',
		expect: true,
	},
	{
		// TODO: Update yearly: born in 2023
		id: '110101202312128883',
		cardType: 'cnid',
		expect: false,
	},
	/*
	Fail test: checksum
	-------------------
	*/
	{
		id: '110102197810272321',
		cardType: 'cnid',
		expect: false,
	},
	/*
	South Korea Resident Registration Number
	========================================
	*/
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
