'use strict';

const execa = require('execa');
const pbkdf2 = require('.');

async function bench(hpass, vpass, iterations) {
  const hash = await pbkdf2.hash(hpass, {iterations});
  return execa(
    'sympact',
    ['--interval=25', `await require(".").verify("${hash}","${vpass}")`],
    {
      env: {FORCE_COLOR: true},
      windowsVerbatimArguments: true
    }
  );
}

Promise.resolve()
  // Default configs
  .then(() => bench('r9(yaV@L', 'r9(yaV@L'))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })

  // Custom Iterations
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 1000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 10000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 25000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 50000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 100000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 250000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', 500000))
  .then(results => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })

  .catch(err => {
    console.error(err);
  });
