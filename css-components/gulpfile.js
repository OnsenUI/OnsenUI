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
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', ['generate-preview']);

////////////////////////////////////////
// cssnext
////////////////////////////////////////
gulp.task('cssnext', () => {
  const plugins = [
    require('postcss-import'),
    cssnext({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    })
  ];
  return gulp.src('src/onsen-css-components.css')
    .pipe($.plumber())
    .pipe($.postcss(plugins))
    .pipe(gulp.dest(prefix));
});

////////////////////////////////////////
// generate-preview
////////////////////////////////////////
gulp.task('generate-preview', ['cssnext'], () => {
  const template = fs.readFileSync(__dirname + '/templates/preview.html.eco', 'utf-8');
  const css = fs.readFileSync(prefix + 'onsen-css-components.css', 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^!/)});
  fs.writeFileSync(prefix + 'preview.html', eco.render(template, {components}), 'utf-8');
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['build'], done => {
  gulp.watch(['src/**/*.css', 'templates/preview.html.eco'], ['build']);
  gulp.watch(prefix + 'preview.html').on('change', browserSync.reload);

  browserSync.init({
    server: {
      baseDir: prefix
    },
    startPath: '/preview.html'
  });
});

