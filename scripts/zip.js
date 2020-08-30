const bestzip = require('bestzip');
const glob = require('glob');

const destination = 'build/onsenui.zip';

const files = [
  ...glob.sync('build/{*,!(docs)/**/*}'),
  ...glob.sync('bindings/*/{esm,dist}/**'),
  'LICENSE',
  'CHANGELOG.md'
];

//files.forEach(file => console.log('zipping... ' + file));

bestzip({
  source: files,
  destination: destination
}).then(function() {
  //console.log('\nCreated ZIP file ' + destination);
}).catch(function(err) {
  console.error(err.stack);
  process.exit(1);
});
