const compile = require('./utils/compile');

describe('no-schema', () => {
  it('uses schema included between schema liquid tags', async () => {
    const filename = 'no-schema';

    await compile(filename);
  });
});
