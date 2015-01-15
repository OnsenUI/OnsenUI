var path = require('canonical-path');
var Package = require('dgeni').Package;

var jsdoc = require('dgeni-packages/jsdoc');
var nunjucks = require('dgeni-packages/nunjucks');
var ngdoc = require('dgeni-packages/ngdoc');

module.exports = new Package('ons-docs', [jsdoc, nunjucks, ngdoc])
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor, parseTagsProcessor, templateEngine) {
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

  templateFinder.templatePatterns.unshift('common.template.html');

  var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');
  writeFilesProcessor.outputFolder = 'build/docs/' + njglobals.lang;

  require('./tag-defs').forEach(function(definition) {
    parseTagsProcessor.tagDefinitions.push(definition);
  });

  templateEngine.filters.push(require('./filters/lang'));
});

