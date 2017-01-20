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

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', () => {
  return gulp.src('src/onsen-css-components.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe(gulp.dest('build/'));
});

////////////////////////////////////////
// generate-preview
////////////////////////////////////////
gulp.task('generate-preview', ['build'], () => {
  const template = fs.readFileSync(__dirname + '/templates/preview.html.eco', 'utf-8');
  const css = fs.readFileSync(__dirname + '/build/onsen-css-components.css', 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^!/)});
  fs.writeFileSync(__dirname + '/build/preview.html', eco.render(template, {components}), 'utf-8');
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['generate-preview'], done => {
  gulp.watch(['src/**/*.less', 'templates/preview.html.eco'], ['generate-preview']);
  gulp.watch('build/preview.html').on('change', browserSync.reload);

  browserSync.init({
    server: {
      baseDir: './build'
    },
    startPath: '/preview.html'
  });
});

