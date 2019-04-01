const gulp = require('gulp');
const pkg = require('./package.json');
const corePkg = require('../package.json');
const merge = require('event-stream').merge;
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
const eco = require('eco');
const fs = require('fs');
const ancss = require('@onsenui/ancss');
const cssnextPlugin = require('postcss-cssnext');
const reporter = require('postcss-reporter');
const historyApiFallback = require('connect-history-api-fallback');
const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('glob');
const rimraf = require('rimraf');
const path = require('path');
const yaml = require('js-yaml');

// Include these plugins outside $ to fix gulp-hub
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const stylelintPlugin = require('gulp-stylelint');

const prefix = __dirname + '/../build/css/';
const babelrc = Object.assign({}, corePkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.exclude = 'node_modules/**';

const cwdOption = {
  cwd: __dirname // makes sure the correct relative path is used when tasks are run from main OnsenUI gulpfile
};

////////////////////////////////////////
// build-css
////////////////////////////////////////
gulp.task('build-css', gulp.series(cssClean, stylelint, cssnext, cssmin));

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', gulp.series('build-css', generatePreview));

////////////////////////////////////////
// stylelint
////////////////////////////////////////
function stylelint() {
  return gulp.src([
      './src/**/*.css',
      '!./src/components/combination.css', // not following BEM
      '!./src/iphonex-support/**/*.css' // not following BEM
    ], cwdOption)
    .pipe(stylelintPlugin({
      failAfterError: false,
      reporters: [{formatter: 'string', console: true}],
      configFile: path.join(__dirname, 'stylelint.config.js') // uses css-components/stylelint.config.js even when run from main gulpfile
    }));
}

////////////////////////////////////////
// cssmin
////////////////////////////////////////
function cssmin() {
  return gulp.src(prefix + '{*-,}onsen-css-components.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    //.pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix));
}

////////////////////////////////////////
// cssnext
////////////////////////////////////////
function cssnext() {
  const plugins = [
    require('postcss-import'),
    require('postcss-base64')({
      extensions: ['.svg'],
      root: __dirname + '/src/components/'
    }),
    cssnextPlugin({
      browsers: babelrc.presets[0][1].targets.browsers,
    }),
    reporter({
      clearAllMessages: true,
      clearReportedMessages: true,
      throwError: false
    })
  ];

  return gulp.src('src/{*-,}onsen-css-components.css', cwdOption)
    //.pipe(plumber()) // this was causing the task to never complete with gulp 4, but why...?
    .pipe(postcss(plugins))
    //.pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix))
    .pipe(browserSync.stream());
}
gulp.task('cssnext', gulp.series(stylelint, cssnext));

function cssClean(done) {
  rimraf.sync(__dirname + '/build/{*-,}onsen-css-components.css');
  rimraf.sync(__dirname + '/build/{*-,}onsen-css-components.min.css');
  rimraf.sync(prefix + '/{*-,}onsen-css-components.css');
  rimraf.sync(prefix + '/{*-,}onsen-css-components.min.css');
  done();
}
gulp.task('css-clean', cssClean);

////////////////////////////////////////
// generate-preview
////////////////////////////////////////
let lastMarkupToken = '';

function generatePreview(done) {
  const components = parseComponents();
  const markupToken = identifyComponentsMarkup(components);

  if (markupToken !== lastMarkupToken) {
    gulp.series(previewAssets, previewJs, (done) => {
      generate(components);
      browserSync.reload();

      lastMarkupToken = markupToken;
      done();
    })();
    done();
  } else {
    lastMarkupToken = markupToken;
    done();
  }
}

function generatePreviewForce(done) {
  generate(parseComponents());
  browserSync.reload();
  done();
}
exports['generate-preview-force'] = gulp.series(previewAssets, previewJs, generatePreviewForce);

function generate(components) {
  const template = fs.readFileSync(__dirname + '/previewer-src/index.html.eco', 'utf-8');
  const patterns = yaml.safeLoadAll(fs.readFileSync(__dirname + '/patterns.yaml', 'utf-8'));
  const themes = glob.sync(__dirname + '/build/{*-,}onsen-css-components.css').map(filePath => path.basename(filePath, '.css'));
  const toJSON = JSON.stringify.bind(JSON);

  fs.writeFileSync(__dirname + '/build/index.html', eco.render(template, {toJSON, components, themes, patterns}), 'utf-8');
}

function identifyComponentsMarkup(componentsJSON) {
  const token = componentsJSON.map(component => {
    return component.annotation.markup;
  }).join('');

  return token;
}

function parseComponents() {
  const css = fs.readFileSync(__dirname + '/build/onsen-css-components.css', 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^~/)});
  return components || [];
}

////////////////////////////////////////
// preview-assets
////////////////////////////////////////
function previewAssets() {
  return gulp.src('previewer-src/*.{svg,css}')
    .pipe(gulp.dest('./build/'));
}

////////////////////////////////////////
// preview-js
////////////////////////////////////////
function previewJs() {
  return rollup({
    input: 'previewer-src/app.js',
    plugins: [
      commonjs,
      babel(babelrc)
    ]
  })
  .then(bundle => {
    return bundle.write({
      file: 'build/app.gen.js',
      format: 'umd',
      sourcemap: 'inline'
    });
  });
}

////////////////////////////////////////
// reset-console
////////////////////////////////////////
function reset(done) {
  process.stdout.write('\x1Bc');
  done();
}

const outputDevServerInfo = (() => {
  let defer = true;

  return function () {
    if (defer) {
      setTimeout(() => {
        output();
        defer = true;
      }, 60);
      defer = false;
    }
  }

  function output() {
    const localUrl = browserSync.getOption('urls').get('local');
    const externalUrl = browserSync.getOption('urls').get('external');

    console.log('\nAccess URLs:');
    console.log('     Local:', $.util.colors.magenta(localUrl));
    console.log('  External:', $.util.colors.magenta(externalUrl));
    console.log();

    displayBuildCSSInfo();
  }
})();

function displayBuildCSSInfo() {

  console.log('Built CSS Files:')
  getCSSPaths().forEach(cssPath => {
    console.log('  ' + $.util.colors.magenta(cssPath));
  });

  function getCSSPaths() {
    return glob.sync(__dirname + '/build/{*-,}onsen-css-components.css').map(cssPath => {
      return '.' + path.sep + path.relative(__dirname, cssPath);
    });
  }
}

function getCSSPaths() {
  return glob.sync(__dirname + '/build/{*-,}onsen-css-components.css').map(cssPath => {
    return '.' + path.sep + path.relative(__dirname, cssPath);
  });
}

////////////////////////////////////////
// serve
////////////////////////////////////////
function serve(done) {
  gulp.watch(['src/**/*.css'], () => {
    reset();
    gulp.series('build-css', 'generate-preview', outputDevServerInfo);
  });

  gulp.watch(['previewer-src/**', 'patterns.yaml'], () => {
    reset();
    gulp.series('generate-preview-force', outputDevServerInfo)
  });

  browserSync.emitter.on('init', outputDevServerInfo);

  browserSync.init({
    logLevel: 'silent',
    ui: false,
    port: 4321,
    notify: false,
    server: {
      baseDir: __dirname + '/build',
      middleware: [historyApiFallback()],
    },
    startPath: '/',
    open: false
  });
}

exports.serve = gulp.series('build', serve);
