var wcdoc = require('wcdoc');
var renderer = require('./renderer');
var fs = require('fs');
var mkpath = require('mkpath');
var resolve = require('path').resolve;
var join = require('path').join;

/**
 * @param {Array} docs
 * @return {Array}
 */
function createFileIndex(docs) {
  var fileIndex = {};

  docs.forEach(function(doc) {
    var path = doc.file.relativePath;

    if (!fileIndex[path]) {
      fileIndex[path] = {};
    }

    if (!fileIndex[path][doc.docType]) {
      fileIndex[path][doc.docType] = [];
    }

    fileIndex[path][doc.docType].push(doc);
  });

  return fileIndex;
}

/**
 * @param {Array} fileIndex
 * @return {Array}
 */
function createElementIndex(fileIndex) {
  var elementIndex = {};

  Object.keys(fileIndex).forEach(function(path) {
    var docdict = fileIndex[path];

    if (docdict.element) {
      var element = docdict.element[0];
      elementIndex[element.name] = renderer.renderElement({
        main: element,
        attributes: docdict.attribute || [],
        methods: docdict.method || [],
        events: docdict.event || [],
        properties: docdict.property || [],
      });
    }
  });

  return elementIndex;
}

/**
 * @param {Array} fileIndex
 * @return {Array}
 */
function createObjectIndex(fileIndex) {
  var objectIndex = {};

  Object.keys(fileIndex).forEach(function(path) {
    var docdict = fileIndex[path];

    if (docdict.object) {
      var object = docdict.object[0];
      objectIndex[object.name] = renderer.renderObject({
        main: object,
        attributes: null,
        methods: docdict.method || [],
        events: docdict.event || [],
        properties: docdict.property || [],
      });
    }
  });

  return objectIndex;
}

function run() {
  wcdoc.run({
    src: ['./core/src/elements/**/*.js', './core/src/ons/**/*.js', '!**/*.spec.js'],
    basePath: __dirname + '/../../'
  }).then(function(result) {
    var fileIndex = createFileIndex(result);

    var elementIndex = createElementIndex(fileIndex);
    var objectIndex = createObjectIndex(fileIndex);

    Object.keys(elementIndex).forEach(function(key) {
      var element = elementIndex[key];
      var dir = resolve(__dirname + '/../../build/wcdoc/element/');
      var path = join(dir, element.name + '.json');

      mkpath.sync(dir);
      fs.writeFileSync(path, JSON.stringify(element, null, '  '));
    });

    Object.keys(objectIndex).forEach(function(key) {
      var object = objectIndex[key];
      var dir = resolve(__dirname + '/../../build/wcdoc/object/');
      var path = join(dir, object.name + '.json');

      mkpath.sync(dir);
      fs.writeFileSync(path, JSON.stringify(object, null, '  '));
    });

  }).catch(function(reason) {
    console.log(reason);
    console.log(reason.stack);
  });
}

run();
