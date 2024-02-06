const pack = require('./config/rollup');
const compile = require('./utils/compile');

const expectedErrorMessage = 'File to import not found or unreadable';

describe('invalid-json-schema', () => {
  it('throws error when invalid json is exported from schema file', async () => {
    const filename = 'invalid-json-schema';

    try {
      await compile(filename);
    } catch (error) {
      expect(error.message).toContain(expectedErrorMessage);
    }
  });

  it('throws error when invalid js is exported from schema file', async () => {
    const filename = 'invalid-js-schema';

    try {
      await compile(filename);
    } catch (error) {
      expect(error.message).toContain(expectedErrorMessage);
    }
  });
});
