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
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const reporter = require('postcss-reporter');

const prefix = __dirname + '/../build/css/';

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', (done) => {
  runSequence('build-css', 'generate-preview', done);
});

////////////////////////////////////////
// build-css
////////////////////////////////////////
gulp.task('build-css', ['cssnext', 'cssmin']);

////////////////////////////////////////
// stylelint
////////////////////////////////////////
gulp.task('stylelint', () => {
  return gulp.src('./src/**/*.css')
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [{formatter: 'string', console: true}]
    }));
});

////////////////////////////////////////
// cssmin
////////////////////////////////////////
gulp.task('cssmin', ['cssnext'], () => {
  return gulp.src(prefix + 'onsen-css-components.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix));
});

////////////////////////////////////////
// cssnext
////////////////////////////////////////
gulp.task('cssnext', ['stylelint'], () => {
  const plugins = [
    require('postcss-import'),
    require('postcss-base64')({
      extensions: ['.svg'],
      root: __dirname + '/src/components/'
    }),
    cssnext({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    }),
    reporter({clearMessage: true, throwError: false})
  ];
  return gulp.src('src/onsen-css-components.css')
    .pipe($.plumber())
    .pipe($.postcss(plugins))
    .pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix))
    .pipe(browserSync.stream());
});

////////////////////////////////////////
// generate-preview
////////////////////////////////////////
let generated = false;
gulp.task('generate-preview', (done) => {
  if (!generated) {
    runSequence('generate-preview-force', () => {
      generated = true;
      done();
    });
  } else {
    done();
  }
});

////////////////////////////////////////
// generate-preview-force
////////////////////////////////////////
gulp.task('generate-preview-force', () => {
  const template = fs.readFileSync(__dirname + '/templates/preview.html.eco', 'utf-8');
  const css = fs.readFileSync(prefix + 'onsen-css-components.css', 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^~/)});
  const componentsJSON = JSON.stringify(components);
  fs.writeFileSync(prefix + 'preview.html', eco.render(template, {components, componentsJSON}), 'utf-8');
  browserSync.reload();
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['build'], done => {
  gulp.watch(['src/**/*.css'], ['build-css']);
  gulp.watch(['templates/preview.html.eco'], ['generate-preview-force']);

  browserSync.init({
    server: {
      baseDir: prefix
    },
    startPath: '/preview.html'
  });
});

