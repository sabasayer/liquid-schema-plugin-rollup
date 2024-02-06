const pack = require('./config/rollup');
const compile = require('./utils/compile');

const expectedErrorMessage = 'Schema expected to be of type "object"';

describe('no-schema-found', () => {
  it('throws error when schema file is found', async () => {
    const filename = 'non-object-schema';

    try {
      await compile(filename);
    } catch (error) {
      expect(error.message).toContain(expectedErrorMessage);
    }
  });
});
