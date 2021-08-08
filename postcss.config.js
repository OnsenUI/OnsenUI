module.exports = {
  plugins: [
    require('postcss-import')({
      filter: id => !/\.\/(font_awesome|ionicons|material-design-iconic-font)\//.test(id)
    }),
    require('autoprefixer')({ remove: false })
  ],
}
