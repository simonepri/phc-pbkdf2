<h1 align="center">
  <a href="https://github.com/simonepri/credential-plus"><img src="https://github.com/simonepri/credential-plus/blob/master/media/credential-plus.png?raw=true" alt="credential-plus-pbkdf2" /></a>
</h1>
<div align="center">
  <a href="https://travis-ci.org/simonepri/credential-plus-pbkdf2"> <img src="https://travis-ci.org/simonepri/credential-plus-pbkdf2.svg?branch=master" alt="build status"></a>
  <a href="https://codecov.io/gh/simonepri/credential-plus-pbkdf2"><img src="https://img.shields.io/codecov/c/github/simonepri/credential-plus-pbkdf2/master.svg" alt="code coverage" /></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="code style" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-pbkdf2"><img src="https://img.shields.io/npm/v/credential-plus-pbkdf2.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-pbkdf2"><img src="https://img.shields.io/npm/dm/credential-plus-pbkdf2.svg" alt="npm downloads" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-pbkdf2"><img src="https://david-dm.org/simonepri/credential-plus-pbkdf2.svg" alt="dependencies" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-pbkdf2#info=devDependencies"><img src="https://david-dm.org/simonepri/credential-plus-pbkdf2/dev-status.svg" alt="dev dependencies" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/simonepri/credential-plus-pbkdf2.svg" alt="license" /></a>
</div>
<br />
<div align="center">
  🛡 PBKDF2 password hashing function for <a href="https://github.com/simonepri/credential-plus">credential-plus</a>.
</div>
<div align="center">
  <sub>
    If you find a security flaw in this code, PLEASE <a href="./issues/new">report it</a>.
  </sub>
</div>

## Install

```
$ npm install --save credential-plus-pbkdf2
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-pbkdf2'));

// Hash and verify with pbkdf2 and default configs
credential.hash('We are all unicorns', {func: 'pbkdf2'})
  .then(hash) => {

    console.log(hash);
    //=> {"hash":"{\"secret\":\"fo3R+bNr2guklSeg1FGoWGIpyrDQ03aPeoTxP90zkVWAISZFIO5S0qQTZtmAAyrmzJFEPdDxK6BX3P3jo+MtG+Fvk5qr+Tfrx2QqemQjrJOLN506SxnqvVs1tlm81QteAgZ5/ZCA55Onv5W9f/EkxgSyrCyqcdkKi/KFXmCRZj4=\",\"salt\":\"6CWbt59QA3jGeQuozB7RhIvRLHtueOu3wLl5eFmU/cCvezPgW0/VuU+estR8HCkgV8CSfP+KM06Sv+ounMBru3zqeuEqbVU+bnRMqbyxJlpD8D0lsytS29LgGNwRx3/UtB7JKsykyR3d4vRW2+2ZLOlcIoc2lnZ5SJXDh8RVkjY=\",\"iterations\":10000,\"keylen\":128,\"digest\":\"sha512\"}","func":"pbkdf2"}

    credential.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });

// Hash and verify with pbkdf2 and custom configs
credential.hash('We are all unicorns', {func: 'pbkdf2', digest: 'sha1', iterations: 15000})
  .then(hash) => {

    console.log(hash);
    //=> {"hash":"{\"secret\":\"0SmO6mZB/pGebWX9rBhUDt06hkQ/2yV3Uso6qzyxEdNlXrvo5aX7QuLz9YlQc6iYbKSAO9s2OGi7V0B45TMzkmgQsFK+iFVqkbOlkk8ySyXHVrkISGZoIj9z+VLZ/3jaRCyDzI2dZfoR4IOI3GhYbK/c5jdTPO+YVp2zJHmNHOo=\",\"salt\":\"cxMTjM7yqvIfUoKjjC0nS5DBVXnQllT69DXrS89S2GmzxJrFZ44FCGwbydSQPE7RzzcDUo7C+l3nSh/79LUxWFhQzN7gaFNCKlBvMfSE4qFxU6jyqRTL12/XW1P7FxzE4dPSySXCql5GbryHJSWxofX7GljBKiVd+iYW4cfkUaM=\",\"iterations\":15000,\"keylen\":128,\"digest\":\"sha1\"}","func":"pbkdf2"}

    credential.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });
```

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-pbkdf2/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
