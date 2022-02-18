module.exports = {
  plugins: [
    require('postcss-import')({
      filter: (id) => !/\.\/(font_awesome|ionicons|material-design-iconic-font)\//.test(id)
    }),
    require('postcss-preset-env'),
    require('postcss-reporter')({
      clearAllMessages: true,
      clearReportedMessages: true,
      throwError: false
    })
  ]
}
