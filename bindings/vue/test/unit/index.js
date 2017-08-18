import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
// import VueOnsen from '../../src/index.js'

Vue.config.productionTip = false

Vue.use(VueOnsen)

// require all test files (files that end with .js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files for coverage (files that end with .vue)
const srcContext = require.context('./specs', true, /\.vue$/)
srcContext.keys().forEach(srcContext)
