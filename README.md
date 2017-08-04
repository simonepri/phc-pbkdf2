# credential-plus-pbkdf2
[![Travis CI](https://travis-ci.org/simonepri/credential-plus-pbkdf2.svg?branch=master)](https://travis-ci.org/simonepri/credential-plus-pbkdf2) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/credential-plus-pbkdf2/master.svg)](https://codecov.io/gh/simonepri/credential-plus-pbkdf2) [![npm](https://img.shields.io/npm/dm/credential-plus-pbkdf2.svg)](https://www.npmjs.com/package/credential-plus-pbkdf2) [![npm version](https://img.shields.io/npm/v/credential-plus-pbkdf2.svg)](https://www.npmjs.com/package/credential-plus-pbkdf2) [![npm dependencies](https://david-dm.org/simonepri/credential-plus-pbkdf2.svg)](https://david-dm.org/simonepri/credential-plus-pbkdf2) [![npm dev dependencies](https://david-dm.org/simonepri/credential-plus-pbkdf2/dev-status.svg)](https://david-dm.org/simonepri/credential-plus-pbkdf2#info=devDependencies)
> 🛡 pbkdf2 plugin for credential-plus

This package is thought to be used in conjunction with [credential-plus](https://github.com/simonepri/credential-plus)

If you find a security flaw in this code, please [report it](issues/new).

## Install

```
$ npm install --save credential-plus-pbkdf2
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-pbkdf2'));

// Hash and verify with pbkdf2 and default configs
credential.hash('We are all unicorns', {func: 'pbkdf2'}, (err, hash) => {
  console.log(hash);
  //=> {"hash":"{\"secret\":\"fo3R+bNr2guklSeg1FGoWGIpyrDQ03aPeoTxP90zkVWAISZFIO5S0qQTZtmAAyrmzJFEPdDxK6BX3P3jo+MtG+Fvk5qr+Tfrx2QqemQjrJOLN506SxnqvVs1tlm81QteAgZ5/ZCA55Onv5W9f/EkxgSyrCyqcdkKi/KFXmCRZj4=\",\"salt\":\"6CWbt59QA3jGeQuozB7RhIvRLHtueOu3wLl5eFmU/cCvezPgW0/VuU+estR8HCkgV8CSfP+KM06Sv+ounMBru3zqeuEqbVU+bnRMqbyxJlpD8D0lsytS29LgGNwRx3/UtB7JKsykyR3d4vRW2+2ZLOlcIoc2lnZ5SJXDh8RVkjY=\",\"iterations\":10000,\"keylen\":128,\"digest\":\"sha512\"}","func":"pbkdf2"}
  credential.verify(hash, 'We are all unicorns', (match) =>{
    console.log(match);
    //=> true
  })
});

// Hash and verify with pbkdf2 and custom configs
credential.hash('We are all unicorns', {func: 'pbkdf2', digest: 'sha1', iterations: 15000}, (err, hash) => {
  console.log(hash);
  //=> {"hash":"{\"secret\":\"0SmO6mZB/pGebWX9rBhUDt06hkQ/2yV3Uso6qzyxEdNlXrvo5aX7QuLz9YlQc6iYbKSAO9s2OGi7V0B45TMzkmgQsFK+iFVqkbOlkk8ySyXHVrkISGZoIj9z+VLZ/3jaRCyDzI2dZfoR4IOI3GhYbK/c5jdTPO+YVp2zJHmNHOo=\",\"salt\":\"cxMTjM7yqvIfUoKjjC0nS5DBVXnQllT69DXrS89S2GmzxJrFZ44FCGwbydSQPE7RzzcDUo7C+l3nSh/79LUxWFhQzN7gaFNCKlBvMfSE4qFxU6jyqRTL12/XW1P7FxzE4dPSySXCql5GbryHJSWxofX7GljBKiVd+iYW4cfkUaM=\",\"iterations\":15000,\"keylen\":128,\"digest\":\"sha1\"}","func":"pbkdf2"}
  credential.verify(hash, 'We are all unicorns', (match) =>{
    console.log(match);
    //=> true
  })
});
```

## API

### hash(password, options, callback)

Creates a new 'unique' hash from a password.

#### password

Type: `string`

The password to hash.

#### options

Type: `object`

Configurations for the hash function.

##### iterations

Type: `number`<br>
Default: 10000

The number of `pbkdf2` iterations.
The number of iterations recommended to ensure data safety changes every year as
technology improves.

##### keylen

Type: `number`<br>
Default: 128

The length of the generated keys.

##### digest

Type: `string`<br>
Default: 'sha512'

The digest algorithm. Available options are: `'sha1'`, `'sha256'`, `'sha512'`.

#### callback(err, hash)

Type: `function`

Called after the hash has been computed.

#### err

Type: `object`

Possible error thrown.

#### hash

Type: `object`

The generated hash.

### verify(hash, input, callback)

Determines whether or not the user's input matches the stored password.

#### hash

Type: `string`

An hash generated from this package.

#### input

Type: `string`

User's input input.

#### callback(err, valid)

Type: `string`

Called after the verification process has been computed.

#### err

Type: `object`

Possible error thrown.

##### valid

Type: `boolean`

True if the hash computed for the input matches.

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-pbkdf2/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
