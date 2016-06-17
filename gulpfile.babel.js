/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import gulp from 'gulp';
import path from'path';
import gulpIf from 'gulp-if';
import pkg from './package.json';
import {merge} from 'event-stream';
import runSequence from 'run-sequence';
import dateformat from 'dateformat';
import browserSync from 'browser-sync';
import os from 'os';
import fs from 'fs';
import {argv} from 'yargs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

////////////////////////////////////////

const $ = require('gulp-load-plugins')();
const CORDOVA_APP = false;

////////////////////////////////////////
// browser-sync
////////////////////////////////////////
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: __dirname,
      index: 'index.html',
      directory: true
    },
    files: [],
    watchOptions: {
      //debounceDelay: 400
    },
    ghostMode: false,
    notify: false
  });
});

////////////////////////////////////////
// core
////////////////////////////////////////
gulp.task('core', function() {
  return gulp.src(['core/src/setup.js'], {read: false})
    .pipe($.plumber(error => {
      $.util.log(error.message);
      this.emit('end');
    }))
    .pipe($.rollup({
      sourceMap: 'inline',
      plugins: [
        {
          resolveId: (code, id) => {
            if (id && code.charAt(0) !== '.') {
              let p = path.join(__dirname, 'core', 'src', code);

              if (fs.existsSync(p)) {
                p = path.join(p, 'index.js');
              }
              else {
                p = p + '.js';
              }

              return p;
            }
          }
        },
        nodeResolve(),
        babel({
          presets: ['es2015-rollup'],
          babelrc: false
        })
      ],
      format: 'umd',
      moduleName: 'ons'
    }))
    .pipe($.addSrc.prepend('core/vendor/*.js'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('onsenui.js'))
    .pipe($.header('/*! <%= pkg.name %> v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .on('end', () => browserSync.reload());
});

////////////////////////////////////////
// watch-core
////////////////////////////////////////
gulp.task('watch-core', ['prepare', 'core'], () => {
  return gulp.watch(['core/src/*.js', 'core/src/**/*.js'], ['core']);
});

////////////////////////////////////////
// core-test
////////////////////////////////////////
gulp.task('core-test', ['prepare', 'core'], () => {
  return gulp.src([])
    .pipe($.karma({
      configFile: 'core/test/karma.conf.js',
      action: 'run'
    }))
    .on('error', err => {
      $.util.log($.util.colors.red(err.message));
      throw err;
    });
});

////////////////////////////////////////
// watch-core-test
////////////////////////////////////////
gulp.task('watch-core-test', ['watch-core'], () => {
  return gulp.src([])
    .pipe($.karma({
      configFile: 'core/test/karma.conf.js',
      action: 'watch'
    }))
    .on('error', err => {
      throw err;
    });
});

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', () => {
  return gulp.src('bindings/angular1/templates/*.tpl')
    .pipe($.html2js('angular.js', {
      adapter: 'angular',
      base: path.join(__dirname, 'bindings/angular1'),
      name: 'templates-main',
      useStrict: true,
      quoteChar: '\''
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('bindings/angular1/directives/'));
});

/////////////////////////////////////////
// eslint
////////////////////////////////////////
gulp.task('eslint', () => {
  return gulp.src(eslintTargets())
    .pipe($.cached('eslint'))
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.remember('eslint'))
    .pipe($.eslint.format());
});

/////////////////////////////////////////
// watch-eslint
////////////////////////////////////////
gulp.task('watch-eslint', ['eslint'], () => {
  gulp.watch(eslintTargets(), ['eslint']);
});

function eslintTargets() {
  return [
    'gulpfile.babel.js',
    'docs/packages/**/*.js',
    'core/src/*.js',
    'core/src/**/*.js',
    'bindings/angular1/js/*.js',
    'bindings/angular1/directives/*.js',
    'bindings/angular1/services/*.js',
    'bindings/angular1/elements/*.js',
    'bindings/angular1/views/*.js'
  ];
}

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', () => {
  return gulp.src([
    '.tmp',
    'build',
    '.selenium/'
  ], {read: false}).pipe($.clean());
});

////////////////////////////////////////
// minify
////////////////////////////////////////
gulp.task('minify-js', () => {
  return merge(
    gulp.src('build/js/{onsenui,angular-onsenui}.js')
      .pipe($.uglify({
        mangle: false,
        preserveComments: (node, comment) => {
          return comment.line === 1;
        }
      }))
      .pipe($.rename(path => {
        path.extname = '.min.js';
      }))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js')))
  );
});

////////////////////////////////////////
// prepare
////////////////////////////////////////
gulp.task('prepare', ['html2js'], () =>  {

  let onlyES6;

  return merge(

    // angular-onsenui.js
    gulp.src([
      'bindings/angular1/vendor/*.js',
      'bindings/angular1/lib/*.js',
      'bindings/angular1/directives/templates.js',
      'bindings/angular1/js/onsen.js',
      'bindings/angular1/views/*.js',
      'bindings/angular1/directives/*.js',
      'bindings/angular1/services/*.js',
      'bindings/angular1/js/*.js'
    ])
      .pipe($.plumber())
      .pipe($.rollup({
        sourceMap: 'inline',
        plugins: [
          nodeResolve(),
          babel({
            presets: ['es2015-rollup'],
            babelrc: false
          })
        ]
      }))
      .pipe($.ngAnnotate({
        add: true,
        single_quotes: true // eslint-disable-line camelcase
      }))
      .pipe($.sourcemaps.init())
      .pipe($.concat('angular-onsenui.js'))
      .pipe($.header('/*! angular-onsenui.js for <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js'))),

    // onsen-css-components
    gulp.src([
      'css-components/components-src/dist/*.css',
    ])
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css'))),

    // stylus files
    gulp.src([
      'css-components/components-src/stylus/**/*'
    ])
      .pipe(gulp.dest('build/stylus/')),


    // onsenui.css
    gulp.src([
      'core/css/common.css',
      'core/css/*.css'
    ])
      .pipe($.concat('onsenui.css'))
      .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6'))
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css'))),

    // angular.js copy
    gulp.src('bindings/angular1/lib/angular/*.*')
      .pipe(gulp.dest('build/js/angular/')),

    // font-awesome fle copy
    gulp.src('core/css/font_awesome/**/*')
      .pipe(gulp.dest('build/css/font_awesome/')),

    // ionicons file copy
    gulp.src('core/css/ionicons/**/*')
      .pipe(gulp.dest('build/css/ionicons/')),

    // material icons file copy
    gulp.src('core/css/material-design-iconic-font/**/*')
      .pipe(gulp.dest('build/css/material-design-iconic-font/')),

    // type definitions copy
    gulp.src('core/src/onsenui.d.ts')
      .pipe(gulp.dest('build/js/')),

    // auto prepare
    gulp.src('cordova-app/www/index.html')
      .pipe(gulpIf(CORDOVA_APP, $.shell(['cd cordova-app; cordova prepare'])))
  );
});

////////////////////////////////////////
// prepare-css-components
////////////////////////////////////////
gulp.task('prepare-css-components', ['prepare'], () => {
  return gulp.src(['build/**', '!build/docs', '!build/docs/**'])
    .pipe(gulp.dest('css-components/www/patterns/lib/onsen'));
});

////////////////////////////////////////
// compress-distribution-package
////////////////////////////////////////
gulp.task('compress-distribution-package', () => {
  const src = [
    path.join(__dirname, 'build/**'),
    '!' + path.join(__dirname, 'build/docs/**'),
    '!' + path.join(__dirname, 'build/stylus/**')
  ];

  return gulp.src(src)
    .pipe($.zip('onsenui.zip'))
    .pipe(gulp.dest(path.join(__dirname, 'build')));
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', done => {
  return runSequence(
    'clean',
    'core',
    'prepare',
    'minify-js',
    'build-docs',
    'prepare-css-components',
    'compress-distribution-package',
    done
  );
});

////////////////////////////////////////
// dist
////////////////////////////////////////

gulp.task('soft-build', done => {
  return runSequence(
    'clean',
    'core',
    'prepare',
    'minify-js',
    done
  );
});

function distFiles() {
  return gulp.src([
    'build/**/*',
    '!build/docs/**/*',
    '!build/docs/',
    '!build/js/angular/**/*',
    '!build/js/angular/',
    '!build/onsenui.zip',
    'bower.json',
    'package.json',
    '.npmignore',
    'README.md',
    'CHANGELOG.md',
    'LICENSE'
  ])
  .pipe(gulp.dest('OnsenUI-dist/'));
}

gulp.task('dist', ['soft-build'], distFiles);

gulp.task('dist-no-build', [], distFiles);

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['watch-eslint', 'prepare', 'browser-sync', 'watch-core'], () => {
  gulp.watch(['bindings/angular1/templates/*.tpl'], ['html2js']);

  const watched = [
    'bindings/angular1/*/*',
    'core/css/*.css',
    'css-components/components-src/dist/*.css'
  ];

  if (CORDOVA_APP) {
    watched.push('cordova-app/www/*.html');
  }

  gulp.watch(watched, {
    debounceDelay: 300
  }, ['prepare']);

  // for livereload
  gulp.watch([
    'examples/*/*.{js,css,html}',
    'test/e2e/*/*.{js,css,html}'
  ]).on('change', changedFile => {
    gulp.src(changedFile.path)
      .pipe(browserSync.reload({stream: true, once: true}));
  });
});

////////////////////////////////////////
// build-docs
////////////////////////////////////////
gulp.task('build-docs', () => {
  return require('./docs/wcdoc')(path.join(__dirname, '/build/docs'));
});

////////////////////////////////////////
// webdriver-update
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// webdriver-download
////////////////////////////////////////
gulp.task('webdriver-download', () => {
  const platform = os.platform();
  const destDir = path.join(__dirname, '.selenium');
  const chromeDriverUrl = (() => {
    const filePath = platform === 'linux' ?
      '/2.19/chromedriver_linux64.zip' :
      `/2.14/chromedriver_${platform === 'darwin' ? 'mac' : 'win'}32.zip`;
    return `http://chromedriver.storage.googleapis.com${filePath}`;
  })();

  // Only download once.
  if (fs.existsSync(destDir + '/chromedriver') || fs.existsSync(destDir + '/chromedriver.exe')) {
    return gulp.src('');
  }

  const selenium = $.download('https://selenium-release.storage.googleapis.com/2.51/selenium-server-standalone-2.51.0.jar')
    .pipe(gulp.dest(destDir));

  const chromedriver = $.download(chromeDriverUrl)
    .pipe($.unzip())
    .pipe($.chmod(755))
    .pipe(gulp.dest(destDir));

  return merge(selenium, chromedriver);
});


////////////////////////////////////////
// test
////////////////////////////////////////
gulp.task('test', function(done) {
  return runSequence('core-test', 'e2e-test', done);
});

////////////////////////////////////////
// e2e-test
////////////////////////////////////////
gulp.task('e2e-test', ['webdriver-download', 'prepare'], function() {
  const port = 8081;

  $.connect.server({
    root: __dirname,
    port: port
  });

  const conf = {
    configFile: './test/e2e/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', path.join(__dirname, '.selenium/selenium-server-standalone-2.51.0.jar'),
      '--chromeDriver', path.join(__dirname, '.selenium/chromedriver')
    ]
  };

  const specs = argv.specs ? argv.specs.split(',').map(s => s.trim()) : ['test/e2e/**/*js'];

  return gulp.src(specs)
    .pipe($.protractor.protractor(conf))
    .on('error', function(e) {
      console.error(e);
      $.connect.serverClose();
    })
    .on('end', function() {
      $.connect.serverClose();
    });
});
