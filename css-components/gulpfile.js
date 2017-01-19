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
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('build/'));
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['build'], done => {
  gulp.watch(['src/**/*.less'], ['build']);
});

