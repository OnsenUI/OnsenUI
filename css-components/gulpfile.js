const gulp = require('gulp');
const pkg = require('./package.json');
const merge = require('event-stream').merge;
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')();
const eco = require('eco');
const fs = require('fs');
const ancss = require('ancss');
const prefix = __dirname + '/../build/css/';

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', ['generate-preview', 'assets']);

////////////////////////////////////////
// less
////////////////////////////////////////
gulp.task('less', () => {
  return gulp.src('src/onsen-css-components.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe(gulp.dest(prefix));
});

////////////////////////////////////////
// generate-preview
////////////////////////////////////////
gulp.task('generate-preview', ['less'], () => {
  const template = fs.readFileSync(__dirname + '/templates/preview.html.eco', 'utf-8');
  const css = fs.readFileSync(prefix + 'onsen-css-components.css', 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^!/)});
  fs.writeFileSync(prefix + 'preview.html', eco.render(template, {components}), 'utf-8');
});

////////////////////////////////////////
// assets
////////////////////////////////////////
gulp.task('assets', () => {
  return gulp.src('src/img/*.*')
    .pipe(gulp.dest(prefix + 'img/'));
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['build'], done => {
  gulp.watch(['src/**/*.less', 'templates/preview.html.eco'], ['build']);
  gulp.watch(prefix + 'preview.html').on('change', browserSync.reload);
  gulp.watch('src/img/*', ['assets']);

  browserSync.init({
    server: {
      baseDir: prefix
    },
    startPath: '/preview.html'
  });
});

