import gulp from 'gulp';
import shell from 'gulp-shell';
import SystemjsBuilder from 'systemjs-builder';

gulp.task('tsc', shell.task('./node_modules/.bin/tsc'));
gulp.task('tsc:w', shell.task('./node_modules/.bin/tsc -w'));

gulp.task('watch', ['build'] , function() {

});

gulp.task('build', ['tsc'], function() {
  var builder = new SystemjsBuilder('./src/', {
    meta: {
      'angular2/platform/browser': {build: false},
      'angular2/core': {build: false}
    },
    packages: {
      'onsenui': './src/onsenui.js'
    }
  });

  return builder
    .bundle('./src/onsenui.js', 'build/angular2-onsenui.js')
    .then(function() {
      console.log('Build complete');
    }, function(error) {
      console.log('Build error:' + error);
    });
});
