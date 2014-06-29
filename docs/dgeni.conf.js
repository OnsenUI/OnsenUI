// @dgeni developers: Why do we need canonical-path?
var path = require('canonical-path');
var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');

module.exports = function(config) {

  // Use angularJS Package
  require('dgeni-packages/ngdoc')(config);

  // Set logging level
  config.set('logging.level', 'info');

  // Add your own templates to render docs
  config.prepend('rendering.templateFolders', [
    path.resolve(__dirname, 'templates')
  ]);

  // You can specifiy which tempate should be used based on a pattern.
  // Currently we just use one template and don't need a pattern
  config.prepend('rendering.templatePatterns', [
    'common.template.html'
  ]);

  // This tells dgeni where to look for stuff
  config.set('source.projectPath', '.');

  config.set('source.files', [
    {
      // Process all js files in src/.
      pattern: 'framework/directives/*.js',
      // Some processors use the relative path of the source file to compute properties, such as
      // the outputPath. The basePath allows us to ensure that the "relative" path to each source
      // file is accurate no matter where the source files are relative to the projectPath.
      basePath: path.resolve(__dirname, '..')
    }
  ]);

  // Our generated docs will be written here:
  config.set('rendering.outputFolder', '../build/');
  // The contentsFolder is the path relative to the outputFolder, which identifies the place where
  // the "standard" content files are stored.  For example, in the AngularJS application, the output
  // folder is `build/docs` but the way that the application is stored, means that we want the
  // content files (i.e. the files that contain the content of each "doc") to be stored in
  // `build/docs/partials`
  config.set('rendering.contentsFolder', 'docs/' + njglobals.lang);

  config.append('processing.tagDefinitions', require('./tag-defs'));

  config.append('rendering.filters', [
    require('./filters/lang')
  ]);
  return config;
};

