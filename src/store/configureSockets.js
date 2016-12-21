if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureSockets.prod');
} else {
  module.exports = require('./configureSockets.dev');
}
