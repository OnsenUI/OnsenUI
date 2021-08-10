module.exports = {
  plugins: [
    require('postcss-import')({
      filter: (id) => !/\.\/(font_awesome|ionicons|material-design-iconic-font)\//.test(id)
    }),
    require('postcss-base64')({
      extensions: ['.svg'],
      root: 'css/css-components-src/components/'
    }),
    require('postcss-mixins'),
    require('postcss-custom-media')({
      preserve: false
    }),
    require('postcss-nested'),
    require('postcss-color-mod-function'),
    require('postcss-preset-env'),
    require('postcss-reporter')({
      clearAllMessages: true,
      clearReportedMessages: true,
      throwError: false
    })
  ]
}
