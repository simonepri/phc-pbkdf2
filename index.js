'use strict';

const crypto = require('crypto');
const tsse = require('tsse');

const _ = require('lodash');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {object}
 */
const defaultConfigs = {
  // Minimum number of iterations recommended to ensure data safety,
  // this value changes every year as technology improves.
  iterations: 10000,

  // According to the PBKDF2 standard, the minimum recommended size for the salt
  // is 64 bits
  keylen: 128,

  // SHA-1 is sufficient however, using SHA-256 or SHA-512 has the benefit of
  // significantly increasing the memory requirements, which increases the cost
  // for an attacker wishing to attack use hardware-based password crackers
  // based on GPUs or ASICs.
  digest: 'sha512'
};

/**
 * Generates a cryptographically secure random string for use as a password salt
 * using Node's built-in crypto.randomBytes().
 * @private
 * @param  {number} length The length of the salt to be generated.
 * @param  {function} callback Called after the salt has been generated.
 */
function createSalt(length, callback) {
  crypto.randomBytes(length, (err, buff) => {
    if (err) {
      return callback(err);
    }
    callback(null, buff.toString('base64'));
  });
}

/**
 * Generates an unique hash and the data needed to verify it.
 * @public
 * @param  {string} password The password to hash.
 * @param  {object} configs Configurations related to the hashing function.
 * @returns {Promise<string>} A promise that contains the generated hash string.
 */
function hashFunc(password, configs) {
  return new Promise((resolve, reject) => {
    const cfgs = _.extend(defaultConfigs, configs);

    createSalt(cfgs.keylen, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }
      crypto.pbkdf2(password, salt, cfgs.iterations, cfgs.keylen, cfgs.digest, (err, hash) => {
        if (err) {
          reject(err);
          return;
        }
        const data = {
          secret: hash.toString('base64'),
          salt,
          iterations: cfgs.iterations,
          keylen: cfgs.keylen,
          digest: cfgs.digest
        };
        resolve(JSON.stringify(data));
      });
    });
  });
}

/**
 * Determines whether or not the user's input matches the stored password.
 * @public
 * @param  {string} hash Stringified hash object generated from this package.
 * @param  {string} input User's password input.
 * @returns {Promise<boolean>} A promise that contains a boolean that is true if
 *   if the hash computed for the input matches.
 */
function verifyFunc(hash, password) {
  return new Promise((resolve, reject) => {
    let hashObj;
    try {
      hashObj = JSON.parse(hash);
    } catch (err) {
      return reject(new Error('Couldn\'t parse the provided hash.'));
    }
    crypto.pbkdf2(password, hashObj.salt, hashObj.iterations, hashObj.keylen, hashObj.digest, (err, pwdHash) => {
      if (err) {
        reject(err);
        return;
      }
      const match = tsse(pwdHash.toString('base64'), hashObj.secret);
      resolve(match);
    });
  });
}

module.exports = {
  hash: hashFunc,
  verify: verifyFunc,
  name: 'pbkdf2'
};
