import test from 'ava';
import pify from 'pify';

import m from 'credential-plus';

m.install(require('.'));

test('should verify a correct password with pbkdf2', async t => {
  const hash = await pify(m.hash)('hello world', {func: 'pbkdf2'});
  t.true(typeof hash === 'string');
  t.true(await pify(m.verify)(hash, 'hello world'));
});

test('should not verify a wrong password with pbkdf2', async t => {
  const hash = await pify(m.hash)('Hello world', {func: 'pbkdf2'});
  t.true(typeof hash === 'string');
  t.false(await pify(m.verify)(hash, 'hello world'));
});

test.serial('invalid password with pbkdf2', async t => {
  let err = await t.throws(pify(m.hash)(undefined, {func: 'pbkdf2'}));
  t.true(err instanceof Error);
  err = await t.throws(pify(m.hash)('', {func: 'pbkdf2'}));
  t.true(err instanceof Error);
  err = await t.throws(pify(m.hash)(['unicorn'], {func: 'pbkdf2'}));
  t.true(err instanceof Error);
  err = await t.throws(pify(m.hash)(() => console.log('lalala'), {func: 'pbkdf2'}));
  t.true(err instanceof Error);
  err = await t.throws(pify(m.hash)(null, {func: 'pbkdf2'}));
  t.true(err instanceof Error);
});
