/**
 * Dummy data for validating China Resident Identity Card.
 */
export const cnid = [
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
];
