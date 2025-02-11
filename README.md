# Liquid Schema Plugin Rollup

This plugin allows Shopify section schema to be imported from JavaScript or JSON files into Liquid sections. It is compatible with any rollup based build system. This allows you to build partials that can be shared across multiple sections and applied in different contexts such as section blocks or settings.

## Installation
Install using yarn:
```shell
yarn add --dev liquid-schema-plugin-rollup-rollup
```

Or npm:
```shell
npm install --save-dev liquid-schema-plugin-rollup
```

### Rollup

Add the plugin to `rollup.config.js`
```js
const LiquidSchemaPlugin = require('liquid-schema-plugin-rollup');

export default {
    input: 'index.js',
    plugins: [
      liquidSchemaPlugin({
        to: '/theme',
        from: {
          liquid: 'dev/liquid',
          schema: 'dev/schema',
        },
      }),
    ],
}
```

## Usage

Add the following to a section file, where `'filepath'` is the location of the schema relative to the `schemaDirectory` defined in the plugin settings:
```liquid
// section.liquid
{% schema 'filepath' %}
```
Note: It doesn't require an `endschema` tag.

```js
// schema.js
const banner = require('./components/banner')

module.exports = {
    name: 'Section',
    blocks: [banner]
}
```

Alternatively, the schema file can export a function, in which case it takes the section filename as the first argument and the contents of the schema tags (after running it through JSON.parse) as the second, like so:
```liquid
// section.liquid
{% schema 'filepath' %}
{
    "settings": [...]
}
{% endschema %}
```

```js
// schema.js
const banner = require('./components/banner')

module.exports = (filename, contents) => ({
    name: filename,
    settings: contents.settings,
    blocks: [banner]
})
```

## Further Reading

This repo is a fork based on https://github.com/davidwarrington/liquid-schema-plugin repository. You can read more about the idea in [this blog post](https://ellodave.dev/blog/2020/10/14/building-shopify-section-schemas-with-javascript).
