export default [
	{id: 'G123456A', cardType: 'hkid', expect: true}
	{id: 'A5555550', cardType: 'hkid', expect: true}
	{id: 'C5678909', cardType: 'hkid', expect: true} # modify from Caring and Sharing Scheme sample (2019)
	{id: 'AB9876543', cardType: 'hkid', expect: true}
	{id: 'WX1234569', cardType: 'hkid', expect: true}
	{id: 'A123456789', cardType: 'twid', expect: true}
	{id: 'M115187864', cardType: 'twid', expect: true}
	{id: 'Z256783650', cardType: 'twid', expect: true}
	{id: 'AB12345677', cardType: 'twrc', expect: true}
	{id: 'AC12345679', cardType: 'twrc', expect: true}
	{id: 'AB00207171', cardType: 'twrc', expect: true}
	{id: 'AC03095424', cardType: 'twrc', expect: true}
	{id: 'BD01300667', cardType: 'twrc', expect: true}
	{id: 'CC00151114', cardType: 'twrc', expect: true}
	{id: 'HD02717288', cardType: 'twrc', expect: true}
	{id: 'TD00251124', cardType: 'twrc', expect: true}
	{id: '11010120170210193X', cardType: 'cnid', expect: true}
	{id: '120103198806018241', cardType: 'cnid', expect: true}
	{id: '310101200001013948', cardType: 'cnid', expect: true}
	{id: '781030-5668081', cardType: 'krid', expect: true}
	{id: '951103-5438151', cardType: 'krid', expect: true}
	{id: '700623-2711917', cardType: 'krid', expect: true}

	# fail test: length
	{id: '98765432101234567', cardType: 'cnid', expect: false}
	{id: '9876543210123456789', cardType: 'cnid', expect: false}
	{id: 'A12345678', cardType: 'twid', expect: false}
	{id: 'A1234567890', cardType: 'twid', expect: false}
	{id: 'AB1234566', cardType: 'twrc', expect: false}
	{id: 'AB123456780', cardType: 'twrc', expect: false}
	{id: 'A123456', cardType: 'hkid', expect: false}
	{id: 'AB12345678', cardType: 'hkid', expect: false}
	{id: '781030-566805', cardType: 'krid', expect: false}
	{id: '781030-56680810', cardType: 'krid', expect: false}

	# fail test: characters and format
	{id: '110102YYYYMMDD888X', cardType: 'cnid', expect: false}
	{id: '98765432101234567A', cardType: 'cnid', expect: false}
	{id: 'A87654321012345678', cardType: 'cnid', expect: false}
	{id: 'A12345678X', cardType: 'twid', expect: false}
	{id: 'AXXXXXXXX9', cardType: 'twid', expect: false}
	{id: '0123456789', cardType: 'twid', expect: false}
	{id: 'A12345678X', cardType: 'twrc', expect: false}
	{id: 'AB1234567X', cardType: 'twrc', expect: false}
	{id: 'ABC1234567', cardType: 'twrc', expect: false}
	{id: '01234560', cardType: 'hkid', expect: false}
	{id: 'A555555X', cardType: 'hkid', expect: false}
	{id: 'AXXXXXX0', cardType: 'hkid', expect: false}
	{id: 'A12345670', cardType: 'hkid', expect: false}
	{id: 'YYMMDD-0123456', cardType: 'krid', expect: false}
	{id: '010101-S123456', cardType: 'krid', expect: false}
	{id: '010101-0bbbb56', cardType: 'krid', expect: false}
	{id: '010101-01234N6', cardType: 'krid', expect: false}
	{id: '010101-012345C', cardType: 'krid', expect: false}

	# fail test: gender
	{id: 'D012345678', cardType: 'twid', expect: false} # only 1 or 2 in 2nd character
	{id: 'C987654321', cardType: 'twid', expect: false} # only 1 or 2 in 2nd character
	{id: 'E345678901', cardType: 'twid', expect: false} # only 1 or 2 in 2nd character
	{id: 'AE12345673', cardType: 'twrc', expect: false} # only [A-D] in 2nd character

	# fail test: date and future date
	{id: '110101188606258888', cardType: 'cnid', expect: true}
	{id: '110101188606248882', cardType: 'cnid', expect: false}
	{id: '11010120200101888X', cardType: 'cnid', expect: true} #todo update every year
	{id: '110101202012128881', cardType: 'cnid', expect: false} #todo update every year
	{id: '030101-3234561', cardType: 'krid', expect: true} #todo age 17 in 2019 (update every year)
	{id: '031231-3234567', cardType: 'krid', expect: false} #todo age 16 in 2019 (update every year)
	{id: '991128-9123457', cardType: 'krid', expect: false} # date before 18991129
	{id: '991129-9123451', cardType: 'krid', expect: true} # date before 18991129
	{id: '190101-3234563', cardType: 'krid', expect: false} # false year, 2017
	{id: '191231-3234569', cardType: 'krid', expect: false} # false year, future date
	{id: '990001-1234568', cardType: 'krid', expect: false} # false month
	{id: '991301-1234561', cardType: 'krid', expect: false} # false month
	{id: '990100-1234560', cardType: 'krid', expect: false} # false day
	{id: '990132-1234561', cardType: 'krid', expect: false} # false day

	# fail test: checksum
	{id: '110102197810272321', cardType: 'cnid', expect: false}
	{id: 'A234567890', cardType: 'twid', expect: false}
	{id: 'AB12345670', cardType: 'twrc', expect: false}
	{id: 'C668668E', cardType: 'hkid', expect: false}
	{id: 'C5678901', cardType: 'hkid', expect: false} # copy from Caring and Sharing Scheme sample (2019)
	{id: '980123-1234567', cardType: 'krid', expect: false}

	# false test: other impossible ID, e.g. according to practice
	{id: 'O1234561', cardType: 'hkid', expect: false} # no ID starting with "O"
]
