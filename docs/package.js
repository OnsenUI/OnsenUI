var path = require('canonical-path');
var Package = require('dgeni').Package;

var jsdoc = require('dgeni-packages/jsdoc');
var nunjucks = require('dgeni-packages/nunjucks');
var ngdoc = require('dgeni-packages/ngdoc');

module.exports = new Package('ons-docs', [jsdoc, nunjucks, ngdoc])
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor, parseTagsProcessor, templateEngine, checkAnchorLinksProcessor) {
  log.level = 'info';

  readFilesProcessor.basePath = path.resolve(__dirname, '..');
  readFilesProcessor.sourceFiles = [
    {
      include: 'framework/{directives,js}/*.js',
      basePath: path.resolve(__dirname, 'framework')
    }
  ];

  templateFinder.templateFolders.unshift(
    path.resolve(__dirname, 'templates')
  );

  templateFinder.templatePatterns.unshift('${ doc.docType }.template.html');

  var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');
  writeFilesProcessor.outputFolder = 'build/docs/' + njglobals.lang;

  require('./tag-defs').forEach(function(definition) {
    parseTagsProcessor.tagDefinitions.unshift(definition);
  });

  templateEngine.filters.push(require('./filters/lang'));
  templateEngine.filters.push(require('./filters/dump'));

  checkAnchorLinksProcessor.$enabled = false;
})

.processor(function aggregate() {
  return {
    $runAfter: [],
    $runBefore: ['processing-docs'],
    $process: function(docs) {
      var directives = [];
      var objects = [];
      var dict = {
        event: [],
        attribute: [],
        method: []
      };


      docs.forEach(function(doc) {
        var path = doc.fileInfo.filePath;
        var type = doc.docType;

        if (type === 'directive') {
          directives.push(doc);
        } else if (type === 'event' || type === 'method' || type === 'attribute') {
          if (!dict[type][path]) {
            dict[type][path] = [];
          }
          dict[type][path].push(doc);

        } else if (type === 'object') {
          objects.push(doc);
        }

        if (type === 'method') {
          var matches = doc.name.match(/^ *([a-zA-Z0-9_]+)/);
          doc.name = matches[1];
        }
      });

      directives.forEach(function(directive) {
        var path = directive.fileInfo.filePath;
        directive.events = dict['event'][path] || [];
        directive.methods = dict['method'][path] || [];
        directive.attributes = dict['attribute'][path] || [];
      });

      objects.forEach(function(object) {
        var path = object.fileInfo.filePath;
        object.methods = dict['method'][path] || [];
        object.events = dict['event'][path] || [];
      });

      return directives.concat(objects);
    }
  };
});

