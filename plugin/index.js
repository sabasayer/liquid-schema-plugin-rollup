const fs = require('fs-extra');
const path = require('path');
const validate = require('schema-utils');
const optionsSchema = require('./schema');

const PLUGIN_NAME = 'LiquidSchemaPlugin';

async function replaceSchemaTags(fileLocation, options) {
  const fileContents = await fs.readFile(fileLocation, 'utf-8');
  const replaceableSchemaRegex = /{%-?\s*schema\s*('.*'|".*")\s*-?%}(([\s\S]*){%-?\s*endschema\s*-?%})?/;
  const match = fileContents.match(replaceableSchemaRegex);

  if (!match) {
    return fileContents;
  }

  let [fullMatch, importableFilePath, , schemaContents] = match;
  importableFilePath = importableFilePath.replace(/(^'|"$)/g, '');
  importableFilePath = path.resolve(options.from.schema, importableFilePath);

  let importedSchema;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    importedSchema = require(`${importableFilePath.replace("'", '')}`);
  } catch (error) {
    console.error(error);
    throw new Error(`File to import not found or unreadable: ${importableFilePath} in ${fileLocation}`);
  }

  let schema = importedSchema;
  if (typeof importedSchema === 'function') {
    try {
      schemaContents = JSON.parse(schemaContents || '{}');
    } catch (error) {
      schemaContents = {};
    }
    schema = importedSchema(path.basename(fileLocation, '.liquid'), schemaContents);
  }

  if (typeof schema !== 'object') {
    throw new Error(`Schema expected to be of type "object" in ${importableFilePath}`);
  }

  return fileContents.replace(replaceableSchemaRegex, `{% schema %}\n${JSON.stringify(schema, null, 4)}\n{% endschema %}`);
}

function liquidSchemaPlugin(options = {}) {
  validate(optionsSchema, options, { name: PLUGIN_NAME });

  return {
    name: PLUGIN_NAME,
    async buildStart() {
      const files = await fs.readdir(options.from.liquid);

      return Promise.all(files.map(async (file) => {
        const fileLocation = path.resolve(options.from.liquid, file);
        const fileStat = await fs.stat(fileLocation);

        if (fileStat.isFile() && path.extname(file) === '.liquid') {
          this.addWatchFile(fileLocation);
          try {
            const replacedContent = await replaceSchemaTags(fileLocation, options);

            this.emitFile({
              type: 'asset',
              fileName: file,
              source: replacedContent,
            });
          } catch (error) {
            this.error(error);
          }
        }
      }));
    },
  };
}

module.exports = liquidSchemaPlugin;
