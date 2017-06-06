var filter = require('filter-files');
var exec = require('child_process').exec;

var files = filter.sync('./src/components/', (fp) => {
  // console.log(fp);
  return fp.indexOf('Util') === -1 &&
    fp.indexOf('BaseDialog') === -1 &&
    fp.indexOf('BaseInput') === -1 &&
    fp.indexOf('BasicComponent') === -1 &&
    fp.indexOf('todo') === -1;
});

console.log('Generating docs, this may take a while: ..');
for (var i = 0; i < files.length; i++) {
  var fileName = files[i].replace(/^.*[\\\/]/, '').slice(0, -4);
  var cmd = 'node ./scripts/react-docgen.js ' + files[i] + ' > ' + './docs/' + fileName + '.json';
  exec(cmd, function callback(error, stdout, stderr) {
    if (error) {
      console.error('Error generating docs!\n');
      throw error;
    }
  });
}
