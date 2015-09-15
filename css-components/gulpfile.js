
var gulp = require('gulp');
var pkg = require('./package.json');
var appServer = require('./server/app');
var merge = require('event-stream').merge;
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var schemeWriter = require('./server/schemeWriter');


////////////////////////////////////////
// css
////////////////////////////////////////
gulp.task('css', function() {
  return gulp.src('www/styles/main.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('www/styles/'));
});

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', function() {
  return gulp.src('www/views/*.html')
    .pipe($.html2js({
      outputModuleName: 'template',
      base: 'www',
      useStrict: true
    }))
    .pipe($.concat('template.generated.js'))
    .pipe(gulp.dest('www/scripts/'));
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', function(done) {
  runSequence(['html2js', 'css'], 'build-css-topdoc', 'jshint', done);
});

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', function (cb) {
  require('rimraf')('www.prod/**/*', cb);
});

////////////////////////////////////////
// build-minified
////////////////////////////////////////
gulp.task('build-minified', ['html2js', 'css', 'clean'],function(done) {
  var jsFilter = $.filter('www/**/*.js');
  var cssFilter = $.filter('www/**/*.css');

  // copy files
  gulp.src(['www/**/*', 'www/*'], {base: 'www'})
    .pipe(gulp.dest('www.prod/'))
    .on('end', function() {

      // generate minified files
      merge(
        gulp.src('www/index.html')
          .pipe($.useref.assets())
          .pipe(jsFilter)
          .pipe($.ngmin())
          .pipe($.uglify())
          .pipe(jsFilter.restore())
          .pipe(cssFilter)
          .pipe($.minifyCss())
          .pipe(cssFilter.restore())
          .pipe($.useref.restore())
          .pipe($.useref())
          .pipe(gulp.dest('www.prod')),
        gulp.src('www/bower_components/jquery-minicolors/jquery.minicolors.png')
          .pipe(gulp.dest('www.prod/styles'))
      ).on('end', done);

    });
});

////////////////////////////////////////
// jshint
////////////////////////////////////////
gulp.task('jshint', function() {
  return gulp.src([
      './www/scripts/**/*.js',
      '!./www/scripts/**/*.generated.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['jshint', 'build', 'app-server'], function() {
  gulp.watch(['www/styles/*.less'], ['css']);

  gulp.watch(['www/views/*.html'], ['html2js']);

  gulp.watch(['components-src/stylus/**/*'], ['build-css-topdoc']);

  gulp.watch(['www/theme.js'], ['build-css-components']);

  var livereload = require('gulp-livereload')();

  // for livereload
  gulp.watch([
    'www/styles/*.css',
    'www/images/*',
    'www/views/*',
    'www/*',
    'www/testcases/*'
  ], {
    debounceDelay: 400
  }, function(file) {
    livereload.changed(file.path);
  });

  // for jshint
  gulp.watch(['www/scripts/**/*.js', '!./www/scripts/**/*.generated.js'], function(changedFile) {
    gulp.src(changedFile.path)
      .pipe($.jshint())
      .pipe($.jshint.reporter('default'));
  });
});

////////////////////////////////////////
// serve-minified
////////////////////////////////////////
gulp.task('serve-minified', function() {
  process.env['NODE_ENV'] = '';
  runSequence('build-minified', function() {
    appServer([], function(app) {
      app.set('env', 'production');
    }).listen(9002);
  });
});

////////////////////////////////////////
// app-server
////////////////////////////////////////
gulp.task('app-server', function() {
  var middleware = require('connect-livereload')({port: 35729});
  appServer([middleware], function(app) {
    app.set('env', 'development');
  }).listen(9002);
});

////////////////////////////////////////
// build-css-components
////////////////////////////////////////
gulp.task('build-css-components', ['build-schemes'], function(done) {
  gulp.src('components-src/stylus/*-theme.styl')
    .pipe($.stylus({errors: true}))
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe($.rename(function(path) {
      path.dirname = '.';
      path.basename = 'onsen-css-components-' + path.basename;
    }))
    .pipe(gulp.dest('./components-src/dist/'))
    .pipe(gulp.dest('./www/'))
    .on('end', function() {
      // Copy as default theme
      gulp.src('components-src/dist/onsen-css-components-blue-basic-theme.css')
        .pipe($.rename('onsen-css-components.css'))
        .pipe(gulp.dest('./components-src/dist/'))
        .pipe($.rename('onsen-css-components-default.css'))
        .pipe(gulp.dest('./components-src/dist/'))
        .pipe(gulp.dest('./www/'))
        .on('end', done);
    });
});

////////////////////////////////////////
// build-css-topdoc
////////////////////////////////////////
gulp.task('build-css-topdoc', ['build-css-components'], $.shell.task([
  '"./node_modules/.bin/topdoc" --source "./components-src/dist" --destination "./www/testcases" --template "./components-src/testcases-topdoc-template"'
]));

////////////////////////////////////////
// build-schemes
////////////////////////////////////////
gulp.task('build-schemes', function(done) {
  schemeWriter.write();
  setTimeout(done, 40);
});
