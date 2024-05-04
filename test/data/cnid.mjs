/**
 * Dummy data for validating China Resident Identity Card.
 */
export const cnidData = [
	{
		id: '11010120170210193X',
		expect: {
			id: '11010120170210193X',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '120103198806018241',
		expect: {
			id: '120103198806018241',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '310101200001013948',
		expect: {
			id: '310101200001013948',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Source: Wikipedia
		id: '810000199408230021',
		expect: {
			id: '810000199408230021',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Source: Wikipedia
		id: '830000199201300022',
		expect: {
			id: '830000199201300022',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: '98765432101234567',
		expect: {
			id: '98765432101234567',
			type: 'CNID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: '9876543210123456789',
		expect: {
			id: '9876543210123456789',
			type: 'CNID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: '110102YYYYMMDD888X',
		expect: {
			id: '110102YYYYMMDD888X',
			type: 'CNID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '98765432101234567A',
		expect: {
			id: '98765432101234567A',
			type: 'CNID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'A87654321012345678',
		expect: {
			id: 'A87654321012345678',
			type: 'CNID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	/*
	Fail test: date and future date
	-------------------------------
	*/
	{
		id: '110101188606258888',
		expect: {
			id: '110101188606258888',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	// TODO: Review: Suppressed for package upgrade:
	// {
	// 	id: '110101188606248882',
	// 	cardType: 'cnid',
	// 	expect: false,
	// },
	{
		// TODO: Update yearly: born in 2024
		id: '110101202401018889',
		expect: {
			id: '110101202401018889',
			type: 'CNID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// TODO: Update yearly: born in 2024
		id: '110101202412128880',
		expect: {
			id: '110101202412128880',
			type: 'CNID',
			ok: false,
			status: { code: 4, text: 'INVALID_DATE', desc: '' },
		},
	},
	/*
	Fail test: checksum
	-------------------
	*/
	{
		id: '110102197810272321',
		expect: {
			id: '110102197810272321',
			type: 'CNID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
];
