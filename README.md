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

Simply provide cardType and ID. `validid` will return `true` or `false`:

```js
// China ID card
validid.cnid('120103198806018241'); // return true

// Taiwan ID card
validid.twid('A123456789'); // return true

// Taiwan Resident Certificate 2021
validid.twrc('A800000014'); // return true
// while validate old format
validid.twrc('AB12345677'); // return true
// old format "only" (not recommended, though)
validid.twrcLegacy('A800000014'); // return false
validid.twrcLegacy('AB12345677'); // return true

// Hong Kong ID card: supports two leading letters
validid.hkid('AB9876543'); // return true

// Korea ID card
validid.krid('781030-5668081'); // return true
```

Currently support:

| cardType | Country / Place | Name(s) of Card |
| -------- | --------------- | --------------- |
| cnid     | China           | China ID card, Resident Identity Card of the People's Republic of China (PRC), 中华人民共和国居民身份证 |
| hkid     | Hong Kong       | Hong Kong ID card, 香港身份證 |
| twid     | Taiwan          | Taiwan ID card, National Identification Card of the Republic of China, 中華民國國民身分證, 臺灣身分證 |
| twrc     | Taiwan          | Taiwan Resident Certificate (Uniform ID Numbers), 中華民國居留證 (統一證號) |
| krid     | South Korea     | South Korea ID card, Resident Registration Number (RRN), 주민등록번호, 住民登錄番號 |

## Install and Usage

Validid can be installed via npm, Bower, or run in browser directly. You can also consume it using your favorite bundling tools.

### npm

```shell
npm install validid
```

Require in node.js:

```js
var validid = require('validid'); // point to validid.umd.min.js
validid.cnid('120103198806018241'); // return true
```

Or, import module(s) in Node 13+:

```js
// import the whole validid object
import validid from 'validid/esm/index.mjs';
// import individual module function
import krid from 'validid/esm/krid.mjs';
// import utility in your project
import normalize from 'validid/esm/utils/normalize.mjs';

validid.krid('781030-5668081'); // return true
krid('781030-5668081'); // return true
normalize('g123456(a)'); // return 'G123456A'
```

### Bundling Tools :new:

In v2, validid bundles ESM and UMD formats. You can make use of them in bundling tools such as Webpack, Rollup and more. Please see `<package.json>`:

```json
{
  "//": "...",
  "main": "bundles/validid.umd.min.js",
  "module": "bundles/validid.esm.mjs",
  "//": "..."
}
```

In most cases, you may import `validid` by resolving "module" rather than "main".

### Bower

You can download and easily update `validid` via [Bower package manager](https://bower.io/). In Bower, both bundled UMD `<validid.umd.js>` and minified UMD `<validid.umd.min.js>` are provided.

```shell
bower install validid
```

And it is ready to serve in front-end environment:

```html
<html>
	<head>
		<script src="bower_components/validid/bundles/validid.umd.js"></script>
		<script src="test.js"></script>
	</head>
</html>

```

```js
/* In test.js */
console.log(validid.cnid('120103198806018241')); // true
```

### Direct Download

Nothing can stop you. Download the file `validid.umd.js` and refer it in your html file:

```html
<html>
	<head>
		<script src="validid.umd.js"></script>
	</head>
</html>
```

And you are ready to go:

```js
console.log(validid.cnid('120103198806018241')); // true
```

## Help Me Out!

This repo is in stable and ready for you, while here are some aspects need your help:

- Bugs and new policy that may need an update. However, please do not expose any real ID. 
- Grammar and writing, including code comments.
- Open an issue if you want more than simple true/false validation.
- I'm not sure why developers need an ID generator. Please tell me your need.
- Any suggestion you want to make.

## Copyright and License

Copyright (c) Edditoria. All rights reserved. Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the code and distribute your work for private and commercial uses. If you like, please share your work with me. :pizza:
