/* eslint-disable max-params,capitalized-comments */
'use strict';

const crypto = require('crypto');
const pify = require('pify');
const tsse = require('tsse');
const phc = require('@phc/format');

const MAX_UINT32 = 4294967295; // 2**32 - 1

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaults = {
  // Minimum number of rounds recommended to ensure data safety,
  // this value changes every year as technology improves.
  iterations: 100000,

  // According to the PBKDF2 standard, the minimum recommended size for the salt
  // is 128 bits
  saltSize: 16, // bytes

  // SHA-1 is sufficient, using SHA-256 or SHA-512 has the benefit of
  // significantly increasing the memory requirements, which increases the cost
  // for an attacker wishing to attack use hardware-based password crackers
  // based on GPUs or ASICs.
  digest: 'sha512',
};

/**
 * Info of the supported digest functions.
 * @private
 * @type {Object}
 */
const digests = {
  sha1: {
    keylen: 20, // bytes
  },
  sha256: {
    keylen: 32, // bytes
  },
  sha512: {
    keylen: 64, // bytes
  },
};

/**
 * Generates a cryptographically secure random string for use as a password salt
 * using Node's built-in crypto.randomBytes().
 * @private
 * @param  {number} length The length of the salt to be generated.
 * @return {Promise.<string>} The salt string.
 */
function genSalt(length) {
  return pify(crypto.randomBytes)(length);
}

/**
 * Computes the hash string of the given password in the PHC format using Node's
 * built-in crypto.randomBytes() and crypto.pbkdf2().
 * @public
 * @param  {string} password The password to hash.
 * @param  {Object} [options] Optional configurations related to the hashing
 * function.
 * @param  {number} [options.iterations=100000] Optional number of iterations to use.
 * Must be an integer within the range (`0` < `iterations` < `1<<32`).
 * @param  {number} [options.saltSize=16] Optional number of bytes to use when
 * autogenerating new salts. Me be between `0` and `1024`.
 * @param  {string} [options.digest=sha512] Optinal name of digest to use when
 * applying the key derivation functions.
 * Can be one of [`'sha1'`, `'sha256'`, `'sha512'`].
 * @returns {Promise.<string>} The generated secure hash string in the PHC
 * format.
 */
function hash(password, options) {
  options = options || {};
  const iterations = options.iterations || defaults.iterations;
  let digest = options.digest || defaults.digest;
  const saltSize = options.saltSize || defaults.saltSize;

  // Iterations Validation
  if (typeof iterations !== 'number' || !Number.isInteger(iterations)) {
    return Promise.reject(
      new TypeError("The 'iterations' option must be an integer")
    );
  }
  if (iterations < 1 || iterations > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 'iterations' option must be in the range (1 <= iterations <= ${MAX_UINT32})`
      )
    );
  }

  // Digest Validation
  if (typeof digest !== 'string') {
    return Promise.reject(
      new TypeError("The 'digest' option must be a string")
    );
  }
  digest = digest.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(digests, digest)) {
    return Promise.reject(
      new TypeError(
        `The 'digest' option must be one of: ${Object.keys(digests)}`
      )
    );
  }

  // Salt Size Validation
  if (saltSize < 0 || saltSize > 1024) {
    return Promise.reject(
      new TypeError("The 'saltSize' option must be between 0 and 1024")
    );
  }

  // Use the max size allowed for the given digest
  const keylen = digests[digest].keylen;

  return genSalt(saltSize).then(salt => {
    return pify(crypto.pbkdf2)(password, salt, iterations, keylen, digest).then(
      hash => {
        const phcstr = phc.serialize({
          id: `pbkdf2-${digest}`,
          params: {i: iterations},
          salt,
          hash,
        });
        return phcstr;
      }
    );
  });
}

/**
 * Determines whether or not the hash stored inside the PHC formatted string
 * matches the hash generated for the password provided.
 * @public
 * @param  {string} password User's password input.
 * @param  {string} phcstr Secure hash string generated from this package.
 * @returns {Promise.<boolean>} A boolean that is true if the hash computed
 * for the password matches.
 */
function verify(phcstr, password) {
  let phcobj;
  try {
    phcobj = phc.deserialize(phcstr);
  } catch (err) {
    return Promise.reject(err);
  }

  // Identifier Validation
  const idparts = phcobj.id.split('-');
  if (idparts.length !== 2 || idparts[0] !== 'pbkdf2') {
    return Promise.reject(
      new TypeError(`Incompatible ${phcobj.id} identifier found in the hash`)
    );
  }
  if (!Object.prototype.hasOwnProperty.call(digests, idparts[1])) {
    return Promise.reject(
      new TypeError(`Unsupported ${idparts[1]} digest function`)
    );
  }
  const digest = idparts[1];

  // Iterations Validation
  if (
    typeof phcobj.params.i !== 'number' ||
    !Number.isInteger(phcobj.params.i)
  ) {
    return Promise.reject(new TypeError("The 'i' param must be an integer"));
  }
  if (phcobj.params.i < 1 || phcobj.params.i > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 'i' param must be in the range (1 <= i <= ${MAX_UINT32})`
      )
    );
  }
  const iterations = phcobj.params.i;

  // Salt Validation
  if (typeof phcobj.salt === 'undefined') {
    return Promise.reject(new TypeError('No salt found in the given string'));
  }
  const salt = phcobj.salt;

  // Hash Validation
  if (typeof phcobj.hash === 'undefined') {
    return Promise.reject(new TypeError('No hash found in the given string'));
  }
  const hash = phcobj.hash;
  const keylen = phcobj.hash.byteLength;

  return pify(crypto.pbkdf2)(password, salt, iterations, keylen, digest).then(
    newhash => {
      const match = tsse(hash.toString('base64'), newhash.toString('base64'));
      return match;
    }
  );
}

/**
 * Gets the list of all identifiers supported by this hashing function.
 * @public
 * @returns {string[]} A list of identifiers supported by this
 * hashing function.
 */
function identifiers() {
  return Object.keys(digests).map(digest => `pbkdf2-${digest}`);
}

module.exports = {
  hash,
  verify,
  identifiers,
};
