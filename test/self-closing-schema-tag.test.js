const compile = require('./utils/compile');

describe('self-closing-schema-tag', () => {
  it('supports external schema with no endschema tag', async () => {
    const filename = 'self-closing-schema-tag';

    await compile(filename);
  });
});
