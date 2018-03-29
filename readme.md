<p align="center">
  <a href="https://github.com/simonepri/upash">
    <img src="https://github.com/simonepri/upash/raw/master/media/upash.png" alt="upash" width="600"/>
  </a>
</p>
<h1 align="center">
</h1>
<p align="center">
  <!-- CI - TravisCI -->
  <a href="https://travis-ci.org/simonepri/upash-pbkdf2">
    <img src="https://img.shields.io/travis/simonepri/upash-pbkdf2/master.svg?label=MacOS%20%26%20Linux" alt="Mac/Linux Build Status" />
  </a>
  <!-- CI - AppVeyor -->
  <a href="https://ci.appveyor.com/project/simonepri/upash-pbkdf2">
    <img src="https://img.shields.io/appveyor/ci/simonepri/upash-pbkdf2/master.svg?label=Windows" alt="Windows Build status" />
  </a>
  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/upash-pbkdf2">
    <img src="https://img.shields.io/codecov/c/github/simonepri/upash-pbkdf2/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/upash-pbkdf2?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/upash-pbkdf2/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/upash-pbkdf2">
    <img src="https://david-dm.org/simonepri/upash-pbkdf2/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Init - ni -->
  <a href="https://github.com/simonepri/ni">
    <img src="https://img.shields.io/badge/initialized_with-ni-e74c3c.svg" alt="NI Scaffolding System used" />
  </a>
  <!-- Release - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/released_with-np-6c8784.svg" alt="NP Release System used" />
  </a>

  <br/>

  <!-- Mentioned - Awesome NodeJS -->
  <a href="https://github.com/sindresorhus/awesome-nodejs#security">
    <img src="https://awesome.re/mentioned-badge.svg" alt="Mentioned in Awesome NodeJS" />
  </a>
  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/@upash/pbkdf2">
    <img src="https://img.shields.io/npm/v/@upash/pbkdf2.svg" alt="Latest version on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/upash-pbkdf2/tree/master/license">
    <img src="https://img.shields.io/github/license/simonepri/upash-pbkdf2.svg" alt="Project license" />
  </a>
</p>
<p align="center">
  🔒 Easy to use Unified API for pbkdf2-crypt password hashing algorithm.

  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## Synopsis
This package is part of the [upash][upash] project,
which aim is to provide a unified and user-friendly APIs for all the passwords
hashing algorithms out there.  

In particular, this package wraps the [pbkdf2-crypt][npm:pbkdf2-crypt]
package providing a simplified API with up to date secure default configurations.

Do you believe that this is *useful*?
Has it *saved you time*?
Or maybe you simply *like it*?  
If so, [show your appreciation with a Star ⭐️][start].

## Install
```bash
npm install --save @upash/pbkdf2
```

## Usage
```js
const pbkdf2 = require('@upash/pbkdf2');

// Hash and verify with pbkdf2-crypt using default secure configs.
const hash = await pbkdf2.hash('We are all unicorns');
console.log(hash);
// => "mWlElQFNoj+93rTG+v90vFekBgDGsN1hRLhhPbMjC598GOvGitqxs7Bb2eoPU6ZB54zLYdllfg08FZRTZeL9bg==,zRkZt6xXoVQuyFVuXvrIWf0DqeT0Ac2ex8tkbYVKWYoCGQETCxmMs+tkPCzkaqZjnSzvMGO7ncPooyeKQwb8Og==,10000,64,sha256"
// You can store this directly in your database.

// Then you can verify against it in this way.
const match = await pbkdf2.verify(hash, 'We are all unicorns');
console.log(match);
// => true
```

## API
<dl>
<dt><a href="#hash">hash(password, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Applies the hashing algorithm to the provided password.</p>
</dd>
<dt><a href="#verify">verify(hash, password)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Determines whether the user&#39;s input matches the stored password or not.</p>
</dd>
</dl>

<a name="hash"></a>

## hash(password, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Applies the hashing algorithm to the provided password.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The generated hash string.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password to hash. |
| [options] | <code>Object</code> | Configurations passed to the hashing function. |
| [options.iterations] | <code>number</code> | The number of iterations to compute the derived key. |
| [options.keylen] | <code>number</code> | The length of the computed derived key. |
| [options.digest] | <code>number</code> | A digest function from the crypto.getHashes() list of supported digest functions. |

<a name="verify"></a>

## verify(hash, password) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determines whether the user's input matches the stored password or not.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - A boolean that is true if the hash computed for
the password matches the provided hash.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | The hash string generated by this package. |
| password | <code>string</code> | The user's password input. |


## Related
- [@upash/universal][universal] -
🔒 Easy to use Unified API for all password hashing algorithms.
- [@upash/cli][cli] -
🔒 Easy to use CLI for all password hashing algorithms.
- [@upash/argon2][argon2] -
🔒 Easy to use Unified API for Argon2 password hashing algorithm.
- [@upash/scrypt][scrypt] -
🔒 Easy to use Unified API for scrypt password hashing algorithm.
- [@upash/bcrypt][bcrypt] -
🔒 Easy to use Unified API for bcrypt password hashing algorithm.

## Contributing
Contributions are REALLY welcome and if you find a security flaw in this code,
PLEASE [report it][new issue].  
Please check the [contributing guidelines][contributing] for more details.  
Thanks!

## Authors
- **Simone Primarosa** - *Follow* me on
*Github* ([:octocat:@simonepri][github:simonepri]) and on
*Twitter* ([🐦@simoneprimarosa][twitter:simoneprimarosa])

See also the list of [contributors][contributors] who participated in this project.

## License
This project is licensed under the MIT License - see the [license][license] file for details.

<!-- Links -->
[upash]: https://github.com/simonepri/upash

[start]: https://github.com/simonepri/upash-pbkdf2#start-of-content
[new issue]: https://github.com/simonepri/upash-pbkdf2/issues/new
[contributors]: https://github.com/simonepri/upash-pbkdf2/contributors

[license]: https://github.com/simonepri/upash-pbkdf2/tree/master/license
[contributing]: https://github.com/simonepri/upash-pbkdf2/tree/master/.github/contributing.md

[universal]: https://github.com/simonepri/upash
[cli]: https://github.com/simonepri/upash-cli
[argon2]: https://github.com/simonepri/upash-argon2
[scrypt]: https://github.com/simonepri/upash-scrypt
[bcrypt]: https://github.com/simonepri/upash-bcrypt

[npm:pbkdf2-crypt]: https://www.npmjs.com/package/pbkdf2-crypt

[github:simonepri]: https://github.com/simonepri
[twitter:simoneprimarosa]: http://twitter.com/intent/user?screen_name=simoneprimarosa
