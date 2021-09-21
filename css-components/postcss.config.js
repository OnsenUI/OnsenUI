const browsers = require('../package.json')['browserslist'];

module.exports = {
  plugins: [
    require('postcss-import')({ from: null }),
    require('postcss-nested'),
    require('postcss-preset-env')({
      browsers: browsers
    }),
    require('postcss-reporter')({
      clearAllMessages: true,
      clearReportedMessages: true,
      throwError: false
    })
  ]
}
