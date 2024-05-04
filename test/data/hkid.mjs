/**
 * Dummy data for validating Hong Kong ID.
 */
export const hkidData = [
	{
		id: 'G123456A',
		expect: {
			id: 'G123456A',
			type: 'HKID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'A5555550',
		expect: {
			id: 'A5555550',
			type: 'HKID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// Modify from Caring and Sharing Scheme sample (2019)
		id: 'C5678909',
		expect: {
			id: 'C5678909',
			type: 'HKID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'AB9876543',
		expect: {
			id: 'AB9876543',
			type: 'HKID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		// From repo PR5
		id: 'WX1234569',
		expect: {
			id: 'WX1234569',
			type: 'HKID',
			ok: true,
			status: { code: 0, text: 'OK', desc: '' },
		},
	},
	{
		id: 'A123456',
		expect: {
			id: 'A123456',
			type: 'HKID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: 'AB12345678',
		expect: {
			id: 'AB12345678',
			type: 'HKID',
			ok: false,
			status: { code: 2, text: 'INVALID_LENGTH', desc: '' },
		},
	},
	{
		id: '01234560',
		expect: {
			id: '01234560',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'A555555X',
		expect: {
			id: 'A555555X',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'AXXXXXX0',
		expect: {
			id: 'AXXXXXX0',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		id: 'A12345670',
		expect: {
			id: 'A12345670',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		// Source: SCMP
		id: 'C668668E',
		expect: {
			id: 'C668668E',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
	{
		// Case from Caring and Sharing Scheme sample (2019)
		id: 'C5678901',
		expect: {
			id: 'C5678901',
			type: 'HKID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		// Source: Wikipedia
		id: 'Z6833655',
		expect: {
			id: 'Z6833655',
			type: 'HKID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		// Source: immd.gov.hk
		id: 'Z6833672',
		expect: {
			id: 'Z6833672',
			type: 'HKID',
			ok: false,
			status: { code: 5, text: 'INVALID_CHECKSUM', desc: '' },
		},
	},
	{
		// Impossible ID: No ID starting with "O"
		id: 'O1234561',
		expect: {
			id: 'O1234561',
			type: 'HKID',
			ok: false,
			status: { code: 3, text: 'INVALID_FORMAT', desc: '' },
		},
	},
];
