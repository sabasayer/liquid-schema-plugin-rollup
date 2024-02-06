const compile = require('./utils/compile');

describe('object-schema', () => {
  it('uses schema returned by object', async () => {
    const filename = 'object-schema';

    await compile(filename);
  });
});
