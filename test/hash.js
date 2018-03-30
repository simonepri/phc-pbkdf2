import test from 'ava';

import m from '..';

test("should throw an error if the 'iterations' option is not a number", async t => {
  const err = await t.throws(m.hash('password', {iterations: 'iterations'}));
  t.is(err.message, "The 'iterations' option must be an integer");
});

test("should throw an error if the 'iterations' option is out of range", async t => {
  let err = await t.throws(m.hash('password', {iterations: -1}));
  t.regex(err.message, /The 'iterations' option must be in the range/);

  err = await t.throws(m.hash('password', {iterations: 2 ** 32}));
  t.regex(err.message, /The 'iterations' option must be in the range/);
});

test("should throw an error if the 'digest' option is not a string", async t => {
  const err = await t.throws(m.hash('password', {digest: 1}));
  t.is(err.message, "The 'digest' option must be a string");
});

test("should throw an error if the 'digest' option is unsupported", async t => {
  const err = await t.throws(m.hash('password', {digest: 'sha368'}));
  t.regex(err.message, /The 'digest' option must be one of:/);
});

test("should throw an error if the 'saltSize' option is out of range", async t => {
  let err = await t.throws(m.hash('password', {saltSize: -1}));
  t.regex(err.message, /The 'saltSize' option must be in the range/);

  err = await t.throws(m.hash('password', {saltSize: 1025}));
  t.regex(err.message, /The 'saltSize' option must be in the range/);
});
