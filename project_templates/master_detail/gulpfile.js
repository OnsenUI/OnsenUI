var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

////////////////////
// build
////////////////////
gulp.task('build', ['compile-stylus', 'jshint']);

////////////////////
// default
////////////////////
gulp.task('default', $.taskListing.withFilters(null, 'default'));

////////////////////
// compile-stylus
////////////////////
gulp.task('compile-stylus', function() {
  return gulp.src([__dirname + '/www/lib/onsen/stylus/default.styl'])
    .pipe($.plumber())
    .pipe($.stylus({errors: true, define: {mylighten: mylighten}}))
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe($.rename(function(path) {
      path.dirname = '.';
      path.basename = 'onsen-css-components';
      path.ext = 'css';
    }))
    .pipe(gulp.dest(__dirname + '/www/styles/'));

  // needs for compile
  function mylighten(param) {
    if (param.rgba) {
      var result = param.clone();
      result.rgba.a = 0.2;
      return result;
    }
    throw new Error('mylighten() first argument must be color.');
  }
});

////////////////////
// jshint
////////////////////
gulp.task('jshint', function() {
  return gulp.src([__dirname + '/www/*.js', __dirname + '/www/js/**/*.js'])
    .pipe($.cached('jshint'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

////////////////////
// serve
////////////////////
gulp.task('serve', ['build', 'watch-stylus', 'watch-jshint', 'browser-sync']);

////////////////////
// browser-sync
////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: __dirname + '/www/',
      directory: true
    },
    ghostMode: false,
    browser: 'google chrome',
    notify: false,
    debounce: 200,
    port: 8901,
    startPath: 'index.html'
  });

  gulp.watch([
    __dirname + '/www/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
  ], {
    debounceDelay: 400
  }, function() {
    browserSync.reload();
  });
});

////////////////////
// watch-stylus
////////////////////
gulp.task('watch-stylus', function() {
  gulp.watch([__dirname + '/www/lib/onsen/stylus/**/*.styl'], ['compile-stylus']);
});

////////////////////
// watch-jshint
////////////////////
gulp.task('watch-jshint', function() {
  gulp.watch([__dirname + '/www/*.js', __dirname + '/www/js/**/*.js'], ['jshint']);
});
