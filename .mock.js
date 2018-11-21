const { arr2obj } = require('./_utils');

let mock = {};

let args = process.argv.slice(2);
args = arr2obj(args);

const dirmock = args.dirmock || 'mock';

require('fs').readdirSync(require('path').join(__dirname, dirmock)).forEach(file => {
  Object.assign(mock, require('./' + dirmock + '/' + file))
})

module.exports = mock;