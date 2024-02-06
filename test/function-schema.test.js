const compile = require('./utils/compile');

describe('function-schema', () => {
  it('uses schema returned by function', async () => {
    const filename = 'function-schema';

    await compile(filename);
  });
});
