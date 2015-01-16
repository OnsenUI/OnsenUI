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
      include: 'framework/directives/*.js',
      basePath: path.resolve(__dirname, 'framework')
    }
  ];

  templateFinder.templateFolders.unshift(
    path.resolve(__dirname, 'templates')
  );

  templateFinder.templatePatterns.unshift('component.template.html');

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
        } else {
          console.log(doc);
        }
      });

      directives.forEach(function(directive) {
        var path = directive.fileInfo.filePath;
        directive.events = dict['event'][path] || [];
        directive.methods = dict['method'][path] || [];
        directive.attributes = dict['attribute'][path] || [];

        directive.methods.map(function(method) {
          var matches = method.name.match(/^ *([a-zA-Z0-9_]+)/);
          method.name = matches[1];

          return method;
        });
      });


      return directives;
    }
  };
});

