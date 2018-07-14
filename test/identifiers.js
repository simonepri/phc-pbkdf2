import test from 'ava';

import m from '..';

test('should return the full list of identifiers', t => {
  t.deepEqual(m.identifiers(), [
    'pbkdf2-sha1',
    'pbkdf2-sha256',
    'pbkdf2-sha512'
  ]);
});
