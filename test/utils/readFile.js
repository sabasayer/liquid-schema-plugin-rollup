const fs = require('fs');

module.exports = (file) => fs.readFileSync(file, { encoding: 'utf-8' });
