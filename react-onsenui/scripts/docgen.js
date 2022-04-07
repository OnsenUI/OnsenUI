var filter = require('filter-files');
var exec = require('child_process').exec;
var fs = require('fs');

const outDir = `${__dirname}/../docs`;

var files = filter.sync(`${__dirname}/../src/components/`, (fp) => {
  // console.log(fp);
  return fp.indexOf('Util') === -1 &&
    fp.indexOf('BaseDialog') === -1 &&
    fp.indexOf('BaseInput') === -1 &&
    fp.indexOf('BasicComponent') === -1 &&
    fp.indexOf('todo') === -1 &&
    !/^\./.test(fp);
});

if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
}

// Apply a patch to react-docgen that fixes higher-order components throwing an error
// See https://github.com/reactjs/react-docgen/issues/288
exec(`patch -N -r - -u ${__dirname}/../../node_modules/react-docgen/dist/resolver/findExportedComponentDefinition.js -i ${__dirname}/react-docgen.patch || true`);

console.log('Generating docs, this may take a while: ..');
for (var i = 0; i < files.length; i++) {
  var fileName = files[i].replace(/^.*[\\\/]/, '').slice(0, -4);
  var cmd = `${__dirname}/../../node_modules/react-docgen/bin/react-docgen.js ` + files[i] + ' > ' + outDir + '/' + fileName + '.json';
  exec(cmd, function callback(error, stdout, stderr) {
    if (error) {
      console.error('Error generating docs!\n');
      throw error;
    }
  });
}
