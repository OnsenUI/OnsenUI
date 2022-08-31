const path = require('path');
const cpx = require('cpx');

const cssPath = path.dirname(require.resolve('onsenui/css/onsen-css-components.css'));

console.log(cssPath);

cpx.copy(cssPath + '/**/*.css', 'build');

cpx.copy('./src/*.svg', 'build');
