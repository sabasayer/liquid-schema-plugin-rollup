const path = require('path');
const { rollup } = require('rollup');
const liquidSchemaPlugin = require('../../plugin'); // Assuming this is the adapted Rollup plugin

async function build(context, pluginConfig = {}, rollupConfig = {}) {
  const testDir = path.join(__dirname, '..');
  const contextDir = path.join(testDir, 'fixtures', context);

  // Define the Rollup input options
  const inputOptions = {
    input: path.join(contextDir, 'index.js'), // Ensure this is the correct entry file path
    plugins: [
      liquidSchemaPlugin({
        to: path.join(contextDir, 'output'),
        from: {
          liquid: contextDir,
          schema: path.join(contextDir, 'schema'),
        },
        ...pluginConfig,
      }),
    ],
    ...rollupConfig, // Spread any additional Rollup configuration provided by the user
  };

  // Define the Rollup output options
  const outputOptions = {
    dir: path.join(testDir, 'fixtures', context, 'output'),
    format: 'esm', // Choose the module format: 'esm', 'cjs', etc.
    ...rollupConfig.output, // Allow overriding output options
  };

  // Create a bundle
  const bundle = await rollup(inputOptions);

  // Write the bundle to disk
  await bundle.write(outputOptions);

  // Optionally, you can also close the bundle if you're done with it
  await bundle.close();
}

module.exports = build;
