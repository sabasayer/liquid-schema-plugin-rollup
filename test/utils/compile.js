const path = require('path');
const pack = require('../config/rollup');
const readFile = require('./readFile');

const fixturesDir = path.resolve(__dirname, '../fixtures');

module.exports = (filename) => new Promise((resolve, reject) => {
  pack(filename).then(() => {
    const compilerOutput = readFile(
      path.resolve(fixturesDir, filename, 'output/index.liquid'),
    );
    const expectedCompilerOutput = readFile(
      path.resolve(fixturesDir, filename, 'expected/index.liquid'),
    );

    expect(compilerOutput).toEqual(expectedCompilerOutput);
    resolve();
  }).catch((err) => {
    reject(err);
  });
});
