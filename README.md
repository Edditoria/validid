# Validid: Validate ID Card Number

Validid is a Javascript library to validate ID card number of Hong Kong, Taiwan, South Korea and China. Available in npm and bower.

\(Validid 是一個 Javascript 程式庫，用作校驗身份證號碼是否基本正確，現時支援香港丶台灣丶韓國和中國 :\)

## What It Excels

- **Deeper validation**, such as gender, invalid characters in real practice.
- **Return reason of failure**. Not only true or false. Fit for front-end development.
- **No dependency** to consume this library.
- Vanilla Javascript with **JSDoc and Typescript-typing** for your editors and IDE.
- Come with bundled files to support browsers, including **IE**.

## Quick Examples

Most likely you would import function starting with a word "validate":

```js
// Hong Kong ID card (Supports two leading letters):
import { validateHkid } from 'validid/hkid';
validateHkid('AB987654(3)'); // returns { id: 'AB9876543', ok: true, ... }

// Taiwan ID card (including National Identification Card and Resident Certificate):
import { validateTwid, identifyTwidType, identifyTwrcVersion } from 'validid/twid';
validateTwid('A123456789'); // returns { ok: true, ... }
// Some services still need to identify NIC and RC:
identifyTwidType('A123456789'); // returns "NIC"
identifyTwidType('A800000014'); // returns "RC"
// And even to identify old and new RC:
identifyTwrcVersion('A800000014'); // returns "RC_2021"
identifyTwrcVersion('AB12345677'); // returns "RC_LEGACY"

// Korea ID card:
import { validateKrid } from 'validid/krid';
validateKrid('781030-5668081'); // returns { id: "7810305668081", ok: true, ... }
// No checksum is required according to latest system:
validateKrid('7810305668082'); // returns { id: "7810305668082", ok: true, ... }

// China ID card:
import { validateCnid } from 'validid/cnid';
validateCnid('120103198806018241'); // returns { ok: true, ... }
```

Currently support:

| Module   | Country / Place | Name(s) of Card |
| -------- | --------------- | --------------- |
| hkid     | Hong Kong       | Hong Kong ID card, 香港身份證 |
| twid     | Taiwan          | National Identification Card of the Republic of China, 中華民國國民身分證, 臺灣身分證 |
| twid     | Taiwan          | Resident Certificate (Uniform ID Numbers), 中華民國居留證 (統一證號) |
| krid     | South Korea     | South Korea ID card, Resident Registration Number (RRN), 주민등록번호, 住民登錄番號 |
| cnid     | China           | China ID card, Resident Identity Card of the People's Republic of China (PRC), 中华人民共和国居民身份证 |

There are vary of exported utilities in this package. They might help your UI.

## Install and Usage

Validid can be installed via npm, Bower, or run in browser directly. You can also consume it using your favorite bundling tools.

### npm and Node.js

```shell
npm install validid
```

Import ES module that you need:

```js
import { validateTwid } from 'validid/twid';
```

Require in old fashion. No module. All-in-one named export:

```js
const { validateTwid } = require('validid'); // point to validid.umd.js
```

### Bower

You can download and easily update `validid` via [Bower package manager](https://bower.io/). In Bower, both bundled UMD `<validid.umd.js>` and minified UMD `<validid.umd.min.js>` are provided.

```shell
bower install validid
```

And it is ready to serve:

```html
<html>
	<body>
		<script src="bower_components/validid/bundles/validid.umd.js"></script>
		<script src="your-scripts.js"></script>
	</body>
</html>
```

```js
/* In your-scripts.js */
const result = validid.validateHkid('A9876543');
console.log(result.ok); // false
console.log(result.status.text) // "INVALID_CHECKSUM"
```

### Direct Download

Nothing can stop you. Download the UMD file, then use the global name `validid` in your page:

```html
<html>
	<body>
		<script src="validid.umd.js"></script>
		<script>
			const result = validid.validateHkid('A9876543');
			console.log(result.ok); // false
			console.log(result.status.text) // "INVALID_CHECKSUM"
		</script>
	</body>
</html>
```

## From v2 to v3

Please check out [release page on Github](https://github.com/Edditoria/validid/releases) and [migration guide](https://github.com/Edditoria/validid/blob/main/docs/migrate-from-v2.md).

## Help Me Out!

This repo is in stable and ready for you, while here are some aspects need your help:

- Bugs and new policy that may need an update. However, please do not expose any real ID.
- Your experience related to LSP, JSDoc, Typescript, etc. Suppose it should work out of the box.
- Existing code using Validid v2 should not break.
- Grammar and writing, including code comments.
- Feature request that might help in server code and UI.

## Copyright and License

Copyright (c) Edditoria. All rights reserved. Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the code and distribute your work for private and commercial uses. If you like, please share your work with me. :pizza:
