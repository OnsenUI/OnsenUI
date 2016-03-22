import gulp from 'gulp';
import shell from 'gulp-shell';
import SystemjsBuilder from 'systemjs-builder';

gulp.task('tsc', shell.task('./node_modules/.bin/tsc'));

gulp.task('tsc:w', shell.task('./node_modules/.bin/tsc -w'));

gulp.task('build', ['tsc']);

gulp.task('watch', ['tsc:w']);

// TODO: fixme
gulp.task('build-prod', ['tsc'], function() {
  var builder = new SystemjsBuilder('./src/', {
    meta: {
      'angular2/platform/browser': {build: false},
      'angular2/core': {build: false}
    }
  });

  return builder
    .buildStatic('./src/angular2-onsenui.js', 'build/angular2-onsenui.js', {runtime: false})
    .then(function() {
      console.log('Build complete');
    }, function(error) {
      console.log('Build error:' + error);
    });
});
