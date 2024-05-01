/**
 * Dummy data for validating Taiwan ID, including:
 * - National Identification Card.
 * - Resident Certificate.
 */
export const twidData = [
	{
		id: 'A123456789',
		twidType: 'NIC',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A123456789',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'M115187864',
		twidType: 'NIC',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'M115187864',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'Z256783650',
		twidType: 'NIC',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'Z256783650',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	/*
	New UID format from 2021
	------------------------
	*/
	{
		// Source: immigration.gov.tw
		id: 'A800000014',
		twidType: 'RC',
		twrcVersion: 'RC_2021',
		expect: {
			id: 'A800000014',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Random generated ID
		id: 'A823456783',
		twidType: 'RC',
		twrcVersion: 'RC_2021',
		expect: {
			id: 'A823456783',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Random generated ID
		id: 'A923456785',
		twidType: 'RC',
		twrcVersion: 'RC_2021',
		expect: {
			id: 'A923456785',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	/*
	Legacy UID format before 2021 but still valid
	---------------------------------------------
	*/
	{
		id: 'AB12345677',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AB12345677',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'AC12345679',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AC12345679',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR4
		id: 'AB00207171',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AB00207171',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR4
		id: 'AC03095424',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AC03095424',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR4
		id: 'BD01300667',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'BD01300667',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Source: Wikimedia Commons
		id: 'CC00151114',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'CC00151114',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR4
		id: 'HD02717288',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'HD02717288',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR4
		id: 'TD00251124',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'TD00251124',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	/*
	Fail test: length
	-----------------
	*/
	{
		id: 'A12345678',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A12345678',
			type: 'TWID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: 'A1234567890',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A1234567890',
			type: 'TWID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: 'AB1234566',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'AB1234566',
			type: 'TWID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: 'AB123456780',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'AB123456780',
			type: 'TWID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	/*
	Fail test: characters and format
	--------------------------------
	*/
	{
		id: 'A12345678X',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A12345678X',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'AXXXXXXXX9',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'AXXXXXXXX9',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: '0123456789',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: '0123456789',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'A12345678X',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A12345678X',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'AB1234567X',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'AB1234567X',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'ABC1234567',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'ABC1234567',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	/*
	Fail test: gender
	-----------------
	*/
	/* ### 2nd character has to be 1 or 2 */
	{
		id: 'D012345678',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'D012345678',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'C987654321',
		twidType: 'RC',
		twrcVersion: 'RC_2021',
		expect: {
			id: 'C987654321',
			type: 'TWID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'E345678901',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'E345678901',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	/* ### 2nd character has to be [A-D] */
	{
		id: 'AE12345673',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'AE12345673',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		// Source: Taiwan News
		id: 'YZ50000001',
		twidType: 'INVALID',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'YZ50000001',
			type: 'TWID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	/*
	Fail test: checksum
	*/
	{
		// Source: Apple Daily TW
		id: 'A234567890',
		twidType: 'NIC',
		twrcVersion: 'NOT_RC',
		expect: {
			id: 'A234567890',
			type: 'TWID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		id: 'AB12345670',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AB12345670',
			type: 'TWID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		// Source: Wikipedia
		id: 'AD12345678',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'AD12345678',
			type: 'TWID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		// Source: Taiwan News
		id: 'HC12345678',
		twidType: 'RC',
		twrcVersion: 'RC_LEGACY',
		expect: {
			id: 'HC12345678',
			type: 'TWID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
];
