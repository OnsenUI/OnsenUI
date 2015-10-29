var path = require('canonical-path');
var Package = require('dgeni').Package;

var jsdoc = require('dgeni-packages/jsdoc');
var nunjucks = require('dgeni-packages/nunjucks');
var ngdoc = require('dgeni-packages/ngdoc');

module.exports = new Package('ons-docs', [jsdoc, nunjucks, ngdoc])
  .processor(require('./aggregate'))
  .processor(require('./output-json'))
  .config(function(log, readFilesProcessor, templateFinder) {

    log.level = 'info';

    readFilesProcessor.basePath = path.resolve(__dirname, '../..');
    readFilesProcessor.sourceFiles = [
      {
        include: 'framework/directives/*.js',
        basePath: path.resolve(__dirname, '/framework/directives')
      },
      {
        include: 'framework/js/*.js',
        basePath: path.resolve(__dirname, '/framework/js')
      },
      {
        include: 'docs/guides/*.ngdoc',
        basePath: path.resolve(__dirname, '/docs/guides')
      }
    ];

    templateFinder.templateFolders.unshift(
      path.resolve(__dirname, 'templates')
    );

    templateFinder.templatePatterns.unshift('${ doc.docType }.template.html');
  })
  .config(function(writeFilesProcessor, parseTagsProcessor, templateEngine, checkAnchorLinksProcessor) {

    var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');
    writeFilesProcessor.outputFolder = 'build/docs/' + njglobals.lang;

    require('./tag-defs').forEach(function(definition) {
      parseTagsProcessor.tagDefinitions.unshift(definition);
    });

    templateEngine.filters.push(require('./filters/lang'));
    templateEngine.filters.push(require('./filters/dump'));

    checkAnchorLinksProcessor.$enabled = false;
  })
  .config(function(computePathsProcessor, computeIdsProcessor) {
    computePathsProcessor.pathTemplates.push({
      docTypes: ['overview' ],
      pathTemplate: '${area}/${docType}/${id}',
      outputPathTemplate: 'partials/${area}/${docType}/${id}.html'
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['overview'],
      getAliases: function(doc) { return [doc.id]; }
    });
  });

