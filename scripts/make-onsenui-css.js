const fs = require('fs');
const concat = require('concat');
const glob = require('glob');
const dateformat = require('dateformat');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss')

const pkg = require('../package.json');

const autoprefixerOptions = {
  add: true,
  remove: false, // removing prefixes can cause a bug
};

const coreCssFiles = ['core/css/common.css', ...glob.sync('core/css/!(common|fonts).css')];
    
const header = `/*! ${pkg.name} - v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

const write = (filename, cssFiles) => {
  concat(cssFiles)
    .then(css => postcss([ autoprefixer(autoprefixerOptions) ]).process(css, { from: undefined }))
    .then(prefixedCss => fs.writeFile(filename, header + prefixedCss.css, (err) => { if (err) throw err }));
};


// onsenui-core.css
write('build/css/onsenui-core.css', coreCssFiles);

// onsenui.css
write('build/css/onsenui.css', ['core/css/fonts.css', ...coreCssFiles]);

// onsenui-fonts.css
write('build/css/onsenui-fonts.css', ['core/css/fonts.css']);
