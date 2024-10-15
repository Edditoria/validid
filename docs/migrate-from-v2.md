# Migrate From Validid v2

## Background: Why?

In v2, this library was written in Coffeescript. Coffeescript was amazing in the old days, but Javascript is good enough since ES6. In contrast, managing Coffescript code becomes painful. Extra syntax, making glue and build-step. All are unnecessary now.

It is time to re-write. Not only the language, but provide good experience on using a JS library:

1. Group code using module.
2. JSDoc for LSP and editors.
3. Typescript/JSDoc typings.

I would take this chance to make changes from the ground. Thus, there are breaking changes from v2 to v3+. If you are using v2, you should update your code.

May the smoothness be with you.

## "What the heck?! I am too busy right now!"

I understand that Validid, as a validation tool for ID cards, should be stable and consistent over time. Therefore, the existing functions are still available, but marked as `@deprecated` in JSDoc.

Don't panic. If you follow the practice of Javascript ecosystem, existing code should work **in short term**:

```js
/**
 * The functions in validid object should work.
 * If not, please report an issue on Github:
 * {@link https://github.com/Edditoria/validid/issues }
 *
 * #好似係除非唔係
 */

/**
 * In v2, `require('validid')` points to file:
    validid/bundles/validid.umd.min.js
 *
 * In v3+, it points to file:
    validid/bundles/validid.umd.js
 */
const validid = require('validid');
/**
 * Still work just like in v2.
 * @type {boolean}
 */
const isValid = validid.hkid('X1234567'); // returns false.
```

However, all deprecated code will be removed eventually. *You should update your code as soon as possible*. For you benefit, please continue to read...

## Quickly Migrate On Your Existing System

### CommonJS

For CommonJS codebase, your code still requires the bundled UMD file:

```js
// Require what you need, rather than all stuff:
const { validateHkid } = require('validid');
// In v3+, the function returns an object.
const answer = validateHkid('X123456(7)');
// For your existing code, you only need to know ok or not:
const isValid = answer.ok;
```

Please note that `require('validid')` points to the file :file_folder: `validid/bundles/validid.umd.js`, not the minified one. It is to improve experience in LSP and text editors.

Currently, all variable and functions are flattened in a single UMD file. I have no plan to modularize CJS in Node, nor bundle a CJS file.

### ESM

For ESM codebase, you can enjoy the Node's package system:

```js
// Import what you need:
import { validateHkid } from 'validid/hkid'; // rather than `validid.hkid()`.
// In v3+, the function returns an object.
const answer = validateHkid('X123456(7)');
// For your existing code, you only need to know ok or not:
const isValid = answer.ok;
```

## Changes May Affect the Result

### Taiwan ID

The Taiwan government launched new numbering format of Resident Certificate to create a friendly environment for foreign nationals living in Taiwan. I believe that the code should reflect this. I am happily support equality in Taiwan. And the code reflects that.

In v2, you have `validid.twid(id)`, `validid.twrc(id)` and `validid.twrcLegacy(id)` to validate Taiwan national identification card (NIC) and resident certificate (RC).

In v3,`validateTwid()` validate both Taiwan NIC and RC.

Example:

```js
// Functions you need:
import { validateTwid, identifyTwidType, identifyTwrcVersion } from 'validid/twid';
// Types you may need:
import { TwidType, TwrcVersion } from 'validid/twid';

let inputId = 'a123456789';
const answer = validateTwid(inputId);
// You can reuse the normalized ID:
console.log(answer.id);
// Identify NIC and RC:
answer.ok && answer.id === TwidType.NIC; // returns true
// TwidType is basically "NIC", "RC" and "INVALID".
console.log(TwidType);

// If you really need to identify old and new RC:
identifyTwrcVersion('A800000014'); // returns "RC_2021"
identifyTwrcVersion('AB12345677'); // returns "RC_LEGACY"
identifyTwrcVersion('ab12345677'); // returns "NOT_RC"
// TwrcVersion is basically "RC_2021", "RC_LEGACY" and "NOT_RC".
conosle.log(TwrcVersion);
```

### Korea ID

The final digit in Korea ID is no longer a check digit. `validateKrid()` does not validate checksum anymore.

In v2:

```js
validid.krid('980123-1234567') // returns false
```

In v3:

```js
validid.krid('980123-1234567') // returns true
```

Please update your test if need.

## Other Things

### Coffeescript → ECMAScript

Coffeescript source, the :file_folder: `src/` directory, is removed. The source of truth is now :file_folder: `esm/`.

If your bundling tool is importing/requiring Coffeescript files, please change to `import {  } from 'validid'`.

### Removal of "master" Branch

The default branch is changed from "master" to "main" in Mar 2023. "master" branch is removed in Sep 2024.

If you track this repo using git, please check out "main" branch.

---

Thank you for your reading.
