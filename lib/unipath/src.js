const path = require('path');

module.exports = (...base) => (...paths) => path.resolve(path.join(...base, ...paths));
