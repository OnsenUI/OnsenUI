var wcdoc = require('wcdoc');
var renderer = require('./renderer');
var fs = require('fs');
var mkpath = require('mkpath');
var resolve = require('path').resolve;
var join = require('path').join;
var validate = require('./validator');

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

function writeIndex(dir, docIndex) {
  Object.keys(docIndex).forEach(function(key) {
    var doc = docIndex[key];
    var path = dir + '/' + doc.name + '.json';

    fs.writeFileSync(path, JSON.stringify(doc, null, '  '));
  });
}

function validateIndex(schema, docIndex) {
  Object.keys(docIndex).forEach(function(key) {
    var doc = docIndex[key];
    validate(doc, schema).errors.forEach(function(error) {
      throw error;
    });
  });
}

/**
 * @param {Object} params
 * @param {Array} params.src
 * @param {string} params.outputDir
 * @return {Promise}
 */
function run(params) {
  return wcdoc.run({
    src: params.src,
    basePath: __dirname + '/../../'
  }).then(function(result) {
    var fileIndex = createFileIndex(result);
    var elementIndex = createElementIndex(fileIndex);
    var objectIndex = createObjectIndex(fileIndex);

    var dir = resolve(params.outputDir);

    mkpath.sync(join(dir, 'element'));
    mkpath.sync(join(dir, 'object'));
    writeIndex(join(dir, 'element'), elementIndex);
    writeIndex(join(dir, 'object'), objectIndex);
    validateIndex(elementIndex, {$ref: '/element'});
    validateIndex(objectIndex, {$ref: '/object'});
  });
}

module.exports = function() {
  return run({
    src: ['./core/src/elements/**/*.js', './core/src/ons/**/*.js', '!**/*.spec.js'],
    outputDir: __dirname + '/../../build/docs/core'
  }).then(function() {
    run({
      src: ['./bindings/angular1/directives/*.js', './bindings/angular1/js/*.js'],
      outputDir: __dirname + '/../../build/docs/angular1-binding'
    });
  }).catch(function(reason) {
    console.log(reason);
    console.log(reason.stack);
    throw reason;
  });
};
