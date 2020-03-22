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

`validid` can be installed via npm or Bower, or run in browser directly.

### npm

```shell
npm install validid
```

Require in node.js:

```js
var validid = require('validid');
console.log(validid.cnid('120103198806018241')); // return true
```

Or, import using ES6 syntax:

```js
import validid from 'validid';
console.log(validid.cnid('120103198806018241')); // return true
```

### Bower

You can download and easily update `validid` via [Bower package manager](https://bower.io/). In Bower, only the minified UMD is provided.

```shell
bower install validid
```

And it is ready to serve in front-end environment:

```html
<html>
  <head>
    <script src='bower_components/validid/bundles/validid.umd.min.js'></script>
  </head>
</html>

```

```js
console.log(validid.cnid('120103198806018241')); // return true
```

### Direct Download

Nothing can stop you. Download the file `validid.umd.min.js` and refer it in your html file:

```html
<html>
  <head>
    <script src='validid.umd.min.js'></script>
  </head>
</html>
```

And you are ready to go:

```js
console.log(validid.cnid('120103198806018241')); // return true
```

## Planning

This repo is in stable and ready for you, while here is the plan to give more:

- [ ] return reason(s) that ID is invalid
- [ ] more countries and places, if checksum is available:
	- 1st generation of China ID card
	- Macau ID card
	- \[...\]
- [ ] validate address code (using plugin, not in core)
	- 2nd generation of China ID card
	- Korea
- [ ] get information from the ID number
- [ ] ~~generate random number~~ (I don't know any use case. Please comment in issue if you need it.)

## Copyright and License

Copyright (c) 2017-2020 Edditoria. All rights reserved. Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the codes and distribute your work for private and commercial uses. Please share your works to me. :pizza:
