## About `validid`

`validid` is a Javascript library to validate ID Card numbers of China, Taiwan, Hong Kong and South Korea. Available in npm and bower.

\(`validid` 是一個 Javascript 程式庫，用作校驗身份證號碼是否基本正確，現時支援中國丶台灣丶香港和韓國 :\)

## What It Excels

- Deeper validation, not only checksum, e.g. gender, excluding characters in real practice
- Same code base and usage in front-end and back-end
- Able to validate multiple card types (Welcome requests for more!)
- Supports IE

## Quick Examples

Just simply provide cardType and ID, and `validid` will return `true` or `false`:

```js
// validate a number of China ID card
validid.cnid('120103198806018241') // true

// validate a number of Taiwan ID card
validid.twid('A123456789') // true

// validate a number of Taiwan Resident Certificate
validid.twrc('AB12345677') // true

// validate a number of Hong Kong ID card
validid.hkid('A5555550') // true
// supports two leading letters of HKID
validid.hkid('AB9876543') // true

// validate a number of Korea ID card
validid.krid('781030-5668081') // true
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

`validid` can be installed via npm, Bower, or run in browser directly. You can also consume it using your favorite bundling tools.

### npm

```shell
npm install validid
```

Require in node.js:

```js
var validid = require('validid'); // point to validid.umd.min.js
console.log(validid.cnid('120103198806018241')); // return true
```

Or, import using ES6 syntax in Node 13+:

```js
import validid from 'validid'; // point to validid.umd.min.js
console.log(validid.cnid('120103198806018241')); // return true
```

### Bundling Tools :new:

In v2.0 , validid bundles ESM and UMD formats. You can make use of them in bundling tools such as Webpack, Rollup and more. Please see `<package.json>`:

```json
{
  "//": "...",
  "main": "bundles/validid.umd.min.js",
  "module": "bundles/validid.esm.js",
  "//": "..."
}
```

In most cases, you may import validid by resolving "module" rather than "main".

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
console.log(validid.cnid('120103198806018241')); // return true
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
console.log(validid.cnid('120103198806018241')); // return true
```

## Help Me Out!

This repo is in stable and ready for you, while here are some aspects need your help:

- Bugs and new policy that may need an update. However, please do not expose any real ID. 
- Grammar and writing, including code comments.
- Open an issue if you want more than simple true/false validation.
- I'm not sure why developers need an ID generator. Please tell me your need.
- Any suggestion you want to make.

## Copyright and License

Copyright (c) 2017-2020 Edditoria. All rights reserved. Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the codes and distribute your work for private and commercial uses. If you like, please share your works to me. :pizza:
