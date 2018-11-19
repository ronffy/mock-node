
let mock = {};

require('fs').readdirSync(require('path').join(__dirname, 'api')).forEach(file => {
  Object.assign(mock, require('./api/' + file))
})

module.exports = mock;