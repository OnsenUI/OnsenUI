var fs = require('fs');
var shell = require('shelljs');
var BASE_DIR = 'build/docs/json';

module.exports = function output() {
  return {
    $runAfter: [],
    $runBefore: ['writing-files'],
    $process: function(docs) {
      docs.forEach(strip);
      docs = docs.filter(function(doc) {
        return doc.docType === 'object' || doc.docType === 'directive';
      });

      docs.forEach(function(doc) {
        var dir = BASE_DIR + '/' + doc.docType;
        var path = dir + '/' + doc.name + '.json';
        shell.mkdir('-p', dir);
        fs.writeFileSync(path, JSON.stringify(doc, null, '  '), 'utf8');
      });

      return new Promise(function(fill) {
        fill();
      });
    }
  };
};

// for debug
function keytree(obj) {
  if (typeof obj === 'object' && obj !== null && obj !== undefined) {
    var result = {};
    Object.keys(obj).forEach(function(key) {
      result[key] = keytree(obj[key]);
    });

    return result;
  } else {
    return '';
  }
}

function strip(obj) {
  if (typeof obj === 'object' && obj !== null && obj !== undefined) {
    var doubt = ['codeNode', 'ast', 'content', 'renderedContent'];
    Object.keys(obj).forEach(function(key) {
      if (doubt.indexOf(key) !== -1) {
        delete obj[key];
      } else if (key === 'fileInfo') {
        obj[key] = stripFileInfo(obj[key]);
      } else {
        obj[key] = strip(obj[key]);
      }
    });
  }

  return obj;
}

function stripFileInfo(fileInfo) {
  return {
    baseName: fileInfo.baseName,
    extension: fileInfo.extension
  };
}
