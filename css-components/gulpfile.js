const gulp = require('gulp');
const pkg = require('./package.json');
const merge = require('event-stream').merge;
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')();

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
// serve
////////////////////////////////////////
gulp.task('serve', ['build'], done => {
  gulp.watch(['src/**/*.less'], ['build']);
});

