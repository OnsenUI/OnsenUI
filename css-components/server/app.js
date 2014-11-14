var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var compiler = require('./stylusCompiler');
var prefix = require('./cssprefixer');
var minify = require('./cssminify');
var archiver = require('archiver');
var Q = require('q');
var debug = require('debug')('my-application');
var schemeWriter = require('./schemeWriter');

module.exports = function(middlewares, fn) {

  var app = express();

  if (fn) {
    fn(app);
  }

  if (middlewares) {
    middlewares.forEach(function(middleware) {
      app.use(middleware);
    });
  }

  var IS_DEV = app.get('env') === 'development';

  var appDir = IS_DEV ? path.join(__dirname, '../www') : path.join(__dirname, '../www.prod');

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(appDir));

  app.use(function(req, res, next) {
    if (req.is('text/*')) {
      req.text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        req.text += chunk
      });
      req.on('end', next);
    } else {
      next();
    }
  });

  // for client-side compile
  app.get('/onsen-css-components-template.css', function(req, res){
    var variableJson = req.query;

    compiler.compile(variableJson)
    .then(prefix)
    .done(function(css) {
      res.type('css');
      res.end(css);
    }, function(err) {
      debug('error' + err);
      res.json(500, {
          status: 'ERROR',
          error: err + ""
      });
    });
  });

  app.get('/onsen-css-components.css', function(req, res){
    var variableJson = req.query;

    debug('get css: ' + variableJson );

    compiler.validate(variableJson)
    .then(compiler.compile)
    .then(prefix)
    .done(function(css) {
      res.type('css');
      res.end(css);
    }, function(err) {
      debug('error' + err);
      res.json(500, {
          status: 'ERROR',
          error: err + ""
      });
    });
  });

  app.get('/onsen-css-components.min.css', function(req, res){
    var variableJson = req.query;

    compiler.validate(variableJson)
    .then(compiler.compile)
    .then(prefix)
    .then(minify)
    .done(function(css) {
      res.type('css');
      res.end(css);
    }, function(err) {
      debug('error' + err);
      res.json(500, {
          status: 'ERROR',
          error: err + ""
      });
    });
  });

  function cutBasePath(basePath, filePath){
    return filePath.replace(basePath, '');
  }

  function createZip(){
    var archive = archiver('zip');
  }

  function addDownloadTemplateFilesToZip(archive){
    var defer = Q.defer();
    var basePath = __dirname + '/download_template/';

    archive.bulk([{
      expand: true,
      cwd: basePath,
      src: ['**'],
      dest: ''
    }]);

    defer.resolve();
    return defer.promise;
  }

  function addPatternsFilesToZip(archive) {
    var defer = Q.defer();
    var basePath = path.resolve(__dirname + '/../www/patterns/');

    archive.bulk([
      { expand: true, cwd: basePath, src: ['**'], dest: 'patterns' }
    ]);

    defer.resolve();
    return defer.promise;
  }

  function addStylusFilesToZip(archive) {
    var defer = Q.defer();
    var basePath = path.resolve(__dirname + '/../components-src/stylus');

    archive.bulk([{
      expand: true,
      cwd: basePath,
      src: ['**'],
      dest: 'stylus'
    }]);

    defer.resolve();
    return defer.promise;
  }

  function addCSSFilesToZip(variables, archive) {
    return compiler.validate(variables)
    .then(compiler.compile)
    .then(prefix)
    .then(function(css) {
      archive.append(css, {name: 'onsen-css-components.css'});
      return css;
    })
    .then(minify).then(function(minifiedCSS) {
      archive.append(minifiedCSS, { name: 'onsen-css-components.min.css' });
      archive.append(schemeWriter.generateThemeStylus({
        text: 'custom',
        colors: variables
      }), {name: 'stylus/custom-theme.stylus'});
    });
  }

  app.get('/onsen-css-components.zip', function(req, res){
    var archive = archiver('zip');
    var variableJson = req.query;

    Q.all([
      addDownloadTemplateFilesToZip(archive),
      addStylusFilesToZip(archive),
      addCSSFilesToZip(variableJson, archive)
    ]).then(function(){
      archive.finalize();
    }, function(err){
      debug('ERROR! ' + err);
      archive.append('Sorry the css generation failed. Please check your variable definition', { name: 'ERROR.txt' });
      archive.finalize();
    });

    archive.pipe(res);
  });

  app.get('/', function(req, res){
    res.sendfile(path.resolve(appDir + '/index.html'), function(err){
      debug('error?:' + err);
    });
  });

  app.get('/patterns', function(req, res){
    res.sendfile(path.resolve(appDir + '/index.html'), function(err){
      debug('error?:' + err);
    });
  });

  /// error handlers
  // development error handler
  if (IS_DEV) {
    app.use(function(err, req, res, next) {
      res.json(err.status || 500, {
        status: 'ERROR',
        error: err + ""
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.json(err.status || 500, {
      status: 'ERROR',
      error: err + ""
    });
  });

  return app;
};

