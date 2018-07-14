import test from 'ava';
import phc from '@phc/format';

import m from '..';

// See https://tools.ietf.org/html/rfc6070#section-2

test('should pass the test vector 1', async t => {
  const phcstr = phc.serialize({
    id: 'pbkdf2-sha1',
    params: {i: 2},
    salt: Buffer.from('salt'),
    hash: Buffer.from(
      (
        'ea 6c 01 4d c7 2d 6f 8c' +
        'cd 1e d9 2a ce 1d 41 f0' +
        'd8 de 89 57'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $pbkdf2-sha1$i=2$c2FsdA$6mwBTcctb4zNHtkqzh1B8NjeiVc
  t.true(await m.verify(phcstr, 'password'));
});

test('should pass the test vector 2', async t => {
  const phcstr = phc.serialize({
    id: 'pbkdf2-sha1',
    params: {i: 4096},
    salt: Buffer.from('salt'),
    hash: Buffer.from(
      (
        '4b 00 79 01 b7 65 48 9a' +
        'be ad 49 d9 26 f7 21 d0' +
        '65 a4 29 c1'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $pbkdf2-sha1$i=4096$c2FsdA$SwB5AbdlSJq+rUnZJvch0GWkKcE
  t.true(await m.verify(phcstr, 'password'));
});

test('should pass the test vector 3', async t => {
  const phcstr = phc.serialize({
    id: 'pbkdf2-sha1',
    params: {i: 16777216},
    salt: Buffer.from('salt'),
    hash: Buffer.from(
      (
        'ee fe 3d 61 cd 4d a4 e4' +
        'e9 94 5b 3d 6b a2 15 8c' +
        '26 34 e9 84'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $pbkdf2-sha1$i=16777216$c2FsdA$7v49Yc1NpOTplFs9a6IVjCY06YQ
  t.true(await m.verify(phcstr, 'password'));
});

test('should pass the test vector 4', async t => {
  const phcstr = phc.serialize({
    id: 'pbkdf2-sha1',
    params: {i: 4096},
    salt: Buffer.from('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
    hash: Buffer.from(
      (
        '3d 2e ec 4f e4 1c 84 9b' +
        '80 c8 d8 36 62 c0 e4 4a' +
        '8b 29 1a 96 4c f2 f0 70' +
        '38'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $pbkdf2-sha1$i=4096$c2FsdFNBTFRzYWx0U0FMVHNhbHRTQUxUc2FsdFNBTFRzYWx0$PS7sT+QchJuAyNg2YsDkSospGpZM8vBwOA
  t.true(await m.verify(phcstr, 'passwordPASSWORDpassword'));
});

test('should pass the test vector 5', async t => {
  const phcstr = phc.serialize({
    id: 'pbkdf2-sha1',
    params: {i: 4096},
    salt: Buffer.from('sa\0lt'),
    hash: Buffer.from(
      '56 fa 6a a7 55 48 09 9d cc 37 d7 f0 34 25 e0 c3'.replace(/ /g, ''),
      'hex'
    )
  });
  // $pbkdf2-sha1$i=4096$c2EAbHQ$Vvpqp1VICZ3MN9fwNCXgww
  t.true(await m.verify(phcstr, 'pass\0word'));
});
