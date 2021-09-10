const browsers = require('../package.json')['browserslist'];

module.exports = {
  plugins: [
    require('postcss-import')({ from: null }),
    require('postcss-base64')({
      extensions: ['.svg'],
      root: 'src/components/'
    }),
    require('postcss-custom-media')({
      preserve: false
    }),
    require('postcss-nested'),
    require('postcss-color-mod-function'),
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
