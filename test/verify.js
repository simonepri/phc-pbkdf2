import test from 'ava';

import m from '..';

test('should verify a precomputed hash', async t => {
  // Precomputed hash for "password"
  const hash =
    '$pbkdf2-sha256$i=6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  t.true(await m.verify(hash, 'password'));
});

test('should throw an error if the identifier does not contain the digest used', async t => {
  const wrong =
    '$pbkdf2$i=6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  const err = await t.throws(m.verify(wrong, 'password'));
  t.is(err.message, 'Incompatible pbkdf2 identifier found in the hash');
});

test('should throw an error if the identifier contains an unsupported digest', async t => {
  const wrong =
    '$pbkdf2-sha368$i=6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  const err = await t.throws(m.verify(wrong, 'password'));
  t.is(err.message, 'Unsupported sha368 digest function');
});

test("should throw an error if the 'i' parameter is missing", async t => {
  const wrong =
    '$pbkdf2-sha256$it=6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  const err = await t.throws(m.verify(wrong, 'password'));
  t.is(err.message, "The 'i' param must be an integer");
});

test("should throw an error if the 'i' parameter is out of range", async t => {
  let wrong =
    '$pbkdf2-sha256$i=-1$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  let err = await t.throws(m.verify(wrong, 'password'));
  t.regex(err.message, /The 'i' param must be in the range/);

  wrong =
    '$pbkdf2-sha256$i=4294967296$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  err = await t.throws(m.verify(wrong, 'password'));
  t.regex(err.message, /The 'i' param must be in the range/);
});

test('should throw an error if salt is not given', async t => {
  const wrong = '$pbkdf2-sha256$i=6400';

  const err = await t.throws(m.verify(wrong, 'password'));
  t.is(err.message, 'No salt found in the given string');
});

test('should throw an error if hash is not given', async t => {
  const wrong =
    '$pbkdf2-sha256$i=6400$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  const err = await t.throws(m.verify(wrong, 'password'));
  t.is(err.message, 'No hash found in the given string');
});

test('should throw an error if the hash is in MCF format', async t => {
  // Precomputed hash for "password"
  const hash =
    '$pbkdf2-sha256$6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  await t.throws(m.verify(hash, 'password'));
});
